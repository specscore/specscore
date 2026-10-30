import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Альтернатива Kiro: SpecScore vs специфікації Kiro.',
  metaDescription:
    'SpecScore vs Kiro. Kiro — агентна IDE від AWS, яка пише вимоги в EARS. SpecScore — відкритий формат специфікації, який CI може лінтити. Перевірено 30 жовтня 2026.',
  h1: 'SpecScore vs Kiro',
  hero: [
    { a: 'Розробка на основі специфікацій', href: '/uk/spec-driven-development/' },
    ' (SDD) означає, що те, що програма має робити, записують до того, як ШІ-агент напише код. ',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ' від Amazon Web Services (AWS) — це агентне середовище розробки — редактор, ',
    { a: 'інтерфейс командного рядка', href: '/uk/cli/' },
    ' (CLI) і вебзастосунок, — яке перетворює промпт на специфікації Kiro: вимоги, дизайн і завдання. Ці вимоги використовують ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    ' (простий підхід до синтаксису вимог), речення вигляду «WHEN щось відбувається, THE SYSTEM SHALL щось зробити». ',
    { a: 'SpecScore', href: '/uk/' },
    ' — це формат ',
    { a: 'з відкритим вихідним кодом', href: repo, kind: 'us' },
    ' для самої специфікації плюс CLI, який перевіряє файли. ',
    { a: 'Безперервна інтеграція', href: '/uk/validators/' },
    ' (CI) — автоматична перевірка кожної запропонованої зміни — може відхилити специфікацію SpecScore, яка порушує формат.',
  ],
  shared: [
    ['Обидва вважають написану специфікацію тим, з чого агент має будувати, а не стенограмою чату.'],
    ['Обидва зберігають цю специфікацію як Markdown у проєкті, щоб її можна було рецензувати як код.'],
    ['Обидва ділять роботу на вимоги, дизайн і завдання. Kiro породжує ці три файли. SpecScore — формат, який команда може зберегти після завершення сесії.'],
  ],
  creditTitle: 'Що Kiro робить добре.',
  creditNote: [
    'Власна документація Kiro, прочитана 30 жовтня 2026, описує продукт. Сторінку специфікації функції було позначено як оновлену 4 серпня 2026.',
  ],
  credits: [
    {
      title: 'Вимоги у фіксованій формі речення',
      body: [
        'Специфікації Kiro вміщують поведінку в ',
        { c: 'requirements.md' },
        ' за одним шаблоном EARS: WHEN умова виконується, THE SYSTEM SHALL зробити щось. Документація наводить приклад форми з невірними даними, а система показує помилку перевірки поруч із полем. Таку форму легше тестувати, ніж розпливчастий абзац.',
      ],
    },
    {
      title: 'Повний шлях від промпта до завдань',
      body: [
        'Специфікація функції проходить через вимоги, дизайн (',
        { c: 'design.md' },
        ') і завдання (',
        { c: 'tasks.md' },
        '). Можна почати з вимог або з дизайну. Quick Spec запускає всі три без зупинки на затвердження між ними. Специфікації Bugfix — окремий шлях. Документація також описує запуск незалежних завдань паралельно, хвилями, за графом залежностей у ',
        { c: 'tasks.md' },
        '.',
      ],
    },
    {
      title: 'Перевірки всередині продукту',
      body: [
        'Analyze Requirements, доступний в IDE і в CLI, шукає неузгодженості, неоднозначність, суперечливі обмеження і прогалини до дизайну. Correctness — тести на основі властивостей, виведені з цих рядків EARS, — зазначений лише для IDE, не для CLI, web чи mobile, у таблиці можливостей специфікацій.',
      ],
    },
  ],
  tableNote: 'Kiro — продукт, який накидає специфікації. SpecScore — формат, який репозиторій може перевірити. Таблиця порівнює ці ролі.',
  tableLabel: 'Порівняння можливостей SpecScore і Kiro',
  rows: [
    {
      cap: 'Основна роль',
      them: ['Агентна IDE, CLI і вебзастосунок, які накидають специфікації й виконують завдання'],
      us: [{ s: 'Відкритий формат специфікацій + CLI' }],
    },
    {
      cap: 'Файли специфікації',
      them: [{ c: 'requirements.md' }, ' (або ', { c: 'bugfix.md' }, '), ', { c: 'design.md' }, ', ', { c: 'tasks.md' }],
      us: [{ s: 'Дерево spec/' }, ' із Markdown + YAML'],
    },
    {
      cap: 'Синтаксис вимог',
      them: ['Шаблон EARS: WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: 'Ідентифікатори вимог' },
        ' (',
        { c: 'REQ: slug' },
        ') і критерії приймання ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Перевірка специфікації',
      them: ['Analyze Requirements в IDE і CLI. Тести на основі властивостей в IDE. Не описано як лінтер формату для вашої власної CI.'],
      us: [
        { s: 'specscore spec lint' },
        ' у CI. ',
        { c: '/score' },
        ' — окрема ручна оцінка ШІ.',
      ],
    },
    {
      cap: 'Де виконується',
      them: ['Kiro IDE, Kiro CLI, Kiro web. Частина перевірок лише в IDE.'],
      us: [{ s: 'Будь-який репозиторій' }, ' — один бінарник Go, без облікового запису Kiro'],
    },
    {
      cap: 'Ліцензія',
      them: [
        { a: 'Ліцензія Kiro', href: 'https://kiro.dev/license/', kind: 'them' },
        ' каже, що IDE і CLI є матеріалами AWS (AWS Content) за клієнтською угодою AWS (AWS Customer Agreement). Kiro Crew — окремий ',
        { a: 'публічний репозиторій', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
        '.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' формат · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
    {
      cap: 'Ціна',
      them: [
        'Безкоштовний рівень і платні плани. Цифри змінюються — див. ',
        { a: 'ціни Kiro', href: 'https://kiro.dev/pricing/', kind: 'them' },
        ', прочитані 30 жовтня 2026.',
      ],
      us: [{ s: 'Без плати' }, ' за формат і за CLI'],
    },
  ],
  diffs: [
    {
      title: 'Формат сам падає в CI',
      terminal: true,
      body: [
        'Аналіз Kiro виконується всередині Kiro. Перевірка SpecScore — це команда. ',
        { a: 'Workflow dogfood', href: dogfood, kind: 'us' },
        ' цього репозиторію запускає ',
        { c: 'specscore spec lint' },
        ' на кожному pull request і в main. Зламана специфікація провалює завдання так само, як провалив би зламаний тест. Навичка ',
        { a: '/score', href: score, kind: 'us' },
        ' оцінює формулювання ШІ-рев’юерами; цей прохід ручний, і workflow вище його не запускає.',
      ],
    },
    {
      title: 'Специфікація не прив’язана до однієї IDE',
      body: [
        'Специфікації Kiro — це Markdown, тож їх можна читати без продукту. Workflow, який їх створює і виконує, належить Kiro. Дерево SpecScore — ті самі файли для Claude Code, Cursor, Copilot або взагалі без агента: CLI не викликає модель, щоб лінтити.',
      ],
    },
    {
      title: 'У вимог лишається ідентифікатор',
      body: [
        'Документація Kiro описує простежуваність як проходження вимоги крізь реалізацію. Вона не описує сталий ідентифікатор, який переживе переписування. SpecScore адресує вимогу як ',
        { c: 'REQ: slug' },
        ', а критерій приймання — його власним ідентифікатором.',
      ],
    },
    {
      title: 'EARS і Given/When/Then відповідають на різні питання',
      body: [
        'EARS, як його документує Kiro, — це одне речення про поведінку системи. Критерії приймання SpecScore — сценарії Given/When/Then, прив’язані до ідентифікатора вимоги. Рядок EARS можна написати в прозі й усе одно тримати сценарій у файлі SpecScore, який перевіряє лінтер.',
      ],
    },
  ],
  whenThemTitle: 'Беріть Kiro, коли…',
  whenThem: [
    ['Вам потрібна агентна IDE від AWS, яка за промптом накидає вимоги, дизайн і завдання, а потім виконує завдання.'],
    ['Вам потрібні речення EARS і, в IDE, тести на основі властивостей, породжені з них.'],
    ['Ваша команда вже стандартизує редактор, CLI або вебзастосунок Kiro.'],
  ],
  whenUs: [
    ['Специфікація має лишатися правильною в CI після кінця сесії агента, у репозиторії, якому не потрібен Kiro.'],
    ['Вам потрібні ідентифікатори вимог, статус життєвого циклу і детермінований результат лінта.'],
    ['Ви хочете формат ', { a: 'з відкритим вихідним кодом', href: repo, kind: 'us' }, ', а програму перевірки — одним бінарним файлом.'],
  ],
  bridgeTitle: 'Kiro може накидати. SpecScore може відсікти.',
  bridge: [
    [
      'Ніщо тут не замінює редактор Kiro. Якщо команда пише промпти в Kiro, хай він накидає. Якщо специфікація має пережити сесію як перевірений файл, запишіть цей контракт у SpecScore і дозвольте ',
      { c: 'specscore spec lint' },
      ' провалити pull request, коли ламається структура. Ці два файли можуть лежати в одному репозиторії.',
    ],
    [
      'Оберіть Kiro для сесії. Оберіть SpecScore для артефакту, який завдання CI може відхилити.',
    ],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Документація Kiro — специфікації' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Документація Kiro — специфікації функцій і EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro — про продукт' },
    { href: 'https://kiro.dev/license/', label: 'Kiro — ліцензія' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro — ціни' },
    { href: dogfood, label: 'specscore/specscore — workflow CI dogfood' },
    { href: score, label: 'specstudio-skills — навичка /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
