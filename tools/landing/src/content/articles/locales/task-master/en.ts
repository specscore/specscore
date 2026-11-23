import type { Block, TaskMasterArticleCopy } from '../../types.ts';

// Official Task Master sources, checked on 23 November 2026.
const repo = 'https://github.com/eyaltoledano/claude-task-master';
const license = 'https://github.com/eyaltoledano/claude-task-master/blob/main/LICENSE';
const docs = 'https://tryhamster.com/docs/taskmaster';
const installDocs = 'https://tryhamster.com/docs/taskmaster/getting-started/quick-start/installation';
const prdDocs = 'https://tryhamster.com/docs/taskmaster/getting-started/quick-start/prd-quick';
const mcpDocs = 'https://tryhamster.com/docs/taskmaster/capabilities/mcp';
const cliDocs = 'https://tryhamster.com/docs/taskmaster/capabilities/cli-root-commands';

const them = (a: string, href: string): Block[number] => ({ a, href, kind: 'them' });
const us = (a: string, href: string): Block[number] => ({ a, href, kind: 'us' });
const page = (a: string, href: string): Block[number] => ({ a, href });

export const taskMaster: TaskMasterArticleCopy = {
  metaTitle: 'What is Task Master AI? The task-based approach to AI coding explained (2026) | SpecScore',
  metaDescription:
    'What is Task Master AI? How the task-master-ai package turns a PRD into tasks, runs as an MCP server in Cursor and with Claude, and how a CI-validated spec format like SpecScore differs.',
  h1: 'What is Task Master AI? The task-based approach to AI coding explained',
  updated:
    'Last updated: 23 November 2026. Task Master facts checked against its repository and documentation on 23 November 2026.',
  updatedDate: '2026-11-23',
  breadcrumb: 'Articles',
  hero: [
    'Task Master AI is a task management system for AI coding agents. It is published as the ',
    { c: 'task-master-ai' },
    ' package, also called Taskmaster, in a public ',
    them('GitHub repository', repo),
    '. A product requirements document (PRD) is the prose that states what to build and for whom; the ',
    page('PRD template in Markdown', '/articles/feature-spec-template/'),
    ' is one SpecScore file in that shape. Task Master turns a PRD into a list of tasks an agent can work through. ',
    page('Spec-driven development', '/spec-driven-development/'),
    ' (SDD) is the practice of writing down what software must do before the code, and treating that written specification as the source of truth. Continuous integration (CI) is an automatic check on every proposed change; ',
    page('lint specs in CI', '/articles/lint-specs-in-ci/'),
    ' shows that check for a specification. The Model Context Protocol (MCP) is a way for an editor to call a small program; Task Master can run as an MCP server inside editors such as Cursor and with Claude. A command-line interface (CLI) is a program you run in the terminal — Task Master’s is the ',
    { c: 'task-master' },
    ' command, and SpecScore’s is on the ',
    page('CLI page', '/cli/'),
    '. ',
    page('SpecScore vs Task Master AI', '/vs/task-master-ai/'),
    ' has the full comparison.',
  ],
  sections: [
    {
      id: 'what',
      title: 'What Task Master AI is',
      paragraphs: [
        [
          'The ',
          them('README', repo),
          ' describes Taskmaster as a task management system for AI-driven development, designed to work with any AI chat, and in particular with Claude and Cursor. The official ',
          them('documentation', docs),
          ' calls it a personal project manager for an AI: you organize, research, expand and prioritize tasks, then ship them. This article is about that public package and repository, not other products that use a similar name.',
        ],
        [
          'The project is published under the ',
          them('MIT License with Commons Clause', license),
          '. The README says you may use and modify it, and may not sell Task Master itself or offer it as a hosted service. Any mention of that licence here links to the ',
          them('public repository', repo),
          '.',
        ],
      ],
    },
    {
      id: 'prd',
      title: 'How a PRD becomes tasks',
      paragraphs: [
        [
          'A PRD is the starting point of the task flow, according to the official page on ',
          them('writing and parsing a PRD', prdDocs),
          '. It defines what you are building and why. You can write a focused PRD for the next feature rather than the whole product, and a project can have more than one PRD. The README recommends placing a new project’s PRD at ',
          { c: '.taskmaster/docs/prd.txt' },
          '. After you initialize a project, an example template is available at ',
          { c: '.taskmaster/templates/example_prd.txt' },
          '.',
        ],
        [
          'The documented command is ',
          { c: 'task-master parse-prd' },
          ', with the PRD path as its input. The same PRD page says this generates a structured ',
          { c: 'tasks.json' },
          ' file with tasks, dependencies, priorities and test strategies. The ',
          them('CLI reference', cliDocs),
          ' then lists the day-to-day commands: ',
          { c: 'task-master next' },
          ' shows the next task based on dependencies and status, ',
          { c: 'task-master expand' },
          ' breaks a task into subtasks, and ',
          { c: 'task-master list' },
          ' lists the board. The README is direct about quality: the more detailed the PRD, the better the generated tasks will be.',
        ],
      ],
    },
    {
      id: 'mcp',
      title: 'How it runs in the editor, and with Claude',
      paragraphs: [
        [
          'The README’s recommended install is an MCP server, started with ',
          { c: 'npx -y task-master-ai' },
          '. That lets the editor call Task Master without a separate dashboard. The same README documents a one-step install for Cursor and this line for Claude Code: ',
          { c: 'claude mcp add taskmaster-ai -- npx -y task-master-ai' },
          '. It also shows configuration paths for VS Code and Windsurf. After adding the server, you still need to put API keys in the configuration, unless you use a path the README lists that does not need a key.',
        ],
        [
          'The ',
          them('MCP tools page', mcpDocs),
          ' lists tools the editor can call, including ',
          { c: 'parse_prd' },
          ', ',
          { c: 'next_task' },
          ' and ',
          { c: 'expand_task' },
          ', plus tools for listing and updating tasks. Which tools are loaded can be limited with the ',
          { c: 'TASK_MASTER_TOOLS' },
          ' environment variable. Commands that call a model need a provider API key, unless you use the Claude Code or Codex CLI paths the README lists.',
        ],
      ],
    },
    {
      id: 'install',
      title: 'How to install Task Master AI',
      paragraphs: [
        [
          'The package name on the public npm registry is ',
          { c: 'task-master-ai' },
          '. The ',
          them('installation guide', installDocs),
          ' and the README show two routes. One is the MCP server above. The other is the CLI: ',
          { c: 'npm install -g task-master-ai' },
          ' or a local install, then ',
          { c: 'task-master init' },
          ' (or ',
          { c: 'npx task-master init' },
          ' if you installed locally). You can pass editor rule sets at init, for example ',
          { c: 'task-master init --rules cursor,windsurf,vscode' },
          '.',
        ],
        [
          'Official documentation and the source are at the ',
          them('docs site', docs),
          ' and the ',
          them('GitHub repository', repo),
          '.',
        ],
      ],
    },
    {
      id: 'sdd',
      title: 'How Task Master AI relates to spec-driven development',
      paragraphs: [
        [
          'Task Master is a task workflow, not a specification format. The PRD it parses is free-text prose. Nothing in the README checks that PRD’s structure before a model parses it. In SDD terms, it helps sequence work once you already have a description of what to build.',
        ],
        [
          page('SpecScore', '/'),
          ' is a Markdown and YAML format for features, requirements and acceptance criteria, plus a ',
          page('command-line interface', '/cli/'),
          ' whose ',
          { c: 'specscore spec lint' },
          ' checks structure, references and status. The format is in ',
          us('specscore/specscore', 'https://github.com/specscore/specscore'),
          ' and the CLI is in ',
          us('specscore/specscore-cli', 'https://github.com/specscore/specscore-cli'),
          '. ',
          page('A spec kit for specifications', '/articles/spec-kit/'),
          ' explains why a format alone is not enough, and how the linter and CLI helpers fit together.',
        ],
      ],
    },
    {
      id: 'together',
      title: 'Tasks versus a CI-validated spec format',
      paragraphs: [
        [
          'Task Master and SpecScore answer different questions, so they can be used together. Task Master sequences work for an agent. SpecScore is the contract that work can cite. Write the behavior as SpecScore feature files, and a CI job can lint them on every pull request. In this repository, ',
          us('dogfood.yml', 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml'),
          ' runs ',
          { c: 'specscore spec lint' },
          ' on every pull request. That check does not call a model and does not need a provider API key. You can then keep the task list aligned with those requirement ids, or feed Task Master a PRD generated from a spec that already passed lint.',
        ],
        [
          page('SpecScore vs Task Master AI', '/vs/task-master-ai/'),
          ' has the full comparison. ',
          page('Task Master AI alternatives', '/alternatives/task-master-ai/'),
          ' lists other tools, and ',
          page('spec-driven development tools', '/spec-driven-development/tools/'),
          ' puts them on one page.',
        ],
      ],
    },
  ],
  faqTitle: 'Frequently asked questions',
  faqs: [
    {
      q: 'What is Task Master AI?',
      a: [
        'A task management system for AI coding agents, published as the ',
        { c: 'task-master-ai' },
        ' package and also called Taskmaster. It turns a PRD into tasks, as described in its ',
        them('repository', repo),
        ' and ',
        them('documentation', docs),
        '.',
      ],
    },
    {
      q: 'How do you install the task-master-ai package?',
      a: [
        'Install the CLI with ',
        { c: 'npm install -g task-master-ai' },
        ' and run ',
        { c: 'task-master init' },
        ', or run it as an MCP server with ',
        { c: 'npx -y task-master-ai' },
        '. The ',
        them('installation guide', installDocs),
        ' covers both routes, including a Claude Code one-liner.',
      ],
    },
    {
      q: 'Does Task Master AI work with Cursor and Claude?',
      a: [
        'Yes. The README’s recommended path is an MCP server inside the editor, with a one-step install for Cursor and ',
        { c: 'claude mcp add taskmaster-ai -- npx -y task-master-ai' },
        ' for Claude Code. VS Code and Windsurf configuration paths are documented in the same ',
        them('README', repo),
        '.',
      ],
    },
    {
      q: 'Is Task Master AI open source?',
      a: [
        'The ',
        them('public repository', repo),
        ' is licensed under the ',
        them('MIT License with Commons Clause', license),
        '. The README says you may use and modify it, and may not sell Task Master itself or offer it as a hosted service.',
      ],
    },
    {
      q: 'What is the difference between Task Master AI and SpecScore?',
      a: [
        'Task Master manages a task board parsed from a PRD. SpecScore is a lintable specification format. SDD is the practice of specifying behavior before code; Task Master sequences the work, and SpecScore is the artifact CI can check. See ',
        page('SpecScore vs Task Master AI', '/vs/task-master-ai/'),
        ' and ',
        page('Task Master AI alternatives', '/alternatives/task-master-ai/'),
        '.',
      ],
    },
  ],
  sourcesTitle: 'Sources',
  sourcesNote: 'Task Master facts checked on 23 November 2026.',
  sources: [
    { href: repo, label: 'eyaltoledano/claude-task-master repository and README' },
    { href: license, label: 'Task Master licence (MIT with Commons Clause)' },
    { href: docs, label: 'Task Master documentation (tryhamster.com)' },
    { href: installDocs, label: 'Task Master documentation: Installation' },
    { href: prdDocs, label: 'Task Master documentation: Writing and parsing a PRD' },
    { href: mcpDocs, label: 'Task Master documentation: MCP tools' },
    { href: cliDocs, label: 'Task Master documentation: CLI commands' },
    { href: 'https://github.com/specscore/specscore', label: 'SpecScore format repository' },
    { href: 'https://github.com/specscore/specscore-cli', label: 'SpecScore CLI repository' },
    { href: 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml', label: 'specscore/specscore — dogfood CI workflow' },
  ],
  relatedTitle: 'Related',
  related: [
    { href: '/vs/task-master-ai/', label: 'SpecScore vs Task Master AI' },
    { href: '/alternatives/task-master-ai/', label: 'Task Master AI alternatives' },
    { href: '/spec-driven-development/tools/', label: 'Spec-driven development tools' },
    { href: '/spec-driven-development/', label: 'Spec-driven development' },
    { href: '/articles/spec-kit/', label: 'A spec kit for specifications' },
    { href: '/articles/feature-spec-template/', label: 'PRD and feature spec template in Markdown' },
    { href: '/articles/lint-specs-in-ci/', label: 'Lint specs in CI' },
  ],
  ctaTitle: 'Keep the specification checkable.',
  ctaInstall: 'Install the CLI',
  ctaSkills: 'AI skills',
  ctaGithub: 'Format on GitHub',
};
