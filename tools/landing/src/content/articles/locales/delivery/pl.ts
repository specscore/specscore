import type { DeliveryCopy } from '../../delivery.ts';
export const copy: DeliveryCopy = {
  title: 'Projekt ma specyfikację. Co ukończysz w tym tygodniu?',
  description: 'Zamień specyfikację w tygodniowe zobowiązanie: wybierz efekt dla użytkownika, zarezerwuj czas i oceń dowody przed kolejną decyzją.',
  promoTitle: 'Zdefiniuj sukces. Potem zrób na niego miejsce.',
  promoBody: 'SpecScore określa, kiedy projekt jest gotowy. Tygodniowe zobowiązanie pomaga wybrać następny krok. Połącz je krótkim przeglądem wyników.',
  readArticle: 'Wybierz następny efekt do ukończenia', explore: 'Poznaj CommittedMe (po angielsku)', breadcrumb: 'Artykuły',
  relatedTitle: 'Niech wynik da się sprawdzić', relatedLink: 'Pisanie sprawdzalnych kryteriów akceptacji',
  intro: 'Specyfikacja może być kompletna, a projekt nadal stać w miejscu. Wymagania są jasne, agent ma plan, lista zadań rośnie. Być może brakuje mniejszej decyzji: jaki użyteczny wynik ukończysz w tym tygodniu i z czego zrezygnujesz, by znaleźć na niego czas? Taki przegląd możesz przeprowadzić z kolegą, mentorem albo notesem.',
  sections: [
    { title: 'Wybierz efekt dla użytkownika, a nie stos zadań', paragraphs: [
      'Weź jedno kryterium akceptacji i zamień je w krótką demonstrację. Przy imporcie CSV „zaimplementować parser” opisuje pracę. „Użytkownik importuje poprawny plik, widzi rekordy i otrzymuje pomocny błąd dla niepoprawnego wiersza” opisuje sprawdzalny wynik. Zachowaj ścieżkę błędu: usunięcie jej dla dotrzymania terminu zmienia obietnicę.',
      'SpecScore porządkuje wymagania i kryteria akceptacji w plikach czytelnych dla zespołu i agentów. W notatce tygodniowej odwołuj się do tych kryteriów. Specyfikacja nadal definiuje poprawne zachowanie, a notatka wybiera wykonalny fragment. Nie potrzebujesz jej drugiej kopii ani kolejnego systemu zarządzania projektem.'
    ] },
    { title: 'Planuj według rzeczywistego kalendarza', paragraphs: [
      'Zapisz faktycznie dostępne bloki skupionej pracy, uwzględniając przegląd i integrację. Dwa wieczory to nie pięć dni roboczych. Zostaw czas na test całego przebiegu i jeden nieoczekiwany problem. Jeśli wynik się nie mieści, jeszcze przed startem wybierz mniejszy, spójny przebieg.',
      'Wypisz zależności poza twoją kontrolą. „Czekamy na dostęp do produkcji” wymaga właściciela i terminu decyzji. Jeśli w środę nadal go brakuje, zdecyduj, czy lokalna demonstracja będzie przydatna. Nazwij wynik uczciwie: lokalne demo nie dowodzi gotowości produkcyjnej. Nie zmieniaj po cichu definicji sukcesu w piątek.'
    ] },
    { title: 'Ogranicz zakres pracy agentów; zachowaj decyzję', paragraphs: [
      'Agent może przygotować kilka implementacji, zanim zdecydujesz, który problem jest ważny. Więcej wykonanych podzadań nie musi przybliżać pierwotnego celu. Każde zadanie powinno mieć konkretne kryterium, dozwolony zakres i dowody do przekazania. Za akceptację całej ścieżki użytkownika nadal odpowiada człowiek.',
      'Nowy pomysł zapisz, zamiast automatycznie go rozpoczynać. Zapytaj, które zobowiązanie miałby zastąpić. Możesz spróbować dopuszczać tylko jeden wynik oczekujący na twoją końcową ocenę. To eksperyment ze skupieniem, nie uniwersalna reguła produktywności; zmień go, jeśli hamuje użyteczną pracę.'
    ] },
    { title: 'Sprawdź dowody przed opowieścią', paragraphs: [
      'Na przeglądzie najpierw otwórz rzeczywisty rezultat: działający import, test niepoprawnych danych lub opublikowaną dokumentację. Przejdź te same kroki co użytkownik, a potem porównaj efekt z kryterium. Liczba commitów, godziny pracy i pewne siebie raporty agentów to kontekst, nie dowody akceptacji.',
      'Rozdziel to, co zaimplementowano, przetestowano oraz udostępniono w docelowym środowisku. Poproś recenzenta o znalezienie sposobu, w jaki wynik może zawieść. Udostępnij tylko potrzebne informacje: często wystarczy przykład syntetyczny lub demonstracja bez danych poufnych. Odpowiedzialność za zobowiązania nie wymaga danych klientów, sekretów ani prywatnego repozytorium.'
    ] },
    { title: 'Niedotrzymane zobowiązanie wymaga nowej decyzji', paragraphs: [
      'Gdy demonstracja zawiedzie, zapisz najkrótsze użyteczne wyjaśnienie: nieznana zależność, zbyt duży zakres, przerwany czas pracy lub błędne założenie. Nietrafna estymacja nie jest oceną twojego charakteru. Wybierz konkretną odpowiedź: mniejszy kolejny fragment, rozwiązanie zależności, zmianę podejścia lub świadome zakończenie projektu.',
      'Nie przesuwaj tego samego zobowiązania bez zmian tylko z przyzwyczajenia. Uzgodnij następny obserwowalny wynik i termin przeglądu. Po kilku cyklach porównaj szacunki z ukończoną pracą. Zapis ma poprawiać decyzje, a nie chronić serię sukcesów.'
    ] }
  ],
  reviewTitle: 'Skopiuj pięć linijek tygodniowego przeglądu',
  reviewLines: ['Wynik: co użytkownik będzie mógł zrobić w dniu przeglądu?', 'Dowód: jakie kryterium i demonstracja to potwierdzą?', 'Czas: kiedy wykonam, przetestuję i ocenię pracę?', 'Ograniczenie: co odkładam i jaka zależność wymaga decyzji?', 'Przegląd: kto i kiedy obejrzy wynik oraz jaka decyzja nastąpi?'],
  ctaTitle: 'Poddaj swoje decyzje ludzkiej ocenie',
  ctaBody: 'Użyj tej notatki z kimś, kto zapyta o wynik i pomoże przeanalizować kolejny wybór. CommittedMe skupia się na mentoringu prowadzonym przez ludzi i odpowiedzialności za zobowiązania. Strona dla programistów i założycieli przedstawia to podejście. Specyfikację zostaw w repozytorium, a do rozmowy przynieś cel niewymagający ujawniania poufnej pracy.',
  mentorBody: "Uczysz już programowania na YouTube, TikToku, Instagramie lub blogu? Wyjaśnianie kompromisów i testów może ujawnić twoje własne założenia. Pytania innych pomagają dalej się uczyć, gdy oni robią postępy. Jeśli takie rozmowy cię interesują, przeczytaj o roli mentora.",
  mentorLink: "Przeczytaj o roli mentora (po angielsku)",
  disclosure: 'CommittedMe jest kolejnym produktem naszego ekosystemu. Artykuł opisuje praktykę przeglądu i nie sugeruje integracji ze SpecScore.'
};
