import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';
const tm = 'https://github.com/eyaltoledano/claude-task-master';
const tmLicense = 'https://github.com/eyaltoledano/claude-task-master/blob/main/LICENSE';
const tmDocs = 'https://tryhamster.com/docs/taskmaster';

export const taskMaster: ComparePage = {
  slug: 'task-master-ai',
  competitor: 'Task Master AI',
  metaTitle: 'Task Master AI alternative: SpecScore vs Task Master.',
  metaDescription:
    'SpecScore vs Task Master AI. Task Master parses a product requirements document into tasks for coding agents. SpecScore is the spec format CI can lint. Checked 30 October 2026.',
  h1: 'SpecScore vs Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    ' (the ',
    { c: 'task-master-ai' },
    ' package, also called Taskmaster) is a task manager for AI coding agents. A product requirements document (PRD) is a prose document of what to build; Task Master’s README says to put one at ',
    { c: '.taskmaster/docs/prd.txt' },
    ' and parse it into tasks. ',
    { a: 'Spec-driven development', href: '/spec-driven-development/' },
    ' (SDD) is the practice of specifying behavior before code. ',
    { a: 'SpecScore', href: '/' },
    ' is an ',
    { a: 'open-source', href: repo, kind: 'us' },
    ' format for that specification, plus a ',
    { a: 'command-line interface', href: '/cli/' },
    ' (CLI) that checks it. ',
    { a: 'Continuous integration', href: '/validators/' },
    ' (CI) — an automatic check on every proposed change — runs that check in this repository. Task Master does not publish a spec format for CI to lint.',
  ],
  shared: [
    ['Both assume an AI agent should not invent the whole job from a one-line prompt.'],
    ['Both keep their state in the repository so the next session can see it.'],
    ['Both can tell an agent what to do next, instead of re-reading the entire project.'],
  ],
  creditTitle: 'What Task Master AI does well.',
  creditNote: [
    'Facts below are from the project README and docs index, read 30 October 2026. Tool counts and model lists in that README change often, so they are not repeated here.',
  ],
  credits: [
    {
      title: 'A PRD becomes a task list',
      body: [
        'The README’s path is concrete: ',
        { c: 'task-master parse-prd' },
        ' reads a PRD and generates tasks. ',
        { c: 'task-master next' },
        ' points at the next task. ',
        { c: 'task-master expand' },
        ' breaks a task down. Tags move work between streams. That is a useful layer once you already know what you are building.',
      ],
    },
    {
      title: 'It shows up inside the editor',
      body: [
        'The recommended install is a Model Context Protocol (MCP) server — a small program the editor calls — via ',
        { c: 'npx -y task-master-ai' },
        ', including a one-step install for Cursor and a ',
        { c: 'claude mcp add' },
        ' line for Claude Code. The agent then parses, lists, and updates tasks without a separate dashboard.',
      ],
    },
    {
      title: 'Research with the project in context',
      body: [
        { c: 'task-master research' },
        ' is documented as a way to ask a model about a library or a migration using the current project as context. Several model providers are supported. The README says commands that call a model need an API key, unless you use the Claude Code or Codex CLI paths it lists.',
      ],
    },
  ],
  tableNote: 'Task Master manages tasks. SpecScore is the specification those tasks can cite. The table compares those roles.',
  tableLabel: 'SpecScore vs Task Master AI feature comparison',
  rows: [
    {
      cap: 'Primary role',
      them: ['Task list for AI coding agents, parsed from a PRD'],
      us: [{ s: 'Open spec format + CLI' }],
    },
    {
      cap: 'Input',
      them: ['Prose PRD, documented at .taskmaster/docs/prd.txt'],
      us: [{ s: 'Structured Markdown + YAML' }, ' with required sections'],
    },
    {
      cap: 'What you get',
      them: ['Tasks, dependencies, tags, and a “next task” pointer'],
      us: [{ s: 'Requirements, acceptance criteria, plans, and tasks' }, ' that cite requirement ids'],
    },
    {
      cap: 'Checking the spec',
      them: ['No documented linter for the PRD. The model parses free text.'],
      us: [
        { s: 'specscore spec lint' },
        ' in CI. ',
        { c: '/score' },
        ' is a manual AI grade of the wording.',
      ],
    },
    {
      cap: 'Runtime',
      them: ['Node.js, usually through the MCP server. Model calls need a provider key or a local Claude Code / Codex CLI, per the README.'],
      us: [{ s: 'One Go binary' }, '. Lint does not call a model.'],
    },
    {
      cap: 'License',
      them: [
        'The ',
        { a: 'public repository', href: tm, kind: 'them' },
        ' is ',
        { a: 'MIT plus a Commons Clause', href: tmLicense, kind: 'them' },
        '. The README says you may use and modify it, and may not sell Task Master itself or offer it as a hosted service.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' format · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
  ],
  diffs: [
    {
      title: 'A PRD is not a lintable spec',
      terminal: true,
      body: [
        'Task Master’s quality depends on how detailed the PRD is — the README says so. Nothing in that README checks the PRD’s structure before the model parses it. SpecScore refuses a feature that is missing a required section. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' runs ',
        { c: 'specscore spec lint' },
        ' on every pull request. The ',
        { a: '/score', href: score, kind: 'us' },
        ' skill is a second, manual pass over wording. It is not the CI command.',
      ],
    },
    {
      title: 'Tasks can cite a requirement',
      body: [
        'Task Master gives tasks numeric ids and dependencies. SpecScore gives requirements stable ids (',
        { c: 'REQ: slug' },
        '). A plan task can name the criterion it satisfies, and a commit trailer can name it again. The task list and the spec stop being two unrelated documents.',
      ],
    },
    {
      title: 'Lint does not need an API key',
      body: [
        'Parsing a PRD in Task Master calls a model. Checking a SpecScore tree does not. The CLI is a Go binary from ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ', so CI can run it without a provider account.',
      ],
    },
  ],
  whenThemTitle: 'Reach for Task Master AI when…',
  whenThem: [
    ['You already have a PRD and you want an agent to split it into ordered tasks inside Cursor, Claude Code, or another MCP client.'],
    ['You want next-task, expand, tags, and research as editor commands.'],
    ['The thing you are managing is the task board, not a reusable spec format.'],
  ],
  whenUs: [
    ['The requirements themselves must be structured, identifiable, and rejected by CI when they break the format.'],
    ['You do not want a model call in the path that decides whether the spec is well-formed.'],
    ['You want the format ', { a: 'open-source', href: repo, kind: 'us' }, ' under CC BY 4.0, with an Apache-2.0 CLI.'],
  ],
  bridgeTitle: 'Parse tasks from a spec that already lints.',
  bridge: [
    [
      'Task Master is a strong task board. It is not a specification language. Write the behavior in SpecScore, let CI lint it, and point the task list at ',
      { c: 'REQ: slug' },
      ' ids. If you still want Task Master’s editor tools, feed it a PRD you generated from a spec that already passed ',
      { c: 'specscore spec lint' },
      '.',
    ],
    [
      'Use Task Master AI to sequence work. Use SpecScore so the work has a contract.',
    ],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master — MIT plus Commons Clause' },
    { href: tmDocs, label: 'Task Master docs (tryhamster.com)' },
    { href: dogfood, label: 'specscore/specscore — dogfood CI workflow' },
    { href: score, label: 'specstudio-skills — /score skill' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
