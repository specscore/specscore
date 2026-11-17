import type { Block, BmadArticleCopy } from '../../types.ts';

// Official BMAD sources, checked on 17 November 2026.
const repo = 'https://github.com/bmad-code-org/BMAD-METHOD';
const license = 'https://github.com/bmad-code-org/BMAD-METHOD/blob/main/LICENSE';
const changelog = 'https://github.com/bmad-code-org/BMAD-METHOD/blob/main/CHANGELOG.md';
const tags = 'https://github.com/bmad-code-org/BMAD-METHOD/tags';
const docs = 'https://docs.bmad-method.org/';
const agents = 'https://docs.bmad-method.org/reference/skills-and-agents/';
const planning = 'https://docs.bmad-method.org/plan/choose-a-planning-path/';
const build = 'https://docs.bmad-method.org/build/build-a-change/';

const them = (a: string, href: string): Block[number] => ({ a, href, kind: 'them' });
const us = (a: string, href: string): Block[number] => ({ a, href, kind: 'us' });
const page = (a: string, href: string): Block[number] => ({ a, href });

export const bmad: BmadArticleCopy = {
  metaTitle: 'What is the BMAD Method? Agents, workflow and SDD (2026) | SpecScore',
  metaDescription:
    'What is the BMAD Method (Breakthrough Method for Agile AI-Driven Development)? Its agents, workflow, documents, v6.12 and v7, and how it relates to spec-driven development.',
  h1: 'What is the BMAD Method? Agents, workflow and how it relates to spec-driven development',
  updated: 'Last updated: 17 November 2026. BMAD facts checked against its repository and documentation on 17 November 2026.',
  breadcrumb: 'Articles',
  hero: [
    'The BMAD Method is an ',
    them('open-source', repo),
    ' method, delivered as AI agent skills, for planning and building software with AI coding tools. BMAD stands for Breakthrough Method for Agile AI-Driven Development, the name on its ',
    them('GitHub repository', repo),
    '. ',
    page('Spec-driven development', '/spec-driven-development/'),
    ' (SDD) is the practice of writing down what software must do before the code, and treating that written specification as the source of truth. The software development lifecycle (SDLC) is the sequence of work from an idea through planning, building, testing and change. A product requirements document (PRD) is the prose that states what to build and for whom; the ',
    page('PRD template in Markdown', '/articles/feature-spec-template/'),
    ' is one SpecScore file in that shape. Continuous integration (CI) is an automatic check on every proposed change; ',
    page('lint specs in CI', '/articles/lint-specs-in-ci/'),
    ' shows that check for a specification.',
  ],
  sections: [
    {
      id: 'what',
      title: 'What the BMAD Method is',
      paragraphs: [
        [
          'The ',
          them('README', repo),
          ' describes AI-driven development as the whole effort, not only the code: what to build, how it holds together, and how it changes as you learn. BMad Method, as the project spells it, is its agile way to do that. Decisions stay explicit, context carries forward, and the process sizes itself to the work.',
        ],
        [
          'In practice, the ',
          them('documentation', docs),
          ' says BMad adds named commands, called skills, to AI coding tools such as Claude Code and Cursor. Some skills help you think: explore an idea, research it, argue against it, and write down what you settled on. Others help you build: give ',
          { c: 'bmad-build' },
          ' a change, and it writes the code and reviews it. You can use either group on its own.',
        ],
        [
          'The project is free to use and published under the ',
          them('MIT License', license),
          '.',
        ],
      ],
    },
    {
      id: 'agents',
      title: 'The BMAD agents',
      paragraphs: [
        [
          'According to ',
          them('Skills and Agents', agents),
          ', the BMad Method module installs six named agents. You load each one by its skill ID, such as ',
          { c: 'bmad-agent-pm' },
          ':',
        ],
        ['Mary, the Analyst: brainstorming, research, and a brief, a press release with frequently asked questions (PRFAQ), or a business requirements document (BRD).'],
        ['John, the Product Manager: creates, updates or validates a PRD or another planning document.'],
        ['Sofia, the Product Owner: turns a PRD, a brief or notes into a ticket’s requirements, and slices an initiative or epic into stories.'],
        ['Winston, the Architect: the architecture decisions that keep separately built parts consistent.'],
        ['Amelia, the Developer: build, test generation, code review and the epic retrospective.'],
        ['Sally, the UX Designer: user experience (UX) design.'],
      ],
    },
    {
      id: 'workflow',
      title: 'The BMAD workflow',
      paragraphs: [
        [
          'Every path runs the same delivery loop, according to the ',
          them('documentation home page', docs),
          ': a vague notion starts at Clarify, a big clear idea at Plan, and a small change at Build and verify; Learn and adjust loops back to Plan. Bigger work enters the loop earlier and goes round it more often.',
        ],
        ['How much planning a change needs depends on one question in ', them('Choose a Planning Path', planning), ': is the intent already well defined? If it is, Sofia writes the requirements at the size of the work. If it is not, the planning skills help you get there first.'],
        [{ c: 'bmad-build' }, ' is the core implementation skill. ', them('Build a Change', build), ' says it takes a sentence, an issue, a spec or a ticket, investigates the codebase, plans the change, implements it, reviews the result and fixes the bugs it finds. A typical session is one goal: about 500 lines of code added or changed, not counting tests.'],
        [
          'Work that needs several sessions but has one outcome is an epic. Work that spans several epics, or likely needs roughly 20 or more sessions, is a project. Both still run one ',
          { c: 'bmad-build' },
          ' session per story. ',
          { c: 'bmad-build-auto' },
          ' runs one session without waiting for human input, once the important decisions are stable (',
          them('Choose a Planning Path', planning),
          ').',
        ],
      ],
    },
    {
      id: 'documents',
      title: 'What documents BMAD produces',
      paragraphs: [
        [
          'Each planning skill writes a document you can hand on (',
          them('Choose a Planning Path', planning),
          '): brainstorming notes, a report on whether an idea holds up, a cited research report, Mary’s brief, PRFAQ or BRD, John’s PRD or another planning document, the UX files ',
          { c: 'DESIGN.md' },
          ' and ',
          { c: 'EXPERIENCE.md' },
          ', an architecture document, and Sofia’s requirements with an ordered ',
          { c: 'tickets.toml' },
          ' of stories.',
        ],
        [
          'The same page says you need a PRD when more than one person must agree on what the product is, or more than one epic must not diverge. Otherwise you can skip it.',
        ],
      ],
    },
    {
      id: 'sdlc',
      title: 'BMAD and the software development lifecycle (SDLC)',
      paragraphs: [
        [
          'BMAD’s documentation does not use the term SDLC, but its skills cover each stage. Analysis is brainstorming, research and the brief. Planning is the PRD and UX. Solutioning is architecture, plus requirements sliced into stories. Implementation is ',
          { c: 'bmad-build' },
          ', one session per unit. Review and testing are ',
          { c: 'bmad-code-review' },
          ' and ',
          { c: 'bmad-qa-generate-e2e-tests' },
          '. Each epic closes with ',
          { c: 'bmad-retrospective' },
          ', which judges the combined result against the epic’s requirements. The skill names and their purposes are listed in ',
          them('Skills and Agents', agents),
          '.',
        ],
      ],
    },
    {
      id: 'versions',
      title: 'BMAD v6.12 and v7: what is new',
      paragraphs: [
        [
          'On 17 November 2026 the ',
          them('README', repo),
          ' names v6.12 as the stable release, installed with ',
          { c: 'npx bmad-method install' },
          '. The latest ',
          them('tag', tags),
          ' is v6.12.4. According to the ',
          them('changelog', changelog),
          ', v6.12.0 shipped on 3 September 2026. In it, Build decides how much process a change needs after investigating it, and simple changes get a two-section spec.',
        ],
        [
          'The README calls v7 a preview alpha on the main branch and warns of breaking changes between updates. In v7, BMad installs as modules with ',
          { c: 'npx skills add' },
          ': core tools and the BMad Method, plus the optional Toolsmith and Founder modules. The ',
          { c: 'bmad' },
          ' skill runs setup, status and help. The changelog’s Unreleased section adds Toolsmith for building and evaluating skills, writes every document into the active initiative’s folder, and rebuilds advanced elicitation.',
        ],
      ],
    },
    {
      id: 'sdd',
      title: 'Is BMAD spec-driven development?',
      paragraphs: [
        [
          'BMAD is a method, not a specification format. It produces specifications along the way: requirements, stories and architecture, kept as Markdown in the repository. In SDD terms, it is a workflow for writing specs and building from them, and ',
          { c: 'bmad-build' },
          ' accepts a spec as its input.',
        ],
        [
          'SDD tools differ on whether the specification itself is checked. ',
          page('SpecScore', '/'),
          ' defines a Markdown and YAML format for features, requirements and acceptance criteria, and a ',
          page('command-line interface', '/cli/'),
          ' whose ',
          { c: 'specscore spec lint' },
          ' checks structure, references and status. The format is in ',
          us('specscore/specscore', 'https://github.com/specscore/specscore'),
          ' and the CLI in ',
          us('specscore/specscore-cli', 'https://github.com/specscore/specscore-cli'),
          '.',
        ],
      ],
    },
    {
      id: 'together',
      title: 'Using BMAD with a CI-validated spec format',
      paragraphs: [
        [
          'BMAD and SpecScore answer different questions, so they can be used together. BMAD’s agents decide what to build and build it. The requirements they settle can be written as SpecScore feature files, and a CI job can lint them on every pull request. Then a pull request fails when its specification is structurally wrong, not only when the code breaks.',
        ],
        [
          page('SpecScore vs the BMAD Method', '/vs/bmad-method/'),
          ' has the full comparison. ',
          page('BMAD Method alternatives', '/alternatives/bmad-method/'),
          ' lists other tools, and ',
          page('spec-driven development tools', '/spec-driven-development/tools/'),
          ' puts them on one page.',
        ],
      ],
    },
  ],
  faqTitle: 'Frequently asked questions',
  faqs: [
    { q: 'What does BMAD stand for?', a: ['Breakthrough Method for Agile AI-Driven Development, as written on the ', them('BMAD-METHOD repository', repo), '. The project’s documentation spells it BMad.'] },
    { q: 'Is the BMAD Method free?', a: ['Yes. The README says BMad is free and open source, with no paywalled workflows, and the code is under the ', them('MIT License', license), '.'] },
    { q: 'Which AI coding tools does BMAD work with?', a: [them('Skills and Agents', agents), ' lists skills directories for Claude Code, Cursor, Windsurf, Codex, Cline and other tools. v7 needs an AI coding tool that supports skills.'] },
    { q: 'What is the difference between BMAD and spec-driven development?', a: ['SDD is the practice: specify behavior before code. BMAD is one method for doing it with AI agents. A spec format such as SpecScore is the artifact the specification is written in, which CI can check. See ', page('SpecScore vs the BMAD Method', '/vs/bmad-method/'), '.'] },
  ],
  sourcesTitle: 'Sources',
  sourcesNote: 'BMAD facts checked on 17 November 2026.',
  sources: [
    { href: repo, label: 'BMAD-METHOD repository and README' },
    { href: docs, label: 'BMad documentation: Build Software with BMad' },
    { href: agents, label: 'BMad documentation: Skills and Agents' },
    { href: planning, label: 'BMad documentation: Choose a Planning Path' },
    { href: build, label: 'BMad documentation: Build a Change' },
    { href: changelog, label: 'BMAD-METHOD changelog' },
    { href: tags, label: 'BMAD-METHOD tags' },
    { href: license, label: 'BMAD-METHOD licence (MIT)' },
    { href: 'https://github.com/specscore/specscore', label: 'SpecScore format repository' },
    { href: 'https://github.com/specscore/specscore-cli', label: 'SpecScore CLI repository' },
  ],
  relatedTitle: 'Related',
  related: [
    { href: '/vs/bmad-method/', label: 'SpecScore vs the BMAD Method' },
    { href: '/alternatives/bmad-method/', label: 'BMAD Method alternatives' },
    { href: '/spec-driven-development/tools/', label: 'Spec-driven development tools' },
    { href: '/spec-driven-development/', label: 'Spec-driven development' },
    { href: '/articles/feature-spec-template/', label: 'PRD and feature spec template in Markdown' },
    { href: '/articles/lint-specs-in-ci/', label: 'Lint specs in CI' },
  ],
  ctaTitle: 'Keep the specification checkable.',
  ctaInstall: 'Install the CLI',
  ctaSkills: 'AI skills',
  ctaGithub: 'Format on GitHub',
};
