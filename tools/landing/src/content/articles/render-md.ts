import type { LangCode } from '../../lib/languages.ts';
import { localeHref } from '../../lib/languages.ts';
import {
  checklistExample,
  featureReadme,
  featuresIndex,
  gwtExample,
  inlineAc,
  localizedPrefixes,
  rehearseExample,
  repoConfig,
  scenarioExample,
  specReadme,
  thinAc,
  dogfoodLintSteps,
  lintCleanOutput,
  lintFailureOutput,
  planReadme,
  taskReadme,
} from './facts.ts';
import { acceptanceSourcesFor, earsSourcesFor, lintSourcesFor, patternsFor, templateSourcesFor } from './pages.ts';
import type { AcceptanceArticleCopy, Block, EarsArticleCopy, IndexCopy, Inline, LintArticleCopy, TemplateArticleCopy } from './types.ts';

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

function linked(href: string, locale: LangCode): string {
  if (href.startsWith('/') && !href.startsWith('//')) return abs(href, locale);
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

export function renderEarsMarkdown(copy: EarsArticleCopy, locale: LangCode, canonical: string): string {
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
    fence('markdown', featureReadme),
    '',
    `### ${copy.indexCaption}`,
    '',
    fence('markdown', featuresIndex),
    '',
    `### ${copy.specReadmeCaption}`,
    '',
    fence('markdown', specReadme),
    '',
    `### ${copy.configCaption}`,
    '',
    fence('yaml', repoConfig),
    '',
  );
  for (const paragraph of copy.mapAfter) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.faqTitle}`, '');
  for (const faq of copy.faqs) lines.push(`### ${faq.q}`, '', block(faq.a, locale), '');

  lines.push(`## ${copy.sourcesTitle}`, '', copy.sourcesNote, '');
  for (const source of earsSourcesFor(copy)) lines.push(`- [${source.label}](${linked(source.href, locale)})`);
  lines.push('', `## ${copy.relatedTitle}`, '');
  for (const link of copy.related) lines.push(`- [${link.label}](${abs(link.href, locale)})`);
  lines.push('');
  return lines.join('\n');
}

export function renderAcceptanceMarkdown(copy: AcceptanceArticleCopy, locale: LangCode, canonical: string): string {
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
  for (const source of acceptanceSourcesFor(copy)) lines.push(`- [${source.label}](${linked(source.href, locale)})`);
  lines.push('', `## ${copy.relatedTitle}`, '');
  for (const link of copy.related) lines.push(`- [${link.label}](${abs(link.href, locale)})`);
  lines.push('');
  return lines.join('\n');
}

export function renderLintMarkdown(copy: LintArticleCopy, locale: LangCode, canonical: string): string {
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

  lines.push(`## ${copy.checksTitle}`, '');
  for (const paragraph of copy.checksIntro) lines.push(block(paragraph, locale), '');
  for (const check of copy.checks) {
    lines.push(`### ${check.title}`, '', block(check.body, locale), '');
  }

  lines.push(`## ${copy.ciTitle}`, '');
  for (const paragraph of copy.ci) lines.push(block(paragraph, locale), '');
  lines.push(`### ${copy.workflowCaption}`, '', fence('yaml', dogfoodLintSteps), '');
  lines.push(`### ${copy.outputCaption}`, '', fence('text', lintFailureOutput), '');
  lines.push(`### ${copy.cleanCaption}`, '', fence('text', lintCleanOutput), '');
  for (const paragraph of copy.ciAfter) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.compareTitle}`, '');
  for (const paragraph of copy.compare) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.faqTitle}`, '');
  for (const faq of copy.faqs) lines.push(`### ${faq.q}`, '', block(faq.a, locale), '');

  lines.push(`## ${copy.sourcesTitle}`, '', copy.sourcesNote, '');
  for (const source of lintSourcesFor(copy)) lines.push(`- [${source.label}](${linked(source.href, locale)})`);
  lines.push('', `## ${copy.relatedTitle}`, '');
  for (const link of copy.related) lines.push(`- [${link.label}](${abs(link.href, locale)})`);
  lines.push('');
  return lines.join('\n');
}

export function renderTemplateMarkdown(copy: TemplateArticleCopy, locale: LangCode, canonical: string): string {
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

  lines.push(`## ${copy.featureTitle}`, '');
  for (const paragraph of copy.feature) lines.push(block(paragraph, locale), '');
  lines.push(`### ${copy.featureCaption}`, '', fence('markdown', featureReadme), '');
  lines.push(`### ${copy.indexCaption}`, '', fence('markdown', featuresIndex), '');
  lines.push(`### ${copy.specCaption}`, '', fence('markdown', specReadme), '');
  lines.push(`### ${copy.configCaption}`, '', fence('yaml', repoConfig), '');
  for (const paragraph of copy.featureAfter) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.traceTitle}`, '');
  for (const paragraph of copy.traceIntro) lines.push(block(paragraph, locale), '');
  for (const item of copy.trace) lines.push(`### ${item.title}`, '', block(item.body, locale), '');
  lines.push(`### ${copy.scenarioCaption}`, '', fence('markdown', scenarioExample), '');
  for (const paragraph of copy.traceAfter) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.planTitle}`, '');
  for (const paragraph of copy.plan) lines.push(block(paragraph, locale), '');
  lines.push(`### ${copy.planCaption}`, '', fence('markdown', planReadme), '');
  lines.push(`### ${copy.taskCaption}`, '', fence('markdown', taskReadme), '');
  for (const paragraph of copy.planAfter) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.ciTitle}`, '');
  for (const paragraph of copy.ci) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.claudeTitle}`, '');
  for (const paragraph of copy.claude) lines.push(block(paragraph, locale), '');

  lines.push(`## ${copy.faqTitle}`, '');
  for (const faq of copy.faqs) lines.push(`### ${faq.q}`, '', block(faq.a, locale), '');

  lines.push(`## ${copy.sourcesTitle}`, '', copy.sourcesNote, '');
  for (const source of templateSourcesFor(copy)) lines.push(`- [${source.label}](${linked(source.href, locale)})`);
  lines.push('', `## ${copy.relatedTitle}`, '');
  for (const link of copy.related) lines.push(`- [${link.label}](${abs(link.href, locale)})`);
  lines.push('');
  return lines.join('\n');
}

export function renderIndexMarkdown(copy: IndexCopy, locale: LangCode, canonical: string): string {
  const lines = [
    `# ${copy.h1}`,
    '',
    `Canonical: ${canonical}`,
    '',
    block(copy.hero, locale),
    '',
    `## ${copy.listLabel}`,
    '',
  ];
  for (const article of copy.articles) {
    lines.push(`- [${article.title}](${abs(article.href, locale)})`, '', article.summary, '');
  }
  return lines.join('\n');
}
