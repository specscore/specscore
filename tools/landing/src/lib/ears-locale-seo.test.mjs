import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const localesDir = join(here, '../content/articles/locales');

const expected = {
  es: {
    title: 'Notación EARS: formato y ejemplos de requisitos | SpecScore',
    description:
      'La notación EARS (Easy Approach to Requirements Syntax) es un formato para requisitos: patrones, ejemplos y un requisito SpecScore que pasa el linter.',
    h1: 'Notación EARS: formato y ejemplos de requisitos',
    term: 'notación EARS',
    lintAnchor: 'Cómo lintar especificaciones en CI',
    whatIsAnchor: 'Qué es SpecScore',
  },
  'pt-br': {
    title: 'Notação EARS: formato e exemplos de requisitos | SpecScore',
    description:
      'A notação EARS (Easy Approach to Requirements Syntax) é um formato para requisitos: padrões, exemplos e um requisito SpecScore que passa no linter.',
    h1: 'Notação EARS: formato e exemplos de requisitos',
    term: 'notação EARS',
    lintAnchor: 'Como fazer lint de especificações no CI',
    whatIsAnchor: 'O que é o SpecScore',
  },
  'zh-tw': {
    title: 'EARS 格式與需求記法：句式與範例 | SpecScore',
    description:
      'EARS 格式（Easy Approach to Requirements Syntax）是一種需求記法。句式、範例，以及一條能通過檢查器的 SpecScore 需求。',
    h1: 'EARS 格式與需求記法：句式與範例',
    term: 'EARS 格式',
    lintAnchor: '如何在 CI 中檢查規格說明',
    whatIsAnchor: 'SpecScore 是什麼',
  },
  ja: {
    title: 'EARS記法とは：要件の書き方と例 | SpecScore',
    description:
      'EARS記法（Easy Approach to Requirements Syntax）とは、要件を書くための文型です。書き方、例、リンターを通るSpecScoreの要件。',
    h1: 'EARS記法とは：要件の書き方と例',
    term: 'EARS記法',
    lintAnchor: 'CIで仕様をリントする方法',
    whatIsAnchor: 'SpecScoreとは',
  },
};

function earsBlock(code) {
  const src = readFileSync(join(localesDir, `${code}.ts`), 'utf8');
  const start = src.indexOf('const ears: EarsArticleCopy');
  assert.ok(start >= 0, `${code} ears copy`);
  const end = src.indexOf('    originTitle:', start);
  return src.slice(start, end);
}

describe('EARS article locale SEO', () => {
  it('sets Spanish, Brazilian Portuguese, Traditional Chinese and Japanese title and meta to the searched terms', () => {
    for (const [code, want] of Object.entries(expected)) {
      const block = earsBlock(code);
      assert.match(block, new RegExp(`metaTitle: '${want.title.replace(/[()]/g, '\\$&')}'`));
      assert.match(block, new RegExp(`h1: '${want.h1.replace(/[()：]/g, '\\$&')}'`));
      assert.ok(block.includes(want.description), `${code} meta description`);
      assert.ok(want.title.length <= 70, `${code} title is ${want.title.length} characters`);
      assert.ok(want.description.length <= 155, `${code} description is ${want.description.length} characters`);
      assert.match(want.title, /\| SpecScore$/);
    }
  });

  it('uses the local term once in the first paragraph and links the explainer and the CI lint guide', () => {
    for (const [code, want] of Object.entries(expected)) {
      const block = earsBlock(code);
      const heroStart = block.indexOf('hero:');
      const hero = block.slice(heroStart);
      const termCount = hero.split(want.term).length - 1;
      assert.equal(termCount, 1, `${code} hero should use "${want.term}" once, got ${termCount}`);
      assert.match(hero, /Easy Approach to Requirements Syntax/);
      assert.match(hero, /\bREQ\b/);
      assert.match(hero, /\bCI\b|（CI|CI，|CI、/);
      assert.match(hero, /\bSDD\b/);
      assert.match(hero, new RegExp(`t\\('${want.lintAnchor.replace(/[()]/g, '\\$&')}', lintHref\\.article\\)`));
      assert.match(hero, new RegExp(`t\\('${want.whatIsAnchor}', '/what-is-specscore/'\\)`));
    }
  });

  it('leaves the English and Korean EARS titles unchanged', () => {
    const en = earsBlock('en');
    const ko = earsBlock('ko');
    assert.match(en, /metaTitle: 'EARS Requirements Syntax Explained, with Examples \| SpecScore'/);
    assert.match(ko, /metaTitle: 'EARS 요구사항 구문을 예와 함께 설명 \| SpecScore'/);
  });
});
