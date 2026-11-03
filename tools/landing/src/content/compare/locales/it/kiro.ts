import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Alternativa a Kiro: SpecScore rispetto alle Kiro specs.',
  metaDescription:
    'SpecScore rispetto a Kiro. Kiro è l’IDE agentico di AWS che scrive requisiti EARS. SpecScore è un formato di specifica aperto che la tua CI può sottoporre a lint. Verificato il 30 ottobre 2026.',
  h1: 'SpecScore vs Kiro',
  hero: [
    { a: 'Sviluppo guidato dalle specifiche', href: '/it/spec-driven-development/' },
    ' (SDD) significa scrivere che cosa deve fare il software prima che un agente IA scriva il codice. ',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ', di Amazon Web Services (AWS), è un ambiente di sviluppo agentico — un editor, un’',
    { a: 'interfaccia a riga di comando', href: '/it/cli/' },
    ' (CLI) e un’app web — che trasforma un prompt in Kiro specs: requisiti, una progettazione e attività. Quei requisiti usano ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    ' (Easy Approach to Requirements Syntax), frasi della forma «WHEN accade qualcosa, THE SYSTEM SHALL fare qualcosa». ',
    { a: 'SpecScore', href: '/it/' },
    ' è un formato ',
    { a: 'a codice aperto', href: repo, kind: 'us' },
    ' per la specifica stessa, più una CLI che controlla i file. L’',
    { a: 'integrazione continua', href: '/it/validators/' },
    ' (CI) — un controllo automatico su ogni modifica proposta — può rifiutare una specifica SpecScore che rompe il formato.',
  ],
  shared: [
    ['Entrambi trattano una specifica scritta come ciò da cui un agente deve costruire, non come la trascrizione di una chat.'],
    ['Entrambi tengono quella specifica come Markdown nel progetto, così si può revisionare come il codice.'],
    ['Entrambi spezzano il lavoro in requisiti, una progettazione e attività. Kiro genera quei tre file. SpecScore è un formato che un team può conservare quando la sessione finisce.'],
  ],
  creditTitle: 'Cosa fa bene Kiro.',
  creditNote: [
    'La documentazione di Kiro, letta il 30 ottobre 2026, descrive il prodotto. La pagina delle specifiche di funzionalità risultava aggiornata il 4 agosto 2026.',
  ],
  credits: [
    {
      title: 'Requisiti in una forma di frase fissa',
      body: [
        'Le Kiro specs mettono il comportamento in ',
        { c: 'requirements.md' },
        ' con un modello EARS: WHEN vale una condizione, THE SYSTEM SHALL fare una cosa. La documentazione fa l’esempio di un modulo con dati non validi, e il sistema mostra un errore di validazione accanto al campo. Quella forma è più facile da verificare di un paragrafo vago.',
      ],
    },
    {
      title: 'Un percorso completo dal prompt alle attività',
      body: [
        'Una specifica di funzionalità passa per requisiti, progettazione (',
        { c: 'design.md' },
        ') e attività (',
        { c: 'tasks.md' },
        '). Puoi partire dai requisiti o da una progettazione. Quick Spec esegue tutte e tre senza una sosta di approvazione in mezzo. Le Bugfix specs sono un percorso a parte. La documentazione descrive anche l’esecuzione di attività indipendenti in parallelo, a ondate, a partire dal grafo delle dipendenze in ',
        { c: 'tasks.md' },
        '.',
      ],
    },
    {
      title: 'Controlli dentro il prodotto',
      body: [
        'Analyze Requirements, disponibile nell’IDE e nella CLI, cerca incoerenze, ambiguità, vincoli in conflitto e lacune prima della progettazione. Correctness — test basati sulle proprietà ricavati da quelle righe EARS — è indicato solo per l’IDE, non per la CLI, il web o il mobile, nella tabella delle capacità delle specs.',
      ],
    },
  ],
  tableNote: 'Kiro è un prodotto che stende specifiche. SpecScore è il formato che un repository può controllare. La tabella confronta questi ruoli.',
  tableLabel: 'Confronto delle funzionalità SpecScore vs Kiro',
  rows: [
    {
      cap: 'Ruolo principale',
      them: ['IDE agentico, CLI e app web che stendono specifiche e implementano le attività'],
      us: [{ s: 'Formato di specifica aperto + CLI' }],
    },
    {
      cap: 'File della specifica',
      them: [{ c: 'requirements.md' }, ' (oppure ', { c: 'bugfix.md' }, '), ', { c: 'design.md' }, ', ', { c: 'tasks.md' }],
      us: [{ s: 'Un albero spec/' }, ' di Markdown + YAML'],
    },
    {
      cap: 'Sintassi dei requisiti',
      them: ['Modello EARS: WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: 'Id dei requisiti' },
        ' (',
        { c: 'REQ: slug' },
        ') e criteri di accettazione ',
        { a: 'Dato/Quando/Allora', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Controllare la specifica',
      them: ['Analyze Requirements nell’IDE e nella CLI. Test basati sulle proprietà nell’IDE. Non è descritto come un linter di formato per la tua CI.'],
      us: [
        { s: 'specscore spec lint' },
        ' nella CI. ',
        { c: '/score' },
        ' è una valutazione IA separata e manuale.',
      ],
    },
    {
      cap: 'Dove gira',
      them: ['Kiro IDE, Kiro CLI, Kiro web. Alcuni controlli sono solo nell’IDE.'],
      us: [{ s: 'Qualsiasi repository' }, ' — un binario Go, senza account Kiro'],
    },
    {
      cap: 'Licenza',
      them: [
        'La ',
        { a: 'licenza di Kiro', href: 'https://kiro.dev/license/', kind: 'them' },
        ' dice che l’IDE e la CLI sono AWS Content secondo l’AWS Customer Agreement. Kiro Crew è un ',
        { a: 'repository pubblico', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
        ' a parte.',
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
        'Un piano gratuito e piani a pagamento. Le cifre cambiano — vedi i ',
        { a: 'prezzi di Kiro', href: 'https://kiro.dev/pricing/', kind: 'them' },
        ', letti il 30 ottobre 2026.',
      ],
      us: [{ s: 'Nessun costo' }, ' per il formato né per la CLI'],
    },
  ],
  diffs: [
    {
      title: 'Il formato fa fallire la CI da solo',
      terminal: true,
      body: [
        'L’analisi di Kiro gira dentro Kiro. Il controllo di SpecScore è un comando. Il ',
        { a: 'flusso dogfood', href: dogfood, kind: 'us' },
        ' di questo repository esegue ',
        { c: 'specscore spec lint' },
        ' su ogni pull request e su main. Una specifica rotta fa fallire l’esecuzione come farebbe un test rotto. La skill ',
        { a: '/score', href: score, kind: 'us' },
        ' valuta la formulazione con revisori IA; quel passaggio è manuale, e il flusso sopra non lo esegue.',
      ],
    },
    {
      title: 'La specifica non è legata a un solo IDE',
      body: [
        'Le Kiro specs sono Markdown, quindi puoi leggerle senza il prodotto. Il flusso che le crea e le esegue è quello di Kiro. Un albero SpecScore sono gli stessi file per Claude Code, Cursor, Copilot o nessun agente — la CLI non chiama un modello per il lint.',
      ],
    },
    {
      title: 'I requisiti tengono un id',
      body: [
        'La documentazione di Kiro descrive la tracciabilità come seguire un requisito attraverso l’implementazione. Non descrive un id stabile che sopravviva a una riscrittura. SpecScore indica un requisito come ',
        { c: 'REQ: slug' },
        ' e un criterio di accettazione tramite il proprio id.',
      ],
    },
    {
      title: 'EARS e Dato/Quando/Allora rispondono a domande diverse',
      body: [
        'EARS, come lo documenta Kiro, è una frase di comportamento del sistema. I criteri di accettazione di SpecScore sono scenari Dato/Quando/Allora legati a un id di requisito. Puoi scrivere una riga EARS nella prosa e tenere comunque lo scenario nel file SpecScore che il linter controlla.',
      ],
    },
  ],
  whenThemTitle: 'Scegli Kiro quando…',
  whenThem: [
    ['Vuoi un IDE agentico AWS che stenda requisiti, progettazione e attività a partire da un prompt e poi implementi le attività.'],
    ['Vuoi frasi EARS e, nell’IDE, test basati sulle proprietà generati da esse.'],
    ['Il tuo team si sta già standardizzando sull’editor, sulla CLI o sull’app web di Kiro.'],
  ],
  whenUs: [
    ['La specifica deve restare valida nella CI dopo la fine della sessione dell’agente, in un repository che non richiede Kiro.'],
    ['Ti servono id dei requisiti, lo stato del ciclo di vita e un risultato di lint deterministico.'],
    ['Vuoi il formato ', { a: 'a codice aperto', href: repo, kind: 'us' }, ' e un verificatore che sia un solo binario.'],
  ],
  bridgeTitle: 'Kiro può stendere la bozza. SpecScore può fare da sbarramento.',
  bridge: [
    [
      'Niente di quanto scritto qui sostituisce l’editor di Kiro. Se Kiro è dove il team scrive il prompt, lascia che stenda la bozza. Se la specifica deve sopravvivere come file revisionato, scrivi quel contratto in SpecScore e lascia che ',
      { c: 'specscore spec lint' },
      ' faccia fallire la pull request quando la struttura si rompe. I due file possono stare nello stesso repository.',
    ],
    [
      'Scegli Kiro per la sessione. Scegli SpecScore per l’artefatto che un’esecuzione di CI può rifiutare.',
    ],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Documentazione Kiro — Specs' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Documentazione Kiro — specifiche di funzionalità ed EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro — Informazioni' },
    { href: 'https://kiro.dev/license/', label: 'Kiro — Licenza' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro — Prezzi' },
    { href: dogfood, label: 'specscore/specscore — flusso CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};
