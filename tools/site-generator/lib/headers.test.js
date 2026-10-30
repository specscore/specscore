import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const headers = readFileSync(join(root, '_headers'), 'utf8');

function block(path) {
  const match = headers.match(new RegExp(`(?:^|\\n)${path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n((?:  .*\\n)*)`));
  assert.ok(match, `missing _headers block for ${path}`);
  return match[1];
}

describe('_headers', () => {
  it('points markdown twins at the HTML URL and keeps them fetchable', () => {
    const markdown = block('/*.md');
    assert.match(markdown, /Content-Type: text\/markdown; charset=utf-8/);
    assert.match(markdown, /Link: <https:\/\/specscore\.md\/:splat>; rel="canonical"/);
    assert.ok(!/noindex/.test(markdown));
  });

  it('canonicalizes /docs.md to the trailing-slash HTML page', () => {
    const docs = block('/docs.md');
    assert.match(docs, /! Link/);
    assert.match(docs, /Link: <https:\/\/specscore\.md\/docs\/>; rel="canonical"/);
  });

  it('does not canonicalize raw /new templates onto a missing HTML twin', () => {
    assert.match(block('/new/*'), /! Link/);
  });

  it('noindexes llms.txt indexes without blocking the response', () => {
    assert.match(block('/llms.txt'), /X-Robots-Tag: noindex/);
    assert.match(block('/llms-full.txt'), /X-Robots-Tag: noindex/);
  });

  it('noindexes the internal pages README', () => {
    assert.match(block('/README/'), /X-Robots-Tag: noindex/);
  });

  it('advertises the spec-driven development tools Markdown sibling', () => {
    const prefixes = ['', '/es', '/de', '/fr', '/it', '/pl', '/pt-br', '/ru', '/tr', '/uk', '/ja', '/zh-cn', '/zh-tw', '/ko'];
    for (const prefix of prefixes) {
      const path = `${prefix}/spec-driven-development/tools/`;
      assert.match(
        block(path),
        new RegExp(`Link: <${prefix}/spec-driven-development/tools\\.md>; rel="alternate"; type="text/markdown"`),
      );
    }
  });
});
