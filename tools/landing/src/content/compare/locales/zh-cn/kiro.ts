import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'SpecScore 与 Kiro：规格能否进 CI',
  metaDescription:
    'SpecScore 与 Kiro。Kiro 是亚马逊云服务的智能体 IDE，会写出 EARS 需求。SpecScore 是开放的规格格式，CI 可以检查它。查阅于 2026年10月30日。',
  h1: 'SpecScore 与 Kiro',
  hero: [
    { a: '规范驱动开发', href: '/zh-cn/spec-driven-development/' },
    '（SDD）的意思是：在 AI 代理动笔写代码之前，先把软件该做什么写下来。',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ' 来自亚马逊云服务（AWS），是一套智能体开发环境——编辑器、',
    { a: '命令行界面', href: '/zh-cn/cli/' },
    '（CLI）和网页应用都在里面——它把一条提示词变成 Kiro 规格：需求、设计和任务。这些需求使用 ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    '（简易需求语法，Easy Approach to Requirements Syntax），句子写成“WHEN 某事发生，THE SYSTEM SHALL 做某事”。',
    { a: 'SpecScore', href: '/zh-cn/' },
    ' 是规格本身的一种',
    { a: '开源', href: repo, kind: 'us' },
    '格式，外加一支检查这些文件的 CLI。',
    { a: '持续集成', href: '/zh-cn/validators/' },
    '（CI）——每一次提议的变更都会自动查一遍——可以拒绝一份把格式写坏的 SpecScore 规格。',
  ],
  shared: [
    ['两边都把写下来的规格当作代理该照着做的东西，而不是一份聊天记录。'],
    ['两边都把这份规格以 Markdown 放进项目，因此可以像审代码一样审它。'],
    ['两边都把工作拆成需求、设计和任务。Kiro 会生成这三个文件。SpecScore 则是团队在会话结束之后还能留住的格式。'],
  ],
  creditTitle: 'Kiro 做得好的地方。',
  creditNote: [
    '产品本身的说法，取自 2026年10月30日读过的 Kiro 官方文档。功能规格那一页标注的更新日期是 2026年8月4日。',
  ],
  credits: [
    {
      title: '需求用固定的句式来写',
      body: [
        'Kiro 规格把行为放进 ',
        { c: 'requirements.md' },
        '，只用一种 EARS 句式：WHEN 某个条件成立，THE SYSTEM SHALL 做一件事。文档举的例子是一张填了无效数据的表单，系统在字段旁边显示校验错误。这种形状比一段含糊的文字更好测。',
      ],
    },
    {
      title: '从提示词一直走到任务',
      body: [
        '一份功能规格会依次走过需求、设计（',
        { c: 'design.md' },
        '）和任务（',
        { c: 'tasks.md' },
        '）。你可以从需求起步，也可以从设计起步。快速规格（Quick Spec）把三步一次跑完，中间不停下来等审批。缺陷修复规格（Bugfix）走的是另一条路。文档还写了：按 ',
        { c: 'tasks.md' },
        ' 里的依赖图，把彼此独立的任务分波并行执行。',
      ],
    },
    {
      title: '检查做在产品里面',
      body: [
        '需求分析（Analyze Requirements）在 IDE 和 CLI 里都能用，会在设计之前找出不一致、歧义、互相冲突的约束和缺口。正确性（Correctness）——从那些 EARS 句子抽出来的基于属性的测试——在规格能力表上只列给 IDE，CLI、网页端和移动端都不在列。',
      ],
    },
  ],
  tableNote: 'Kiro 是负责起草规格的产品。SpecScore 是仓库可以拿来检查的格式。下表比较的是这两种角色。',
  tableLabel: 'SpecScore 与 Kiro 的功能对比',
  rows: [
    {
      cap: '主要角色',
      them: ['起草规格并实现任务的智能体 IDE、CLI 和网页应用'],
      us: [{ s: '开放的规格格式 + CLI' }],
    },
    {
      cap: '规格文件',
      them: [{ c: 'requirements.md' }, '（或 ', { c: 'bugfix.md' }, '）、', { c: 'design.md' }, '、', { c: 'tasks.md' }],
      us: [{ s: '一棵 spec/ 目录树' }, '，由 Markdown 和 YAML 组成'],
    },
    {
      cap: '需求写法',
      them: ['EARS 句式：WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: '需求标识' },
        '（',
        { c: 'REQ: slug' },
        '）以及',
        { a: '给定/当/那么', href: '/acceptance-criteria-specification' },
        '验收标准',
      ],
    },
    {
      cap: '如何检查规格',
      them: ['IDE 和 CLI 里的需求分析（Analyze Requirements）。基于属性的测试只在 IDE。文档没有把它写成给你自己的 CI 用的格式检查器。'],
      us: [
        { s: 'specscore spec lint' },
        ' 跑在 CI 里。',
        { c: '/score' },
        ' 是另外一项手动的 AI 评分。',
      ],
    },
    {
      cap: '在哪里运行',
      them: ['Kiro IDE、Kiro CLI、Kiro 网页端。有些检查只在 IDE 里。'],
      us: [{ s: '任意仓库' }, '——一支 Go 二进制文件，不必有 Kiro 账户'],
    },
    {
      cap: '许可证',
      them: [
        { a: 'Kiro 许可证', href: 'https://kiro.dev/license/', kind: 'them' },
        '写明：IDE 和 CLI 是 AWS 客户协议（AWS Customer Agreement）项下的 AWS 内容（AWS Content）。Kiro Crew 是另一个',
        { a: '公开仓库', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
        '。',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' 格式 · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
    {
      cap: '价格',
      them: [
        '有免费档，也有付费方案。数字会变——见',
        { a: 'Kiro 价格', href: 'https://kiro.dev/pricing/', kind: 'them' },
        '，查阅于 2026年10月30日。',
      ],
      us: [{ s: '不收费' }, '，格式和 CLI 都如此'],
    },
  ],
  diffs: [
    {
      title: '格式自己就能让 CI 失败',
      terminal: true,
      body: [
        'Kiro 的分析跑在 Kiro 里面。SpecScore 的检查是一条命令。本仓库的',
        { a: 'dogfood 工作流', href: dogfood, kind: 'us' },
        '会在每一个拉取请求上、以及在 main 上运行 ',
        { c: 'specscore spec lint' },
        '。规格坏了，作业就会失败，跟测试坏了一样。',
        { a: '/score', href: score, kind: 'us' },
        ' 技能用 AI 评审给措辞打分；这一遍要手动跑，上面那个工作流并不会跑它。',
      ],
    },
    {
      title: '规格不绑在某一个 IDE 上',
      body: [
        'Kiro 规格是 Markdown，所以没有这款产品也能读。创建并执行它们的工作流是 Kiro 的。一棵 SpecScore 目录树，给 Claude Code、Cursor、Copilot 用，或者根本不用代理，都是同一批文件——CLI 做检查时不会调用模型。',
      ],
    },
    {
      title: '需求留着标识',
      body: [
        'Kiro 的文档把可追溯性写成：顺着一条需求跟到实现。文档没有写一种改写之后仍然稳定的标识。SpecScore 用 ',
        { c: 'REQ: slug' },
        ' 来称呼一条需求，验收标准则各自有标识。',
      ],
    },
    {
      title: 'EARS 和给定/当/那么问的不是同一件事',
      body: [
        '按 Kiro 文档的写法，EARS 是一句系统行为。SpecScore 的验收标准是挂在需求标识上的给定/当/那么场景。你可以在散文里写一行 EARS，同时把场景留在检查器会检查的那份 SpecScore 文件里。',
      ],
    },
  ],
  whenThemTitle: '更适合用 Kiro 的时候……',
  whenThem: [
    ['你要的是 AWS 的智能体 IDE：从一条提示词起草需求、设计和任务，然后再把任务实现出来。'],
    ['你要 EARS 句子，并且要在 IDE 里得到从这些句子生成的基于属性的测试。'],
    ['团队已经在把 Kiro 的编辑器、CLI 或网页应用定成标准。'],
  ],
  whenUs: [
    ['代理的会话结束之后，规格仍要在 CI 里保持有效，而且这个仓库并不要求用 Kiro。'],
    ['你需要需求标识、生命周期状态，以及每次都确定的检查结果。'],
    ['你希望这份格式', { a: '开源', href: repo, kind: 'us' }, '，检查器则是单个二进制文件。'],
  ],
  bridgeTitle: 'Kiro 负责起草。SpecScore 负责设门。',
  bridge: [
    [
      '这里没有东西要换掉 Kiro 的编辑器。团队若是在 Kiro 里写提示词，就让它起草。规格若必须作为一份审过的文件留下来，就把这份契约写成 SpecScore，并让 ',
      { c: 'specscore spec lint' },
      ' 在结构坏掉时让拉取请求失败。这两份文件可以放在同一个仓库里。',
    ],
    ['这一次会话，选 Kiro。那份 CI 作业可以拒绝的产物，选 SpecScore。'],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Kiro 文档——规格' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Kiro 文档——功能规格与 EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro——关于' },
    { href: 'https://kiro.dev/license/', label: 'Kiro——许可证' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro——价格' },
    { href: dogfood, label: 'specscore/specscore——dogfood 持续集成工作流' },
    { href: score, label: 'specstudio-skills——/score 技能' },
    { href: license, label: 'specscore/specscore——CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli——Apache-2.0' },
  ],
};
