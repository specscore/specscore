import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Alternatywa dla Kiro: SpecScore vs specyfikacje Kiro.',
  metaDescription:
    'SpecScore vs Kiro. Kiro to agentowe IDE od AWS, które pisze wymagania w EARS. SpecScore to otwarty format specyfikacji, który CI może lintować. Sprawdzono 30 października 2026.',
  h1: 'SpecScore vs Kiro',
  hero: [
    { a: 'Rozwój sterowany specyfikacją', href: '/pl/spec-driven-development/' },
    ' (SDD) oznacza zapisanie, co oprogramowanie ma robić, zanim agent AI napisze kod. ',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ', od Amazon Web Services (AWS), to agentowe środowisko programistyczne — edytor, ',
    { a: 'interfejs wiersza poleceń', href: '/pl/cli/' },
    ' (CLI) i aplikacja webowa — które zamienia prompt w specyfikacje Kiro: wymagania, projekt i zadania. Te wymagania używają ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    ' (łatwe podejście do składni wymagań), czyli zdania w kształcie „WHEN coś się dzieje, THE SYSTEM SHALL coś zrobić”. ',
    { a: 'SpecScore', href: '/pl/' },
    ' to ',
    { a: 'otwartoźródłowy', href: repo, kind: 'us' },
    ' format samej specyfikacji oraz CLI, który sprawdza pliki. ',
    { a: 'Ciągła integracja', href: '/pl/validators/' },
    ' (CI) — automatyczne sprawdzenie każdej proponowanej zmiany — może odrzucić specyfikację SpecScore, która łamie format.',
  ],
  shared: [
    ['Oba traktują spisaną specyfikację jako to, z czego agent ma budować, a nie jako zapis czatu.'],
    ['Oba trzymają tę specyfikację jako Markdown w projekcie, więc można ją przeglądać jak kod.'],
    ['Oba dzielą pracę na wymagania, projekt i zadania. Kiro generuje te trzy pliki. SpecScore to format, który zespół może zachować po zakończeniu sesji.'],
  ],
  creditTitle: 'Co Kiro robi dobrze.',
  creditNote: [
    'Własna dokumentacja Kiro, odczytana 30 października 2026, opisuje produkt. Strona specyfikacji funkcji była oznaczona jako zaktualizowana 4 sierpnia 2026.',
  ],
  credits: [
    {
      title: 'Wymagania w ustalonym kształcie zdania',
      body: [
        'Specyfikacje Kiro umieszczają zachowanie w ',
        { c: 'requirements.md' },
        ' według jednego wzorca EARS: WHEN zachodzi warunek, THE SYSTEM SHALL zrobić rzecz. Dokumentacja podaje przykład formularza z nieprawidłowymi danymi i systemu, który pokazuje błąd walidacji obok pola. Taki kształt łatwiej testować niż ogólnikowy akapit.',
      ],
    },
    {
      title: 'Pełna ścieżka od promptu do zadań',
      body: [
        'Specyfikacja funkcji przechodzi przez wymagania, projekt (',
        { c: 'design.md' },
        ') i zadania (',
        { c: 'tasks.md' },
        '). Można zacząć od wymagań albo od projektu. Quick Spec uruchamia wszystkie trzy bez zatrzymania na zatwierdzenie między nimi. Specyfikacje Bugfix to osobna ścieżka. Dokumentacja opisuje też uruchamianie niezależnych zadań równolegle, falami, według grafu zależności w ',
        { c: 'tasks.md' },
        '.',
      ],
    },
    {
      title: 'Sprawdzenia wewnątrz produktu',
      body: [
        'Analyze Requirements, dostępne w IDE i w CLI, szuka niespójności, niejednoznaczności, sprzecznych ograniczeń i luk, zanim powstanie projekt. Correctness — testy oparte na właściwościach, wyprowadzone z tych linii EARS — jest wymienione tylko dla IDE, nie dla CLI, web ani mobile, w tabeli możliwości specyfikacji.',
      ],
    },
  ],
  tableNote: 'Kiro to produkt, który szkicuje specyfikacje. SpecScore to format, który repozytorium może sprawdzić. Tabela porównuje te role.',
  tableLabel: 'Porównanie funkcji SpecScore i Kiro',
  rows: [
    {
      cap: 'Rola główna',
      them: ['Agentowe IDE, CLI i aplikacja webowa, które szkicują specyfikacje i realizują zadania'],
      us: [{ s: 'Otwarty format specyfikacji + CLI' }],
    },
    {
      cap: 'Pliki specyfikacji',
      them: [{ c: 'requirements.md' }, ' (albo ', { c: 'bugfix.md' }, '), ', { c: 'design.md' }, ', ', { c: 'tasks.md' }],
      us: [{ s: 'Drzewo spec/' }, ' z Markdown i YAML'],
    },
    {
      cap: 'Składnia wymagań',
      them: ['Wzorzec EARS: WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: 'Identyfikatory wymagań' },
        ' (',
        { c: 'REQ: slug' },
        ') oraz kryteria akceptacji ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Sprawdzanie specyfikacji',
      them: ['Analyze Requirements w IDE i w CLI. Testy oparte na właściwościach w IDE. Nieopisane jako linter formatu dla własnego CI.'],
      us: [
        { s: 'specscore spec lint' },
        ' w CI. ',
        { c: '/score' },
        ' to osobna, ręczna ocena AI.',
      ],
    },
    {
      cap: 'Gdzie działa',
      them: ['Kiro IDE, Kiro CLI, Kiro web. Część sprawdzeń jest tylko w IDE.'],
      us: [{ s: 'Dowolne repozytorium' }, ' — jeden plik binarny Go, bez konta Kiro'],
    },
    {
      cap: 'Licencja',
      them: [
        { a: 'Licencja Kiro', href: 'https://kiro.dev/license/', kind: 'them' },
        ' mówi, że IDE i CLI są treścią AWS (AWS Content) na mocy umowy klienta AWS (AWS Customer Agreement). Kiro Crew to osobne ',
        { a: 'publiczne repozytorium', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
        '.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' format · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
    {
      cap: 'Cena',
      them: [
        'Darmowy poziom i plany płatne. Liczby się zmieniają — zobacz ',
        { a: 'cennik Kiro', href: 'https://kiro.dev/pricing/', kind: 'them' },
        ', odczytany 30 października 2026.',
      ],
      us: [{ s: 'Bez opłaty' }, ' za format ani za CLI'],
    },
  ],
  diffs: [
    {
      title: 'Format sam pada w CI',
      terminal: true,
      body: [
        'Analiza Kiro działa wewnątrz Kiro. Sprawdzenie SpecScore to polecenie. ',
        { a: 'Workflow dogfood', href: dogfood, kind: 'us' },
        ' tego repozytorium uruchamia ',
        { c: 'specscore spec lint' },
        ' przy każdym pull requeście i na main. Zepsuta specyfikacja oblewa zadanie tak, jak oblałby je zepsuty test. Skill ',
        { a: '/score', href: score, kind: 'us' },
        ' ocenia sformułowania recenzentami AI; to przejście jest ręczne i powyższy workflow go nie uruchamia.',
      ],
    },
    {
      title: 'Specyfikacja nie jest przywiązana do jednego IDE',
      body: [
        'Specyfikacje Kiro są w Markdown, więc można je czytać bez produktu. Workflow, który je tworzy i wykonuje, należy do Kiro. Drzewo SpecScore to te same pliki dla Claude Code, Cursor, Copilot albo w ogóle bez agenta — CLI nie wywołuje modelu, żeby lintować.',
      ],
    },
    {
      title: 'Wymagania zachowują identyfikator',
      body: [
        'Dokumentacja Kiro opisuje identyfikowalność jako śledzenie wymagania przez implementację. Nie opisuje stabilnego identyfikatora, który przetrwa przeredagowanie. SpecScore adresuje wymaganie jako ',
        { c: 'REQ: slug' },
        ', a kryterium akceptacji — jego własnym identyfikatorem.',
      ],
    },
    {
      title: 'EARS i Given/When/Then odpowiadają na różne pytania',
      body: [
        'EARS, tak jak dokumentuje to Kiro, to jedno zdanie o zachowaniu systemu. Kryteria akceptacji SpecScore to scenariusze Given/When/Then powiązane z identyfikatorem wymagania. Linię EARS można zapisać w prozie i nadal trzymać scenariusz w pliku SpecScore, który sprawdza linter.',
      ],
    },
  ],
  whenThemTitle: 'Sięgnij po Kiro, gdy…',
  whenThem: [
    ['Chcesz agentowego IDE od AWS, które z promptu szkicuje wymagania, projekt i zadania, a potem te zadania realizuje.'],
    ['Chcesz zdań EARS oraz, w IDE, testów opartych na właściwościach wygenerowanych z tych zdań.'],
    ['Twój zespół już standaryzuje się na edytorze, CLI albo aplikacji webowej Kiro.'],
  ],
  whenUs: [
    ['Specyfikacja ma zostawać poprawna w CI po zakończeniu sesji agenta, w repozytorium, które nie wymaga Kiro.'],
    ['Potrzebujesz identyfikatorów wymagań, statusu cyklu życia i deterministycznego wyniku lintu.'],
    ['Chcesz, żeby format był ', { a: 'otwartoźródłowy', href: repo, kind: 'us' }, ', a sprawdzanie — jednym plikiem binarnym.'],
  ],
  bridgeTitle: 'Kiro może szkicować. SpecScore może postawić bramkę.',
  bridge: [
    [
      'Nic tutaj nie zastępuje edytora Kiro. Jeśli zespół pisze prompty w Kiro, niech Kiro szkicuje. Jeśli specyfikacja ma przetrwać jako przejrzany plik, zapisz ten kontrakt w SpecScore i pozwól, by ',
      { c: 'specscore spec lint' },
      ' oblał pull request, gdy struktura się złamie. Te dwa pliki mogą leżeć w tym samym repozytorium.',
    ],
    [
      'Wybierz Kiro na sesję. Wybierz SpecScore na artefakt, który zadanie CI może odrzucić.',
    ],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Dokumentacja Kiro — specyfikacje' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Dokumentacja Kiro — specyfikacje funkcji i EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro — o produkcie' },
    { href: 'https://kiro.dev/license/', label: 'Kiro — licencja' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro — cennik' },
    { href: dogfood, label: 'specscore/specscore — workflow CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
