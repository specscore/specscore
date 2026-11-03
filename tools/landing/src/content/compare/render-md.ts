import type { Block, ComparePage, Inline } from './types.ts';
import type { CompareChrome } from './chrome.ts';

function abs(href: string): string {
  if (href.startsWith('/')) return `https://specscore.md${href}`;
  return href;
}

function inlineToMd(part: Inline): string {
  if (typeof part === 'string') return part;
  if ('c' in part) return `\`${part.c}\``;
  if ('s' in part) return `**${part.s}**`;
  if ('e' in part) return `*${part.e}*`;
  return `[${part.a}](${abs(part.href)})`;
}

function block(parts: Block): string {
  return parts.map(inlineToMd).join('').replace(/\s+/g, ' ').trim();
}

function tableCell(parts: Block): string {
  return block(parts).replace(/\|/g, '\\|');
}

export function renderCompareMarkdown(page: ComparePage, ui: CompareChrome, canonical: string): string {
  const lines: string[] = [
    `# ${page.h1}`,
    '',
    `Canonical: ${canonical}`,
    '',
    block(page.hero),
    '',
    `## ${ui.sharedTitle}`,
    '',
    ...page.shared.map((item) => `- ${block(item)}`),
    '',
    `## ${page.creditTitle}`,
    '',
    block(page.creditNote),
    '',
  ];

  for (const card of page.credits) {
    lines.push(`### ${card.title}`, '', block(card.body), '');
  }

  lines.push(
    `## ${ui.tableTitle}`,
    '',
    page.tableNote,
    '',
    `| ${ui.colCapability} | ${page.competitor} | ${ui.colSpecScore} |`,
    '| --- | --- | --- |',
    ...page.rows.map((row) => `| ${row.cap} | ${tableCell(row.them)} | ${tableCell(row.us)} |`),
    '',
    `## ${ui.furtherTitle}`,
    '',
  );

  for (const card of page.diffs) {
    lines.push(`### ${card.title}`, '', block(card.body), '');
    if (card.terminal) {
      lines.push(
        '```',
        '$ specscore spec lint',
        '',
        'features/apply-discount/README.md:0 [error] oq-section: Open Questions section not found',
        'features/apply-discount/README.md:0 [error] index-entries: Child directory not listed in index: refunds',
        'features/apply-discount/refunds:0 [error] readme-exists: README.md not found',
        '',
        '3 violations found (3 errors)',
        '```',
        '',
      );
    }
  }

  lines.push(`## ${ui.whenTitle}`, '', `### ${page.whenThemTitle}`, '');
  for (const item of page.whenThem) lines.push(`- ${block(item)}`);
  lines.push('', `### ${ui.whenUsTitle}`, '');
  for (const item of page.whenUs) lines.push(`- ${block(item)}`);
  lines.push('', `## ${page.bridgeTitle}`, '');
  for (const paragraph of page.bridge) lines.push(block(paragraph), '');
  lines.push(`## ${ui.sourcesTitle}`, '', ui.sourcesNote, '');
  for (const source of page.sources) lines.push(`- [${source.label}](${abs(source.href)})`);
  lines.push('');
  return lines.join('\n');
}
