"use strict";

const VERB_ITEMS = [
  {
    id: "achten-auf-akk",
    verb: "achten",
    prep: "auf",
    caseKey: "akk",
    sentence: "Achte ___ den Verkehr.",
    sentences: [
      "Achte ___ den Verkehr.",
      "Bitte achten Sie ___ den Gegenverkehr.",
      "Beim Kochen sollte man ___ die Temperatur achten."
    ],
    pattern: "achten auf + Akkusativ"
  },
  {
    id: "warten-auf-akk",
    verb: "warten",
    prep: "auf",
    caseKey: "akk",
    sentence: "Ich warte ___ den Bus.",
    sentences: [
      "Ich warte ___ den Bus.",
      "Wir warten am Bahnhof ___ den nächsten Zug.",
      "Sie wartet seit einer Stunde ___ eine wichtige Antwort."
    ],
    pattern: "warten auf + Akkusativ"
  },
  {
    id: "antworten-auf-akk",
    verb: "antworten",
    prep: "auf",
    caseKey: "akk",
    sentence: "Ich antworte ___ die Nachricht.",
    sentences: [
      "Ich antworte ___ die Nachricht.",
      "Er hat noch nicht ___ meine E-Mail geantwortet.",
      "Können Sie bitte ___ diese Frage antworten?"
    ],
    pattern: "antworten auf + Akkusativ"
  },
  {
    id: "bestehen-auf-dat",
    verb: "bestehen",
    prep: "auf",
    caseKey: "dat",
    sentence: "Ich bestehe ___ einer Erklärung.",
    sentences: [
      "Ich bestehe ___ einer Erklärung.",
      "Der Kunde besteht ___ seinem Recht.",
      "Sie besteht ___ einer pünktlichen Lieferung."
    ],
    pattern: "bestehen auf + Dativ"
  },
  {
    id: "hoffen-auf-akk",
    verb: "hoffen",
    prep: "auf",
    caseKey: "akk",
    sentence: "Wir hoffen ___ den Erfolg.",
    sentences: [
      "Wir hoffen ___ den Erfolg.",
      "Alle hoffen ___ besseres Wetter am Wochenende.",
      "Die Bauern hoffen ___ baldigen Regen."
    ],
    pattern: "hoffen auf + Akkusativ"
  },
  {
    id: "reagieren-auf-akk",
    verb: "reagieren",
    prep: "auf",
    caseKey: "akk",
    sentence: "Wie reagierst du ___ den Vorschlag?",
    sentences: [
      "Wie reagierst du ___ den Vorschlag?",
      "Wie hat der Chef ___ deinen Vorschlag reagiert?",
      "Der Patient reagiert gut ___ das neue Medikament."
    ],
    pattern: "reagieren auf + Akkusativ"
  },
  {
    id: "sich-freuen-auf-akk",
    verb: "sich freuen",
    prep: "auf",
    caseKey: "akk",
    sentence: "Ich freue mich ___ den Urlaub.",
    sentences: [
      "Ich freue mich ___ den Urlaub.",
      "Die Kinder freuen sich schon ___ die Sommerferien.",
      "Ich freue mich sehr ___ unseren nächsten Urlaub."
    ],
    pattern: "sich freuen auf + Akkusativ"
  },
  {
    id: "sich-konzentrieren-auf-akk",
    verb: "sich konzentrieren",
    prep: "auf",
    caseKey: "akk",
    sentence: "Sie konzentriert sich ___ die Aufgabe.",
    sentences: [
      "Sie konzentriert sich ___ die Aufgabe.",
      "In der Bibliothek kann man sich gut ___ die Arbeit konzentrieren.",
      "Bitte konzentrieren Sie sich ___ das wesentliche Thema."
    ],
    pattern: "sich konzentrieren auf + Akkusativ"
  },
  {
    id: "sich-verlassen-auf-akk",
    verb: "sich verlassen",
    prep: "auf",
    caseKey: "akk",
    sentence: "Ich verlasse mich ___ den Plan.",
    sentences: [
      "Ich verlasse mich ___ den Plan.",
      "Du kannst dich immer ___ meine Unterstützung verlassen.",
      "Wir verlassen uns ___ die Zusage unseres Partners."
    ],
    pattern: "sich verlassen auf + Akkusativ"
  },
  {
    id: "sich-vorbereiten-auf-akk",
    verb: "sich vorbereiten",
    prep: "auf",
    caseKey: "akk",
    sentence: "Ich bereite mich ___ die Prüfung vor.",
    sentences: [
      "Ich bereite mich ___ die Prüfung vor.",
      "Die Studenten bereiten sich ___ die schwere Prüfung vor.",
      "Er bereitet sich intensiv ___ das Vorstellungsgespräch vor."
    ],
    pattern: "sich vorbereiten auf + Akkusativ"
  },
  {
    id: "verzichten-auf-akk",
    verb: "verzichten",
    prep: "auf",
    caseKey: "akk",
    sentence: "Ich verzichte ___ den Nachtisch.",
    sentences: [
      "Ich verzichte ___ den Nachtisch.",
      "Ich möchte nicht ___ meinen täglichen Kaffee verzichten.",
      "Für die Umwelt verzichtet sie ___ ihr eigenes Auto."
    ],
    pattern: "verzichten auf + Akkusativ"
  },
  {
    id: "arbeiten-an-dat",
    verb: "arbeiten",
    prep: "an",
    caseKey: "dat",
    sentence: "Ich arbeite ___ dem Projekt.",
    sentences: [
      "Ich arbeite ___ dem Projekt.",
      "Das Entwicklerteam arbeitet ___ einem neuen Software-Update.",
      "Sie arbeitet seit Monaten ___ ihrer Doktorarbeit."
    ],
    pattern: "arbeiten an + Dativ"
  },
  {
    id: "denken-an-akk",
    verb: "denken",
    prep: "an",
    caseKey: "akk",
    sentence: "Denkst du ___ den Termin?",
    sentences: [
      "Denkst du ___ den Termin?",
      "Ich denke oft ___ meine schöne Kindheit.",
      "Hast du ___ den Termin am Nachmittag gedacht?"
    ],
    pattern: "denken an + Akkusativ"
  },
  {
    id: "glauben-an-akk",
    verb: "glauben",
    prep: "an",
    caseKey: "akk",
    sentence: "Wir glauben ___ den Erfolg.",
    sentences: [
      "Wir glauben ___ den Erfolg.",
      "Viele Kinder glauben ___ den Weihnachtsmann.",
      "Man sollte immer ___ den eigenen Erfolg glauben."
    ],
    pattern: "glauben an + Akkusativ"
  },
  {
    id: "leiden-an-dat",
    verb: "leiden",
    prep: "an",
    caseKey: "dat",
    sentence: "Er leidet ___ einer Krankheit.",
    sentences: [
      "Er leidet ___ einer Krankheit.",
      "Der Patient leidet ___ einer chronischen Krankheit.",
      "Im Frühling leiden viele Menschen ___ einer Pollenallergie."
    ],
    pattern: "leiden an + Dativ"
  },
  {
    id: "erkennen-an-dat",
    verb: "erkennen",
    prep: "an",
    caseKey: "dat",
    sentence: "Ich erkenne ihn ___ seiner Stimme.",
    sentences: [
      "Ich erkenne ihn ___ seiner Stimme.",
      "Ich habe ihn sofort ___ seiner tiefen Stimme erkannt.",
      "Man erkennt die reife Frucht ___ ihrer gelben Farbe."
    ],
    pattern: "erkennen an + Dativ"
  },
  {
    id: "schreiben-an-akk",
    verb: "schreiben",
    prep: "an",
    caseKey: "akk",
    sentence: "Sie schreibt ___ den Kunden.",
    sentences: [
      "Sie schreibt ___ den Kunden.",
      "Sie schreibt einen langen Brief ___ ihre alte Freundin.",
      "Er hat gestern eine E-Mail ___ die Personalabteilung geschrieben."
    ],
    pattern: "schreiben an + Akkusativ"
  },
  {
    id: "sich-beteiligen-an-dat",
    verb: "sich beteiligen",
    prep: "an",
    caseKey: "dat",
    sentence: "Sie beteiligt sich ___ dem Gespräch.",
    sentences: [
      "Sie beteiligt sich ___ dem Gespräch.",
      "Viele Bürger beteiligen sich ___ der Suchaktion.",
      "Möchtest du dich ___ den Gesamtkosten beteiligen?"
    ],
    pattern: "sich beteiligen an + Dativ"
  },
  {
    id: "sich-erinnern-an-akk",
    verb: "sich erinnern",
    prep: "an",
    caseKey: "akk",
    sentence: "Er erinnert sich ___ den Namen.",
    sentences: [
      "Er erinnert sich ___ den Namen.",
      "Erinnert ihr euch noch ___ unseren ersten gemeinsamen Urlaub?",
      "Ich kann mich leider nicht ___ seinen Namen erinnern."
    ],
    pattern: "sich erinnern an + Akkusativ"
  },
  {
    id: "sich-gewoehnen-an-akk",
    verb: "sich gewöhnen",
    prep: "an",
    caseKey: "akk",
    sentence: "Ich gewöhne mich ___ den Verkehr.",
    sentences: [
      "Ich gewöhne mich ___ den Verkehr.",
      "Anfangs war es schwer, aber jetzt habe ich mich ___ das kalte Klima gewöhnt.",
      "Man gewöhnt sich schnell ___ den neuen Arbeitsrhythmus."
    ],
    pattern: "sich gewöhnen an + Akkusativ"
  },
  {
    id: "sich-halten-an-akk",
    verb: "sich halten",
    prep: "an",
    caseKey: "akk",
    sentence: "Halte dich ___ den Plan.",
    sentences: [
      "Halte dich ___ den Plan.",
      "Alle Fahrer müssen sich ___ die Geschwindigkeitsbegrenzung halten.",
      "Bitte halten Sie sich ___ den vorgegebenen Plan."
    ],
    pattern: "sich halten an + Akkusativ"
  },
  {
    id: "sich-binden-an-akk",
    verb: "sich binden",
    prep: "an",
    caseKey: "akk",
    sentence: "Er bindet sich nicht gern ___ einen Vertrag.",
    sentences: [
      "Er bindet sich nicht gern ___ einen Vertrag.",
      "Er möchte sich nicht für mehrere Jahre ___ diese Firma binden.",
      "Mit dem Vertrag binden sich beide Parteien ___ die Vereinbarung."
    ],
    pattern: "sich binden an + Akkusativ"
  },
  {
    id: "sich-orientieren-an-dat",
    verb: "sich orientieren",
    prep: "an",
    caseKey: "dat",
    sentence: "Wir orientieren uns ___ dem Beispiel.",
    sentences: [
      "Wir orientieren uns ___ dem Beispiel.",
      "Wir orientieren uns ___ den Wünschen unserer Kundschaft.",
      "Touristen orientieren sich in der Stadt ___ dem Fernsehturm."
    ],
    pattern: "sich orientieren an + Dativ"
  },
  {
    id: "sich-wenden-an-akk",
    verb: "sich wenden",
    prep: "an",
    caseKey: "akk",
    sentence: "Wenden Sie sich ___ den Empfang.",
    sentences: [
      "Wenden Sie sich ___ den Empfang.",
      "Bei technischen Fragen können Sie sich ___ unseren Support wenden.",
      "Er wendete sich hilfesuchend ___ die Polizei."
    ],
    pattern: "sich wenden an + Akkusativ"
  },
  {
    id: "teilnehmen-an-dat",
    verb: "teilnehmen",
    prep: "an",
    caseKey: "dat",
    sentence: "Er nimmt ___ dem Kurs teil.",
    sentences: [
      "Er nimmt ___ dem Kurs teil.",
      "Morgen nehme ich ___ einem wichtigen Seminar teil.",
      "Wer möchte ___ diesem Sprachkurs teilnehmen?"
    ],
    pattern: "teilnehmen an + Dativ"
  },
  {
    id: "sterben-an-dat",
    verb: "sterben",
    prep: "an",
    caseKey: "dat",
    sentence: "Er ist ___ einer Krankheit gestorben.",
    sentences: [
      "Er ist ___ einer Krankheit gestorben.",
      "Der alte Mann starb ___ den Folgen einer Infektion.",
      "Viele Vögel sterben ___ einer gefährlichen Krankheit."
    ],
    pattern: "sterben an + Dativ"
  },
  {
    id: "liegen-an-dat",
    verb: "liegen",
    prep: "an",
    caseKey: "dat",
    sentence: "Es liegt ___ deinem Verhalten.",
    sentences: [
      "Es liegt ___ deinem Verhalten.",
      "Das schlechte Ergebnis liegt ___ der mangelnden Vorbereitung.",
      "Es liegt nicht ___ dir, sondern am Zeitmangel."
    ],
    pattern: "liegen an + Dativ"
  },
  {
    id: "schuld-sein-an-dat",
    verb: "schuld sein",
    prep: "an",
    caseKey: "dat",
    sentence: "Er ist schuld ___ dem Unfall.",
    sentences: [
      "Er ist schuld ___ dem Unfall.",
      "Wer ist schuld ___ dem schweren Unfall auf der Kreuzung?",
      "Sie war gar nicht schuld ___ dem Missverständnis."
    ],
    pattern: "schuld sein an + Dativ"
  },
  {
    id: "zweifeln-an-dat",
    verb: "zweifeln",
    prep: "an",
    caseKey: "dat",
    sentence: "Sie zweifelt ___ der Lösung.",
    sentences: [
      "Sie zweifelt ___ der Lösung.",
      "Manchmal zweifle ich ___ meinen eigenen Fähigkeiten.",
      "Die Richterin zweifelte ___ der Aussage des Zeugen."
    ],
    pattern: "zweifeln an + Dativ"
  },
  {
    id: "sich-entschuldigen-bei-dat",
    verb: "sich entschuldigen",
    prep: "bei",
    caseKey: "dat",
    sentence: "Ich entschuldige mich ___ dem Nachbarn.",
    sentences: [
      "Ich entschuldige mich ___ dem Nachbarn.",
      "Er hat sich persönlich ___ seinem Nachbarn entschuldigt.",
      "Ich möchte mich ___ Ihnen für den Fehler entschuldigen."
    ],
    pattern: "sich entschuldigen bei + Dativ"
  },
  {
    id: "helfen-bei-dat",
    verb: "helfen",
    prep: "bei",
    caseKey: "dat",
    sentence: "Ich helfe dir ___ der Aufgabe.",
    sentences: [
      "Ich helfe dir ___ der Aufgabe.",
      "Kannst du mir kurz ___ den Vorbereitungen helfen?",
      "Der Kollege hilft mir immer ___ der schwierigen Aufgabe."
    ],
    pattern: "helfen bei + Dativ"
  },
  {
    id: "wohnen-bei-dat",
    verb: "wohnen",
    prep: "bei",
    caseKey: "dat",
    sentence: "Wir wohnen ___ meinem Bruder.",
    sentences: [
      "Wir wohnen ___ meinem Bruder.",
      "Während des Studiums wohnte er ___ seinen Großeltern.",
      "Sie wohnt diesen Monat ___ einer guten Freundin."
    ],
    pattern: "wohnen bei + Dativ"
  },
  {
    id: "kaempfen-fuer-akk",
    verb: "kämpfen",
    prep: "für",
    caseKey: "akk",
    sentence: "Wir kämpfen ___ die Freiheit.",
    sentences: [
      "Wir kämpfen ___ die Freiheit.",
      "Die Bürger kämpfen ___ ihre Rechte und Freiheiten.",
      "Die Mannschaft kämpft ___ den ersten Platz in der Liga."
    ],
    pattern: "kämpfen für + Akkusativ"
  },
  {
    id: "danken-fuer-akk",
    verb: "danken",
    prep: "für",
    caseKey: "akk",
    sentence: "Ich danke dir ___ den Hinweis.",
    sentences: [
      "Ich danke dir ___ den Hinweis.",
      "Ich danke dir herzlich ___ deine wertvolle Hilfe.",
      "Wir danken Ihnen ___ die schnelle Bearbeitung."
    ],
    pattern: "danken für + Akkusativ"
  },
  {
    id: "sich-entscheiden-fuer-akk",
    verb: "sich entscheiden",
    prep: "für",
    caseKey: "akk",
    sentence: "Er entscheidet sich ___ den Kurs.",
    sentences: [
      "Er entscheidet sich ___ den Kurs.",
      "Sie hat sich ___ ein Medizinstudium entschieden.",
      "Wir haben uns schlussendlich ___ das blaue Modell entschieden."
    ],
    pattern: "sich entscheiden für + Akkusativ"
  },
  {
    id: "sich-entschuldigen-fuer-akk",
    verb: "sich entschuldigen",
    prep: "für",
    caseKey: "akk",
    sentence: "Ich entschuldige mich ___ den Fehler.",
    sentences: [
      "Ich entschuldige mich ___ den Fehler.",
      "Er entschuldigte sich höflich ___ die späte Ankunft.",
      "Wir möchten uns ___ das Versehen entschuldigen."
    ],
    pattern: "sich entschuldigen für + Akkusativ"
  },
  {
    id: "sich-interessieren-fuer-akk",
    verb: "sich interessieren",
    prep: "für",
    caseKey: "akk",
    sentence: "Lina interessiert sich ___ den Film.",
    sentences: [
      "Lina interessiert sich ___ den Film.",
      "Mein Bruder interessiert sich sehr ___ klassische Musik.",
      "Interessierst du dich ___ fremde Kulturen?"
    ],
    pattern: "sich interessieren für + Akkusativ"
  },
  {
    id: "sorgen-fuer-akk",
    verb: "sorgen",
    prep: "für",
    caseKey: "akk",
    sentence: "Du sorgst ___ den Transport.",
    sentences: [
      "Du sorgst ___ den Transport.",
      "Die Eltern sorgen liebevoll ___ ihre Kinder.",
      "Gute Musik sorgt stets ___ eine hervorragende Stimmung."
    ],
    pattern: "sorgen für + Akkusativ"
  },
  {
    id: "investieren-in-akk",
    verb: "investieren",
    prep: "in",
    caseKey: "akk",
    sentence: "Wir investieren ___ die Weiterbildung.",
    sentences: [
      "Wir investieren ___ die Weiterbildung.",
      "Das Unternehmen investiert viel Kapital ___ neue Technologien.",
      "Es lohnt sich immer, ___ die eigene Ausbildung zu investieren."
    ],
    pattern: "investieren in + Akkusativ"
  },
  {
    id: "sich-verlieben-in-akk",
    verb: "sich verlieben",
    prep: "in",
    caseKey: "akk",
    sentence: "Sie verliebt sich ___ den Nachbarn.",
    sentences: [
      "Sie verliebt sich ___ den Nachbarn.",
      "Er hat sich auf den ersten Blick ___ seine Kollegin verliebt.",
      "Sie verliebten sich im Urlaub ___ diese schöne Insel."
    ],
    pattern: "sich verlieben in + Akkusativ"
  },
  {
    id: "uebersetzen-in-akk",
    verb: "übersetzen",
    prep: "in",
    caseKey: "akk",
    sentence: "Wir übersetzen den Text ___ die deutsche Sprache.",
    sentences: [
      "Wir übersetzen den Text ___ die deutsche Sprache.",
      "Der Roman wurde bereits ___ mehrere Sprachen übersetzt.",
      "Könnten Sie diesen Brief bitte ___ das Deutsche übersetzen?"
    ],
    pattern: "übersetzen in + Akkusativ"
  },
  {
    id: "anfangen-mit-dat",
    verb: "anfangen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Wir fangen ___ dem ersten Kapitel an.",
    sentences: [
      "Wir fangen ___ dem ersten Kapitel an.",
      "Wann fängst du endlich ___ dem neuen Projekt an?",
      "Wir sollten unverzüglich ___ der Arbeit anfangen."
    ],
    pattern: "anfangen mit + Dativ"
  },
  {
    id: "aufhoeren-mit-dat",
    verb: "aufhören",
    prep: "mit",
    caseKey: "dat",
    sentence: "Er hört ___ dem Rauchen auf.",
    sentences: [
      "Er hört ___ dem Rauchen auf.",
      "Hör bitte sofort ___ dem störenden Lärm auf!",
      "Er möchte im neuen Jahr ___ dem Rauchen aufhören."
    ],
    pattern: "aufhören mit + Dativ"
  },
  {
    id: "beginnen-mit-dat",
    verb: "beginnen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Der Kurs beginnt ___ einer Übung.",
    sentences: [
      "Der Kurs beginnt ___ einer Übung.",
      "Der Kurs beginnt morgen ___ einer kurzen Einführung.",
      "Sie beginnt ihren Morgen stets ___ einer Tasse Kaffee."
    ],
    pattern: "beginnen mit + Dativ"
  },
  {
    id: "rechnen-mit-dat",
    verb: "rechnen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Wir rechnen ___ einem guten Ergebnis.",
    sentences: [
      "Wir rechnen ___ einem guten Ergebnis.",
      "Im Winter muss man überall ___ Glatteis rechnen.",
      "Wir hatten ehrlich gesagt nicht ___ dieser Schwierigkeit gerechnet."
    ],
    pattern: "rechnen mit + Dativ"
  },
  {
    id: "sich-beschaeftigen-mit-dat",
    verb: "sich beschäftigen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Sie beschäftigt sich ___ der Aufgabe.",
    sentences: [
      "Sie beschäftigt sich ___ der Aufgabe.",
      "In seiner Freizeit beschäftigt er sich intensiv ___ Geschichte.",
      "Das Buch beschäftigt sich ausführlich ___ diesem Thema."
    ],
    pattern: "sich beschäftigen mit + Dativ"
  },
  {
    id: "sich-treffen-mit-dat",
    verb: "sich treffen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Ich treffe mich ___ einem Freund.",
    sentences: [
      "Ich treffe mich ___ einem Freund.",
      "Ich treffe mich heute Abend ___ alten Schulfreunden.",
      "Sie trifft sich nachmittags ___ ihrer Geschäftspartnerin."
    ],
    pattern: "sich treffen mit + Dativ"
  },
  {
    id: "sprechen-mit-dat",
    verb: "sprechen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Ich spreche ___ meinem Lehrer.",
    sentences: [
      "Ich spreche ___ meinem Lehrer.",
      "Hast du gestern schon ___ dem Vermieter gesprochen?",
      "Ich muss unbedingt ___ meiner Ärztin sprechen."
    ],
    pattern: "sprechen mit + Dativ"
  },
  {
    id: "telefonieren-mit-dat",
    verb: "telefonieren",
    prep: "mit",
    caseKey: "dat",
    sentence: "Sie telefoniert ___ ihrer Mutter.",
    sentences: [
      "Sie telefoniert ___ ihrer Mutter.",
      "Sie telefoniert gerade seit einer Stunde ___ ihrer Mutter.",
      "Gestern habe ich lange ___ einem wichtigen Kunden telefoniert."
    ],
    pattern: "telefonieren mit + Dativ"
  },
  {
    id: "sich-streiten-mit-dat",
    verb: "sich streiten",
    prep: "mit",
    caseKey: "dat",
    sentence: "Ich streite mich ___ meinem Bruder.",
    sentences: [
      "Ich streite mich ___ meinem Bruder.",
      "Er streitet sich leider ständig ___ seinem kleinen Bruder.",
      "Ich möchte mich doch gar nicht ___ dir streiten."
    ],
    pattern: "sich streiten mit + Dativ"
  },
  {
    id: "spielen-mit-dat",
    verb: "spielen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Kinder spielen ___ dem Ball.",
    sentences: [
      "Kinder spielen ___ dem Ball.",
      "Das Kind spielt stundenlang friedlich ___ der Katze.",
      "Die Kinder spielen im Garten ___ einem bunten Ball."
    ],
    pattern: "spielen mit + Dativ"
  },
  {
    id: "diskutieren-mit-dat",
    verb: "diskutieren",
    prep: "mit",
    caseKey: "dat",
    sentence: "Ich diskutiere ___ dem Chef.",
    sentences: [
      "Ich diskutiere ___ dem Chef.",
      "Wir haben ausführlich ___ den Experten diskutiert.",
      "Sie diskutiert oft sachlich ___ ihren Arbeitskollegen."
    ],
    pattern: "diskutieren mit + Dativ"
  },
  {
    id: "verhandeln-mit-dat",
    verb: "verhandeln",
    prep: "mit",
    caseKey: "dat",
    sentence: "Die Firma verhandelt ___ den Partnern.",
    sentences: [
      "Die Firma verhandelt ___ den Partnern.",
      "Die Firma verhandelt aktuell ___ einem neuen Lieferanten.",
      "Der Diplomat verhandelte ___ den Vertretern der Regierung."
    ],
    pattern: "verhandeln mit + Dativ"
  },
  {
    id: "sich-versoehnen-mit-dat",
    verb: "sich versöhnen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Ich habe mich ___ meinem Bruder versöhnt.",
    sentences: [
      "Ich habe mich ___ meinem Bruder versöhnt.",
      "Nach dem Streit hat er sich schnell ___ seiner Frau versöhnt.",
      "Sie möchte sich endlich ___ ihrer früheren Freundin versöhnen."
    ],
    pattern: "sich versöhnen mit + Dativ"
  },
  {
    id: "fragen-nach-dat",
    verb: "fragen",
    prep: "nach",
    caseKey: "dat",
    sentence: "Er fragt ___ dem Weg.",
    sentences: [
      "Er fragt ___ dem Weg.",
      "Der Tourist fragte freundlich ___ dem Weg zum Bahnhof.",
      "Sie fragte am Telefon sofort ___ dem Geschäftsführer."
    ],
    pattern: "fragen nach + Dativ"
  },
  {
    id: "riechen-nach-dat",
    verb: "riechen",
    prep: "nach",
    caseKey: "dat",
    sentence: "Es riecht ___ dem Essen.",
    sentences: [
      "Es riecht ___ dem Essen.",
      "In der ganzen Küche riecht es ___ frischem Kuchen.",
      "Seine Jacke riecht stark ___ Rauch."
    ],
    pattern: "riechen nach + Dativ"
  },
  {
    id: "schmecken-nach-dat",
    verb: "schmecken",
    prep: "nach",
    caseKey: "dat",
    sentence: "Das schmeckt ___ frischem Brot.",
    sentences: [
      "Das schmeckt ___ frischem Brot.",
      "Das Dessert schmeckt angenehm ___ süßer Zitrone.",
      "Das Leitungswasser schmeckt hier etwas ___ Chlor."
    ],
    pattern: "schmecken nach + Dativ"
  },
  {
    id: "sich-erkundigen-nach-dat",
    verb: "sich erkundigen",
    prep: "nach",
    caseKey: "dat",
    sentence: "Er erkundigt sich ___ dem Preis.",
    sentences: [
      "Er erkundigt sich ___ dem Preis.",
      "Er erkundigte sich am Schalter ___ den Abfahrtszeiten.",
      "Sie erkundigt sich im Hotel ___ freien Zimmern."
    ],
    pattern: "sich erkundigen nach + Dativ"
  },
  {
    id: "sich-sehnen-nach-dat",
    verb: "sich sehnen",
    prep: "nach",
    caseKey: "dat",
    sentence: "Ich sehne mich ___ dem Sommer.",
    sentences: [
      "Ich sehne mich ___ dem Sommer.",
      "Im kalten Winter sehnt man sich ___ der warmen Sonne.",
      "Er sehnt sich in der Fremde ___ seiner Heimat."
    ],
    pattern: "sich sehnen nach + Dativ"
  },
  {
    id: "suchen-nach-dat",
    verb: "suchen",
    prep: "nach",
    caseKey: "dat",
    sentence: "Ich suche ___ dem Schlüssel.",
    sentences: [
      "Ich suche ___ dem Schlüssel.",
      "Seit Stunden suchen die Forscher ___ einer passenden Antwort.",
      "Die Polizei sucht weiterhin ___ dem vermissten Zeugen."
    ],
    pattern: "suchen nach + Dativ"
  },
  {
    id: "streben-nach-dat",
    verb: "streben",
    prep: "nach",
    caseKey: "dat",
    sentence: "Wir streben ___ einem besseren Leben.",
    sentences: [
      "Wir streben ___ einem besseren Leben.",
      "Viele junge Menschen streben ___ beruflichem Erfolg.",
      "Der Künstler strebt in seiner Kunst ___ Perfektion."
    ],
    pattern: "streben nach + Dativ"
  },
  {
    id: "benennen-nach-dat",
    verb: "benennen",
    prep: "nach",
    caseKey: "dat",
    sentence: "Die Straße wurde ___ einem Politiker benannt.",
    sentences: [
      "Die Straße wurde ___ einem Politiker benannt.",
      "Die Straße wurde ___ einem berühmten Erfinder benannt.",
      "Man hat das Neugeborene ___ seinem Großvater benannt."
    ],
    pattern: "benennen nach + Dativ"
  },
  {
    id: "beitragen-zu-dat",
    verb: "beitragen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Das trägt ___ einer Lösung bei.",
    sentences: [
      "Das trägt ___ einer Lösung bei.",
      "Jeder Einzelne kann ___ dem Umweltschutz beitragen.",
      "Diese Maßnahme trägt wesentlich ___ der Sicherheit bei."
    ],
    pattern: "beitragen zu + Dativ"
  },
  {
    id: "einladen-zu-dat",
    verb: "einladen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Ich lade dich ___ meiner Party ein.",
    sentences: [
      "Ich lade dich ___ meiner Party ein.",
      "Er hat mich ___ seiner Geburtstagsfeier eingeladen.",
      "Wir möchten Sie herzlich ___ dem Abendessen einladen."
    ],
    pattern: "einladen zu + Dativ"
  },
  {
    id: "fuehren-zu-dat",
    verb: "führen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Das führt ___ einem Problem.",
    sentences: [
      "Das führt ___ einem Problem.",
      "Dieser Weg führt direkt ___ dem alten Schloss.",
      "Unachtsamkeit kann leicht ___ schweren Fehlern führen."
    ],
    pattern: "führen zu + Dativ"
  },
  {
    id: "gehoeren-zu-dat",
    verb: "gehören",
    prep: "zu",
    caseKey: "dat",
    sentence: "Diese Schlüssel gehören ___ dieser Wohnung.",
    sentences: [
      "Diese Schlüssel gehören ___ dieser Wohnung.",
      "Pünktlichkeit gehört ___ den wichtigsten Tugenden.",
      "Gehört dieser Schlüssel ___ der Haustür?"
    ],
    pattern: "gehören zu + Dativ"
  },
  {
    id: "gratulieren-zu-dat",
    verb: "gratulieren",
    prep: "zu",
    caseKey: "dat",
    sentence: "Wir gratulieren dir ___ deinem Erfolg.",
    sentences: [
      "Wir gratulieren dir ___ deinem Erfolg.",
      "Ich gratuliere dir herzlich ___ dem bestandenen Examen.",
      "Alle Kollegen gratulierten ihr ___ der Beförderung."
    ],
    pattern: "gratulieren zu + Dativ"
  },
  {
    id: "passen-zu-dat",
    verb: "passen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Das passt ___ deinem Plan.",
    sentences: [
      "Das passt ___ deinem Plan.",
      "Diese Krawatte passt hervorragend ___ deinem Hemd.",
      "Deine Vorschläge passen gut ___ unseren Plänen."
    ],
    pattern: "passen zu + Dativ"
  },
  {
    id: "sich-entschliessen-zu-dat",
    verb: "sich entschließen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Ich entschließe mich ___ einem Studium.",
    sentences: [
      "Ich entschließe mich ___ einem Studium.",
      "Sie hat sich letztlich ___ einem Umzug nach Berlin entschlossen.",
      "Nach langem Überlegen entschloss er sich ___ einem Neuanfang."
    ],
    pattern: "sich entschließen zu + Dativ"
  },
  {
    id: "sich-bekennen-zu-dat",
    verb: "sich bekennen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Er bekennt sich ___ seiner Schuld.",
    sentences: [
      "Er bekennt sich ___ seiner Schuld.",
      "Der Politiker bekennt sich klar ___ den europäischen Werten.",
      "Er bekennt sich offen ___ seiner Verantwortung."
    ],
    pattern: "sich bekennen zu + Dativ"
  },
  {
    id: "neigen-zu-dat",
    verb: "neigen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Sie neigt ___ starken Reaktionen.",
    sentences: [
      "Sie neigt ___ starken Reaktionen.",
      "Bei Stress neigt sie ___ Übertreibungen.",
      "Manche Menschen neigen im Herbst ___ Depressionen."
    ],
    pattern: "neigen zu + Dativ"
  },
  {
    id: "bitten-um-akk",
    verb: "bitten",
    prep: "um",
    caseKey: "akk",
    sentence: "Ich bitte dich ___ einen Termin.",
    sentences: [
      "Ich bitte dich ___ einen Termin.",
      "Darf ich Sie ___ ein kurzes Gespräch bitten?",
      "Der Gast bat den Kellner ___ die Rechnung."
    ],
    pattern: "bitten um + Akkusativ"
  },
  {
    id: "sich-bewerben-um-akk",
    verb: "sich bewerben",
    prep: "um",
    caseKey: "akk",
    sentence: "Er bewirbt sich ___ die Stelle.",
    sentences: [
      "Er bewirbt sich ___ die Stelle.",
      "Er bewirbt sich ___ die ausgeschriebene Stelle als Manager.",
      "Sie möchte sich ___ einen Studienplatz in München bewerben."
    ],
    pattern: "sich bewerben um + Akkusativ"
  },
  {
    id: "sich-kuemmern-um-akk",
    verb: "sich kümmern",
    prep: "um",
    caseKey: "akk",
    sentence: "Sie kümmert sich ___ die Anmeldung.",
    sentences: [
      "Sie kümmert sich ___ die Anmeldung.",
      "Wer kümmert sich während der Reise ___ den Hund?",
      "Ich kümmere mich gern ___ die Organisation des Fests."
    ],
    pattern: "sich kümmern um + Akkusativ"
  },
  {
    id: "sich-sorgen-um-akk",
    verb: "sich sorgen",
    prep: "um",
    caseKey: "akk",
    sentence: "Ich sorge mich ___ den Patienten.",
    sentences: [
      "Ich sorge mich ___ den Patienten.",
      "Die Großmutter sorgt sich oft ___ die Gesundheit ihrer Enkel.",
      "Du musst dich nicht ___ deine Zukunft sorgen."
    ],
    pattern: "sich sorgen um + Akkusativ"
  },
  {
    id: "sich-streiten-um-akk",
    verb: "sich streiten",
    prep: "um",
    caseKey: "akk",
    sentence: "Sie streiten sich ___ den Parkplatz.",
    sentences: [
      "Sie streiten sich ___ den Parkplatz.",
      "Die Erben stritten sich lange ___ das Vermögen.",
      "Sie streiten sich oft ___ Kleinigkeiten im Alltag."
    ],
    pattern: "sich streiten um + Akkusativ"
  },
  {
    id: "sich-bemuehen-um-akk",
    verb: "sich bemühen",
    prep: "um",
    caseKey: "akk",
    sentence: "Ich bemühe mich ___ einen Platz.",
    sentences: [
      "Ich bemühe mich ___ einen Platz.",
      "Der Mitarbeiter bemüht sich sehr ___ eine gute Lösung.",
      "Wir bemühen uns stets ___ eine hohe Kundenzufriedenheit."
    ],
    pattern: "sich bemühen um + Akkusativ"
  },
  {
    id: "werben-um-akk",
    verb: "werben",
    prep: "um",
    caseKey: "akk",
    sentence: "Die Firma wirbt ___ den Auftrag.",
    sentences: [
      "Die Firma wirbt ___ den Auftrag.",
      "Die Partei wirbt vor der Wahl ___ die Gunst der Wähler.",
      "Das Unternehmen wirbt intensiv ___ neue Fachkräfte."
    ],
    pattern: "werben um + Akkusativ"
  },
  {
    id: "es-geht-um-akk",
    verb: "es geht",
    prep: "um",
    caseKey: "akk",
    sentence: "Es geht ___ den Vertrag.",
    sentences: [
      "Es geht ___ den Vertrag.",
      "In diesem Artikel geht es ___ die globale Erwärmung.",
      "Bei dieser Entscheidung geht es ___ viel Geld."
    ],
    pattern: "es geht um + Akkusativ"
  },
  {
    id: "berichten-ueber-akk",
    verb: "berichten",
    prep: "über",
    caseKey: "akk",
    sentence: "Die Zeitung berichtet ___ den Unfall.",
    sentences: [
      "Die Zeitung berichtet ___ den Unfall.",
      "Die Zeitung berichtet ausführlich ___ den politischen Skandal.",
      "Der Journalist berichtete ___ die Lage im Krisengebiet."
    ],
    pattern: "berichten über + Akkusativ"
  },
  {
    id: "sprechen-ueber-akk",
    verb: "sprechen",
    prep: "über",
    caseKey: "akk",
    sentence: "Wir sprechen ___ das Wetter.",
    sentences: [
      "Wir sprechen ___ das Wetter.",
      "Wir haben gestern stundenlang ___ alte Zeiten gesprochen.",
      "Im Meeting müssen wir ___ die neue Strategie sprechen."
    ],
    pattern: "sprechen über + Akkusativ"
  },
  {
    id: "diskutieren-ueber-akk",
    verb: "diskutieren",
    prep: "über",
    caseKey: "akk",
    sentence: "Wir diskutieren ___ den Plan.",
    sentences: [
      "Wir diskutieren ___ den Plan.",
      "Die Schüler diskutieren aufgeregt ___ die schwere Aufgabe.",
      "Wir diskutierten gestern Abend ___ das aktuelle Weltgeschehen."
    ],
    pattern: "diskutieren über + Akkusativ"
  },
  {
    id: "lachen-ueber-akk",
    verb: "lachen",
    prep: "über",
    caseKey: "akk",
    sentence: "Sie lacht ___ den Witz.",
    sentences: [
      "Sie lacht ___ den Witz.",
      "Alle Gäste lachten herzlich ___ seinen lustigen Witz.",
      "Man sollte auch mal ___ die eigenen Fehler lachen können."
    ],
    pattern: "lachen über + Akkusativ"
  },
  {
    id: "nachdenken-ueber-akk",
    verb: "nachdenken",
    prep: "über",
    caseKey: "akk",
    sentence: "Ich denke ___ das Angebot nach.",
    sentences: [
      "Ich denke ___ das Angebot nach.",
      "Ich muss gründlich ___ dieses Verkaufsangebot nachdenken.",
      "Denkst du manchmal ___ deine berufliche Zukunft nach?"
    ],
    pattern: "nachdenken über + Akkusativ"
  },
  {
    id: "sich-aergern-ueber-akk",
    verb: "sich ärgern",
    prep: "über",
    caseKey: "akk",
    sentence: "Er ärgert sich ___ den Fehler.",
    sentences: [
      "Er ärgert sich ___ den Fehler.",
      "Er ärgert sich sehr ___ den ständigen Stau.",
      "Sie ärgerte sich sehr ___ das unfreundliche Personal."
    ],
    pattern: "sich ärgern über + Akkusativ"
  },
  {
    id: "sich-beschweren-ueber-akk",
    verb: "sich beschweren",
    prep: "über",
    caseKey: "akk",
    sentence: "Der Kunde beschwert sich ___ den Lärm.",
    sentences: [
      "Der Kunde beschwert sich ___ den Lärm.",
      "Der Gast beschwert sich ___ das kalte Essen.",
      "Viele Anwohner beschwerten sich ___ den lauten Baulärm."
    ],
    pattern: "sich beschweren über + Akkusativ"
  },
  {
    id: "sich-freuen-ueber-akk",
    verb: "sich freuen",
    prep: "über",
    caseKey: "akk",
    sentence: "Sie freut sich ___ das Geschenk.",
    sentences: [
      "Sie freut sich ___ das Geschenk.",
      "Sie hat sich riesig ___ das unerwartete Geschenk gefreut.",
      "Wir freuen uns sehr ___ deinen Besuch."
    ],
    pattern: "sich freuen über + Akkusativ"
  },
  {
    id: "sich-informieren-ueber-akk",
    verb: "sich informieren",
    prep: "über",
    caseKey: "akk",
    sentence: "Ich informiere mich ___ das Thema.",
    sentences: [
      "Ich informiere mich ___ das Thema.",
      "Vor der Reise sollte man sich ___ die Einreisebestimmungen informieren.",
      "Er informiert sich gründlich ___ die Konditionen des Kredits."
    ],
    pattern: "sich informieren über + Akkusativ"
  },
  {
    id: "sich-wundern-ueber-akk",
    verb: "sich wundern",
    prep: "über",
    caseKey: "akk",
    sentence: "Ich wundere mich ___ seine Reaktion.",
    sentences: [
      "Ich wundere mich ___ seine Reaktion.",
      "Ich wundere mich sehr ___ seine plötzliche Entscheidung.",
      "Sie wunderte sich ___ die hohen Preise im Supermarkt."
    ],
    pattern: "sich wundern über + Akkusativ"
  },
  {
    id: "bestehen-aus-dat",
    verb: "bestehen",
    prep: "aus",
    caseKey: "dat",
    sentence: "Das Paket besteht ___ einem Buch und einem Heft.",
    sentences: [
      "Das Paket besteht ___ einem Buch und einem Heft.",
      "Wasser besteht ___ Wasserstoff und Sauerstoff.",
      "Der Ausschuss besteht ___ fünf gewählten Mitgliedern."
    ],
    pattern: "bestehen aus + Dativ"
  },
  {
    id: "kommen-aus-dat",
    verb: "kommen",
    prep: "aus",
    caseKey: "dat",
    sentence: "Er kommt ___ der Schweiz.",
    sentences: [
      "Er kommt ___ der Schweiz.",
      "Meine neue Nachbarin kommt ursprünglich ___ der Schweiz.",
      "Der frische Fisch kommt direkt ___ dem Norden."
    ],
    pattern: "kommen aus + Dativ"
  },
  {
    id: "abhaengen-von-dat",
    verb: "abhängen",
    prep: "von",
    caseKey: "dat",
    sentence: "Das hängt ___ deiner Entscheidung ab.",
    sentences: [
      "Das hängt ___ deiner Entscheidung ab.",
      "Der Erfolg hängt maßgeblich ___ deinem eigenen Einsatz ab.",
      "Unsere Pläne hängen stark ___ dem aktuellen Wetter ab."
    ],
    pattern: "abhängen von + Dativ"
  },
  {
    id: "traeumen-von-dat",
    verb: "träumen",
    prep: "von",
    caseKey: "dat",
    sentence: "Ich träume ___ einem Haus am Meer.",
    sentences: [
      "Ich träume ___ einem Haus am Meer.",
      "Sie träumt schon seit Jahren ___ einer Weltreise.",
      "Er träumte heute Nacht ___ einem langen Urlaub."
    ],
    pattern: "träumen von + Dativ"
  },
  {
    id: "erzaehlen-von-dat",
    verb: "erzählen",
    prep: "von",
    caseKey: "dat",
    sentence: "Sie erzählt ___ ihrer Reise.",
    sentences: [
      "Sie erzählt ___ ihrer Reise.",
      "Oma erzählte den Kindern gern ___ ihrer Jugend.",
      "Er erzählte begeistert ___ seinem letzten Abenteuer."
    ],
    pattern: "erzählen von + Dativ"
  },
  {
    id: "wissen-von-dat",
    verb: "wissen",
    prep: "von",
    caseKey: "dat",
    sentence: "Weißt du ___ dem Termin?",
    sentences: [
      "Weißt du ___ dem Termin?",
      "Weißt du eigentlich etwas ___ diesem geheimen Plan?",
      "Ich wusste leider nichts ___ seiner plötzlichen Erkrankung."
    ],
    pattern: "wissen von + Dativ"
  },
  {
    id: "hoeren-von-dat",
    verb: "hören",
    prep: "von",
    caseKey: "dat",
    sentence: "Ich habe ___ der Änderung gehört.",
    sentences: [
      "Ich habe ___ der Änderung gehört.",
      "Hast du vor kurzem etwas ___ deinem alten Schulfreund gehört?",
      "Wir haben leider lange nichts mehr ___ dieser Organisation gehört."
    ],
    pattern: "hören von + Dativ"
  },
  {
    id: "reden-von-dat",
    verb: "reden",
    prep: "von",
    caseKey: "dat",
    sentence: "Wir reden ___ dem Problem.",
    sentences: [
      "Wir reden ___ dem Problem.",
      "Alle reden zurzeit nur ___ den steigenden Kosten.",
      "Er redete ununterbrochen ___ seinen Erfolgen im Sport."
    ],
    pattern: "reden von + Dativ"
  },
  {
    id: "leben-von-dat",
    verb: "leben",
    prep: "von",
    caseKey: "dat",
    sentence: "Er lebt ___ seinem Gehalt.",
    sentences: [
      "Er lebt ___ seinem Gehalt.",
      "Künstler können oft nur schwer ___ ihrer Kunst leben.",
      "Manche Tiere leben hauptsächlich ___ frischen Früchten."
    ],
    pattern: "leben von + Dativ"
  },
  {
    id: "handeln-von-dat",
    verb: "handeln",
    prep: "von",
    caseKey: "dat",
    sentence: "Der Film handelt ___ einer Familie.",
    sentences: [
      "Der Film handelt ___ einer Familie.",
      "Der spannende Film handelt ___ einer wahren Begebenheit.",
      "Dieses alte Märchen handelt ___ drei klugen Brüdern."
    ],
    pattern: "handeln von + Dativ"
  },
  {
    id: "profitieren-von-dat",
    verb: "profitieren",
    prep: "von",
    caseKey: "dat",
    sentence: "Wir profitieren ___ der Erfahrung.",
    sentences: [
      "Wir profitieren ___ der Erfahrung.",
      "Die Schülerin profitiert stark ___ der privaten Nachhilfe.",
      "Alle Kunden profitieren ___ den günstigen Sonderangeboten."
    ],
    pattern: "profitieren von + Dativ"
  },
  {
    id: "sich-trennen-von-dat",
    verb: "sich trennen",
    prep: "von",
    caseKey: "dat",
    sentence: "Sie trennt sich ___ ihrem Auto.",
    sentences: [
      "Sie trennt sich ___ ihrem Auto.",
      "Er hat sich vor kurzem schweren Herzens ___ seiner Freundin getrennt.",
      "Man sollte sich rechtzeitig ___ alten Gewohnheiten trennen."
    ],
    pattern: "sich trennen von + Dativ"
  },
  {
    id: "sich-verabschieden-von-dat",
    verb: "sich verabschieden",
    prep: "von",
    caseKey: "dat",
    sentence: "Wir verabschieden uns ___ unseren Gästen.",
    sentences: [
      "Wir verabschieden uns ___ unseren Gästen.",
      "Am Flughafen verabschiedete sie sich herzlich ___ ihren Eltern.",
      "Der Kollege verabschiedete sich gestern ___ dem gesamten Team."
    ],
    pattern: "sich verabschieden von + Dativ"
  },
  {
    id: "sich-erholen-von-dat",
    verb: "sich erholen",
    prep: "von",
    caseKey: "dat",
    sentence: "Ich erhole mich ___ der Krankheit.",
    sentences: [
      "Ich erhole mich ___ der Krankheit.",
      "Er muss sich nun erst einmal ___ der langen Reise erholen.",
      "Die Patientin erholt sich langsam ___ der schweren Operation."
    ],
    pattern: "sich erholen von + Dativ"
  },
  {
    id: "schuetzen-vor-dat",
    verb: "schützen",
    prep: "vor",
    caseKey: "dat",
    sentence: "Die Brille schützt ___ der Sonne.",
    sentences: [
      "Die Brille schützt ___ der Sonne.",
      "Diese dicke Jacke schützt gut ___ der extremen Kälte.",
      "Impfungen schützen uns ___ gefährlichen Infektionskrankheiten."
    ],
    pattern: "schützen vor + Dativ"
  },
  {
    id: "sich-fuerchten-vor-dat",
    verb: "sich fürchten",
    prep: "vor",
    caseKey: "dat",
    sentence: "Sie fürchtet sich ___ der Prüfung.",
    sentences: [
      "Sie fürchtet sich ___ der Prüfung.",
      "Das kleine Kind fürchtet sich ___ der Dunkelheit.",
      "Viele Menschen fürchten sich ___ Spinnen."
    ],
    pattern: "sich fürchten vor + Dativ"
  },
  {
    id: "warnen-vor-dat",
    verb: "warnen",
    prep: "vor",
    caseKey: "dat",
    sentence: "Ich warne dich ___ dem Hund.",
    sentences: [
      "Ich warne dich ___ dem Hund.",
      "Der Wetterdienst warnt dringend ___ heftigen Unwettern.",
      "Die Polizei warnt alle Bürger ___ geschickten Betrügern."
    ],
    pattern: "warnen vor + Dativ"
  }
];
