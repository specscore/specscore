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
  metaTitle: 'Tessl-Alternative: SpecScore und spec as source.',
  metaDescription:
    'SpecScore gegen Tessl. Tessl ist eine Plattform für Agent-Skills; Tile und Essay von 2025 behandeln die Spezifikation als Quelle. SpecScore lintet ein portables Format in der CI. Geprüft am 30. Oktober 2026.',
  h1: 'SpecScore vs Tessl',
  hero: [
    { a: 'Spezifikationsgetriebene Entwicklung', href: '/de/spec-driven-development/' },
    ' (SDD) bedeutet, dass die Spezifikation des beabsichtigten Verhaltens vor dem Code geschrieben wird. ',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    ' (Tessl AI Ltd) ist, Stand 30. Oktober 2026, eine Plattform zur Befähigung von Agenten: eine Registry und eine Steuerungsebene für die Skills, Regeln und Plugins, die Coding-Agenten laden. „Spec as source“ ist die stärkere Behauptung im ',
    { a: 'Essay vom Juni 2025', href: essay, kind: 'them' },
    ' von Tessl: die Spezifikation ist das langlebige Artefakt, und der Code wird daraus abgeleitet. ',
    { a: 'SpecScore', href: '/de/' },
    ' ist ein ',
    { a: 'quelloffenes', href: repo, kind: 'us' },
    ' Dateiformat für diese Spezifikation, geprüft von einer ',
    { a: 'Befehlszeilenschnittstelle', href: '/de/cli/' },
    ' (CLI). ',
    { a: 'Kontinuierliche Integration', href: '/de/validators/' },
    ' (CI) — eine automatische Prüfung bei jeder vorgeschlagenen Änderung — führt diese Prüfung in diesem Repository aus.',
  ],
  shared: [
    ['Beide sagen, ein Prompt sei ein schwacher Ort, um Absicht aufzubewahren. Eine geschriebene Spezifikation soll den Chat überdauern.'],
    ['Beide erwarten, dass ein KI-Coding-Agent die Spezifikation liest, bevor er Code ändert.'],
    ['Beide können Tests an Anforderungen hängen, sodass „fertig“ etwas ist, worauf Sie zeigen können.'],
  ],
  creditTitle: 'Was Tessl gut macht.',
  creditNote: [
    'Zwei verschiedene Tessl-Oberflächen lassen sich leicht verwechseln. Die Notizen unten halten sie auseinander, nach Seiten, die am 30. Oktober 2026 gelesen wurden.',
  ],
  credits: [
    {
      title: 'Ein klares Argument für spec as source',
      body: [
        'Der Essay von Simon Maple vom 27. Juni 2025 sagt, ein Product Requirements Document (PRD) — Prosa für Menschen darüber, was gebaut werden soll — veralte meist, während der Code zur einzigen Quelle der Wahrheit werde. Die Alternative des Essays: die Spezifikation ist das, was Sie ändern, und ein großes Sprachmodell (LLM) erzeugt daraus Code, Tests und Dokumentation. Das ist eine echte Position, kein Slogan.',
      ],
    },
    {
      title: 'Eine Plattform für den Agentenkontext',
      body: [
        { a: 'Die Dokumentation von Tessl', href: 'https://docs.tessl.io/', kind: 'them' },
        ' beschreibt eine Registry, Governance, die Skills scannt und bewertet, Evals und Observability über Agenten hinweg. Die Dokumentation sagt, Skills seien einfache Artefakte in Ihrem Repository, und die Plattform arbeite mit Claude Code, Cursor, Copilot, Gemini und weiteren. Bewerten heißt dort, eine Skill zu bewerten, nicht eine Produktspezifikation.',
      ],
    },
    {
      title: 'Ein offizielles Tile für spezifikationsgetriebene Entwicklung, mit Shell-Prüfungen',
      body: [
        'Das Tile ',
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ', MIT-lizenziert im ',
        { a: 'öffentlichen Tile-Repository', href: tile, kind: 'them' },
        ', bringt einem Agenten bei, zu befragen, ',
        { c: '.spec.md' },
        '-Dateien zu schreiben, auf Freigabe zu warten und dann umzusetzen. Die Registry-Seite nennt ',
        { c: 'scripts/validate-specs.sh' },
        ' und ',
        { c: 'scripts/check-spec-links.sh' },
        ' für Frontmatter, ',
        { c: 'targets' },
        ' und ',
        { c: '[@test]' },
        '-Links. Dieselbe Seite sagt, das Tile sei Steuerungskontext: keine besonderen Befehle, kein Framework.',
      ],
    },
  ],
  tableNote: '„Spec as source“ ist der Essay von Tessl. Das Tile ist ein Skill-Paket auf der heutigen Plattform. SpecScore ist ein Format mit einem versionierten Linter.',
  tableLabel: 'Feature-Vergleich SpecScore vs Tessl',
  rows: [
    {
      cap: 'Hauptrolle',
      them: ['Plattform für Agent-Skills, plus ein Tile für spezifikationsgetriebene Entwicklung und ein Essay von 2025 über spec as source'],
      us: [{ s: 'Offenes Spezifikationsformat + CLI' }],
    },
    {
      cap: 'Was die Spezifikation ist',
      them: ['Essay: die langlebige Quelle, aus der Code erzeugt wird. Tile: eine .spec.md, gegen die der Agent umsetzt, und Sie behalten den Code.'],
      us: [{ s: 'Ein Vertrag neben dem Code' }, '. Lint erzeugt den Code nicht neu.'],
    },
    {
      cap: 'Form der Spezifikation',
      them: ['Tile: YAML-Frontmatter, targets-Globs und [@test]-Links zu Testdateien'],
      us: [
        { s: 'Markdown + YAML' },
        ', ',
        { c: 'REQ: slug' },
        ', ',
        { a: 'Gegeben/Wenn/Dann', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Spezifikation prüfen',
      them: ['Shell-Skripte, die mit dem Tile geliefert werden, für Frontmatter und Links dieses Tiles'],
      us: [
        { s: 'specscore spec lint' },
        ' auf dem SpecScore-Format, in der CI dieses Repositorys. ',
        { c: '/score' },
        ' ist eine manuelle KI-Bewertung.',
      ],
    },
    {
      cap: 'Lizenz',
      them: [
        'Das Tile ist ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        '. Die Plattform ist ein Produkt. Die Dokumentation veröffentlicht den Quelltext der Plattform nicht.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        '-Format · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        '-CLI',
      ],
    },
    {
      cap: 'Preis',
      them: [
        'Die ',
        { a: 'Tessl-Startseite', href: 'https://tessl.io/', kind: 'them' },
        ', gelesen am 30. Oktober 2026, beschreibt eine kostenlose Stufe (1.000 Credits im Monat in einem Workspace) und kostenpflichtige Enterprise-Pläne.',
      ],
      us: [{ s: 'Keine Gebühr' }, ' für das Format oder das CLI'],
    },
  ],
  diffs: [
    {
      title: 'Ein veröffentlichtes Format, kein Tile-Skript',
      terminal: true,
      body: [
        'Die Shell-Skripte des Tiles prüfen ',
        { c: '.spec.md' },
        '-Dateien, die das Tile den Agenten schreiben ließ. SpecScore prüft ein Format, das auf dieser Website dokumentiert ist. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' installiert ein festgeschriebenes ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        '-Release und führt ',
        { c: 'specscore spec lint' },
        ' aus. ',
        { a: '/score', href: score, kind: 'us' },
        ' ist nicht dieser Lauf: es ist eine manuelle Skill, die mit einem Code ungleich null endet, wenn KI-Reviewer Probleme melden.',
      ],
    },
    {
      title: 'Sie behalten den Code in beiden Fällen — der Essay geht weiter',
      body: [
        'Der Essay von 2025 sagt, Code solle aus der Spezifikation neu erzeugt werden. Das Tile, auf der am 30. Oktober 2026 gelesenen Seite, lässt den Agenten gegen eine freigegebene Spezifikation umsetzen und beschreibt keinen Compiler, der Ihren Quellbaum ersetzt. SpecScore nimmt den Code nie weg. Die Spezifikation ist der geprüfte Vertrag; der Code bleibt Ihrer.',
      ],
    },
    {
      title: 'Identität der Anforderung',
      body: [
        'Das Tile zeigt mit ',
        { c: 'targets' },
        ' und ',
        { c: '[@test]' },
        ' von einer Anforderung auf Dateien. SpecScore benennt die Anforderung ',
        { c: 'REQ: slug' },
        ', damit ein Plan, eine Aufgabe und ein Commit-Trailer sie zitieren können, nachdem die Dateien verschoben wurden.',
      ],
    },
  ],
  whenThemTitle: 'Nutzen Sie Tessl, wenn…',
  whenThem: [
    ['Sie eine Registry, Evals und Governance für Skills brauchen, die über viele Agenten und Repositorys geteilt werden.'],
    ['Sie den Ablauf aus dem Essay zu spec as source als steuerndes Tile wollen: befragen, eine .spec.md freigeben, dann umsetzen.'],
    ['Sie die Tessl-Plattform schon bezahlen oder ausprobieren und ihr Spec-Tile in dieser Registry wollen.'],
  ],
  whenUs: [
    ['Das Spezifikationsformat selbst muss in der CI gültig sein, auch in Repositorys, die Tessl nicht installieren.'],
    ['Sie wollen Anforderungs-IDs und einen Linter, der kein Modell aufruft.'],
    ['Sie wollen das Format ', { a: 'quelloffen', href: repo, kind: 'us' }, ' unter einer Creative-Commons-Lizenz, getrennt von einer Skills-Plattform.'],
  ],
  bridgeTitle: 'Spec as source, und eine Spezifikation, die sich linten lässt.',
  bridge: [
    [
      'Der Essay von Tessl hat recht, dass ein veraltetes PRD gegen den Code verliert. Eine Formatprüfung ist der Weg, auf dem die Spezifikation das bleibt, dem Sie vertrauen. SpecScore erzeugt Ihre Anwendung nicht aus der Spezifikation. Es lässt die Spezifikation in der CI fehlschlagen, wenn Struktur, Links oder Status falsch sind.',
    ],
    [
      'Nutzen Sie Tessl, wenn Sie die Plattform und das Tile wollen. Nutzen Sie SpecScore, wenn das Artefakt in Git das ist, was der Pull Request belegen muss.',
    ],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Dokumentation von Tessl — Was ist Tessl?' },
    { href: 'https://tessl.io/', label: 'Tessl-Startseite' },
    { href: essay, label: 'Tessl-Blog — Why code alone isn’t enough (27. Juni 2025)' },
    { href: tilePage, label: 'Tessl-Registry — tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore — Dogfood-CI-Workflow' },
    { href: score, label: 'specstudio-skills — Skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
