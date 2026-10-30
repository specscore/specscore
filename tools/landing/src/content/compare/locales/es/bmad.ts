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
  metaTitle: 'Alternativa al BMAD Method: SpecScore frente a BMAD.',
  metaDescription:
    'SpecScore frente al BMAD Method (Breakthrough Method for Agile AI-Driven Development): un flujo ágil de agentes, frente a un formato de especificación linteado en CI. Comprobado el 30 de octubre de 2026.',
  h1: 'SpecScore vs el BMAD Method',
  hero: [
    'El ',
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    ' (Breakthrough Method for Agile AI-Driven Development) es una manera ',
    { a: 'de código abierto', href: bmad, kind: 'them' },
    ' de ejecutar la entrega ágil con agentes de IA: aclarar el trabajo, planificarlo, construirlo y comprobarlo, con las decisiones escritas. Un documento de requisitos de producto (PRD) es la descripción en prosa de qué construir y para quién; el mapa de flujo del método produce uno, y después la arquitectura y las historias. El ',
    { a: 'desarrollo basado en especificaciones', href: '/es/spec-driven-development/' },
    ' (SDD) es la idea más amplia en la que ambos se sitúan: el comportamiento se especifica antes del código. ',
    { a: 'SpecScore', href: '/es/' },
    ' es un formato ',
    { a: 'de código abierto', href: repo, kind: 'us' },
    ' para esa especificación, más una ',
    { a: 'interfaz de línea de comandos', href: '/es/cli/' },
    ' (CLI). La ',
    { a: 'integración continua', href: '/es/validators/' },
    ' (CI) — una comprobación automática de cada cambio propuesto — puede fallar cuando un archivo SpecScore es estructuralmente incorrecto.',
  ],
  shared: [
    ['Ambos se niegan a dejar que un agente invente el producto mientras escribe el código.'],
    ['Ambos guardan los documentos de planificación en el repositorio, en Markdown, junto al trabajo.'],
    ['Ambos esperan que una persona apruebe el plan antes de que la implementación se desboque.'],
  ],
  creditTitle: 'Lo que el BMAD Method hace bien.',
  creditNote: [
    'El README del proyecto, leído el 30 de octubre de 2026, llama a v6.12 la versión estable y a v7 una vista previa en la rama main. La fecha de v7 en ese README ya había pasado. Trata los nombres de línea como una foto fija.',
  ],
  credits: [
    {
      title: 'Un método que se dimensiona solo',
      body: [
        'El README dice que los cambios pequeños van directos a la construcción, y que el trabajo mayor recibe planificación. El ',
        { a: 'mapa de flujo en main', href: workflow, kind: 'them' },
        ' detalla las fases: un PRD (',
        { c: 'PRD.md' },
        '), una especificación de UX opcional, ',
        { c: 'architecture.md' },
        ' con registros de decisiones, archivos de épicas e historias, y después un sprint. Es un ciclo ágil completo, no un solo prompt.',
      ],
    },
    {
      title: 'Una compuerta antes de la implementación',
      body: [
        'El mismo mapa enumera ',
        { c: 'bmad-check-implementation-readiness' },
        ', que devuelve PASS, CONCERNS o FAIL antes de la implementación. El agente product-manager de v6 también tiene un paso validate-PRD. Son compuertas del flujo que ejecuta el agente. No son un linter de formato aparte al que apuntas un árbol Markdown cualquiera.',
      ],
    },
    {
      title: 'Está publicado de verdad',
      body: [
        'El método tiene ',
        { a: 'licencia MIT', href: bmadLicense, kind: 'them' },
        ' en un repositorio público. La instalación estable del README es ',
        { c: 'npx bmad-method install' },
        ', y pide Node.js 20.12 o más reciente y Python 3.10 o más reciente. El sitio ',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        ' dice que el método es gratuito.',
      ],
    },
  ],
  tableNote: 'BMAD es el proceso. SpecScore es el formato de artefacto al que un proceso puede apuntar. La tabla compara esos roles.',
  tableLabel: 'Comparación de funcionalidades SpecScore vs BMAD Method',
  rows: [
    {
      cap: 'Rol principal',
      them: ['Método ágil: agentes, skills y flujos de trabajo, de la idea al código verificado'],
      us: [{ s: 'Formato de especificación abierto + CLI' }],
    },
    {
      cap: 'Artefactos de planificación',
      them: ['PRD, especificación de UX, arquitectura, épicas e historias, estado del sprint — en el mapa de flujo leído el 30 de octubre de 2026'],
      us: [{ s: 'Ideas, funcionalidades, planes y tareas' }, ' en un árbol spec/, con ids de requisitos'],
    },
    {
      cap: 'Comprobar el trabajo',
      them: ['Compuerta de preparación (PASS / CONCERNS / FAIL) y un flujo validate-PRD, ejecutados por el agente'],
      us: [
        { s: 'specscore spec lint' },
        ' en CI, determinista. ',
        { c: '/score' },
        ' es una calificación de IA manual.',
      ],
    },
    {
      cap: 'Ids de requisitos',
      them: ['Historias y requisitos funcionales dentro del PRD y de los archivos de épicas. No es el REQ: slug de SpecScore.'],
      us: [{ s: 'REQ: slug' }, ' e ids de criterios de aceptación'],
    },
    {
      cap: 'Entorno de ejecución',
      them: ['Node.js y Python para el instalador v6.12 descrito en el README'],
      us: [{ s: 'Ninguno' }, ' más allá de un solo binario Go'],
    },
    {
      cap: 'Licencia',
      them: [
        { a: 'MIT', href: bmadLicense, kind: 'them' },
        ', ',
        { a: 'bmad-code-org/BMAD-METHOD', href: bmad, kind: 'them' },
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
      title: 'La comprobación es un comando, no un paso del método',
      terminal: true,
      body: [
        'El resultado de preparación de BMAD es una decisión dentro de su flujo. El resultado de SpecScore es un código de salida del proceso. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' ejecuta ',
        { c: 'specscore spec lint' },
        ' en cada pull request. ',
        { a: '/score', href: score, kind: 'us' },
        ' califica un artefacto con los revisores configurados en el repositorio; lo invocas tú. La CI no.',
      ],
    },
    {
      title: 'El formato sobrevive a otro método',
      body: [
        'Los documentos de BMAD los moldean sus flujos. Si dejas de ejecutar BMAD, sigues teniendo el Markdown, pero nada fuera del método impone la forma. Un árbol SpecScore es el contrato. Otro flujo — incluido BMAD — puede escribirlo, y el linter sigue aplicándose.',
      ],
    },
    {
      title: 'Historias y requisitos siguen enlazados por id',
      body: [
        'Las historias de BMAD arrastran el contexto para que el agente no vuelva a decidir el producto. SpecScore hace el enlace mecánico: una tarea del plan cita ',
        { c: 'REQ: slug' },
        ', y las anotaciones ',
        { c: 'specscore:' },
        ' más los tráilers de commit ',
        { c: 'Verifies:' },
        ' devuelven el código al criterio.',
      ],
    },
  ],
  whenThemTitle: 'Elige el BMAD Method cuando…',
  whenThem: [
    ['Quieres un ciclo ágil completo — PRD, arquitectura, historias, sprint — ejecutado por agentes con flujos según el rol.'],
    ['Quieres la compuerta de preparación y el grupo de perspectivas de producto, arquitectura y pruebas que trae el método.'],
    ['Estás estandarizando cómo hace prompts un equipo, y las skills del método son el estándar.'],
  ],
  whenUs: [
    ['La especificación tiene que fallar en CI cuando un encabezado, un enlace o un estado es incorrecto, aunque ese día nadie ejecute el flujo de BMAD.'],
    ['Necesitas ids de requisitos estables entre herramientas, no solo dentro de los archivos de historias de un método.'],
    ['Quieres un formato ', { a: 'de código abierto', href: repo, kind: 'us' }, ' al que pueda apuntar otro proceso.'],
  ],
  bridgeTitle: 'El método puede escribir el formato.',
  bridge: [
    [
      'BMAD responde a «cómo ejecutamos el trabajo». SpecScore responde a «qué archivo es el contrato, y cómo sabe la CI que está intacto». Un equipo puede conservar el PRD y las historias de BMAD para la conversación, y una funcionalidad SpecScore para los requisitos que deben pasar el lint.',
    ],
    [
      'Usa el BMAD Method para el ciclo. Usa SpecScore para el artefacto que comprueba el pull request.',
    ],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD — licencia MIT' },
    { href: workflow, label: 'Mapa de flujo de BMAD (main, leído el 30 de octubre de 2026)' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore — flujo de CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
