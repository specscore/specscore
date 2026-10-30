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
  metaTitle: 'Альтернатива Task Master AI: SpecScore vs Task Master.',
  metaDescription:
    'SpecScore vs Task Master AI. Task Master разбирает документ требований к продукту на задачи для агентов, пишущих код. SpecScore — формат спецификации, который CI может линтить. Проверено 30 октября 2026.',
  h1: 'SpecScore vs Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    ' (пакет ',
    { c: 'task-master-ai' },
    ', его также называют Taskmaster) — менеджер задач для ИИ-агентов, пишущих код. Документ требований к продукту (PRD) — прозаический документ о том, что строить; README Task Master велит положить его в ',
    { c: '.taskmaster/docs/prd.txt' },
    ' и разобрать на задачи. ',
    { a: 'Разработка по спецификациям', href: '/ru/spec-driven-development/' },
    ' (SDD) — практика задавать поведение до кода. ',
    { a: 'SpecScore', href: '/ru/' },
    ' — это формат ',
    { a: 'с открытым исходным кодом', href: repo, kind: 'us' },
    ' для этой спецификации плюс ',
    { a: 'интерфейс командной строки', href: '/ru/cli/' },
    ' (CLI), который её проверяет. ',
    { a: 'Непрерывная интеграция', href: '/ru/validators/' },
    ' (CI) — автоматическая проверка каждого предлагаемого изменения — запускает эту проверку в этом репозитории. Task Master не публикует формат спецификации, который CI мог бы линтить.',
  ],
  shared: [
    ['Оба исходят из того, что ИИ-агент не должен выдумывать всю работу из промпта в одну строку.'],
    ['Оба хранят своё состояние в репозитории, чтобы следующая сессия могла его увидеть.'],
    ['Оба могут сказать агенту, что делать дальше, вместо того чтобы заново читать весь проект.'],
  ],
  creditTitle: 'Что Task Master AI делает хорошо.',
  creditNote: [
    'Факты ниже взяты из README проекта и оглавления документации, прочитанных 30 октября 2026. Числа инструментов и списки моделей в том README часто меняются, поэтому здесь не повторяются.',
  ],
  credits: [
    {
      title: 'PRD становится списком задач',
      body: [
        'Путь из README конкретен: ',
        { c: 'task-master parse-prd' },
        ' читает PRD и порождает задачи. ',
        { c: 'task-master next' },
        ' указывает на следующую задачу. ',
        { c: 'task-master expand' },
        ' дробит задачу. Теги переносят работу между потоками. Это полезный слой, когда вы уже знаете, что строите.',
      ],
    },
    {
      title: 'Он появляется внутри редактора',
      body: [
        'Рекомендуемая установка — сервер Model Context Protocol (MCP), небольшая программа, которую вызывает редактор, через ',
        { c: 'npx -y task-master-ai' },
        ', включая установку в один шаг для Cursor и строку ',
        { c: 'claude mcp add' },
        ' для Claude Code. Затем агент разбирает, перечисляет и обновляет задачи без отдельной панели.',
      ],
    },
    {
      title: 'Исследование с проектом в контексте',
      body: [
        { c: 'task-master research' },
        ' описан как способ спросить модель о библиотеке или миграции, используя текущий проект как контекст. Поддерживается несколько поставщиков моделей. README говорит, что команды, которые вызывают модель, нуждаются в ключе API, если вы не используете пути Claude Code или Codex CLI, которые он перечисляет.',
      ],
    },
  ],
  tableNote: 'Task Master управляет задачами. SpecScore — спецификация, на которую эти задачи могут ссылаться. Таблица сравнивает эти роли.',
  tableLabel: 'Сравнение возможностей SpecScore и Task Master AI',
  rows: [
    {
      cap: 'Основная роль',
      them: ['Список задач для ИИ-агентов, пишущих код, разобранный из PRD'],
      us: [{ s: 'Открытый формат спецификаций + CLI' }],
    },
    {
      cap: 'Вход',
      them: ['Прозаический PRD, описанный в .taskmaster/docs/prd.txt'],
      us: [{ s: 'Структурированные Markdown + YAML' }, ' с обязательными разделами'],
    },
    {
      cap: 'Что вы получаете',
      them: ['Задачи, зависимости, теги и указатель «следующей задачи»'],
      us: [{ s: 'Требования, критерии приёмки, планы и задачи' }, ', которые цитируют идентификаторы требований'],
    },
    {
      cap: 'Проверка спецификации',
      them: ['Нет задокументированного линтера для PRD. Модель разбирает свободный текст.'],
      us: [
        { s: 'specscore spec lint' },
        ' в CI. ',
        { c: '/score' },
        ' — ручная оценка ИИ формулировок.',
      ],
    },
    {
      cap: 'Среда выполнения',
      them: ['Node.js, обычно через сервер MCP. Вызовы модели нуждаются в ключе поставщика или в локальных Claude Code / Codex CLI, по README.'],
      us: [{ s: 'Один бинарник Go' }, '. Линт не вызывает модель.'],
    },
    {
      cap: 'Лицензия',
      them: [
        { a: 'Публичный репозиторий', href: tm, kind: 'them' },
        ' выпущен под ',
        { a: 'MIT плюс Commons Clause', href: tmLicense, kind: 'them' },
        '. README говорит, что его можно использовать и изменять, и нельзя продавать сам Task Master или предлагать его как размещённый сервис.',
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
      title: 'PRD — не спецификация, которую можно линтить',
      terminal: true,
      body: [
        'Качество Task Master зависит от того, насколько подробен PRD — README так и говорит. Ничто в том README не проверяет структуру PRD до того, как модель его разберёт. SpecScore отказывает фиче, у которой нет обязательного раздела. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' запускает ',
        { c: 'specscore spec lint' },
        ' на каждом pull request. Навык ',
        { a: '/score', href: score, kind: 'us' },
        ' — второй, ручной проход по формулировкам. Это не команда CI.',
      ],
    },
    {
      title: 'Задачи могут цитировать требование',
      body: [
        'Task Master даёт задачам числовые идентификаторы и зависимости. SpecScore даёт требованиям устойчивые идентификаторы (',
        { c: 'REQ: slug' },
        '). Задача плана может назвать критерий, который она выполняет, а трейлер коммита может назвать его ещё раз. Список задач и спецификация перестают быть двумя несвязанными документами.',
      ],
    },
    {
      title: 'Линту не нужен ключ API',
      body: [
        'Разбор PRD в Task Master вызывает модель. Проверка дерева SpecScore — нет. CLI — бинарник Go из ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ', поэтому CI может запустить его без аккаунта поставщика.',
      ],
    },
  ],
  whenThemTitle: 'Берите Task Master AI, когда…',
  whenThem: [
    ['У вас уже есть PRD, и вы хотите, чтобы агент разбил его на упорядоченные задачи внутри Cursor, Claude Code или другого клиента MCP.'],
    ['Вам нужны next-task, expand, теги и исследование как команды редактора.'],
    ['То, чем вы управляете, — доска задач, а не переиспользуемый формат спецификации.'],
  ],
  whenUs: [
    ['Сами требования должны быть структурированы, опознаваемы и отклоняться CI, когда они ломают формат.'],
    ['Вы не хотите вызова модели на пути, который решает, правильно ли оформлена спецификация.'],
    ['Вы хотите формат ', { a: 'с открытым исходным кодом', href: repo, kind: 'us' }, ' под CC BY 4.0, с CLI под Apache-2.0.'],
  ],
  bridgeTitle: 'Разбирайте задачи из спецификации, которая уже проходит линт.',
  bridge: [
    [
      'Task Master — сильная доска задач. Это не язык спецификаций. Запишите поведение в SpecScore, пусть CI его линтит, и направьте список задач на идентификаторы ',
      { c: 'REQ: slug' },
      '. Если вам всё ещё нужны инструменты редактора Task Master, передайте ему PRD, порождённый из спецификации, которая уже прошла ',
      { c: 'specscore spec lint' },
      '.',
    ],
    [
      'Используйте Task Master AI, чтобы выстраивать порядок работы. Используйте SpecScore, чтобы у работы был контракт.',
    ],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master — MIT плюс Commons Clause' },
    { href: tmDocs, label: 'Документация Task Master (tryhamster.com)' },
    { href: dogfood, label: 'specscore/specscore — workflow CI dogfood' },
    { href: score, label: 'specstudio-skills — навык /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
