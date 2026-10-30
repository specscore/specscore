import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLlmsFull, buildLlmsIndex } from '../../../site-generator/lib/build-llms.js';
import { firstBlock, htmlToMarkdown, sectionMarkdown } from './html-to-md.mjs';

const ORIGIN = 'https://specscore.md';
const LOCALES = ['es', 'de', 'fr', 'it', 'pl', 'pt-br', 'ru', 'tr', 'uk', 'ja', 'zh-cn', 'zh-tw', 'ko'];

const SUMMARY = [
  '> SpecScore is an open, lintable Markdown and YAML file format for specifications — features, requirements, and acceptance criteria — plus a command-line interface (CLI) that AI agents call to query, edit, and lint those files.',
  '> The format and this website are in the public repository https://github.com/specscore/specscore (Creative Commons Attribution 4.0). The reference CLI is in https://github.com/specscore/specscore-cli (Apache-2.0).',
].join('\n');

/**
 * @param {string} markdown
 * @param {string} fallback
 */
export function oneLineDescription(markdown, fallback) {
  const text = String(markdown)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#+\s+.*$/gm, ' ')
    .replace(/^Canonical:.*$/gm, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const sentence = (text.split(/(?<=[.!?。])\s/)[0] || fallback).trim();
  if (!sentence) return fallback;
  if (sentence.length <= 400) return sentence;
  return `${sentence.slice(0, 397).replace(/\s+\S*$/, '')}…`;
}

/**
 * @param {{ title: string, url: string, description: string }[]} entries
 */
function section(title, entries) {
  const lines = entries
    .filter((entry) => entry && entry.url && entry.title && entry.description)
    .map((entry) => `- [${entry.title}](${entry.url}): ${entry.description.replace(/\s+/g, ' ').trim()}`);
  if (!lines.length) return '';
  return `## ${title}\n\n${lines.join('\n')}`;
}

/**
 * llmstxt.org index: H1, blockquote, curated sections, then the specification index.
 * @param {string} specIndex output of buildLlmsIndex
 * @param {{ title: string, url: string, description: string }[][]} groups
 */
export function composeLlmsTxt(specIndex, groups) {
  const curated = groups.map(([title, entries]) => section(title, entries)).filter(Boolean);
  const specAt = specIndex.indexOf('\n## ');
  const specBody = specAt >= 0 ? specIndex.slice(specAt + 1).trim() : '';
  return ['# SpecScore', '', SUMMARY, '', curated.join('\n\n'), '', specBody, ''].join('\n').replace(/\n{3,}/g, '\n\n');
}

/**
 * @param {{ title: string, url: string, body: string }[]} parts
 * @param {string} specFull
 */
export function composeLlmsFull(parts, specFull) {
  const header = [
    '# SpecScore — Full documentation',
    '',
    '> Concatenated Markdown for AI agents. The first part is the English homepage, what SpecScore is, the spec-driven development guide, the tools roundup, the comparison pages, the documentation index (getting started), and the CLI install page. The second part is the specification corpus.',
    '',
  ].join('\n');
  const blocks = parts.map((part) => [
    '---',
    '',
    `## ${part.title}`,
    '',
    `URL: ${part.url}`,
    '',
    part.body.trim(),
    '',
  ].join('\n'));
  return `${header}\n${blocks.join('\n')}\n${specFull.trim()}\n`;
}

function routeFile(dist, route) {
  const urlPath = companionUrl(route);
  return { url: `${ORIGIN}${urlPath}`, file: join(dist, urlPath.slice(1)) };
}

export function companionUrl(route) {
  if (route === '/') return '/index.md';
  if (/^\/(es|de|fr|it|pl|pt-br|ru|tr|uk|ja|zh-cn|zh-tw|ko)\/$/.test(route)) return `${route}index.md`;
  return route.replace(/\/$/, '.md');
}

async function readHtml(dist, route) {
  const htmlPath = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html');
  try {
    return await readFile(htmlPath, 'utf8');
  } catch {
    return null;
  }
}

async function writeText(file, body) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, body.endsWith('\n') ? body : `${body}\n`);
}

