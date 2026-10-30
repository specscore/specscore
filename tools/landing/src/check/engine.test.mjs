import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { detectFormat } from './detect.mjs';
import { examples } from './examples.mjs';
import { scoreQuality } from './quality.mjs';
import { restructure } from './restructure.mjs';
import { badgeMarkdown, parseShareHash, shareHash } from './share.mjs';
import { scoreDocument } from './score.mjs';
import { zipStore } from './zip.mjs';
import { runLintWasm } from './browser-lint.mjs';
import { SPECSCORE_CLI_VERSION } from './pin.mjs';
import { jsonLd } from './jsonld.mjs';
import { messages } from './i18n.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const wasmPath = join(here, '../../public/check/specscore-lint.wasm');

function ensureWasm() {
  if (existsSync(wasmPath)) return readFileSync(wasmPath);
  const build = join(here, '../../../webcheck/build.sh');
  const result = spawnSync('sh', [build], { stdio: 'inherit' });
  assert.equal(result.status, 0, 'wasm build failed');
  return readFileSync(wasmPath);
}

test('each example is detected as its own format', () => {
  const expected = {
    prd: 'prd',
    openspec: 'openspec',
    'openspec-bad': 'openspec',
    'spec-kit': 'spec-kit',
    kiro: 'kiro',
    bmad: 'bmad',
    'task-master': 'task-master',
    ears: 'ears',
    rfc: 'rfc',
    'user-stories': 'user-stories',
    markdown: 'markdown',
    specscore: 'specscore',
    'specscore-bad': 'specscore',
  };
  for (const example of examples) {
    const detected = detectFormat(example.files);
    assert.equal(detected.format, expected[example.id], `${example.id} detected as ${detected.format}`);
  }
});

test('a vague PRD scores below a Spec Kit spec on the same rubric', () => {
  const vague = scoreQuality(examples.find((item) => item.id === 'prd').files);
  const kit = scoreQuality(examples.find((item) => item.id === 'spec-kit').files);
  assert.ok(kit.score > vague.score, `${kit.score} should beat ${vague.score}`);
  assert.ok(vague.findings.every((item) => item.origin === 'generic'));
  assert.ok(vague.findings.some((item) => item.id === 'quality/unambiguous' && item.status !== 'pass'));
});

test('share links keep the score and drop the spec text', () => {
  const secret = 'the-account-owner-device-token-should-not-leak';
  const hash = shareHash({ format: 'openspec', score: 70, errors: 1, warnings: 2 });
  assert.equal(hash.includes(secret), false);
  assert.equal(hash.includes('WHEN'), false);
  const parsed = parseShareHash(hash);
  assert.deepEqual(parsed, { format: 'openspec', score: 70, errors: 1, warnings: 2 });
  assert.equal(parseShareHash(`#v=1&fmt=openspec&q=1&note=${secret}`), null);
  const badge = badgeMarkdown(70, 'https://specscore.md/check/');
  assert.equal(badge.includes(secret), false);
  assert.match(badge, /spec%20quality-70%2F100/);
});

test('OpenSpec text is not judged by the SpecScore Open Questions rule', async () => {
  const result = await scoreDocument(examples.find((item) => item.id === 'openspec').files);
  assert.equal(result.quality.findings.some((item) => item.id === 'oq-section'), false);
  assert.equal(result.conventions.some((item) => item.origin === 'convention' && item.id.startsWith('openspec/')), true);
  const bad = await scoreDocument(examples.find((item) => item.id === 'openspec-bad').files);
  assert.ok(bad.conventions.some((item) => item.id === 'openspec/shall' && item.status !== 'pass'));
});

