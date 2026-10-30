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
  metaTitle: 'SpecScore 与 Tessl：规格当作源头',
  metaDescription:
    'SpecScore 与 Tessl。Tessl 是智能体技能平台；它的 tile 和 2025 年的文章把规格当作源头。SpecScore 在 CI 里检查一种可带走的格式。查阅于 2026年10月30日。',
  h1: 'SpecScore 与 Tessl',
  hero: [
    { a: '规范驱动开发', href: '/zh-cn/spec-driven-development/' },
    '（SDD）的意思是：预期行为的规格要写在代码之前。',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    '（Tessl AI Ltd）在 2026年10月30日这一天，是一个智能体赋能平台：给编程代理所加载的技能、规则和插件提供注册表与控制平面。“规格即源头”是 Tessl ',
    { a: '2025年6月的文章', href: essay, kind: 'them' },
    '里更强的那句主张：规格才是长期留下的产物，代码由它派生而来。',
    { a: 'SpecScore', href: '/zh-cn/' },
    ' 是这种规格的一种',
    { a: '开源', href: repo, kind: 'us' },
    '文件格式，由',
    { a: '命令行界面', href: '/zh-cn/cli/' },
    '（CLI）来检查。',
    { a: '持续集成', href: '/zh-cn/validators/' },
    '（CI）——每一次提议的变更都会自动查一遍——在本仓库里跑这项检查。',
  ],
  shared: [
    ['两边都说，提示词不是存放意图的好地方。写下来的规格应当比聊天活得更久。'],
    ['两边都指望 AI 编码代理先读规格，再去改代码。'],
    ['两边都可以把测试挂到需求上，这样“做完了”就有东西可以指出来。'],
  ],
  creditTitle: 'Tessl 做得好的地方。',
  creditNote: [
    'Tessl 有两处很容易混在一起。下面的说明把它们分开，依据是 2026年10月30日读过的页面。',
  ],
  credits: [
    {
      title: '把“规格即源头”讲清楚了',
      body: [
        'Simon Maple 在 2025年6月27日的文章说，产品需求文档（PRD）——写给人看、说明要构建什么的散文——通常会过时，代码反而成了唯一的事实来源。文章给出的另一条路是：你改的是规格，由大语言模型生成代码、测试和文档。这是一个认真的立场，不是口号。',
      ],
    },
    {
      title: '给代理准备上下文的平台',
      body: [
        { a: 'Tessl 的文档', href: 'https://docs.tessl.io/', kind: 'them' },
        '描述了注册表、会扫描技能并给技能打分的治理、评测，以及跨代理的可观测性。文档说技能就是你仓库里的普通产物，平台可以配合 Claude Code、Cursor、Copilot、Gemini 等使用。那里的打分，打的是技能，不是产品规格。',
      ],
    },
    {
      title: '官方的规范驱动 tile，带 shell 检查',
      body: [
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ' 这个 tile，在',
        { a: '公开的 tile 仓库', href: tile, kind: 'them' },
        '里以 MIT 许可发布。它教代理先访谈、写出 ',
        { c: '.spec.md' },
        ' 文件、等批准，然后再实现。注册表页面列出了 ',
        { c: 'scripts/validate-specs.sh' },
        ' 和 ',
        { c: 'scripts/check-spec-links.sh' },
        '，用来检查前置元数据、',
        { c: 'targets' },
        ' 以及 ',
        { c: '[@test]' },
        ' 链接。同一页说，这个 tile 是引导用的上下文：没有专用命令，也没有框架。',
      ],
    },
  ],
  tableNote: '“规格即源头”是 Tessl 的文章。tile 是叠在今天这套平台上的技能包。SpecScore 是带版本号的检查器所检查的格式。',
  tableLabel: 'SpecScore 与 Tessl 的功能对比',
  rows: [
    {
      cap: '主要角色',
      them: ['智能体技能平台，外加一个规范驱动的 tile，以及 2025 年一篇谈规格即源头的文章'],
      us: [{ s: '开放的规格格式 + CLI' }],
    },
    {
      cap: '规格是什么',
      them: ['文章：那份长期留下的源头，代码由它生成。tile：一份 .spec.md，代理对照它来实现，代码仍由你留着。'],
      us: [{ s: '放在代码旁边的契约' }, '。检查不会重新生成代码。'],
    },
    {
      cap: '规格的形状',
      them: ['tile：YAML 前置元数据、targets 通配符，以及指向测试文件的 [@test] 链接'],
      us: [
        { s: 'Markdown + YAML' },
        '、',
        { c: 'REQ: slug' },
        '、',
        { a: '给定/当/那么', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: '如何检查规格',
      them: ['随 tile 一起提供的 shell 脚本，只检查这个 tile 自己的前置元数据和链接'],
      us: [
        { s: 'specscore spec lint' },
        '，针对 SpecScore 格式，跑在本仓库的 CI 里。',
        { c: '/score' },
        ' 是手动的 AI 评分。',
      ],
    },
    {
      cap: '许可证',
      them: [
        '这个 tile 是 ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        '。平台是一项产品。文档没有把平台的源代码作为开源发布。',
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
        '2026年10月30日读过的',
        { a: 'Tessl 主页', href: 'https://tessl.io/', kind: 'them' },
        '写明：有免费档（一个工作区每月 1,000 点额度），也有付费的企业方案。',
      ],
      us: [{ s: '不收费' }, '，格式和 CLI 都如此'],
    },
  ],
  diffs: [
    {
      title: '发布的是格式，不是 tile 的脚本',
      terminal: true,
      body: [
        'tile 的 shell 脚本检查的是这个 tile 让代理去写的 ',
        { c: '.spec.md' },
        ' 文件。SpecScore 检查的是本站写明的格式。',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' 会安装一个钉住版本的 ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' 发行版，并运行 ',
        { c: 'specscore spec lint' },
        '。',
        { a: '/score', href: score, kind: 'us' },
        ' 不是这项作业：它是一项手动技能，AI 评审报出问题时以非零状态退出。',
      ],
    },
    {
      title: '代码两边都还在你手里——文章走得更远',
      body: [
        '2025 年的文章认为，代码应当从规格重新生成。2026年10月30日读到的 tile 页面，是让代理对照一份已批准的规格去实现，并没有描述一个会换掉你源码树的编译器。SpecScore 从不把代码拿走。规格是审过的契约；代码仍归你。',
      ],
    },
    {
      title: '需求有自己的名字',
      body: [
        'tile 用 ',
        { c: 'targets' },
        ' 和 ',
        { c: '[@test]' },
        ' 把一条需求指向文件。SpecScore 把需求命名为 ',
        { c: 'REQ: slug' },
        '，这样计划、任务和提交尾注在文件挪走之后仍能引用它。',
      ],
    },
  ],
  whenThemTitle: '更适合用 Tessl 的时候……',
  whenThem: [
    ['你需要注册表、评测和治理，用来管理许多代理和许多仓库一起共用的技能。'],
    ['你想把“规格即源头”那篇文章里的工作流做成一块引导 tile：先访谈，批准一份 .spec.md，然后再实现。'],
    ['你已经在付费使用或试用 Tessl 平台，并希望它的规格 tile 就放在那个注册表里。'],
  ],
  whenUs: [
    ['规格格式本身必须在 CI 里有效，包括那些不安装 Tessl 的仓库。'],
    ['你要需求标识，以及一个不会去调用模型的检查器。'],
    ['你希望这份格式', { a: '开源', href: repo, kind: 'us' }, '，用的是知识共享许可，并且和技能平台分开。'],
  ],
  bridgeTitle: '规格可以当源头，也可以被检查。',
  bridge: [
    [
      'Tessl 的文章说得对：过时的 PRD 比不过代码。格式检查，是让规格继续成为你信任的那份东西的办法。SpecScore 不会从规格生成你的应用。结构、链接或状态不对时，它会让规格在 CI 里失败。',
    ],
    ['要平台和 tile，就用 Tessl。拉取请求必须证明的是 git 里的那份产物，就用 SpecScore。'],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Tessl 文档——什么是 Tessl？' },
    { href: 'https://tessl.io/', label: 'Tessl 主页' },
    { href: essay, label: 'Tessl 博客——为什么只有代码不够（2025年6月27日）' },
    { href: tilePage, label: 'Tessl 注册表——tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore——dogfood 持续集成工作流' },
    { href: score, label: 'specstudio-skills——/score 技能' },
    { href: license, label: 'specscore/specscore——CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli——Apache-2.0' },
  ],
};
