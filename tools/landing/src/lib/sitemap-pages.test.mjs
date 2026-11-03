import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { urlForDocsSlug, urlsFromPages, withHreflang } from './sitemap-pages.mjs';

describe('docs sitemap URLs', () => {
  it('uses trailing slashes only for directory indexes', () => {
    assert.equal(urlForDocsSlug('docs'), 'https://specscore.md/docs/');
    assert.equal(urlForDocsSlug('blog'), 'https://specscore.md/blog/');
    assert.equal(urlForDocsSlug('feature-specification'), 'https://specscore.md/feature-specification');
  });

  it('includes HTML pages and blog posts, not the overwritten home', () => {
    const urls = urlsFromPages(
      [
        { slug: 'index' },
        { slug: 'docs' },
        { slug: 'feature-specification' },
        { slug: 'blog' },
      ],
      ['2026-04-14-what-is-spec-driven-development.md', 'README.md'],
    );
    assert.deepEqual(urls, [
      'https://specscore.md/blog/',
      'https://specscore.md/blog/what-is-spec-driven-development',
      'https://specscore.md/docs/',
      'https://specscore.md/feature-specification',
    ]);
    assert.ok(urls.every((url) => !url.endsWith('.md')));
  });
});

describe('withHreflang', () => {
  it('adds x-default on the English URL when translations exist', () => {
    const item = withHreflang({
      url: 'https://specscore.md/es/faq/',
      links: [
        { url: 'https://specscore.md/faq/', lang: 'en' },
        { url: 'https://specscore.md/es/faq/', lang: 'es' },
      ],
    });
    const xdefault = item.links.find((link) => link.lang === 'x-default');
    assert.equal(xdefault.url, 'https://specscore.md/faq/');
    assert.equal(item.links.length, 3);
  });

  it('self-references an English-only docs page', () => {
    const item = withHreflang({ url: 'https://specscore.md/feature-specification' });
    assert.deepEqual(item.links, [
      { url: 'https://specscore.md/feature-specification', lang: 'en' },
      { url: 'https://specscore.md/feature-specification', lang: 'x-default' },
    ]);
  });

  it('keeps a Russian-only page on ru', () => {
    const url = 'https://specscore.md/ru/blog/specs-are-dead-long-live-specs/';
    const item = withHreflang({ url });
    assert.deepEqual(item.links.map((link) => link.lang), ['ru', 'x-default']);
    assert.ok(item.links.every((link) => link.url === url));
  });
});
