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
  metaTitle: 'Альтернатива Task Master AI: SpecScore проти Task Master.',
  metaDescription:
    'SpecScore vs Task Master AI. Task Master розбирає документ вимог до продукту на завдання для агентів, що пишуть код. SpecScore — формат специфікації, який CI може лінтити. Перевірено 30 жовтня 2026.',
  h1: 'SpecScore vs Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    ' (пакет ',
    { c: 'task-master-ai' },
    ', його також називають Taskmaster) — менеджер завдань для ШІ-агентів, що пишуть код. Документ вимог до продукту (PRD) — прозовий документ про те, що будувати; README Task Master велить покласти його в ',
    { c: '.taskmaster/docs/prd.txt' },
    ' і розібрати на завдання. ',
    { a: 'Розробка на основі специфікацій', href: '/uk/spec-driven-development/' },
    ' (SDD) — практика задавати поведінку до коду. ',
    { a: 'SpecScore', href: '/uk/' },
    ' — це формат ',
    { a: 'з відкритим вихідним кодом', href: repo, kind: 'us' },
    ' для цієї специфікації плюс ',
    { a: 'інтерфейс командного рядка', href: '/uk/cli/' },
    ' (CLI), який її перевіряє. ',
    { a: 'Безперервна інтеграція', href: '/uk/validators/' },
    ' (CI) — автоматична перевірка кожної запропонованої зміни — запускає цю перевірку в цьому репозиторії. Task Master не публікує формат специфікації, який CI міг би лінтити.',
  ],
  shared: [
    ['Обидва виходять із того, що ШІ-агент не повинен вигадувати всю роботу з промпта в один рядок.'],
    ['Обидва зберігають свій стан у репозиторії, щоб наступна сесія могла його побачити.'],
    ['Обидва можуть сказати агенту, що робити далі, замість того щоб наново читати весь проєкт.'],
  ],
  creditTitle: 'Що Task Master AI робить добре.',
  creditNote: [
    'Факти нижче взято з README проєкту й змісту документації, прочитаних 30 жовтня 2026. Кількості інструментів і списки моделей в тому README часто змінюються, тому тут не повторюються.',
  ],
  credits: [
    {
      title: 'PRD стає списком завдань',
      body: [
        'Шлях із README конкретний: ',
        { c: 'task-master parse-prd' },
        ' читає PRD і породжує завдання. ',
        { c: 'task-master next' },
        ' вказує на наступне завдання. ',
        { c: 'task-master expand' },
        ' дробить завдання. Теги переносять роботу між потоками. Це корисний шар, коли ви вже знаєте, що будуєте.',
      ],
    },
    {
      title: 'Він з’являється всередині редактора',
      body: [
        'Рекомендоване встановлення — сервер Model Context Protocol (MCP), невелика програма, яку викликає редактор, через ',
        { c: 'npx -y task-master-ai' },
        ', включно зі встановленням в один крок для Cursor і рядком ',
        { c: 'claude mcp add' },
        ' для Claude Code. Потім агент розбирає, перелічує й оновлює завдання без окремої панелі.',
      ],
    },
    {
      title: 'Дослідження з проєктом у контексті',
      body: [
        { c: 'task-master research' },
        ' описано як спосіб запитати модель про бібліотеку або міграцію, використовуючи поточний проєкт як контекст. Підтримується кілька постачальників моделей. README каже, що команди, які викликають модель, потребують ключа API, якщо ви не використовуєте шляхи Claude Code або Codex CLI, які він перелічує.',
      ],
    },
  ],
  tableNote: 'Task Master керує завданнями. SpecScore — специфікація, на яку ці завдання можуть посилатися. Таблиця порівнює ці ролі.',
  tableLabel: 'Порівняння можливостей SpecScore і Task Master AI',
  rows: [
    {
      cap: 'Основна роль',
      them: ['Список завдань для ШІ-агентів, що пишуть код, розібраний із PRD'],
      us: [{ s: 'Відкритий формат специфікацій + CLI' }],
    },
    {
      cap: 'Вхід',
      them: ['Прозовий PRD, описаний у .taskmaster/docs/prd.txt'],
      us: [{ s: 'Структуровані Markdown + YAML' }, ' з обов’язковими розділами'],
    },
    {
      cap: 'Що ви отримуєте',
      them: ['Завдання, залежності, теги і вказівник «наступного завдання»'],
      us: [{ s: 'Вимоги, критерії приймання, плани і завдання' }, ', які цитують ідентифікатори вимог'],
    },
    {
      cap: 'Перевірка специфікації',
      them: ['Немає задокументованого лінтера для PRD. Модель розбирає вільний текст.'],
      us: [
        { s: 'specscore spec lint' },
        ' у CI. ',
        { c: '/score' },
        ' — ручна оцінка ШІ формулювань.',
      ],
    },
    {
      cap: 'Середовище виконання',
      them: ['Node.js, зазвичай через сервер MCP. Виклики моделі потребують ключа постачальника або локальних Claude Code / Codex CLI, за README.'],
      us: [{ s: 'Один бінарник Go' }, '. Лінт не викликає модель.'],
    },
    {
      cap: 'Ліцензія',
      them: [
        { a: 'Публічний репозиторій', href: tm, kind: 'them' },
        ' випущено під ',
        { a: 'MIT плюс Commons Clause', href: tmLicense, kind: 'them' },
        '. README каже, що його можна використовувати і змінювати, і не можна продавати сам Task Master або пропонувати його як розміщену послугу.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' формат · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
  ],
  diffs: [
    {
      title: 'PRD — не специфікація, яку можна лінтити',
      terminal: true,
      body: [
        'Якість Task Master залежить від того, наскільки докладний PRD — README так і каже. Ніщо в тому README не перевіряє структуру PRD до того, як модель його розбере. SpecScore відмовляє фічі, у якої немає обов’язкового розділу. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' запускає ',
        { c: 'specscore spec lint' },
        ' на кожному pull request. Навичка ',
        { a: '/score', href: score, kind: 'us' },
        ' — другий, ручний прохід по формулюваннях. Це не команда CI.',
      ],
    },
    {
      title: 'Завдання можуть цитувати вимогу',
      body: [
        'Task Master дає завданням числові ідентифікатори і залежності. SpecScore дає вимогам сталі ідентифікатори (',
        { c: 'REQ: slug' },
        '). Завдання плану може назвати критерій, який воно виконує, а трейлер коміту може назвати його ще раз. Список завдань і специфікація перестають бути двома непов’язаними документами.',
      ],
    },
    {
      title: 'Лінту не потрібен ключ API',
      body: [
        'Розбір PRD в Task Master викликає модель. Перевірка дерева SpecScore — ні. CLI — бінарник Go з ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ', тож CI може запустити його без облікового запису постачальника.',
      ],
    },
  ],
  whenThemTitle: 'Беріть Task Master AI, коли…',
  whenThem: [
    ['У вас уже є PRD, і ви хочете, щоб агент розбив його на впорядковані завдання всередині Cursor, Claude Code або іншого клієнта MCP.'],
    ['Вам потрібні next-task, expand, теги і дослідження як команди редактора.'],
    ['Те, чим ви керуєте, — дошка завдань, а не формат специфікації для повторного використання.'],
  ],
  whenUs: [
    ['Самі вимоги мають бути структуровані, впізнавані й відхилятися CI, коли вони ламають формат.'],
    ['Ви не хочете виклику моделі на шляху, який вирішує, чи правильно оформлена специфікація.'],
    ['Ви хочете формат ', { a: 'з відкритим вихідним кодом', href: repo, kind: 'us' }, ' за CC BY 4.0, з CLI за Apache-2.0.'],
  ],
  bridgeTitle: 'Розбирайте завдання зі специфікації, яка вже проходить лінт.',
  bridge: [
    [
      'Task Master — сильна дошка завдань. Це не мова специфікацій. Запишіть поведінку в SpecScore, хай CI її лінтить, і спрямуйте список завдань на ідентифікатори ',
      { c: 'REQ: slug' },
      '. Якщо вам усе ще потрібні інструменти редактора Task Master, передайте йому PRD, породжений зі специфікації, яка вже пройшла ',
      { c: 'specscore spec lint' },
      '.',
    ],
    [
      'Використовуйте Task Master AI, щоб вибудовувати порядок роботи. Використовуйте SpecScore, щоб у роботи був контракт.',
    ],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master — MIT плюс Commons Clause' },
    { href: tmDocs, label: 'Документація Task Master (tryhamster.com)' },
    { href: dogfood, label: 'specscore/specscore — workflow CI dogfood' },
    { href: score, label: 'specstudio-skills — навичка /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
