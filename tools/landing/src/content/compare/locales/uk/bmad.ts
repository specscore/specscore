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
  metaTitle: 'Альтернатива методу BMAD: SpecScore проти BMAD.',
  metaDescription:
    'SpecScore vs BMAD Method (проривний метод гнучкої розробки під керуванням ШІ): гнучкий workflow агентів проти формату специфікації, який лінтиться в CI. Перевірено 30 жовтня 2026.',
  h1: 'SpecScore vs BMAD Method',
  hero: [
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    ' (проривний метод гнучкої розробки під керуванням ШІ) — це спосіб ',
    { a: 'з відкритим вихідним кодом', href: bmad, kind: 'them' },
    ' провадити гнучке постачання з ШІ-агентами: прояснити роботу, спланувати її, побудувати й перевірити, записуючи рішення. Документ вимог до продукту (PRD) — прозовий опис того, що будувати і для кого; карта workflow методу створює такий документ, потім архітектуру й історії. ',
    { a: 'Розробка на основі специфікацій', href: '/uk/spec-driven-development/' },
    ' (SDD) — ширша ідея, всередині якої перебувають обидва: поведінку задають до коду. ',
    { a: 'SpecScore', href: '/uk/' },
    ' — це формат ',
    { a: 'з відкритим вихідним кодом', href: repo, kind: 'us' },
    ' для цієї специфікації плюс ',
    { a: 'інтерфейс командного рядка', href: '/uk/cli/' },
    ' (CLI). ',
    { a: 'Безперервна інтеграція', href: '/uk/validators/' },
    ' (CI) — автоматична перевірка кожної запропонованої зміни — може завершитися невдачею, коли файл SpecScore структурно хибний.',
  ],
  shared: [
    ['Обидва не дозволяють агенту вигадувати продукт, поки він пише код.'],
    ['Обидва зберігають документи планування в репозиторії, у Markdown, поруч із роботою.'],
    ['Обидва очікують, що людина затвердить план, перш ніж реалізація піде своїм ходом.'],
  ],
  creditTitle: 'Що BMAD Method робить добре.',
  creditNote: [
    'README проєкту, прочитаний 30 жовтня 2026, називає v6.12 стабільним релізом, а v7 — preview на гілці main. Дата v7 в тому README вже минула. Вважайте назви ліній знімком.',
  ],
  credits: [
    {
      title: 'Метод, який сам обирає масштаб',
      body: [
        'README каже, що невеликі зміни йдуть одразу в збірку, а більша робота отримує планування. ',
        { a: 'Карта workflow на main', href: workflow, kind: 'them' },
        ' розписує фази: PRD (',
        { c: 'PRD.md' },
        '), необов’язкову UX-специфікацію, ',
        { c: 'architecture.md' },
        ' із записами рішень, файли епіків та історій, потім спринт. Це повний гнучкий цикл, а не один промпт.',
      ],
    },
    {
      title: 'Брама до реалізації',
      body: [
        'Та сама карта перелічує ',
        { c: 'bmad-check-implementation-readiness' },
        ', який повертає PASS, CONCERNS або FAIL до реалізації. В агента product-manager у v6 також є крок validate-PRD. Це брами workflow, які запускає агент. Це не окремий лінтер формату, який ви спрямовуєте на довільне дерево Markdown.',
      ],
    },
    {
      title: 'Його справді опубліковано',
      body: [
        'Метод випущено ',
        { a: 'за ліцензією MIT', href: bmadLicense, kind: 'them' },
        ' у публічному репозиторії. Стабільне встановлення з README — ',
        { c: 'npx bmad-method install' },
        ', і воно просить Node.js 20.12 або новіший і Python 3.10 або новіший. Сайт ',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        ' каже, що метод безкоштовний.',
      ],
    },
  ],
  tableNote: 'BMAD — це процес. SpecScore — формат артефакту, на який процес може націлюватися. Таблиця порівнює ці ролі.',
  tableLabel: 'Порівняння можливостей SpecScore і BMAD Method',
  rows: [
    {
      cap: 'Основна роль',
      them: ['Гнучкий метод: агенти, навички і workflow від ідеї до перевіреного коду'],
      us: [{ s: 'Відкритий формат специфікацій + CLI' }],
    },
    {
      cap: 'Артефакти планування',
      them: ['PRD, UX-специфікація, архітектура, епіки та історії, статус спринту — на карті workflow, прочитаній 30 жовтня 2026'],
      us: [{ s: 'Ідеї, фічі, плани, завдання' }, ' у дереві spec/, з ідентифікаторами вимог'],
    },
    {
      cap: 'Перевірка роботи',
      them: ['Брама готовності (PASS / CONCERNS / FAIL) і workflow validate-PRD, які запускає агент'],
      us: [
        { s: 'specscore spec lint' },
        ' у CI, детерміновано. ',
        { c: '/score' },
        ' — ручна оцінка ШІ.',
      ],
    },
    {
      cap: 'Ідентифікатори вимог',
      them: ['Історії та функціональні вимоги всередині PRD і файлів епіків. Це не REQ: slug зі SpecScore.'],
      us: [{ s: 'REQ: slug' }, ' і ідентифікатори критеріїв приймання'],
    },
    {
      cap: 'Середовище виконання',
      them: ['Node.js і Python для встановлювача v6.12, описаного в README'],
      us: [{ s: 'Нічого' }, ' понад один бінарник Go'],
    },
    {
      cap: 'Ліцензія',
      them: [
        { a: 'MIT', href: bmadLicense, kind: 'them' },
        ', ',
        { a: 'bmad-code-org/BMAD-METHOD', href: bmad, kind: 'them' },
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
      title: 'Перевірка — це команда, а не крок методу',
      terminal: true,
      body: [
        'Результат готовності BMAD — рішення всередині його workflow. Результат SpecScore — код завершення процесу. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' запускає ',
        { c: 'specscore spec lint' },
        ' на кожному pull request. ',
        { a: '/score', href: score, kind: 'us' },
        ' оцінює артефакт рев’юерами, налаштованими в репозиторії; викликаєте його ви. CI цього не робить.',
      ],
    },
    {
      title: 'Формат переживає інший метод',
      body: [
        'Документи BMAD сформовані його workflow. Якщо припинити запускати BMAD, Markdown лишиться, але ніщо поза методом не забезпечує форму. Дерево SpecScore — це контракт. Інший workflow — включно з BMAD — може його писати, і лінтер усе одно застосовується.',
      ],
    },
    {
      title: 'Історії та вимоги лишаються зв’язаними ідентифікатором',
      body: [
        'Історії BMAD несуть контекст далі, щоб агент не вирішував продукт наново. SpecScore робить зв’язок механічним: завдання плану цитує ',
        { c: 'REQ: slug' },
        ', а анотації ',
        { c: 'specscore:' },
        ' плюс трейлери коміту ',
        { c: 'Verifies:' },
        ' вказують код назад на критерій.',
      ],
    },
  ],
  whenThemTitle: 'Беріть BMAD Method, коли…',
  whenThem: [
    ['Вам потрібен повний гнучкий цикл — PRD, архітектура, історії, спринт, — який виконують агенти з workflow під конкретні ролі.'],
    ['Вам потрібні брама готовності і набір поглядів продукту, архітектури й тестів, який постачає метод.'],
    ['Ви стандартизуєте те, як команда пише промпти, і навички методу — цей стандарт.'],
  ],
  whenUs: [
    ['Специфікація має падати в CI, коли хибні заголовок, посилання або статус, навіть якщо цього дня ніхто не запускає workflow BMAD.'],
    ['Вам потрібні сталі ідентифікатори вимог між інструментами, а не лише всередині файлів історій одного методу.'],
    ['Вам потрібен формат ', { a: 'з відкритим вихідним кодом', href: repo, kind: 'us' }, ', на який може націлитися інший процес.'],
  ],
  bridgeTitle: 'Метод може писати в цьому форматі.',
  bridge: [
    [
      'BMAD відповідає на питання «як ми ведемо роботу». SpecScore відповідає на питання «який файл є контрактом і звідки CI знає, що він цілий». Команда може лишити PRD та історії BMAD для розмови, а фічу SpecScore — для вимог, які мають проходити лінт.',
    ],
    [
      'Використовуйте BMAD Method для циклу. Використовуйте SpecScore для артефакту, який перевіряє pull request.',
    ],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD — ліцензія MIT' },
    { href: workflow, label: 'Карта workflow BMAD (main, прочитана 30 жовтня 2026)' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore — workflow CI dogfood' },
    { href: score, label: 'specstudio-skills — навичка /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
