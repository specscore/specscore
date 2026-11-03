import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Kiro の代替: SpecScore と Kiro の仕様。',
  metaDescription:
    'SpecScore と Kiro。Kiro は Amazon Web Services（AWS）のエージェント型 IDE で、EARS の要件を書きます。SpecScore は CI が検査できるオープンな仕様フォーマットです。2026年10月30日に確認。',
  h1: 'SpecScore vs Kiro',
  hero: [
    { a: '仕様駆動開発', href: '/ja/spec-driven-development/' },
    '（SDD）とは、AI エージェントがコードを書く前に、ソフトウェアが何をすべきかを文章にしておくことです。Amazon Web Services（AWS）の ',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ' はエージェント型の開発環境です。エディタ、',
    { a: 'コマンドラインインターフェース', href: '/ja/cli/' },
    '（CLI）、ウェブアプリからなり、プロンプトを Kiro の仕様、すなわち要件・設計・タスクに変えます。それらの要件は ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    '（要件構文への平易なアプローチ）を使います。「WHEN（何かが起きたとき）、THE SYSTEM SHALL（システムは何かをしなければならない）」という形の文です。',
    { a: 'SpecScore', href: '/ja/' },
    ' は仕様そのもののための ',
    { a: 'オープンソース', href: repo, kind: 'us' },
    'のフォーマットであり、ファイルを検査する CLI が付きます。',
    { a: '継続的インテグレーション', href: '/ja/validators/' },
    '（CI）、つまり提案された変更のたびに走る自動検査は、フォーマットを壊した SpecScore の仕様を拒否できます。',
  ],
  shared: [
    ['どちらも、エージェントが作るべきものの根拠を、チャットの記録ではなく書かれた仕様に置きます。'],
    ['どちらも、その仕様をプロジェクト内の Markdown として残すので、コードと同じようにレビューできます。'],
    ['どちらも、作業を要件、設計、タスクに分けます。Kiro はその三つのファイルを生成します。SpecScore は、セッションが終わったあともチームが残せるフォーマットです。'],
  ],
  creditTitle: 'Kiro が得意なこと。',
  creditNote: [
    'Kiro 自身のドキュメントを 2026年10月30日に読み、製品の説明に使いました。機能仕様のページには、2026年8月4日更新と記されていました。',
  ],
  credits: [
    {
      title: '決まった文型で書かれる要件',
      body: [
        'Kiro の仕様は振る舞いを ',
        { c: 'requirements.md' },
        ' に、一つの EARS パターンで書きます。条件が成り立つ WHEN、システムは何かをしなければならない THE SYSTEM SHALL。ドキュメントの例は、不正なデータを含むフォームで、システムがフィールドの横に検証エラーを出す、というものです。この形は、あいまいな段落よりテストしやすいです。',
      ],
    },
    {
      title: 'プロンプトからタスクまでの一連の経路',
      body: [
        '機能仕様は、要件、設計（',
        { c: 'design.md' },
        '）、タスク（',
        { c: 'tasks.md' },
        '）と進みます。要件から始めることも、設計から始めることもできます。Quick Spec は三つを、間に承認の停止を挟まず通します。バグ修正用の仕様は別の経路です。ドキュメントは、',
        { c: 'tasks.md' },
        ' の依存グラフから、独立したタスクを波に分けて並列に実行することも説明しています。',
      ],
    },
    {
      title: '製品の中にある検査',
      body: [
        'Analyze Requirements は IDE と CLI で使え、設計の前に、矛盾、あいまいさ、衝突する制約、抜けを探します。Correctness、つまりそれらの EARS の行から導くプロパティベーステストは、仕様の機能表において IDE のみに載っており、CLI、ウェブ、モバイルにはありません。',
      ],
    },
  ],
  tableNote: 'Kiro は仕様の草案を作る製品です。SpecScore は、リポジトリが検査できるフォーマットです。表はその役割を比べます。',
  tableLabel: 'SpecScore と Kiro の機能比較',
  rows: [
    {
      cap: '主な役割',
      them: ['仕様の草案を作り、タスクを実装するエージェント型 IDE、CLI、ウェブアプリ'],
      us: [{ s: 'オープンな仕様フォーマット + CLI' }],
    },
    {
      cap: '仕様ファイル',
      them: [{ c: 'requirements.md' }, '（または ', { c: 'bugfix.md' }, '）、', { c: 'design.md' }, '、', { c: 'tasks.md' }],
      us: ['Markdown と YAML の ', { s: 'spec/ ツリー' }],
    },
    {
      cap: '要件の構文',
      them: ['EARS のパターン: WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: '要件 ID' },
        '（',
        { c: 'REQ: slug' },
        '）と ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
        ' の受け入れ基準',
      ],
    },
    {
      cap: '仕様の検査',
      them: ['IDE と CLI の Analyze Requirements。IDE のプロパティベーステスト。自前の CI 向けフォーマットリンターとしては説明されていません。'],
      us: [
        'CI の ',
        { s: 'specscore spec lint' },
        '。',
        { c: '/score' },
        ' は別の、手動の AI 採点です。',
      ],
    },
    {
      cap: '動作する場所',
      them: ['Kiro IDE、Kiro CLI、Kiro のウェブ。検査の一部は IDE のみです。'],
      us: [{ s: '任意のリポジトリ' }, ' — Go バイナリ一つ。Kiro のアカウントは不要'],
    },
    {
      cap: 'ライセンス',
      them: [
        { a: 'Kiro のライセンス', href: 'https://kiro.dev/license/', kind: 'them' },
        ' は、IDE と CLI が AWS カスタマー契約の下の AWS Content であるとしています。Kiro Crew は別の ',
        { a: '公開リポジトリ', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
        ' です。',
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
        '無料枠と有料プランがあります。数字は変わります。2026年10月30日に読んだ ',
        { a: 'Kiro の料金', href: 'https://kiro.dev/pricing/', kind: 'them' },
        ' を参照してください。',
      ],
      us: ['フォーマットにも CLI にも ', { s: '料金はありません' }],
    },
  ],
  diffs: [
    {
      title: 'フォーマットは、それだけで CI を失敗させる',
      terminal: true,
      body: [
        'Kiro の分析は Kiro の中で動きます。SpecScore の検査は一つのコマンドです。このリポジトリの ',
        { a: 'dogfood ワークフロー', href: dogfood, kind: 'us' },
        ' は、すべてのプルリクエストと main で ',
        { c: 'specscore spec lint' },
        ' を実行します。壊れた仕様は、壊れたテストと同じようにジョブを失敗させます。',
        { a: '/score', href: score, kind: 'us' },
        ' スキルは、AI のレビュアーで文言を採点します。その一回は手動であり、上のワークフローはそれを実行しません。',
      ],
    },
    {
      title: '仕様は一つの IDE に縛られない',
      body: [
        'Kiro の仕様は Markdown なので、製品がなくても読めます。それらを作り、実行するワークフローは Kiro のものです。SpecScore のツリーは、Claude Code、Cursor、Copilot、あるいはエージェントが何もない場合でも同じファイルです。CLI は lint のためにモデルを呼びません。',
      ],
    },
    {
      title: '要件には ID が残る',
      body: [
        'Kiro のドキュメントは、トレーサビリティを、要件を実装まで追うこととして説明しています。書き換えを超えて残る安定した ID は説明していません。SpecScore は要件を ',
        { c: 'REQ: slug' },
        ' として指し、受け入れ基準はそれ自身の ID で指します。',
      ],
    },
    {
      title: 'EARS と Given/When/Then は別の問いに答える',
      body: [
        'Kiro が文書化している EARS は、システムの振る舞いを一文にしたものです。SpecScore の受け入れ基準は、要件 ID に結び付いた Given/When/Then のシナリオです。散文の中に EARS の一文を書き、リンターが検査する SpecScore のファイルにはシナリオを残す、という併用ができます。',
      ],
    },
  ],
  whenThemTitle: 'Kiro を選ぶのは…',
  whenThem: [
    ['プロンプトから要件、設計、タスクの草案を作り、そのタスクを実装する、AWS のエージェント型 IDE が欲しいとき。'],
    ['EARS の文と、IDE ではそれらから生成されるプロパティベーステストが欲しいとき。'],
    ['チームがすでに Kiro のエディタ、CLI、またはウェブアプリに揃えているとき。'],
  ],
  whenUs: [
    ['エージェントのセッションが終わったあとも、Kiro を必要としないリポジトリで、仕様が CI において妥当であり続けなければならないとき。'],
    ['要件 ID、ライフサイクルの状態、決定論的な lint の結果が必要なとき。'],
    ['フォーマットを ', { a: 'オープンソース', href: repo, kind: 'us' }, ' にし、検査器を単一のバイナリにしたいとき。'],
  ],
  bridgeTitle: 'Kiro は草案を書ける。SpecScore は関門になれる。',
  bridge: [
    [
      'ここにあるものは、Kiro のエディタに取って代わるものではありません。チームがプロンプトする場所が Kiro なら、草案は Kiro に任せてください。仕様がレビューされるファイルとして残らなければならないなら、その契約を SpecScore で書き、構造が壊れたときに ',
      { c: 'specscore spec lint' },
      ' がプルリクエストを失敗させるようにします。二つのファイルは同じリポジトリに置けます。',
    ],
    [
      'セッションには Kiro を。CI のジョブが拒否できる成果物には SpecScore を。',
    ],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Kiro ドキュメント — 仕様' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Kiro ドキュメント — 機能仕様と EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro — 概要' },
    { href: 'https://kiro.dev/license/', label: 'Kiro — ライセンス' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro — 料金' },
    { href: dogfood, label: 'specscore/specscore — dogfood の CI ワークフロー' },
    { href: score, label: 'specstudio-skills — /score スキル' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
