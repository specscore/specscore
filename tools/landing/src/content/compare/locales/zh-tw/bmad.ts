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
  metaTitle: 'BMAD Method 對照 SpecScore：流程與可檢查的產物',
  metaDescription:
    '把 SpecScore 和 BMAD Method（以敏捷、人工智慧驅動開發為名的突破方法）放在一起看：一邊是敏捷代理工作流程，一邊是可以在 CI 裡檢查的規範格式。核對日期：2026年10月30日。',
  h1: 'SpecScore 對照 BMAD Method',
  hero: [
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    '（以敏捷、人工智慧驅動開發為名的突破方法，Breakthrough Method for Agile AI-Driven Development）是一種',
    { a: '開源', href: bmad, kind: 'them' },
    '做法，用 AI 代理來跑敏捷交付：先把工作釐清、排好計畫、做出來、再檢查，決策都要寫下來。產品需求文件（PRD）是用散文交代要打造什麼、為誰做；這個方法的工作流程地圖會先產出一份，其後才是架構與故事。',
    { a: '規範驅動開發', href: '/zh-tw/spec-driven-development/' },
    '（SDD）是兩邊共同所屬的更大想法——行為要在程式碼之前先訂好。',
    { a: 'SpecScore', href: '/zh-tw/' },
    ' 是這種規範的',
    { a: '開源', href: repo, kind: 'us' },
    '格式，另外加上',
    { a: '命令列介面', href: '/zh-tw/cli/' },
    '（CLI）。',
    { a: '持續整合', href: '/zh-tw/validators/' },
    '（CI）——每一項提議中的變更都會自動查一次——可以在 SpecScore 檔案的結構不對時失敗。',
  ],
  shared: [
    ['兩邊都禁止同一件事：代理不可以邊寫程式碼、邊把產品發明出來。'],
    ['兩邊都把規劃文件以 Markdown 放進儲存庫，就放在工作旁邊。'],
    ['兩邊都指望人先核准計畫，免得實作自己跑掉。'],
  ],
  creditTitle: 'BMAD Method 擅長什麼。',
  creditNote: [
    '2026年10月30日讀過的專案 README，稱 v6.12 為穩定版，稱 main 分支上的 v7 為預覽。那份 README 所寫的 v7 日期，讀的時候已經過了。這些版本線的名字，只該當成當時的快照。',
  ],
  credits: [
    {
      title: '方法自己會看工作有多大',
      body: [
        'README 說，小改動直接進入打造，比較大的工作才做規劃。',
        { a: 'main 上的工作流程地圖', href: workflow, kind: 'them' },
        '把階段寫清楚了：一份 PRD（',
        { c: 'PRD.md' },
        '）、可有可無的 UX 規範、附有決策紀錄的 ',
        { c: 'architecture.md' },
        '、史詩檔與故事檔，接著才是一輪衝刺。這是一整圈敏捷循環，不是單單一則提示詞。',
      ],
    },
    {
      title: '實作之前先有一道關卡',
      body: [
        '同一張地圖列出 ',
        { c: 'bmad-check-implementation-readiness' },
        '。實作開始前，它只回傳三種結果：PASS、CONCERNS、FAIL。v6 的產品經理代理另外還有 validate-PRD。兩道都是代理在自己的工作流程裡做的關卡，不是一支可以拿去掃任意 Markdown 目錄樹的格式檢查器。',
      ],
    },
    {
      title: '它的確公開發布了',
      body: [
        '這個方法在公開儲存庫裡以',
        { a: 'MIT 授權', href: bmadLicense, kind: 'them' },
        '發布。README 裡的穩定安裝命令是 ',
        { c: 'npx bmad-method install' },
        '。README 要求的版本是 Node.js 20.12 以上、Python 3.10 以上。網站',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        '說這個方法不收費。',
      ],
    },
  ],
  tableNote: 'BMAD 是做事的流程。SpecScore 是流程可以對準的產物格式。這張表對照的是這兩種角色。',
  tableLabel: 'SpecScore 對 BMAD Method 的功能對照',
  rows: [
    {
      cap: '主要角色',
      them: ['敏捷方法：代理、技能與工作流程，從想法一路到驗證過的程式碼'],
      us: [{ s: '開放的規範格式 + CLI' }],
    },
    {
      cap: '規劃時留下的東西',
      them: ['PRD、UX 規範、架構、史詩與故事、衝刺狀態——依據 2026年10月30日讀過的工作流程地圖'],
      us: [{ s: '想法、功能、計畫、任務' }, '，放在 spec/ 目錄樹裡，而且帶著需求識別碼'],
    },
    {
      cap: '怎麼檢查工作',
      them: ['由代理執行的就緒關卡（PASS / CONCERNS / FAIL），外加 validate-PRD 這條工作流程'],
      us: [
        { s: 'specscore spec lint' },
        ' 在 CI 裡執行，結果每次都確定。',
        { c: '/score' },
        ' 是要手動跑的 AI 評分。',
      ],
    },
    {
      cap: '需求識別碼',
      them: ['故事與功能需求寫在 PRD 和史詩檔裡。並不是 SpecScore 的 REQ: slug。'],
      us: [{ s: 'REQ: slug' }, '，以及驗收標準的識別碼'],
    },
    {
      cap: '執行環境',
      them: ['v6.12 的安裝器，README 寫明要有 Node.js 與 Python'],
      us: [{ s: '沒有別的' }, '，只要一支 Go 二進位檔就夠'],
    },
    {
      cap: '授權',
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
      title: '檢查是一則命令，不是方法裡的一步',
      terminal: true,
      body: [
        'BMAD 的就緒結果，是它工作流程內部的一個決定。SpecScore 的結果是行程的結束代碼。',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' 在每一則拉取請求上執行 ',
        { c: 'specscore spec lint' },
        '。',
        { a: '/score', href: score, kind: 'us' },
        ' 用儲存庫裡設好的審查者替產物評分；得由你自己呼叫。CI 不會去叫。',
      ],
    },
    {
      title: '換一套方法，格式還在',
      body: [
        'BMAD 的文件，長相是它的工作流程定出來的。你若停止執行 BMAD，Markdown 還在，但方法以外就沒有東西再去強制這個形狀。一棵 SpecScore 目錄樹就是契約。別的工作流程——BMAD 也算——一樣可以去寫它，檢查器照樣算數。',
      ],
    },
    {
      title: '故事和需求靠識別碼連在一起',
      body: [
        'BMAD 的故事會把上下文留到下一步，代理就不必把產品重新決定一遍。SpecScore 把這條關聯做成可以機械核對的：計畫裡的任務會引用 ',
        { c: 'REQ: slug' },
        '，',
        { c: 'specscore:' },
        ' 註解再加上 ',
        { c: 'Verifies:' },
        ' 提交結尾註記，把程式碼指回那條標準。',
      ],
    },
  ],
  whenThemTitle: '遇到這些情況，選 BMAD Method……',
  whenThem: [
    ['你要代理按角色各自的工作流程，把一整圈敏捷做完：PRD、架構、故事、衝刺。'],
    ['你要那道就緒關卡，以及這個方法附帶的產品、架構與測試幾種視角。'],
    ['你在把團隊下提示詞的方式定成標準，而這個方法的技能就是那套標準。'],
  ],
  whenUs: [
    ['標題、連結或狀態錯了，規範就得讓 CI 失敗，就算那天沒有人跑 BMAD 工作流程。'],
    ['你需要跨工具都穩得住的需求識別碼，而不是只活在某一種方法的故事檔裡。'],
    ['你希望有一種', { a: '開源', href: repo, kind: 'us' }, '格式，讓另一種流程也可以對準它。'],
  ],
  bridgeTitle: '流程可以寫出這種格式。',
  bridge: [
    [
      'BMAD 回答的是「我們要怎麼把工作跑起來」。SpecScore 回答的是「哪一份檔案才是契約，CI 又怎麼知道它還完好」。團隊可以留著 BMAD 的 PRD 和故事來談事情，再留一份 SpecScore 功能，放那些一定要通過檢查的需求。',
    ],
    ['循環留在 BMAD Method。拉取請求要檢查的那份產物，留在 SpecScore。'],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD——MIT 授權條款' },
    { href: workflow, label: 'BMAD 工作流程地圖（main，讀於 2026年10月30日）' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore——dogfood 持續整合工作流程' },
    { href: score, label: 'specstudio-skills——/score 技能說明' },
    { href: license, label: 'specscore/specscore——CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli——Apache-2.0' },
  ],
};
