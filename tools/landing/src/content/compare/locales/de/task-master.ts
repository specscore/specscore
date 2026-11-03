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
  metaTitle: 'Alternative zu Task Master AI: SpecScore gegen Task Master.',
  metaDescription:
    'SpecScore gegen Task Master AI. Task Master zerlegt ein Product Requirements Document in Aufgaben für Coding-Agenten. SpecScore ist das Spezifikationsformat, das die CI linten kann. Geprüft am 30. Oktober 2026.',
  h1: 'SpecScore vs Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    ' (das Paket ',
    { c: 'task-master-ai' },
    ', auch Taskmaster genannt) ist ein Aufgabenmanager für KI-Coding-Agenten. Ein Product Requirements Document (PRD) ist ein Prosadokument darüber, was gebaut werden soll; die README von Task Master sagt, eines unter ',
    { c: '.taskmaster/docs/prd.txt' },
    ' abzulegen und in Aufgaben zu zerlegen. ',
    { a: 'Spezifikationsgetriebene Entwicklung', href: '/de/spec-driven-development/' },
    ' (SDD) ist die Praxis, Verhalten vor dem Code zu spezifizieren. ',
    { a: 'SpecScore', href: '/de/' },
    ' ist ein ',
    { a: 'quelloffenes', href: repo, kind: 'us' },
    ' Format für diese Spezifikation, plus eine ',
    { a: 'Befehlszeilenschnittstelle', href: '/de/cli/' },
    ' (CLI), die es prüft. ',
    { a: 'Kontinuierliche Integration', href: '/de/validators/' },
    ' (CI) — eine automatische Prüfung bei jeder vorgeschlagenen Änderung — führt diese Prüfung in diesem Repository aus. Task Master veröffentlicht kein Spezifikationsformat, das die CI linten kann.',
  ],
  shared: [
    ['Beide gehen davon aus, dass ein KI-Agent die ganze Aufgabe nicht aus einem einzeiligen Prompt erfinden soll.'],
    ['Beide halten ihren Zustand im Repository, damit die nächste Sitzung ihn sehen kann.'],
    ['Beide können einem Agenten sagen, was als Nächstes zu tun ist, statt das ganze Projekt neu zu lesen.'],
  ],
  creditTitle: 'Was Task Master AI gut macht.',
  creditNote: [
    'Die Fakten unten stammen aus der README des Projekts und dem Dokumentationsindex, gelesen am 30. Oktober 2026. Werkzeugzahlen und Modelllisten in dieser README ändern sich oft, deshalb werden sie hier nicht wiederholt.',
  ],
  credits: [
    {
      title: 'Ein PRD wird zur Aufgabenliste',
      body: [
        'Der Weg in der README ist konkret: ',
        { c: 'task-master parse-prd' },
        ' liest ein PRD und erzeugt Aufgaben. ',
        { c: 'task-master next' },
        ' zeigt auf die nächste Aufgabe. ',
        { c: 'task-master expand' },
        ' zerlegt eine Aufgabe. Tags verschieben Arbeit zwischen Strängen. Das ist eine nützliche Schicht, sobald Sie schon wissen, was Sie bauen.',
      ],
    },
    {
      title: 'Es erscheint im Editor',
      body: [
        'Die empfohlene Installation ist ein Model-Context-Protocol-Server (MCP) — ein kleines Programm, das der Editor aufruft — über ',
        { c: 'npx -y task-master-ai' },
        ', einschließlich einer Installation in einem Schritt für Cursor und einer ',
        { c: 'claude mcp add' },
        '-Zeile für Claude Code. Der Agent zerlegt, listet und aktualisiert Aufgaben dann ohne ein separates Dashboard.',
      ],
    },
    {
      title: 'Recherche mit dem Projekt als Kontext',
      body: [
        { c: 'task-master research' },
        ' ist dokumentiert als Weg, ein Modell nach einer Bibliothek oder einer Migration zu fragen und dabei das aktuelle Projekt als Kontext zu nutzen. Mehrere Modellanbieter werden unterstützt. Die README sagt, Befehle, die ein Modell aufrufen, brauchen einen API-Schlüssel, es sei denn, Sie nutzen die dort genannten Wege über Claude Code oder die Codex CLI.',
      ],
    },
  ],
  tableNote: 'Task Master verwaltet Aufgaben. SpecScore ist die Spezifikation, die diese Aufgaben zitieren können. Die Tabelle vergleicht diese Rollen.',
  tableLabel: 'Feature-Vergleich SpecScore vs Task Master AI',
  rows: [
    {
      cap: 'Hauptrolle',
      them: ['Aufgabenliste für KI-Coding-Agenten, aus einem PRD zerlegt'],
      us: [{ s: 'Offenes Spezifikationsformat + CLI' }],
    },
    {
      cap: 'Eingabe',
      them: ['PRD in Prosa, dokumentiert unter .taskmaster/docs/prd.txt'],
      us: [{ s: 'Strukturiertes Markdown + YAML' }, ' mit Pflichtabschnitten'],
    },
    {
      cap: 'Was Sie erhalten',
      them: ['Aufgaben, Abhängigkeiten, Tags und einen Zeiger auf die „nächste Aufgabe“'],
      us: [{ s: 'Anforderungen, Akzeptanzkriterien, Pläne und Aufgaben' }, ', die Anforderungs-IDs zitieren'],
    },
    {
      cap: 'Spezifikation prüfen',
      them: ['Kein dokumentierter Linter für das PRD. Das Modell zerlegt freien Text.'],
      us: [
        { s: 'specscore spec lint' },
        ' in der CI. ',
        { c: '/score' },
        ' ist eine manuelle KI-Bewertung des Wortlauts.',
      ],
    },
    {
      cap: 'Laufzeit',
      them: ['Node.js, meist über den MCP-Server. Modellaufrufe brauchen einen Anbieterschlüssel oder eine lokale Claude Code / Codex CLI, laut README.'],
      us: [{ s: 'Eine Go-Binärdatei' }, '. Lint ruft kein Modell auf.'],
    },
    {
      cap: 'Lizenz',
      them: [
        'Das ',
        { a: 'öffentliche Repository', href: tm, kind: 'them' },
        ' steht unter ',
        { a: 'MIT plus einer Commons Clause', href: tmLicense, kind: 'them' },
        '. Die README sagt, Sie dürfen es nutzen und ändern, und Sie dürfen Task Master selbst nicht verkaufen oder als gehosteten Dienst anbieten.',
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
      title: 'Ein PRD ist keine lintbare Spezifikation',
      terminal: true,
      body: [
        'Die Qualität von Task Master hängt davon ab, wie ausführlich das PRD ist — die README sagt das. Nichts in dieser README prüft die Struktur des PRD, bevor das Modell es zerlegt. SpecScore weist ein Feature zurück, dem ein Pflichtabschnitt fehlt. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' führt ',
        { c: 'specscore spec lint' },
        ' bei jedem Pull Request aus. Die Skill ',
        { a: '/score', href: score, kind: 'us' },
        ' ist ein zweiter, manueller Durchgang über den Wortlaut. Sie ist nicht der CI-Befehl.',
      ],
    },
    {
      title: 'Aufgaben können eine Anforderung zitieren',
      body: [
        'Task Master gibt Aufgaben numerische IDs und Abhängigkeiten. SpecScore gibt Anforderungen stabile IDs (',
        { c: 'REQ: slug' },
        '). Eine Planaufgabe kann das Kriterium nennen, das sie erfüllt, und ein Commit-Trailer kann es erneut nennen. Aufgabenliste und Spezifikation sind dann keine zwei beziehungslosen Dokumente mehr.',
      ],
    },
    {
      title: 'Lint braucht keinen API-Schlüssel',
      body: [
        'Ein PRD in Task Master zu zerlegen ruft ein Modell auf. Einen SpecScore-Baum zu prüfen nicht. Das CLI ist eine Go-Binärdatei aus ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ', die CI kann es also ohne Anbieterkonto ausführen.',
      ],
    },
  ],
  whenThemTitle: 'Nutzen Sie Task Master AI, wenn…',
  whenThem: [
    ['Sie schon ein PRD haben und ein Agent es in geordnete Aufgaben innerhalb von Cursor, Claude Code oder einem anderen MCP-Client zerlegen soll.'],
    ['Sie next-task, expand, Tags und Recherche als Editorbefehle wollen.'],
    ['Was Sie verwalten, das Aufgabenboard ist, nicht ein wiederverwendbares Spezifikationsformat.'],
  ],
  whenUs: [
    ['Die Anforderungen selbst müssen strukturiert und identifizierbar sein und von der CI abgelehnt werden, wenn sie das Format brechen.'],
    ['Sie wollen keinen Modellaufruf auf dem Weg, der entscheidet, ob die Spezifikation wohlgeformt ist.'],
    ['Sie wollen das Format ', { a: 'quelloffen', href: repo, kind: 'us' }, ' unter CC BY 4.0, mit einem Apache-2.0-CLI.'],
  ],
  bridgeTitle: 'Aufgaben aus einer Spezifikation zerlegen, die schon lintet.',
  bridge: [
    [
      'Task Master ist ein starkes Aufgabenboard. Es ist keine Spezifikationssprache. Schreiben Sie das Verhalten in SpecScore, lassen Sie die CI es linten und richten Sie die Aufgabenliste auf ',
      { c: 'REQ: slug' },
      '-IDs. Wenn Sie die Editorwerkzeuge von Task Master trotzdem wollen, geben Sie ihm ein PRD, das Sie aus einer Spezifikation erzeugt haben, die ',
      { c: 'specscore spec lint' },
      ' bereits bestanden hat.',
    ],
    [
      'Nutzen Sie Task Master AI, um Arbeit zu reihen. Nutzen Sie SpecScore, damit die Arbeit einen Vertrag hat.',
    ],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master — MIT plus Commons Clause' },
    { href: tmDocs, label: 'Task-Master-Dokumentation (tryhamster.com)' },
    { href: dogfood, label: 'specscore/specscore — Dogfood-CI-Workflow' },
    { href: score, label: 'specstudio-skills — Skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
