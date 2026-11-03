import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { langs, localeHref, type LangCode } from '../src/lib/languages.ts';
import { articleMdHref, articlesIndexMdHref, articleSlug } from '../src/content/articles/facts.ts';
import { articleCopy, indexCopy } from '../src/content/articles/pages.ts';
import { renderArticleMarkdown, renderIndexMarkdown } from '../src/content/articles/render-md.ts';

function markdownFor(locale: LangCode, slug: string | undefined): string | undefined {
  if (slug === undefined) {
    const canonical = `https://specscore.md${localeHref(locale, '/articles/')}`;
    return renderIndexMarkdown(indexCopy(locale), locale, canonical);
  }
  if (slug !== articleSlug) return undefined;
  const canonical = `https://specscore.md${localeHref(locale, '/articles/acceptance-criteria/')}`;
  return renderArticleMarkdown(articleCopy(locale), locale, canonical);
}

const printUrl = process.argv[2] === '--print' ? process.argv[3] : undefined;

function fromUrl(url: string): { locale: LangCode; slug: string | undefined } | undefined {
  const match = url.match(/^\/(?:([a-z-]+)\/)?articles(?:\/([a-z0-9-]+))?\.md$/);
  if (!match) return undefined;
  const locale = (match[1] ?? 'en') as LangCode;
  if (match[1] && !langs.some((lang) => lang.code === locale)) return undefined;
  return { locale, slug: match[2] };
}

if (printUrl) {
  const parsed = fromUrl(printUrl);
  if (!parsed) process.exit(1);
  const body = markdownFor(parsed.locale, parsed.slug);
  if (!body) process.exit(1);
  process.stdout.write(body);
} else {
  const outDir = process.argv[2];
  if (!outDir) {
    console.error('usage: emit-articles-md.ts <outDir> | --print <url>');
    process.exit(1);
  }
  for (const lang of langs) {
    const files: [string, string | undefined][] = [
      [articlesIndexMdHref(lang.code), undefined],
      [articleMdHref(lang.code), articleSlug],
    ];
    for (const [relHref, slug] of files) {
      const body = markdownFor(lang.code, slug);
      if (!body) continue;
      const dest = join(outDir, relHref.replace(/^\//, ''));
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, body);
    }
  }
}
