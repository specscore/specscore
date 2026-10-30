import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  canonicalUrlForSlug,
  clipMeta,
  descriptionFromMarkdown,
  descriptionMetaTag,
  htmlOutputRelative,
  hreflangLinkTags,
  jsonLdScript,
  publicHrefForSlug,
} from './page-meta.js';

describe('canonical URLs', () => {
  it('uses a trailing slash for directory indexes and the site root', () => {
    assert.equal(canonicalUrlForSlug('index'), 'https://specscore.md/');
    assert.equal(canonicalUrlForSlug('docs'), 'https://specscore.md/docs/');
    assert.equal(canonicalUrlForSlug('blog'), 'https://specscore.md/blog/');
    assert.equal(canonicalUrlForSlug('new'), 'https://specscore.md/new/');
  });

  it('leaves spec pages without a trailing slash', () => {
    assert.equal(canonicalUrlForSlug('feature-specification'), 'https://specscore.md/feature-specification');
    assert.equal(publicHrefForSlug('feature-specification'), '/feature-specification');
    assert.equal(htmlOutputRelative('feature-specification'), 'feature-specification.html');
  });

  it('writes docs and blog as directory indexes', () => {
    assert.equal(htmlOutputRelative('docs'), 'docs/index.html');
    assert.equal(htmlOutputRelative('blog'), 'blog/index.html');
    assert.equal(publicHrefForSlug('docs'), '/docs/');
    assert.equal(publicHrefForSlug('blog'), '/blog/');
  });
});

describe('descriptionFromMarkdown', () => {
  it('uses the Summary section when one is present', () => {
    const markdown = `---
format: https://specscore.md/feature-specification
---

# Feature: Feature

> studio toolbar

**Status:** Stable

## Summary

A feature is the atomic unit of product specification in SpecScore. It describes a capability.

## Problem

Something else.
`;
    const description = descriptionFromMarkdown(markdown);
    assert.match(description, /^A feature is the atomic unit/);
    assert.ok(!description.includes('Something else'));
    assert.ok(!description.includes('Stable'));
  });

  it('falls back to the first prose paragraph and strips markdown', () => {
    const markdown = `# SpecScore for Developers

SpecScore gives developers [clear specs](/feature-specification) to build against — \`specscore.yaml\` included.
`;
    assert.equal(
      descriptionFromMarkdown(markdown),
      'SpecScore gives developers clear specs to build against — specscore.yaml included.',
    );
  });
});

describe('head tags', () => {
  it('clips meta descriptions and escapes quotes', () => {
    const long = 'Word '.repeat(50);
    const clipped = clipMeta(long);
    assert.ok(clipped.length <= 160);
    assert.ok(clipped.endsWith('…'));
    const tag = descriptionMetaTag('Specs & "plans"');
    assert.match(tag, /content="Specs &amp; &quot;plans&quot;"/);
  });

  it('emits en and x-default hreflang for an English docs page', () => {
    const tags = hreflangLinkTags('https://specscore.md/feature-specification');
    assert.match(tags, /hreflang="en"/);
    assert.match(tags, /hreflang="x-default"/);
    assert.equal((tags.match(/feature-specification/g) || []).length, 2);
  });

  it('builds TechArticle JSON-LD from the visible heading and description', () => {
    const script = jsonLdScript({
      slug: 'feature-specification',
      title: 'Feature Specification',
      content: '<h1>Feature: Feature</h1><p>A feature is the atomic unit.</p>',
      canonical: 'https://specscore.md/feature-specification',
      description: 'A feature is the atomic unit.',
    });
    assert.match(script, /"@type":"TechArticle"/);
    assert.match(script, /"headline":"Feature: Feature"/);
    assert.match(script, /"description":"A feature is the atomic unit\."/);
    assert.match(script, /"@type":"BreadcrumbList"/);
    assert.match(script, /"name":"SpecScore\.md"/);
    assert.ok(!script.includes('aggregateRating'));
  });

  it('uses Article for blog posts and includes the visible date', () => {
    const script = jsonLdScript({
      slug: 'blog/what-is-spec-driven-development',
      title: 'What Is Spec-Driven Development?',
      content: '<h1>What Is Spec-Driven Development?</h1>',
      canonical: 'https://specscore.md/blog/what-is-spec-driven-development',
      description: 'Running one AI agent on one task works fine.',
      datePublished: '2026-04-14',
    });
    assert.match(script, /"@type":"Article"/);
    assert.match(script, /"datePublished":"2026-04-14"/);
  });
});
