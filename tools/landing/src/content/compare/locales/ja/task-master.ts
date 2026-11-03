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
  metaTitle: 'Task Master AI の代替: SpecScore と Task Master。',
  metaDescription:
    'SpecScore と Task Master AI。Task Master はプロダクト要求文書を、コーディングエージェント向けのタスクに分解します。SpecScore は CI が検査できる仕様フォーマットです。2026年10月30日に確認。',
  h1: 'SpecScore vs Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    '（',
    { c: 'task-master-ai' },
    ' パッケージ。Taskmaster とも呼ばれます）は、AI のコーディングエージェント向けのタスク管理です。プロダクト要求文書（PRD）は、何を作るかを散文で書いた文書です。Task Master の README は、それを ',
    { c: '.taskmaster/docs/prd.txt' },
    ' に置き、タスクへ分解する、と述べます。',
    { a: '仕様駆動開発', href: '/ja/spec-driven-development/' },
    '（SDD）は、コードより先に振る舞いを指定する実践です。',
    { a: 'SpecScore', href: '/ja/' },
    ' はその仕様のための ',
    { a: 'オープンソース', href: repo, kind: 'us' },
    'のフォーマットであり、それを検査する ',
    { a: 'コマンドラインインターフェース', href: '/ja/cli/' },
    '（CLI）が付きます。',
    { a: '継続的インテグレーション', href: '/ja/validators/' },
    '（CI）、つまり提案された変更のたびに走る自動検査が、このリポジトリではその検査を実行します。Task Master は、CI が検査するための仕様フォーマットを公開していません。',
  ],
  shared: [
    ['どちらも、AI エージェントが一文のプロンプトから仕事の全体を発明すべきではない、と置きます。'],
    ['どちらも、次のセッションが見られるように、状態をリポジトリの中に残します。'],
    ['どちらも、プロジェクト全体を読み直す代わりに、エージェントへ次に何をすべきかを伝えられます。'],
  ],
  creditTitle: 'Task Master AI が得意なこと。',
  creditNote: [
    '以下の事実は、2026年10月30日に読んだプロジェクトの README とドキュメントの目次によります。その README のツール数とモデルの一覧はよく変わるので、ここには繰り返していません。',
  ],
  credits: [
    {
      title: 'PRD がタスク一覧になる',
      body: [
        'README の経路は具体的です。',
        { c: 'task-master parse-prd' },
        ' が PRD を読み、タスクを生成します。',
        { c: 'task-master next' },
        ' が次のタスクを指します。',
        { c: 'task-master expand' },
        ' がタスクを分解します。タグは作業をストリームの間で移します。何を作るかがすでに分かっているときの、役に立つ層です。',
      ],
    },
    {
      title: 'エディタの中に現れる',
      body: [
        '推奨される導入は、モデルコンテキストプロトコル（MCP）のサーバー、つまりエディタが呼び出す小さなプログラムを、',
        { c: 'npx -y task-master-ai' },
        ' で入れることです。Cursor 向けの一段の導入と、Claude Code 向けの ',
        { c: 'claude mcp add' },
        ' の行を含みます。エージェントは、別のダッシュボードなしに、タスクを分解し、一覧し、更新します。',
      ],
    },
    {
      title: 'プロジェクトを文脈にした調査',
      body: [
        { c: 'task-master research' },
        ' は、現在のプロジェクトを文脈にして、ライブラリや移行についてモデルに尋ねる方法として文書化されています。複数のモデル提供者がサポートされます。README は、モデルを呼ぶコマンドには API キーが必要である、と述べます。ただし、そこに挙げられた Claude Code または Codex CLI の経路を使う場合は別です。',
      ],
    },
  ],
  tableNote: 'Task Master はタスクを管理します。SpecScore は、それらのタスクが引用できる仕様です。表はその役割を比べます。',
  tableLabel: 'SpecScore と Task Master AI の機能比較',
  rows: [
    {
      cap: '主な役割',
      them: ['PRD から分解された、AI コーディングエージェント向けのタスク一覧'],
      us: [{ s: 'オープンな仕様フォーマット + CLI' }],
    },
    {
      cap: '入力',
      them: ['散文の PRD。場所は .taskmaster/docs/prd.txt と文書化されています'],
      us: ['必須の節を持つ ', { s: '構造化された Markdown + YAML' }],
    },
    {
      cap: '得られるもの',
      them: ['タスク、依存関係、タグ、そして「次のタスク」へのポインタ'],
      us: ['要件 ID を引用する ', { s: '要件、受け入れ基準、計画、タスク' }],
    },
    {
      cap: '仕様の検査',
      them: ['PRD のための文書化されたリンターはありません。モデルが自由な文章を分解します。'],
      us: [
        'CI の ',
        { s: 'specscore spec lint' },
        '。',
        { c: '/score' },
        ' は文言に対する手動の AI 採点です。',
      ],
    },
    {
      cap: '実行環境',
      them: ['Node.js。通常は MCP サーバーを通します。README によれば、モデルの呼び出しには提供者のキー、または手元の Claude Code / Codex CLI が必要です。'],
      us: [{ s: 'Go バイナリ一つ' }, '。Lint はモデルを呼びません。'],
    },
    {
      cap: 'ライセンス',
      them: [
        { a: '公開リポジトリ', href: tm, kind: 'them' },
        ' は ',
        { a: 'MIT に Commons Clause を加えたもの', href: tmLicense, kind: 'them' },
        ' です。README は、使用と改変はでき、Task Master そのものを売ること、またはホストされたサービスとして提供することはできない、と述べています。',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' のフォーマット · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' の CLI',
      ],
    },
  ],
  diffs: [
    {
      title: 'PRD は検査できる仕様ではない',
      terminal: true,
      body: [
        'Task Master の質は PRD がどれだけ詳しいかに依存します。README がそう述べています。その README の中には、モデルが分解する前に PRD の構造を検査するものはありません。SpecScore は、必須の節が欠けた機能を拒否します。',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' はすべてのプルリクエストで ',
        { c: 'specscore spec lint' },
        ' を実行します。',
        { a: '/score', href: score, kind: 'us' },
        ' スキルは、文言に対する二度目の、手動の通過です。CI のコマンドではありません。',
      ],
    },
    {
      title: 'タスクは要件を引用できる',
      body: [
        'Task Master はタスクに数値の ID と依存関係を与えます。SpecScore は要件に安定した ID（',
        { c: 'REQ: slug' },
        '）を与えます。計画のタスクは満たす基準を名指しでき、コミットトレーラーはもう一度それを名指しできます。タスク一覧と仕様は、無関係な二つの文書ではなくなります。',
      ],
    },
    {
      title: 'Lint に API キーは要らない',
      body: [
        'Task Master で PRD を分解すると、モデルを呼びます。SpecScore のツリーを検査しても、呼びません。CLI は ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' の Go バイナリなので、提供者のアカウントなしに CI が実行できます。',
      ],
    },
  ],
  whenThemTitle: 'Task Master AI を選ぶのは…',
  whenThem: [
    ['すでに PRD があり、Cursor、Claude Code、または別の MCP クライアントの中で、エージェントにそれを順序付きのタスクへ分けてほしいとき。'],
    ['次のタスク、展開、タグ、調査を、エディタのコマンドとして欲しいとき。'],
    ['管理しているものがタスクボードであり、再利用できる仕様フォーマットではないとき。'],
  ],
  whenUs: [
    ['要件そのものが構造を持ち、識別でき、フォーマットを壊したときに CI が拒否しなければならないとき。'],
    ['仕様が整形式かどうかの判断に、モデルの呼び出しを入れたくないとき。'],
    ['CC BY 4.0 のフォーマットと Apache-2.0 の CLI で、フォーマットを ', { a: 'オープンソース', href: repo, kind: 'us' }, ' にしたいとき。'],
  ],
  bridgeTitle: 'すでに検査を通った仕様から、タスクを分解する。',
  bridge: [
    [
      'Task Master は強いタスクボードです。仕様の言語ではありません。振る舞いを SpecScore で書き、CI に検査させ、タスク一覧を ',
      { c: 'REQ: slug' },
      ' の ID へ向けてください。それでも Task Master のエディタツールが欲しいなら、すでに ',
      { c: 'specscore spec lint' },
      ' を通った仕様から生成した PRD を渡してください。',
    ],
    [
      '作業の順序には Task Master AI を。作業に契約を持たせるには SpecScore を。',
    ],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master — MIT に Commons Clause' },
    { href: tmDocs, label: 'Task Master のドキュメント（tryhamster.com）' },
    { href: dogfood, label: 'specscore/specscore — dogfood の CI ワークフロー' },
    { href: score, label: 'specstudio-skills — /score スキル' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
