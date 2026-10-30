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
  metaTitle: 'Tessl 對照 SpecScore：源頭是規範，還是平台',
  metaDescription:
    '把 SpecScore 和 Tessl 放在一起看。Tessl 是讓代理載入技能的平台；它的 tile 與 2025 年的文章主張規範才是源頭。SpecScore 則在 CI 裡檢查一種可以帶走的格式。核對日期：2026年10月30日。',
  h1: 'SpecScore 對照 Tessl',
  hero: [
    { a: '規範驅動開發', href: '/zh-tw/spec-driven-development/' },
    '（SDD）的意思是：預期行為的規範，要先於程式碼寫好。',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    '（Tessl AI Ltd）截至 2026年10月30日，是一個讓代理能用起來的平台：替程式設計代理所載入的技能、規則與外掛，提供登錄庫與管控層。「把規範當成源頭」是 Tessl ',
    { a: '2025年6月那篇文章', href: essay, kind: 'them' },
    '裡更重的主張：規範才是會一直留著的產物，程式碼是從它衍生出來的。',
    { a: 'SpecScore', href: '/zh-tw/' },
    ' 是這種規範的',
    { a: '開源', href: repo, kind: 'us' },
    '檔案格式，由',
    { a: '命令列介面', href: '/zh-tw/cli/' },
    '（CLI）來檢查。',
    { a: '持續整合', href: '/zh-tw/validators/' },
    '（CI）——每一項提議中的變更都會自動查一次——會在這個儲存庫裡執行該項檢查。',
  ],
  shared: [
    ['兩邊都認為，意圖不該只留在提示詞裡。寫下來的規範應該活得比聊天更久。'],
    ['兩邊都期待 AI 編碼代理先讀規範，再去改程式碼。'],
    ['兩邊都能把測試掛在需求上，於是「做完了」就有地方可以指。'],
  ],
  creditTitle: 'Tessl 擅長什麼。',
  creditNote: [
    'Tessl 有兩套介面很容易被人混為一談。下面的筆記把它們拆開，依據是 2026年10月30日讀過的頁面。',
  ],
  credits: [
    {
      title: '「規範即源頭」這件事講明白了',
      body: [
        'Simon Maple 於 2025年6月27日發表的文章指出：產品需求文件（PRD）——寫給人看、說明要打造什麼的散文——通常會過時失效，程式碼反而變成唯一可信的依據。文章提出的另一條路是：你改的是規範，由大型語言模型產生程式碼、測試與文件。這是一個站得住的立場，不是口號。',
      ],
    },
    {
      title: '替代理備好上下文的平台',
      body: [
        { a: 'Tessl 的文件', href: 'https://docs.tessl.io/', kind: 'them' },
        '寫的是登錄庫、會掃描技能再給技能評分的治理機制、評測，以及橫跨各個代理的可觀測性。文件說，技能就是你儲存庫裡的一般產物，平台可以跟 Claude Code、Cursor、Copilot、Gemini 等一起用。那邊講的評分，評的是技能，不是產品規範。',
      ],
    },
    {
      title: '官方出的規範驅動 tile，shell 檢查一併附上',
      body: [
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ' 這個 tile，在',
        { a: '公開的 tile 儲存庫', href: tile, kind: 'them' },
        '裡以 MIT 授權發布。它教代理先訪談、寫下 ',
        { c: '.spec.md' },
        ' 檔案、等核准，然後才實作。登錄庫那一頁列出 ',
        { c: 'scripts/validate-specs.sh' },
        ' 與 ',
        { c: 'scripts/check-spec-links.sh' },
        '，用來檢查前置資料、',
        { c: 'targets' },
        ' 以及 ',
        { c: '[@test]' },
        ' 連結。同一頁也說，這個 tile 是用來引導的上下文：沒有特別的命令，也沒有一套框架。',
      ],
    },
  ],
  tableNote: '「把規範當成源頭」是 Tessl 的文章。tile 是疊在目前這套平台上的一套技能組合。SpecScore 是有版本號的檢查器所檢查的格式。',
  tableLabel: 'SpecScore 對 Tessl 的功能對照',
  rows: [
    {
      cap: '主要角色',
      them: ['代理技能平台，外加一個規範驅動的 tile，以及 2025 年一篇談規範即源頭的文章'],
      us: [{ s: '開放的規範格式 + CLI' }],
    },
    {
      cap: '規範指的是什麼',
      them: ['文章：那份會一直留著的源頭，程式碼由它產生。tile：一份 .spec.md，代理對照它來實作，程式碼仍由你留著。'],
      us: [{ s: '放在程式碼旁邊的契約' }, '。檢查不會重新產生程式碼。'],
    },
    {
      cap: '規範的長相',
      them: ['tile：YAML 前置資料、targets 萬用字元，以及指向測試檔案的 [@test] 連結'],
      us: [
        { s: 'Markdown + YAML' },
        '、',
        { c: 'REQ: slug' },
        '、',
        { a: '給定／當／那麼', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: '怎麼檢查規範',
      them: ['tile 隨附的 shell 指令稿，只檢查這個 tile 自己的前置資料與連結'],
      us: [
        { s: 'specscore spec lint' },
        '，針對 SpecScore 格式，在這個儲存庫的 CI 裡執行。',
        { c: '/score' },
        ' 是要手動跑的 AI 評分。',
      ],
    },
    {
      cap: '授權',
      them: [
        '這個 tile 是 ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        '。平台是一項產品。文件沒有公布平台的原始碼。',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' 格式 · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
    {
      cap: '定價',
      them: [
        '在 2026年10月30日讀到的',
        { a: 'Tessl 首頁', href: 'https://tessl.io/', kind: 'them' },
        '上寫著免費方案（一個工作區一個月 1,000 點額度）以及付費的企業方案。',
      ],
      us: [{ s: '不必付費' }, '，格式與 CLI 都一樣'],
    },
  ],
  diffs: [
    {
      title: '對外發布的是格式，不是 tile 的指令稿',
      terminal: true,
      body: [
        'tile 的 shell 指令稿檢查的，是這個 tile 請代理去寫的 ',
        { c: '.spec.md' },
        ' 檔案。SpecScore 檢查的，是本站寫下來的格式。',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' 會安裝一個釘選版本的 ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' 發行版本，並執行 ',
        { c: 'specscore spec lint' },
        '。',
        { a: '/score', href: score, kind: 'us' },
        ' 不是那項作業：它是一項手動技能，AI 審查者回報問題時會以非零狀態結束。',
      ],
    },
    {
      title: '程式碼兩邊都還是你的——文章走得更遠',
      body: [
        '2025 年的文章認為，程式碼應該依規範重新產生。2026年10月30日讀到的 tile 頁面，是讓代理對照一份已核准的規範去實作，並沒有描述一個會把你的原始碼樹換掉的編譯器。SpecScore 不會把程式碼收走。規範是審過的契約；程式碼還是你的。',
      ],
    },
    {
      title: '每一條需求都有固定的名字',
      body: [
        'tile 用 ',
        { c: 'targets' },
        ' 與 ',
        { c: '[@test]' },
        ' 把一條需求指向檔案。SpecScore 把需求命名為 ',
        { c: 'REQ: slug' },
        '，於是計畫、任務和提交結尾註記在檔案搬家之後仍能引用它。',
      ],
    },
  ],
  whenThemTitle: '遇到這些情況，選 Tessl……',
  whenThem: [
    ['你需要登錄庫、評測和治理，來管理許多代理、許多儲存庫一起共用的技能。'],
    ['你想把「規範即源頭」那篇文章裡的工作流程做成一塊引導 tile：先訪談，核准一份 .spec.md，然後才實作。'],
    ['你已經在付費使用或試用 Tessl 平台，並希望它的規範 tile 就放在那個登錄庫裡。'],
  ],
  whenUs: [
    ['規範格式本身必須在 CI 裡有效，連那些不安裝 Tessl 的儲存庫也一樣。'],
    ['你要需求識別碼，以及一個不會去呼叫模型的檢查器。'],
    ['你希望這份格式', { a: '開源', href: repo, kind: 'us' }, '，用的是創用 CC 授權，並且跟技能平台分開。'],
  ],
  bridgeTitle: '規範可以當源頭，也要經得起檢查。',
  bridge: [
    [
      'Tessl 的文章說得對：過時的 PRD 會輸給程式碼。格式檢查，就是讓規範繼續成為你信得過的那一份的辦法。SpecScore 不會照規範去產生你的應用程式。結構、連結或狀態有誤時，它會讓規範在 CI 裡失敗。',
    ],
    ['平台和 tile 選 Tessl。git 裡那份產物若必須由拉取請求來證明，選 SpecScore。'],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Tessl 文件——Tessl 這項產品是什麼？' },
    { href: 'https://tessl.io/', label: 'Tessl 首頁' },
    { href: essay, label: 'Tessl 部落格——為什麼光有程式碼不夠（2025年6月27日）' },
    { href: tilePage, label: 'Tessl 登錄庫——tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore——dogfood 持續整合工作流程' },
    { href: score, label: 'specstudio-skills——/score 技能說明' },
    { href: license, label: 'specscore/specscore——CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli——Apache-2.0' },
  ],
};
