import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Kiro-Alternative: SpecScore gegen die Kiro specs.',
  metaDescription:
    'SpecScore gegen Kiro. Kiro ist die agentische IDE von AWS, die EARS-Anforderungen schreibt. SpecScore ist ein offenes Spezifikationsformat, das Ihre CI linten kann. Geprüft am 30. Oktober 2026.',
  h1: 'SpecScore vs Kiro',
  hero: [
    { a: 'Spezifikationsgetriebene Entwicklung', href: '/de/spec-driven-development/' },
    ' (SDD) bedeutet, aufzuschreiben, was die Software tun soll, bevor ein KI-Agent den Code schreibt. ',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ', von Amazon Web Services (AWS), ist eine agentische Entwicklungsumgebung — ein Editor, eine ',
    { a: 'Befehlszeilenschnittstelle', href: '/de/cli/' },
    ' (CLI) und eine Web-App —, die einen Prompt in Kiro specs verwandelt: Anforderungen, einen Entwurf und Aufgaben. Diese Anforderungen verwenden ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    ' (Easy Approach to Requirements Syntax), Sätze der Form „WHEN etwas geschieht, THE SYSTEM SHALL etwas tun“. ',
    { a: 'SpecScore', href: '/de/' },
    ' ist ein ',
    { a: 'quelloffenes', href: repo, kind: 'us' },
    ' Format für die Spezifikation selbst, plus ein CLI, das die Dateien prüft. ',
    { a: 'Kontinuierliche Integration', href: '/de/validators/' },
    ' (CI) — eine automatische Prüfung bei jeder vorgeschlagenen Änderung — kann eine SpecScore-Spezifikation ablehnen, die das Format bricht.',
  ],
  shared: [
    ['Beide behandeln eine geschriebene Spezifikation als das, woraus ein Agent bauen soll, und nicht als Chat-Transkript.'],
    ['Beide halten diese Spezifikation als Markdown im Projekt, sodass sie sich wie Code prüfen lässt.'],
    ['Beide zerlegen die Arbeit in Anforderungen, einen Entwurf und Aufgaben. Kiro erzeugt diese drei Dateien. SpecScore ist ein Format, das ein Team behalten kann, wenn die Sitzung endet.'],
  ],
  creditTitle: 'Was Kiro gut macht.',
  creditNote: [
    'Die eigene Dokumentation von Kiro, gelesen am 30. Oktober 2026, beschreibt das Produkt. Die Seite der Feature-Specs war als aktualisiert am 4. August 2026 markiert.',
  ],
  credits: [
    {
      title: 'Anforderungen in einer festen Satzform',
      body: [
        'Kiro specs legen das Verhalten in ',
        { c: 'requirements.md' },
        ' nach einem EARS-Muster ab: WHEN eine Bedingung gilt, THE SYSTEM SHALL eine Sache tun. Die Dokumentation nennt das Beispiel eines Formulars mit ungültigen Daten, bei dem das System einen Validierungsfehler neben dem Feld anzeigt. Diese Form lässt sich leichter prüfen als ein vager Absatz.',
      ],
    },
    {
      title: 'Ein voller Weg vom Prompt zu den Aufgaben',
      body: [
        'Eine Feature-Spec durchläuft Anforderungen, Entwurf (',
        { c: 'design.md' },
        ') und Aufgaben (',
        { c: 'tasks.md' },
        '). Sie können bei den Anforderungen oder bei einem Entwurf beginnen. Quick Spec führt alle drei ohne einen Freigabestopp dazwischen aus. Bugfix specs sind ein eigener Pfad. Die Dokumentation beschreibt außerdem, unabhängige Aufgaben parallel und in Wellen aus dem Abhängigkeitsgraphen in ',
        { c: 'tasks.md' },
        ' auszuführen.',
      ],
    },
    {
      title: 'Prüfungen innerhalb des Produkts',
      body: [
        'Analyze Requirements, verfügbar in der IDE und im CLI, sucht vor dem Entwurf nach Widersprüchen, Mehrdeutigkeit, kollidierenden Einschränkungen und Lücken. Correctness — eigenschaftsbasierte Tests aus diesen EARS-Zeilen — steht in der Fähigkeitentabelle der Specs nur für die IDE, nicht für das CLI, das Web oder Mobilgeräte.',
      ],
    },
  ],
  tableNote: 'Kiro ist ein Produkt, das Spezifikationen entwirft. SpecScore ist das Format, das ein Repository prüfen kann. Die Tabelle vergleicht diese Rollen.',
  tableLabel: 'Feature-Vergleich SpecScore vs Kiro',
  rows: [
    {
      cap: 'Hauptrolle',
      them: ['Agentische IDE, CLI und Web-App, die Spezifikationen entwirft und Aufgaben umsetzt'],
      us: [{ s: 'Offenes Spezifikationsformat + CLI' }],
    },
    {
      cap: 'Spezifikationsdateien',
      them: [{ c: 'requirements.md' }, ' (oder ', { c: 'bugfix.md' }, '), ', { c: 'design.md' }, ', ', { c: 'tasks.md' }],
      us: [{ s: 'Ein spec/-Baum' }, ' aus Markdown + YAML'],
    },
    {
      cap: 'Anforderungssyntax',
      them: ['EARS-Muster: WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: 'Anforderungs-IDs' },
        ' (',
        { c: 'REQ: slug' },
        ') und ',
        { a: 'Gegeben/Wenn/Dann', href: '/acceptance-criteria-specification' },
        '-Akzeptanzkriterien',
      ],
    },
    {
      cap: 'Spezifikation prüfen',
      them: ['Analyze Requirements in der IDE und im CLI. Eigenschaftsbasierte Tests in der IDE. Nicht als Format-Linter für die eigene CI beschrieben.'],
      us: [
        { s: 'specscore spec lint' },
        ' in der CI. ',
        { c: '/score' },
        ' ist eine eigene, manuelle KI-Bewertung.',
      ],
    },
    {
      cap: 'Wo es läuft',
      them: ['Kiro IDE, Kiro CLI, Kiro web. Einige Prüfungen gibt es nur in der IDE.'],
      us: [{ s: 'Beliebiges Repository' }, ' — eine Go-Binärdatei, kein Kiro-Konto'],
    },
    {
      cap: 'Lizenz',
      them: [
        'Die ',
        { a: 'Kiro-Lizenz', href: 'https://kiro.dev/license/', kind: 'them' },
        ' sagt, die IDE und das CLI seien AWS Content unter dem AWS Customer Agreement. Kiro Crew ist ein separates ',
        { a: 'öffentliches Repository', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
        '.',
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
        'Eine kostenlose Stufe und kostenpflichtige Pläne. Die Zahlen ändern sich — siehe ',
        { a: 'Kiro-Preise', href: 'https://kiro.dev/pricing/', kind: 'them' },
        ', gelesen am 30. Oktober 2026.',
      ],
      us: [{ s: 'Keine Gebühr' }, ' für das Format oder das CLI'],
    },
  ],
  diffs: [
    {
      title: 'Das Format lässt die CI von sich aus fehlschlagen',
      terminal: true,
      body: [
        'Die Analyse von Kiro läuft innerhalb von Kiro. Die Prüfung von SpecScore ist ein Befehl. Der ',
        { a: 'Dogfood-Workflow', href: dogfood, kind: 'us' },
        ' dieses Repositorys führt ',
        { c: 'specscore spec lint' },
        ' bei jedem Pull Request und auf main aus. Eine defekte Spezifikation lässt den Lauf fehlschlagen, so wie es ein defekter Test täte. Die Skill ',
        { a: '/score', href: score, kind: 'us' },
        ' bewertet den Wortlaut mit KI-Reviewern; dieser Durchgang ist manuell, und der Workflow oben führt ihn nicht aus.',
      ],
    },
    {
      title: 'Die Spezifikation hängt nicht an einer IDE',
      body: [
        'Kiro specs sind Markdown, Sie können sie also ohne das Produkt lesen. Der Workflow, der sie erzeugt und ausführt, gehört zu Kiro. Ein SpecScore-Baum sind dieselben Dateien für Claude Code, Cursor, Copilot oder ganz ohne Agent — das CLI ruft zum Linten kein Modell auf.',
      ],
    },
    {
      title: 'Anforderungen behalten eine ID',
      body: [
        'Die Dokumentation von Kiro beschreibt Rückverfolgbarkeit als das Verfolgen einer Anforderung durch die Implementierung. Sie beschreibt keine stabile ID, die eine Neufassung übersteht. SpecScore spricht eine Anforderung als ',
        { c: 'REQ: slug' },
        ' an und ein Akzeptanzkriterium über seine eigene ID.',
      ],
    },
    {
      title: 'EARS und Gegeben/Wenn/Dann beantworten verschiedene Fragen',
      body: [
        'EARS ist, so wie Kiro es dokumentiert, ein Satz zum Systemverhalten. Die Akzeptanzkriterien von SpecScore sind Gegeben/Wenn/Dann-Szenarien, gebunden an eine Anforderungs-ID. Sie können eine EARS-Zeile in der Prosa schreiben und das Szenario dennoch in der SpecScore-Datei behalten, die der Linter prüft.',
      ],
    },
  ],
  whenThemTitle: 'Nutzen Sie Kiro, wenn…',
  whenThem: [
    ['Sie wollen eine agentische IDE von AWS, die aus einem Prompt Anforderungen, Entwurf und Aufgaben entwirft und die Aufgaben danach umsetzt.'],
    ['Sie wollen EARS-Sätze und, in der IDE, daraus erzeugte eigenschaftsbasierte Tests.'],
    ['Ihr Team standardisiert bereits auf den Editor, das CLI oder die Web-App von Kiro.'],
  ],
  whenUs: [
    ['Die Spezifikation muss in der CI gültig bleiben, nachdem die Agent-Sitzung endet, in einem Repository, das Kiro nicht verlangt.'],
    ['Sie brauchen Anforderungs-IDs, einen Lebenszyklusstatus und ein deterministisches Lint-Ergebnis.'],
    ['Sie wollen das Format ', { a: 'quelloffen', href: repo, kind: 'us' }, ' und den Prüfer als einzelne Binärdatei.'],
  ],
  bridgeTitle: 'Kiro kann entwerfen. SpecScore kann als Sperre dienen.',
  bridge: [
    [
      'Nichts hier ersetzt den Editor von Kiro. Wenn das Team in Kiro den Prompt schreibt, lassen Sie Kiro entwerfen. Wenn die Spezifikation als geprüfte Datei fortbestehen muss, schreiben Sie diesen Vertrag in SpecScore und lassen Sie ',
      { c: 'specscore spec lint' },
      ' den Pull Request fehlschlagen, wenn die Struktur bricht. Die beiden Dateien können im selben Repository liegen.',
    ],
    [
      'Wählen Sie Kiro für die Sitzung. Wählen Sie SpecScore für das Artefakt, das ein CI-Lauf ablehnen kann.',
    ],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Dokumentation von Kiro — Specs' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Dokumentation von Kiro — Feature-Specs und EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro — Über' },
    { href: 'https://kiro.dev/license/', label: 'Kiro — Lizenz' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro — Preise' },
    { href: dogfood, label: 'specscore/specscore — Dogfood-CI-Workflow' },
    { href: score, label: 'specstudio-skills — Skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
