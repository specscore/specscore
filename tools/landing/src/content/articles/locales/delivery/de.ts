import type { DeliveryCopy } from '../../delivery.ts';
export const copy: DeliveryCopy = {
  title: 'Dein Projekt ist spezifiziert. Was stellst du diese Woche fertig?',
  description: 'Aus der Spezifikation wird ein Wochenziel: ein Ergebnis für Nutzer wählen, Zeit reservieren, Nachweise prüfen und die nächste Entscheidung treffen.',
  promoTitle: 'Definiere Erfolg. Schaffe dann Platz dafür.',
  promoBody: 'SpecScore legt fest, wann dein Projekt fertig ist. Ein Wochenziel hilft dir, den nächsten Schritt zu wählen. Verbinde beides mit einer kurzen Prüfung der Ergebnisse.',
  readArticle: 'Das nächste fertige Ergebnis wählen', explore: 'CommittedMe kennenlernen (auf Englisch)', breadcrumb: 'Artikel',
  relatedTitle: 'Das Ergebnis überprüfbar machen', relatedLink: 'Überprüfbare Akzeptanzkriterien schreiben',
  intro: 'Eine Spezifikation kann vollständig sein, während das Projekt stillsteht. Die Anforderungen sind klar, der Agent hat einen Plan, und die Aufgabenliste wächst. Vielleicht fehlt eine kleinere Entscheidung: Welches nützliche Ergebnis wirst du diese Woche fertigstellen, und was lässt du dafür liegen? Diese Rückschau funktioniert mit einem Kollegen, einem Mentor oder einem Notizbuch.',
  sections: [
    { title: 'Wähle ein Nutzerergebnis statt eines Aufgabenstapels', paragraphs: [
      'Nimm ein Akzeptanzkriterium und mache daraus eine kurze Vorführung. Beim CSV-Import beschreibt „Parser implementieren“ eine Tätigkeit. „Eine Person importiert eine gültige Datei, sieht die Datensätze und erhält bei einer ungültigen Zeile eine hilfreiche Fehlermeldung“ beschreibt etwas Prüfbares. Behalte den Fehlerfall bei: Ihn wegen eines Termins zu streichen verändert die Zusage.',
      'SpecScore strukturiert Anforderungen und Akzeptanzkriterien in Dateien, die dein Team und deine Agenten lesen können. Verweise in der Wochennotiz darauf. Die Spezifikation definiert weiterhin korrektes Verhalten; die Notiz wählt einen überschaubaren Ausschnitt. Eine zweite Kopie oder ein neues Projektmanagementsystem ist unnötig.'
    ] },
    { title: 'Plane mit deinem tatsächlichen Kalender', paragraphs: [
      'Notiere die konzentrierten Arbeitsblöcke, die wirklich verfügbar sind, einschließlich Review und Integration. Zwei Abende sind keine fünf Arbeitstage. Reserviere Zeit für den vollständigen Ablauf und ein unerwartetes Problem. Passt das Ergebnis nicht hinein, wähle vor dem Start einen kleineren, zusammenhängenden Ablauf.',
      'Liste Abhängigkeiten auf, die du nicht kontrollierst. „Warten auf Produktionszugang“ braucht eine verantwortliche Person und einen Entscheidungszeitpunkt. Fehlt der Zugang am Mittwoch noch, entscheide, ob eine lokale Vorführung nützlich ist. Benenne das Ergebnis ehrlich: Eine lokale Demo belegt keine Produktionsreife. Definiere Erfolg am Freitag nicht stillschweigend um.'
    ] },
    { title: 'Begrenze Agentenaufgaben; behalte die Entscheidung', paragraphs: [
      'Ein Agent kann mehrere Implementierungen erzeugen, während du noch entscheidest, welches Problem wichtig ist. Mehr erledigte Teilaufgaben können das eigentliche Ziel deshalb unberührt lassen. Gib jeder Aufgabe ein konkretes Kriterium, einen erlaubten Umfang und die zurückzuliefernden Nachweise. Ein Mensch bleibt für die Abnahme des gesamten Nutzerablaufs verantwortlich.',
      'Notiere neue Ideen, ohne sie automatisch zu starten. Frage, welches bestehende Ziel sie ersetzen würden. Als Experiment kannst du jeweils nur ein Ergebnis auf deine abschließende Prüfung warten lassen. Das ist ein Versuch für mehr Fokus, keine allgemeingültige Produktivitätsregel; passe ihn an, wenn er nützliche Arbeit ausbremst.'
    ] },
    { title: 'Prüfe die Nachweise vor der Geschichte', paragraphs: [
      'Öffne beim Review zuerst das tatsächliche Ergebnis: den funktionierenden Import, den Test mit ungültigen Eingaben oder die veröffentlichte Dokumentation. Gehe den Ablauf wie ein Nutzer durch und vergleiche ihn mit dem gewählten Kriterium. Commit-Zahlen, Arbeitsstunden und selbstbewusste Agentenberichte liefern Kontext, keine Abnahmenachweise.',
      'Trenne Implementierung, Tests und die tatsächliche Nutzbarkeit in der vorgesehenen Umgebung. Bitte die prüfende Person, einen möglichen Fehler zu finden. Teile nur das Nötige: Ein synthetisches Beispiel oder eine bereinigte Demo reicht oft aus. Verbindliche Rückschau verlangt weder Kundendaten noch Geheimnisse noch Zugriff auf ein privates Repository.'
    ] },
    { title: 'Eine verfehlte Zusage braucht eine neue Entscheidung', paragraphs: [
      'Scheitert die Vorführung, notiere die kleinste hilfreiche Erklärung: unbekannte Abhängigkeit, zu großer Umfang, unterbrochene Arbeitszeit oder falsche Annahme. Mache aus einer Fehlschätzung kein Urteil über deinen Charakter. Wähle eine konkrete Reaktion: kleinerer nächster Schritt, Abhängigkeit klären, Ansatz ändern oder das Projekt bewusst beenden.',
      'Verschiebe dieselbe Zusage nicht aus Gewohnheit unverändert weiter. Vereinbart das nächste beobachtbare Ergebnis und den Reviewtermin. Vergleiche nach einigen Runden Schätzungen mit fertigen Ergebnissen. Die Aufzeichnung soll Entscheidungen verbessern, keine Erfolgsserie schützen.'
    ] }
  ],
  reviewTitle: 'Eine Wochenrückschau in fünf Zeilen',
  reviewLines: ['Ergebnis: Was kann ein Nutzer bis zum Reviewtermin tun?', 'Nachweis: Welches Kriterium und welche Vorführung belegen es?', 'Zeit: Wann werde ich bauen, testen und prüfen?', 'Grenze: Was verschiebe ich, und welche Abhängigkeit braucht eine Entscheidung?', 'Review: Wer sieht das Ergebnis wann an, und welche Entscheidung folgt?'],
  ctaTitle: 'Lass einen Menschen auf deine Entscheidungen schauen',
  ctaBody: 'Nutze diese Notiz mit jemandem, der nachfragt, was passiert ist, und die nächste Entscheidung mit dir prüft. CommittedMe konzentriert sich auf menschliches Mentoring und Verbindlichkeit. Die Seite für Entwickler und Gründer stellt diesen Ansatz vor. Lass die Spezifikation im Repository und bring ein Ziel mit, das du ohne vertrauliche Informationen besprechen kannst.',
  mentorBody: "Erklärst du Entwicklung bereits auf YouTube, TikTok, Instagram oder in einem Blog? Wer Abwägungen und Tests erklärt, entdeckt dabei eigene Annahmen. Die Fragen anderer können dir beim Weiterlernen helfen, während sie Fortschritte machen. Wenn dich solche Gespräche interessieren, lies mehr über die Rolle als Mentor.",
  mentorLink: "Mehr über die Mentorenrolle (auf Englisch)",
  disclosure: 'CommittedMe ist ein weiteres Produkt unseres Ökosystems. Dieser Artikel beschreibt eine Reviewpraxis und setzt keine Integration mit SpecScore voraus.'
};
