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
  metaTitle: 'SpecScore 与 BMAD Method：格式与敏捷方法',
  metaDescription:
    'SpecScore 与 BMAD Method（面向敏捷、由人工智能驱动的突破性开发方法）：一边是敏捷代理工作流，一边是可在 CI 中检查的规格格式。查阅于 2026年10月30日。',
  h1: 'SpecScore 与 BMAD Method',
  hero: [
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    '（面向敏捷、由人工智能驱动的突破性开发方法，Breakthrough Method for Agile AI-Driven Development）是一种',
    { a: '开源', href: bmad, kind: 'them' },
    '做法，用 AI 代理来做敏捷交付：把工作澄清、排成计划、做出来、再检查，并把决定写下来。产品需求文档（PRD）是用散文说明要构建什么、做给谁；这个方法的工作流地图会先产出一份，然后才是架构和故事。',
    { a: '规范驱动开发', href: '/zh-cn/spec-driven-development/' },
    '（SDD）是两边共同所处的更大想法——行为在代码之前被写明。',
    { a: 'SpecScore', href: '/zh-cn/' },
    ' 是这种规格的一种',
    { a: '开源', href: repo, kind: 'us' },
    '格式，外加',
    { a: '命令行界面', href: '/zh-cn/cli/' },
    '（CLI）。',
    { a: '持续集成', href: '/zh-cn/validators/' },
    '（CI）——每一次提议的变更都会自动查一遍——可以在 SpecScore 文件结构不对时失败。',
  ],
  shared: [
    ['两边都不让代理一边写代码、一边把产品发明出来。'],
    ['两边都把规划文档以 Markdown 放在仓库里，紧挨着要做的工作。'],
    ['两边都指望人先批准计划，再让实现往下跑。'],
  ],
  creditTitle: 'BMAD Method 做得好的地方。',
  creditNote: [
    '2026年10月30日读过的项目 README 把 v6.12 称为稳定版，把 main 分支上的 v7 称为预览。那份 README 里写的 v7 日期，当时已经过了。这些版本线的名字，只当作那一刻的快照。',
  ],
  credits: [
    {
      title: '方法会自己看工作有多大',
      body: [
        'README 说，小改动直接去做，较大的工作才进入规划。',
        { a: 'main 上的工作流地图', href: workflow, kind: 'them' },
        '把阶段写明了：一份 PRD（',
        { c: 'PRD.md' },
        '）、可选的 UX 规格、带决策记录的 ',
        { c: 'architecture.md' },
        '、史诗文件和故事文件，然后是一次冲刺。这是一整圈敏捷循环，不是一条提示词。',
      ],
    },
    {
      title: '实现之前有一道关卡',
      body: [
        '同一张地图列出了 ',
        { c: 'bmad-check-implementation-readiness' },
        '，它在实现之前返回 PASS、CONCERNS 或 FAIL。v6 的产品经理代理还有一步 validate-PRD。这些是代理自己跑的工作流关卡。它们不是一个你可以拿去指向任意 Markdown 目录树的独立格式检查器。',
      ],
    },
    {
      title: '它确实公开了',
      body: [
        '这个方法在公开仓库里以',
        { a: 'MIT 许可', href: bmadLicense, kind: 'them' },
        '发布。README 里的稳定安装命令是 ',
        { c: 'npx bmad-method install' },
        '，并要求 Node.js 20.12 或更新版本，以及 Python 3.10 或更新版本。网站',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        '说这个方法免费。',
      ],
    },
  ],
  tableNote: 'BMAD 是过程。SpecScore 是过程可以去对准的产物格式。下表比较的是这两种角色。',
  tableLabel: 'SpecScore 与 BMAD Method 的功能对比',
  rows: [
    {
      cap: '主要角色',
      them: ['敏捷方法：代理、技能和工作流，从想法一直做到经过验证的代码'],
      us: [{ s: '开放的规格格式 + CLI' }],
    },
    {
      cap: '规划产物',
      them: ['PRD、UX 规格、架构、史诗和故事、冲刺状态——依据 2026年10月30日读到的工作流地图'],
      us: [{ s: '想法、功能、计划、任务' }, '，放在 spec/ 目录树里，并带有需求标识'],
    },
    {
      cap: '如何检查工作',
      them: ['就绪关卡（PASS / CONCERNS / FAIL），以及由代理运行的 validate-PRD 工作流'],
      us: [
        { s: 'specscore spec lint' },
        ' 跑在 CI 里，结果是确定的。',
        { c: '/score' },
        ' 是手动的 AI 评分。',
      ],
    },
    {
      cap: '需求标识',
      them: ['故事和功能需求写在 PRD 与史诗文件里。不是 SpecScore 的 REQ: slug。'],
      us: [{ s: 'REQ: slug' }, '，以及验收标准的标识'],
    },
    {
      cap: '运行环境',
      them: ['README 所写的 v6.12 安装器需要 Node.js 和 Python'],
      us: [{ s: '没有别的' }, '，只要一支 Go 二进制文件'],
    },
    {
      cap: '许可证',
      them: [
        { a: 'MIT', href: bmadLicense, kind: 'them' },
        '，',
        { a: 'bmad-code-org/BMAD-METHOD', href: bmad, kind: 'them' },
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
      title: '检查是一条命令，不是方法里的一步',
      terminal: true,
      body: [
        'BMAD 的就绪结果，是它工作流内部的一个决定。SpecScore 的结果是进程退出码。',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' 在每一个拉取请求上运行 ',
        { c: 'specscore spec lint' },
        '。',
        { a: '/score', href: score, kind: 'us' },
        ' 用仓库里配置好的评审者给产物打分；要你自己去调用。CI 不会去调。',
      ],
    },
    {
      title: '换一种方法，格式还在',
      body: [
        'BMAD 的文档，形状是它的工作流定下来的。你若停止运行 BMAD，Markdown 还在，但方法之外没有东西再去强制这个形状。一棵 SpecScore 目录树就是契约。别的工作流——包括 BMAD——也可以去写它，检查器照样适用。',
      ],
    },
    {
      title: '故事和需求靠标识连在一起',
      body: [
        'BMAD 的故事把上下文往后带，免得代理把产品重新决定一遍。SpecScore 把这条关联做成机械的：计划里的任务引用 ',
        { c: 'REQ: slug' },
        '，',
        { c: 'specscore:' },
        ' 注解再加上 ',
        { c: 'Verifies:' },
        ' 提交尾注，把代码指回那条标准。',
      ],
    },
  ],
  whenThemTitle: '更适合用 BMAD Method 的时候……',
  whenThem: [
    ['你要一整圈敏捷循环——PRD、架构、故事、冲刺——由带着角色化工作流的代理来执行。'],
    ['你要那道就绪关卡，以及这个方法自带的产品、架构和测试这几方视角。'],
    ['你在统一团队怎么写提示词，而这个方法的技能就是那套标准。'],
  ],
  whenUs: [
    ['标题、链接或状态错了，规格就要让 CI 失败，哪怕那天没有人跑 BMAD 工作流。'],
    ['你需要跨工具都稳定的需求标识，而不是只活在某一种方法的故事文件里。'],
    ['你希望有一种', { a: '开源', href: repo, kind: 'us' }, '格式，让另一种过程也可以对准它。'],
  ],
  bridgeTitle: '方法可以去写这种格式。',
  bridge: [
    [
      'BMAD 回答的是“我们怎么把工作跑起来”。SpecScore 回答的是“哪一份文件才是契约，CI 又怎么知道它还完好”。团队可以留着 BMAD 的 PRD 和故事来谈话，再留一份 SpecScore 功能，放那些必须通过检查的需求。',
    ],
    ['循环用 BMAD Method。拉取请求要检查的那份产物，用 SpecScore。'],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD——MIT 许可证' },
    { href: workflow, label: 'BMAD 工作流地图（main，查阅于 2026年10月30日）' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore——dogfood 持续集成工作流' },
    { href: score, label: 'specstudio-skills——/score 技能' },
    { href: license, label: 'specscore/specscore——CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli——Apache-2.0' },
  ],
};
