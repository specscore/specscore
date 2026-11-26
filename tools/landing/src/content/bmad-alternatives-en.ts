import type { Block } from './compare/types.ts';

// Official BMAD sources, checked on 26 November 2026.
const repo = 'https://github.com/bmad-code-org/BMAD-METHOD';
const license = 'https://github.com/bmad-code-org/BMAD-METHOD/blob/main/LICENSE';
const docs = 'https://docs.bmad-method.org/';
const validate = 'https://github.com/bmad-code-org/BMAD-METHOD/blob/main/skills/method/bmad-agent-po/references/validate.md';
const validateChecks = 'https://github.com/bmad-code-org/BMAD-METHOD/blob/main/skills/method/bmad-agent-po/references/validate-checks.md';
const quality = 'https://github.com/bmad-code-org/BMAD-METHOD/blob/main/.github/workflows/quality.yaml';

const them = (a: string, href: string): Block[number] => ({ a, href, kind: 'them' });
const page = (a: string, href: string): Block[number] => ({ a, href });

export const bmadEnTitle = 'BMAD Method alternatives compared in 2026';
export const bmadEnDescription =
  'Compare BMAD alternatives by spec format, agent workflow and CI validation: SpecScore, GitHub Spec Kit, OpenSpec, Kiro, Tessl, Task Master AI and Markdown.';

export const bmadEnHero: Block = [
  'The BMAD Method (Breakthrough Method for Agile Ai Driven Development, the name on its ',
  them('GitHub repository', repo),
  ') is an ',
  them('open-source', repo),
  ' agile method, delivered as AI agent skills, for planning and building software with AI coding tools. It produces briefs, specifications and architecture. ',
  page('What is the BMAD Method?', '/articles/bmad-method/'),
  ' explains the method on its own. ',
  page('Spec-driven development', '/spec-driven-development/'),
  ' (SDD) means recording intended behavior before implementation and using the spec to guide code. A product requirements document (PRD) is the prose that states what to build and for whom. Continuous integration (CI) is an automatic check on every proposed change; ',
  page('lint specs in CI', '/articles/lint-specs-in-ci/'),
  ' shows that check for a specification. These BMAD alternatives range from narrower agent workflows to a checkable spec format.',
];

export const bmadEnFaqs: { q: string; a: Block }[] = [
  {
    q: 'What is BMAD Method?',
    a: [
      'The BMAD Method is an agile method for AI-driven development that produces briefs, specifications and architecture. It is the Breakthrough Method for Agile Ai Driven Development, the name on its ',
      them('GitHub repository', repo),
      ', and is published there as ',
      them('open-source', repo),
      ' AI agent skills. ',
      page('What is the BMAD Method?', '/articles/bmad-method/'),
      ' explains the agents, workflow and documents.',
    ],
  },
  {
    q: 'What are the alternatives to BMAD Method?',
    a: [
      'SpecScore, GitHub Spec Kit, OpenSpec, Kiro, Tessl, Task Master AI, CodeSpeak, Datarim and plain Markdown cover different parts of spec-driven development. The table above compares format, agent integration and licence.',
    ],
  },
  {
    q: 'BMAD Method vs SpecScore: which should I choose?',
    a: [
      'BMAD helps agents produce planning artifacts and can feed another workflow. SpecScore defines the spec artifact and runs deterministic structure, reference and status checks. Choose SpecScore when a pull request must prove that its specification still passes those checks.',
    ],
  },
  {
    q: 'What is the best BMAD Method alternative?',
    a: [
      'There is no single best BMAD Method alternative; it depends on the work you want the tool to do. Compare GitHub Spec Kit or OpenSpec for a narrower agent workflow, Kiro if the work lives in its development environment, Tessl for an agent-skills platform, Task Master AI to decompose a PRD into tasks, plain Markdown if the team will keep the structure itself, or SpecScore when the specification has to pass structure, reference and status checks in CI. The table above compares format, agent integration and licence.',
    ],
  },
  {
    q: 'Is the BMAD Method free, and what is its licence?',
    a: [
      'Yes. The official ',
      them('README', repo),
      ', checked 26 November 2026, says BMad is free and open source, with no paywalled workflows, and the repository is published under the ',
      them('MIT License', license),
      ', with a trademark notice in that file.',
    ],
  },
  {
    q: 'Does BMAD validate specs in CI?',
    a: [
      'The official ',
      them('README', repo),
      ', checked 26 November 2026, describes planning artifacts and agent workflows; it does not document a format linter you can run in CI on a specification tree. Product Owner skills include ',
      them('validation checks', validateChecks),
      ' that ',
      them('agents run', validate),
      ' on tickets, dependencies and closure before approval or execution. The method’s own repository has a ',
      them('Quality & Validation GitHub Actions workflow', quality),
      ' that lints and tests the BMAD project, not a user’s specs. SpecScore’s ',
      { c: 'specscore spec lint' },
      ' is the command this site uses for that CI check; see ',
      page('lint specs in CI', '/articles/lint-specs-in-ci/'),
      '.',
    ],
  },
  {
    q: 'What is BMAD Method v7?',
    a: [
      'The official ',
      them('README', repo),
      ', checked 26 November 2026, still lists v6.12 as the stable release, installed with ',
      { c: 'npx bmad-method install' },
      ', and describes v7 as a preview alpha on the main branch, with breaking changes between updates.',
    ],
  },
];

export const bmadEnSourcesNote =
  'BMAD facts on this page were checked against the official repository and documentation on 26 November 2026. Comparison rows for the other tools follow the sourced tools roundup.';

export const bmadEnSources: { href: string; label: string }[] = [
  { href: repo, label: 'BMAD-METHOD repository and README' },
  { href: license, label: 'BMAD-METHOD licence (MIT)' },
  { href: docs, label: 'BMad documentation: Build Software with BMad' },
  { href: validate, label: 'BMad Product Owner skill: Validating tickets' },
  { href: validateChecks, label: 'BMad Product Owner skill: Validation checks' },
  { href: quality, label: 'BMAD-METHOD Quality & Validation workflow' },
  { href: 'https://github.com/specscore/specscore', label: 'SpecScore format repository' },
  { href: 'https://github.com/specscore/specscore-cli', label: 'SpecScore CLI repository' },
  { href: 'https://github.com/github/spec-kit', label: 'GitHub Spec Kit repository' },
  { href: 'https://github.com/Fission-AI/OpenSpec', label: 'OpenSpec repository' },
  { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Kiro feature specs documentation' },
  { href: 'https://docs.tessl.io/', label: 'Tessl documentation' },
  { href: 'https://github.com/eyaltoledano/claude-task-master', label: 'Task Master AI repository' },
];
