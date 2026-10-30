import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { langs, localeHref, type LangCode } from '../src/lib/languages.ts';
import { chrome } from '../src/content/compare/chrome.ts';
import { pages } from '../src/content/compare/pages.ts';
import { renderCompareMarkdown } from '../src/content/compare/render-md.ts';
import { compareMdHref } from '../src/content/compare/catalog.ts';

function markdownFor(locale: LangCode, slug: string): string | undefined {
  const page = pages[slug]?.[locale];
  if (!page) return undefined;
  const canonical = `https://specscore.md${localeHref(locale, `/vs/${slug}/`)}`;
  return renderCompareMarkdown(page, chrome[locale], canonical);
}

const printUrl = process.argv[2] === '--print' ? process.argv[3] : undefined;

if (printUrl) {
  const match = printUrl.match(/^\/(?:([a-z-]+)\/)?vs\/([a-z0-9-]+)\.md$/);
  if (!match) process.exit(1);
  const locale = (match[1] ?? 'en') as LangCode;
  const body = markdownFor(locale, match[2]);
  if (!body) process.exit(1);
  process.stdout.write(body);
} else {
  const outDir = process.argv[2];
  if (!outDir) {
    console.error('usage: emit-compare-md.ts <outDir> | --print <url>');
    process.exit(1);
  }
  for (const lang of langs) {
    for (const slug of Object.keys(pages)) {
      const body = markdownFor(lang.code, slug);
      if (!body) continue;
      const rel = compareMdHref(lang.code, slug).replace(/^\//, '');
      const dest = join(outDir, rel);
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, body);
    }
  }
}
