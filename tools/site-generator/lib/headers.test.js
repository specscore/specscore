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

  it('points every markdown twin at its final HTML URL', () => {
    // Mirrors Workers static-assets _headers matching: rules apply in file
    // order, "! Link" detaches an earlier Link, :name matches one segment
    // and * (:splat) matches the rest.
    const rules = [];
    let current;
    for (const line of headers.split('\n')) {
      if (line.startsWith('/')) {
        current = { path: line.trim(), lines: [] };
        rules.push(current);
      } else if (current && line.startsWith('  ')) {
        current.lines.push(line.trim());
      }
    }
    function canonical(path) {
      let link = [];
      for (const rule of rules) {
        const names = [];
        const source = rule.path
          .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
          .replace(/\*|:([A-Za-z]\w*)/g, (m, name) => {
            names.push(name ?? 'splat');
            return name ? '([^/]+)' : '(.*)';
          });
        const match = path.match(new RegExp(`^${source}$`));
        if (!match) continue;
        const values = Object.fromEntries(names.map((name, i) => [name, match[i + 1]]));
        for (const line of rule.lines) {
          if (line === '! Link') link = [];
          else if (line.startsWith('Link:')) {
            link.push(line.slice(5).trim().replace(/:([A-Za-z]\w*)/g, (m, name) => values[name] ?? m));
          }
        }
      }
      const value = link.find((l) => l.endsWith('rel="canonical"'));
      return value && value.slice(1, value.indexOf('>'));
    }
    const expected = {
      '/index.md': 'https://specscore.md/',
      '/what-is-specscore.md': 'https://specscore.md/what-is-specscore/',
      '/alternatives.md': 'https://specscore.md/alternatives/',
      '/articles.md': 'https://specscore.md/articles/',
      '/docs.md': 'https://specscore.md/docs/',
      '/vs.md': 'https://specscore.md/vs/',
      '/spec-driven-development.md': 'https://specscore.md/spec-driven-development/',
      '/spec-driven-development/tools.md': 'https://specscore.md/spec-driven-development/tools/',
      '/vs/openspec.md': 'https://specscore.md/vs/openspec/',
      '/articles/acceptance-criteria.md': 'https://specscore.md/articles/acceptance-criteria/',
      '/alternatives/openspec.md': 'https://specscore.md/alternatives/openspec/',
      '/cli/install.md': 'https://specscore.md/cli/install/',
      '/ru/index.md': 'https://specscore.md/ru/',
      '/ru/what-is-specscore.md': 'https://specscore.md/ru/what-is-specscore/',
      '/ru/alternatives/openspec.md': 'https://specscore.md/ru/alternatives/openspec/',
      '/feature-specification.md': 'https://specscore.md/feature-specification',
      '/for/developers.md': 'https://specscore.md/for/developers',
      '/new/feature.md': undefined,
    };
    for (const [path, url] of Object.entries(expected)) {
      assert.equal(canonical(path), url, path);
    }
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
    assert.match(
      block('/spec-driven-development/tools/'),
      /Link: <\/spec-driven-development\/tools\.md>; rel="alternate"; type="text\/markdown"/,
    );
    assert.match(
      block('/:locale/spec-driven-development/tools/'),
      /Link: <\/:locale\/spec-driven-development\/tools\.md>; rel="alternate"; type="text\/markdown"/,
    );
  });

  it('stays within the Workers static-assets limit of 100 header rules', () => {
    const rules = headers.split('\n').filter((line) => line.startsWith('/'));
    assert.ok(rules.length <= 100, `${rules.length} header rules`);
    assert.match(
      block('/articles/:slug/'),
      /Link: <\/articles\/:slug\.md>; rel="alternate"; type="text\/markdown"/,
    );
    assert.match(
      block('/:locale/articles/:slug/'),
      /Link: <\/:locale\/articles\/:slug\.md>; rel="alternate"; type="text\/markdown"/,
    );
  });
});
