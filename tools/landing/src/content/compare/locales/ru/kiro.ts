import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Альтернатива Kiro: SpecScore vs спецификации Kiro.',
  metaDescription:
    'SpecScore vs Kiro. Kiro — агентная IDE от AWS, которая пишет требования в EARS. SpecScore — открытый формат спецификации, который CI может линтить. Проверено 30 октября 2026.',
  h1: 'SpecScore vs Kiro',
  hero: [
    { a: 'Разработка по спецификациям', href: '/ru/spec-driven-development/' },
    ' (SDD) означает, что то, что программа должна делать, записывают до того, как ИИ-агент напишет код. ',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ' от Amazon Web Services (AWS) — это агентная среда разработки — редактор, ',
    { a: 'интерфейс командной строки', href: '/ru/cli/' },
    ' (CLI) и веб-приложение, — которая превращает промпт в спецификации Kiro: требования, дизайн и задачи. Эти требования используют ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    ' (простой подход к синтаксису требований), предложения вида «WHEN что-то происходит, THE SYSTEM SHALL что-то сделать». ',
    { a: 'SpecScore', href: '/ru/' },
    ' — это формат ',
    { a: 'с открытым исходным кодом', href: repo, kind: 'us' },
    ' для самой спецификации плюс CLI, который проверяет файлы. ',
    { a: 'Непрерывная интеграция', href: '/ru/validators/' },
    ' (CI) — автоматическая проверка каждого предлагаемого изменения — может отклонить спецификацию SpecScore, которая нарушает формат.',
  ],
  shared: [
    ['Оба считают написанную спецификацию тем, из чего агент должен строить, а не стенограммой чата.'],
    ['Оба хранят эту спецификацию как Markdown в проекте, чтобы её можно было рецензировать как код.'],
    ['Оба делят работу на требования, дизайн и задачи. Kiro порождает эти три файла. SpecScore — формат, который команда может сохранить после окончания сессии.'],
  ],
  creditTitle: 'Что Kiro делает хорошо.',
  creditNote: [
    'Собственная документация Kiro, прочитанная 30 октября 2026, описывает продукт. Страница спецификации функции была помечена как обновлённая 4 августа 2026.',
  ],
  credits: [
    {
      title: 'Требования в фиксированной форме предложения',
      body: [
        'Спецификации Kiro помещают поведение в ',
        { c: 'requirements.md' },
        ' по одному шаблону EARS: WHEN условие выполняется, THE SYSTEM SHALL сделать что-то. Документация приводит пример формы с неверными данными, а система показывает ошибку проверки рядом с полем. Такую форму легче тестировать, чем расплывчатый абзац.',
      ],
    },
    {
      title: 'Полный путь от промпта к задачам',
      body: [
        'Спецификация функции проходит через требования, дизайн (',
        { c: 'design.md' },
        ') и задачи (',
        { c: 'tasks.md' },
        '). Можно начать с требований или с дизайна. Quick Spec запускает все три без остановки на утверждение между ними. Спецификации Bugfix — отдельный путь. Документация также описывает запуск независимых задач параллельно, волнами, по графу зависимостей в ',
        { c: 'tasks.md' },
        '.',
      ],
    },
    {
      title: 'Проверки внутри продукта',
      body: [
        'Analyze Requirements, доступный в IDE и в CLI, ищет несогласованности, неоднозначность, конфликтующие ограничения и пробелы до дизайна. Correctness — тесты на основе свойств, выведенные из этих строк EARS, — указан только для IDE, не для CLI, web или mobile, в таблице возможностей спецификаций.',
      ],
    },
  ],
  tableNote: 'Kiro — продукт, который набрасывает спецификации. SpecScore — формат, который репозиторий может проверить. Таблица сравнивает эти роли.',
  tableLabel: 'Сравнение возможностей SpecScore и Kiro',
  rows: [
    {
      cap: 'Основная роль',
      them: ['Агентная IDE, CLI и веб-приложение, которые набрасывают спецификации и выполняют задачи'],
      us: [{ s: 'Открытый формат спецификаций + CLI' }],
    },
    {
      cap: 'Файлы спецификации',
      them: [{ c: 'requirements.md' }, ' (или ', { c: 'bugfix.md' }, '), ', { c: 'design.md' }, ', ', { c: 'tasks.md' }],
      us: [{ s: 'Дерево spec/' }, ' из Markdown + YAML'],
    },
    {
      cap: 'Синтаксис требований',
      them: ['Шаблон EARS: WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: 'Идентификаторы требований' },
        ' (',
        { c: 'REQ: slug' },
        ') и критерии приёмки ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Проверка спецификации',
      them: ['Analyze Requirements в IDE и CLI. Тесты на основе свойств в IDE. Не описано как линтер формата для вашей собственной CI.'],
      us: [
        { s: 'specscore spec lint' },
        ' в CI. ',
        { c: '/score' },
        ' — отдельная ручная оценка ИИ.',
      ],
    },
    {
      cap: 'Где выполняется',
      them: ['Kiro IDE, Kiro CLI, Kiro web. Часть проверок только в IDE.'],
      us: [{ s: 'Любой репозиторий' }, ' — один бинарник Go, без аккаунта Kiro'],
    },
    {
      cap: 'Лицензия',
      them: [
        { a: 'Лицензия Kiro', href: 'https://kiro.dev/license/', kind: 'them' },
        ' говорит, что IDE и CLI являются материалами AWS (AWS Content) по клиентскому соглашению AWS (AWS Customer Agreement). Kiro Crew — отдельный ',
        { a: 'публичный репозиторий', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
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
      cap: 'Цена',
      them: [
        'Бесплатный уровень и платные планы. Цифры меняются — см. ',
        { a: 'цены Kiro', href: 'https://kiro.dev/pricing/', kind: 'them' },
        ', прочитанные 30 октября 2026.',
      ],
      us: [{ s: 'Без платы' }, ' за формат и за CLI'],
    },
  ],
  diffs: [
    {
      title: 'Формат сам падает в CI',
      terminal: true,
      body: [
        'Анализ Kiro выполняется внутри Kiro. Проверка SpecScore — это команда. ',
        { a: 'Workflow dogfood', href: dogfood, kind: 'us' },
        ' этого репозитория запускает ',
        { c: 'specscore spec lint' },
        ' на каждом pull request и в main. Сломанная спецификация проваливает задачу так же, как провалил бы сломанный тест. Навык ',
        { a: '/score', href: score, kind: 'us' },
        ' оценивает формулировки ИИ-ревьюерами; этот проход ручной, и workflow выше его не запускает.',
      ],
    },
    {
      title: 'Спецификация не привязана к одной IDE',
      body: [
        'Спецификации Kiro — это Markdown, поэтому их можно читать без продукта. Workflow, который их создаёт и исполняет, принадлежит Kiro. Дерево SpecScore — те же файлы для Claude Code, Cursor, Copilot или вовсе без агента: CLI не вызывает модель, чтобы линтить.',
      ],
    },
    {
      title: 'У требований остаётся идентификатор',
      body: [
        'Документация Kiro описывает трассируемость как следование требованию через реализацию. Она не описывает устойчивый идентификатор, который переживёт переписывание. SpecScore адресует требование как ',
        { c: 'REQ: slug' },
        ', а критерий приёмки — его собственным идентификатором.',
      ],
    },
    {
      title: 'EARS и Given/When/Then отвечают на разные вопросы',
      body: [
        'EARS, как его документирует Kiro, — это одно предложение о поведении системы. Критерии приёмки SpecScore — сценарии Given/When/Then, привязанные к идентификатору требования. Строку EARS можно написать в прозе и всё равно держать сценарий в файле SpecScore, который проверяет линтер.',
      ],
    },
  ],
  whenThemTitle: 'Берите Kiro, когда…',
  whenThem: [
    ['Вам нужна агентная IDE от AWS, которая по промпту набрасывает требования, дизайн и задачи, а затем выполняет задачи.'],
    ['Вам нужны предложения EARS и, в IDE, тесты на основе свойств, порождённые из них.'],
    ['Ваша команда уже стандартизирует редактор, CLI или веб-приложение Kiro.'],
  ],
  whenUs: [
    ['Спецификация должна оставаться верной в CI после конца сессии агента, в репозитории, которому не нужен Kiro.'],
    ['Вам нужны идентификаторы требований, статус жизненного цикла и детерминированный результат линта.'],
    ['Вы хотите формат ', { a: 'с открытым исходным кодом', href: repo, kind: 'us' }, ', а проверяющую программу — одним бинарным файлом.'],
  ],
  bridgeTitle: 'Kiro может набросать. SpecScore может отсечь.',
  bridge: [
    [
      'Ничто здесь не заменяет редактор Kiro. Если команда пишет промпты в Kiro, пусть он набрасывает. Если спецификация должна пережить сессию как проверенный файл, запишите этот контракт в SpecScore и позвольте ',
      { c: 'specscore spec lint' },
      ' провалить pull request, когда ломается структура. Эти два файла могут лежать в одном репозитории.',
    ],
    [
      'Выберите Kiro для сессии. Выберите SpecScore для артефакта, который задача CI может отклонить.',
    ],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Документация Kiro — спецификации' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Документация Kiro — спецификации функций и EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro — о продукте' },
    { href: 'https://kiro.dev/license/', label: 'Kiro — лицензия' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro — цены' },
    { href: dogfood, label: 'specscore/specscore — workflow CI dogfood' },
    { href: score, label: 'specstudio-skills — навык /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
