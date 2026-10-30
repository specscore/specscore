import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';
const bmad = 'https://github.com/bmad-code-org/BMAD-METHOD';
const bmadLicense = 'https://github.com/bmad-code-org/BMAD-METHOD/blob/main/LICENSE';
const workflow = 'https://github.com/bmad-code-org/BMAD-METHOD/blob/main/docs/reference/workflow-map.md';

export const bmadMethod: ComparePage = {
  slug: 'bmad-method',
  competitor: 'BMAD Method',
  metaTitle: 'BMAD Method alternative: SpecScore vs BMAD.',
  metaDescription:
    'SpecScore vs the BMAD Method (Breakthrough Method for Agile AI-Driven Development): an agile agent workflow, versus a spec format linted in CI. Checked 30 October 2026.',
  h1: 'SpecScore vs the BMAD Method',
  hero: [
    'The ',
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    ' (Breakthrough Method for Agile AI-Driven Development) is an ',
    { a: 'open-source', href: bmad, kind: 'them' },
    ' way to run agile delivery with AI agents: clarify the work, plan it, build it, and check it, with the decisions written down. A product requirements document (PRD) is the prose description of what to build and for whom; the method’s workflow map produces one, then architecture and stories. ',
    { a: 'Spec-driven development', href: '/spec-driven-development/' },
    ' (SDD) is the broader idea both sit in — behavior is specified before code. ',
    { a: 'SpecScore', href: '/' },
    ' is an ',
    { a: 'open-source', href: repo, kind: 'us' },
    ' format for that specification, plus a ',
    { a: 'command-line interface', href: '/cli/' },
    ' (CLI). ',
    { a: 'Continuous integration', href: '/validators/' },
    ' (CI) — an automatic check on every proposed change — can fail when a SpecScore file is structurally wrong.',
  ],
  shared: [
    ['Both refuse to let an agent invent the product while it writes the code.'],
    ['Both keep planning documents in the repository, in Markdown, next to the work.'],
    ['Both expect a human to approve the plan before implementation runs away.'],
  ],
  creditTitle: 'What the BMAD Method does well.',
  creditNote: [
    'The project README, read 30 October 2026, calls v6.12 the stable release and v7 a preview on the main branch. The v7 date in that README had already passed. Treat the line names as a snapshot.',
  ],
  credits: [
    {
      title: 'A method that sizes itself',
      body: [
        'The README says small changes go straight to build, and larger work gets planning. The ',
        { a: 'workflow map on main', href: workflow, kind: 'them' },
        ' spells out phases: a PRD (',
        { c: 'PRD.md' },
        '), an optional UX spec, ',
        { c: 'architecture.md' },
        ' with decision records, epic and story files, then a sprint. That is a full agile loop, not a single prompt.',
      ],
    },
    {
      title: 'A gate before implementation',
      body: [
        'The same map lists ',
        { c: 'bmad-check-implementation-readiness' },
        ', which returns PASS, CONCERNS, or FAIL before implementation. The v6 product-manager agent also has a validate-PRD step. Those are workflow gates the agent runs. They are not a separate format linter you point at an arbitrary Markdown tree.',
      ],
    },
    {
      title: 'It is actually published',
      body: [
        'The method is ',
        { a: 'MIT-licensed', href: bmadLicense, kind: 'them' },
        ' in a public repository. The README’s stable install is ',
        { c: 'npx bmad-method install' },
        ', and it asks for Node.js 20.12 or newer and Python 3.10 or newer. The site ',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        ' says the method is free.',
      ],
    },
  ],
  tableNote: 'BMAD is the process. SpecScore is the artifact format a process can target. The table compares those roles.',
  tableLabel: 'SpecScore vs BMAD Method feature comparison',
  rows: [
    {
      cap: 'Primary role',
      them: ['Agile method: agents, skills, and workflows from idea to verified code'],
      us: [{ s: 'Open spec format + CLI' }],
    },
    {
      cap: 'Planning artifacts',
      them: ['PRD, UX spec, architecture, epics and stories, sprint status — on the workflow map read 30 October 2026'],
      us: [{ s: 'Ideas, features, plans, tasks' }, ' in a spec/ tree, with requirement ids'],
    },
    {
      cap: 'Checking the work',
      them: ['Readiness gate (PASS / CONCERNS / FAIL) and a validate-PRD workflow, run by the agent'],
      us: [
        { s: 'specscore spec lint' },
        ' in CI, deterministic. ',
        { c: '/score' },
        ' is a manual AI grade.',
      ],
    },
    {
      cap: 'Requirement ids',
      them: ['Stories and functional requirements inside the PRD and epic files. Not the SpecScore REQ: slug.'],
      us: [{ s: 'REQ: slug' }, ' and acceptance-criterion ids'],
    },
    {
      cap: 'Runtime',
      them: ['Node.js and Python for the v6.12 installer described in the README'],
      us: [{ s: 'None' }, ' beyond a single Go binary'],
    },
    {
      cap: 'License',
      them: [
        { a: 'MIT', href: bmadLicense, kind: 'them' },
        ', ',
        { a: 'bmad-code-org/BMAD-METHOD', href: bmad, kind: 'them' },
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
      title: 'The check is a command, not a step in the method',
      terminal: true,
      body: [
        'BMAD’s readiness result is a decision inside its workflow. SpecScore’s result is a process exit code. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' runs ',
        { c: 'specscore spec lint' },
        ' on every pull request. ',
        { a: '/score', href: score, kind: 'us' },
        ' grades an artifact with the reviewers configured in the repo; you invoke it. CI does not.',
      ],
    },
    {
      title: 'The format survives a different method',
      body: [
        'BMAD’s documents are shaped by its workflows. If you stop running BMAD, you still have the Markdown, but nothing outside the method enforces the shape. A SpecScore tree is the contract. Another workflow — including BMAD — can write it, and the linter still applies.',
      ],
    },
    {
      title: 'Stories and requirements stay linked by id',
      body: [
        'BMAD stories carry context forward so the agent does not re-decide the product. SpecScore makes the link mechanical: a plan task cites ',
        { c: 'REQ: slug' },
        ', and ',
        { c: 'specscore:' },
        ' annotations plus ',
        { c: 'Verifies:' },
        ' commit trailers point code back at the criterion.',
      ],
    },
  ],
  whenThemTitle: 'Reach for the BMAD Method when…',
  whenThem: [
    ['You want a full agile loop — PRD, architecture, stories, sprint — executed by agents with role-specific workflows.'],
    ['You want the readiness gate and the party of product, architecture, and test perspectives the method ships.'],
    ['You are standardizing how a team prompts, and the method’s skills are the standard.'],
  ],
  whenUs: [
    ['The specification has to fail CI when a heading, a link, or a status is wrong, even if nobody runs the BMAD workflow that day.'],
    ['You need stable requirement ids across tools, not only inside one method’s story files.'],
    ['You want a format ', { a: 'open-source', href: repo, kind: 'us' }, ' that a different process can target.'],
  ],
  bridgeTitle: 'The method can write the format.',
  bridge: [
    [
      'BMAD answers “how do we run the work.” SpecScore answers “what file is the contract, and how does CI know it is intact.” A team can keep BMAD’s PRD and stories for the conversation, and keep a SpecScore feature for the requirements that must lint.',
    ],
    [
      'Use the BMAD Method for the loop. Use SpecScore for the artifact the pull request checks.',
    ],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD — MIT license' },
    { href: workflow, label: 'BMAD workflow map (main, read 30 October 2026)' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore — dogfood CI workflow' },
    { href: score, label: 'specstudio-skills — /score skill' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
