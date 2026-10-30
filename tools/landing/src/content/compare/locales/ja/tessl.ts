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
  metaTitle: 'Tessl の代替: SpecScore と、仕様をソースにする考え方。',
  metaDescription:
    'SpecScore と Tessl。Tessl はエージェントスキルのプラットフォームで、タイルと 2025 年のエッセイは仕様をソースとして扱います。SpecScore は CI で持ち運べるフォーマットを検査します。2026年10月30日に確認。',
  h1: 'SpecScore vs Tessl',
  hero: [
    { a: '仕様駆動開発', href: '/ja/spec-driven-development/' },
    '（SDD）とは、意図した振る舞いの仕様を、コードより先に書くことです。',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    '（Tessl AI Ltd）は、2026年10月30日時点で、エージェント活用のプラットフォームです。コーディングエージェントが読み込むスキル、ルール、プラグインのためのレジストリとコントロールプレーンです。「仕様をソースとする」は、Tessl の ',
    { a: '2025年6月のエッセイ', href: essay, kind: 'them' },
    ' における、より強い主張です。長く残る成果物は仕様であり、コードはそこから導き出されます。',
    { a: 'SpecScore', href: '/ja/' },
    ' はその仕様のための ',
    { a: 'オープンソース', href: repo, kind: 'us' },
    'のファイルフォーマットであり、',
    { a: 'コマンドラインインターフェース', href: '/ja/cli/' },
    '（CLI）が検査します。',
    { a: '継続的インテグレーション', href: '/ja/validators/' },
    '（CI）、つまり提案された変更のたびに走る自動検査が、このリポジトリではその検査を実行します。',
  ],
  shared: [
    ['どちらも、意図を残す場所としてプロンプトは弱い、と言います。書かれた仕様はチャットより長く残るべきです。'],
    ['どちらも、AI のコーディングエージェントがコードを編集する前に仕様を読むことを期待します。'],
    ['どちらも、要件にテストを付けられるので、「完了」は指させるものになります。'],
  ],
  creditTitle: 'Tessl が得意なこと。',
  creditNote: [
    'Tessl には混同しやすい二つの面があります。以下は、2026年10月30日に読んだページに基づき、それらを分けて記します。',
  ],
  credits: [
    {
      title: '仕様をソースとする、はっきりした論',
      body: [
        'Simon Maple の 2025年6月27日のエッセイは、プロダクト要求文書（PRD）、つまり何を作るかを人に向けて書いた散文は、たいてい古くなり、コードだけが唯一の正しい情報源になる、と述べます。エッセイの対案は、変える対象は仕様であり、LLM がそこからコード、テスト、文書を生成する、というものです。これはスローガンではなく、一つの立場です。',
      ],
    },
    {
      title: 'エージェントの文脈のためのプラットフォーム',
      body: [
        { a: 'Tessl のドキュメント', href: 'https://docs.tessl.io/', kind: 'them' },
        ' は、レジストリ、スキルを走査して採点するガバナンス、評価（evals）、エージェントを横断する可観測性を説明しています。ドキュメントは、スキルはリポジトリ内の平易な成果物であり、プラットフォームは Claude Code、Cursor、Copilot、Gemini などと動く、と述べます。そこでの採点はスキルの採点であり、製品仕様の採点ではありません。',
      ],
    },
    {
      title: 'シェル検査付きの公式な仕様駆動タイル',
      body: [
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ' タイルは、',
        { a: '公開タイルリポジトリ', href: tile, kind: 'them' },
        ' で MIT ライセンスです。エージェントに、ヒアリングし、',
        { c: '.spec.md' },
        ' を書き、承認を待ってから実装するよう教えます。レジストリのページは ',
        { c: 'scripts/validate-specs.sh' },
        ' と ',
        { c: 'scripts/check-spec-links.sh' },
        ' を、フロントマター、',
        { c: 'targets' },
        '、',
        { c: '[@test]' },
        ' のリンクのために挙げています。同じページは、このタイルが指針となる文脈であり、特別なコマンドもフレームワークもない、と述べています。',
      ],
    },
  ],
  tableNote: '「仕様をソースとする」は Tessl のエッセイです。タイルは、今日のプラットフォームの上に載るスキルパックです。SpecScore は、版のあるリンターを持つフォーマットです。',
  tableLabel: 'SpecScore と Tessl の機能比較',
  rows: [
    {
      cap: '主な役割',
      them: ['エージェントスキルのプラットフォームに加え、仕様駆動のタイルと、仕様をソースとする 2025 年のエッセイ'],
      us: [{ s: 'オープンな仕様フォーマット + CLI' }],
    },
    {
      cap: '仕様とは何か',
      them: ['エッセイ: 長く残り、コードがそこから生成されるソース。タイル: エージェントが実装の対象とし、コードは手元に残す .spec.md。'],
      us: [{ s: 'コードのそばにある契約' }, '。Lint はコードを再生成しません。'],
    },
    {
      cap: '仕様の形',
      them: ['タイル: YAML フロントマター、targets のグロブ、テストファイルへの [@test] リンク'],
      us: [
        { s: 'Markdown + YAML' },
        '、',
        { c: 'REQ: slug' },
        '、',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: '仕様の検査',
      them: ['そのタイルのフロントマターとリンクのための、タイルに同梱されたシェルスクリプト'],
      us: [
        'このリポジトリの CI で、SpecScore フォーマットに対する ',
        { s: 'specscore spec lint' },
        '。',
        { c: '/score' },
        ' は手動の AI 採点です。',
      ],
    },
    {
      cap: 'ライセンス',
      them: [
        'タイルは ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        ' です。プラットフォームは製品です。ドキュメントは、プラットフォームのソースをオープンソースとしては公開していません。',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' のフォーマット · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' の CLI',
      ],
    },
    {
      cap: '価格',
      them: [
        '2026年10月30日に読んだ ',
        { a: 'Tessl のホームページ', href: 'https://tessl.io/', kind: 'them' },
        ' は、無料枠（1 つのワークスペースで月 1,000 クレジット）と、有料のエンタープライズプランを説明しています。',
      ],
      us: ['フォーマットにも CLI にも ', { s: '料金はありません' }],
    },
  ],
  diffs: [
    {
      title: '公開されたフォーマットであり、タイルのスクリプトではない',
      terminal: true,
      body: [
        'タイルのシェルスクリプトが検査するのは、そのタイルがエージェントに書かせた ',
        { c: '.spec.md' },
        ' です。SpecScore が検査するのは、このサイトに文書化されたフォーマットです。',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' はピン留めした ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' のリリースを導入し、',
        { c: 'specscore spec lint' },
        ' を実行します。',
        { a: '/score', href: score, kind: 'us' },
        ' はそのジョブではありません。AI のレビュアーが問題を報告したときにゼロ以外で終了する、手動のスキルです。',
      ],
    },
    {
      title: 'どちらの場合もコードは手元に残る。エッセイはさらに先へ進む',
      body: [
        '2025 年のエッセイは、コードを仕様から再生成すべきだ、と述べます。2026年10月30日に読んだページのタイルは、承認された仕様に対してエージェントが実装する、としており、ソースツリーを置き換えるコンパイラは説明していません。SpecScore がコードを取り上げることはありません。仕様はレビューされる契約であり、コードは手元に残ります。',
      ],
    },
    {
      title: '要件の同一性',
      body: [
        'タイルは要件を、',
        { c: 'targets' },
        ' と ',
        { c: '[@test]' },
        ' でファイルに向けます。SpecScore は要件を ',
        { c: 'REQ: slug' },
        ' と名付けるので、ファイルが動いたあとも、計画、タスク、コミットトレーラーがそれを引用できます。',
      ],
    },
  ],
  whenThemTitle: 'Tessl を選ぶのは…',
  whenThem: [
    ['多くのエージェントとリポジトリで共有するスキルのために、レジストリ、評価、ガバナンスが必要なとき。'],
    ['仕様をソースとするエッセイの流れを、指針となるタイルとして欲しいとき。ヒアリングし、.spec.md を承認し、それから実装します。'],
    ['すでに Tessl のプラットフォームを契約している、または試していて、そのレジストリの仕様タイルが欲しいとき。'],
  ],
  whenUs: [
    ['Tessl を導入しないリポジトリを含め、仕様フォーマットそのものが CI で妥当でなければならないとき。'],
    ['要件 ID と、モデルを呼ばないリンターが欲しいとき。'],
    ['スキルのプラットフォームとは別に、クリエイティブ・コモンズのライセンスでフォーマットを ', { a: 'オープンソース', href: repo, kind: 'us' }, ' にしたいとき。'],
  ],
  bridgeTitle: '仕様をソースとし、検査できる仕様を。',
  bridge: [
    [
      '古くなった PRD はコードに負ける、という Tessl のエッセイは正しいです。仕様が信頼する対象であり続ける方法が、フォーマットの検査です。SpecScore は仕様からアプリケーションを生成しません。構造、リンク、状態が誤っているときに、仕様を CI で失敗させます。',
    ],
    [
      'プラットフォームとタイルが欲しいなら Tessl を。プルリクエストが証明しなければならないのが git の中の成果物なら SpecScore を。',
    ],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Tessl ドキュメント — Tessl とは' },
    { href: 'https://tessl.io/', label: 'Tessl のホームページ' },
    { href: essay, label: 'Tessl ブログ — コードだけでは足りない理由（2025年6月27日）' },
    { href: tilePage, label: 'Tessl レジストリ — tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore — dogfood の CI ワークフロー' },
    { href: score, label: 'specstudio-skills — /score スキル' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
