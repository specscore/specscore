import type { DeliveryCopy } from '../../delivery.ts';
export const copy: DeliveryCopy = {
  title: 'Il progetto è specificato. Che cosa finirai questa settimana?',
  description: 'Dalla specifica a un impegno settimanale: scegli un risultato per l’utente, riserva tempo e verifica le prove prima della prossima decisione.',
  promoTitle: 'Definisci il successo. Poi fagli spazio.',
  promoBody: 'SpecScore definisce quando il progetto è finito. Un impegno settimanale ti aiuta a scegliere il passo successivo. Collega i due con una breve verifica dei risultati.',
  readArticle: 'Scegli il prossimo risultato da completare', explore: 'Scopri CommittedMe (in inglese)', breadcrumb: 'Articoli',
  relatedTitle: 'Rendi verificabile il risultato', relatedLink: 'Scrivere criteri di accettazione verificabili',
  intro: 'Una specifica può essere completa mentre il progetto resta fermo. I requisiti sono chiari, l’agente ha un piano e le attività continuano ad aumentare. Forse manca una decisione più piccola: quale risultato utile finirai questa settimana, e che cosa smetterai di fare per trovargli spazio? Puoi svolgere questa revisione con un collega, un mentore o un quaderno.',
  sections: [
    { title: 'Scegli un risultato per l’utente, non un mucchio di attività', paragraphs: [
      'Parti da un criterio di accettazione e trasformalo in una breve dimostrazione. Per un’importazione CSV, «implementare il parser» descrive lavoro. «L’utente importa un file valido, vede i record e riceve un errore utile per una riga non valida» descrive qualcosa da verificare. Mantieni il caso di errore: eliminarlo per rispettare una scadenza cambia la promessa.',
      'SpecScore organizza requisiti e criteri di accettazione in file leggibili dal team e dagli agenti. Riporta i riferimenti nella nota settimanale. La specifica continua a definire il comportamento corretto; la nota ne seleziona una parte gestibile. Non servono una copia della specifica o un altro sistema di gestione progetti.'
    ] },
    { title: 'Pianifica sul calendario reale', paragraphs: [
      'Scrivi i blocchi di lavoro concentrato davvero disponibili, includendo revisione e integrazione. Due serate non sono cinque giornate lavorative. Riserva tempo per provare il percorso completo e affrontare un imprevisto. Se il risultato non ci sta, scegli un percorso coerente più piccolo prima di iniziare.',
      'Elenca le dipendenze che non controlli. «In attesa dell’accesso alla produzione» richiede un responsabile e un momento di decisione. Se mercoledì l’accesso manca ancora, decidi se è utile una dimostrazione locale. Descrivi onestamente il risultato: una demo locale non dimostra che tutto sia pronto per la produzione. Non ridefinire il successo di nascosto venerdì.'
    ] },
    { title: 'Delimita il lavoro degli agenti; conserva la decisione', paragraphs: [
      'Un agente può produrre diverse implementazioni mentre stai ancora scegliendo il problema importante. Più sottoattività completate possono quindi lasciare intatto l’obiettivo iniziale. Assegna a ogni attività un criterio preciso, un ambito consentito e le prove da restituire. Una persona resta responsabile dell’accettazione dell’intero percorso utente.',
      'Quando arriva un’idea nuova, annotala senza avviarla automaticamente. Chiedi quale impegno sostituirebbe. Puoi provare a tenere un solo risultato in attesa della tua revisione finale. È un esperimento di concentrazione, non una regola universale: cambialo se le prove mostrano che rallenta il lavoro utile.'
    ] },
    { title: 'Esamina le prove prima del racconto', paragraphs: [
      'Durante la revisione apri prima il risultato concreto: l’importazione funzionante, il test con input errato o la documentazione pubblicata. Segui gli stessi passi di un utente e confronta il risultato con il criterio scelto. Numero di commit, ore lavorate e riepiloghi sicuri degli agenti forniscono contesto, non prove di accettazione.',
      'Distingui ciò che è implementato, ciò che è stato testato e ciò che si può usare nell’ambiente previsto. Chiedi a chi verifica di trovare un modo per far fallire il risultato. Condividi solo il necessario: spesso basta un esempio sintetico o una dimostrazione ripulita. Rendere conto degli impegni non richiede dati dei clienti, segreti o un repository privato.'
    ] },
    { title: 'Un impegno mancato richiede una nuova decisione', paragraphs: [
      'Se la dimostrazione fallisce, scrivi la spiegazione utile più breve: dipendenza ignota, ambito eccessivo, tempo interrotto o ipotesi sbagliata. Non trasformare un errore di stima in un giudizio sul tuo carattere. Scegli una risposta concreta: ridurre il prossimo passo, risolvere la dipendenza, cambiare approccio o fermare consapevolmente il progetto.',
      'Non spostare lo stesso impegno invariato per abitudine. Concorda il prossimo risultato osservabile e la data di revisione. Dopo alcuni cicli confronta le stime con ciò che hai concluso. Il registro serve a decidere meglio, non a difendere una serie di successi.'
    ] }
  ],
  reviewTitle: 'Copia questa revisione settimanale in cinque righe',
  reviewLines: ['Risultato: cosa potrà fare un utente entro la revisione?', 'Prove: quale criterio e quale dimostrazione lo confermeranno?', 'Tempo: quando realizzerò, testerò e rivedrò il lavoro?', 'Vincolo: cosa rinvio e quale dipendenza richiede una decisione?', 'Revisione: chi guarderà il risultato, quando e quale decisione seguirà?'],
  ctaTitle: 'Affida le tue decisioni a un confronto umano',
  ctaBody: 'Usa questa nota con qualcuno che chieda cosa è successo e ti aiuti a esaminare la prossima scelta. CommittedMe si concentra su mentoring umano e responsabilità verso gli impegni. La pagina per sviluppatori e fondatori presenta questo approccio. Conserva la specifica nel repository e porta un obiettivo che puoi discutere senza rivelare lavoro riservato.',
  mentorBody: "Insegni già sviluppo su YouTube, TikTok, Instagram o un blog? Spiegare compromessi e test a un’altra persona può far emergere le tue ipotesi; le sue domande possono aiutarti a continuare a imparare mentre lei progredisce. Se ti interessa questo confronto, leggi cosa significa diventare mentore.",
  mentorLink: "Leggi come diventare mentore (in inglese)",
  disclosure: 'CommittedMe è un altro prodotto del nostro ecosistema. L’articolo descrive una pratica di revisione, senza implicare un’integrazione con SpecScore.'
};
