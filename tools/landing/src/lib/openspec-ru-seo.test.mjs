import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const landingSrc = join(here, '..');

const ALT_TITLE = 'Аналоги OpenSpec: 7 инструментов SDD в сравнении';
const ALT_DESCRIPTION =
  'Аналоги OpenSpec: сравнение SpecScore, Spec Kit, Kiro, BMAD, Tessl, Task Master AI и Markdown по формату, проверке спецификаций в CI и лицензии.';
const VS_TITLE = 'SpecScore vs OpenSpec: что такое OpenSpec';
const VS_DESCRIPTION =
  'Что такое OpenSpec? Сравнение SpecScore и OpenSpec на русском: формат, проверка спецификаций, жизненный цикл и агенты.';
const HUB_DESCRIPTION =
  'Статьи об аналогах инструментов разработки по спецификациям: OpenSpec, Spec Kit, Kiro, Tessl, BMAD Method, Task Master AI, Datarim и CodeSpeak.';
const GENERIC_RU_TITLE = 'Аналоги ${target.name} в 2026: SpecScore и другие';

function read(path) {
  return readFileSync(path, 'utf8');
}

describe('Russian OpenSpec alternatives CTR and query split', () => {
  const alt = read(join(landingSrc, 'components/OpenSpecAlternatives.astro'));
  const vs = read(join(landingSrc, 'pages/ru/vs/openspec/index.astro'));
  const hub = read(join(landingSrc, 'components/AlternativesHub.astro'));
  const competitors = read(join(landingSrc, 'components/CompetitorAlternatives.astro'));

  it('retitles the Russian OpenSpec alternatives page and keeps H1 in sync', () => {
    assert.ok(ALT_TITLE.length <= 60, `title is ${ALT_TITLE.length} characters`);
    assert.ok(ALT_DESCRIPTION.length <= 155, `description is ${ALT_DESCRIPTION.length} characters`);
    assert.match(ALT_TITLE, /^Аналоги OpenSpec/);
    assert.match(ALT_DESCRIPTION, /Аналоги OpenSpec/);
    assert.match(ALT_DESCRIPTION, /проверке спецификаций в CI/);
    assert.match(ALT_DESCRIPTION, /лицензии/);
    assert.match(alt, new RegExp(`title: '${ALT_TITLE}'`));
    assert.match(alt, new RegExp(`h1: '${ALT_TITLE}'`));
    assert.match(alt, new RegExp(`description: '${ALT_DESCRIPTION}'`));
    // English copy is unchanged.
    assert.match(alt, /title: 'OpenSpec Alternatives in 2026: SpecScore, Spec Kit, Kiro and more'/);
    assert.match(alt, /h1: 'OpenSpec alternatives in 2026'/);
  });

  it('defines OpenSpec, SDD, CI and PRD in the first Russian paragraph and links the required pages', () => {
    assert.match(alt, /spec-driven development, SDD/);
    assert.match(alt, /continuous integration, CI/);
    assert.match(alt, /product requirements document, PRD/);
    assert.match(alt, /какие есть аналоги OpenSpec/);
    assert.match(alt, /href: '\/ru\/spec-driven-development\/'/);
    assert.match(alt, /href: '\/ru\/articles\/lint-specs-in-ci\/'/);
    assert.match(alt, /href: '\/ru\/vs\/openspec\/'/);
  });

  it('keeps existing FAQ answers and adds list, difference and licence questions', () => {
    assert.match(alt, /q: 'Есть ли бесплатная альтернатива OpenSpec\?'/);
    assert.match(alt, /q: 'OpenSpec vs Spec Kit: в чём разница\?'/);
    assert.match(alt, /q: 'Что такое OpenSpec\?'/);
    assert.match(alt, /q: 'Какие есть аналоги OpenSpec\?'/);
    assert.match(alt, /q: 'Чем SpecScore отличается от OpenSpec\?'/);
    assert.match(alt, /q: 'Бесплатен ли OpenSpec, и какая у него лицензия\?'/);
    assert.match(alt, /href\.openSpecRepo/);
    assert.match(alt, /href\.openSpecLicense/);
    assert.match(alt, /faq-item__q/);
    assert.match(alt, /faq-item__a/);
  });

  it('drops аналоги from the Russian vs title and meta, and points to the alternatives guide', () => {
    assert.ok(VS_TITLE.length <= 60, `vs title is ${VS_TITLE.length} characters`);
    assert.ok(VS_DESCRIPTION.length <= 155, `vs description is ${VS_DESCRIPTION.length} characters`);
    const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    assert.match(vs, new RegExp(`title="${escape(VS_TITLE)}"`));
    assert.match(vs, new RegExp(`description="${escape(VS_DESCRIPTION)}"`));
    assert.doesNotMatch(vs, /title="[^"]*аналог/i);
    assert.doesNotMatch(vs, /description="[^"]*альтернатив/i);
    assert.match(vs, /SpecScore vs OpenSpec: что такое OpenSpec/);
    assert.match(vs, /href="\/ru\/alternatives\/openspec\/"/);
    assert.match(vs, /Полный список аналогов OpenSpec/);
  });

  it('gives the Russian hub and other alternatives pages their own terms, without OpenSpec in generic titles', () => {
    assert.ok(HUB_DESCRIPTION.length <= 155, `hub description is ${HUB_DESCRIPTION.length} characters`);
    assert.match(hub, new RegExp(`'${HUB_DESCRIPTION}'`));
    assert.match(hub, /title = ru\s*\? 'Аналоги инструментов разработки по спецификациям \(2026\)'/);
    assert.doesNotMatch(hub, /'Аналоги OpenSpec, Spec Kit/);
    assert.match(competitors, /Аналоги \$\{target\.name\} в 2026: SpecScore и другие/);
    assert.doesNotMatch(competitors, /Аналоги \$\{target\.name\} в 2026: SpecScore, OpenSpec и другие/);
    assert.match(competitors, /!\(ru && id === 'openspec'\)/);
    assert.match(competitors, /slug === 'bmad-method' && ru/);
    assert.match(competitors, /href="\/ru\/alternatives\/openspec\/"/);
  });
});
