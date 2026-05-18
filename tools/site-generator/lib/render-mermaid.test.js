import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { renderMermaidBlocks } from './render-mermaid.js';

describe('renderMermaidBlocks', () => {
  it('replaces mermaid code blocks with <pre class="mermaid"> for client-side rendering', () => {
    const md = [
      'Some text.',
      '',
      '```mermaid',
      'graph LR',
      '    A --> B',
      '```',
      '',
      'More text.',
    ].join('\n');

    const { markdown, hasMermaid } = renderMermaidBlocks(md);

    assert.equal(hasMermaid, true);
    assert.ok(!markdown.includes('```mermaid'), 'mermaid code fence should be removed');
    assert.ok(markdown.includes('<pre class="mermaid">'), 'should emit <pre class="mermaid">');
    assert.ok(markdown.includes('Some text.'), 'surrounding text preserved');
    assert.ok(markdown.includes('More text.'), 'surrounding text preserved');
  });

  it('escapes HTML special chars in diagram source (--> survives as text)', () => {
    const md = ['```mermaid', 'graph LR', '    A --> B', '```'].join('\n');
    const { markdown } = renderMermaidBlocks(md);
    // `>` must be escaped so the browser doesn't parse `-->` as part of a tag.
    assert.ok(markdown.includes('A --&gt; B'), 'should escape > as &gt;');
    assert.ok(!markdown.includes('A --> B'), 'raw --> should not survive');
  });

  it('returns markdown unchanged and hasMermaid=false when no mermaid blocks', () => {
    const md = 'Just regular markdown.\n\n```js\nconsole.log("hi");\n```';
    const { markdown, hasMermaid } = renderMermaidBlocks(md);
    assert.equal(markdown, md);
    assert.equal(hasMermaid, false);
  });

  it('handles multiple mermaid blocks', () => {
    const md = [
      '```mermaid',
      'graph LR',
      '    A --> B',
      '```',
      '',
      'Between.',
      '',
      '```mermaid',
      'graph TD',
      '    C --> D',
      '```',
    ].join('\n');

    const { markdown, hasMermaid } = renderMermaidBlocks(md);
    assert.equal(hasMermaid, true);
    const blockCount = (markdown.match(/<pre class="mermaid">/g) || []).length;
    assert.equal(blockCount, 2, 'should have 2 mermaid blocks');
  });

  it('wraps each block in mermaid-wrap container (CSS parity with old SVG output)', () => {
    const md = ['```mermaid', 'graph LR', '    A --> B', '```'].join('\n');
    const { markdown } = renderMermaidBlocks(md);
    assert.ok(markdown.includes('class="mermaid-wrap"'), 'should have mermaid-wrap wrapper');
    assert.ok(markdown.includes('class="mermaid-label"'), 'should have mermaid-label');
    assert.ok(markdown.includes('class="mermaid-body"'), 'should have mermaid-body');
  });
});
