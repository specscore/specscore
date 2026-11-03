import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';
const tile = 'https://github.com/tesslio/spec-driven-development-tile';
const tilePage = 'https://tessl.io/registry/tessl-labs/spec-driven-development';
const essay = 'https://tessl.io/blog/from-code-centric-to-spec-centric';

export const tessl: ComparePage = {
  slug: 'tessl',
  competitor: 'Tessl',
  metaTitle: 'Tessl alternative: SpecScore vs spec as source.',
  metaDescription:
    'SpecScore vs Tessl. Tessl is an agent-skills platform; its tile and 2025 essay treat the spec as source. SpecScore lints a portable format in CI. Checked 30 October 2026.',
  h1: 'SpecScore vs Tessl',
  hero: [
    { a: 'Spec-driven development', href: '/spec-driven-development/' },
    ' (SDD) means the specification of intended behavior is written before the code. ',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    ' (Tessl AI Ltd) is, as of 30 October 2026, an agent enablement platform: a registry and control plane for the skills, rules, and plugins that coding agents load. “Spec as source” is the stronger claim in Tessl’s ',
    { a: 'June 2025 essay', href: essay, kind: 'them' },
    ': the specification is the long-lived artifact, and code is derived from it. ',
    { a: 'SpecScore', href: '/' },
    ' is an ',
    { a: 'open-source', href: repo, kind: 'us' },
    ' file format for that specification, checked by a ',
    { a: 'command-line interface', href: '/cli/' },
    ' (CLI). ',
    { a: 'Continuous integration', href: '/validators/' },
    ' (CI) — an automatic check on every proposed change — runs that check in this repository.',
  ],
  shared: [
    ['Both say a prompt is a weak place to keep intent. A written spec should outlive the chat.'],
    ['Both expect an AI coding agent to read the spec before it edits code.'],
    ['Both can attach tests to requirements, so “done” is something you can point at.'],
  ],
  creditTitle: 'What Tessl does well.',
  creditNote: [
    'Two different Tessl surfaces are easy to mix up. The notes below keep them apart, from pages read on 30 October 2026.',
  ],
  credits: [
    {
      title: 'A clear argument for spec as source',
      body: [
        'Simon Maple’s essay of 27 June 2025 says a product requirements document (PRD) — prose written for people about what to build — usually goes stale, while the code becomes the only source of truth. The essay’s alternative is that the spec is what you change, and an LLM generates code, tests, and docs from it. That is a real position, not a slogan.',
      ],
    },
    {
      title: 'A platform for agent context',
      body: [
        { a: 'Tessl’s docs', href: 'https://docs.tessl.io/', kind: 'them' },
        ' describe a registry, governance that scans and scores skills, evals, and observability across agents. The docs say skills are plain artifacts in your repo, and that the platform works with Claude Code, Cursor, Copilot, Gemini, and others. Scoring there means scoring a skill, not scoring a product spec.',
      ],
    },
    {
      title: 'An official spec-driven tile with shell checks',
      body: [
        'The ',
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ' tile, MIT-licensed in the ',
        { a: 'public tile repository', href: tile, kind: 'them' },
        ', teaches an agent to interview, write ',
        { c: '.spec.md' },
        ' files, wait for approval, then implement. The registry page lists ',
        { c: 'scripts/validate-specs.sh' },
        ' and ',
        { c: 'scripts/check-spec-links.sh' },
        ' for frontmatter, ',
        { c: 'targets' },
        ', and ',
        { c: '[@test]' },
        ' links. The same page says the tile is steering context: no special commands, no framework.',
      ],
    },
  ],
  tableNote: '“Spec as source” is Tessl’s essay. The tile is a skill pack on top of today’s platform. SpecScore is a format with a versioned linter.',
  tableLabel: 'SpecScore vs Tessl feature comparison',
  rows: [
    {
      cap: 'Primary role',
      them: ['Agent-skills platform, plus a spec-driven tile and a 2025 essay on spec as source'],
      us: [{ s: 'Open spec format + CLI' }],
    },
    {
      cap: 'What the spec is',
      them: ['Essay: the long-lived source code is generated from. Tile: a .spec.md the agent implements against, and you keep the code.'],
      us: [{ s: 'A contract beside the code' }, '. Lint does not regenerate the code.'],
    },
    {
      cap: 'Spec shape',
      them: ['Tile: YAML frontmatter, targets globs, and [@test] links to test files'],
      us: [
        { s: 'Markdown + YAML' },
        ', ',
        { c: 'REQ: slug' },
        ', ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Checking the spec',
      them: ['Shell scripts shipped with the tile, for that tile’s frontmatter and links'],
      us: [
        { s: 'specscore spec lint' },
        ' on the SpecScore format, in this repo’s CI. ',
        { c: '/score' },
        ' is a manual AI grade.',
      ],
    },
    {
      cap: 'License',
      them: [
        'The tile is ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        '. The platform is a product. The docs do not publish the platform’s source code.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' format · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
    {
      cap: 'Price',
      them: [
        'The ',
        { a: 'Tessl homepage', href: 'https://tessl.io/', kind: 'them' },
        ', read 30 October 2026, describes a free tier (1,000 credits a month on one workspace) and paid enterprise plans.',
      ],
      us: [{ s: 'No fee' }, ' for the format or the CLI'],
    },
  ],
  diffs: [
    {
      title: 'A published format, not a tile script',
      terminal: true,
      body: [
        'The tile’s shell scripts check ',
        { c: '.spec.md' },
        ' files that tile asked the agent to write. SpecScore checks a format documented on this site. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' installs a pinned ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' release and runs ',
        { c: 'specscore spec lint' },
        '. ',
        { a: '/score', href: score, kind: 'us' },
        ' is not that job: it is a manual skill that exits non-zero when AI reviewers report issues.',
      ],
    },
    {
      title: 'You keep the code either way — the essay goes further',
      body: [
        'The 2025 essay says code should be regenerated from the spec. The tile, on the page read 30 October 2026, has the agent implement against an approved spec and does not describe a compiler that replaces your source tree. SpecScore never takes the code away. The spec is the reviewed contract; the code stays yours.',
      ],
    },
    {
      title: 'Requirement identity',
      body: [
        'The tile points a requirement at files with ',
        { c: 'targets' },
        ' and ',
        { c: '[@test]' },
        '. SpecScore names the requirement ',
        { c: 'REQ: slug' },
        ' so a plan, a task, and a commit trailer can cite it after the files move.',
      ],
    },
  ],
  whenThemTitle: 'Reach for Tessl when…',
  whenThem: [
    ['You need a registry, evals, and governance for skills shared across many agents and repositories.'],
    ['You want the spec-as-source essay’s workflow as a steering tile: interview, approve a .spec.md, then implement.'],
    ['You are already paying for, or trying, the Tessl platform and want its spec tile in that registry.'],
  ],
  whenUs: [
    ['The spec format itself has to be valid in CI, including in repos that do not install Tessl.'],
    ['You want requirement ids and a linter that does not call a model.'],
    ['You want the format ', { a: 'open-source', href: repo, kind: 'us' }, ' under a Creative Commons license, separate from a skills platform.'],
  ],
  bridgeTitle: 'Spec as source, and a spec you can lint.',
  bridge: [
    [
      'Tessl’s essay is right that a stale PRD loses to the code. A format check is how the spec stays the thing you trust. SpecScore does not generate your application from the spec. It makes the spec fail CI when the structure, the links, or the status are wrong.',
    ],
    [
      'Use Tessl if you want the platform and the tile. Use SpecScore if the artifact in git is what the pull request must prove.',
    ],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Tessl docs — What is Tessl?' },
    { href: 'https://tessl.io/', label: 'Tessl homepage' },
    { href: essay, label: 'Tessl blog — Why code alone isn’t enough (27 June 2025)' },
    { href: tilePage, label: 'Tessl registry — tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore — dogfood CI workflow' },
    { href: score, label: 'specstudio-skills — /score skill' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
