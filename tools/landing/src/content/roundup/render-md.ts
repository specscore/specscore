import type { LangCode } from '../../lib/languages.ts';
import { localeHref } from '../../lib/languages.ts';
import { toolOrder } from './facts.ts';
import type { Block, Inline, RoundupPage } from './types.ts';

function abs(href: string, locale: LangCode): string {
  if (href.startsWith('/') && !href.startsWith('//')) return `https://specscore.md${localeHref(locale, href)}`;
  return href;
}

function inlineToMd(part: Inline, locale: LangCode): string {
  if (typeof part === 'string') return part;
  if ('c' in part) return `\`${part.c}\``;
  if ('s' in part) return `**${part.s}**`;
  if ('e' in part) return `*${part.e}*`;
  return `[${part.a}](${abs(part.href, locale)})`;
}

function block(parts: Block, locale: LangCode): string {
  return parts.map((part) => inlineToMd(part, locale)).join('').replace(/[ \t]+\n/g, '\n').replace(/[ \t]{2,}/g, ' ').trim();
}

function cell(parts: Block, locale: LangCode): string {
  return block(parts, locale).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

export function renderRoundupMarkdown(page: RoundupPage, locale: LangCode, canonical: string): string {
  const lines: string[] = [
    `# ${page.h1}`,
    '',
    `Canonical: ${canonical}`,
    '',
    block(page.hero, locale),
    '',
  ];
  for (const paragraph of page.lede) lines.push(block(paragraph, locale), '');

  lines.push(
    `## ${page.tableTitle}`,
    '',
    page.tableNote,
    '',
    `| ${page.colTool} | ${page.colWhat} | ${page.colStorage} | ${page.colValidation} | ${page.colLicence} | ${page.colSuits} |`,
    '| --- | --- | --- | --- | --- | --- |',
  );
  for (const id of toolOrder) {
    const tool = page.tools[id];
    const vsHref = id === 'specscore' ? abs('/', locale) : abs(`/vs/${id}/`, locale);
    lines.push(`| [${tool.name}](${vsHref}) | ${cell(tool.what, locale)} | ${cell(tool.storage, locale)} | ${cell(tool.validation, locale)} | ${cell(tool.licence, locale)} | ${cell(tool.suits, locale)} |`);
  }
  lines.push('');

  for (const id of toolOrder) {
    const tool = page.tools[id];
    lines.push(`## ${tool.name}`, '');
    for (const paragraph of tool.paragraphs) lines.push(block(paragraph, locale), '');
  }

  lines.push(`## ${page.chooseTitle}`, '');
  for (const paragraph of page.choose) lines.push(block(paragraph, locale), '');

  lines.push(`## ${page.sourcesTitle}`, '', page.sourcesNote, '');
  for (const source of page.sources) lines.push(`- [${source.label}](${source.href})`);
  lines.push('');
  return lines.join('\n');
}