test('skeleton quotes scenarios as acceptance criteria and names real files', () => {
  const skeleton = restructure(examples.find((item) => item.id === 'openspec').files);
  const feature = skeleton.files.find((file) => file.path.endsWith('/README.md') && file.path.includes('/features/'));
  assert.match(feature.text, /^### AC: [a-z0-9-]+$/m);
  assert.match(feature.text, /## Open Questions/);
  assert.match(feature.text, /theme toggle/i);
  assert.ok(skeleton.files.some((file) => file.path === 'spec/features/README.md'));
  assert.ok(skeleton.recommendations.some((item) => item.key === 'rec-ac'));
});

test('zip of the skeleton round-trips the feature README', () => {
  const skeleton = restructure(examples.find((item) => item.id === 'kiro').files);
  const bytes = zipStore(skeleton.files);
  const dir = mkdtempSync(join(tmpdir(), 'spec-zip-'));
  const zipPath = join(dir, 'skeleton.zip');
  writeFileSync(zipPath, bytes);
  execFileSync('python3', ['-c', `
import zipfile, sys
z = zipfile.ZipFile(sys.argv[1])
names = z.namelist()
assert any(name.endswith('/README.md') for name in names), names
text = z.read([n for n in names if n.startswith('spec/features/') and n.count('/') == 3][0]).decode()
assert '## Acceptance Criteria' in text
`, zipPath], { stdio: 'inherit' });
});

test('cli pin matches dogfood and the wasm module', () => {
  const dogfood = readFileSync(join(here, '../../../../.github/workflows/dogfood.yml'), 'utf8');
  const gomod = readFileSync(join(here, '../../../webcheck/go.mod'), 'utf8');
  assert.match(dogfood, new RegExp(`SPECSCORE_VERSION:\\s*${SPECSCORE_CLI_VERSION}`));
  assert.match(gomod, new RegExp(`specscore-cli ${SPECSCORE_CLI_VERSION}`));
});

test('wasm lint is the real specscore rule set', async () => {
  const wasm = ensureWasm();
  const bad = examples.find((item) => item.id === 'specscore-bad').files;
  const result = await scoreDocument(bad, {
    format: 'specscore',
    lint: (files) => runLintWasm(wasm, files),
  });
  const rules = result.specscore.violations.map((item) => item.rule);
  assert.ok(rules.includes('oq-section'), rules.join(','));
  assert.ok(rules.includes('ac-heading-format'), rules.join(','));
  assert.equal(result.specscore.violations.every((item) => item.file === 'features/pasted/README.md'), true);
  const catalog = await runLintWasm(wasm, [], { catalog: true });
  assert.equal(catalog.version, SPECSCORE_CLI_VERSION);
  assert.ok(catalog.rules.length >= 100);
  assert.ok(catalog.rules.some((rule) => rule.id === 'oq-section' && /Open Questions/.test(rule.description)));
});

test('generated skeleton is linted by the real rules, not a guessed number', async () => {
  const wasm = ensureWasm();
  const result = await scoreDocument(examples.find((item) => item.id === 'openspec').files, {
    lint: (files) => runLintWasm(wasm, files),
  });
  assert.ok(result.skeletonLint);
  assert.equal(result.skeletonLint.version, SPECSCORE_CLI_VERSION);
  const failing = result.skeletonLint.violations.filter((item) => !item.advisory);
  assert.deepEqual(failing, [], failing.map((item) => `${item.file} ${item.rule}: ${item.message}`).join('\n'));
  assert.equal(typeof result.skeletonQuality.score, 'number');
});

test('every locale has the English message keys', () => {
  const keys = Object.keys(messages.en).sort();
  for (const [locale, table] of Object.entries(messages)) {
    assert.deepEqual(Object.keys(table).sort(), keys, locale);
    if (locale !== 'en') assert.notEqual(table.metaTitle, messages.en.metaTitle, locale);
  }
});

test('JSON-LD is a free web app plus the visible FAQ', () => {
  const graph = jsonLd({
    title: messages.en.metaTitle,
    description: messages.en.metaDescription,
    url: 'https://specscore.md/check/',
    lang: 'en',
    h1: messages.en.h1,
    faqs: messages.en.faqs,
  });
  const app = graph.find((node) => node['@type'].includes('WebApplication'));
  assert.equal(app.isAccessibleForFree, true);
  assert.equal(app.offers.price, '0');
  const faq = graph.find((node) => node['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, messages.en.faqs.length);
  assert.equal(faq.mainEntity[0].name, messages.en.faqs[0].q);
});
