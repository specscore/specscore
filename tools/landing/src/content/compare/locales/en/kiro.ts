import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Kiro alternative: SpecScore vs Kiro specs.',
  metaDescription:
    'SpecScore vs Kiro. Kiro is AWS’s agentic IDE that writes EARS requirements. SpecScore is an open spec format your CI can lint. Checked 30 October 2026.',
  h1: 'SpecScore vs Kiro',
  hero: [
    { a: 'Spec-driven development', href: '/spec-driven-development/' },
    ' (SDD) means writing down what the software should do before an AI agent writes the code. ',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ', from Amazon Web Services (AWS), is an agentic development environment — an editor, a ',
    { a: 'command-line interface', href: '/cli/' },
    ' (CLI), and a web app — that turns a prompt into Kiro specs: requirements, a design, and tasks. Those requirements use ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    ' (Easy Approach to Requirements Syntax), sentences shaped as “WHEN something happens, THE SYSTEM SHALL do something.” ',
    { a: 'SpecScore', href: '/' },
    ' is an ',
    { a: 'open-source', href: repo, kind: 'us' },
    ' format for the specification itself, plus a CLI that checks the files. ',
    { a: 'Continuous integration', href: '/validators/' },
    ' (CI) — an automatic check on every proposed change — can reject a SpecScore spec that breaks the format.',
  ],
  shared: [
    ['Both treat a written specification as the thing an agent should build from, not a chat transcript.'],
    ['Both keep that specification as Markdown in the project, so it can be reviewed like code.'],
    ['Both break work into requirements, a design, and tasks. Kiro generates those three files. SpecScore is a format a team can keep after the session ends.'],
  ],
  creditTitle: 'What Kiro does well.',
  creditNote: [
    'Kiro’s own docs, read 30 October 2026, describe the product. The feature-spec page was marked updated on 4 August 2026.',
  ],
  credits: [
    {
      title: 'Requirements in a fixed sentence shape',
      body: [
        'Kiro specs put behavior in ',
        { c: 'requirements.md' },
        ' using one EARS pattern: WHEN a condition holds, THE SYSTEM SHALL do a thing. The docs give the example of a form with invalid data, and the system showing a validation error next to the field. That shape is easier to test than a vague paragraph.',
      ],
    },
    {
      title: 'A full path from prompt to tasks',
      body: [
        'A feature spec moves through requirements, design (',
        { c: 'design.md' },
        '), and tasks (',
        { c: 'tasks.md' },
        '). You can start from requirements or from a design. Quick Spec runs all three without an approval stop between them. Bugfix specs are a separate path. The docs also describe running independent tasks in parallel, in waves, from the dependency graph in ',
        { c: 'tasks.md' },
        '.',
      ],
    },
    {
      title: 'Checks inside the product',
      body: [
        'Analyze Requirements, available in the IDE and the CLI, looks for inconsistencies, ambiguity, conflicting constraints, and gaps before design. Correctness — property-based tests drawn from those EARS lines — is listed for the IDE only, not the CLI, web, or mobile, on the specs capability table.',
      ],
    },
  ],
  tableNote: 'Kiro is a product that drafts specs. SpecScore is the format a repository can check. The table compares those roles.',
  tableLabel: 'SpecScore vs Kiro feature comparison',
  rows: [
    {
      cap: 'Primary role',
      them: ['Agentic IDE, CLI, and web app that drafts specs and implements tasks'],
      us: [{ s: 'Open spec format + CLI' }],
    },
    {
      cap: 'Spec files',
      them: [{ c: 'requirements.md' }, ' (or ', { c: 'bugfix.md' }, '), ', { c: 'design.md' }, ', ', { c: 'tasks.md' }],
      us: [{ s: 'A spec/ tree' }, ' of Markdown + YAML'],
    },
    {
      cap: 'Requirements syntax',
      them: ['EARS pattern: WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: 'Requirement ids' },
        ' (',
        { c: 'REQ: slug' },
        ') and ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
        ' acceptance criteria',
      ],
    },
    {
      cap: 'Checking the spec',
      them: ['Analyze Requirements in the IDE and CLI. Property-based tests in the IDE. Not described as a format linter for your own CI.'],
      us: [
        { s: 'specscore spec lint' },
        ' in CI. ',
        { c: '/score' },
        ' is a separate, manual AI grade.',
      ],
    },
    {
      cap: 'Where it runs',
      them: ['Kiro IDE, Kiro CLI, Kiro web. Some checks are IDE-only.'],
      us: [{ s: 'Any repo' }, ' — one Go binary, no Kiro account'],
    },
    {
      cap: 'License',
      them: [
        'The ',
        { a: 'Kiro license', href: 'https://kiro.dev/license/', kind: 'them' },
        ' says the IDE and CLI are AWS Content under the AWS Customer Agreement. Kiro Crew is a separate ',
        { a: 'public repository', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
        '.',
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
        'A free tier and paid plans. Figures move — see ',
        { a: 'Kiro pricing', href: 'https://kiro.dev/pricing/', kind: 'them' },
        ', read 30 October 2026.',
      ],
      us: [{ s: 'No fee' }, ' for the format or the CLI'],
    },
  ],
  diffs: [
    {
      title: 'The format fails CI on its own',
      terminal: true,
      body: [
        'Kiro’s analysis runs inside Kiro. SpecScore’s check is a command. This repository’s ',
        { a: 'dogfood workflow', href: dogfood, kind: 'us' },
        ' runs ',
        { c: 'specscore spec lint' },
        ' on every pull request and on main. A broken spec fails the job the way a broken test would. The ',
        { a: '/score', href: score, kind: 'us' },
        ' skill grades wording with AI reviewers; that pass is manual, and the workflow above does not run it.',
      ],
    },
    {
      title: 'The spec is not tied to one IDE',
      body: [
        'Kiro specs are Markdown, so you can read them without the product. The workflow that creates and executes them is Kiro’s. A SpecScore tree is the same files for Claude Code, Cursor, Copilot, or no agent at all — the CLI does not call a model to lint.',
      ],
    },
    {
      title: 'Requirements keep an id',
      body: [
        'Kiro’s docs describe traceability as following a requirement through implementation. They do not describe a stable id that survives a rewrite. SpecScore addresses a requirement as ',
        { c: 'REQ: slug' },
        ' and an acceptance criterion by its own id.',
      ],
    },
    {
      title: 'EARS and Given/When/Then answer different questions',
      body: [
        'EARS, as Kiro documents it, is one sentence of system behavior. SpecScore acceptance criteria are Given/When/Then scenarios tied to a requirement id. You can write an EARS line in prose and still keep the scenario in the SpecScore file the linter checks.',
      ],
    },
  ],
  whenThemTitle: 'Reach for Kiro when…',
  whenThem: [
    ['You want an AWS agentic IDE that drafts requirements, design, and tasks from a prompt and then implements the tasks.'],
    ['You want EARS sentences and, in the IDE, property-based tests generated from them.'],
    ['Your team is already standardizing on Kiro’s editor, CLI, or web app.'],
  ],
  whenUs: [
    ['The spec has to stay valid in CI after the agent session ends, in a repository that does not require Kiro.'],
    ['You need requirement ids, lifecycle status, and a deterministic lint result.'],
    ['You want the format ', { a: 'open-source', href: repo, kind: 'us' }, ' and the checker to be a single binary.'],
  ],
  bridgeTitle: 'Kiro can draft. SpecScore can gate.',
  bridge: [
    [
      'Nothing here replaces Kiro’s editor. If Kiro is where the team prompts, let it draft. If the specification has to survive as a reviewed file, write that contract in SpecScore and let ',
      { c: 'specscore spec lint' },
      ' fail the pull request when the structure breaks. The two files can sit in the same repository.',
    ],
    [
      'Pick Kiro for the session. Pick SpecScore for the artifact a CI job can refuse.',
    ],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Kiro docs — Specs' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Kiro docs — Feature specs and EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro — About' },
    { href: 'https://kiro.dev/license/', label: 'Kiro — License' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro — Pricing' },
    { href: dogfood, label: 'specscore/specscore — dogfood CI workflow' },
    { href: score, label: 'specstudio-skills — /score skill' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
