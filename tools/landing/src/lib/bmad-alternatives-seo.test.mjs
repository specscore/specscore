import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const landingSrc = join(here, '..');

const TITLE = 'BMAD Method alternatives compared in 2026';
const DESCRIPTION =
  'Compare BMAD alternatives by spec format, agent workflow and CI validation: SpecScore, GitHub Spec Kit, OpenSpec, Kiro, Tessl, Task Master AI and Markdown.';

function read(path) {
  return readFileSync(path, 'utf8');
}

describe('BMAD Method alternatives English SEO', () => {
  const copy = read(join(landingSrc, 'content/bmad-alternatives-en.ts'));
  const component = read(join(landingSrc, 'components/CompetitorAlternatives.astro'));

  it('sets a title and meta under the SERP limits, led by the query', () => {
    assert.equal(TITLE.length, 41);
    assert.ok(TITLE.length <= 60, `title is ${TITLE.length} characters`);
    assert.equal(DESCRIPTION.length, 155);
    assert.ok(DESCRIPTION.length <= 155, `description is ${DESCRIPTION.length} characters`);
    assert.match(copy, new RegExp(`bmadEnTitle = '${TITLE}'`));
    assert.match(copy, new RegExp(`bmadEnDescription =\\s+'${DESCRIPTION.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`));
    assert.match(TITLE, /^BMAD Method alternatives/);
    assert.match(TITLE, /compared/);
    assert.match(TITLE, /2026/);
    assert.match(DESCRIPTION, /BMAD alternatives/);
    assert.match(DESCRIPTION, /spec format/);
    assert.match(DESCRIPTION, /agent workflow/);
    assert.match(DESCRIPTION, /CI validation/);
    for (const name of ['SpecScore', 'GitHub Spec Kit', 'OpenSpec', 'Kiro', 'Tessl', 'Task Master AI', 'Markdown']) {
      assert.match(DESCRIPTION, new RegExp(name));
    }
  });

  it('defines BMAD, SDD, CI and PRD in the first paragraph and links the required pages', () => {
    assert.match(copy, /Breakthrough Method for Agile Ai Driven Development/);
    assert.match(copy, /Spec-driven development/);
    assert.match(copy, /\(SDD\)/);
    assert.match(copy, /Continuous integration \(CI\)/);
    assert.match(copy, /product requirements document \(PRD\)/);
    assert.match(copy, /page\('What is the BMAD Method\?', '\/articles\/bmad-method\/'\)/);
    assert.match(copy, /page\('Spec-driven development', '\/spec-driven-development\/'\)/);
    assert.match(copy, /page\('lint specs in CI', '\/articles\/lint-specs-in-ci\/'\)/);
    assert.match(copy, /them\('GitHub repository', repo\)/);
    assert.match(copy, /them\('open-source', repo\)/);
    assert.match(copy, /These BMAD alternatives range from narrower agent workflows to a checkable spec format/);
  });

  it('adds licence, CI validation, best-alternative and v7 FAQ answers with a 26 November 2026 check note', () => {
    for (const q of [
      'What is BMAD Method?',
      'What are the alternatives to BMAD Method?',
      'BMAD Method vs SpecScore: which should I choose?',
      'What is the best BMAD Method alternative?',
      'Is the BMAD Method free, and what is its licence?',
      'Does BMAD validate specs in CI?',
      'What is BMAD Method v7?',
    ]) {
      assert.match(copy, new RegExp(`q: '${q.replace(/[?]/g, '\\$&')}'`));
    }
    assert.match(copy, /checked 26 November 2026/);
    assert.match(copy, /MIT License/);
    assert.match(copy, /does not document a format linter/);
    assert.match(copy, /no single best BMAD Method alternative/);
    assert.match(copy, /still lists v6\.12 as the stable release/);
    assert.match(copy, /CodeSpeak, Datarim and plain Markdown/);
    assert.match(copy, /BMAD facts on this page were checked against the official repository and documentation on 26 November 2026/);
  });

  it('wires the English BMAD overrides only, and keeps FAQPage markup', () => {
    assert.match(component, /from '\.\.\/content\/bmad-alternatives-en\.ts'/);
    assert.match(component, /!ru && slug === 'bmad-method'/);
    assert.match(component, /bmadEnTitle/);
    assert.match(component, /bmadEnDescription/);
    assert.match(component, /bmadEnHero/);
    assert.match(component, /bmadEnFaqs/);
    assert.match(component, /bmadEnSourcesNote/);
    assert.match(component, /faq-item__q/);
    assert.match(component, /faq-item__a/);
    assert.match(component, /Аналоги \$\{target\.name\} в 2026: SpecScore, OpenSpec и другие/);
  });
});
