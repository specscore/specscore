// Run after `pnpm build`. Checks the rendered journey, not source literals.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { langs, localeHref } from '../src/lib/route-map.mjs';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const route = '/articles/weekly-delivery/';
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const links = (html) => [...html.matchAll(/\bhref="([^"]+)"/g)].map((match) => decode(match[1]));
const read = (path) => readFile(join(dist, path.replace(/^\//, '')), 'utf8');
const sitemap = await read('sitemap.xml');
const llms = await read('llms.txt');
const headings = new Set();
for (const locale of langs) {
  const path = localeHref(locale.code, route);
  const home = await read(`${localeHref(locale.code, '/')}index.html`);
  const index = await read(`${localeHref(locale.code, '/articles/')}index.html`);
  const html = await read(`${path}index.html`);
  const markdown = await read(path.replace(/\/$/, '.md'));
  const indexMarkdown = await read(localeHref(locale.code, '/articles/').replace(/\/$/, '.md'));
  assert(links(home).includes(path), `${locale.code}: homepage entry`);
  assert(links(index).includes(path), `${locale.code}: article index entry`);
  assert(indexMarkdown.includes(path), `${locale.code}: Markdown index entry`);
  assert(html.includes(`<html lang="${locale.tag}"`), `${locale.code}: document language`);
  assert(html.includes(`<link rel="canonical" href="https://specscore.md${path}"`), `${locale.code}: canonical`);
  assert(html.includes('property="og:type" content="article"'), `${locale.code}: article OG type`);
  assert(html.includes('property="og:description"'), `${locale.code}: OG description`);
  assert(html.includes('"@type":"Article"'), `${locale.code}: article schema`);
  assert(html.includes('"@type":"BreadcrumbList"'), `${locale.code}: breadcrumbs`);
  assert(sitemap.includes(`https://specscore.md${path}`), `${locale.code}: sitemap`);
  for (const alternate of langs) {
    assert(html.includes(`hreflang="${alternate.tag}" href="https://specscore.md${localeHref(alternate.code, route)}"`), `${locale.code}: alternate ${alternate.code}`);
  }
  const heading = decode(html.match(/<h1\b[^>]*>([^<]+)<\/h1>/)?.[1] ?? '');
  assert(heading, `${locale.code}: heading`);
  assert(!headings.has(heading), `${locale.code}: translated heading, no English fallback`);
  headings.add(heading);
  assert(markdown.startsWith(`# ${heading}\n`), `${locale.code}: HTML/Markdown heading parity`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${locale.code}: one H1`);
  for (const [document, expected] of [[home, ['homepage_direct']], [html, ['article_footer', 'article_mentor']]]) {
    const referrals = links(document).filter((href) => href.startsWith('https://committedme.com/')).map((href) => new URL(href));
    for (const placement of expected) {
      const link = referrals.find((url) => url.searchParams.get('utm_content') === placement);
      assert(link, `${locale.code}: referral ${placement}`);
      assert.equal(link.searchParams.get('utm_source'), 'specscore');
      assert.equal(link.searchParams.get('utm_medium'), 'ecosystem_referral');
      assert.equal(link.searchParams.get('utm_campaign'), 'committedme_cross_promotion');
      const destination = locale.code === 'ru' ? 'ru' : 'en';
      assert.equal(link.pathname, `/${destination}/${placement === 'article_mentor' ? 'become-a-mentor/' : 'for/builders/'}`);
    }
  }
}
assert(llms.includes('https://specscore.md/articles/weekly-delivery.md'), 'LLM article discovery');
console.log(`PASS: ${langs.length} localized homepage → article → CommittedMe journeys, indexes, Markdown, metadata, schema, sitemap and reciprocal hreflang.`);
