import { toolOrder, type ToolId } from './roundup/facts.ts';

// The profiles and licence links are supplied by the sourced tools roundup.
// These angles describe why a reader of each product's page might compare it.
export const alternativeSlugs = [
  'spec-kit', 'kiro', 'tessl', 'bmad-method', 'task-master-ai', 'datarim', 'codespeak',
] as const;
export type AlternativeSlug = (typeof alternativeSlugs)[number];

type Angle = {
  intro: string;
  why: string;
  choose: string;
  specscore: string;
  mechanism: string;
};

export const angles: Record<AlternativeSlug, { en: Angle; ru: Angle }> = {
  'spec-kit': {
    en: {
      intro: 'GitHub Spec Kit is a toolkit that guides an AI coding agent through specifying, planning and implementing a feature. Spec-driven development means writing down the intended behavior before code and using that written spec to guide the work. Spec Kit is one way to run that process; these alternatives solve different parts of it.',
      why: 'Spec Kit gives an agent a staged workflow and Markdown artifacts. You may want a different tool if the lasting artifact needs a CI format check, if you work inside a dedicated IDE, or if you organize work by change folders or PRD tasks.',
      choose: 'Choose a workflow first if your team needs consistent agent steps: compare OpenSpec, BMAD and Datarim. Choose Kiro for an integrated authoring environment or Task Master for PRD-to-task planning. Choose SpecScore when the specification itself must pass a repository check.',
      specscore: 'Spec Kit helps an agent produce a spec, plan and tasks. SpecScore gives the resulting specification a defined Markdown and YAML format with CLI checks for structure, references and lifecycle status. Choose SpecScore when that artifact needs to stay reviewable and fail CI on format errors.',
      mechanism: 'Spec Kit leads an agent through Specify, Plan, Tasks and Implement, leaving feature files under specs/',
    },
    ru: {
      intro: 'GitHub Spec Kit — набор команд и шаблонов, который проводит ИИ-агента через описание функции, план и реализацию. Разработка по спецификациям означает: сначала записать ожидаемое поведение, затем опираться на этот текст при написании кода. Spec Kit задаёт один вариант такого процесса; аналоги решают другие задачи.',
      why: 'Spec Kit даёт агенту этапы работы и Markdown-артефакты. Другой инструмент может подойти, если нужен проверяемый в CI формат, отдельная IDE, папки изменений или задачи из готового PRD.',
      choose: 'Если нужен единый процесс для агента, сравните OpenSpec, BMAD и Datarim. Kiro подойдёт для работы в интегрированной среде, Task Master — для задач из PRD. Если сама спецификация должна проходить проверку в репозитории, изучите SpecScore.',
      specscore: 'Spec Kit помогает агенту создать спецификацию, план и задачи. SpecScore задаёт формат спецификации на Markdown и YAML, а CLI проверяет структуру, ссылки и статусы. Выбирайте SpecScore, если этот артефакт нужно сохранять, рецензировать и проверять в CI.',
      mechanism: 'Spec Kit ведёт агента через этапы Specify, Plan, Tasks и Implement, сохраняя файлы функции в specs/',
    },
  },
  kiro: {
    en: {
      intro: 'Kiro is an AWS development environment with an IDE, CLI and web app for drafting requirements, design and tasks. Spec-driven development means describing intended software behavior before coding and using that description to guide implementation. These Kiro alternatives differ in where that work happens and how the files are checked.',
      why: 'Kiro brings spec authoring into its own environment. You may prefer repository-first files, a workflow that works across coding assistants, or a CLI check you can run in CI.',
      choose: 'If the IDE is central to your process, start with Kiro. For change folders and multiple assistants, look at OpenSpec; for staged feature artifacts, Spec Kit. For a portable spec format checked by CI, consider SpecScore.',
      specscore: 'Kiro helps draft requirements, design and tasks inside its product and analyzes requirements there. SpecScore is a repository format plus CLI, so the specification can be linted in CI without relying on an IDE step. Choose it when your team needs a durable spec artifact across editors and agents.',
      mechanism: 'Kiro drafts requirements.md in EARS, design.md and tasks.md in its development environment',
    },
    ru: {
      intro: 'Kiro — среда разработки AWS с IDE, CLI и веб-приложением для создания требований, дизайна и задач. Разработка по спецификациям означает: сначала описать ожидаемое поведение программы, затем по описанию писать код. Аналоги Kiro отличаются местом работы со спецификацией и способом её проверки.',
      why: 'Kiro помогает писать спецификации внутри своей среды. Если файлы должны жить прежде всего в репозитории, работать с разными агентами или проверяться отдельной командой в CI, стоит сравнить другие варианты.',
      choose: 'Если важна интеграция с IDE, начните с Kiro. Для папок изменений и разных ассистентов посмотрите OpenSpec, для этапов работы над функцией — Spec Kit. Для переносимого формата с проверкой в CI — SpecScore.',
      specscore: 'Kiro создаёт требования, дизайн и задачи в своём продукте и анализирует требования там же. SpecScore — формат в репозитории и CLI, которым можно проверить спецификацию в CI. Он подходит, если нужен долговечный артефакт независимо от редактора и агента.',
      mechanism: 'Kiro создаёт requirements.md в синтаксисе EARS, design.md и tasks.md в своей среде разработки',
    },
  },
  tessl: {
    en: {
      intro: 'Tessl is a platform for managing agent skills; its separate spec-driven development tile steers an agent to write .spec.md files. Spec-driven development starts with a written account of intended behavior and uses it to guide code. These alternatives focus on different parts of the skill, spec and validation workflow.',
      why: 'Tessl combines a skill platform with a separate public spec tile. A team may instead need a plain repository format, change management, staged planning, or task generation without adopting that platform.',
      choose: 'Use Tessl when skill distribution and its tile are the main need. Use OpenSpec or Spec Kit for an agent workflow, Task Master for PRD tasks, and SpecScore for a spec format and CI linter.',
      specscore: 'Tessl’s tile gives agents rules for writing .spec.md files and includes validation scripts. SpecScore provides its own open Markdown and YAML format, a CLI for structure and reference checks, and lifecycle status. Choose SpecScore when specification quality is a repository gate across agent tools.',
      mechanism: 'Tessl manages agent skills, while its separate tile writes .spec.md files and ships validation scripts',
    },
    ru: {
      intro: 'Tessl — платформа для навыков ИИ-агентов; её отдельный tile для разработки по спецификациям направляет агента к файлам .spec.md. При таком подходе ожидаемое поведение сначала записывают, а потом используют при написании кода. Аналоги Tessl по-разному решают задачи навыков, спецификаций и проверок.',
      why: 'Tessl сочетает платформу навыков и отдельный публичный tile. Команде может быть нужен лишь формат в репозитории, управление изменениями, поэтапное планирование или задачи из PRD.',
      choose: 'Tessl подходит, когда важны распространение навыков и его tile. Для процесса агента посмотрите OpenSpec или Spec Kit, для задач из PRD — Task Master, для формата спецификации и линтера CI — SpecScore.',
      specscore: 'Tile Tessl задаёт агенту правила для .spec.md и содержит скрипты проверки. SpecScore предлагает собственный открытый формат Markdown и YAML, CLI для проверки структуры и ссылок, а также статусы жизненного цикла. Выбирайте его, если спецификация должна проверяться в репозитории с разными агентами.',
      mechanism: 'Tessl управляет навыками агентов, а отдельный tile создаёт .spec.md и содержит скрипты проверки',
    },
  },
  'bmad-method': {
    en: {
      intro: 'BMAD Method is an agile method for AI-driven development that produces briefs, specifications and architecture. Spec-driven development means recording intended behavior before implementation and using the spec to guide code. These BMAD alternatives range from narrower agent workflows to a checkable spec format.',
      why: 'BMAD covers a broader planning loop and agent roles. If your team needs only a feature workflow, change folder, PRD task breakdown, or a CI check of the specification, a smaller tool may fit.',
      choose: 'Choose BMAD for an end-to-end agent method. Compare Spec Kit or OpenSpec for narrower workflows, Task Master for PRD decomposition, and SpecScore for the lasting specification and CI checks.',
      specscore: 'BMAD helps agents produce planning artifacts and can feed another workflow. SpecScore defines the spec artifact and runs deterministic structure, reference and status checks. Choose SpecScore when a pull request must prove that its specification still passes those checks.',
      mechanism: 'BMAD organizes planning artifacts and agent roles across an agile development loop',
    },
    ru: {
      intro: 'BMAD Method — гибкий метод разработки с ИИ-агентами, который создаёт брифы, спецификации и архитектуру. Разработка по спецификациям означает: описать ожидаемое поведение до реализации и опираться на него при написании кода. Аналоги BMAD предлагают более узкие процессы или проверяемый формат.',
      why: 'BMAD охватывает широкий цикл планирования и роли агентов. Если нужны только этапы работы над функцией, папка изменения, задачи из PRD или проверка спецификации в CI, стоит сравнить более узкие инструменты.',
      choose: 'BMAD подходит для полного агентного метода. Для более узкого процесса сравните Spec Kit и OpenSpec, для разбиения PRD — Task Master, для долговечной спецификации и проверок CI — SpecScore.',
      specscore: 'BMAD помогает агентам создавать артефакты планирования, которые можно перенести в другой процесс. SpecScore задаёт формат спецификации и проверяет структуру, ссылки и статусы. Выбирайте его, если pull request должен подтверждать, что спецификация проходит эти проверки.',
      mechanism: 'BMAD организует артефакты планирования и роли агентов на протяжении гибкого цикла разработки',
    },
  },
  'task-master-ai': {
    en: {
      intro: 'Task Master AI parses a product requirements document (PRD) into tasks for AI coding agents. Spec-driven development means writing intended behavior down before coding and checking work against that text. These alternatives differ in whether the main output is tasks, a spec, or a guided agent workflow.',
      why: 'Task Master treats a PRD as input to task generation. You may need a stronger home and validation for the source specification, or a workflow that starts before the PRD exists.',
      choose: 'Choose Task Master when a PRD already exists and task breakdown is the bottleneck. Choose Spec Kit, OpenSpec or BMAD for earlier planning. Choose SpecScore when the spec must remain a lintable contract after tasks are created.',
      specscore: 'Task Master turns PRD prose into tasks; its README does not describe a PRD format linter. SpecScore keeps requirements and acceptance criteria in a defined format with CLI checks. Choose SpecScore when the source specification must survive task generation and pass CI.',
      mechanism: 'Task Master parses a PRD into generated tasks and dependencies for coding agents',
    },
    ru: {
      intro: 'Task Master AI разбирает документ требований к продукту (PRD) на задачи для ИИ-агентов, которые пишут код. Разработка по спецификациям означает: записать ожидаемое поведение до работы над кодом и сверять с ним результат. Аналоги различаются тем, что становится главным артефактом: задачи, спецификация или процесс агента.',
      why: 'Для Task Master PRD — вход, а задачи — результат. Если нужна долговечная и проверяемая исходная спецификация или процесс до появления PRD, сравните другие инструменты.',
      choose: 'Task Master подходит, когда PRD уже готов и его нужно разбить на задачи. Для раннего планирования посмотрите Spec Kit, OpenSpec или BMAD. Для спецификации, которая остаётся проверяемым контрактом после создания задач, — SpecScore.',
      specscore: 'Task Master превращает PRD в задачи; его README не описывает линтер формата PRD. SpecScore хранит требования и критерии приёмки в заданном формате и проверяет их CLI. Выбирайте его, если исходная спецификация должна сохраняться и проходить CI.',
      mechanism: 'Task Master разбирает PRD на задачи и зависимости для кодирующих агентов',
    },
  },
  datarim: {
    en: {
      intro: 'Datarim is an iterative agent workflow with commands for writing a PRD, maintaining a backlog and checking implementation against requirements. Spec-driven development means writing intended behavior before coding, then using that text to guide and check the result. These alternatives vary in workflow scope and what they validate.',
      why: 'Datarim offers staged commands for several coding assistants and keeps a backlog. A team may instead want a simpler change folder, a dedicated authoring environment, or a spec format with a CI gate.',
      choose: 'Choose Datarim for its staged commands and backlog. Compare OpenSpec for change folders, Spec Kit for feature stages, Kiro for IDE-based drafting, and SpecScore for a specification format with deterministic CI checks.',
      specscore: 'Datarim runs commands such as /dr-compliance when invoked and maintains a PRD and backlog. SpecScore supplies a formal Markdown and YAML spec tree that a CI job can lint for structure, references and status. Choose it when the requirement artifact itself needs a repeatable gate.',
      mechanism: 'Datarim uses staged agent commands, a PRD and backlog.md, with checks invoked in the workflow',
    },
    ru: {
      intro: 'Datarim — итеративный процесс для ИИ-агентов с командами для PRD, бэклога и сверки реализации с требованиями. Разработка по спецификациям означает: сначала записать ожидаемое поведение, затем по нему писать и проверять код. Аналоги отличаются масштабом процесса и тем, что именно они проверяют.',
      why: 'Datarim даёт поэтапные команды для нескольких ассистентов и ведёт бэклог. Команде может быть нужна более простая папка изменения, отдельная среда для написания требований или формат спецификации с проверкой в CI.',
      choose: 'Datarim подходит для поэтапных команд и бэклога. OpenSpec предлагает папки изменений, Spec Kit — этапы функции, Kiro — создание требований в IDE, SpecScore — формат с повторяемыми проверками CI.',
      specscore: 'Datarim запускает команды вроде /dr-compliance по запросу и хранит PRD с бэклогом. SpecScore задаёт дерево спецификаций на Markdown и YAML, которое CI может проверять на структуру, ссылки и статусы. Выбирайте его, когда сам артефакт требований должен проходить проверку.',
      mechanism: 'Datarim использует поэтапные команды агента, PRD и backlog.md, а проверки запускаются в процессе работы',
    },
  },
  codespeak: {
    en: {
      intro: 'CodeSpeak describes an agentic toolkit that captures intent from chats as structured requirements mapped to code. Spec-driven development means recording intended behavior before or during implementation and using that record to guide changes. These CodeSpeak alternatives differ in openness, storage and how requirements are checked.',
      why: 'CodeSpeak’s site describes requirements enforced inside its product and does not publish a source repository for the toolkit. You may prefer specs stored as ordinary repository files, public source, or an agent workflow you control.',
      choose: 'Choose CodeSpeak if capturing intent from agent conversations inside its product is central. For repository files, compare OpenSpec and Spec Kit; for an open lintable specification with code links, choose SpecScore.',
      specscore: 'CodeSpeak aims to capture chat intent and map requirements to code inside its toolkit. SpecScore stores an open Markdown and YAML spec in the repository; CLI checks and source annotations make its structure and code links inspectable. Choose SpecScore when your team wants the spec and its checks to remain under repository control.',
      mechanism: 'CodeSpeak captures chat intent as structured requirements mapped to code inside its product',
    },
    ru: {
      intro: 'CodeSpeak описывает агентный набор, который извлекает намерение из чатов и превращает его в требования, связанные с кодом. Разработка по спецификациям означает: зафиксировать ожидаемое поведение и по нему вести изменения. Аналоги CodeSpeak отличаются открытостью, хранением и способом проверки требований.',
      why: 'Сайт CodeSpeak описывает применение требований внутри продукта и не публикует репозиторий исходного кода набора. Если важны файлы в собственном репозитории, публичный исходный код или контролируемый командой процесс, стоит сравнить альтернативы.',
      choose: 'CodeSpeak подходит, если главное — извлекать намерение из разговоров с агентом внутри продукта. Для файлов в репозитории сравните OpenSpec и Spec Kit; для открытой спецификации с линтером и связями с кодом — SpecScore.',
      specscore: 'CodeSpeak стремится извлекать намерение из чатов и связывать требования с кодом внутри своего набора. SpecScore хранит открытую спецификацию Markdown и YAML в репозитории; CLI и аннотации делают структуру и связи с кодом проверяемыми. Выбирайте SpecScore, если команда хочет контролировать артефакт и проверки в своём репозитории.',
      mechanism: 'CodeSpeak извлекает намерение из чатов в виде структурированных требований, связанных с кодом внутри продукта',
    },
  },
};

export const listedAlternatives = (target: AlternativeSlug): ToolId[] =>
  toolOrder.filter((id): id is ToolId => id !== target && id !== 'plain-markdown').concat('plain-markdown');