const localeHomes = ['/', ...LOCALES.map((code) => `/${code}/`)];
const localeRoutes = (path) => [path, ...LOCALES.map((code) => `/${code}${path}`)];

/**
 * Write raw Markdown companions, llms.txt, and llms-full.txt into the Astro dist.
 * Comparison and tools Markdown already emitted by earlier build hooks is kept.
 * @param {string | URL} dir
 * @param {string} [rootDir]
 */
export async function writeLlmsFiles(dir, rootDir) {
  const dist = typeof dir === 'string' ? dir : fileURLToPath(dir);
  const root = rootDir || fileURLToPath(new URL('../../../../', import.meta.url));

  const routes = [
    ...localeHomes,
    ...localeRoutes('/spec-driven-development/'),
    ...localeRoutes('/cli/install/'),
    ...localeRoutes('/vs/'),
  ];

  for (const route of routes) {
    const html = await readHtml(dist, route);
    if (!html) continue;
    const { file } = routeFile(dist, route);
    const title = firstBlock(html, 'h1', 'hero__headline')
      || firstBlock(html, 'h1', 'sdd-hero__headline')
      || 'SpecScore';
    const body = htmlToMarkdown(html);
    const canonical = `Canonical: ${ORIGIN}${route}`;
    const headed = body.startsWith('# ')
      ? body.replace(/^# [^\n]*\n+/, `# ${title}\n\n${canonical}\n\n`)
      : `# ${title}\n\n${canonical}\n\n${body}`;
    await writeText(file, headed);
  }

  const homeHtml = await readHtml(dist, '/');
  if (!homeHtml) throw new Error('llms: missing dist/index.html');
  const definition = firstBlock(homeHtml, 'p', 'hero__sub');
  const whatIs = sectionMarkdown(homeHtml, 'what-is');
  if (!definition || !whatIs) throw new Error('llms: could not extract the homepage definition');
  const whatFile = join(dist, 'what-specscore-is.md');
  const whatBody = [
    '# What SpecScore is',
    '',
    `Canonical: ${ORIGIN}/#what-is-title`,
    '',
    definition,
    '',
    whatIs.trim(),
    '',
  ].join('\n');
  await writeText(whatFile, whatBody);

  async function bodyOf(route) {
    const { file, url } = routeFile(dist, route);
    const raw = await readFile(file, 'utf8');
    return { url, body: raw };
  }

  const home = await bodyOf('/');
  const sdd = await bodyOf('/spec-driven-development/');
  const install = await bodyOf('/cli/install/');
  const vsIndex = await bodyOf('/vs/');
  const toolsFile = join(dist, 'spec-driven-development', 'tools.md');
  const toolsRaw = await readFile(toolsFile, 'utf8');
  const vsDir = join(dist, 'vs');
  const vsEntriesOnDisk = await readdir(vsDir, { withFileTypes: true });
  for (const entry of vsEntriesOnDisk) {
    if (!entry.isDirectory()) continue;
    const mdPath = join(vsDir, `${entry.name}.md`);
    try {
      await readFile(mdPath);
      continue;
    } catch {
      /* Handwritten comparison pages have no prebuilt Markdown sibling. */
    }
    const html = await readFile(join(vsDir, entry.name, 'index.html'), 'utf8');
    const title = firstBlock(html, 'h1', 'hero__headline') || entry.name;
    const sub = firstBlock(html, 'p', 'hero__sub');
    const body = htmlToMarkdown(html);
    const lead = sub ? `${sub}\n\n` : '';
    await writeText(mdPath, `# ${title}\n\nCanonical: ${ORIGIN}/vs/${entry.name}/\n\n${lead}${body}`);
  }
  const vsNames = (await readdir(vsDir)).filter((name) => name.endsWith('.md') && name !== 'index.md').sort();
  const vsPages = [];
  for (const name of vsNames) {
    const raw = await readFile(join(vsDir, name), 'utf8');
    vsPages.push({ name, url: `${ORIGIN}/vs/${name}`, body: raw });
  }
  const docsRaw = await readFile(join(root, 'docs', 'docs-index.md'), 'utf8');
  const specReadme = await readFile(join(root, 'spec', 'README.md'), 'utf8');

  const config = JSON.parse(await readFile(join(root, 'tools', 'site-generator', 'site-config.json'), 'utf8'));
  const specIndex = buildLlmsIndex(config);
  const specFull = await buildLlmsFull(config, root);

  const vsEntries = vsPages.map((page) => {
    const heading = (page.body.match(/^#\s+(.+)$/m) || [])[1] || page.name.replace(/\.md$/, '');
    return {
      title: heading,
      url: page.url,
      description: oneLineDescription(page.body, heading),
    };
  });

  const toolsDescription = oneLineDescription(toolsRaw, 'A comparison of spec-driven development tools.');
  const llmsTxt = composeLlmsTxt(specIndex, [
    ['Start here', [
      {
        title: 'Home',
        url: `${ORIGIN}/index.md`,
        description: oneLineDescription(definition, 'SpecScore is an open, lintable file format for specifications.'),
      },
      {
        title: 'What SpecScore is',
        url: `${ORIGIN}/what-specscore-is.md`,
        description: oneLineDescription(whatIs, 'What the SpecScore format contains.'),
      },
      {
        title: 'Spec-driven development',
        url: `${ORIGIN}/spec-driven-development.md`,
        description: oneLineDescription(sdd.body, 'What spec-driven development is and how SpecScore implements it.'),
      },
      {
        title: 'Spec-driven development tools',
        url: `${ORIGIN}/spec-driven-development/tools.md`,
        description: toolsDescription,
      },
      {
        title: 'Documentation (getting started)',
        url: `${ORIGIN}/docs.md`,
        description: 'Documentation index: getting started, CLI install, specification pages, and role guides.',
      },
      {
        title: 'Install the CLI',
        url: `${ORIGIN}/cli/install.md`,
        description: 'How to install the specscore command-line interface on macOS, Linux, and Windows.',
      },
    ]],
    ['Comparisons', [
      {
        title: 'How SpecScore compares',
        url: `${ORIGIN}/vs.md`,
        description: 'Side-by-side comparisons of SpecScore and other spec-driven development tools.',
      },
      ...vsEntries,
    ]],
  ]);

  const fullParts = [
    { title: 'Home', url: `${ORIGIN}/index.md`, body: home.body },
    { title: 'What SpecScore is', url: `${ORIGIN}/what-specscore-is.md`, body: whatBody },
    { title: 'Spec-driven development', url: `${ORIGIN}/spec-driven-development.md`, body: sdd.body },
    { title: 'Spec-driven development tools', url: `${ORIGIN}/spec-driven-development/tools.md`, body: toolsRaw },
    { title: 'How SpecScore compares', url: vsIndex.url, body: vsIndex.body },
    ...vsPages.map((page) => ({ title: page.name.replace(/\.md$/, ''), url: page.url, body: page.body })),
    { title: 'Documentation (getting started)', url: `${ORIGIN}/docs.md`, body: docsRaw },
    { title: 'Install the CLI', url: `${ORIGIN}/cli/install.md`, body: install.body },
    {
      title: 'Specification tree',
      url: `${ORIGIN}/specifications.md`,
      body: specReadme,
    },
  ];
  const llmsFull = composeLlmsFull(fullParts, specFull);
  await writeText(join(dist, 'llms.txt'), llmsTxt);
  await writeText(join(dist, 'llms-full.txt'), llmsFull);
}
