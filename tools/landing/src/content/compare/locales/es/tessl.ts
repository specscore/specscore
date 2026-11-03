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
  metaTitle: 'Alternativa a Tessl: SpecScore frente al spec as source.',
  metaDescription:
    'SpecScore frente a Tessl. Tessl es una plataforma de skills para agentes; su tile y el ensayo de 2025 tratan la especificación como fuente. SpecScore lintea un formato portable en CI. Comprobado el 30 de octubre de 2026.',
  h1: 'SpecScore vs Tessl',
  hero: [
    { a: 'Desarrollo basado en especificaciones', href: '/es/spec-driven-development/' },
    ' (SDD) significa que la especificación del comportamiento previsto se escribe antes que el código. ',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    ' (Tessl AI Ltd) es, a 30 de octubre de 2026, una plataforma de habilitación de agentes: un registro y un plano de control para las skills, reglas y plugins que cargan los agentes de programación. «Spec as source» es la afirmación más fuerte del ',
    { a: 'ensayo de junio de 2025', href: essay, kind: 'them' },
    ' de Tessl: la especificación es el artefacto que perdura, y el código se deriva de ella. ',
    { a: 'SpecScore', href: '/es/' },
    ' es un formato de archivo ',
    { a: 'de código abierto', href: repo, kind: 'us' },
    ' para esa especificación, comprobado por una ',
    { a: 'interfaz de línea de comandos', href: '/es/cli/' },
    ' (CLI). La ',
    { a: 'integración continua', href: '/es/validators/' },
    ' (CI) — una comprobación automática de cada cambio propuesto — ejecuta esa comprobación en este repositorio.',
  ],
  shared: [
    ['Ambos dicen que un prompt es un mal lugar para guardar la intención. Una especificación escrita debe sobrevivir al chat.'],
    ['Ambos esperan que un agente de programación con IA lea la especificación antes de editar el código.'],
    ['Ambos pueden adjuntar pruebas a los requisitos, de modo que «hecho» sea algo que se puede señalar.'],
  ],
  creditTitle: 'Lo que Tessl hace bien.',
  creditNote: [
    'Dos superficies distintas de Tessl se confunden con facilidad. Las notas de abajo las mantienen separadas, a partir de páginas leídas el 30 de octubre de 2026.',
  ],
  credits: [
    {
      title: 'Un argumento claro a favor del spec as source',
      body: [
        'El ensayo de Simon Maple del 27 de junio de 2025 dice que un documento de requisitos de producto (PRD) — prosa escrita para personas sobre qué construir — suele quedar desactualizado, mientras el código se convierte en la única fuente de verdad. La alternativa del ensayo es que la especificación es lo que cambias, y un gran modelo de lenguaje (LLM) genera código, pruebas y documentación a partir de ella. Es una postura real, no un eslogan.',
      ],
    },
    {
      title: 'Una plataforma para el contexto del agente',
      body: [
        { a: 'La documentación de Tessl', href: 'https://docs.tessl.io/', kind: 'them' },
        ' describe un registro, una gobernanza que analiza y puntúa skills, evaluaciones y observabilidad entre agentes. La documentación dice que las skills son artefactos planos en tu repositorio, y que la plataforma funciona con Claude Code, Cursor, Copilot, Gemini y otros. Puntuar ahí significa puntuar una skill, no puntuar una especificación de producto.',
      ],
    },
    {
      title: 'Un tile oficial de desarrollo basado en especificaciones, con comprobaciones de shell',
      body: [
        'El tile ',
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ', con licencia MIT en el ',
        { a: 'repositorio público del tile', href: tile, kind: 'them' },
        ', enseña a un agente a entrevistar, escribir archivos ',
        { c: '.spec.md' },
        ', esperar la aprobación y después implementar. La página del registro enumera ',
        { c: 'scripts/validate-specs.sh' },
        ' y ',
        { c: 'scripts/check-spec-links.sh' },
        ' para el frontmatter, ',
        { c: 'targets' },
        ' y los enlaces ',
        { c: '[@test]' },
        '. La misma página dice que el tile es contexto de orientación: sin comandos especiales, sin marco de trabajo.',
      ],
    },
  ],
  tableNote: '«Spec as source» es el ensayo de Tessl. El tile es un paquete de skills encima de la plataforma actual. SpecScore es un formato con un linter versionado.',
  tableLabel: 'Comparación de funcionalidades SpecScore vs Tessl',
  rows: [
    {
      cap: 'Rol principal',
      them: ['Plataforma de skills para agentes, más un tile de desarrollo basado en especificaciones y un ensayo de 2025 sobre spec as source'],
      us: [{ s: 'Formato de especificación abierto + CLI' }],
    },
    {
      cap: 'Qué es la especificación',
      them: ['Ensayo: la fuente duradera de la que se genera el código. Tile: un .spec.md contra el que el agente implementa, y tú conservas el código.'],
      us: [{ s: 'Un contrato junto al código' }, '. El lint no regenera el código.'],
    },
    {
      cap: 'Forma de la especificación',
      them: ['Tile: frontmatter YAML, globs de targets y enlaces [@test] a archivos de prueba'],
      us: [
        { s: 'Markdown + YAML' },
        ', ',
        { c: 'REQ: slug' },
        ', ',
        { a: 'Dado/Cuando/Entonces', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Comprobar la especificación',
      them: ['Scripts de shell que acompañan al tile, para el frontmatter y los enlaces de ese tile'],
      us: [
        { s: 'specscore spec lint' },
        ' sobre el formato SpecScore, en la CI de este repositorio. ',
        { c: '/score' },
        ' es una calificación de IA manual.',
      ],
    },
    {
      cap: 'Licencia',
      them: [
        'El tile es ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        '. La plataforma es un producto. La documentación no publica el código de la plataforma.',
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
        'La ',
        { a: 'página de inicio de Tessl', href: 'https://tessl.io/', kind: 'them' },
        ', leída el 30 de octubre de 2026, describe un nivel gratuito (1.000 créditos al mes en un espacio de trabajo) y planes de empresa de pago.',
      ],
      us: [{ s: 'Sin coste' }, ' por el formato ni por el CLI'],
    },
  ],
  diffs: [
    {
      title: 'Un formato publicado, no un script del tile',
      terminal: true,
      body: [
        'Los scripts de shell del tile comprueban archivos ',
        { c: '.spec.md' },
        ' que ese tile pidió escribir al agente. SpecScore comprueba un formato documentado en este sitio. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' instala una versión fijada de ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' y ejecuta ',
        { c: 'specscore spec lint' },
        '. ',
        { a: '/score', href: score, kind: 'us' },
        ' no es esa ejecución: es una skill manual que sale con código distinto de cero cuando los revisores de IA informan de problemas.',
      ],
    },
    {
      title: 'Conservas el código en ambos casos — el ensayo va más lejos',
      body: [
        'El ensayo de 2025 dice que el código debería regenerarse a partir de la especificación. El tile, en la página leída el 30 de octubre de 2026, hace que el agente implemente contra una especificación aprobada y no describe un compilador que sustituya tu árbol de código. SpecScore nunca te quita el código. La especificación es el contrato revisado; el código sigue siendo tuyo.',
      ],
    },
    {
      title: 'Identidad del requisito',
      body: [
        'El tile apunta un requisito a archivos con ',
        { c: 'targets' },
        ' y ',
        { c: '[@test]' },
        '. SpecScore nombra el requisito ',
        { c: 'REQ: slug' },
        ' para que un plan, una tarea y un tráiler de commit puedan citarlo después de que los archivos se muevan.',
      ],
    },
  ],
  whenThemTitle: 'Elige Tessl cuando…',
  whenThem: [
    ['Necesitas un registro, evaluaciones y gobernanza para skills compartidas entre muchos agentes y repositorios.'],
    ['Quieres el flujo del ensayo spec as source como tile de orientación: entrevistar, aprobar un .spec.md y después implementar.'],
    ['Ya pagas la plataforma Tessl, o la estás probando, y quieres su tile de especificación en ese registro.'],
  ],
  whenUs: [
    ['El formato de la especificación en sí tiene que ser válido en CI, también en repositorios que no instalan Tessl.'],
    ['Quieres ids de requisitos y un linter que no llama a un modelo.'],
    ['Quieres el formato ', { a: 'de código abierto', href: repo, kind: 'us' }, ' bajo una licencia Creative Commons, aparte de una plataforma de skills.'],
  ],
  bridgeTitle: 'Spec as source, y una especificación que se puede lintear.',
  bridge: [
    [
      'El ensayo de Tessl acierta: un PRD desactualizado pierde frente al código. Una comprobación de formato es la manera de que la especificación siga siendo lo que confías. SpecScore no genera tu aplicación a partir de la especificación. Hace que la especificación falle en CI cuando la estructura, los enlaces o el estado son incorrectos.',
    ],
    [
      'Usa Tessl si quieres la plataforma y el tile. Usa SpecScore si el artefacto en git es lo que el pull request tiene que demostrar.',
    ],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Documentación de Tessl — ¿Qué es Tessl?' },
    { href: 'https://tessl.io/', label: 'Página de inicio de Tessl' },
    { href: essay, label: 'Blog de Tessl — Why code alone isn’t enough (27 de junio de 2025)' },
    { href: tilePage, label: 'Registro de Tessl — tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore — flujo de CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
