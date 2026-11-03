import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Alternativa a Kiro: SpecScore frente a las Kiro specs.',
  metaDescription:
    'SpecScore frente a Kiro. Kiro es el IDE agéntico de AWS que escribe requisitos EARS. SpecScore es un formato de especificación abierto que tu CI puede lintear. Comprobado el 30 de octubre de 2026.',
  h1: 'SpecScore vs Kiro',
  hero: [
    { a: 'Desarrollo basado en especificaciones', href: '/es/spec-driven-development/' },
    ' (SDD) significa escribir qué debe hacer el software antes de que un agente de IA escriba el código. ',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ', de Amazon Web Services (AWS), es un entorno de desarrollo agéntico — un editor, una ',
    { a: 'interfaz de línea de comandos', href: '/es/cli/' },
    ' (CLI) y una aplicación web — que convierte un prompt en Kiro specs: requisitos, un diseño y tareas. Esos requisitos usan ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    ' (Easy Approach to Requirements Syntax), frases con la forma «WHEN ocurre algo, THE SYSTEM SHALL hacer algo». ',
    { a: 'SpecScore', href: '/es/' },
    ' es un formato ',
    { a: 'de código abierto', href: repo, kind: 'us' },
    ' para la especificación en sí, más un CLI que comprueba los archivos. La ',
    { a: 'integración continua', href: '/es/validators/' },
    ' (CI) — una comprobación automática de cada cambio propuesto — puede rechazar una especificación SpecScore que rompa el formato.',
  ],
  shared: [
    ['Ambos tratan una especificación escrita como aquello a partir de lo cual debe construir un agente, no como la transcripción de un chat.'],
    ['Ambos guardan esa especificación como Markdown en el proyecto, de modo que se puede revisar como el código.'],
    ['Ambos dividen el trabajo en requisitos, un diseño y tareas. Kiro genera esos tres archivos. SpecScore es un formato que un equipo puede conservar cuando termina la sesión.'],
  ],
  creditTitle: 'Lo que Kiro hace bien.',
  creditNote: [
    'La documentación propia de Kiro, leída el 30 de octubre de 2026, describe el producto. La página de especificaciones de funcionalidad estaba marcada como actualizada el 4 de agosto de 2026.',
  ],
  credits: [
    {
      title: 'Requisitos con una forma de frase fija',
      body: [
        'Las Kiro specs ponen el comportamiento en ',
        { c: 'requirements.md' },
        ' con un patrón EARS: WHEN se cumple una condición, THE SYSTEM SHALL hacer una cosa. La documentación pone el ejemplo de un formulario con datos no válidos y el sistema mostrando un error de validación junto al campo. Esa forma es más fácil de probar que un párrafo vago.',
      ],
    },
    {
      title: 'Un camino completo del prompt a las tareas',
      body: [
        'Una especificación de funcionalidad pasa por requisitos, diseño (',
        { c: 'design.md' },
        ') y tareas (',
        { c: 'tasks.md' },
        '). Puedes empezar por los requisitos o por un diseño. Quick Spec ejecuta las tres sin una parada de aprobación entre ellas. Las Bugfix specs son un camino aparte. La documentación también describe ejecutar tareas independientes en paralelo, por oleadas, a partir del grafo de dependencias de ',
        { c: 'tasks.md' },
        '.',
      ],
    },
    {
      title: 'Comprobaciones dentro del producto',
      body: [
        'Analyze Requirements, disponible en el IDE y en el CLI, busca incoherencias, ambigüedad, restricciones en conflicto y huecos antes del diseño. Correctness — pruebas basadas en propiedades extraídas de esas líneas EARS — figura solo para el IDE, no para el CLI, la web ni el móvil, en la tabla de capacidades de las specs.',
      ],
    },
  ],
  tableNote: 'Kiro es un producto que redacta especificaciones. SpecScore es el formato que un repositorio puede comprobar. La tabla compara esos roles.',
  tableLabel: 'Comparación de funcionalidades SpecScore vs Kiro',
  rows: [
    {
      cap: 'Rol principal',
      them: ['IDE agéntico, CLI y aplicación web que redacta especificaciones e implementa tareas'],
      us: [{ s: 'Formato de especificación abierto + CLI' }],
    },
    {
      cap: 'Archivos de la especificación',
      them: [{ c: 'requirements.md' }, ' (o ', { c: 'bugfix.md' }, '), ', { c: 'design.md' }, ', ', { c: 'tasks.md' }],
      us: [{ s: 'Un árbol spec/' }, ' de Markdown + YAML'],
    },
    {
      cap: 'Sintaxis de requisitos',
      them: ['Patrón EARS: WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: 'Identificadores de requisitos' },
        ' (',
        { c: 'REQ: slug' },
        ') y criterios de aceptación ',
        { a: 'Dado/Cuando/Entonces', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Comprobar la especificación',
      them: ['Analyze Requirements en el IDE y el CLI. Pruebas basadas en propiedades en el IDE. No se describe como un linter de formato para tu propia CI.'],
      us: [
        { s: 'specscore spec lint' },
        ' en CI. ',
        { c: '/score' },
        ' es una calificación de IA aparte y manual.',
      ],
    },
    {
      cap: 'Dónde se ejecuta',
      them: ['Kiro IDE, Kiro CLI, Kiro web. Algunas comprobaciones son solo del IDE.'],
      us: [{ s: 'Cualquier repositorio' }, ' — un binario Go, sin cuenta de Kiro'],
    },
    {
      cap: 'Licencia',
      them: [
        'La ',
        { a: 'licencia de Kiro', href: 'https://kiro.dev/license/', kind: 'them' },
        ' dice que el IDE y el CLI son AWS Content bajo el AWS Customer Agreement. Kiro Crew es un ',
        { a: 'repositorio público', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
        ' aparte.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' el formato · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' el CLI',
      ],
    },
    {
      cap: 'Precio',
      them: [
        'Un nivel gratuito y planes de pago. Las cifras cambian — consulta ',
        { a: 'los precios de Kiro', href: 'https://kiro.dev/pricing/', kind: 'them' },
        ', leídos el 30 de octubre de 2026.',
      ],
      us: [{ s: 'Sin coste' }, ' por el formato ni por el CLI'],
    },
  ],
  diffs: [
    {
      title: 'El formato hace fallar la CI por sí solo',
      terminal: true,
      body: [
        'El análisis de Kiro se ejecuta dentro de Kiro. La comprobación de SpecScore es un comando. El ',
        { a: 'flujo de trabajo dogfood', href: dogfood, kind: 'us' },
        ' de este repositorio ejecuta ',
        { c: 'specscore spec lint' },
        ' en cada pull request y en main. Una especificación rota hace fallar la ejecución como lo haría una prueba rota. La skill ',
        { a: '/score', href: score, kind: 'us' },
        ' califica la redacción con revisores de IA; esa pasada es manual, y el flujo de arriba no la ejecuta.',
      ],
    },
    {
      title: 'La especificación no está atada a un solo IDE',
      body: [
        'Las Kiro specs son Markdown, así que puedes leerlas sin el producto. El flujo que las crea y las ejecuta es el de Kiro. Un árbol SpecScore son los mismos archivos para Claude Code, Cursor, Copilot o ningún agente — el CLI no llama a un modelo para lintear.',
      ],
    },
    {
      title: 'Los requisitos conservan un id',
      body: [
        'La documentación de Kiro describe la trazabilidad como seguir un requisito a lo largo de la implementación. No describe un id estable que sobreviva a una reescritura. SpecScore se dirige a un requisito como ',
        { c: 'REQ: slug' },
        ' y a un criterio de aceptación por su propio id.',
      ],
    },
    {
      title: 'EARS y Dado/Cuando/Entonces responden a preguntas distintas',
      body: [
        'EARS, tal como lo documenta Kiro, es una frase de comportamiento del sistema. Los criterios de aceptación de SpecScore son escenarios Dado/Cuando/Entonces ligados a un id de requisito. Puedes escribir una línea EARS en la prosa y conservar el escenario en el archivo SpecScore que comprueba el linter.',
      ],
    },
  ],
  whenThemTitle: 'Elige Kiro cuando…',
  whenThem: [
    ['Quieres un IDE agéntico de AWS que redacte requisitos, diseño y tareas a partir de un prompt y después implemente las tareas.'],
    ['Quieres frases EARS y, en el IDE, pruebas basadas en propiedades generadas a partir de ellas.'],
    ['Tu equipo ya se está estandarizando en el editor, el CLI o la aplicación web de Kiro.'],
  ],
  whenUs: [
    ['La especificación tiene que seguir siendo válida en CI cuando termina la sesión del agente, en un repositorio que no exige Kiro.'],
    ['Necesitas ids de requisitos, estado del ciclo de vida y un resultado de lint determinista.'],
    ['Quieres el formato ', { a: 'de código abierto', href: repo, kind: 'us' }, ' y que el comprobador sea un solo binario.'],
  ],
  bridgeTitle: 'Kiro puede redactar. SpecScore puede hacer de compuerta.',
  bridge: [
    [
      'Nada de esto sustituye al editor de Kiro. Si Kiro es donde el equipo escribe el prompt, deja que redacte. Si la especificación tiene que sobrevivir como archivo revisado, escribe ese contrato en SpecScore y deja que ',
      { c: 'specscore spec lint' },
      ' haga fallar el pull request cuando se rompa la estructura. Los dos archivos pueden convivir en el mismo repositorio.',
    ],
    [
      'Elige Kiro para la sesión. Elige SpecScore para el artefacto que una ejecución de CI puede rechazar.',
    ],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Documentación de Kiro — Specs' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Documentación de Kiro — especificaciones de funcionalidad y EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro — Acerca de' },
    { href: 'https://kiro.dev/license/', label: 'Kiro — Licencia' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro — Precios' },
    { href: dogfood, label: 'specscore/specscore — flujo de CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
