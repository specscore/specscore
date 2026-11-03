import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { composeLlmsFull, composeLlmsTxt, companionUrl, oneLineDescription } from './llms.mjs';

describe('llms.txt', () => {
  it('starts with the site name and a blockquote, then curated .md links', () => {
    const spec = '# SpecScore\n\n> old summary\n\n## Specifications\n\n- [Feature](https://specscore.md/feature-specification.md): The feature spec.\n';
    const out = composeLlmsTxt(spec, [
      ['Start here', [{
        title: 'Home',
        url: 'https://specscore.md/index.md',
        description: 'SpecScore is an open, lintable file format for specifications.',
      }]],
    ]);
    assert.match(out, /^# SpecScore\n/);
    assert.match(out, /^> SpecScore is an open, lintable Markdown and YAML/m);
    assert.match(out, /https:\/\/github\.com\/specscore\/specscore/);
    assert.match(out, /## Start here\n\n- \[Home\]\(https:\/\/specscore\.md\/index\.md\): SpecScore is/);
    assert.match(out, /## Specifications\n\n- \[Feature\]/);
    assert.ok(out.indexOf('## Start here') < out.indexOf('## Specifications'));
    JSON.parse(JSON.stringify({ ok: true }));
  });

  it('keeps a one-sentence description', () => {
    const line = oneLineDescription('# Title\n\nSpecScore is a format. Second sentence stays out.', 'fallback');
    assert.equal(line, 'SpecScore is a format.');
  });

  it('maps directory routes to raw Markdown URLs', () => {
    assert.equal(companionUrl('/'), '/index.md');
    assert.equal(companionUrl('/es/'), '/es/index.md');
    assert.equal(companionUrl('/spec-driven-development/'), '/spec-driven-development.md');
    assert.equal(companionUrl('/cli/install/'), '/cli/install.md');
  });

  it('concatenates key pages ahead of the specification corpus', () => {
    const out = composeLlmsFull(
      [{ title: 'Home', url: 'https://specscore.md/index.md', body: 'SpecScore is a format.' }],
      '# SpecScore — Full Documentation\n\n## File: feature-specification\n\nbody\n',
    );
    assert.match(out, /^# SpecScore — Full documentation\n/);
    assert.match(out, /## Home\n\nURL: https:\/\/specscore\.md\/index\.md\n\nSpecScore is a format\./);
    assert.ok(out.indexOf('## Home') < out.indexOf('feature-specification'));
  });
});
