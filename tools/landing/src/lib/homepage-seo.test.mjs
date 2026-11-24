import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const landingSrc = join(here, '..');
const repoRoot = join(landingSrc, '../../..');

const EN_TITLE = 'SpecScore (Spec Score): a lintable spec format, validated in CI';
const EN_DESCRIPTION =
  'A spec score is how SpecScore checks a specification: the linter passes or fails structure, references and status in CI. See what a spec score means.';

const LOCALES = ['de', 'es', 'fr', 'it', 'pl', 'pt-br', 'ru', 'tr', 'uk', 'ja', 'zh-cn', 'zh-tw', 'ko'];

function read(path) {
  return readFileSync(path, 'utf8');
}

function attr(src, name) {
  const match = src.match(new RegExp(`\\b${name}="([^"]*)"`));
  assert.ok(match, `expected ${name}`);
  return match[1];
}

function heroSub(src) {
  const match = src.match(/<p class="hero__sub">\s*([\s\S]*?)\s*<\/p>/);
  assert.ok(match, 'expected hero__sub');
  return match[1];
}

describe('homepage title and meta', () => {
  it('sets the English title and description that answer "spec score"', () => {
    const layout = read(join(landingSrc, 'layouts/BaseLayout.astro'));
    assert.match(layout, new RegExp(`title = '${EN_TITLE.replace(/[()]/g, '\\$&')}'`));
    assert.match(layout, new RegExp(`description = '${EN_DESCRIPTION.replace(/[()]/g, '\\$&')}'`));
    assert.ok(EN_TITLE.length <= 70, `title is ${EN_TITLE.length} characters`);
    assert.ok(EN_DESCRIPTION.length <= 155, `description is ${EN_DESCRIPTION.length} characters`);
    assert.match(EN_TITLE, /SpecScore \(Spec Score\)/);
    assert.match(EN_DESCRIPTION, /spec score/i);
    assert.match(EN_TITLE, /\bCI\b/);
    assert.match(EN_DESCRIPTION, /\bCI\b/);
  });

  it('gives each locale homepage an equivalent SpecScore title and meta', () => {
    for (const loc of LOCALES) {
      const src = read(join(landingSrc, 'pages', loc, 'index.astro'));
      const title = attr(src, 'title');
      const description = attr(src, 'description');
      assert.match(title, /SpecScore/, `${loc} title`);
      assert.match(title, /CI/, `${loc} title mentions CI`);
      assert.ok(title.length <= 70, `${loc} title is ${title.length} characters`);
      assert.match(description, /spec score/i, `${loc} description`);
      assert.match(description, /CI/, `${loc} description mentions CI`);
      assert.ok(description.length <= 160, `${loc} description is ${description.length} characters`);
    }
  });
});

describe('homepage intro and internal links', () => {
  const heroes = {
    en: 'Hero.astro',
    de: 'HeroDe.astro',
    es: 'HeroEs.astro',
    fr: 'HeroFr.astro',
    it: 'HeroIt.astro',
    pl: 'HeroPl.astro',
    'pt-br': 'HeroPtBr.astro',
    ru: 'HeroRu.astro',
    tr: 'HeroTr.astro',
    uk: 'HeroUk.astro',
    ja: 'HeroJa.astro',
    ko: 'HeroKo.astro',
    'zh-cn': 'HeroZhCn.astro',
    'zh-tw': 'HeroZhTw.astro',
  };

  it('defines SpecScore in the English hero and links what a spec score means', () => {
    const sub = heroSub(read(join(landingSrc, 'components', heroes.en)));
    assert.match(sub, /SpecScore is an open, lintable file format for specifications/);
    assert.match(sub, /YAML Ain't Markup Language/);
    assert.match(sub, /command-line interface \(CLI\)/);
    assert.match(sub, /CI \(continuous integration\)/);
    assert.match(sub, /SDD \(/);
    assert.match(sub, /<a href="\/spec-driven-development\/">spec-driven development<\/a>/);
    assert.match(sub, /<a href="\/what-is-specscore\/">What a spec score means<\/a>/);
    assert.match(sub, /<a href="\/articles\/lint-specs-in-ci\/">how to lint specs in CI<\/a>/);
  });

  it('links /what-is-specscore/ and the locale SDD and CI articles from every homepage hero', () => {
    for (const [loc, file] of Object.entries(heroes)) {
      const sub = heroSub(read(join(landingSrc, 'components', file)));
      assert.match(sub, /href="\/what-is-specscore\/"/, `${loc} hero what-is link`);
      const sdd = loc === 'en' ? '/spec-driven-development/' : `/${loc}/spec-driven-development/`;
      const lint = loc === 'en' ? '/articles/lint-specs-in-ci/' : `/${loc}/articles/lint-specs-in-ci/`;
      assert.match(sub, new RegExp(`href="${sdd}"`), `${loc} hero SDD link`);
      assert.match(sub, new RegExp(`href="${lint}"`), `${loc} hero lint-in-CI link`);
    }
  });

  it('links /what-is-specscore/ from the English and locale FAQ naming answers and from /docs/', () => {
    const enFaq = read(join(landingSrc, 'pages/faq/index.astro'));
    assert.match(enFaq, /<a href="\/what-is-specscore\/">What is SpecScore\? What a spec score means<\/a>/);
    for (const loc of LOCALES) {
      const faq = read(join(landingSrc, 'pages', loc, 'faq/index.astro'));
      assert.match(faq, /id="naming"/, `${loc} FAQ naming item`);
      assert.match(faq, /href="\/what-is-specscore\/"/, `${loc} FAQ what-is link`);
    }
    const docs = read(join(repoRoot, 'docs/docs-index.md'));
    assert.match(docs, /\[What is SpecScore\? What a spec score means\]\(\/what-is-specscore\/\)/);
  });
});
