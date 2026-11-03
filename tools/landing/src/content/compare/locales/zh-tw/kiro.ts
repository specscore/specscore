import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Kiro 對照 SpecScore：CI 能不能擋下這份規範',
  metaDescription:
    '把 SpecScore 和 Kiro 放在一起看。Kiro 是亞馬遜網路服務做出的代理式 IDE，需求用 EARS 來寫。SpecScore 是一種開放規範格式，CI 可以擋下不合格的檔案。核對日期：2026年10月30日。',
  h1: 'SpecScore 對照 Kiro',
  hero: [
    { a: '規範驅動開發', href: '/zh-tw/spec-driven-development/' },
    '（SDD）指的是這件事：AI 代理還沒開始寫程式碼，軟體該做的事就先寫好。',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ' 出自亞馬遜網路服務（AWS）。它是一套代理式開發環境，裡頭有編輯器、',
    { a: '命令列介面', href: '/zh-tw/cli/' },
    '（CLI）以及網頁應用程式。一段提示詞進去，出來的是 Kiro 規範：需求、設計、任務。那些需求採用 ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    '（簡易需求語法，Easy Approach to Requirements Syntax），句子的形狀是「WHEN 有某件事發生，THE SYSTEM SHALL 做某件事」。',
    { a: 'SpecScore', href: '/zh-tw/' },
    ' 則是規範本體的',
    { a: '開源', href: repo, kind: 'us' },
    '格式，另外附一支專門檢查這些檔案的 CLI。',
    { a: '持續整合', href: '/zh-tw/validators/' },
    '（CI）——每一項提議中的變更都會自動查一次——可以把一份寫壞格式的 SpecScore 規範退回去。',
  ],
  shared: [
    ['兩邊都認定：代理該照著一份寫下來的規範來打造，而不是照著聊天紀錄。'],
    ['兩邊都把那份規範以 Markdown 留在專案裡，所以審查方式可以比照程式碼。'],
    ['兩邊都把工作拆開，分成需求、設計與任務。Kiro 會把這三個檔案生出來。SpecScore 則是工作階段結束以後，團隊還留得住的格式。'],
  ],
  creditTitle: 'Kiro 擅長什麼。',
  creditNote: [
    '關於這項產品的說法，依據是 2026年10月30日讀過的 Kiro 官方文件。功能規範那一頁所標的更新日期，是 2026年8月4日。',
  ],
  credits: [
    {
      title: '行為寫成固定句型',
      body: [
        'Kiro 的規範把行為放在 ',
        { c: 'requirements.md' },
        '，句型只用一種 EARS：條件成立時寫 WHEN，系統該做的事寫 THE SYSTEM SHALL。文件給的例子是一張填了無效資料的表單，系統在該欄位旁邊顯示驗證錯誤。比起一段含糊其辭的文字，這種形狀更好測試。',
      ],
    },
    {
      title: '提示詞到任務，路是通的',
      body: [
        '一份功能規範會依序經過需求、設計（',
        { c: 'design.md' },
        '）與任務（',
        { c: 'tasks.md' },
        '）。起點可以是需求，也可以是設計。快速規範（Quick Spec）一次把三步跑完，中間不設核准停點。修缺陷用的規範（Bugfix）另走一條路。文件也寫到：依照 ',
        { c: 'tasks.md' },
        ' 裡的相依圖，把彼此獨立的任務分成幾波、平行執行。',
      ],
    },
    {
      title: '檢查就做在產品裡',
      body: [
        '需求檢視（Analyze Requirements）在 IDE 與 CLI 都能用，設計開始之前會去找前後不一致、歧義、彼此衝突的約束，以及缺漏。正確性（Correctness）——從那些 EARS 句子抽出、以屬性為基礎的測試——在規範能力表上只列給 IDE。CLI、網頁版、行動版都不在那張表上。',
      ],
    },
  ],
  tableNote: 'Kiro 這項產品負責把規範起草出來。SpecScore 是儲存庫可以拿來檢查的格式。這張表對照的是這兩種角色。',
  tableLabel: 'SpecScore 對 Kiro 的功能對照',
  rows: [
    {
      cap: '主要角色',
      them: ['代理式 IDE、CLI 與網頁應用程式，負責起草規範並實作任務'],
      us: [{ s: '開放的規範格式 + CLI' }],
    },
    {
      cap: '規範檔案',
      them: [{ c: 'requirements.md' }, '（或 ', { c: 'bugfix.md' }, '）、', { c: 'design.md' }, '、', { c: 'tasks.md' }],
      us: [{ s: '一棵 spec/ 目錄樹' }, '，以 Markdown 加上 YAML 組成'],
    },
    {
      cap: '需求怎麼寫',
      them: ['EARS 寫成：WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: '需求識別碼' },
        '（',
        { c: 'REQ: slug' },
        '）與',
        { a: '給定／當／那麼', href: '/acceptance-criteria-specification' },
        '驗收標準',
      ],
    },
    {
      cap: '怎麼檢查規範',
      them: ['IDE 與 CLI 裡的需求檢視（Analyze Requirements）。以屬性為基礎的測試只在 IDE。文件並沒有把它寫成你自己的 CI 能用的格式檢查器。'],
      us: [
        { s: 'specscore spec lint' },
        ' 在 CI 裡執行。',
        { c: '/score' },
        ' 則是分開的、要手動跑的 AI 評分。',
      ],
    },
    {
      cap: '在哪裡跑',
      them: ['Kiro IDE、Kiro CLI、Kiro 網頁版。有一部分檢查只在 IDE 裡。'],
      us: [{ s: '任何儲存庫' }, '——一支 Go 二進位檔，不必擁有 Kiro 帳戶'],
    },
    {
      cap: '授權',
      them: [
        { a: 'Kiro 授權', href: 'https://kiro.dev/license/', kind: 'them' },
        '載明 IDE 與 CLI 屬於 AWS 客戶協議（AWS Customer Agreement）底下的 AWS 內容（AWS Content）。Kiro Crew 另外獨立成一個',
        { a: '公開儲存庫', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
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
      cap: '定價',
      them: [
        '有免費方案，也有付費方案。標價會改——見',
        { a: 'Kiro 定價', href: 'https://kiro.dev/pricing/', kind: 'them' },
        '，讀於 2026年10月30日。',
      ],
      us: [{ s: '不必付費' }, '，格式與 CLI 都一樣'],
    },
  ],
  diffs: [
    {
      title: '格式本身就足以讓 CI 失敗',
      terminal: true,
      body: [
        'Kiro 的分析是在 Kiro 裡面跑的。SpecScore 的檢查則是一則命令。這個儲存庫的',
        { a: 'dogfood 工作流程', href: dogfood, kind: 'us' },
        '會在每一則拉取請求上、也在 main 上執行 ',
        { c: 'specscore spec lint' },
        '。壞掉的規範會讓作業失敗，後果跟壞掉的測試一樣。',
        { a: '/score', href: score, kind: 'us' },
        ' 技能請 AI 審查者替措辭評分；這一關要手動跑，上面那個工作流程並不會去跑它。',
      ],
    },
    {
      title: '規範並不拴在某一個 IDE',
      body: [
        'Kiro 規範是 Markdown，所以沒有那套產品也能讀。把它們生出來、再執行下去的工作流程，是 Kiro 的。一棵 SpecScore 目錄樹，不論交給 Claude Code、Cursor、Copilot，或根本沒有代理，都是同一批檔案——CLI 做檢查時不會呼叫模型。',
      ],
    },
    {
      title: '需求留有識別碼',
      body: [
        'Kiro 的文件把可追溯性寫成：沿著一條需求追到實作。文件裡沒有寫一種改寫之後仍然穩得住的識別碼。SpecScore 以 ',
        { c: 'REQ: slug' },
        ' 稱呼一條需求，驗收標準則各自帶著自己的識別碼。',
      ],
    },
    {
      title: 'EARS 與給定／當／那麼問的不是同一件事',
      body: [
        '依 Kiro 文件的寫法，EARS 就是一句系統行為。SpecScore 的驗收標準，是綁在需求識別碼上的給定／當／那麼情境。你可以在散文裡寫一行 EARS，同時把情境留在檢查器會檢查的那份 SpecScore 檔案裡。',
      ],
    },
  ],
  whenThemTitle: '遇到這些情況，選 Kiro……',
  whenThem: [
    ['你要的是 AWS 的代理式 IDE：從一段提示詞起草需求、設計與任務，接著把任務實作出來。'],
    ['你要 EARS 句子，而且要在 IDE 裡有從這些句子產生、以屬性為基礎的測試。'],
    ['你們團隊已經決定把標準定在 Kiro 的編輯器、CLI 或網頁應用程式。'],
  ],
  whenUs: [
    ['代理的工作階段結束以後，規範仍須在 CI 裡維持有效，而且這個儲存庫不必裝 Kiro。'],
    ['你需要需求識別碼、生命週期狀態，以及每次都一樣的檢查結果。'],
    ['你希望這份格式', { a: '開源', href: repo, kind: 'us' }, '，而且檢查器是一支二進位檔。'],
  ],
  bridgeTitle: '起草交給 Kiro。把關交給 SpecScore。',
  bridge: [
    [
      '這裡沒有任何東西要取代 Kiro 的編輯器。若團隊是在 Kiro 裡下提示詞，就讓它起草。若規範必須以一份審過的檔案留下來，就把這份契約寫成 SpecScore，並讓 ',
      { c: 'specscore spec lint' },
      ' 在結構壞掉時讓拉取請求失敗。這兩份檔案可以放進同一個儲存庫。',
    ],
    ['這一輪工作階段選 Kiro。那份 CI 作業可以拒絕的產物，選 SpecScore。'],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Kiro 文件——規範' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Kiro 文件——功能規範與 EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro——關於' },
    { href: 'https://kiro.dev/license/', label: 'Kiro——授權' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro——定價' },
    { href: dogfood, label: 'specscore/specscore——dogfood 持續整合工作流程' },
    { href: score, label: 'specstudio-skills——/score 技能說明' },
    { href: license, label: 'specscore/specscore——CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli——Apache-2.0' },
  ],
};
