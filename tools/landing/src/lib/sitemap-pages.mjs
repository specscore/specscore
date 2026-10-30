import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const SITEMAP_LOCALES = {
  en: 'en',
  es: 'es',
  de: 'de',
  fr: 'fr',
  it: 'it',
  pl: 'pl',
  'pt-br': 'pt-BR',
  ru: 'ru',
  tr: 'tr',
  uk: 'uk',
  ja: 'ja',
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW',
  ko: 'ko',
};

const DIRECTORY_INDEX_SLUGS = new Set(['docs', 'blog', 'new']);
const PREFIXES = Object.keys(SITEMAP_LOCALES).filter((code) => code !== 'en').sort((a, b) => b.length - a.length);

export function urlForDocsSlug(slug) {
  if (DIRECTORY_INDEX_SLUGS.has(slug)) return `https://specscore.md/${slug}/`;
  return `https://specscore.md/${slug}`;
}

export function blogSlugFromFilename(file) {
  const base = file.replace(/\.md$/, '');
  const slugPart = base.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return `blog/${slugPart}`;
}

/**
 * HTML URLs for the docs generator. Markdown twins are omitted so they
 * do not compete with the HTML pages in the sitemap.
 * @param {Array<{ slug?: string }>} pages
 * @param {string[]} blogFiles
 * @returns {string[]}
 */
export function urlsFromPages(pages, blogFiles) {
  const urls = [];
  for (const page of pages) {
    if (!page.slug || page.slug === 'index') continue;
    urls.push(urlForDocsSlug(page.slug));
  }
  for (const file of blogFiles) {
    if (file === 'README.md' || !file.endsWith('.md')) continue;
    urls.push(`https://specscore.md/${blogSlugFromFilename(file)}`);
  }
  return [...new Set(urls)].sort();
}

export function localeFromUrl(url) {
  const path = new URL(url).pathname;
  for (const code of PREFIXES) {
    if (path === `/${code}/` || path.startsWith(`/${code}/`)) return code;
  }
  return 'en';
}

/**
 * Adds x-default. Single-language URLs also get a self hreflang so the
 * alternate set is complete. Does not invent translations that are absent.
 * @param {{ url: string, links?: { url: string, lang?: string }[] }} item
 */
export function withHreflang(item) {
  const links = item.links ? item.links.map((link) => ({ ...link })) : [];
  if (links.length === 0) {
    const code = localeFromUrl(item.url);
    links.push({ url: item.url, lang: SITEMAP_LOCALES[code] });
  }
  if (!links.some((link) => link.lang === 'x-default')) {
    const english = links.find((link) => link.lang === 'en');
    links.push({ url: english ? english.url : item.url, lang: 'x-default' });
  }
  return { ...item, links };
}

export function collectDocsPageUrls(repoRoot) {
  const config = JSON.parse(readFileSync(join(repoRoot, 'tools/site-generator/site-config.json'), 'utf8'));
  let blogFiles = [];
  try {
    blogFiles = readdirSync(join(repoRoot, 'blog'));
  } catch {
    blogFiles = [];
  }
  return urlsFromPages(config.pages, blogFiles);
}
