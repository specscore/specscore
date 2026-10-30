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
  metaTitle: 'SpecScore 与 Task Master AI：规格与任务板',
  metaDescription:
    'SpecScore 与 Task Master AI。Task Master 把产品需求文档解析成给编码代理用的任务。SpecScore 是 CI 可以检查的规格格式。查阅于 2026年10月30日。',
  h1: 'SpecScore 与 Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    '（',
    { c: 'task-master-ai' },
    ' 这个软件包，也叫 Taskmaster）是给 AI 编码代理用的任务管理器。产品需求文档（PRD）是用散文写下要构建什么；Task Master 的 README 说，把一份放在 ',
    { c: '.taskmaster/docs/prd.txt' },
    '，再解析成任务。',
    { a: '规范驱动开发', href: '/zh-cn/spec-driven-development/' },
    '（SDD）是在写代码之前先把行为规定下来的做法。',
    { a: 'SpecScore', href: '/zh-cn/' },
    ' 是这种规格的一种',
    { a: '开源', href: repo, kind: 'us' },
    '格式，外加一支用来检查它的',
    { a: '命令行界面', href: '/zh-cn/cli/' },
    '（CLI）。',
    { a: '持续集成', href: '/zh-cn/validators/' },
    '（CI）——每一次提议的变更都会自动查一遍——在本仓库里跑这项检查。Task Master 没有发布一种可供 CI 检查的规格格式。',
  ],
  shared: [
    ['两边都不认为，AI 代理该凭一行提示词把整件事发明出来。'],
    ['两边都把状态放在仓库里，下一次会话还能看见。'],
    ['两边都能告诉代理下一步做什么，而不必把整个项目重读一遍。'],
  ],
  creditTitle: 'Task Master AI 做得好的地方。',
  creditNote: [
    '下面的事实来自 2026年10月30日读过的项目 README 和文档索引。那份 README 里的工具数量和模型名单经常改，所以这里不照抄。',
  ],
  credits: [
    {
      title: '一份 PRD 变成任务列表',
      body: [
        'README 里的路径写得很具体：',
        { c: 'task-master parse-prd' },
        ' 读一份 PRD，生成任务。',
        { c: 'task-master next' },
        ' 指向下一项任务。',
        { c: 'task-master expand' },
        ' 把一项任务拆开。标签用来在不同工作线之间搬动工作。等你已经知道要做什么，这一层就很有用。',
      ],
    },
    {
      title: '它直接出现在编辑器里',
      body: [
        '推荐的安装方式是一个模型上下文协议（Model Context Protocol，MCP）服务器——编辑器去调用的一个小程序——通过 ',
        { c: 'npx -y task-master-ai' },
        '，其中包括给 Cursor 的一步安装，以及给 Claude Code 的一行 ',
        { c: 'claude mcp add' },
        '。之后代理就能解析、列出并更新任务，不必另开一块仪表板。',
      ],
    },
    {
      title: '带着项目上下文做调研',
      body: [
        { c: 'task-master research' },
        ' 被写成这样一种做法：拿当前项目当上下文，向模型打听一个库，或者一次迁移。它支持多家模型提供商。README 说，凡是会调用模型的命令都要 API 密钥，除非你走它列出的 Claude Code 或 Codex CLI 那两条路径。',
      ],
    },
  ],
  tableNote: 'Task Master 管的是任务。SpecScore 是这些任务可以引用的规格。下表比较的是这两种角色。',
  tableLabel: 'SpecScore 与 Task Master AI 的功能对比',
  rows: [
    {
      cap: '主要角色',
      them: ['给 AI 编码代理用的任务列表，从一份 PRD 解析而来'],
      us: [{ s: '开放的规格格式 + CLI' }],
    },
    {
      cap: '输入',
      them: ['散文体 PRD，文档写的位置是 .taskmaster/docs/prd.txt'],
      us: [{ s: '结构化的 Markdown + YAML' }, '，带有必填章节'],
    },
    {
      cap: '你得到什么',
      them: ['任务、依赖、标签，以及一个“下一项任务”的指针'],
      us: [{ s: '需求、验收标准、计划和任务' }, '，并且会引用需求标识'],
    },
    {
      cap: '如何检查规格',
      them: ['没有见诸文档的 PRD 检查器。模型解析的是自由文本。'],
      us: [
        { s: 'specscore spec lint' },
        ' 跑在 CI 里。',
        { c: '/score' },
        ' 是对措辞做的手动 AI 评分。',
      ],
    },
    {
      cap: '运行环境',
      them: ['Node.js，通常经由 MCP 服务器。按 README 的说法，调用模型需要提供商密钥，或者本地的 Claude Code / Codex CLI。'],
      us: [{ s: '一支 Go 二进制文件' }, '。检查不会去调用模型。'],
    },
    {
      cap: '许可证',
      them: [
        '这个',
        { a: '公开仓库', href: tm, kind: 'them' },
        '是 ',
        { a: 'MIT 再加一条 Commons Clause', href: tmLicense, kind: 'them' },
        '。README 说，你可以使用、可以修改，但不得把 Task Master 本身卖掉，也不得把它做成托管服务来提供。',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' 格式 · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
  ],
  diffs: [
    {
      title: 'PRD 不是可以检查的规格',
      terminal: true,
      body: [
        'Task Master 的质量取决于 PRD 写得有多细——README 自己这么说。那份 README 里没有任何步骤会在模型解析之前先检查 PRD 的结构。SpecScore 会拒绝一份缺了必填章节的功能。',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' 在每一个拉取请求上运行 ',
        { c: 'specscore spec lint' },
        '。',
        { a: '/score', href: score, kind: 'us' },
        ' 技能是对措辞的第二遍，而且要手动。它不是那条 CI 命令。',
      ],
    },
    {
      title: '任务可以点名一条需求',
      body: [
        'Task Master 给任务数字标识和依赖关系。SpecScore 给需求稳定标识（',
        { c: 'REQ: slug' },
        '）。计划里的任务可以点出它满足的那条标准，提交尾注可以再点一次。任务列表和规格就不再是两份互不相干的文档。',
      ],
    },
    {
      title: '检查不需要 API 密钥',
      body: [
        '在 Task Master 里解析 PRD 会调用模型。检查一棵 SpecScore 目录树则不会。CLI 是来自 ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' 的 Go 二进制文件，所以 CI 不用提供商账户也能跑。',
      ],
    },
  ],
  whenThemTitle: '更适合用 Task Master AI 的时候……',
  whenThem: [
    ['你已经有一份 PRD，并希望代理在 Cursor、Claude Code 或其他 MCP 客户端里把它拆成排好序的任务。'],
    ['你希望编辑器里能直接用“下一项任务”（next-task）、拆分（expand）、标签（tags）和调研（research）。'],
    ['你管的是那块任务板，不是一种可以复用的规格格式。'],
  ],
  whenUs: [
    ['需求本身必须有结构、能被指认，格式一破就由 CI 拒绝。'],
    ['你不想在判定规格格式是否合格的那条路径上调用模型。'],
    ['你希望这份格式', { a: '开源', href: repo, kind: 'us' }, '，许可是 CC BY 4.0，CLI 则是 Apache-2.0。'],
  ],
  bridgeTitle: '从一份已经能通过检查的规格里拆任务。',
  bridge: [
    [
      'Task Master 是一块好用的任务板。它不是一种规格语言。把行为写进 SpecScore，让 CI 去检查，再让任务列表指向 ',
      { c: 'REQ: slug' },
      ' 这些标识。若你仍然想用 Task Master 的编辑器工具，就喂给它一份 PRD，而这份 PRD 来自已经通过 ',
      { c: 'specscore spec lint' },
      ' 的规格。',
    ],
    ['用 Task Master AI 给工作排顺序。用 SpecScore，让这件事有一份契约。'],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master——MIT 再加 Commons Clause' },
    { href: tmDocs, label: 'Task Master 文档（tryhamster.com）' },
    { href: dogfood, label: 'specscore/specscore——dogfood 持续集成工作流' },
    { href: score, label: 'specstudio-skills——/score 技能' },
    { href: license, label: 'specscore/specscore——CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli——Apache-2.0' },
  ],
};
