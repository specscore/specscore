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
  metaTitle: 'Alternatywa dla Task Master AI: SpecScore vs Task Master.',
  metaDescription:
    'SpecScore vs Task Master AI. Task Master parsuje dokument wymagań produktu na zadania dla agentów kodujących. SpecScore to format specyfikacji, który CI może lintować. Sprawdzono 30 października 2026.',
  h1: 'SpecScore vs Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    ' (pakiet ',
    { c: 'task-master-ai' },
    ', nazywany też Taskmaster) to menedżer zadań dla agentów kodujących AI. Dokument wymagań produktu (PRD) to prozaiczny dokument tego, co zbudować; README Task Master każe umieścić go w ',
    { c: '.taskmaster/docs/prd.txt' },
    ' i sparsować na zadania. ',
    { a: 'Rozwój sterowany specyfikacją', href: '/pl/spec-driven-development/' },
    ' (SDD) to praktyka określania zachowania przed kodem. ',
    { a: 'SpecScore', href: '/pl/' },
    ' to ',
    { a: 'otwartoźródłowy', href: repo, kind: 'us' },
    ' format tej specyfikacji oraz ',
    { a: 'interfejs wiersza poleceń', href: '/pl/cli/' },
    ' (CLI), który ją sprawdza. ',
    { a: 'Ciągła integracja', href: '/pl/validators/' },
    ' (CI) — automatyczne sprawdzenie każdej proponowanej zmiany — uruchamia to sprawdzenie w tym repozytorium. Task Master nie publikuje formatu specyfikacji do lintowania w CI.',
  ],
  shared: [
    ['Oba zakładają, że agent AI nie powinien wymyślać całej roboty z promptu w jednej linii.'],
    ['Oba trzymają swój stan w repozytorium, żeby następna sesja mogła go zobaczyć.'],
    ['Oba potrafią powiedzieć agentowi, co robić dalej, zamiast czytać od nowa cały projekt.'],
  ],
  creditTitle: 'Co Task Master AI robi dobrze.',
  creditNote: [
    'Fakty poniżej pochodzą z README projektu i indeksu dokumentacji, odczytanych 30 października 2026. Liczby narzędzi i listy modeli w tym README często się zmieniają, więc nie są tu powtarzane.',
  ],
  credits: [
    {
      title: 'PRD staje się listą zadań',
      body: [
        'Ścieżka z README jest konkretna: ',
        { c: 'task-master parse-prd' },
        ' czyta PRD i generuje zadania. ',
        { c: 'task-master next' },
        ' wskazuje następne zadanie. ',
        { c: 'task-master expand' },
        ' rozbija zadanie. Tagi przenoszą pracę między strumieniami. To przydatna warstwa, gdy już wiesz, co budujesz.',
      ],
    },
    {
      title: 'Pojawia się wewnątrz edytora',
      body: [
        'Zalecana instalacja to serwer Model Context Protocol (MCP) — mały program, który wywołuje edytor — przez ',
        { c: 'npx -y task-master-ai' },
        ', w tym instalacja w jednym kroku dla Cursor i linia ',
        { c: 'claude mcp add' },
        ' dla Claude Code. Agent potem parsuje, listuje i aktualizuje zadania bez osobnego panelu.',
      ],
    },
    {
      title: 'Research z projektem w kontekście',
      body: [
        { c: 'task-master research' },
        ' jest udokumentowane jako sposób, by zapytać model o bibliotekę albo migrację, używając bieżącego projektu jako kontekstu. Obsługiwanych jest kilku dostawców modeli. README mówi, że polecenia wywołujące model potrzebują klucza API, chyba że używasz ścieżek Claude Code albo Codex CLI, które ono wymienia.',
      ],
    },
  ],
  tableNote: 'Task Master zarządza zadaniami. SpecScore to specyfikacja, którą te zadania mogą cytować. Tabela porównuje te role.',
  tableLabel: 'Porównanie funkcji SpecScore i Task Master AI',
  rows: [
    {
      cap: 'Rola główna',
      them: ['Lista zadań dla agentów kodujących AI, sparsowana z PRD'],
      us: [{ s: 'Otwarty format specyfikacji + CLI' }],
    },
    {
      cap: 'Wejście',
      them: ['Prozaiczny PRD, udokumentowany w .taskmaster/docs/prd.txt'],
      us: [{ s: 'Ustrukturyzowany Markdown + YAML' }, ' z wymaganymi sekcjami'],
    },
    {
      cap: 'Co dostajesz',
      them: ['Zadania, zależności, tagi i wskaźnik „następnego zadania”'],
      us: [{ s: 'Wymagania, kryteria akceptacji, plany i zadania' }, ', które cytują identyfikatory wymagań'],
    },
    {
      cap: 'Sprawdzanie specyfikacji',
      them: ['Brak udokumentowanego lintera dla PRD. Model parsuje dowolny tekst.'],
      us: [
        { s: 'specscore spec lint' },
        ' w CI. ',
        { c: '/score' },
        ' to ręczna ocena AI sformułowań.',
      ],
    },
    {
      cap: 'Środowisko uruchomieniowe',
      them: ['Node.js, zwykle przez serwer MCP. Wywołania modelu potrzebują klucza dostawcy albo lokalnego Claude Code / Codex CLI, według README.'],
      us: [{ s: 'Jeden plik binarny Go' }, '. Lint nie wywołuje modelu.'],
    },
    {
      cap: 'Licencja',
      them: [
        { a: 'Publiczne repozytorium', href: tm, kind: 'them' },
        ' jest na licencji ',
        { a: 'MIT plus Commons Clause', href: tmLicense, kind: 'them' },
        '. README mówi, że można go używać i modyfikować, a nie wolno sprzedawać samego Task Master ani oferować go jako usługi hostowanej.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' format · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
  ],
  diffs: [
    {
      title: 'PRD nie jest specyfikacją, którą da się lintować',
      terminal: true,
      body: [
        'Jakość Task Master zależy od tego, jak szczegółowy jest PRD — README tak mówi. Nic w tym README nie sprawdza struktury PRD, zanim model go sparsuje. SpecScore odrzuca funkcję, której brakuje wymaganej sekcji. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' uruchamia ',
        { c: 'specscore spec lint' },
        ' przy każdym pull requeście. Skill ',
        { a: '/score', href: score, kind: 'us' },
        ' to drugie, ręczne przejście po sformułowaniach. To nie jest polecenie CI.',
      ],
    },
    {
      title: 'Zadania mogą cytować wymaganie',
      body: [
        'Task Master nadaje zadaniom numeryczne identyfikatory i zależności. SpecScore nadaje wymaganiom stabilne identyfikatory (',
        { c: 'REQ: slug' },
        '). Zadanie w planie może nazwać kryterium, które spełnia, a trailer commita może nazwać je jeszcze raz. Lista zadań i specyfikacja przestają być dwoma niepowiązanymi dokumentami.',
      ],
    },
    {
      title: 'Lint nie potrzebuje klucza API',
      body: [
        'Parsowanie PRD w Task Master wywołuje model. Sprawdzanie drzewa SpecScore nie. CLI to plik binarny Go z ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ', więc CI może go uruchomić bez konta u dostawcy.',
      ],
    },
  ],
  whenThemTitle: 'Sięgnij po Task Master AI, gdy…',
  whenThem: [
    ['Masz już PRD i chcesz, by agent podzielił go na uporządkowane zadania w Cursor, Claude Code albo innym kliencie MCP.'],
    ['Chcesz next-task, expand, tagów i research jako poleceń edytora.'],
    ['Tym, czym zarządzasz, jest tablica zadań, a nie format specyfikacji do ponownego użycia.'],
  ],
  whenUs: [
    ['Same wymagania muszą być ustrukturyzowane, identyfikowalne i odrzucane przez CI, gdy łamią format.'],
    ['Nie chcesz wywołania modelu na ścieżce, która decyduje, czy specyfikacja jest poprawnie zbudowana.'],
    ['Chcesz format ', { a: 'otwartoźródłowy', href: repo, kind: 'us' }, ' na CC BY 4.0, z CLI na Apache-2.0.'],
  ],
  bridgeTitle: 'Parsuj zadania ze specyfikacji, która już przechodzi lint.',
  bridge: [
    [
      'Task Master to mocna tablica zadań. To nie jest język specyfikacji. Zapisz zachowanie w SpecScore, niech CI je lintuje, i skieruj listę zadań na identyfikatory ',
      { c: 'REQ: slug' },
      '. Jeśli nadal chcesz narzędzi edytora Task Master, podaj mu PRD wygenerowany ze specyfikacji, która już przeszła ',
      { c: 'specscore spec lint' },
      '.',
    ],
    [
      'Użyj Task Master AI, żeby układać kolejność pracy. Użyj SpecScore, żeby praca miała kontrakt.',
    ],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master — MIT plus Commons Clause' },
    { href: tmDocs, label: 'Dokumentacja Task Master (tryhamster.com)' },
    { href: dogfood, label: 'specscore/specscore — workflow CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
