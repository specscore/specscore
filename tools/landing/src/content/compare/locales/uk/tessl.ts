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
  metaTitle: 'Альтернатива Tessl: SpecScore vs специфікація як джерело.',
  metaDescription:
    'SpecScore vs Tessl. Tessl — платформа навичок для агентів; його tile й есей 2025 року вважають специфікацію джерелом. SpecScore лінтить портативний формат у CI. Перевірено 30 жовтня 2026.',
  h1: 'SpecScore vs Tessl',
  hero: [
    { a: 'Розробка на основі специфікацій', href: '/uk/spec-driven-development/' },
    ' (SDD) означає, що специфікацію задуманої поведінки написано до коду. ',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    ' (Tessl AI Ltd) станом на 30 жовтня 2026 — платформа оснащення агентів: реєстр і контур керування для навичок, правил і плагінів, які завантажують агенти для коду. «Специфікація як джерело» — сильніше твердження в ',
    { a: 'есеї Tessl від червня 2025', href: essay, kind: 'them' },
    ': специфікація — довговічний артефакт, а код виводиться з неї. ',
    { a: 'SpecScore', href: '/uk/' },
    ' — це формат файлу ',
    { a: 'з відкритим вихідним кодом', href: repo, kind: 'us' },
    ' для цієї специфікації, який перевіряє ',
    { a: 'інтерфейс командного рядка', href: '/uk/cli/' },
    ' (CLI). ',
    { a: 'Безперервна інтеграція', href: '/uk/validators/' },
    ' (CI) — автоматична перевірка кожної запропонованої зміни — запускає цю перевірку в цьому репозиторії.',
  ],
  shared: [
    ['Обидва кажуть, що промпт — слабке місце для зберігання наміру. Написана специфікація має пережити чат.'],
    ['Обидва очікують, що ШІ-агент для коду прочитає специфікацію, перш ніж правити код.'],
    ['Обидва можуть прикріпити тести до вимог, тож «готово» — це те, на що можна вказати.'],
  ],
  creditTitle: 'Що Tessl робить добре.',
  creditNote: [
    'Дві різні поверхні Tessl легко сплутати. Нотатки нижче тримають їх окремо, за сторінками, прочитаними 30 жовтня 2026.',
  ],
  credits: [
    {
      title: 'Ясний довід на користь специфікації як джерела',
      body: [
        'Есей Simon Maple від 27 червня 2025 каже, що документ вимог до продукту (PRD) — проза для людей про те, що будувати, — зазвичай застаріває, а код стає єдиним джерелом істини. Альтернатива есею в тому, що змінюють специфікацію, а LLM породжує з неї код, тести й документацію. Це справжня позиція, а не гасло.',
      ],
    },
    {
      title: 'Платформа контексту для агента',
      body: [
        { a: 'Документація Tessl', href: 'https://docs.tessl.io/', kind: 'them' },
        ' описує реєстр, керування, яке сканує й оцінює навички, оцінювання і спостережуваність між агентами. Документація каже, що навички — звичайні артефакти у вашому репозиторії і що платформа працює з Claude Code, Cursor, Copilot, Gemini та іншими. Оцінювання там означає оцінювання навички, а не оцінювання специфікації продукту.',
      ],
    },
    {
      title: 'Офіційний tile розробки на основі специфікацій із перевірками в shell',
      body: [
        'Tile ',
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ' за ліцензією MIT у ',
        { a: 'публічному репозиторії tile', href: tile, kind: 'them' },
        ' вчить агента провести інтерв’ю, написати файли ',
        { c: '.spec.md' },
        ', дочекатися схвалення, потім реалізувати. Сторінка реєстру перелічує ',
        { c: 'scripts/validate-specs.sh' },
        ' і ',
        { c: 'scripts/check-spec-links.sh' },
        ' для frontmatter, ',
        { c: 'targets' },
        ' і посилань ',
        { c: '[@test]' },
        '. Та сама сторінка каже, що tile — це керувальний контекст: жодних особливих команд, жодного фреймворку.',
      ],
    },
  ],
  tableNote: '«Специфікація як джерело» — есей Tessl. Tile — пакет навичок поверх сьогоднішньої платформи. SpecScore — формат із версійованим лінтером.',
  tableLabel: 'Порівняння можливостей SpecScore і Tessl',
  rows: [
    {
      cap: 'Основна роль',
      them: ['Платформа навичок для агентів, плюс tile розробки на основі специфікацій і есей 2025 року про специфікацію як джерело'],
      us: [{ s: 'Відкритий формат специфікацій + CLI' }],
    },
    {
      cap: 'Чим є специфікація',
      them: ['Есей: довговічне джерело, з якого породжують код. Tile: .spec.md, за яким агент реалізує, а код лишається у вас.'],
      us: [{ s: 'Контракт поруч із кодом' }, '. Лінт не перегенеровує код.'],
    },
    {
      cap: 'Форма специфікації',
      them: ['Tile: YAML-frontmatter, glob-шаблони targets і посилання [@test] на файли тестів'],
      us: [
        { s: 'Markdown + YAML' },
        ', ',
        { c: 'REQ: slug' },
        ', ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Перевірка специфікації',
      them: ['Shell-скрипти в комплекті tile, для frontmatter і посилань цього tile'],
      us: [
        { s: 'specscore spec lint' },
        ' за форматом SpecScore, у CI цього репозиторію. ',
        { c: '/score' },
        ' — ручна оцінка ШІ.',
      ],
    },
    {
      cap: 'Ліцензія',
      them: [
        'Tile випущено під ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        '. Платформа — продукт. Документація не публікує вихідний код платформи.',
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
        { a: 'Головна сторінка Tessl', href: 'https://tessl.io/', kind: 'them' },
        ', прочитана 30 жовтня 2026, описує безкоштовний рівень (1000 кредитів на місяць на один робочий простір) і платні корпоративні плани.',
      ],
      us: [{ s: 'Без плати' }, ' за формат і за CLI'],
    },
  ],
  diffs: [
    {
      title: 'Опублікований формат, а не скрипт tile',
      terminal: true,
      body: [
        'Shell-скрипти tile перевіряють файли ',
        { c: '.spec.md' },
        ', які цей tile просив агента написати. SpecScore перевіряє формат, описаний на цьому сайті. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' встановлює закріплений реліз ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' і запускає ',
        { c: 'specscore spec lint' },
        '. ',
        { a: '/score', href: score, kind: 'us' },
        ' — не це завдання: це ручна навичка, яка завершується з ненульовим кодом, коли ШІ-рев’юери повідомляють про проблеми.',
      ],
    },
    {
      title: 'Код лишається у вас в обох випадках — есей іде далі',
      body: [
        'Есей 2025 року каже, що код слід перегенеровувати зі специфікації. Tile на сторінці, прочитаній 30 жовтня 2026, змушує агента реалізовувати за схваленою специфікацією і не описує компілятор, який замінює ваше дерево вихідного коду. SpecScore ніколи не забирає код. Специфікація — перевірений контракт; код лишається вашим.',
      ],
    },
    {
      title: 'Тотожність вимоги',
      body: [
        'Tile вказує вимогу на файли через ',
        { c: 'targets' },
        ' і ',
        { c: '[@test]' },
        '. SpecScore іменує вимогу ',
        { c: 'REQ: slug' },
        ', щоб план, завдання і трейлер коміту могли послатися на неї після того, як файли перемістяться.',
      ],
    },
  ],
  whenThemTitle: 'Беріть Tessl, коли…',
  whenThem: [
    ['Вам потрібні реєстр, оцінювання і керування навичками, спільними для багатьох агентів і репозиторіїв.'],
    ['Вам потрібен хід роботи з есею про специфікацію як джерело у вигляді керувального tile: інтерв’ю, схвалення .spec.md, потім реалізація.'],
    ['Ви вже платите за платформу Tessl або пробуєте її і хочете її tile специфікації в цьому реєстрі.'],
  ],
  whenUs: [
    ['Сам формат специфікації має бути правильним у CI, зокрема в репозиторіях, де Tessl не встановлено.'],
    ['Вам потрібні ідентифікатори вимог і лінтер, який не викликає модель.'],
    ['Вам потрібен формат ', { a: 'з відкритим вихідним кодом', href: repo, kind: 'us' }, ' за ліцензією Creative Commons, окремо від платформи навичок.'],
  ],
  bridgeTitle: 'Специфікація як джерело і специфікація, яку можна лінтити.',
  bridge: [
    [
      'Есей Tessl має рацію в тому, що застарілий PRD програє коду. Перевірка формату — це те, завдяки чому специфікація лишається тим, чому ви довіряєте. SpecScore не породжує ваш застосунок зі специфікації. Він змушує специфікацію падати в CI, коли хибні структура, посилання або статус.',
    ],
    [
      'Використовуйте Tessl, якщо потрібні платформа і tile. Використовуйте SpecScore, якщо артефакт у git — це те, що має довести pull request.',
    ],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Документація Tessl — що таке Tessl?' },
    { href: 'https://tessl.io/', label: 'Головна сторінка Tessl' },
    { href: essay, label: 'Блог Tessl — чому самого коду недостатньо (27 червня 2025)' },
    { href: tilePage, label: 'Реєстр Tessl — tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore — workflow CI dogfood' },
    { href: score, label: 'specstudio-skills — навичка /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
