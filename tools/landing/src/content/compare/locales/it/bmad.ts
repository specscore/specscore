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
  metaTitle: 'Alternativa al BMAD Method: SpecScore rispetto a BMAD.',
  metaDescription:
    'SpecScore rispetto al BMAD Method (Breakthrough Method for Agile AI-Driven Development): un flusso agile di agenti, rispetto a un formato di specifica sottoposto a lint nella CI. Verificato il 30 ottobre 2026.',
  h1: 'SpecScore vs il BMAD Method',
  hero: [
    'Il ',
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    ' (Breakthrough Method for Agile AI-Driven Development) è un modo ',
    { a: 'a codice aperto', href: bmad, kind: 'them' },
    ' di condurre la consegna agile con agenti IA: chiarire il lavoro, pianificarlo, costruirlo e verificarlo, con le decisioni scritte. Un documento dei requisiti di prodotto (PRD) è la descrizione in prosa di che cosa costruire e per chi; la mappa del flusso del metodo ne produce uno, poi l’architettura e le storie. Lo ',
    { a: 'sviluppo guidato dalle specifiche', href: '/it/spec-driven-development/' },
    ' (SDD) è l’idea più ampia in cui stanno entrambi: il comportamento si specifica prima del codice. ',
    { a: 'SpecScore', href: '/it/' },
    ' è un formato ',
    { a: 'a codice aperto', href: repo, kind: 'us' },
    ' per quella specifica, più un’',
    { a: 'interfaccia a riga di comando', href: '/it/cli/' },
    ' (CLI). L’',
    { a: 'integrazione continua', href: '/it/validators/' },
    ' (CI) — un controllo automatico su ogni modifica proposta — può fallire quando un file SpecScore è strutturalmente sbagliato.',
  ],
  shared: [
    ['Entrambi rifiutano di lasciare che un agente inventi il prodotto mentre scrive il codice.'],
    ['Entrambi tengono i documenti di pianificazione nel repository, in Markdown, accanto al lavoro.'],
    ['Entrambi si aspettano che una persona approvi il piano prima che l’implementazione sfugga.'],
  ],
  creditTitle: 'Cosa fa bene il BMAD Method.',
  creditNote: [
    'Il README del progetto, letto il 30 ottobre 2026, chiama v6.12 la release stabile e v7 un’anteprima sul branch main. La data di v7 in quel README era già passata. Tratta i nomi delle linee come un’istantanea.',
  ],
  credits: [
    {
      title: 'Un metodo che si dimensiona da solo',
      body: [
        'Il README dice che i cambiamenti piccoli vanno dritti alla costruzione, e che il lavoro più ampio riceve una pianificazione. La ',
        { a: 'mappa del flusso su main', href: workflow, kind: 'them' },
        ' elenca le fasi: un PRD (',
        { c: 'PRD.md' },
        '), una specifica UX facoltativa, ',
        { c: 'architecture.md' },
        ' con registri delle decisioni, file di epic e storie, poi uno sprint. È un ciclo agile completo, non un solo prompt.',
      ],
    },
    {
      title: 'Uno sbarramento prima dell’implementazione',
      body: [
        'La stessa mappa elenca ',
        { c: 'bmad-check-implementation-readiness' },
        ', che restituisce PASS, CONCERNS o FAIL prima dell’implementazione. L’agente product-manager di v6 ha anche un passo validate-PRD. Sono sbarramenti del flusso che esegue l’agente. Non sono un linter di formato separato da puntare su un albero Markdown qualunque.',
      ],
    },
    {
      title: 'È pubblicato davvero',
      body: [
        'Il metodo è ',
        { a: 'sotto licenza MIT', href: bmadLicense, kind: 'them' },
        ' in un repository pubblico. L’installazione stabile del README è ',
        { c: 'npx bmad-method install' },
        ', e chiede Node.js 20.12 o più recente e Python 3.10 o più recente. Il sito ',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        ' dice che il metodo è gratuito.',
      ],
    },
  ],
  tableNote: 'BMAD è il processo. SpecScore è il formato dell’artefatto a cui un processo può puntare. La tabella confronta questi ruoli.',
  tableLabel: 'Confronto delle funzionalità SpecScore vs BMAD Method',
  rows: [
    {
      cap: 'Ruolo principale',
      them: ['Metodo agile: agenti, skill e flussi di lavoro, dall’idea al codice verificato'],
      us: [{ s: 'Formato di specifica aperto + CLI' }],
    },
    {
      cap: 'Artefatti di pianificazione',
      them: ['PRD, specifica UX, architettura, epic e storie, stato dello sprint — sulla mappa del flusso letta il 30 ottobre 2026'],
      us: [{ s: 'Idee, funzionalità, piani e attività' }, ' in un albero spec/, con id dei requisiti'],
    },
    {
      cap: 'Controllare il lavoro',
      them: ['Sbarramento di prontezza (PASS / CONCERNS / FAIL) e un flusso validate-PRD, eseguiti dall’agente'],
      us: [
        { s: 'specscore spec lint' },
        ' nella CI, deterministico. ',
        { c: '/score' },
        ' è una valutazione IA manuale.',
      ],
    },
    {
      cap: 'Id dei requisiti',
      them: ['Storie e requisiti funzionali dentro il PRD e i file degli epic. Non il REQ: slug di SpecScore.'],
      us: [{ s: 'REQ: slug' }, ' e id dei criteri di accettazione'],
    },
    {
      cap: 'Ambiente di esecuzione',
      them: ['Node.js e Python per l’installer v6.12 descritto nel README'],
      us: [{ s: 'Nessuno' }, ' oltre un solo binario Go'],
    },
    {
      cap: 'Licenza',
      them: [
        { a: 'MIT', href: bmadLicense, kind: 'them' },
        ', ',
        { a: 'bmad-code-org/BMAD-METHOD', href: bmad, kind: 'them' },
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' per il formato · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' per la CLI',
      ],
    },
  ],
  diffs: [
    {
      title: 'Il controllo è un comando, non un passo del metodo',
      terminal: true,
      body: [
        'Il risultato di prontezza di BMAD è una decisione dentro il suo flusso. Il risultato di SpecScore è un codice di uscita del processo. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' esegue ',
        { c: 'specscore spec lint' },
        ' su ogni pull request. ',
        { a: '/score', href: score, kind: 'us' },
        ' valuta un artefatto con i revisori configurati nel repository; lo invochi tu. La CI no.',
      ],
    },
    {
      title: 'Il formato sopravvive a un altro metodo',
      body: [
        'I documenti di BMAD prendono forma dai suoi flussi. Se smetti di eseguire BMAD, hai ancora il Markdown, ma niente fuori dal metodo impone la forma. Un albero SpecScore è il contratto. Un altro flusso — BMAD compreso — può scriverlo, e il linter si applica ancora.',
      ],
    },
    {
      title: 'Storie e requisiti restano collegati dall’id',
      body: [
        'Le storie di BMAD portano avanti il contesto così l’agente non ridecide il prodotto. SpecScore rende il collegamento meccanico: un’attività del piano cita ',
        { c: 'REQ: slug' },
        ', e le annotazioni ',
        { c: 'specscore:' },
        ' più i trailer di commit ',
        { c: 'Verifies:' },
        ' riportano il codice al criterio.',
      ],
    },
  ],
  whenThemTitle: 'Scegli il BMAD Method quando…',
  whenThem: [
    ['Vuoi un ciclo agile completo — PRD, architettura, storie, sprint — eseguito da agenti con flussi legati al ruolo.'],
    ['Vuoi lo sbarramento di prontezza e il gruppo di prospettive di prodotto, architettura e test che il metodo porta con sé.'],
    ['Stai standardizzando il modo in cui un team scrive i prompt, e le skill del metodo sono lo standard.'],
  ],
  whenUs: [
    ['La specifica deve fallire nella CI quando un titolo, un link o uno stato è sbagliato, anche se quel giorno nessuno esegue il flusso BMAD.'],
    ['Ti servono id dei requisiti stabili tra gli strumenti, non solo dentro i file delle storie di un metodo.'],
    ['Vuoi un formato ', { a: 'a codice aperto', href: repo, kind: 'us' }, ' a cui un altro processo possa puntare.'],
  ],
  bridgeTitle: 'Il metodo può scrivere il formato.',
  bridge: [
    [
      'BMAD risponde a «come conduciamo il lavoro». SpecScore risponde a «quale file è il contratto, e come fa la CI a sapere che è intatto». Un team può tenere il PRD e le storie di BMAD per la conversazione, e una funzionalità SpecScore per i requisiti che devono passare il lint.',
    ],
    [
      'Usa il BMAD Method per il ciclo. Usa SpecScore per l’artefatto che la pull request controlla.',
    ],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD — licenza MIT' },
    { href: workflow, label: 'Mappa del flusso BMAD (main, letta il 30 ottobre 2026)' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore — flusso CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
