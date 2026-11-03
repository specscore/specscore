import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { langs, localeHref, type LangCode } from '../src/lib/languages.ts';
import { roundupMdHref } from '../src/content/roundup/facts.ts';
import { pageFor } from '../src/content/roundup/pages.ts';
import { renderRoundupMarkdown } from '../src/content/roundup/render-md.ts';

function markdownFor(locale: LangCode): string {
  const canonical = `https://specscore.md${localeHref(locale, '/spec-driven-development/tools/')}`;
  return renderRoundupMarkdown(pageFor(locale), locale, canonical);
}

const printUrl = process.argv[2] === '--print' ? process.argv[3] : undefined;

if (printUrl) {
  const match = printUrl.match(/^\/(?:([a-z-]+)\/)?spec-driven-development\/tools\.md$/);
  if (!match) process.exit(1);
  const locale = (match[1] ?? 'en') as LangCode;
  if (match[1] && !langs.some((lang) => lang.code === locale)) process.exit(1);
  process.stdout.write(markdownFor(locale));
} else {
  const outDir = process.argv[2];
  if (!outDir) {
    console.error('usage: emit-roundup-md.ts <outDir> | --print <url>');
    process.exit(1);
  }
  for (const lang of langs) {
    const rel = roundupMdHref(lang.code).replace(/^\//, '');
    const dest = join(outDir, rel);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, markdownFor(lang.code));
  }
}
