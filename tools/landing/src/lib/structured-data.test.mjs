import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { injectHtml } from './structured-data.mjs';

function graph(html) {
  const match = injectHtml(html).match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'expected JSON-LD');
  return JSON.parse(match[1]);
}

const head = (body, { canonical, lang = 'en' } = {}) => `<!doctype html>
<html lang="${lang}">
<head>
  <link rel="canonical" href="${canonical}">
  <title>Example</title>
</head>
<body>
  <a href="${canonical.endsWith('/') && canonical.split('/').length < 5 ? new URL(canonical).pathname : '/'}" class="wordmark">SpecScore.md</a>
  ${body}
</body>
</html>`;

describe('injectHtml', () => {
  it('adds SoftwareApplication on the home page from the visible hero sentence', () => {
    const html = `<!doctype html>
<html lang="en"><head><link rel="canonical" href="https://specscore.md/"></head><body>
<a href="/" class="wordmark"><span class="wordmark__name">SpecScore.md</span></a>
<h1 class="hero__headline">Every ambiguity in your spec</h1>
<p class="hero__sub">SpecScore is an open, lintable file format for specifications — like <code>jq</code> for JSON.</p>
<a href="https://github.com/specscore/specscore">Open-source on GitHub</a>
</body></html>`;
    const data = graph(html);
    const app = data['@graph'].find((node) => node['@type'] === 'SoftwareApplication');
    assert.equal(app.name, 'SpecScore');
    assert.equal(app.description, 'SpecScore is an open, lintable file format for specifications — like jq for JSON.');
    assert.deepEqual(app.sameAs, ['https://github.com/specscore/specscore']);
    assert.ok(!data['@graph'].some((node) => node['@type'] === 'BreadcrumbList'));
    assert.equal(app.offers, undefined);
    assert.equal(app.aggregateRating, undefined);
  });

  it('builds FAQPage answers from the visible questions', () => {
    const html = `<!doctype html>
<html lang="en"><head><link rel="canonical" href="https://specscore.md/faq/"></head><body>
<a href="/" class="wordmark">SpecScore.md</a>
<h1 class="faq-hero__headline">Questions reviewers actually asked.</h1>
<h2 class="faq-item__q">How is SpecScore different from spec-kit?</h2>
<div class="faq-item__a"><p>spec-kit is a methodology. SpecScore is a storage format.</p></div>
</body></html>`;
    const data = graph(html);
    const faq = data['@graph'].find((node) => node['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity.length, 1);
    assert.equal(faq.mainEntity[0].name, 'How is SpecScore different from spec-kit?');
    assert.match(faq.mainEntity[0].acceptedAnswer.text, /storage format/);
    const crumbs = data['@graph'].find((node) => node['@type'] === 'BreadcrumbList');
    assert.equal(crumbs.itemListElement.at(-1).name, 'Questions reviewers actually asked.');
  });

  it('uses the visible comparison heading, lede, and breadcrumb link', () => {
    const html = `<!doctype html>
<html lang="es"><head><link rel="canonical" href="https://specscore.md/es/vs/spec-kit/"></head><body>
<a href="/es/" class="wordmark">SpecScore.md</a>
<p class="hero__breadcrumb"><a href="/es/vs/">Comparaciones</a></p>
<h1 class="hero__headline">SpecScore vs Spec Kit</h1>
<p class="hero__sub">Operan en capas distintas.</p>
</body></html>`;
    const data = graph(html);
    const article = data['@graph'].find((node) => node['@type'] === 'Article');
    assert.equal(article.headline, 'SpecScore vs Spec Kit');
    assert.equal(article.description, 'Operan en capas distintas.');
    assert.equal(article.inLanguage, 'es');
    const names = data['@graph'].find((node) => node['@type'] === 'BreadcrumbList')
      .itemListElement.map((item) => item.name);
    assert.deepEqual(names, ['SpecScore.md', 'Comparaciones', 'SpecScore vs Spec Kit']);
    assert.equal(
      data['@graph'].find((node) => node['@type'] === 'BreadcrumbList').itemListElement[0].item,
      'https://specscore.md/es/',
    );
  });

  it('does not let a heading before the first question swallow it', () => {
    const html = `<!doctype html>
<html lang="en"><head><link rel="canonical" href="https://specscore.md/faq/"></head><body>
<a href="/" class="wordmark">SpecScore.md</a>
<h2 class="sr-only">FAQ list</h2><article>
<h2 id="one" class="faq-item__q">First question?</h2>
<div class="faq-item__a"><p>First answer.</p></div>
</article>
<h2 id="two" class="faq-item__q">Second question?</h2>
<div class="faq-item__a"><p>Second answer.</p></div>
</body></html>`;
    const data = graph(html);
    const names = data['@graph'].find((node) => node['@type'] === 'FAQPage')
      .mainEntity.map((item) => item.name);
    assert.deepEqual(names, ['First question?', 'Second question?']);
  });

  it('leaves pages that already have JSON-LD unchanged', () => {
    const html = '<html><head><script type="application/ld+json">{"@type":"Article"}</script></head><body><h1>Guide</h1></body></html>';
    assert.equal(injectHtml(html), html);
  });
});
