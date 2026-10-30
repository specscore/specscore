import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://specscore.md';
const HOME_URL = /^https:\/\/specscore\.md\/(?:(?:es|de|fr|it|pl|pt-br|ru|tr|uk|ja|zh-cn|zh-tw|ko)\/)?$/;
const COMPARE_PATH = /\/(?:vs\/(?:[^/]+\/)?|spec-driven-development\/tools\/)$/;

export function stripTags(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function classList(attrs) {
  const match = attrs.match(/\bclass="([^"]*)"/);
  return match ? match[1].split(/\s+/) : [];
}

function elementByClass(html, tag, className) {
  const re = new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, 'gi');
  let match;
  while ((match = re.exec(html))) {
    if (classList(match[1]).includes(className)) return stripTags(match[2]);
  }
  return '';
}

function faqItems(html) {
  const items = [];
  // The class must be on the opening tag. A leading non-FAQ h2 must not
  // swallow the first real question by stretching to the next </h2>.
  const re = /<h2\b[^>]*\bfaq-item__q\b[^>]*>([\s\S]*?)<\/h2>\s*<div\b[^>]*\bfaq-item__a\b[^>]*>([\s\S]*?)<\/div>/gi;
  let match;
  while ((match = re.exec(html))) {
    const question = stripTags(match[1]);
    const answer = stripTags(match[2]);
    if (question && answer) items.push({ question, answer });
  }
  return items;
}

function canonicalUrl(html) {
  const match = html.match(/<link\b[^>]*rel="canonical"[^>]*>/i);
  if (!match) return '';
  const href = match[0].match(/\bhref="([^"]+)"/);
  return href ? href[1] : '';
}

function wordmarkUrl(html) {
  const match = html.match(/<a\b[^>]*class="wordmark"[^>]*>/i);
  if (!match) return `${ORIGIN}/`;
  const href = match[0].match(/\bhref="([^"]+)"/);
  if (!href) return `${ORIGIN}/`;
  return new URL(href[1], `${ORIGIN}/`).href;
}

function breadcrumbLink(html) {
  const block = html.match(/<p\b[^>]*class="[^"]*\bhero__breadcrumb\b[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
  if (!block) return null;
  const anchor = block[1].match(/<a\b([^>]*)>([\s\S]*?)<\/a>/i);
  if (!anchor) return null;
  const href = anchor[1].match(/\bhref="([^"]+)"/);
  const name = stripTags(anchor[2]);
  if (!href || !name) return null;
  return { name, url: new URL(href[1], `${ORIGIN}/`).href };
}

function pageLang(html) {
  const match = html.match(/<html\b[^>]*\blang="([^"]+)"/i);
  return match ? match[1] : 'en';
}

/**
 * JSON-LD derived only from text and links present in the HTML.
 * Returns null when the page already has structured data or nothing to add.
 * @param {string} html
 * @returns {string | null} replacement HTML
 */
export function injectHtml(html) {
  if (html.includes('application/ld+json')) return html;
  if (!html.includes('</head>')) return html;

  const url = canonicalUrl(html);
  if (!url) return html;
  const lang = pageLang(html);
  const h1 = elementByClass(html, 'h1', 'hero__headline')
    || elementByClass(html, 'h1', 'faq-hero__headline')
    || elementByClass(html, 'h1', 'sdd-hero__headline')
    || stripTags((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '');
  const heroSub = elementByClass(html, 'p', 'hero__sub');
  const path = new URL(url).pathname;
  const isHome = HOME_URL.test(url);
  const graph = [];

  if (isHome && heroSub) {
    const app = {
      '@type': 'SoftwareApplication',
      name: 'SpecScore',
      applicationCategory: 'DeveloperApplication',
      description: heroSub,
      url,
      inLanguage: lang,
    };
    if (html.includes('https://github.com/specscore/specscore')) {
      app.sameAs = ['https://github.com/specscore/specscore'];
    }
    graph.push(app);
  }

  const questions = faqItems(html);
  if (questions.length) {
    graph.push({
      '@type': 'FAQPage',
      url,
      inLanguage: lang,
      mainEntity: questions.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }

  if (!isHome && COMPARE_PATH.test(path) && h1 && heroSub) {
    graph.push({
      '@type': 'Article',
      headline: h1,
      description: heroSub,
      inLanguage: lang,
      url,
      mainEntityOfPage: url,
    });
  }

  if (!isHome && h1) {
    const crumbs = [{ name: 'SpecScore.md', url: wordmarkUrl(html) }];
    const middle = breadcrumbLink(html);
    if (middle) crumbs.push(middle);
    crumbs.push({ name: h1, url });
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    });
  }

  if (graph.length === 0) return html;
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  const script = `<script type="application/ld+json">${json}</script>`;
  return html.replace('</head>', `${script}\n</head>`);
}

async function walkHtml(dir, found = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walkHtml(full, found);
    else if (entry.name.endsWith('.html')) found.push(full);
  }
  return found;
}

export async function injectStructuredData(dir) {
  const root = typeof dir === 'string' ? dir : fileURLToPath(dir);
  const files = await walkHtml(root);
  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const next = injectHtml(html);
    if (next !== html) await writeFile(file, next);
  }
}
