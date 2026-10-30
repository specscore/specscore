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
  metaTitle: 'Alternative zur BMAD Method: SpecScore gegen BMAD.',
  metaDescription:
    'SpecScore gegen die BMAD Method (Breakthrough Method for Agile AI-Driven Development): ein agiler Agenten-Workflow, gegenüber einem Spezifikationsformat, das die CI lintet. Geprüft am 30. Oktober 2026.',
  h1: 'SpecScore vs die BMAD Method',
  hero: [
    'Die ',
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    ' (Breakthrough Method for Agile AI-Driven Development) ist ein ',
    { a: 'quelloffener', href: bmad, kind: 'them' },
    ' Weg, agile Lieferung mit KI-Agenten zu führen: die Arbeit klären, planen, bauen und prüfen, mit aufgeschriebenen Entscheidungen. Ein Product Requirements Document (PRD) ist die Prosa darüber, was gebaut werden soll und für wen; die Workflow-Karte der Methode erzeugt eines, danach Architektur und Stories. ',
    { a: 'Spezifikationsgetriebene Entwicklung', href: '/de/spec-driven-development/' },
    ' (SDD) ist die weitere Idee, in der beide stehen — Verhalten wird vor dem Code spezifiziert. ',
    { a: 'SpecScore', href: '/de/' },
    ' ist ein ',
    { a: 'quelloffenes', href: repo, kind: 'us' },
    ' Format für diese Spezifikation, plus eine ',
    { a: 'Befehlszeilenschnittstelle', href: '/de/cli/' },
    ' (CLI). ',
    { a: 'Kontinuierliche Integration', href: '/de/validators/' },
    ' (CI) — eine automatische Prüfung bei jeder vorgeschlagenen Änderung — kann fehlschlagen, wenn eine SpecScore-Datei strukturell falsch ist.',
  ],
  shared: [
    ['Beide lassen nicht zu, dass ein Agent das Produkt erfindet, während er den Code schreibt.'],
    ['Beide halten Planungsdokumente im Repository, in Markdown, neben der Arbeit.'],
    ['Beide erwarten, dass ein Mensch den Plan freigibt, bevor die Umsetzung davonläuft.'],
  ],
  creditTitle: 'Was die BMAD Method gut macht.',
  creditNote: [
    'Die README des Projekts, gelesen am 30. Oktober 2026, nennt v6.12 das stabile Release und v7 eine Vorschau auf dem main-Branch. Das v7-Datum in dieser README war bereits vergangen. Behandeln Sie die Liniennamen als Momentaufnahme.',
  ],
  credits: [
    {
      title: 'Eine Methode, die sich selbst bemisst',
      body: [
        'Die README sagt, kleine Änderungen gingen direkt in den Bau, und größere Arbeit erhalte Planung. Die ',
        { a: 'Workflow-Karte auf main', href: workflow, kind: 'them' },
        ' nennt die Phasen: ein PRD (',
        { c: 'PRD.md' },
        '), eine optionale UX-Spezifikation, ',
        { c: 'architecture.md' },
        ' mit Entscheidungsprotokollen, Epic- und Story-Dateien, dann ein Sprint. Das ist eine volle agile Schleife, kein einzelner Prompt.',
      ],
    },
    {
      title: 'Eine Sperre vor der Umsetzung',
      body: [
        'Dieselbe Karte führt ',
        { c: 'bmad-check-implementation-readiness' },
        ' auf, das vor der Umsetzung PASS, CONCERNS oder FAIL zurückgibt. Der Product-Manager-Agent von v6 hat außerdem einen validate-PRD-Schritt. Das sind Workflow-Sperren, die der Agent ausführt. Es ist kein separater Format-Linter, den Sie auf einen beliebigen Markdown-Baum richten.',
      ],
    },
    {
      title: 'Sie ist tatsächlich veröffentlicht',
      body: [
        'Die Methode ist ',
        { a: 'MIT-lizenziert', href: bmadLicense, kind: 'them' },
        ' in einem öffentlichen Repository. Die stabile Installation der README ist ',
        { c: 'npx bmad-method install' },
        ', und sie verlangt Node.js 20.12 oder neuer und Python 3.10 oder neuer. Die Website ',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        ' sagt, die Methode sei kostenlos.',
      ],
    },
  ],
  tableNote: 'BMAD ist der Prozess. SpecScore ist das Artefaktformat, auf das ein Prozess zielen kann. Die Tabelle vergleicht diese Rollen.',
  tableLabel: 'Feature-Vergleich SpecScore vs BMAD Method',
  rows: [
    {
      cap: 'Hauptrolle',
      them: ['Agile Methode: Agenten, Skills und Workflows von der Idee bis zum geprüften Code'],
      us: [{ s: 'Offenes Spezifikationsformat + CLI' }],
    },
    {
      cap: 'Planungsartefakte',
      them: ['PRD, UX-Spezifikation, Architektur, Epics und Stories, Sprint-Status — auf der am 30. Oktober 2026 gelesenen Workflow-Karte'],
      us: [{ s: 'Ideen, Features, Pläne, Aufgaben' }, ' in einem spec/-Baum, mit Anforderungs-IDs'],
    },
    {
      cap: 'Die Arbeit prüfen',
      them: ['Bereitschaftssperre (PASS / CONCERNS / FAIL) und ein validate-PRD-Workflow, ausgeführt vom Agenten'],
      us: [
        { s: 'specscore spec lint' },
        ' in der CI, deterministisch. ',
        { c: '/score' },
        ' ist eine manuelle KI-Bewertung.',
      ],
    },
    {
      cap: 'Anforderungs-IDs',
      them: ['Stories und funktionale Anforderungen innerhalb der PRD- und Epic-Dateien. Nicht das REQ: slug von SpecScore.'],
      us: [{ s: 'REQ: slug' }, ' und IDs der Akzeptanzkriterien'],
    },
    {
      cap: 'Laufzeit',
      them: ['Node.js und Python für den in der README beschriebenen Installer v6.12'],
      us: [{ s: 'Keine' }, ' über eine einzelne Go-Binärdatei hinaus'],
    },
    {
      cap: 'Lizenz',
      them: [
        { a: 'MIT', href: bmadLicense, kind: 'them' },
        ', ',
        { a: 'bmad-code-org/BMAD-METHOD', href: bmad, kind: 'them' },
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        '-Format · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        '-CLI',
      ],
    },
  ],
  diffs: [
    {
      title: 'Die Prüfung ist ein Befehl, kein Schritt der Methode',
      terminal: true,
      body: [
        'Das Bereitschaftsergebnis von BMAD ist eine Entscheidung innerhalb des Workflows. Das Ergebnis von SpecScore ist ein Exit-Code des Prozesses. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' führt ',
        { c: 'specscore spec lint' },
        ' bei jedem Pull Request aus. ',
        { a: '/score', href: score, kind: 'us' },
        ' bewertet ein Artefakt mit den im Repository konfigurierten Reviewern; Sie rufen es auf. Die CI nicht.',
      ],
    },
    {
      title: 'Das Format übersteht eine andere Methode',
      body: [
        'Die Dokumente von BMAD erhalten ihre Form durch die Workflows. Wenn Sie BMAD nicht mehr ausführen, haben Sie das Markdown noch, aber nichts außerhalb der Methode erzwingt die Form. Ein SpecScore-Baum ist der Vertrag. Ein anderer Workflow — einschließlich BMAD — kann ihn schreiben, und der Linter gilt weiter.',
      ],
    },
    {
      title: 'Stories und Anforderungen bleiben über die ID verknüpft',
      body: [
        'BMAD-Stories tragen den Kontext weiter, damit der Agent das Produkt nicht neu entscheidet. SpecScore macht die Verknüpfung mechanisch: eine Planaufgabe zitiert ',
        { c: 'REQ: slug' },
        ', und ',
        { c: 'specscore:' },
        '-Annotationen plus ',
        { c: 'Verifies:' },
        '-Commit-Trailer zeigen vom Code zurück auf das Kriterium.',
      ],
    },
  ],
  whenThemTitle: 'Nutzen Sie die BMAD Method, wenn…',
  whenThem: [
    ['Sie eine volle agile Schleife wollen — PRD, Architektur, Stories, Sprint —, ausgeführt von Agenten mit rollenspezifischen Workflows.'],
    ['Sie die Bereitschaftssperre und die Runde aus Produkt-, Architektur- und Testperspektiven wollen, die die Methode mitliefert.'],
    ['Sie vereinheitlichen, wie ein Team promptet, und die Skills der Methode der Standard sind.'],
  ],
  whenUs: [
    ['Die Spezifikation muss in der CI fehlschlagen, wenn eine Überschrift, ein Link oder ein Status falsch ist, auch wenn an dem Tag niemand den BMAD-Workflow ausführt.'],
    ['Sie brauchen stabile Anforderungs-IDs über Werkzeuge hinweg, nicht nur innerhalb der Story-Dateien einer Methode.'],
    ['Sie wollen ein ', { a: 'quelloffenes', href: repo, kind: 'us' }, ' Format, auf das ein anderer Prozess zielen kann.'],
  ],
  bridgeTitle: 'Die Methode kann das Format schreiben.',
  bridge: [
    [
      'BMAD beantwortet „wie führen wir die Arbeit aus“. SpecScore beantwortet „welche Datei ist der Vertrag, und woran erkennt die CI, dass er intakt ist“. Ein Team kann PRD und Stories von BMAD für das Gespräch behalten und ein SpecScore-Feature für die Anforderungen, die linten müssen.',
    ],
    [
      'Nutzen Sie die BMAD Method für die Schleife. Nutzen Sie SpecScore für das Artefakt, das der Pull Request prüft.',
    ],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD — MIT-Lizenz' },
    { href: workflow, label: 'BMAD-Workflow-Karte (main, gelesen am 30. Oktober 2026)' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore — Dogfood-CI-Workflow' },
    { href: score, label: 'specstudio-skills — Skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
