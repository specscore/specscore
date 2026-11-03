import type { LangCode } from '../../lib/languages.ts';
import { localeHref } from '../../lib/languages.ts';
import { localizedPrefixes } from './facts.ts';
import {
  checklistExample,
  gwtExample,
  inlineAc,
  rehearseExample,
  scenarioExample,
  thinAc,
} from './facts.ts';
import { sourcesFor } from './pages.ts';
import type { ArticleCopy, Block, IndexCopy, Inline } from './types.ts';

function isLanding(href: string): boolean {
  return localizedPrefixes.some((prefix) => href === prefix || href.startsWith(prefix));
}

function abs(href: string, locale: LangCode): string {
  if (href.startsWith('/') && !href.startsWith('//')) {
    const path = isLanding(href) ? localeHref(locale, href) : href;
    return `https://specscore.md${path}`;
  }
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

function fence(lang: string, text: string): string {
  const body = text.replace(/\n$/, '');
  const tick = body.includes('```') ? '~~~~' : '```';
  return [tick + lang, body, tick].join('\n');
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
    `## ${copy.whatTitle}`,
    '',
  ];
  for (const paragraph of copy.what) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.verifiableTitle}`, '');
  for (const paragraph of copy.verifiable) lines.push(block(paragraph, locale), '');
  for (const check of copy.checks) {
    lines.push(`### ${check.title}`, '', block(check.body, locale), '');
  }

  lines.push(`## ${copy.formatsTitle}`, '');
  for (const paragraph of copy.formatsIntro) lines.push(block(paragraph, locale), '');
  lines.push(`### ${copy.gwtCaption}`, '', fence('gherkin', gwtExample), '');
  lines.push(`### ${copy.checklistCaption}`, '', fence('markdown', checklistExample), '');
  for (const paragraph of copy.formatsAfter) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.earsTitle}`, '');
  for (const paragraph of copy.ears) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.examplesTitle}`, '');
  for (const pair of copy.pairs) {
    lines.push(
      `### ${pair.title}`,
      '',
      `**${copy.badLabel}**`,
      '',
      fence('text', pair.bad),
      '',
      `**${copy.goodLabel}**`,
      '',
      fence('text', pair.good),
      '',
      block(pair.why, locale),
      '',
    );
  }

  lines.push(`## ${copy.specscoreTitle}`, '');
  for (const paragraph of copy.specscore) lines.push(block(paragraph, locale), '');
  lines.push(
    `### ${copy.inlineCaption}`,
    '',
    fence('markdown', inlineAc),
    '',
    `### ${copy.thinCaption}`,
    '',
    fence('markdown', thinAc),
    '',
    `### ${copy.scenarioCaption}`,
    '',
    fence('markdown', scenarioExample),
    '',
    `### ${copy.rehearseCaption}`,
    '',
    fence('markdown', rehearseExample),
    '',
  );
  for (const paragraph of copy.specscoreAfter) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.faqTitle}`, '');
  for (const faq of copy.faqs) lines.push(`### ${faq.q}`, '', block(faq.a, locale), '');

  lines.push(`## ${copy.sourcesTitle}`, '', copy.sourcesNote, '');
  for (const source of sourcesFor(copy)) lines.push(`- [${source.label}](${source.href})`);
  lines.push('', `## ${copy.relatedTitle}`, '');
  for (const link of copy.related) lines.push(`- [${link.label}](${abs(link.href, locale)})`);
  lines.push('');
  return lines.join('\n');
}

export function renderIndexMarkdown(copy: IndexCopy, locale: LangCode, canonical: string): string {
  const articleHref = abs('/articles/acceptance-criteria/', locale);
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
