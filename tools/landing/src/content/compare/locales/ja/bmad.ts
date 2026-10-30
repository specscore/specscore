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
  metaTitle: 'BMAD Method の代替: SpecScore と BMAD。',
  metaDescription:
    'SpecScore と BMAD Method（アジャイルな AI 駆動開発のための突破法）。エージェントによるアジャイルの作業手順と、CI で検査される仕様フォーマットの対比です。2026年10月30日に確認。',
  h1: 'SpecScore vs BMAD Method',
  hero: [
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    '（アジャイルな AI 駆動開発のための突破法）は、AI エージェントでアジャイルな提供を進める ',
    { a: 'オープンソース', href: bmad, kind: 'them' },
    ' なやり方です。作業を明確にし、計画し、作り、検査し、決定を書き残します。プロダクト要求文書（PRD）は、何を誰のために作るかを散文で説明したものです。この方法のワークフロー図は、まず PRD を作り、次にアーキテクチャとストーリーを作ります。',
    { a: '仕様駆動開発', href: '/ja/spec-driven-development/' },
    '（SDD）は、両者が置かれるより広い考えです。振る舞いはコードより先に指定されます。',
    { a: 'SpecScore', href: '/ja/' },
    ' はその仕様のための ',
    { a: 'オープンソース', href: repo, kind: 'us' },
    'のフォーマットであり、',
    { a: 'コマンドラインインターフェース', href: '/ja/cli/' },
    '（CLI）が付きます。',
    { a: '継続的インテグレーション', href: '/ja/validators/' },
    '（CI）、つまり提案された変更のたびに走る自動検査は、SpecScore のファイルの構造が誤っているときに失敗できます。',
  ],
  shared: [
    ['どちらも、コードを書きながらエージェントに製品を発明させることを拒みます。'],
    ['どちらも、計画の文書をリポジトリの中、作業の隣の Markdown に残します。'],
    ['どちらも、実装が走り出す前に、人が計画を承認することを期待します。'],
  ],
  creditTitle: 'BMAD Method が得意なこと。',
  creditNote: [
    '2026年10月30日に読んだプロジェクトの README は、v6.12 を安定版、v7 を main ブランチ上のプレビューと呼んでいます。その README に書かれた v7 の日付は、すでに過ぎていました。行の名前はスナップショットとして扱ってください。',
  ],
  credits: [
    {
      title: '作業の大きさに合わせて手順を変える方法',
      body: [
        'README は、小さな変更はすぐビルドへ進み、大きな作業は計画を受ける、と述べます。',
        { a: 'main 上のワークフロー図', href: workflow, kind: 'them' },
        ' は段階を書いています。PRD（',
        { c: 'PRD.md' },
        '）、任意の UX 仕様、意思決定の記録を伴う ',
        { c: 'architecture.md' },
        '、エピックとストーリーのファイル、それからスプリントです。これは一つのプロンプトではなく、アジャイルの一巡です。',
      ],
    },
    {
      title: '実装の前にある関門',
      body: [
        '同じ図は ',
        { c: 'bmad-check-implementation-readiness' },
        ' を挙げます。実装の前に PASS、CONCERNS、または FAIL を返します。v6 のプロダクトマネージャーのエージェントにも validate-PRD の手順があります。これらはエージェントが実行するワークフローの関門です。任意の Markdown ツリーに向ける、別のフォーマットリンターではありません。',
      ],
    },
    {
      title: '実際に公開されている',
      body: [
        'この方法は公開リポジトリで ',
        { a: 'MIT ライセンス', href: bmadLicense, kind: 'them' },
        ' です。README の安定版の導入は ',
        { c: 'npx bmad-method install' },
        ' であり、Node.js 20.12 以降と Python 3.10 以降を求めています。サイト ',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        ' は、この方法は無料である、と述べています。',
      ],
    },
  ],
  tableNote: 'BMAD はプロセスです。SpecScore は、プロセスが対象にできる成果物のフォーマットです。表はその役割を比べます。',
  tableLabel: 'SpecScore と BMAD Method の機能比較',
  rows: [
    {
      cap: '主な役割',
      them: ['アジャイルの方法: 着想から検証済みのコードまでのエージェント、スキル、ワークフロー'],
      us: [{ s: 'オープンな仕様フォーマット + CLI' }],
    },
    {
      cap: '計画の成果物',
      them: ['PRD、UX 仕様、アーキテクチャ、エピックとストーリー、スプリントの状態 — 2026年10月30日に読んだワークフロー図より'],
      us: ['要件 ID を伴う、spec/ ツリーの中の ', { s: '着想、機能、計画、タスク' }],
    },
    {
      cap: '作業の検査',
      them: ['エージェントが実行する、準備の関門（PASS / CONCERNS / FAIL）と validate-PRD ワークフロー'],
      us: [
        'CI における決定論的な ',
        { s: 'specscore spec lint' },
        '。',
        { c: '/score' },
        ' は手動の AI 採点です。',
      ],
    },
    {
      cap: '要件 ID',
      them: ['PRD とエピックのファイルの中のストーリーと機能要件。SpecScore の REQ: slug ではありません。'],
      us: [{ s: 'REQ: slug' }, ' と受け入れ基準の ID'],
    },
    {
      cap: '実行環境',
      them: ['README が説明する v6.12 のインストーラーのための Node.js と Python'],
      us: ['単一の Go バイナリ以外には ', { s: '何も要りません' }],
    },
    {
      cap: 'ライセンス',
      them: [
        { a: 'MIT', href: bmadLicense, kind: 'them' },
        '、',
        { a: 'bmad-code-org/BMAD-METHOD', href: bmad, kind: 'them' },
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
      title: '検査はコマンドであり、方法の中の一段ではない',
      terminal: true,
      body: [
        'BMAD の準備の結果は、そのワークフローの中の判断です。SpecScore の結果はプロセスの終了コードです。',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' はすべてのプルリクエストで ',
        { c: 'specscore spec lint' },
        ' を実行します。',
        { a: '/score', href: score, kind: 'us' },
        ' は、リポジトリに設定されたレビュアーで成果物を採点します。呼び出すのは人です。CI は呼びません。',
      ],
    },
    {
      title: 'フォーマットは別の方法を超えて残る',
      body: [
        'BMAD の文書は、そのワークフローによって形作られます。BMAD を走らせるのをやめても Markdown は残りますが、方法の外で形を強制するものはありません。SpecScore のツリーは契約です。BMAD を含む別のワークフローがそれを書いても、リンターは同じように適用されます。',
      ],
    },
    {
      title: 'ストーリーと要件は ID で結び付いたまま',
      body: [
        'BMAD のストーリーは文脈を先へ運ぶので、エージェントが製品を決め直さずに済みます。SpecScore はその結び付きを機械的にします。計画のタスクは ',
        { c: 'REQ: slug' },
        ' を引き、',
        { c: 'specscore:' },
        ' の注記と ',
        { c: 'Verifies:' },
        ' のコミットトレーラーが、コードを基準へ向けて指します。',
      ],
    },
  ],
  whenThemTitle: 'BMAD Method を選ぶのは…',
  whenThem: [
    ['役割ごとのワークフローを持つエージェントが実行する、PRD、アーキテクチャ、ストーリー、スプリントというアジャイルの一巡が欲しいとき。'],
    ['準備の関門と、この方法が備えるプロダクト、アーキテクチャ、テストの視点の一団が欲しいとき。'],
    ['チームのプロンプトの仕方を揃えようとしていて、その標準がこの方法のスキルであるとき。'],
  ],
  whenUs: [
    ['その日に BMAD のワークフローを誰も走らせなくても、見出し、リンク、状態が誤っているときに仕様が CI で失敗しなければならないとき。'],
    ['一つの方法のストーリーファイルの中だけでなく、ツールをまたいで安定した要件 ID が必要なとき。'],
    ['別のプロセスが対象にできる ', { a: 'オープンソース', href: repo, kind: 'us' }, 'のフォーマットが欲しいとき。'],
  ],
  bridgeTitle: '方法が、フォーマットを書ける。',
  bridge: [
    [
      'BMAD が答えるのは「作業をどう進めるか」です。SpecScore が答えるのは「契約であるファイルは何か、そして CI はどうやってそれが壊れていないと知るか」です。チームは会話のために BMAD の PRD とストーリーを残し、検査しなければならない要件のために SpecScore の機能を残すことができます。',
    ],
    [
      '一巡には BMAD Method を。プルリクエストが検査する成果物には SpecScore を。',
    ],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD — MIT ライセンス' },
    { href: workflow, label: 'BMAD のワークフロー図（main、2026年10月30日に読了）' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore — dogfood の CI ワークフロー' },
    { href: score, label: 'specstudio-skills — /score スキル' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
