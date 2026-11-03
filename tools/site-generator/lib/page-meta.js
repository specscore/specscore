const ORIGIN = 'https://specscore.md';

// Slugs served as directory indexes (`slug/index.html`). Cloudflare's
// default html_handling then keeps the trailing slash, matching Astro pages.
export const DIRECTORY_INDEX_SLUGS = new Set(['docs', 'blog', 'new']);

const OG_IMAGE = 'https://specscore.md/hero-og.jpg';
const OG_WIDTH = '1200';
const OG_HEIGHT = '1608';

/**
 * @param {string} value
 * @returns {string}
 */
export function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * @param {string} slug
 * @returns {string} absolute canonical URL
 */
export function canonicalUrlForSlug(slug) {
  if (slug === 'index') return `${ORIGIN}/`;
  if (DIRECTORY_INDEX_SLUGS.has(slug)) return `${ORIGIN}/${slug}/`;
  return `${ORIGIN}/${slug}`;
}

/**
 * @param {string} slug
 * @returns {string} root-relative href
 */
export function publicHrefForSlug(slug) {
  if (slug === 'index') return '/';
  if (DIRECTORY_INDEX_SLUGS.has(slug)) return `/${slug}/`;
  return `/${slug}`;
}

/**
 * @param {string} slug
 * @returns {string} path relative to the publish directory
 */
export function htmlOutputRelative(slug) {
  if (slug === 'index') return 'index.html';
  if (DIRECTORY_INDEX_SLUGS.has(slug)) return `${slug}/index.html`;
  return `${slug}.html`;
}

/**
 * @param {string} text
 * @param {number} [max]
 * @returns {string}
 */
export function clipMeta(text, max = 160) {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const space = cut.lastIndexOf(' ');
  const base = (space > 100 ? cut.slice(0, space) : cut).replace(/[.,;:–—-]+$/, '');
  return `${base}…`;
}

/**
 * @param {string} html
 * @returns {string}
 */
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

/**
 * @param {string} markdown
 * @returns {string} plain-text description taken from visible prose
 */
export function descriptionFromMarkdown(markdown) {
  const body = String(markdown).replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const summary = body.match(/^## Summary[^\n]*\n+([\s\S]*?)(?:\n## |\n# |$)/m);
  const fromSummary = summary ? firstProseParagraph(summary[1]) : '';
  const paragraph = fromSummary || firstProseParagraph(body);
  return paragraph ? toPlain(paragraph) : '';
}

/**
 * @param {string} html
 * @returns {string}
 */
export function descriptionFromHtml(html) {
  const match = String(html).match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
  return match ? stripTags(match[1]) : '';
}

/**
 * @param {string} region
 * @returns {string}
 */
function firstProseParagraph(region) {
  const blocks = String(region).split(/\n\s*\n/);
  for (const block of blocks) {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    const prose = lines.filter((line) => {
      if (/^#{1,6}\s/.test(line)) return false;
      if (/^(?:>|\||```|---|\*\*\*|:::)/.test(line)) return false;
      if (/^([-*+]|\d+\.)\s/.test(line)) return false;
      if (/^\*\*[^*]+\*\*:/.test(line)) return false;
      return true;
    });
    if (prose.length === 0) continue;
    return prose.join(' ');
  }
  return '';
}

/**
 * @param {string} markdown
 * @returns {string}
 */
function toPlain(markdown) {
  return markdown
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * @param {string} html
 * @returns {string}
 */
function h1Text(html) {
  const match = String(html).match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? stripTags(match[1]) : '';
}

/**
 * English-only docs pages: self alternate plus x-default.
 * @param {string} canonical
 * @returns {string}
 */
export function hreflangLinkTags(canonical) {
  const href = escapeHtmlAttr(canonical);
  return [
    `<link rel="alternate" hreflang="en" href="${href}">`,
    `<link rel="alternate" hreflang="x-default" href="${href}">`,
  ].join('\n  ');
}

/**
 * @param {object} opts
 * @param {string} opts.slug
 * @param {string} opts.title
 * @param {string} opts.content
 * @param {string} opts.canonical
 * @param {string} [opts.description]
 * @param {string} [opts.datePublished]
 * @returns {string}
 */
export function jsonLdScript(opts) {
  if (opts.slug === 'index') return '';
  const headline = h1Text(opts.content) || opts.title;
  if (!headline) return '';
  const description = opts.description || descriptionFromHtml(opts.content);
  const kind = opts.slug === 'blog'
    ? 'Blog'
    : opts.slug.startsWith('blog/')
      ? 'Article'
      : 'TechArticle';
  const page = {
    '@type': kind,
    inLanguage: 'en',
    url: opts.canonical,
    mainEntityOfPage: opts.canonical,
  };
  if (kind === 'Blog') page.name = headline;
  else page.headline = headline;
  if (description) page.description = description;
  if (opts.datePublished && /^\d{4}-\d{2}-\d{2}$/.test(opts.datePublished)) {
    page.datePublished = opts.datePublished;
  }
  const graph = [
    page,
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'SpecScore.md',
          item: `${ORIGIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: headline,
          item: opts.canonical,
        },
      ],
    },
  ];
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

/**
 * Open Graph / Twitter tags. The image is the committed JPEG (WebP is not
 * accepted by every crawler). Dimensions match public/hero-og.jpg.
 * @param {string} title
 * @param {string} description
 * @param {string} canonical
 * @returns {string}
 */
export function socialMetaTags(title, description, canonical) {
  const lines = [
    `<meta property="og:title" content="${escapeHtmlAttr(title)}">`,
    `<meta property="og:url" content="${escapeHtmlAttr(canonical)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="${OG_WIDTH}">`,
    `<meta property="og:image:height" content="${OG_HEIGHT}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
  ];
  if (description) {
    lines.splice(1, 0, `<meta property="og:description" content="${escapeHtmlAttr(description)}">`);
  }
  return lines.join('\n  ');
}

/**
 * @param {string} description full visible prose
 * @returns {string}
 */
export function descriptionMetaTag(description) {
  const clipped = clipMeta(description);
  if (!clipped) return '';
  return `<meta name="description" content="${escapeHtmlAttr(clipped)}">`;
}
