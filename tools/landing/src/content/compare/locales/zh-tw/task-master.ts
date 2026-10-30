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
  metaTitle: 'Task Master AI 對照 SpecScore：任務清單與契約',
  metaDescription:
    '把 SpecScore 和 Task Master AI 放在一起看。Task Master 會把產品需求文件解析成編碼代理的任務。SpecScore 是 CI 可以檢查的規範格式。核對日期：2026年10月30日。',
  h1: 'SpecScore 對照 Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    '（',
    { c: 'task-master-ai' },
    ' 這個套件，另有一個名字叫 Taskmaster）替 AI 編碼代理管任務。產品需求文件（PRD）是一篇散文，說明要打造什麼；依 Task Master 的 README，檔案要放在 ',
    { c: '.taskmaster/docs/prd.txt' },
    '，再解析成任務。',
    { a: '規範驅動開發', href: '/zh-tw/spec-driven-development/' },
    '（SDD）講的是先把行為訂死，再去寫程式碼。',
    { a: 'SpecScore', href: '/zh-tw/' },
    ' 是這種規範的',
    { a: '開源', href: repo, kind: 'us' },
    '格式，再加上一支用來檢查它的',
    { a: '命令列介面', href: '/zh-tw/cli/' },
    '（CLI）。',
    { a: '持續整合', href: '/zh-tw/validators/' },
    '（CI）——每一項提議中的變更都會自動查一次——會在這個儲存庫裡執行該項檢查。Task Master 並沒有發布一種可供 CI 檢查的規範格式。',
  ],
  shared: [
    ['兩邊的前提一樣：整份工作不該由 AI 代理從一行提示詞裡憑空生出來。'],
    ['兩邊都把狀態留在儲存庫裡，下一次工作階段還看得到。'],
    ['兩邊都能直接告訴代理下一手該做什麼，省得把整個專案再讀一遍。'],
  ],
  creditTitle: 'Task Master AI 擅長什麼。',
  creditNote: [
    '以下取自 2026年10月30日讀過的專案 README 與文件索引。工具有幾種、模型有哪些，那份 README 常常改，這裡就不重複列。',
  ],
  credits: [
    {
      title: '一份 PRD 變成任務清單',
      body: [
        'README 裡的路徑寫得很具體：',
        { c: 'task-master parse-prd' },
        ' 讀一份 PRD，產生任務。',
        { c: 'task-master next' },
        ' 指向下一項任務。',
        { c: 'task-master expand' },
        ' 把單一任務再拆細。標籤則把工作在不同工作線之間搬來搬去。你若已經知道要做什麼，這一層就用得上。',
      ],
    },
    {
      title: '它直接出現在編輯器裡',
      body: [
        '建議的安裝方式是一個模型上下文協定（Model Context Protocol，MCP）伺服器——編輯器會去呼叫的一支小程式——透過 ',
        { c: 'npx -y task-master-ai' },
        '。Cursor 有一步裝好的做法，Claude Code 則是一行 ',
        { c: 'claude mcp add' },
        '。裝好之後，代理就可以解析、列出、更新任務，不必再另開儀表板。',
      ],
    },
    {
      title: '帶著專案上下文做調研',
      body: [
        { c: 'task-master research' },
        '，文件把它寫成：以目前專案當上下文，向模型問一個函式庫，或問一次遷移。支援的模型供應商不止一家。README 也寫了：會呼叫模型的命令需要 API 金鑰；走它列出的 Claude Code 或 Codex CLI，就可以不必。',
      ],
    },
  ],
  tableNote: '任務是 Task Master 在管的。那些任務要引用的規範，才是 SpecScore。下面對照的是這兩種角色。',
  tableLabel: 'SpecScore 對 Task Master AI 的功能對照',
  rows: [
    {
      cap: '主要角色',
      them: ['從 PRD 解析出來、給 AI 編碼代理用的任務清單'],
      us: [{ s: '開放的規範格式 + CLI' }],
    },
    {
      cap: '輸入',
      them: ['散文寫成的 PRD，文件指定放在 .taskmaster/docs/prd.txt'],
      us: [{ s: '帶結構的 Markdown + YAML' }, '，章節有必填項'],
    },
    {
      cap: '你拿到什麼',
      them: ['任務、相依、標籤，以及一個「下一項任務」的指標'],
      us: [{ s: '需求、驗收標準、計畫與任務' }, '，而且會引用需求識別碼'],
    },
    {
      cap: '怎麼檢查規範',
      them: ['文件裡沒有記載 PRD 檢查器。模型解析的是自由文字。'],
      us: [
        { s: 'specscore spec lint' },
        ' 在 CI 裡執行。',
        { c: '/score' },
        ' 是針對措辭、要手動跑的 AI 評分。',
      ],
    },
    {
      cap: '執行環境',
      them: ['一般透過 MCP 伺服器跑在 Node.js 上。README 寫明：要呼叫模型，得有供應商金鑰，不然就走本機的 Claude Code 或 Codex CLI。'],
      us: [{ s: '一支 Go 二進位檔' }, '。檢查不會去呼叫模型。'],
    },
    {
      cap: '授權',
      them: [
        '這個',
        { a: '公開儲存庫', href: tm, kind: 'them' },
        '是 ',
        { a: 'MIT 再加上 Commons Clause', href: tmLicense, kind: 'them' },
        '。README 允許使用與修改，但不允許出售 Task Master 本身，也不允許把它做成代管服務對外提供。',
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
      title: 'PRD 不是可以檢查的規範',
      terminal: true,
      body: [
        'README 自己寫了：Task Master 好不好用，看 PRD 細不細。同一份 README 沒有任何步驟，會在模型動手解析之前先看 PRD 的結構對不對。SpecScore 則會把缺了必填章節的功能擋下來。',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' 在每一則拉取請求上執行 ',
        { c: 'specscore spec lint' },
        '。',
        { a: '/score', href: score, kind: 'us' },
        ' 技能是再看一遍措辭，而且得手動啟動。它跟那條 CI 命令不是同一件事。',
      ],
    },
    {
      title: '任務可以點名一條需求',
      body: [
        '任務在 Task Master 裡用的是數字識別碼，另外還有相依關係。需求在 SpecScore 裡用的是穩定識別碼（',
        { c: 'REQ: slug' },
        '）。計畫裡的一項任務可以寫出它對上的那條標準，提交結尾註記可以再寫一次。於是任務清單和規範不再是兩份各寫各的文件。',
      ],
    },
    {
      title: '檢查不需要 API 金鑰',
      body: [
        'Task Master 解析 PRD 時會去呼叫模型。檢查 SpecScore 那棵目錄樹則不必。這支 CLI 來自 ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' 的 Go 二進位檔，所以 CI 不用供應商帳戶也能跑。',
      ],
    },
  ],
  whenThemTitle: '遇到這些情況，選 Task Master AI……',
  whenThem: [
    ['手上已經有 PRD，想讓代理在 Cursor、Claude Code，或其他 MCP 用戶端裡，把它拆成有先後的任務。'],
    ['你想在編輯器裡直接下這些命令：下一項任務（next-task）、拆開（expand）、標籤（tags）、調研（research）。'],
    ['你要管的是任務板，而不是一套可以拿到別的專案再用的規範格式。'],
  ],
  whenUs: [
    ['需求得自帶結構、叫得出名字；格式一壞，就該由 CI 退回。'],
    ['判斷規範算不算寫對，這條路上你不想呼叫模型。'],
    ['你希望這份格式', { a: '開源', href: repo, kind: 'us' }, '，採 CC BY 4.0，CLI 則採 Apache-2.0。'],
  ],
  bridgeTitle: '任務要從已經檢查過的規範裡拆出來。',
  bridge: [
    [
      'Task Master 當任務板很強。它並不是一套規範語言。行為寫進 SpecScore，交給 CI 檢查，再讓任務清單指向 ',
      { c: 'REQ: slug' },
      ' 這些識別碼。若編輯器裡仍想用 Task Master 的工具，餵進去的 PRD 應該來自已經通過 ',
      { c: 'specscore spec lint' },
      ' 的規範。',
    ],
    ['工作的先後交給 Task Master AI。讓這份工作有契約的，是 SpecScore。'],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master——MIT 再加上 Commons Clause' },
    { href: tmDocs, label: 'Task Master 文件（tryhamster.com）' },
    { href: dogfood, label: 'specscore/specscore——dogfood 持續整合工作流程' },
    { href: score, label: 'specstudio-skills——/score 技能說明' },
    { href: license, label: 'specscore/specscore——CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli——Apache-2.0' },
  ],
};
