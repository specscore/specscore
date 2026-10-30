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
  metaTitle: 'Alternatywa dla BMAD Method: SpecScore vs BMAD.',
  metaDescription:
    'SpecScore vs BMAD Method (przełomowa metoda zwinnego wytwarzania sterowanego przez AI): zwinny workflow agentów wobec formatu specyfikacji lintowanego w CI. Sprawdzono 30 października 2026.',
  h1: 'SpecScore vs BMAD Method',
  hero: [
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    ' (przełomowa metoda zwinnego wytwarzania sterowanego przez AI) to ',
    { a: 'otwartoźródłowy', href: bmad, kind: 'them' },
    ' sposób prowadzenia zwinnego dostarczania z agentami AI: doprecyzować pracę, zaplanować ją, zbudować i sprawdzić, a decyzje zapisać. Dokument wymagań produktu (PRD) to prozaiczny opis tego, co zbudować i dla kogo; mapa workflow metody wytwarza taki dokument, a potem architekturę i historyjki. ',
    { a: 'Rozwój sterowany specyfikacją', href: '/pl/spec-driven-development/' },
    ' (SDD) to szersza idea, w której mieszczą się oba — zachowanie jest określone przed kodem. ',
    { a: 'SpecScore', href: '/pl/' },
    ' to ',
    { a: 'otwartoźródłowy', href: repo, kind: 'us' },
    ' format tej specyfikacji oraz ',
    { a: 'interfejs wiersza poleceń', href: '/pl/cli/' },
    ' (CLI). ',
    { a: 'Ciągła integracja', href: '/pl/validators/' },
    ' (CI) — automatyczne sprawdzenie każdej proponowanej zmiany — może paść, gdy plik SpecScore jest strukturalnie błędny.',
  ],
  shared: [
    ['Oba nie pozwalają, by agent wymyślał produkt w trakcie pisania kodu.'],
    ['Oba trzymają dokumenty planowania w repozytorium, w Markdown, obok pracy.'],
    ['Oba oczekują, że człowiek zatwierdzi plan, zanim implementacja pójdzie własną drogą.'],
  ],
  creditTitle: 'Co BMAD Method robi dobrze.',
  creditNote: [
    'README projektu, odczytane 30 października 2026, nazywa v6.12 wydaniem stabilnym, a v7 podglądem na gałęzi main. Data v7 w tym README już minęła. Traktuj nazwy linii jako migawkę.',
  ],
  credits: [
    {
      title: 'Metoda, która sama dobiera skalę',
      body: [
        'README mówi, że małe zmiany idą od razu do budowy, a większa praca dostaje planowanie. ',
        { a: 'Mapa workflow na main', href: workflow, kind: 'them' },
        ' rozpisuje fazy: PRD (',
        { c: 'PRD.md' },
        '), opcjonalną specyfikację UX, ',
        { c: 'architecture.md' },
        ' z rejestrami decyzji, pliki epików i historyjek, a potem sprint. To pełna pętla zwinna, nie pojedynczy prompt.',
      ],
    },
    {
      title: 'Bramka przed implementacją',
      body: [
        'Ta sama mapa wymienia ',
        { c: 'bmad-check-implementation-readiness' },
        ', które zwraca PASS, CONCERNS albo FAIL przed implementacją. Agent product-manager w v6 ma też krok validate-PRD. To bramki workflow uruchamiane przez agenta. To nie jest osobny linter formatu, który kierujesz na dowolne drzewo Markdown.',
      ],
    },
    {
      title: 'Jest naprawdę opublikowana',
      body: [
        'Metoda jest ',
        { a: 'na licencji MIT', href: bmadLicense, kind: 'them' },
        ' w publicznym repozytorium. Stabilna instalacja z README to ',
        { c: 'npx bmad-method install' },
        ' i prosi o Node.js 20.12 albo nowszy oraz Python 3.10 albo nowszy. Strona ',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        ' mówi, że metoda jest darmowa.',
      ],
    },
  ],
  tableNote: 'BMAD to proces. SpecScore to format artefaktu, do którego proces może celować. Tabela porównuje te role.',
  tableLabel: 'Porównanie funkcji SpecScore i BMAD Method',
  rows: [
    {
      cap: 'Rola główna',
      them: ['Metoda zwinna: agenty, skille i workflow od pomysłu do zweryfikowanego kodu'],
      us: [{ s: 'Otwarty format specyfikacji + CLI' }],
    },
    {
      cap: 'Artefakty planowania',
      them: ['PRD, specyfikacja UX, architektura, epiki i historyjki, status sprintu — na mapie workflow odczytanej 30 października 2026'],
      us: [{ s: 'Pomysły, funkcje, plany, zadania' }, ' w drzewie spec/, z identyfikatorami wymagań'],
    },
    {
      cap: 'Sprawdzanie pracy',
      them: ['Bramka gotowości (PASS / CONCERNS / FAIL) i workflow validate-PRD, uruchamiane przez agenta'],
      us: [
        { s: 'specscore spec lint' },
        ' w CI, deterministycznie. ',
        { c: '/score' },
        ' to ręczna ocena AI.',
      ],
    },
    {
      cap: 'Identyfikatory wymagań',
      them: ['Historyjki i wymagania funkcjonalne wewnątrz PRD i plików epików. To nie jest REQ: slug ze SpecScore.'],
      us: [{ s: 'REQ: slug' }, ' oraz identyfikatory kryteriów akceptacji'],
    },
    {
      cap: 'Środowisko uruchomieniowe',
      them: ['Node.js i Python dla instalatora v6.12 opisanego w README'],
      us: [{ s: 'Nic' }, ' poza jednym plikiem binarnym Go'],
    },
    {
      cap: 'Licencja',
      them: [
        { a: 'MIT', href: bmadLicense, kind: 'them' },
        ', ',
        { a: 'bmad-code-org/BMAD-METHOD', href: bmad, kind: 'them' },
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
      title: 'Sprawdzenie jest poleceniem, nie krokiem metody',
      terminal: true,
      body: [
        'Wynik gotowości BMAD to decyzja wewnątrz jego workflow. Wynik SpecScore to kod wyjścia procesu. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' uruchamia ',
        { c: 'specscore spec lint' },
        ' przy każdym pull requeście. ',
        { a: '/score', href: score, kind: 'us' },
        ' ocenia artefakt recenzentami skonfigurowanymi w repozytorium; wywołujesz go ty. CI tego nie robi.',
      ],
    },
    {
      title: 'Format przeżywa inną metodę',
      body: [
        'Dokumenty BMAD są ukształtowane przez jego workflow. Jeśli przestaniesz uruchamiać BMAD, Markdown zostaje, ale nic poza metodą nie egzekwuje kształtu. Drzewo SpecScore jest kontraktem. Inny workflow — w tym BMAD — może je pisać, a linter i tak obowiązuje.',
      ],
    },
    {
      title: 'Historyjki i wymagania zostają powiązane identyfikatorem',
      body: [
        'Historyjki BMAD niosą kontekst dalej, żeby agent nie decydował o produkcie od nowa. SpecScore robi z powiązania rzecz mechaniczną: zadanie w planie cytuje ',
        { c: 'REQ: slug' },
        ', a adnotacje ',
        { c: 'specscore:' },
        ' plus trailery commita ',
        { c: 'Verifies:' },
        ' wskazują kod z powrotem na kryterium.',
      ],
    },
  ],
  whenThemTitle: 'Sięgnij po BMAD Method, gdy…',
  whenThem: [
    ['Chcesz pełnej pętli zwinnej — PRD, architektura, historyjki, sprint — wykonywanej przez agentów ze workflow przypisanymi do ról.'],
    ['Chcesz bramki gotowości oraz zestawu perspektyw produktu, architektury i testów, które metoda dostarcza.'],
    ['Ujednolicasz sposób, w jaki zespół pisze prompty, a skille metody są tym standardem.'],
  ],
  whenUs: [
    ['Specyfikacja ma padać w CI, gdy nagłówek, odnośnik albo status jest błędny, nawet jeśli tego dnia nikt nie uruchamia workflow BMAD.'],
    ['Potrzebujesz stabilnych identyfikatorów wymagań między narzędziami, nie tylko wewnątrz plików historyjek jednej metody.'],
    ['Chcesz format ', { a: 'otwartoźródłowy', href: repo, kind: 'us' }, ', do którego może celować inny proces.'],
  ],
  bridgeTitle: 'Metoda może pisać w tym formacie.',
  bridge: [
    [
      'BMAD odpowiada na pytanie „jak prowadzimy pracę”. SpecScore odpowiada na pytanie „który plik jest kontraktem i skąd CI wie, że jest nienaruszony”. Zespół może zostawić PRD i historyjki BMAD na rozmowę, a funkcję SpecScore — na wymagania, które muszą przejść lint.',
    ],
    [
      'Użyj BMAD Method do pętli. Użyj SpecScore do artefaktu, który sprawdza pull request.',
    ],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD — licencja MIT' },
    { href: workflow, label: 'Mapa workflow BMAD (main, odczyt 30 października 2026)' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore — workflow CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
