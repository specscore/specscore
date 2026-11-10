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
    const org = data['@graph'].find((node) => node['@type'] === 'Organization');
    const code = data['@graph'].find((node) => node['@type'] === 'SoftwareSourceCode');
    assert.equal(org.name, 'SpecScore');
    assert.equal(org.url, 'https://specscore.md/');
    assert.equal(org.logo, undefined);
    assert.deepEqual(org.sameAs, ['https://github.com/specscore', 'https://github.com/specscore/specscore']);
    assert.equal(app.name, 'SpecScore');
    assert.equal(app.description, 'SpecScore is an open, lintable file format for specifications — like jq for JSON.');
    assert.deepEqual(app.sameAs, org.sameAs);
    assert.equal(code.codeRepository, 'https://github.com/specscore/specscore');
    assert.equal(code.license, 'https://github.com/specscore/specscore/blob/main/LICENSE');
    assert.ok(!data['@graph'].some((node) => node['@type'] === 'BreadcrumbList'));
    assert.equal(app.offers, undefined);
    assert.equal(app.aggregateRating, undefined);
    JSON.parse(JSON.stringify(data));
  });

  it('adds a logo and the CLI repository only when the page links to them', () => {
    const html = `<!doctype html>
<html lang="en"><head>
<link rel="canonical" href="https://specscore.md/">
<link rel="icon" href="/favicon.svg">
</head><body>
<h1 class="hero__headline">SpecScore</h1>
<p class="hero__sub">SpecScore is a Markdown format. Go CLI.</p>
<a href="https://github.com/specscore/specscore">repo</a>
<a href="https://github.com/specscore/specscore-cli">cli</a>
<summary class="faq-teaser__q">What licence is SpecScore under?</summary>
<div class="faq-teaser__a"><p>CC BY 4.0.</p><a class="faq-teaser__more" href="/faq/#licence">Full answer</a></div>
</body></html>`;
    const data = graph(html);
    const org = data['@graph'].find((node) => node['@type'] === 'Organization');
    assert.equal(org.logo.url, 'https://specscore.md/favicon.svg');
    const codes = data['@graph'].filter((node) => node['@type'] === 'SoftwareSourceCode');
    assert.equal(codes[0].programmingLanguage, 'Markdown');
    assert.equal(codes[1].name, 'specscore CLI');
    assert.equal(codes[1].programmingLanguage, 'Go');
    const faq = data['@graph'].find((node) => node['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity[0].acceptedAnswer.text, 'CC BY 4.0.');
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

  it('gives the OpenSpec alternatives article, FAQ and breadcrumbs', () => {
    const html = `<!doctype html><html lang="ru"><head><link rel="canonical" href="https://specscore.md/ru/alternatives/openspec/"></head><body>
<a href="/ru/" class="wordmark">SpecScore.md</a>
<p class="hero__breadcrumb"><a href="/ru/vs/">Сравнения</a></p>
<h1 class="hero__headline">Аналоги OpenSpec в 2026 году</h1>
<p class="hero__sub">OpenSpec — фреймворк разработки по спецификациям.</p>
<h2 class="faq-item__q">Что такое OpenSpec?</h2><div class="faq-item__a"><p>Фреймворк для ИИ-агентов.</p></div>
</body></html>`;
    const nodes = graph(html)['@graph'];
    assert.equal(nodes.find((node) => node['@type'] === 'Article').url, 'https://specscore.md/ru/alternatives/openspec/');
    assert.equal(nodes.find((node) => node['@type'] === 'FAQPage').mainEntity[0].name, 'Что такое OpenSpec?');
    assert.deepEqual(nodes.find((node) => node['@type'] === 'BreadcrumbList').itemListElement.map((item) => item.name), ['SpecScore.md', 'Сравнения', 'Аналоги OpenSpec в 2026 году']);
  });

  it('gives each competitor alternatives page Article, FAQ and breadcrumbs', () => {
    for (const slug of ['spec-kit', 'kiro', 'tessl', 'bmad-method', 'task-master-ai', 'datarim', 'codespeak']) {
      for (const prefix of ['', '/ru']) {
        const url = `https://specscore.md${prefix}/alternatives/${slug}/`;
        const html = `<!doctype html><html lang="${prefix ? 'ru' : 'en'}"><head><link rel="canonical" href="${url}"></head><body>
<a href="${prefix}/" class="wordmark">SpecScore.md</a>
<p class="hero__breadcrumb"><a href="${prefix}/vs/">Comparisons</a></p>
<h1 class="hero__headline">${slug} alternatives in 2026</h1>
<p class="hero__sub">A guide to choosing a specification tool.</p>
<h2 class="faq-item__q">What is ${slug}?</h2><div class="faq-item__a"><p>A development tool.</p></div>
</body></html>`;
        const nodes = graph(html)['@graph'];
        assert.equal(nodes.find((node) => node['@type'] === 'Article').url, url);
        assert.equal(nodes.find((node) => node['@type'] === 'FAQPage').mainEntity[0].name, `What is ${slug}?`);
        assert.equal(nodes.find((node) => node['@type'] === 'BreadcrumbList').itemListElement.length, 3);
      }
    }
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

  it('treats the spec-driven development tools roundup as an article', () => {
    const html = `<!doctype html>
<html lang="en"><head><link rel="canonical" href="https://specscore.md/spec-driven-development/tools/"></head><body>
<a href="/" class="wordmark">SpecScore.md</a>
<p class="hero__breadcrumb"><a href="/spec-driven-development/">Spec-driven development</a></p>
<h1 class="hero__headline">Best spec-driven development tools in 2026</h1>
<p class="hero__sub">Spec-driven development (SDD) is a practice.</p>
<time datetime="2026-10-30">30 October 2026</time>
</body></html>`;
    const data = graph(html);
    const article = data['@graph'].find((node) => node['@type'] === 'TechArticle');
    assert.equal(article.datePublished, '2026-10-30');
    assert.equal(article.dateModified, '2026-10-30');
    assert.equal(article.headline, 'Best spec-driven development tools in 2026');
    assert.equal(article.url, 'https://specscore.md/spec-driven-development/tools/');
    const names = data['@graph'].find((node) => node['@type'] === 'BreadcrumbList')
      .itemListElement.map((item) => item.name);
    assert.deepEqual(names, ['SpecScore.md', 'Spec-driven development', 'Best spec-driven development tools in 2026']);
  });

  it('treats an articles page as an article and reads its FAQ', () => {
    const html = `<!doctype html>
<html lang="en"><head><link rel="canonical" href="https://specscore.md/articles/ears-requirements/"></head><body>
<a href="/" class="wordmark">SpecScore.md</a>
<p class="hero__breadcrumb"><a href="/articles/">Articles</a></p>
<h1 class="hero__headline">EARS requirements syntax explained, with examples</h1>
<p class="hero__sub">EARS (Easy Approach to Requirements Syntax) is a requirements notation.</p>
<h2 class="faq-item__q">What does EARS stand for?</h2>
<div class="faq-item__a"><p>Easy Approach to Requirements Syntax.</p></div>
</body></html>`;
    const data = graph(html);
    const article = data['@graph'].find((node) => node['@type'] === 'Article');
    assert.equal(article.headline, 'EARS requirements syntax explained, with examples');
    assert.equal(article.url, 'https://specscore.md/articles/ears-requirements/');
    const faq = data['@graph'].find((node) => node['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity[0].name, 'What does EARS stand for?');
    const names = data['@graph'].find((node) => node['@type'] === 'BreadcrumbList')
      .itemListElement.map((item) => item.name);
    assert.deepEqual(names, ['SpecScore.md', 'Articles', 'EARS requirements syntax explained, with examples']);
  });

  it('treats the acceptance criteria article as an article and reads its FAQ', () => {
    const html = `<!doctype html>
<html lang="en"><head><link rel="canonical" href="https://specscore.md/articles/acceptance-criteria/"></head><body>
<a href="/" class="wordmark">SpecScore.md</a>
<p class="hero__breadcrumb"><a href="/articles/">Articles</a></p>
<h1 class="hero__headline">How to write acceptance criteria AI agents can verify</h1>
<p class="hero__sub">Acceptance criteria (AC) are the conditions that must be true before a change counts as done.</p>
<h2 class="faq-item__q">What are acceptance criteria?</h2>
<div class="faq-item__a"><p>Acceptance criteria (AC) are the conditions that must be true before a change counts as done.</p></div>
</body></html>`;
    const data = graph(html);
    const article = data['@graph'].find((node) => node['@type'] === 'Article');
    assert.equal(article.headline, 'How to write acceptance criteria AI agents can verify');
    assert.equal(article.url, 'https://specscore.md/articles/acceptance-criteria/');
    const faq = data['@graph'].find((node) => node['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity[0].name, 'What are acceptance criteria?');
    const names = data['@graph'].find((node) => node['@type'] === 'BreadcrumbList')
      .itemListElement.map((item) => item.name);
    assert.deepEqual(names, ['SpecScore.md', 'Articles', 'How to write acceptance criteria AI agents can verify']);
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
