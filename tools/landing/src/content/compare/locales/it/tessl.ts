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
  metaTitle: 'Alternativa a Tessl: SpecScore e lo spec as source.',
  metaDescription:
    'SpecScore rispetto a Tessl. Tessl è una piattaforma di skill per agenti; il suo tile e il saggio del 2025 trattano la specifica come fonte. SpecScore fa il lint di un formato portabile nella CI. Verificato il 30 ottobre 2026.',
  h1: 'SpecScore vs Tessl',
  hero: [
    { a: 'Sviluppo guidato dalle specifiche', href: '/it/spec-driven-development/' },
    ' (SDD) significa che la specifica del comportamento previsto si scrive prima del codice. ',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    ' (Tessl AI Ltd) è, al 30 ottobre 2026, una piattaforma di abilitazione degli agenti: un registro e un piano di controllo per le skill, le regole e i plugin che gli agenti di programmazione caricano. «Spec as source» è l’affermazione più forte del ',
    { a: 'saggio del giugno 2025', href: essay, kind: 'them' },
    ' di Tessl: la specifica è l’artefatto che dura, e il codice ne deriva. ',
    { a: 'SpecScore', href: '/it/' },
    ' è un formato di file ',
    { a: 'a codice aperto', href: repo, kind: 'us' },
    ' per quella specifica, controllato da un’',
    { a: 'interfaccia a riga di comando', href: '/it/cli/' },
    ' (CLI). L’',
    { a: 'integrazione continua', href: '/it/validators/' },
    ' (CI) — un controllo automatico su ogni modifica proposta — esegue quel controllo in questo repository.',
  ],
  shared: [
    ['Entrambi dicono che un prompt è un posto debole in cui tenere l’intenzione. Una specifica scritta deve sopravvivere alla chat.'],
    ['Entrambi si aspettano che un agente di programmazione IA legga la specifica prima di modificare il codice.'],
    ['Entrambi possono allegare test ai requisiti, così «fatto» è qualcosa che puoi indicare.'],
  ],
  creditTitle: 'Cosa fa bene Tessl.',
  creditNote: [
    'Due superfici diverse di Tessl si confondono facilmente. Le note sotto le tengono distinte, da pagine lette il 30 ottobre 2026.',
  ],
  credits: [
    {
      title: 'Un argomento chiaro per lo spec as source',
      body: [
        'Il saggio di Simon Maple del 27 giugno 2025 dice che un documento dei requisiti di prodotto (PRD) — prosa scritta per le persone su che cosa costruire — di solito invecchia, mentre il codice diventa l’unica fonte di verità. L’alternativa del saggio è che la specifica è ciò che cambi, e un grande modello linguistico (LLM) genera da essa codice, test e documentazione. È una posizione reale, non uno slogan.',
      ],
    },
    {
      title: 'Una piattaforma per il contesto dell’agente',
      body: [
        { a: 'La documentazione di Tessl', href: 'https://docs.tessl.io/', kind: 'them' },
        ' descrive un registro, una governance che analizza e assegna un punteggio alle skill, valutazioni e osservabilità tra agenti. La documentazione dice che le skill sono artefatti semplici nel tuo repository, e che la piattaforma funziona con Claude Code, Cursor, Copilot, Gemini e altri. Lì, il punteggio riguarda una skill, non una specifica di prodotto.',
      ],
    },
    {
      title: 'Un tile ufficiale di sviluppo guidato dalle specifiche, con controlli shell',
      body: [
        'Il tile ',
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ', con licenza MIT nel ',
        { a: 'repository pubblico del tile', href: tile, kind: 'them' },
        ', insegna a un agente a intervistare, scrivere file ',
        { c: '.spec.md' },
        ', attendere l’approvazione e poi implementare. La pagina del registro elenca ',
        { c: 'scripts/validate-specs.sh' },
        ' e ',
        { c: 'scripts/check-spec-links.sh' },
        ' per il frontmatter, ',
        { c: 'targets' },
        ' e i link ',
        { c: '[@test]' },
        '. La stessa pagina dice che il tile è contesto di guida: nessun comando speciale, nessun framework.',
      ],
    },
  ],
  tableNote: '«Spec as source» è il saggio di Tessl. Il tile è un pacchetto di skill sopra la piattaforma di oggi. SpecScore è un formato con un linter versionato.',
  tableLabel: 'Confronto delle funzionalità SpecScore vs Tessl',
  rows: [
    {
      cap: 'Ruolo principale',
      them: ['Piattaforma di skill per agenti, più un tile di sviluppo guidato dalle specifiche e un saggio del 2025 sullo spec as source'],
      us: [{ s: 'Formato di specifica aperto + CLI' }],
    },
    {
      cap: 'Che cos’è la specifica',
      them: ['Saggio: la fonte durevole da cui si genera il codice. Tile: un .spec.md rispetto al quale l’agente implementa, e tu tieni il codice.'],
      us: [{ s: 'Un contratto accanto al codice' }, '. Il lint non rigenera il codice.'],
    },
    {
      cap: 'Forma della specifica',
      them: ['Tile: frontmatter YAML, glob di targets e link [@test] a file di test'],
      us: [
        { s: 'Markdown + YAML' },
        ', ',
        { c: 'REQ: slug' },
        ', ',
        { a: 'Dato/Quando/Allora', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Controllare la specifica',
      them: ['Script shell distribuiti con il tile, per il frontmatter e i link di quel tile'],
      us: [
        { s: 'specscore spec lint' },
        ' sul formato SpecScore, nella CI di questo repository. ',
        { c: '/score' },
        ' è una valutazione IA manuale.',
      ],
    },
    {
      cap: 'Licenza',
      them: [
        'Il tile è ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        '. La piattaforma è un prodotto. La documentazione non pubblica il codice sorgente della piattaforma.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' per il formato · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' per la CLI',
      ],
    },
    {
      cap: 'Prezzo',
      them: [
        'La ',
        { a: 'homepage di Tessl', href: 'https://tessl.io/', kind: 'them' },
        ', letta il 30 ottobre 2026, descrive un piano gratuito (1.000 crediti al mese su uno spazio di lavoro) e piani enterprise a pagamento.',
      ],
      us: [{ s: 'Nessun costo' }, ' per il formato né per la CLI'],
    },
  ],
  diffs: [
    {
      title: 'Un formato pubblicato, non uno script del tile',
      terminal: true,
      body: [
        'Gli script shell del tile controllano i file ',
        { c: '.spec.md' },
        ' che quel tile ha chiesto all’agente di scrivere. SpecScore controlla un formato documentato su questo sito. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' installa una release fissata di ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' ed esegue ',
        { c: 'specscore spec lint' },
        '. ',
        { a: '/score', href: score, kind: 'us' },
        ' non è quell’esecuzione: è una skill manuale che esce con codice diverso da zero quando i revisori IA segnalano problemi.',
      ],
    },
    {
      title: 'Tieni il codice in entrambi i casi — il saggio va oltre',
      body: [
        'Il saggio del 2025 dice che il codice andrebbe rigenerato dalla specifica. Il tile, sulla pagina letta il 30 ottobre 2026, fa implementare l’agente rispetto a una specifica approvata e non descrive un compilatore che sostituisca il tuo albero dei sorgenti. SpecScore non ti toglie mai il codice. La specifica è il contratto revisionato; il codice resta tuo.',
      ],
    },
    {
      title: 'Identità del requisito',
      body: [
        'Il tile punta un requisito a dei file con ',
        { c: 'targets' },
        ' e ',
        { c: '[@test]' },
        '. SpecScore nomina il requisito ',
        { c: 'REQ: slug' },
        ' così un piano, un’attività e un trailer di commit possono citarlo dopo che i file si sono spostati.',
      ],
    },
  ],
  whenThemTitle: 'Scegli Tessl quando…',
  whenThem: [
    ['Ti serve un registro, valutazioni e governance per skill condivise tra molti agenti e repository.'],
    ['Vuoi il flusso del saggio spec as source come tile di guida: intervistare, approvare un .spec.md, poi implementare.'],
    ['Stai già pagando la piattaforma Tessl, o la stai provando, e vuoi il suo tile di specifica in quel registro.'],
  ],
  whenUs: [
    ['Il formato della specifica stessa deve essere valido nella CI, anche nei repository che non installano Tessl.'],
    ['Vuoi id dei requisiti e un linter che non chiama un modello.'],
    ['Vuoi il formato ', { a: 'a codice aperto', href: repo, kind: 'us' }, ' sotto una licenza Creative Commons, separato da una piattaforma di skill.'],
  ],
  bridgeTitle: 'Spec as source, e una specifica che si può sottoporre a lint.',
  bridge: [
    [
      'Il saggio di Tessl ha ragione: un PRD invecchiato perde rispetto al codice. Un controllo di formato è il modo in cui la specifica resta ciò di cui ti fidi. SpecScore non genera la tua applicazione dalla specifica. Fa fallire la specifica nella CI quando la struttura, i link o lo stato sono sbagliati.',
    ],
    [
      'Usa Tessl se vuoi la piattaforma e il tile. Usa SpecScore se l’artefatto in git è ciò che la pull request deve dimostrare.',
    ],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Documentazione Tessl — Che cos’è Tessl?' },
    { href: 'https://tessl.io/', label: 'Homepage di Tessl' },
    { href: essay, label: 'Blog di Tessl — Why code alone isn’t enough (27 giugno 2025)' },
    { href: tilePage, label: 'Registro Tessl — tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore — flusso CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
