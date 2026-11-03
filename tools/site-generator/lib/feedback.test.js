import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {injectIntoTemplate} from './render-page.js';

test('docs and fallback landing share exactly one product feedback widget', async () => {
  const template = await readFile(new URL('../template.html', import.meta.url), 'utf8');
  for (const slug of ['index', 'docs', 'blog/example']) {
    const html = injectIntoTemplate(template, {title: 'Page', content: '<p>Content</p>', slug, sidebarGroups: []});
    assert.equal((html.match(/https:\/\/improveit.now\/widget.js/g) ?? []).length, 1);
    assert.match(html, /data-space="ao58m" data-app="75251aa279608b533e93a785f5ae3aee"/);
    assert.match(html, /data-launcher="hidden"/);
    assert.doesNotMatch(html, /data-screen|data-url|data-path/);
  }
});
