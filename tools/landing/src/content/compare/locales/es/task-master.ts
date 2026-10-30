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
  metaTitle: 'Alternativa a Task Master AI: SpecScore frente a Task Master.',
  metaDescription:
    'SpecScore frente a Task Master AI. Task Master convierte un documento de requisitos de producto en tareas para agentes de programación. SpecScore es el formato de especificación que la CI puede lintear. Comprobado el 30 de octubre de 2026.',
  h1: 'SpecScore vs Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    ' (el paquete ',
    { c: 'task-master-ai' },
    ', también llamado Taskmaster) es un gestor de tareas para agentes de programación con IA. Un documento de requisitos de producto (PRD) es un documento en prosa de qué construir; el README de Task Master dice que lo pongas en ',
    { c: '.taskmaster/docs/prd.txt' },
    ' y lo analices para obtener tareas. El ',
    { a: 'desarrollo basado en especificaciones', href: '/es/spec-driven-development/' },
    ' (SDD) es la práctica de especificar el comportamiento antes del código. ',
    { a: 'SpecScore', href: '/es/' },
    ' es un formato ',
    { a: 'de código abierto', href: repo, kind: 'us' },
    ' para esa especificación, más una ',
    { a: 'interfaz de línea de comandos', href: '/es/cli/' },
    ' (CLI) que la comprueba. La ',
    { a: 'integración continua', href: '/es/validators/' },
    ' (CI) — una comprobación automática de cada cambio propuesto — ejecuta esa comprobación en este repositorio. Task Master no publica un formato de especificación para que la CI lo lintee.',
  ],
  shared: [
    ['Ambos dan por hecho que un agente de IA no debería inventar todo el trabajo a partir de un prompt de una línea.'],
    ['Ambos guardan su estado en el repositorio para que la sesión siguiente pueda verlo.'],
    ['Ambos pueden decirle a un agente qué hacer a continuación, en lugar de releer el proyecto entero.'],
  ],
  creditTitle: 'Lo que Task Master AI hace bien.',
  creditNote: [
    'Los hechos de abajo salen del README del proyecto y del índice de la documentación, leídos el 30 de octubre de 2026. Los recuentos de herramientas y las listas de modelos de ese README cambian a menudo, así que no se repiten aquí.',
  ],
  credits: [
    {
      title: 'Un PRD se convierte en una lista de tareas',
      body: [
        'El camino del README es concreto: ',
        { c: 'task-master parse-prd' },
        ' lee un PRD y genera tareas. ',
        { c: 'task-master next' },
        ' señala la tarea siguiente. ',
        { c: 'task-master expand' },
        ' descompone una tarea. Las etiquetas mueven el trabajo entre flujos. Es una capa útil cuando ya sabes qué estás construyendo.',
      ],
    },
    {
      title: 'Aparece dentro del editor',
      body: [
        'La instalación recomendada es un servidor Model Context Protocol (MCP) — un programa pequeño al que llama el editor — mediante ',
        { c: 'npx -y task-master-ai' },
        ', incluida una instalación de un paso para Cursor y una línea ',
        { c: 'claude mcp add' },
        ' para Claude Code. El agente entonces analiza, lista y actualiza tareas sin un panel aparte.',
      ],
    },
    {
      title: 'Investigación con el proyecto como contexto',
      body: [
        { c: 'task-master research' },
        ' está documentado como una forma de preguntar a un modelo sobre una biblioteca o una migración usando el proyecto actual como contexto. Hay varios proveedores de modelos. El README dice que los comandos que llaman a un modelo necesitan una clave de API, salvo que uses las vías de Claude Code o Codex CLI que enumera.',
      ],
    },
  ],
  tableNote: 'Task Master gestiona tareas. SpecScore es la especificación que esas tareas pueden citar. La tabla compara esos roles.',
  tableLabel: 'Comparación de funcionalidades SpecScore vs Task Master AI',
  rows: [
    {
      cap: 'Rol principal',
      them: ['Lista de tareas para agentes de programación con IA, obtenida al analizar un PRD'],
      us: [{ s: 'Formato de especificación abierto + CLI' }],
    },
    {
      cap: 'Entrada',
      them: ['PRD en prosa, documentado en .taskmaster/docs/prd.txt'],
      us: [{ s: 'Markdown + YAML estructurados' }, ' con secciones obligatorias'],
    },
    {
      cap: 'Qué obtienes',
      them: ['Tareas, dependencias, etiquetas y un puntero a la «tarea siguiente»'],
      us: [{ s: 'Requisitos, criterios de aceptación, planes y tareas' }, ' que citan ids de requisitos'],
    },
    {
      cap: 'Comprobar la especificación',
      them: ['No hay un linter documentado para el PRD. El modelo analiza texto libre.'],
      us: [
        { s: 'specscore spec lint' },
        ' en CI. ',
        { c: '/score' },
        ' es una calificación de IA manual de la redacción.',
      ],
    },
    {
      cap: 'Entorno de ejecución',
      them: ['Node.js, normalmente a través del servidor MCP. Las llamadas al modelo necesitan una clave de proveedor o un Claude Code / Codex CLI local, según el README.'],
      us: [{ s: 'Un solo binario Go' }, '. El lint no llama a un modelo.'],
    },
    {
      cap: 'Licencia',
      them: [
        'El ',
        { a: 'repositorio público', href: tm, kind: 'them' },
        ' es ',
        { a: 'MIT más una Commons Clause', href: tmLicense, kind: 'them' },
        '. El README dice que puedes usarlo y modificarlo, y que no puedes vender Task Master en sí ni ofrecerlo como servicio alojado.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' el formato · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' el CLI',
      ],
    },
  ],
  diffs: [
    {
      title: 'Un PRD no es una especificación que se pueda lintear',
      terminal: true,
      body: [
        'La calidad de Task Master depende de lo detallado que sea el PRD — el README lo dice. Nada en ese README comprueba la estructura del PRD antes de que el modelo lo analice. SpecScore rechaza una funcionalidad a la que le falta una sección obligatoria. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' ejecuta ',
        { c: 'specscore spec lint' },
        ' en cada pull request. La skill ',
        { a: '/score', href: score, kind: 'us' },
        ' es una segunda pasada, manual, sobre la redacción. No es el comando de CI.',
      ],
    },
    {
      title: 'Las tareas pueden citar un requisito',
      body: [
        'Task Master da a las tareas ids numéricos y dependencias. SpecScore da a los requisitos ids estables (',
        { c: 'REQ: slug' },
        '). Una tarea del plan puede nombrar el criterio que satisface, y un tráiler de commit puede nombrarlo otra vez. La lista de tareas y la especificación dejan de ser dos documentos sin relación.',
      ],
    },
    {
      title: 'El lint no necesita una clave de API',
      body: [
        'Analizar un PRD en Task Master llama a un modelo. Comprobar un árbol SpecScore no. El CLI es un binario Go de ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ', así que la CI puede ejecutarlo sin una cuenta de proveedor.',
      ],
    },
  ],
  whenThemTitle: 'Elige Task Master AI cuando…',
  whenThem: [
    ['Ya tienes un PRD y quieres que un agente lo parta en tareas ordenadas dentro de Cursor, Claude Code u otro cliente MCP.'],
    ['Quieres next-task, expand, etiquetas e investigación como comandos del editor.'],
    ['Lo que gestionas es el tablero de tareas, no un formato de especificación reutilizable.'],
  ],
  whenUs: [
    ['Los requisitos en sí tienen que estar estructurados, ser identificables y ser rechazados por la CI cuando rompen el formato.'],
    ['No quieres una llamada a un modelo en el camino que decide si la especificación está bien formada.'],
    ['Quieres el formato ', { a: 'de código abierto', href: repo, kind: 'us' }, ' bajo CC BY 4.0, con un CLI Apache-2.0.'],
  ],
  bridgeTitle: 'Saca las tareas de una especificación que ya pasa el lint.',
  bridge: [
    [
      'Task Master es un tablero de tareas sólido. No es un lenguaje de especificación. Escribe el comportamiento en SpecScore, deja que la CI lo lintee y apunta la lista de tareas a ids ',
      { c: 'REQ: slug' },
      '. Si aun así quieres las herramientas de editor de Task Master, aliméntalo con un PRD generado a partir de una especificación que ya haya pasado ',
      { c: 'specscore spec lint' },
      '.',
    ],
    [
      'Usa Task Master AI para ordenar el trabajo. Usa SpecScore para que el trabajo tenga un contrato.',
    ],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master — MIT más Commons Clause' },
    { href: tmDocs, label: 'Documentación de Task Master (tryhamster.com)' },
    { href: dogfood, label: 'specscore/specscore — flujo de CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
