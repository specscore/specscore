import { stripTags } from './structured-data.mjs';

function inline(html) {
  const withMarks = String(html)
    .replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => `[${stripTags(text)}](${href})`)
    .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, text) => `\`${stripTags(text)}\``)
    .replace(/<(?:strong|b)\b[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, (_, text) => `**${stripTags(text)}**`)
    .replace(/<(?:em|i)\b[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, (_, text) => `*${stripTags(text)}*`);
  return stripTags(withMarks);
}

/**
 * Turn a built page's <main> into Markdown. Drops scripts, styles, and SVG.
 * @param {string} html
 * @returns {string}
 */
export function htmlToMarkdown(html) {
  const main = String(html).match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  let src = main ? main[1] : String(html);
  src = src
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '');
  src = src.replace(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi, (_, code) => {
    const text = stripTags(code).replace(/^\n+|\n+$/g, '');
    return `\n\n\`\`\`\n${text}\n\`\`\`\n\n`;
  });
  src = src.replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, (_, text) => `\n\n# ${inline(text)}\n\n`);
  src = src.replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, (_, text) => `\n\n## ${inline(text)}\n\n`);
  src = src.replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi, (_, text) => `\n\n### ${inline(text)}\n\n`);
  src = src.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, text) => `\n- ${inline(text)}`);
  src = src.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, text) => `\n\n${inline(text)}\n\n`);
  src = src.replace(/<br\s*\/?>/gi, '\n');
  src = src.replace(/<[^>]+>/g, ' ');
  src = src
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  src = src.replace(/[ \t]{2,}/g, ' ');
  return `${src.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

/**
 * First element of `tag` whose class list contains `className`, as plain text
 * with links preserved as Markdown.
 * @param {string} html
 * @param {string} tag
 * @param {string} className
 */
export function firstBlock(html, tag, className) {
  const re = new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, 'gi');
  let match;
  while ((match = re.exec(html))) {
    const classes = (match[1].match(/\bclass="([^"]*)"/) || [])[1] || '';
    if (classes.split(/\s+/).includes(className)) return inline(match[2]);
  }
  return '';
}

/**
 * Inner Markdown of the first <section> whose class list contains `className`.
 * @param {string} html
 * @param {string} className
 */
export function sectionMarkdown(html, className) {
  const re = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
  let match;
  while ((match = re.exec(html))) {
    const classes = (match[1].match(/\bclass="([^"]*)"/) || [])[1] || '';
    if (classes.split(/\s+/).includes(className)) {
      return htmlToMarkdown(`<main>${match[2]}</main>`);
    }
  }
  return '';
}
