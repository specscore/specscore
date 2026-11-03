import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  alternatesForPath,
  inventoryFromFiles,
  langs,
  localeHasRoute,
  parsePageFile,
} from './route-map.mjs';

describe('locale list', () => {
  it('matches the codes and tags declared in languages.ts', () => {
    const src = readFileSync(new URL('./languages.ts', import.meta.url), 'utf8');
    const codes = [...src.matchAll(/code:\s*'([^']+)'/g)].map((match) => match[1]);
    const tags = [...src.matchAll(/tag:\s*'([^']+)'/g)].map((match) => match[1]);
    assert.deepEqual(codes, langs.map((lang) => lang.code));
    assert.deepEqual(tags, langs.map((lang) => lang.tag));
  });
});

describe('parsePageFile', () => {
  it('treats the root index as English home', () => {
    assert.deepEqual(parsePageFile('../pages/index.astro'), { locale: 'en', route: '/' });
  });

  it('strips a locale prefix and keeps the route', () => {
    assert.deepEqual(parsePageFile('../pages/zh-cn/faq/index.astro'), { locale: 'zh-cn', route: '/faq/' });
    assert.deepEqual(parsePageFile('../pages/pt-br/index.astro'), { locale: 'pt-br', route: '/' });
  });

  it('keeps a file route that is not an index', () => {
    assert.deepEqual(
      parsePageFile('../pages/ru/blog/specs-are-dead-long-live-specs.astro'),
      { locale: 'ru', route: '/blog/specs-are-dead-long-live-specs/' },
    );
  });
});

describe('alternates', () => {
  const files = [
    '../pages/index.astro',
    '../pages/zh-cn/index.astro',
    '../pages/faq/index.astro',
    '../pages/es/faq/index.astro',
    '../pages/ru/blog/specs-are-dead-long-live-specs.astro',
  ];
  const inventory = inventoryFromFiles(files);

  it('lists every translated home plus x-default on the English root', () => {
    const links = alternatesForPath(inventory, '/');
    const tags = links.map((link) => link.hreflang);
    assert.ok(tags.includes('en'));
    assert.ok(tags.includes('zh-CN'));
    assert.equal(tags.at(-1), 'x-default');
    assert.equal(links.find((link) => link.hreflang === 'x-default').href, 'https://specscore.md/');
    assert.equal(links.find((link) => link.hreflang === 'zh-CN').href, 'https://specscore.md/zh-cn/');
    assert.equal(links.filter((link) => link.hreflang === 'es').length, 0);
  });

  it('points x-default at the English URL of the same route', () => {
    const links = alternatesForPath(inventory, '/zh-cn/');
    assert.equal(links.find((link) => link.hreflang === 'x-default').href, 'https://specscore.md/');
  });

  it('does not advertise a locale that has no translation of the page', () => {
    assert.equal(localeHasRoute(inventory, 'en', '/blog/specs-are-dead-long-live-specs/'), false);
    assert.equal(localeHasRoute(inventory, 'ru', '/blog/specs-are-dead-long-live-specs/'), true);
    const links = alternatesForPath(inventory, '/ru/blog/specs-are-dead-long-live-specs/');
    assert.deepEqual(links.map((link) => link.hreflang), ['ru', 'x-default']);
    assert.equal(links[0].href, links[1].href);
  });
});
