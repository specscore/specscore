import type { LangCode } from '../../lib/languages.ts';
import { localeHref } from '../../lib/languages.ts';
import { featureReadme, featuresIndex, repoConfig, specReadme } from './facts.ts';
import { patternsFor, sourcesFor } from './pages.ts';
import type { ArticleCopy, Block, IndexCopy, Inline } from './types.ts';

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

function fence(text: string): string {
  return ['```markdown', text.replace(/\n$/, ''), '```'].join('\n');
}

export function renderArticleMarkdown(copy: ArticleCopy, locale: LangCode, canonical: string): string {
  const lines: string[] = [
    `# ${copy.h1}`,
    '',
    `Canonical: ${canonical}`,
    '',
    copy.updated,
    '',
    block(copy.hero, locale),
    '',
    `## ${copy.originTitle}`,
    '',
  ];
  for (const paragraph of copy.origin) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.patternsTitle}`, '');
  for (const paragraph of copy.patternsIntro) lines.push(block(paragraph, locale), '');
  for (const pattern of patternsFor(copy)) {
    lines.push(
      `### ${pattern.name}`,
      '',
      `\`${pattern.form}\``,
      '',
      block(pattern.body, locale),
      '',
      `**${copy.exampleLabel}:** ${pattern.example}`,
      '',
    );
  }

  lines.push(`## ${copy.mistakesTitle}`, '');
  for (const mistake of copy.mistakes) {
    lines.push(`### ${mistake.title}`, '', block(mistake.body, locale), '');
  }

  lines.push(`## ${copy.kiroTitle}`, '');
  for (const paragraph of copy.kiro) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.mapTitle}`, '');
  for (const paragraph of copy.map) lines.push(block(paragraph, locale), '');
  lines.push(
    `### ${copy.featureCaption}`,
    '',
    fence(featureReadme),
    '',
    `### ${copy.indexCaption}`,
    '',
    fence(featuresIndex),
    '',
    `### ${copy.specReadmeCaption}`,
    '',
    fence(specReadme),
    '',
    `### ${copy.configCaption}`,
    '',
    '```yaml',
    repoConfig.replace(/\n$/, ''),
    '```',
    '',
  );
  for (const paragraph of copy.mapAfter) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.faqTitle}`, '');
  for (const faq of copy.faqs) {
    lines.push(`### ${faq.q}`, '', block(faq.a, locale), '');
  }

  lines.push(`## ${copy.sourcesTitle}`, '', copy.sourcesNote, '');
  for (const source of sourcesFor(copy)) lines.push(`- [${source.label}](${source.href})`);
  lines.push('', `## ${copy.relatedTitle}`, '');
  for (const link of copy.related) lines.push(`- [${link.label}](${abs(link.href, locale)})`);
  lines.push('');
  return lines.join('\n');
}

export function renderIndexMarkdown(copy: IndexCopy, locale: LangCode, canonical: string): string {
  const articleHref = abs('/articles/ears-requirements/', locale);
  return [
    `# ${copy.h1}`,
    '',
    `Canonical: ${canonical}`,
    '',
    block(copy.hero, locale),
    '',
    `## ${copy.listLabel}`,
    '',
    `- [${copy.articleTitle}](${articleHref})`,
    '',
    copy.articleSummary,
    '',
  ].join('\n');
}
