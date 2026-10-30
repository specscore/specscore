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
  metaTitle: 'Alternativa a Task Master AI: SpecScore rispetto a Task Master.',
  metaDescription:
    'SpecScore rispetto a Task Master AI. Task Master scompone un documento dei requisiti di prodotto in attività per agenti di programmazione. SpecScore è il formato di specifica che la CI può sottoporre a lint. Verificato il 30 ottobre 2026.',
  h1: 'SpecScore vs Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    ' (il pacchetto ',
    { c: 'task-master-ai' },
    ', chiamato anche Taskmaster) è un gestore di attività per agenti di programmazione IA. Un documento dei requisiti di prodotto (PRD) è un documento in prosa di che cosa costruire; il README di Task Master dice di metterne uno in ',
    { c: '.taskmaster/docs/prd.txt' },
    ' e di analizzarlo per ricavarne attività. Lo ',
    { a: 'sviluppo guidato dalle specifiche', href: '/it/spec-driven-development/' },
    ' (SDD) è la pratica di specificare il comportamento prima del codice. ',
    { a: 'SpecScore', href: '/it/' },
    ' è un formato ',
    { a: 'a codice aperto', href: repo, kind: 'us' },
    ' per quella specifica, più un’',
    { a: 'interfaccia a riga di comando', href: '/it/cli/' },
    ' (CLI) che la controlla. L’',
    { a: 'integrazione continua', href: '/it/validators/' },
    ' (CI) — un controllo automatico su ogni modifica proposta — esegue quel controllo in questo repository. Task Master non pubblica un formato di specifica che la CI possa sottoporre a lint.',
  ],
  shared: [
    ['Entrambi danno per scontato che un agente IA non debba inventare l’intero lavoro da un prompt di una riga.'],
    ['Entrambi tengono il proprio stato nel repository così la sessione successiva può vederlo.'],
    ['Entrambi possono dire a un agente che cosa fare dopo, invece di rileggere l’intero progetto.'],
  ],
  creditTitle: 'Cosa fa bene Task Master AI.',
  creditNote: [
    'I fatti sotto vengono dal README del progetto e dall’indice della documentazione, letti il 30 ottobre 2026. I conteggi degli strumenti e gli elenchi dei modelli in quel README cambiano spesso, quindi non si ripetono qui.',
  ],
  credits: [
    {
      title: 'Un PRD diventa un elenco di attività',
      body: [
        'Il percorso del README è concreto: ',
        { c: 'task-master parse-prd' },
        ' legge un PRD e genera attività. ',
        { c: 'task-master next' },
        ' indica l’attività successiva. ',
        { c: 'task-master expand' },
        ' scompone un’attività. I tag spostano il lavoro tra flussi. È uno strato utile quando sai già che cosa stai costruendo.',
      ],
    },
    {
      title: 'Compare dentro l’editor',
      body: [
        'L’installazione consigliata è un server Model Context Protocol (MCP) — un piccolo programma che l’editor chiama — tramite ',
        { c: 'npx -y task-master-ai' },
        ', inclusa un’installazione in un passo per Cursor e una riga ',
        { c: 'claude mcp add' },
        ' per Claude Code. L’agente poi analizza, elenca e aggiorna le attività senza un pannello separato.',
      ],
    },
    {
      title: 'Ricerca con il progetto come contesto',
      body: [
        { c: 'task-master research' },
        ' è documentato come modo per chiedere a un modello di una libreria o di una migrazione usando il progetto attuale come contesto. Sono supportati diversi fornitori di modelli. Il README dice che i comandi che chiamano un modello hanno bisogno di una chiave API, a meno che tu non usi i percorsi Claude Code o Codex CLI che elenca.',
      ],
    },
  ],
  tableNote: 'Task Master gestisce attività. SpecScore è la specifica che quelle attività possono citare. La tabella confronta questi ruoli.',
  tableLabel: 'Confronto delle funzionalità SpecScore vs Task Master AI',
  rows: [
    {
      cap: 'Ruolo principale',
      them: ['Elenco di attività per agenti di programmazione IA, ricavato analizzando un PRD'],
      us: [{ s: 'Formato di specifica aperto + CLI' }],
    },
    {
      cap: 'Ingresso',
      them: ['PRD in prosa, documentato in .taskmaster/docs/prd.txt'],
      us: [{ s: 'Markdown + YAML strutturati' }, ' con sezioni obbligatorie'],
    },
    {
      cap: 'Che cosa ottieni',
      them: ['Attività, dipendenze, tag e un puntatore all’«attività successiva»'],
      us: [{ s: 'Requisiti, criteri di accettazione, piani e attività' }, ' che citano id dei requisiti'],
    },
    {
      cap: 'Controllare la specifica',
      them: ['Nessun linter documentato per il PRD. Il modello analizza testo libero.'],
      us: [
        { s: 'specscore spec lint' },
        ' nella CI. ',
        { c: '/score' },
        ' è una valutazione IA manuale della formulazione.',
      ],
    },
    {
      cap: 'Ambiente di esecuzione',
      them: ['Node.js, di solito attraverso il server MCP. Le chiamate al modello hanno bisogno di una chiave del fornitore o di una Claude Code / Codex CLI locale, secondo il README.'],
      us: [{ s: 'Un solo binario Go' }, '. Il lint non chiama un modello.'],
    },
    {
      cap: 'Licenza',
      them: [
        'Il ',
        { a: 'repository pubblico', href: tm, kind: 'them' },
        ' è ',
        { a: 'MIT più una Commons Clause', href: tmLicense, kind: 'them' },
        '. Il README dice che puoi usarlo e modificarlo, e che non puoi vendere Task Master in sé né offrirlo come servizio ospitato.',
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
      title: 'Un PRD non è una specifica sottoponibile a lint',
      terminal: true,
      body: [
        'La qualità di Task Master dipende da quanto è dettagliato il PRD — il README lo dice. Niente in quel README controlla la struttura del PRD prima che il modello lo analizzi. SpecScore rifiuta una funzionalità a cui manca una sezione obbligatoria. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' esegue ',
        { c: 'specscore spec lint' },
        ' su ogni pull request. La skill ',
        { a: '/score', href: score, kind: 'us' },
        ' è un secondo passaggio, manuale, sulla formulazione. Non è il comando di CI.',
      ],
    },
    {
      title: 'Le attività possono citare un requisito',
      body: [
        'Task Master dà alle attività id numerici e dipendenze. SpecScore dà ai requisiti id stabili (',
        { c: 'REQ: slug' },
        '). Un’attività del piano può nominare il criterio che soddisfa, e un trailer di commit può nominarlo di nuovo. L’elenco delle attività e la specifica smettono di essere due documenti senza rapporto.',
      ],
    },
    {
      title: 'Il lint non ha bisogno di una chiave API',
      body: [
        'Analizzare un PRD in Task Master chiama un modello. Controllare un albero SpecScore no. La CLI è un binario Go da ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ', quindi la CI può eseguirlo senza un account del fornitore.',
      ],
    },
  ],
  whenThemTitle: 'Scegli Task Master AI quando…',
  whenThem: [
    ['Hai già un PRD e vuoi che un agente lo divida in attività ordinate dentro Cursor, Claude Code o un altro client MCP.'],
    ['Vuoi next-task, expand, i tag e la ricerca come comandi dell’editor.'],
    ['Ciò che gestisci è la bacheca delle attività, non un formato di specifica riutilizzabile.'],
  ],
  whenUs: [
    ['I requisiti stessi devono essere strutturati, identificabili, e rifiutati dalla CI quando rompono il formato.'],
    ['Non vuoi una chiamata a un modello sul percorso che decide se la specifica è ben formata.'],
    ['Vuoi il formato ', { a: 'a codice aperto', href: repo, kind: 'us' }, ' sotto CC BY 4.0, con una CLI Apache-2.0.'],
  ],
  bridgeTitle: 'Ricava le attività da una specifica che passa già il lint.',
  bridge: [
    [
      'Task Master è una bacheca di attività solida. Non è un linguaggio di specifica. Scrivi il comportamento in SpecScore, lascia che la CI faccia il lint, e punta l’elenco delle attività agli id ',
      { c: 'REQ: slug' },
      '. Se vuoi comunque gli strumenti da editor di Task Master, dagli un PRD generato da una specifica che ha già superato ',
      { c: 'specscore spec lint' },
      '.',
    ],
    [
      'Usa Task Master AI per mettere in sequenza il lavoro. Usa SpecScore perché il lavoro abbia un contratto.',
    ],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master — MIT più Commons Clause' },
    { href: tmDocs, label: 'Documentazione Task Master (tryhamster.com)' },
    { href: dogfood, label: 'specscore/specscore — flusso CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
