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
  metaTitle: 'Альтернатива BMAD Method: SpecScore vs BMAD.',
  metaDescription:
    'SpecScore vs BMAD Method (прорывной метод гибкой разработки под управлением ИИ): гибкий workflow агентов против формата спецификации, который линтится в CI. Проверено 30 октября 2026.',
  h1: 'SpecScore vs BMAD Method',
  hero: [
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    ' (прорывной метод гибкой разработки под управлением ИИ) — это способ ',
    { a: 'с открытым исходным кодом', href: bmad, kind: 'them' },
    ' вести гибкую поставку с ИИ-агентами: прояснить работу, спланировать её, сделать и проверить, записывая решения. Документ требований к продукту (PRD) — прозаическое описание того, что строить и для кого; карта workflow метода создаёт такой документ, затем архитектуру и истории. ',
    { a: 'Разработка по спецификациям', href: '/ru/spec-driven-development/' },
    ' (SDD) — более широкая идея, внутри которой находятся оба: поведение задают до кода. ',
    { a: 'SpecScore', href: '/ru/' },
    ' — это формат ',
    { a: 'с открытым исходным кодом', href: repo, kind: 'us' },
    ' для этой спецификации плюс ',
    { a: 'интерфейс командной строки', href: '/ru/cli/' },
    ' (CLI). ',
    { a: 'Непрерывная интеграция', href: '/ru/validators/' },
    ' (CI) — автоматическая проверка каждого предлагаемого изменения — может завершиться неудачей, когда файл SpecScore структурно неверен.',
  ],
  shared: [
    ['Оба не позволяют агенту выдумывать продукт, пока он пишет код.'],
    ['Оба хранят документы планирования в репозитории, в Markdown, рядом с работой.'],
    ['Оба ожидают, что человек утвердит план, прежде чем реализация пойдёт своим ходом.'],
  ],
  creditTitle: 'Что BMAD Method делает хорошо.',
  creditNote: [
    'README проекта, прочитанный 30 октября 2026, называет v6.12 стабильным релизом, а v7 — preview на ветке main. Дата v7 в том README уже прошла. Считайте названия линий снимком.',
  ],
  credits: [
    {
      title: 'Метод, который сам выбирает масштаб',
      body: [
        'README говорит, что небольшие изменения идут сразу в сборку, а более крупная работа получает планирование. ',
        { a: 'Карта workflow на main', href: workflow, kind: 'them' },
        ' расписывает фазы: PRD (',
        { c: 'PRD.md' },
        '), необязательную UX-спецификацию, ',
        { c: 'architecture.md' },
        ' с записями решений, файлы эпиков и историй, затем спринт. Это полный гибкий цикл, а не один промпт.',
      ],
    },
    {
      title: 'Ворота до реализации',
      body: [
        'Та же карта перечисляет ',
        { c: 'bmad-check-implementation-readiness' },
        ', который возвращает PASS, CONCERNS или FAIL до реализации. У агента product-manager в v6 также есть шаг validate-PRD. Это ворота workflow, которые запускает агент. Это не отдельный линтер формата, который вы направляете на произвольное дерево Markdown.',
      ],
    },
    {
      title: 'Он действительно опубликован',
      body: [
        'Метод выпущен ',
        { a: 'под лицензией MIT', href: bmadLicense, kind: 'them' },
        ' в публичном репозитории. Стабильная установка из README — ',
        { c: 'npx bmad-method install' },
        ', и она просит Node.js 20.12 или новее и Python 3.10 или новее. Сайт ',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        ' говорит, что метод бесплатный.',
      ],
    },
  ],
  tableNote: 'BMAD — это процесс. SpecScore — формат артефакта, на который процесс может нацеливаться. Таблица сравнивает эти роли.',
  tableLabel: 'Сравнение возможностей SpecScore и BMAD Method',
  rows: [
    {
      cap: 'Основная роль',
      them: ['Гибкий метод: агенты, навыки и workflow от идеи до проверенного кода'],
      us: [{ s: 'Открытый формат спецификаций + CLI' }],
    },
    {
      cap: 'Артефакты планирования',
      them: ['PRD, UX-спецификация, архитектура, эпики и истории, статус спринта — на карте workflow, прочитанной 30 октября 2026'],
      us: [{ s: 'Идеи, фичи, планы, задачи' }, ' в дереве spec/, с идентификаторами требований'],
    },
    {
      cap: 'Проверка работы',
      them: ['Ворота готовности (PASS / CONCERNS / FAIL) и workflow validate-PRD, которые запускает агент'],
      us: [
        { s: 'specscore spec lint' },
        ' в CI, детерминированно. ',
        { c: '/score' },
        ' — ручная оценка ИИ.',
      ],
    },
    {
      cap: 'Идентификаторы требований',
      them: ['Истории и функциональные требования внутри PRD и файлов эпиков. Это не REQ: slug из SpecScore.'],
      us: [{ s: 'REQ: slug' }, ' и идентификаторы критериев приёмки'],
    },
    {
      cap: 'Среда выполнения',
      them: ['Node.js и Python для установщика v6.12, описанного в README'],
      us: [{ s: 'Ничего' }, ' сверх одного бинарника Go'],
    },
    {
      cap: 'Лицензия',
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
      title: 'Проверка — это команда, а не шаг метода',
      terminal: true,
      body: [
        'Результат готовности BMAD — решение внутри его workflow. Результат SpecScore — код завершения процесса. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' запускает ',
        { c: 'specscore spec lint' },
        ' на каждом pull request. ',
        { a: '/score', href: score, kind: 'us' },
        ' оценивает артефакт ревьюерами, настроенными в репозитории; вызываете его вы. CI этого не делает.',
      ],
    },
    {
      title: 'Формат переживает другой метод',
      body: [
        'Документы BMAD сформированы его workflow. Если перестать запускать BMAD, Markdown останется, но ничто вне метода не обеспечивает форму. Дерево SpecScore — это контракт. Другой workflow — включая BMAD — может его писать, и линтер всё равно применяется.',
      ],
    },
    {
      title: 'Истории и требования остаются связаны идентификатором',
      body: [
        'Истории BMAD несут контекст дальше, чтобы агент не решал продукт заново. SpecScore делает связь механической: задача плана цитирует ',
        { c: 'REQ: slug' },
        ', а аннотации ',
        { c: 'specscore:' },
        ' плюс трейлеры коммита ',
        { c: 'Verifies:' },
        ' указывают код обратно на критерий.',
      ],
    },
  ],
  whenThemTitle: 'Берите BMAD Method, когда…',
  whenThem: [
    ['Вам нужен полный гибкий цикл — PRD, архитектура, истории, спринт, — который исполняют агенты с workflow под конкретные роли.'],
    ['Вам нужны ворота готовности и набор взглядов продукта, архитектуры и тестов, который поставляет метод.'],
    ['Вы стандартизируете то, как команда пишет промпты, и навыки метода — этот стандарт.'],
  ],
  whenUs: [
    ['Спецификация должна падать в CI, когда неверны заголовок, ссылка или статус, даже если в этот день никто не запускает workflow BMAD.'],
    ['Вам нужны устойчивые идентификаторы требований между инструментами, а не только внутри файлов историй одного метода.'],
    ['Вам нужен формат ', { a: 'с открытым исходным кодом', href: repo, kind: 'us' }, ', на который может нацелиться другой процесс.'],
  ],
  bridgeTitle: 'Метод может писать в этом формате.',
  bridge: [
    [
      'BMAD отвечает на вопрос «как мы ведём работу». SpecScore отвечает на вопрос «какой файл является контрактом и откуда CI знает, что он цел». Команда может оставить PRD и истории BMAD для разговора, а фичу SpecScore — для требований, которые обязаны проходить линт.',
    ],
    [
      'Используйте BMAD Method для цикла. Используйте SpecScore для артефакта, который проверяет pull request.',
    ],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD — лицензия MIT' },
    { href: workflow, label: 'Карта workflow BMAD (main, прочитана 30 октября 2026)' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore — workflow CI dogfood' },
    { href: score, label: 'specstudio-skills — навык /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
