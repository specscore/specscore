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
  metaTitle: 'Alternatywa dla Tessl: SpecScore vs specyfikacja jako źródło.',
  metaDescription:
    'SpecScore vs Tessl. Tessl to platforma skilli dla agentów; jego tile i esej z 2025 traktują specyfikację jako źródło. SpecScore lintuje przenośny format w CI. Sprawdzono 30 października 2026.',
  h1: 'SpecScore vs Tessl',
  hero: [
    { a: 'Rozwój sterowany specyfikacją', href: '/pl/spec-driven-development/' },
    ' (SDD) oznacza, że specyfikacja zamierzonego zachowania powstaje przed kodem. ',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    ' (Tessl AI Ltd) jest, według stanu na 30 października 2026, platformą wyposażania agentów: rejestrem i płaszczyzną kontroli dla skilli, reguł i wtyczek, które ładują agenty kodujące. „Specyfikacja jako źródło” to mocniejsze twierdzenie z ',
    { a: 'eseju Tessl z czerwca 2025', href: essay, kind: 'them' },
    ': specyfikacja jest trwałym artefaktem, a kod jest z niej wyprowadzany. ',
    { a: 'SpecScore', href: '/pl/' },
    ' to ',
    { a: 'otwartoźródłowy', href: repo, kind: 'us' },
    ' format pliku dla tej specyfikacji, sprawdzany przez ',
    { a: 'interfejs wiersza poleceń', href: '/pl/cli/' },
    ' (CLI). ',
    { a: 'Ciągła integracja', href: '/pl/validators/' },
    ' (CI) — automatyczne sprawdzenie każdej proponowanej zmiany — uruchamia to sprawdzenie w tym repozytorium.',
  ],
  shared: [
    ['Oba mówią, że prompt to słabe miejsce na przechowywanie intencji. Spisana specyfikacja powinna przeżyć czat.'],
    ['Oba oczekują, że agent kodujący AI przeczyta specyfikację, zanim zmieni kod.'],
    ['Oba potrafią podpiąć testy do wymagań, więc „zrobione” jest czymś, co da się wskazać.'],
  ],
  creditTitle: 'Co Tessl robi dobrze.',
  creditNote: [
    'Dwie różne powierzchnie Tessl łatwo pomylić. Notatki poniżej trzymają je osobno, na podstawie stron odczytanych 30 października 2026.',
  ],
  credits: [
    {
      title: 'Jasny argument za specyfikacją jako źródłem',
      body: [
        'Esej Simona Maple’a z 27 czerwca 2025 mówi, że dokument wymagań produktu (PRD) — proza pisana dla ludzi o tym, co zbudować — zwykle się dezaktualizuje, a kod staje się jedynym źródłem prawdy. Alternatywa z eseju jest taka, że zmieniasz specyfikację, a LLM generuje z niej kod, testy i dokumentację. To prawdziwe stanowisko, nie hasło.',
      ],
    },
    {
      title: 'Platforma kontekstu dla agentów',
      body: [
        { a: 'Dokumentacja Tessl', href: 'https://docs.tessl.io/', kind: 'them' },
        ' opisuje rejestr, nadzór, który skanuje i ocenia skille, ewaluacje oraz obserwowalność między agentami. Dokumentacja mówi, że skille to zwykłe artefakty w repozytorium i że platforma działa z Claude Code, Cursor, Copilot, Gemini i innymi. Ocena tam oznacza ocenę skilla, nie ocenę specyfikacji produktu.',
      ],
    },
    {
      title: 'Oficjalny tile sterowany specyfikacją, ze sprawdzeniami w powłoce',
      body: [
        'Tile ',
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ', na licencji MIT w ',
        { a: 'publicznym repozytorium tile’a', href: tile, kind: 'them' },
        ', uczy agenta przeprowadzić wywiad, napisać pliki ',
        { c: '.spec.md' },
        ', poczekać na zatwierdzenie, a potem zaimplementować. Strona rejestru wymienia ',
        { c: 'scripts/validate-specs.sh' },
        ' oraz ',
        { c: 'scripts/check-spec-links.sh' },
        ' dla frontmatter, ',
        { c: 'targets' },
        ' i odnośników ',
        { c: '[@test]' },
        '. Ta sama strona mówi, że tile jest kontekstem sterującym: bez specjalnych poleceń, bez frameworka.',
      ],
    },
  ],
  tableNote: '„Specyfikacja jako źródło” to esej Tessl. Tile to paczka skilli na dzisiejszej platformie. SpecScore to format z wersjonowanym linterem.',
  tableLabel: 'Porównanie funkcji SpecScore i Tessl',
  rows: [
    {
      cap: 'Rola główna',
      them: ['Platforma skilli dla agentów oraz tile sterowany specyfikacją i esej z 2025 o specyfikacji jako źródle'],
      us: [{ s: 'Otwarty format specyfikacji + CLI' }],
    },
    {
      cap: 'Czym jest specyfikacja',
      them: ['Esej: trwałe źródło, z którego generuje się kod. Tile: plik .spec.md, względem którego agent implementuje, a kod zostaje u ciebie.'],
      us: [{ s: 'Kontrakt obok kodu' }, '. Lint nie regeneruje kodu.'],
    },
    {
      cap: 'Kształt specyfikacji',
      them: ['Tile: frontmatter YAML, wzorce glob w targets i odnośniki [@test] do plików testów'],
      us: [
        { s: 'Markdown + YAML' },
        ', ',
        { c: 'REQ: slug' },
        ', ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Sprawdzanie specyfikacji',
      them: ['Skrypty powłoki dostarczane z tile’em, dla frontmatter i odnośników tego tile’a'],
      us: [
        { s: 'specscore spec lint' },
        ' na formacie SpecScore, w CI tego repozytorium. ',
        { c: '/score' },
        ' to ręczna ocena AI.',
      ],
    },
    {
      cap: 'Licencja',
      them: [
        'Tile jest na licencji ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        '. Platforma jest produktem. Dokumentacja nie publikuje źródeł platformy.',
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
        { a: 'Strona główna Tessl', href: 'https://tessl.io/', kind: 'them' },
        ', odczytana 30 października 2026, opisuje darmowy poziom (1000 kredytów miesięcznie w jednej przestrzeni roboczej) i płatne plany korporacyjne.',
      ],
      us: [{ s: 'Bez opłaty' }, ' za format ani za CLI'],
    },
  ],
  diffs: [
    {
      title: 'Opublikowany format, nie skrypt tile’a',
      terminal: true,
      body: [
        'Skrypty powłoki tile’a sprawdzają pliki ',
        { c: '.spec.md' },
        ', które ten tile kazał napisać agentowi. SpecScore sprawdza format udokumentowany na tej stronie. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' instaluje przypięte wydanie ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' i uruchamia ',
        { c: 'specscore spec lint' },
        '. ',
        { a: '/score', href: score, kind: 'us' },
        ' nie jest tym zadaniem: to ręczny skill, który kończy się kodem niezerowym, gdy recenzenci AI zgłoszą problemy.',
      ],
    },
    {
      title: 'Kod zostaje u ciebie w obu wypadkach — esej idzie dalej',
      body: [
        'Esej z 2025 mówi, że kod należy regenerować ze specyfikacji. Tile, na stronie odczytanej 30 października 2026, każe agentowi implementować względem zatwierdzonej specyfikacji i nie opisuje kompilatora, który zastępuje drzewo źródeł. SpecScore nigdy nie odbiera kodu. Specyfikacja jest przejrzanym kontraktem; kod zostaje twój.',
      ],
    },
    {
      title: 'Tożsamość wymagania',
      body: [
        'Tile wskazuje wymaganie na pliki przez ',
        { c: 'targets' },
        ' i ',
        { c: '[@test]' },
        '. SpecScore nazywa wymaganie ',
        { c: 'REQ: slug' },
        ', więc plan, zadanie i trailer commita mogą się na nie powołać, gdy pliki się przesuną.',
      ],
    },
  ],
  whenThemTitle: 'Sięgnij po Tessl, gdy…',
  whenThem: [
    ['Potrzebujesz rejestru, ewaluacji i nadzoru nad skillami współdzielonymi między wieloma agentami i repozytoriami.'],
    ['Chcesz workflow z eseju o specyfikacji jako źródle w postaci tile’a sterującego: wywiad, zatwierdzenie .spec.md, potem implementacja.'],
    ['Już płacisz za platformę Tessl albo ją sprawdzasz i chcesz jej tile specyfikacji w tym rejestrze.'],
  ],
  whenUs: [
    ['Sam format specyfikacji ma być poprawny w CI, także w repozytoriach, które nie instalują Tessl.'],
    ['Chcesz identyfikatorów wymagań i lintera, który nie wywołuje modelu.'],
    ['Chcesz format ', { a: 'otwartoźródłowy', href: repo, kind: 'us' }, ' na licencji Creative Commons, osobno od platformy skilli.'],
  ],
  bridgeTitle: 'Specyfikacja jako źródło i specyfikacja, którą da się lintować.',
  bridge: [
    [
      'Esej Tessl ma rację, że nieaktualny PRD przegrywa z kodem. Sprawdzenie formatu jest sposobem, by specyfikacja została tym, czemu ufasz. SpecScore nie generuje aplikacji ze specyfikacji. Sprawia, że specyfikacja pada w CI, gdy struktura, odnośniki albo status są błędne.',
    ],
    [
      'Użyj Tessl, jeśli chcesz platformę i tile. Użyj SpecScore, jeśli artefakt w git jest tym, co pull request musi udowodnić.',
    ],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Dokumentacja Tessl — czym jest Tessl?' },
    { href: 'https://tessl.io/', label: 'Strona główna Tessl' },
    { href: essay, label: 'Blog Tessl — dlaczego sam kod nie wystarcza (27 czerwca 2025)' },
    { href: tilePage, label: 'Rejestr Tessl — tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore — workflow CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
