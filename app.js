"use strict";

const STORE_KEY = "deutsch-drill-progress-v1";
const TRAINING_LIST_KEY = "deutsch-drill-training-list-v1";

const CASES = {
  nom: "Nominativ",
  akk: "Akkusativ",
  dat: "Dativ",
  gen: "Genitiv"
};

const CASE_SHORT = {
  nom: "Nom.",
  akk: "Akk.",
  dat: "Dat.",
  gen: "Gen."
};

const GENDERS = {
  m: "Maskulin",
  f: "Feminin",
  n: "Neutrum",
  pl: "Plural"
};

const ARTICLE_TYPES = {
  definite: "Definite article",
  mixed: "Indefinite/possessive",
  strong: "No article"
};

const ADJECTIVE_ENDINGS = {
  definite: {
    nom: { m: "e", f: "e", n: "e", pl: "en" },
    akk: { m: "en", f: "e", n: "e", pl: "en" },
    dat: { m: "en", f: "en", n: "en", pl: "en" },
    gen: { m: "en", f: "en", n: "en", pl: "en" }
  },
  mixed: {
    nom: { m: "er", f: "e", n: "es", pl: "en" },
    akk: { m: "en", f: "e", n: "es", pl: "en" },
    dat: { m: "en", f: "en", n: "en", pl: "en" },
    gen: { m: "en", f: "en", n: "en", pl: "en" }
  },
  strong: {
    nom: { m: "er", f: "e", n: "es", pl: "e" },
    akk: { m: "en", f: "e", n: "es", pl: "e" },
    dat: { m: "em", f: "er", n: "em", pl: "en" },
    gen: { m: "en", f: "er", n: "en", pl: "er" }
  }
};

const ARTICLES = {
  definite: {
    m: { nom: "der", akk: "den", dat: "dem", gen: "des" },
    f: { nom: "die", akk: "die", dat: "der", gen: "der" },
    n: { nom: "das", akk: "das", dat: "dem", gen: "des" },
    pl: { nom: "die", akk: "die", dat: "den", gen: "der" }
  },
  mixed: {
    m: { nom: "ein", akk: "einen", dat: "einem", gen: "eines" },
    f: { nom: "eine", akk: "eine", dat: "einer", gen: "einer" },
    n: { nom: "ein", akk: "ein", dat: "einem", gen: "eines" },
    pl: { nom: "keine", akk: "keine", dat: "keinen", gen: "keiner" }
  },
  strong: {
    m: { nom: "", akk: "", dat: "", gen: "" },
    f: { nom: "", akk: "", dat: "", gen: "" },
    n: { nom: "", akk: "", dat: "", gen: "" },
    pl: { nom: "", akk: "", dat: "", gen: "" }
  }
};

const NOUN_ADJECTIVES = {
  Hund: ["alt", "klein", "groß", "schnell", "ruhig", "freundlich", "krank", "gesund"],
  Mann: ["alt", "jung", "groß", "freundlich", "nett", "ruhig", "stark", "krank"],
  Brief: ["alt", "neu", "kurz", "lang", "wichtig", "freundlich", "klar"],
  Tisch: ["alt", "neu", "klein", "groß", "breit", "sauber", "praktisch"],
  Schlüssel: ["alt", "neu", "klein", "wichtig"],
  Fehler: ["klein", "groß", "schwer", "gefährlich", "ärgerlich"],
  Kollege: ["alt", "neu", "freundlich", "nett", "ruhig", "krank"],
  Student: ["jung", "freundlich", "ruhig", "krank", "fleißig"],
  Kunde: ["neu", "wichtig", "freundlich", "nett", "zufrieden"],
  Frau: ["alt", "jung", "freundlich", "nett", "ruhig", "stark"],
  Arbeit: ["neu", "wichtig", "interessant", "praktisch", "leicht", "schwer"],
  Wohnung: ["alt", "neu", "klein", "groß", "modern", "hell", "sauber", "eng"],
  Prüfung: ["wichtig", "leicht", "schwer", "kurz", "lang"],
  Zeitung: ["alt", "neu", "interessant", "wichtig"],
  Stadt: ["alt", "neu", "klein", "groß", "modern", "schön"],
  Möglichkeit: ["neu", "gut", "interessant", "praktisch", "wichtig"],
  Lösung: ["neu", "gut", "praktisch", "klar", "sicher", "nützlich"],
  Bewerbung: ["neu", "wichtig", "gut", "modern", "aussagekräftig"],
  Tasche: ["alt", "neu", "klein", "groß", "schön", "praktisch"],
  Frage: ["neu", "wichtig", "interessant", "leicht", "schwer"],
  Kind: ["klein", "jung", "freundlich", "ruhig", "krank", "gesund"],
  Auto: ["alt", "neu", "klein", "groß", "schnell", "modern", "sauber", "sicher"],
  Problem: ["neu", "klein", "groß", "schwer", "gefährlich", "ernst"],
  Gespräch: ["kurz", "lang", "wichtig", "interessant", "freundlich"],
  Angebot: ["neu", "gut", "interessant", "günstig", "attraktiv"],
  Ergebnis: ["neu", "gut", "wichtig", "klar", "schlecht"],
  Beispiel: ["neu", "gut", "interessant", "praktisch", "nützlich"],
  Buch: ["alt", "neu", "klein", "groß", "interessant", "nützlich"],
  Zimmer: ["alt", "neu", "klein", "groß", "modern", "hell", "sauber"],
  Wein: ["alt", "gut", "frisch", "kalt", "günstig"],
  Milch: ["frisch", "kalt", "warm", "gesund"],
  Wasser: ["frisch", "kalt", "warm", "sauber", "tief"],
  Brot: ["alt", "frisch", "warm", "gesund"]
};

const ADJECTIVES = Array.from(new Set(Object.values(NOUN_ADJECTIVES).flat())).sort((a, b) =>
  a.localeCompare(b, "de-DE")
);

const NOUNS = [
  {
    gender: "m",
    nom: "Hund",
    akk: "Hund",
    dat: "Hund",
    gen: "Hundes",
    plural: { nom: "Hunde", akk: "Hunde", dat: "Hunden", gen: "Hunde" }
  },
  {
    gender: "m",
    nom: "Mann",
    akk: "Mann",
    dat: "Mann",
    gen: "Mannes",
    plural: { nom: "Männer", akk: "Männer", dat: "Männern", gen: "Männer" }
  },
  {
    gender: "m",
    nom: "Brief",
    akk: "Brief",
    dat: "Brief",
    gen: "Briefes",
    plural: { nom: "Briefe", akk: "Briefe", dat: "Briefen", gen: "Briefe" }
  },
  {
    gender: "m",
    nom: "Tisch",
    akk: "Tisch",
    dat: "Tisch",
    gen: "Tisches",
    plural: { nom: "Tische", akk: "Tische", dat: "Tischen", gen: "Tische" }
  },
  {
    gender: "m",
    nom: "Schlüssel",
    akk: "Schlüssel",
    dat: "Schlüssel",
    gen: "Schlüssels",
    plural: { nom: "Schlüssel", akk: "Schlüssel", dat: "Schlüsseln", gen: "Schlüssel" }
  },
  {
    gender: "m",
    nom: "Fehler",
    akk: "Fehler",
    dat: "Fehler",
    gen: "Fehlers",
    plural: { nom: "Fehler", akk: "Fehler", dat: "Fehlern", gen: "Fehler" }
  },
  {
    gender: "m",
    nom: "Kollege",
    akk: "Kollegen",
    dat: "Kollegen",
    gen: "Kollegen",
    plural: { nom: "Kollegen", akk: "Kollegen", dat: "Kollegen", gen: "Kollegen" }
  },
  {
    gender: "m",
    nom: "Student",
    akk: "Studenten",
    dat: "Studenten",
    gen: "Studenten",
    plural: { nom: "Studenten", akk: "Studenten", dat: "Studenten", gen: "Studenten" }
  },
  {
    gender: "m",
    nom: "Kunde",
    akk: "Kunden",
    dat: "Kunden",
    gen: "Kunden",
    plural: { nom: "Kunden", akk: "Kunden", dat: "Kunden", gen: "Kunden" }
  },
  {
    gender: "f",
    nom: "Frau",
    akk: "Frau",
    dat: "Frau",
    gen: "Frau",
    plural: { nom: "Frauen", akk: "Frauen", dat: "Frauen", gen: "Frauen" }
  },
  {
    gender: "f",
    nom: "Arbeit",
    akk: "Arbeit",
    dat: "Arbeit",
    gen: "Arbeit",
    plural: { nom: "Arbeiten", akk: "Arbeiten", dat: "Arbeiten", gen: "Arbeiten" }
  },
  {
    gender: "f",
    nom: "Wohnung",
    akk: "Wohnung",
    dat: "Wohnung",
    gen: "Wohnung",
    plural: { nom: "Wohnungen", akk: "Wohnungen", dat: "Wohnungen", gen: "Wohnungen" }
  },
  {
    gender: "f",
    nom: "Prüfung",
    akk: "Prüfung",
    dat: "Prüfung",
    gen: "Prüfung",
    plural: { nom: "Prüfungen", akk: "Prüfungen", dat: "Prüfungen", gen: "Prüfungen" }
  },
  {
    gender: "f",
    nom: "Zeitung",
    akk: "Zeitung",
    dat: "Zeitung",
    gen: "Zeitung",
    plural: { nom: "Zeitungen", akk: "Zeitungen", dat: "Zeitungen", gen: "Zeitungen" }
  },
  {
    gender: "f",
    nom: "Stadt",
    akk: "Stadt",
    dat: "Stadt",
    gen: "Stadt",
    plural: { nom: "Städte", akk: "Städte", dat: "Städten", gen: "Städte" }
  },
  {
    gender: "f",
    nom: "Möglichkeit",
    akk: "Möglichkeit",
    dat: "Möglichkeit",
    gen: "Möglichkeit",
    plural: {
      nom: "Möglichkeiten",
      akk: "Möglichkeiten",
      dat: "Möglichkeiten",
      gen: "Möglichkeiten"
    }
  },
  {
    gender: "f",
    nom: "Lösung",
    akk: "Lösung",
    dat: "Lösung",
    gen: "Lösung",
    plural: { nom: "Lösungen", akk: "Lösungen", dat: "Lösungen", gen: "Lösungen" }
  },
  {
    gender: "f",
    nom: "Bewerbung",
    akk: "Bewerbung",
    dat: "Bewerbung",
    gen: "Bewerbung",
    plural: { nom: "Bewerbungen", akk: "Bewerbungen", dat: "Bewerbungen", gen: "Bewerbungen" }
  },
  {
    gender: "f",
    nom: "Tasche",
    akk: "Tasche",
    dat: "Tasche",
    gen: "Tasche",
    plural: { nom: "Taschen", akk: "Taschen", dat: "Taschen", gen: "Taschen" }
  },
  {
    gender: "f",
    nom: "Frage",
    akk: "Frage",
    dat: "Frage",
    gen: "Frage",
    plural: { nom: "Fragen", akk: "Fragen", dat: "Fragen", gen: "Fragen" }
  },
  {
    gender: "n",
    nom: "Kind",
    akk: "Kind",
    dat: "Kind",
    gen: "Kindes",
    plural: { nom: "Kinder", akk: "Kinder", dat: "Kindern", gen: "Kinder" }
  },
  {
    gender: "n",
    nom: "Auto",
    akk: "Auto",
    dat: "Auto",
    gen: "Autos",
    plural: { nom: "Autos", akk: "Autos", dat: "Autos", gen: "Autos" }
  },
  {
    gender: "n",
    nom: "Problem",
    akk: "Problem",
    dat: "Problem",
    gen: "Problems",
    plural: { nom: "Probleme", akk: "Probleme", dat: "Problemen", gen: "Probleme" }
  },
  {
    gender: "n",
    nom: "Gespräch",
    akk: "Gespräch",
    dat: "Gespräch",
    gen: "Gesprächs",
    plural: { nom: "Gespräche", akk: "Gespräche", dat: "Gesprächen", gen: "Gespräche" }
  },
  {
    gender: "n",
    nom: "Angebot",
    akk: "Angebot",
    dat: "Angebot",
    gen: "Angebots",
    plural: { nom: "Angebote", akk: "Angebote", dat: "Angeboten", gen: "Angebote" }
  },
  {
    gender: "n",
    nom: "Ergebnis",
    akk: "Ergebnis",
    dat: "Ergebnis",
    gen: "Ergebnisses",
    plural: { nom: "Ergebnisse", akk: "Ergebnisse", dat: "Ergebnissen", gen: "Ergebnisse" }
  },
  {
    gender: "n",
    nom: "Beispiel",
    akk: "Beispiel",
    dat: "Beispiel",
    gen: "Beispiels",
    plural: { nom: "Beispiele", akk: "Beispiele", dat: "Beispielen", gen: "Beispiele" }
  },
  {
    gender: "n",
    nom: "Buch",
    akk: "Buch",
    dat: "Buch",
    gen: "Buches",
    plural: { nom: "Bücher", akk: "Bücher", dat: "Büchern", gen: "Bücher" }
  },
  {
    gender: "n",
    nom: "Zimmer",
    akk: "Zimmer",
    dat: "Zimmer",
    gen: "Zimmers",
    plural: { nom: "Zimmer", akk: "Zimmer", dat: "Zimmern", gen: "Zimmer" }
  }
];

const STRONG_SINGULAR_NOUNS = [
  {
    gender: "m",
    nom: "Wein",
    akk: "Wein",
    dat: "Wein",
    gen: "Weines"
  },
  {
    gender: "f",
    nom: "Milch",
    akk: "Milch",
    dat: "Milch",
    gen: "Milch"
  },
  {
    gender: "n",
    nom: "Wasser",
    akk: "Wasser",
    dat: "Wasser",
    gen: "Wassers"
  },
  {
    gender: "n",
    nom: "Brot",
    akk: "Brot",
    dat: "Brot",
    gen: "Brotes"
  }
];

const VERB_ITEMS = [
  {
    id: "achten-auf-akk",
    verb: "achten",
    prep: "auf",
    caseKey: "akk",
    sentence: "Achte ___ den Verkehr.",
    pattern: "achten auf + Akkusativ",
    meaning: "to pay attention to"
  },
  {
    id: "warten-auf-akk",
    verb: "warten",
    prep: "auf",
    caseKey: "akk",
    sentence: "Ich warte ___ den Bus.",
    pattern: "warten auf + Akkusativ",
    meaning: "to wait for"
  },
  {
    id: "antworten-auf-akk",
    verb: "antworten",
    prep: "auf",
    caseKey: "akk",
    sentence: "Ich antworte ___ die Nachricht.",
    pattern: "antworten auf + Akkusativ",
    meaning: "to answer/respond to"
  },
  {
    id: "bestehen-auf-dat",
    verb: "bestehen",
    prep: "auf",
    caseKey: "dat",
    sentence: "Ich bestehe ___ einer Erklärung.",
    pattern: "bestehen auf + Dativ",
    meaning: "to insist on"
  },
  {
    id: "hoffen-auf-akk",
    verb: "hoffen",
    prep: "auf",
    caseKey: "akk",
    sentence: "Wir hoffen ___ den Erfolg.",
    pattern: "hoffen auf + Akkusativ",
    meaning: "to hope for"
  },
  {
    id: "reagieren-auf-akk",
    verb: "reagieren",
    prep: "auf",
    caseKey: "akk",
    sentence: "Wie reagierst du ___ den Vorschlag?",
    pattern: "reagieren auf + Akkusativ",
    meaning: "to react to"
  },
  {
    id: "sich-freuen-auf-akk",
    verb: "sich freuen",
    prep: "auf",
    caseKey: "akk",
    sentence: "Ich freue mich ___ den Urlaub.",
    pattern: "sich freuen auf + Akkusativ",
    meaning: "to look forward to"
  },
  {
    id: "sich-konzentrieren-auf-akk",
    verb: "sich konzentrieren",
    prep: "auf",
    caseKey: "akk",
    sentence: "Sie konzentriert sich ___ die Aufgabe.",
    pattern: "sich konzentrieren auf + Akkusativ",
    meaning: "to concentrate on"
  },
  {
    id: "sich-verlassen-auf-akk",
    verb: "sich verlassen",
    prep: "auf",
    caseKey: "akk",
    sentence: "Ich verlasse mich ___ den Plan.",
    pattern: "sich verlassen auf + Akkusativ",
    meaning: "to rely on"
  },
  {
    id: "sich-vorbereiten-auf-akk",
    verb: "sich vorbereiten",
    prep: "auf",
    caseKey: "akk",
    sentence: "Ich bereite mich ___ die Prüfung vor.",
    pattern: "sich vorbereiten auf + Akkusativ",
    meaning: "to prepare for"
  },
  {
    id: "verzichten-auf-akk",
    verb: "verzichten",
    prep: "auf",
    caseKey: "akk",
    sentence: "Ich verzichte ___ den Nachtisch.",
    pattern: "verzichten auf + Akkusativ",
    meaning: "to do without"
  },
  {
    id: "arbeiten-an-dat",
    verb: "arbeiten",
    prep: "an",
    caseKey: "dat",
    sentence: "Ich arbeite ___ dem Projekt.",
    pattern: "arbeiten an + Dativ",
    meaning: "to work on"
  },
  {
    id: "denken-an-akk",
    verb: "denken",
    prep: "an",
    caseKey: "akk",
    sentence: "Denkst du ___ den Termin?",
    pattern: "denken an + Akkusativ",
    meaning: "to think of/about"
  },
  {
    id: "glauben-an-akk",
    verb: "glauben",
    prep: "an",
    caseKey: "akk",
    sentence: "Wir glauben ___ den Erfolg.",
    pattern: "glauben an + Akkusativ",
    meaning: "to believe in"
  },
  {
    id: "leiden-an-dat",
    verb: "leiden",
    prep: "an",
    caseKey: "dat",
    sentence: "Er leidet ___ einer Krankheit.",
    pattern: "leiden an + Dativ",
    meaning: "to suffer from"
  },
  {
    id: "erkennen-an-dat",
    verb: "erkennen",
    prep: "an",
    caseKey: "dat",
    sentence: "Ich erkenne ihn ___ seiner Stimme.",
    pattern: "erkennen an + Dativ",
    meaning: "to recognize by"
  },
  {
    id: "schreiben-an-akk",
    verb: "schreiben",
    prep: "an",
    caseKey: "akk",
    sentence: "Sie schreibt ___ den Kunden.",
    pattern: "schreiben an + Akkusativ",
    meaning: "to write to"
  },
  {
    id: "sich-beteiligen-an-dat",
    verb: "sich beteiligen",
    prep: "an",
    caseKey: "dat",
    sentence: "Sie beteiligt sich ___ dem Gespräch.",
    pattern: "sich beteiligen an + Dativ",
    meaning: "to take part in"
  },
  {
    id: "sich-erinnern-an-akk",
    verb: "sich erinnern",
    prep: "an",
    caseKey: "akk",
    sentence: "Er erinnert sich ___ den Namen.",
    pattern: "sich erinnern an + Akkusativ",
    meaning: "to remember"
  },
  {
    id: "sich-gewoehnen-an-akk",
    verb: "sich gewöhnen",
    prep: "an",
    caseKey: "akk",
    sentence: "Ich gewöhne mich ___ den Verkehr.",
    pattern: "sich gewöhnen an + Akkusativ",
    meaning: "to get used to"
  },
  {
    id: "sich-halten-an-akk",
    verb: "sich halten",
    prep: "an",
    caseKey: "akk",
    sentence: "Halte dich ___ den Plan.",
    pattern: "sich halten an + Akkusativ",
    meaning: "to stick to/follow"
  },
  {
    id: "sich-binden-an-akk",
    verb: "sich binden",
    prep: "an",
    caseKey: "akk",
    sentence: "Er bindet sich nicht gern ___ einen Vertrag.",
    pattern: "sich binden an + Akkusativ",
    meaning: "to commit oneself to"
  },
  {
    id: "sich-orientieren-an-dat",
    verb: "sich orientieren",
    prep: "an",
    caseKey: "dat",
    sentence: "Wir orientieren uns ___ dem Beispiel.",
    pattern: "sich orientieren an + Dativ",
    meaning: "to orient oneself by"
  },
  {
    id: "sich-wenden-an-akk",
    verb: "sich wenden",
    prep: "an",
    caseKey: "akk",
    sentence: "Wenden Sie sich ___ den Empfang.",
    pattern: "sich wenden an + Akkusativ",
    meaning: "to contact/turn to"
  },
  {
    id: "teilnehmen-an-dat",
    verb: "teilnehmen",
    prep: "an",
    caseKey: "dat",
    sentence: "Er nimmt ___ dem Kurs teil.",
    pattern: "teilnehmen an + Dativ",
    meaning: "to participate in"
  },
  {
    id: "sterben-an-dat",
    verb: "sterben",
    prep: "an",
    caseKey: "dat",
    sentence: "Er ist ___ einer Krankheit gestorben.",
    pattern: "sterben an + Dativ",
    meaning: "to die of/from"
  },
  {
    id: "liegen-an-dat",
    verb: "liegen",
    prep: "an",
    caseKey: "dat",
    sentence: "Es liegt ___ deinem Verhalten.",
    pattern: "liegen an + Dativ",
    meaning: "to be due to"
  },
  {
    id: "schuld-sein-an-dat",
    verb: "schuld sein",
    prep: "an",
    caseKey: "dat",
    sentence: "Er ist schuld ___ dem Unfall.",
    pattern: "schuld sein an + Dativ",
    meaning: "to be responsible for"
  },
  {
    id: "zweifeln-an-dat",
    verb: "zweifeln",
    prep: "an",
    caseKey: "dat",
    sentence: "Sie zweifelt ___ der Lösung.",
    pattern: "zweifeln an + Dativ",
    meaning: "to doubt"
  },
  {
    id: "sich-entschuldigen-bei-dat",
    verb: "sich entschuldigen",
    prep: "bei",
    caseKey: "dat",
    sentence: "Ich entschuldige mich ___ dem Nachbarn.",
    pattern: "sich entschuldigen bei + Dativ",
    meaning: "to apologize to"
  },
  {
    id: "helfen-bei-dat",
    verb: "helfen",
    prep: "bei",
    caseKey: "dat",
    sentence: "Ich helfe dir ___ der Aufgabe.",
    pattern: "helfen bei + Dativ",
    meaning: "to help with"
  },
  {
    id: "wohnen-bei-dat",
    verb: "wohnen",
    prep: "bei",
    caseKey: "dat",
    sentence: "Wir wohnen ___ meinem Bruder.",
    pattern: "wohnen bei + Dativ",
    meaning: "to stay/live at someone's place"
  },
  {
    id: "kaempfen-fuer-akk",
    verb: "kämpfen",
    prep: "für",
    caseKey: "akk",
    sentence: "Wir kämpfen ___ die Freiheit.",
    pattern: "kämpfen für + Akkusativ",
    meaning: "to fight for"
  },
  {
    id: "danken-fuer-akk",
    verb: "danken",
    prep: "für",
    caseKey: "akk",
    sentence: "Ich danke dir ___ den Hinweis.",
    pattern: "danken für + Akkusativ",
    meaning: "to thank for"
  },
  {
    id: "sich-entscheiden-fuer-akk",
    verb: "sich entscheiden",
    prep: "für",
    caseKey: "akk",
    sentence: "Er entscheidet sich ___ den Kurs.",
    pattern: "sich entscheiden für + Akkusativ",
    meaning: "to decide on"
  },
  {
    id: "sich-entschuldigen-fuer-akk",
    verb: "sich entschuldigen",
    prep: "für",
    caseKey: "akk",
    sentence: "Ich entschuldige mich ___ den Fehler.",
    pattern: "sich entschuldigen für + Akkusativ",
    meaning: "to apologize for"
  },
  {
    id: "sich-interessieren-fuer-akk",
    verb: "sich interessieren",
    prep: "für",
    caseKey: "akk",
    sentence: "Lina interessiert sich ___ den Film.",
    pattern: "sich interessieren für + Akkusativ",
    meaning: "to be interested in"
  },
  {
    id: "sorgen-fuer-akk",
    verb: "sorgen",
    prep: "für",
    caseKey: "akk",
    sentence: "Du sorgst ___ den Transport.",
    pattern: "sorgen für + Akkusativ",
    meaning: "to take care of/provide"
  },
  {
    id: "investieren-in-akk",
    verb: "investieren",
    prep: "in",
    caseKey: "akk",
    sentence: "Wir investieren ___ die Weiterbildung.",
    pattern: "investieren in + Akkusativ",
    meaning: "to invest in"
  },
  {
    id: "sich-verlieben-in-akk",
    verb: "sich verlieben",
    prep: "in",
    caseKey: "akk",
    sentence: "Sie verliebt sich ___ den Nachbarn.",
    pattern: "sich verlieben in + Akkusativ",
    meaning: "to fall in love with"
  },
  {
    id: "uebersetzen-in-akk",
    verb: "übersetzen",
    prep: "in",
    caseKey: "akk",
    sentence: "Wir übersetzen den Text ___ die deutsche Sprache.",
    pattern: "übersetzen in + Akkusativ",
    meaning: "to translate into"
  },
  {
    id: "anfangen-mit-dat",
    verb: "anfangen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Wir fangen ___ dem ersten Kapitel an.",
    pattern: "anfangen mit + Dativ",
    meaning: "to start with"
  },
  {
    id: "aufhoeren-mit-dat",
    verb: "aufhören",
    prep: "mit",
    caseKey: "dat",
    sentence: "Er hört ___ dem Rauchen auf.",
    pattern: "aufhören mit + Dativ",
    meaning: "to stop"
  },
  {
    id: "beginnen-mit-dat",
    verb: "beginnen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Der Kurs beginnt ___ einer Übung.",
    pattern: "beginnen mit + Dativ",
    meaning: "to begin with"
  },
  {
    id: "rechnen-mit-dat",
    verb: "rechnen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Wir rechnen ___ einem guten Ergebnis.",
    pattern: "rechnen mit + Dativ",
    meaning: "to expect/count on"
  },
  {
    id: "sich-beschaeftigen-mit-dat",
    verb: "sich beschäftigen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Sie beschäftigt sich ___ der Aufgabe.",
    pattern: "sich beschäftigen mit + Dativ",
    meaning: "to deal with"
  },
  {
    id: "sich-treffen-mit-dat",
    verb: "sich treffen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Ich treffe mich ___ einem Freund.",
    pattern: "sich treffen mit + Dativ",
    meaning: "to meet with"
  },
  {
    id: "sprechen-mit-dat",
    verb: "sprechen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Ich spreche ___ meinem Lehrer.",
    pattern: "sprechen mit + Dativ",
    meaning: "to speak with"
  },
  {
    id: "telefonieren-mit-dat",
    verb: "telefonieren",
    prep: "mit",
    caseKey: "dat",
    sentence: "Sie telefoniert ___ ihrer Mutter.",
    pattern: "telefonieren mit + Dativ",
    meaning: "to talk on the phone with"
  },
  {
    id: "sich-streiten-mit-dat",
    verb: "sich streiten",
    prep: "mit",
    caseKey: "dat",
    sentence: "Ich streite mich ___ meinem Bruder.",
    pattern: "sich streiten mit + Dativ",
    meaning: "to argue with"
  },
  {
    id: "spielen-mit-dat",
    verb: "spielen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Kinder spielen ___ dem Ball.",
    pattern: "spielen mit + Dativ",
    meaning: "to play with"
  },
  {
    id: "diskutieren-mit-dat",
    verb: "diskutieren",
    prep: "mit",
    caseKey: "dat",
    sentence: "Ich diskutiere ___ dem Chef.",
    pattern: "diskutieren mit + Dativ",
    meaning: "to discuss with"
  },
  {
    id: "verhandeln-mit-dat",
    verb: "verhandeln",
    prep: "mit",
    caseKey: "dat",
    sentence: "Die Firma verhandelt ___ den Partnern.",
    pattern: "verhandeln mit + Dativ",
    meaning: "to negotiate with"
  },
  {
    id: "sich-versoehnen-mit-dat",
    verb: "sich versöhnen",
    prep: "mit",
    caseKey: "dat",
    sentence: "Ich habe mich ___ meinem Bruder versöhnt.",
    pattern: "sich versöhnen mit + Dativ",
    meaning: "to reconcile with"
  },
  {
    id: "fragen-nach-dat",
    verb: "fragen",
    prep: "nach",
    caseKey: "dat",
    sentence: "Er fragt ___ dem Weg.",
    pattern: "fragen nach + Dativ",
    meaning: "to ask for/about"
  },
  {
    id: "riechen-nach-dat",
    verb: "riechen",
    prep: "nach",
    caseKey: "dat",
    sentence: "Es riecht ___ dem Essen.",
    pattern: "riechen nach + Dativ",
    meaning: "to smell like"
  },
  {
    id: "schmecken-nach-dat",
    verb: "schmecken",
    prep: "nach",
    caseKey: "dat",
    sentence: "Das schmeckt ___ frischem Brot.",
    pattern: "schmecken nach + Dativ",
    meaning: "to taste like"
  },
  {
    id: "sich-erkundigen-nach-dat",
    verb: "sich erkundigen",
    prep: "nach",
    caseKey: "dat",
    sentence: "Er erkundigt sich ___ dem Preis.",
    pattern: "sich erkundigen nach + Dativ",
    meaning: "to inquire about"
  },
  {
    id: "sich-sehnen-nach-dat",
    verb: "sich sehnen",
    prep: "nach",
    caseKey: "dat",
    sentence: "Ich sehne mich ___ dem Sommer.",
    pattern: "sich sehnen nach + Dativ",
    meaning: "to long for"
  },
  {
    id: "suchen-nach-dat",
    verb: "suchen",
    prep: "nach",
    caseKey: "dat",
    sentence: "Ich suche ___ dem Schlüssel.",
    pattern: "suchen nach + Dativ",
    meaning: "to look for"
  },
  {
    id: "streben-nach-dat",
    verb: "streben",
    prep: "nach",
    caseKey: "dat",
    sentence: "Wir streben ___ einem besseren Leben.",
    pattern: "streben nach + Dativ",
    meaning: "to strive for"
  },
  {
    id: "benennen-nach-dat",
    verb: "benennen",
    prep: "nach",
    caseKey: "dat",
    sentence: "Die Straße wurde ___ einem Politiker benannt.",
    pattern: "benennen nach + Dativ",
    meaning: "to name after"
  },
  {
    id: "beitragen-zu-dat",
    verb: "beitragen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Das trägt ___ einer Lösung bei.",
    pattern: "beitragen zu + Dativ",
    meaning: "to contribute to"
  },
  {
    id: "einladen-zu-dat",
    verb: "einladen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Ich lade dich ___ meiner Party ein.",
    pattern: "einladen zu + Dativ",
    meaning: "to invite to"
  },
  {
    id: "fuehren-zu-dat",
    verb: "führen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Das führt ___ einem Problem.",
    pattern: "führen zu + Dativ",
    meaning: "to lead to"
  },
  {
    id: "gehoeren-zu-dat",
    verb: "gehören",
    prep: "zu",
    caseKey: "dat",
    sentence: "Diese Schlüssel gehören ___ dieser Wohnung.",
    pattern: "gehören zu + Dativ",
    meaning: "to belong to"
  },
  {
    id: "gratulieren-zu-dat",
    verb: "gratulieren",
    prep: "zu",
    caseKey: "dat",
    sentence: "Wir gratulieren dir ___ deinem Erfolg.",
    pattern: "gratulieren zu + Dativ",
    meaning: "to congratulate on"
  },
  {
    id: "passen-zu-dat",
    verb: "passen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Das passt ___ deinem Plan.",
    pattern: "passen zu + Dativ",
    meaning: "to fit/go with"
  },
  {
    id: "sich-entschliessen-zu-dat",
    verb: "sich entschließen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Ich entschließe mich ___ einem Studium.",
    pattern: "sich entschließen zu + Dativ",
    meaning: "to decide on"
  },
  {
    id: "sich-bekennen-zu-dat",
    verb: "sich bekennen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Er bekennt sich ___ seiner Schuld.",
    pattern: "sich bekennen zu + Dativ",
    meaning: "to admit/declare allegiance to"
  },
  {
    id: "neigen-zu-dat",
    verb: "neigen",
    prep: "zu",
    caseKey: "dat",
    sentence: "Sie neigt ___ starken Reaktionen.",
    pattern: "neigen zu + Dativ",
    meaning: "to tend toward"
  },
  {
    id: "bitten-um-akk",
    verb: "bitten",
    prep: "um",
    caseKey: "akk",
    sentence: "Ich bitte dich ___ einen Termin.",
    pattern: "bitten um + Akkusativ",
    meaning: "to ask for"
  },
  {
    id: "sich-bewerben-um-akk",
    verb: "sich bewerben",
    prep: "um",
    caseKey: "akk",
    sentence: "Er bewirbt sich ___ die Stelle.",
    pattern: "sich bewerben um + Akkusativ",
    meaning: "to apply for"
  },
  {
    id: "sich-kuemmern-um-akk",
    verb: "sich kümmern",
    prep: "um",
    caseKey: "akk",
    sentence: "Sie kümmert sich ___ die Anmeldung.",
    pattern: "sich kümmern um + Akkusativ",
    meaning: "to take care of"
  },
  {
    id: "sich-sorgen-um-akk",
    verb: "sich sorgen",
    prep: "um",
    caseKey: "akk",
    sentence: "Ich sorge mich ___ den Patienten.",
    pattern: "sich sorgen um + Akkusativ",
    meaning: "to worry about"
  },
  {
    id: "sich-streiten-um-akk",
    verb: "sich streiten",
    prep: "um",
    caseKey: "akk",
    sentence: "Sie streiten sich ___ den Parkplatz.",
    pattern: "sich streiten um + Akkusativ",
    meaning: "to argue over"
  },
  {
    id: "sich-bemuehen-um-akk",
    verb: "sich bemühen",
    prep: "um",
    caseKey: "akk",
    sentence: "Ich bemühe mich ___ einen Platz.",
    pattern: "sich bemühen um + Akkusativ",
    meaning: "to make an effort for"
  },
  {
    id: "werben-um-akk",
    verb: "werben",
    prep: "um",
    caseKey: "akk",
    sentence: "Die Firma wirbt ___ den Auftrag.",
    pattern: "werben um + Akkusativ",
    meaning: "to court/seek"
  },
  {
    id: "es-geht-um-akk",
    verb: "es geht",
    prep: "um",
    caseKey: "akk",
    sentence: "Es geht ___ den Vertrag.",
    pattern: "es geht um + Akkusativ",
    meaning: "to be about"
  },
  {
    id: "berichten-ueber-akk",
    verb: "berichten",
    prep: "über",
    caseKey: "akk",
    sentence: "Die Zeitung berichtet ___ den Unfall.",
    pattern: "berichten über + Akkusativ",
    meaning: "to report on"
  },
  {
    id: "sprechen-ueber-akk",
    verb: "sprechen",
    prep: "über",
    caseKey: "akk",
    sentence: "Wir sprechen ___ das Wetter.",
    pattern: "sprechen über + Akkusativ",
    meaning: "to talk about"
  },
  {
    id: "diskutieren-ueber-akk",
    verb: "diskutieren",
    prep: "über",
    caseKey: "akk",
    sentence: "Wir diskutieren ___ den Plan.",
    pattern: "diskutieren über + Akkusativ",
    meaning: "to discuss"
  },
  {
    id: "lachen-ueber-akk",
    verb: "lachen",
    prep: "über",
    caseKey: "akk",
    sentence: "Sie lacht ___ den Witz.",
    pattern: "lachen über + Akkusativ",
    meaning: "to laugh about"
  },
  {
    id: "nachdenken-ueber-akk",
    verb: "nachdenken",
    prep: "über",
    caseKey: "akk",
    sentence: "Ich denke ___ das Angebot nach.",
    pattern: "nachdenken über + Akkusativ",
    meaning: "to think about"
  },
  {
    id: "sich-aergern-ueber-akk",
    verb: "sich ärgern",
    prep: "über",
    caseKey: "akk",
    sentence: "Er ärgert sich ___ den Fehler.",
    pattern: "sich ärgern über + Akkusativ",
    meaning: "to be annoyed about"
  },
  {
    id: "sich-beschweren-ueber-akk",
    verb: "sich beschweren",
    prep: "über",
    caseKey: "akk",
    sentence: "Der Kunde beschwert sich ___ den Lärm.",
    pattern: "sich beschweren über + Akkusativ",
    meaning: "to complain about"
  },
  {
    id: "sich-freuen-ueber-akk",
    verb: "sich freuen",
    prep: "über",
    caseKey: "akk",
    sentence: "Sie freut sich ___ das Geschenk.",
    pattern: "sich freuen über + Akkusativ",
    meaning: "to be happy about"
  },
  {
    id: "sich-informieren-ueber-akk",
    verb: "sich informieren",
    prep: "über",
    caseKey: "akk",
    sentence: "Ich informiere mich ___ das Thema.",
    pattern: "sich informieren über + Akkusativ",
    meaning: "to inform oneself about"
  },
  {
    id: "sich-wundern-ueber-akk",
    verb: "sich wundern",
    prep: "über",
    caseKey: "akk",
    sentence: "Ich wundere mich ___ seine Reaktion.",
    pattern: "sich wundern über + Akkusativ",
    meaning: "to be surprised about"
  },
  {
    id: "bestehen-aus-dat",
    verb: "bestehen",
    prep: "aus",
    caseKey: "dat",
    sentence: "Das Paket besteht ___ einem Buch und einem Heft.",
    pattern: "bestehen aus + Dativ",
    meaning: "to consist of"
  },
  {
    id: "kommen-aus-dat",
    verb: "kommen",
    prep: "aus",
    caseKey: "dat",
    sentence: "Er kommt ___ der Schweiz.",
    pattern: "kommen aus + Dativ",
    meaning: "to come from"
  },
  {
    id: "abhaengen-von-dat",
    verb: "abhängen",
    prep: "von",
    caseKey: "dat",
    sentence: "Das hängt ___ deiner Entscheidung ab.",
    pattern: "abhängen von + Dativ",
    meaning: "to depend on"
  },
  {
    id: "traeumen-von-dat",
    verb: "träumen",
    prep: "von",
    caseKey: "dat",
    sentence: "Ich träume ___ einem Haus am Meer.",
    pattern: "träumen von + Dativ",
    meaning: "to dream of"
  },
  {
    id: "erzaehlen-von-dat",
    verb: "erzählen",
    prep: "von",
    caseKey: "dat",
    sentence: "Sie erzählt ___ ihrer Reise.",
    pattern: "erzählen von + Dativ",
    meaning: "to tell about"
  },
  {
    id: "wissen-von-dat",
    verb: "wissen",
    prep: "von",
    caseKey: "dat",
    sentence: "Weißt du ___ dem Termin?",
    pattern: "wissen von + Dativ",
    meaning: "to know about"
  },
  {
    id: "hoeren-von-dat",
    verb: "hören",
    prep: "von",
    caseKey: "dat",
    sentence: "Ich habe ___ der Änderung gehört.",
    pattern: "hören von + Dativ",
    meaning: "to hear about/from"
  },
  {
    id: "reden-von-dat",
    verb: "reden",
    prep: "von",
    caseKey: "dat",
    sentence: "Wir reden ___ dem Problem.",
    pattern: "reden von + Dativ",
    meaning: "to talk about"
  },
  {
    id: "leben-von-dat",
    verb: "leben",
    prep: "von",
    caseKey: "dat",
    sentence: "Er lebt ___ seinem Gehalt.",
    pattern: "leben von + Dativ",
    meaning: "to live on"
  },
  {
    id: "handeln-von-dat",
    verb: "handeln",
    prep: "von",
    caseKey: "dat",
    sentence: "Der Film handelt ___ einer Familie.",
    pattern: "handeln von + Dativ",
    meaning: "to be about"
  },
  {
    id: "profitieren-von-dat",
    verb: "profitieren",
    prep: "von",
    caseKey: "dat",
    sentence: "Wir profitieren ___ der Erfahrung.",
    pattern: "profitieren von + Dativ",
    meaning: "to benefit from"
  },
  {
    id: "sich-trennen-von-dat",
    verb: "sich trennen",
    prep: "von",
    caseKey: "dat",
    sentence: "Sie trennt sich ___ ihrem Auto.",
    pattern: "sich trennen von + Dativ",
    meaning: "to separate from"
  },
  {
    id: "sich-verabschieden-von-dat",
    verb: "sich verabschieden",
    prep: "von",
    caseKey: "dat",
    sentence: "Wir verabschieden uns ___ unseren Gästen.",
    pattern: "sich verabschieden von + Dativ",
    meaning: "to say goodbye to"
  },
  {
    id: "sich-erholen-von-dat",
    verb: "sich erholen",
    prep: "von",
    caseKey: "dat",
    sentence: "Ich erhole mich ___ der Krankheit.",
    pattern: "sich erholen von + Dativ",
    meaning: "to recover from"
  },
  {
    id: "schuetzen-vor-dat",
    verb: "schützen",
    prep: "vor",
    caseKey: "dat",
    sentence: "Die Brille schützt ___ der Sonne.",
    pattern: "schützen vor + Dativ",
    meaning: "to protect from"
  },
  {
    id: "sich-fuerchten-vor-dat",
    verb: "sich fürchten",
    prep: "vor",
    caseKey: "dat",
    sentence: "Sie fürchtet sich ___ der Prüfung.",
    pattern: "sich fürchten vor + Dativ",
    meaning: "to be afraid of"
  },
  {
    id: "warnen-vor-dat",
    verb: "warnen",
    prep: "vor",
    caseKey: "dat",
    sentence: "Ich warne dich ___ dem Hund.",
    pattern: "warnen vor + Dativ",
    meaning: "to warn about"
  }
];

const PREPOSITIONS = Array.from(new Set(VERB_ITEMS.map((item) => item.prep))).sort((a, b) =>
  a.localeCompare(b, "de-DE")
);
const VERB_LOOKUP = new Map(VERB_ITEMS.map((item) => [item.id, item]));
const VERB_IDS = new Set(VERB_LOOKUP.keys());

const elements = {
  streak: document.querySelector("#streakValue"),
  accuracy: document.querySelector("#accuracyValue"),
  total: document.querySelector("#totalValue"),
  topicButtons: document.querySelectorAll("[data-topic]"),
  topicKicker: document.querySelector("#topicKicker"),
  topicTitle: document.querySelector("#topicTitle"),
  dataBadge: document.querySelector("#dataBadge"),
  controlsRow: document.querySelector("#controlsRow"),
  metaGrid: document.querySelector("#metaGrid"),
  promptText: document.querySelector("#promptText"),
  answerGrid: document.querySelector("#answerGrid"),
  feedbackBox: document.querySelector("#feedbackBox"),
  resetButton: document.querySelector("#resetButton"),
  submitButton: document.querySelector("#submitButton"),
  nextButton: document.querySelector("#nextButton"),
  topicAccuracyLabel: document.querySelector("#topicAccuracyLabel"),
  topicMeter: document.querySelector("#topicMeter"),
  topicCorrect: document.querySelector("#topicCorrect"),
  topicMissed: document.querySelector("#topicMissed"),
  bestStreak: document.querySelector("#bestStreak"),
  missList: document.querySelector("#missList"),
  verbListBlock: document.querySelector("#verbListBlock"),
  verbListCount: document.querySelector("#verbListCount"),
  verbListToggle: document.querySelector("#verbListToggle"),
  verbSearchInput: document.querySelector("#verbSearchInput"),
  selectedVerbList: document.querySelector("#selectedVerbList"),
  verbBulkAdd: document.querySelector("#verbBulkAdd"),
  verbBulkStatus: document.querySelector("#verbBulkStatus"),
  verbListClear: document.querySelector("#verbListClear"),
  verbSearchResults: document.querySelector("#verbSearchResults")
};

const appState = {
  topic: "adjective",
  adjMode: "form",
  adjFilter: "all",
  verbMode: "prep",
  verbSearch: "",
  verbBulkStatus: "",
  reviewOnly: false,
  current: null,
  selected: "",
  answered: false,
  progress: loadProgress(),
  trainingList: loadTrainingList()
};

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved && typeof saved === "object") {
      return {
        total: saved.total || 0,
        correct: saved.correct || 0,
        streak: saved.streak || 0,
        bestStreak: saved.bestStreak || 0,
        topics: saved.topics || {},
        items: saved.items || {},
        misses: saved.misses || []
      };
    }
  } catch (error) {
    localStorage.removeItem(STORE_KEY);
  }
  return {
    total: 0,
    correct: 0,
    streak: 0,
    bestStreak: 0,
    topics: {},
    items: {},
    misses: []
  };
}

function saveProgress() {
  localStorage.setItem(STORE_KEY, JSON.stringify(appState.progress));
}

function loadTrainingList() {
  try {
    const saved = JSON.parse(localStorage.getItem(TRAINING_LIST_KEY));
    if (saved && typeof saved === "object") {
      return {
        verbs: sanitizeVerbIds(saved.verbs),
        useVerbList: Boolean(saved.useVerbList)
      };
    }
  } catch (error) {
    localStorage.removeItem(TRAINING_LIST_KEY);
  }
  return {
    verbs: [],
    useVerbList: false
  };
}

function saveTrainingList() {
  appState.trainingList.verbs = selectedVerbIds();
  appState.trainingList.useVerbList =
    Boolean(appState.trainingList.useVerbList) && appState.trainingList.verbs.length > 0;
  localStorage.setItem(TRAINING_LIST_KEY, JSON.stringify(appState.trainingList));
}

function sanitizeVerbIds(ids) {
  if (!Array.isArray(ids)) {
    return [];
  }
  const seen = new Set();
  return ids.filter((id) => {
    const keep = VERB_IDS.has(id) && !seen.has(id);
    seen.add(id);
    return keep;
  });
}

function selectedVerbIds() {
  const ids = sanitizeVerbIds(appState.trainingList.verbs);
  if (ids.length !== appState.trainingList.verbs.length) {
    appState.trainingList.verbs = ids;
  }
  return ids;
}

function selectedVerbItems() {
  return selectedVerbIds()
    .map((id) => VERB_LOOKUP.get(id))
    .filter(Boolean);
}

function isVerbListActive() {
  return appState.trainingList.useVerbList && selectedVerbIds().length > 0;
}

function activeVerbItems() {
  const items = selectedVerbItems();
  return isVerbListActive() && items.length ? items : VERB_ITEMS;
}

function verbPatternLabel(item) {
  return `${item.prep} + ${CASE_SHORT[item.caseKey]}`;
}

function normalizeSearch(value) {
  return String(value)
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeVerbName(value) {
  return normalizeSearch(value)
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function bareVerbName(value) {
  return normalizeVerbName(value).replace(/^sich\s+/, "");
}

function verbSearchText(item) {
  return normalizeSearch(
    [
      item.id,
      item.verb,
      item.prep,
      CASES[item.caseKey],
      CASE_SHORT[item.caseKey],
      item.pattern,
      item.meaning,
      item.sentence
    ].join(" ")
  );
}

function verbNameMatchesTerm(item, term) {
  const normalizedTerm = normalizeVerbName(term);
  const bareTerm = bareVerbName(term);
  const normalizedVerb = normalizeVerbName(item.verb);
  const bareVerb = bareVerbName(item.verb);
  return (
    normalizedTerm === normalizedVerb ||
    normalizedTerm === bareVerb ||
    bareTerm === normalizedVerb ||
    bareTerm === bareVerb
  );
}

function bulkVerbTerms(value = appState.verbSearch) {
  const seen = new Set();
  return String(value)
    .split(/[,;\n\r/|]+/)
    .map((term) => term.trim())
    .filter(Boolean)
    .filter((term) => {
      const normalized = normalizeVerbName(term);
      const keep = normalized && !seen.has(normalized);
      seen.add(normalized);
      return keep;
    });
}

function bulkVerbSummary(value = appState.verbSearch) {
  const terms = bulkVerbTerms(value);
  const seenIds = new Set();
  const items = [];
  const missing = [];

  terms.forEach((term) => {
    const matches = VERB_ITEMS.filter((item) => verbNameMatchesTerm(item, term));
    if (!matches.length) {
      missing.push(term);
      return;
    }
    matches.forEach((item) => {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        items.push(item);
      }
    });
  });

  return {
    terms,
    items,
    missing
  };
}

function matchingVerbItems() {
  const bulk = bulkVerbSummary(appState.verbSearch);
  if (bulk.terms.length > 1) {
    const selected = new Set(selectedVerbIds());
    return bulk.items
      .sort((a, b) => {
        const selectedSort = Number(selected.has(b.id)) - Number(selected.has(a.id));
        return selectedSort || a.verb.localeCompare(b.verb, "de-DE");
      })
      .slice(0, 32);
  }

  const terms = normalizeSearch(appState.verbSearch).trim().split(/\s+/).filter(Boolean);
  const selected = new Set(selectedVerbIds());
  return VERB_ITEMS.filter((item) => {
    const text = verbSearchText(item);
    return terms.every((term) => text.includes(term));
  })
    .sort((a, b) => {
      const selectedSort = Number(selected.has(b.id)) - Number(selected.has(a.id));
      return selectedSort || a.verb.localeCompare(b.verb, "de-DE");
    })
    .slice(0, terms.length ? 12 : 8);
}

function addBulkVerbMatches() {
  const summary = bulkVerbSummary();
  if (!summary.items.length) {
    appState.verbBulkStatus = summary.terms.length
      ? `No examples found for ${summary.terms.join(", ")}.`
      : "";
    renderVerbTrainingList();
    return;
  }

  const ids = selectedVerbIds();
  const selected = new Set(ids);
  let added = 0;
  summary.items.forEach((item) => {
    if (!selected.has(item.id)) {
      selected.add(item.id);
      ids.push(item.id);
      added += 1;
    }
  });

  appState.trainingList.verbs = ids;
  appState.trainingList.useVerbList = true;
  appState.verbBulkStatus = bulkStatusText(summary, added);
  saveTrainingList();
  refreshAfterTrainingListChange(true);
}

function bulkStatusText(summary, added) {
  const countLabel = `${summary.items.length} example${summary.items.length === 1 ? "" : "s"} found`;
  const addLabel = added ? `${added} added` : "already selected";
  if (summary.missing.length) {
    return `${countLabel}, ${addLabel}. Missing: ${summary.missing.join(", ")}.`;
  }
  return `${countLabel}, ${addLabel}.`;
}

function toggleVerbInTrainingList(id) {
  if (!VERB_IDS.has(id)) {
    return;
  }
  const wasActive = isVerbListActive();
  const ids = selectedVerbIds();
  const index = ids.indexOf(id);
  if (index >= 0) {
    ids.splice(index, 1);
  } else {
    ids.push(id);
  }
  appState.trainingList.verbs = ids;
  if (!ids.length) {
    appState.trainingList.useVerbList = false;
  }
  saveTrainingList();
  refreshAfterTrainingListChange(wasActive || isVerbListActive());
}

function setVerbListEnabled(enabled) {
  appState.trainingList.useVerbList = enabled && selectedVerbIds().length > 0;
  saveTrainingList();
  refreshAfterTrainingListChange(true);
}

function clearVerbTrainingList() {
  const wasActive = isVerbListActive();
  appState.trainingList.verbs = [];
  appState.trainingList.useVerbList = false;
  saveTrainingList();
  refreshAfterTrainingListChange(wasActive);
}

function refreshAfterTrainingListChange(advance) {
  if (advance && appState.topic === "verbs" && !appState.reviewOnly) {
    nextExercise();
  } else {
    render();
  }
}

function getTopicStats(topic) {
  if (!appState.progress.topics[topic]) {
    appState.progress.topics[topic] = { total: 0, correct: 0 };
  }
  return appState.progress.topics[topic];
}

function getItemStats(id) {
  if (!appState.progress.items[id]) {
    appState.progress.items[id] = { seen: 0, correct: 0, mastery: 0 };
  }
  return appState.progress.items[id];
}

function currentTopicMisses(includeResolved = false) {
  return appState.progress.misses.filter(
    (miss) =>
      miss.topic === appState.topic &&
      miss.exercise &&
      (includeResolved || !miss.resolved)
  );
}

function hasTopicMisses(topic = appState.topic) {
  return appState.progress.misses.some((miss) => miss.topic === topic && miss.exercise);
}

function mistakeSignature(exercise) {
  return exercise.reviewSignature || `${exercise.id}|${exercise.prompt}|${exercise.answer}`;
}

function exerciseSnapshot(exercise) {
  return {
    topic: exercise.topic,
    id: exercise.id,
    title: exercise.title,
    prompt: exercise.prompt,
    answer: exercise.answer,
    options: [...exercise.options],
    meta: exercise.meta.filter(([label]) => label !== "Review"),
    explanation: exercise.explanation
  };
}

function exerciseFromMistake(miss) {
  return {
    ...miss.exercise,
    options: [...miss.exercise.options],
    meta: [["Review", miss.resolved ? "Mistake history" : "Active mistake"], ...miss.exercise.meta],
    reviewSignature: miss.signature
  };
}

function recordMistake(exercise, selected) {
  const signature = mistakeSignature(exercise);
  const existingIndex = appState.progress.misses.findIndex((miss) => miss.signature === signature);
  const existing = existingIndex >= 0 ? appState.progress.misses[existingIndex] : null;
  const nextMiss = {
    signature,
    topic: exercise.topic,
    answer: exercise.answer,
    selected,
    label: exercise.explanation,
    exercise: exerciseSnapshot(exercise),
    missedCount: (existing?.missedCount || 0) + 1,
    resolved: false,
    at: Date.now()
  };

  if (existingIndex >= 0) {
    appState.progress.misses.splice(existingIndex, 1);
  }
  appState.progress.misses.unshift(nextMiss);
  appState.progress.misses = appState.progress.misses.slice(0, 80);
}

function resolveMistake(exercise) {
  if (!exercise.reviewSignature) {
    return;
  }
  const miss = appState.progress.misses.find(
    (candidate) => candidate.signature === exercise.reviewSignature
  );
  if (miss) {
    miss.resolved = true;
    miss.resolvedAt = Date.now();
  }
}

function adjectiveWithEnding(stem, ending) {
  return `${stem}${ending}`;
}

function nounForm(noun, gender, caseKey) {
  if (gender === "pl") {
    return noun.plural[caseKey];
  }
  return noun[caseKey];
}

function sentenceFor(caseKey, phrase) {
  const templates = {
    nom: [
      `${capitalizeFirst(phrase)} ist hier.`,
      `${capitalizeFirst(phrase)} fehlt noch.`,
      `${capitalizeFirst(phrase)} bleibt wichtig.`
    ],
    akk: [
      `Ich sehe ${phrase}.`,
      `Wir brauchen ${phrase}.`,
      `Sie sucht ${phrase}.`
    ],
    dat: [
      `Mit ${phrase} wird es leichter.`,
      `Bei ${phrase} gibt es eine Frage.`,
      `Nach ${phrase} beginnt die Pause.`
    ],
    gen: [
      `Trotz ${phrase} bleiben wir ruhig.`,
      `Wegen ${phrase} rufen wir an.`
    ]
  };
  return sample(templates[caseKey]);
}

function capitalizeFirst(value) {
  return value.charAt(0).toLocaleUpperCase("de-DE") + value.slice(1);
}

function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  return list
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function adjectivesForNoun(noun) {
  return NOUN_ADJECTIVES[noun.nom] || ADJECTIVES;
}

function buildAdjectiveExercise() {
  const types =
    appState.adjFilter === "all"
      ? ["definite", "mixed", "strong"]
      : [appState.adjFilter];
  const articleType = sample(types);
  const caseKey = sample(Object.keys(CASES));
  let noun;
  let gender;
  if (articleType === "strong" && Math.random() > 0.42) {
    noun = sample(STRONG_SINGULAR_NOUNS);
    gender = noun.gender;
  } else {
    noun = sample(NOUNS);
    gender = articleType === "strong" || Math.random() < 0.28 ? "pl" : noun.gender;
  }
  const adjective = sample(adjectivesForNoun(noun));
  const article = ARTICLES[articleType][gender][caseKey];
  const ending = ADJECTIVE_ENDINGS[articleType][caseKey][gender];
  const fullAnswer = adjectiveWithEnding(adjective, ending);
  const word = nounForm(noun, gender, caseKey);
  const blank = appState.adjMode === "ending" ? `${adjective}___` : "___";
  const phraseParts = article ? [article, blank, word] : [blank, word];
  const completedParts = article ? [article, fullAnswer, word] : [fullAnswer, word];
  const prompt = sentenceFor(caseKey, phraseParts.join(" "));
  const completedPrompt = sentenceFor(caseKey, completedParts.join(" "));
  const endings = ["e", "en", "er", "es", "em"];
  const base = {
    topic: "adjective",
    id: `adj:${appState.adjMode}:${articleType}:${caseKey}:${gender}:${noun.nom}:${adjective}`,
    meta: [
      ["Article", ARTICLE_TYPES[articleType]],
      ["Case", CASES[caseKey]],
      ["Gender", GENDERS[gender]],
      ["Noun", gender === "pl" ? noun.plural.nom : noun.nom]
    ],
    explanation: `${ARTICLE_TYPES[articleType]}, ${CASES[caseKey]}, ${GENDERS[gender]}: ${fullAnswer}.`
  };

  if (appState.adjMode === "case") {
    return {
      ...base,
      title: "Which case?",
      prompt: completedPrompt,
      answer: CASES[caseKey],
      options: shuffle(Object.values(CASES)),
      meta: [
        ["Article", ARTICLE_TYPES[articleType]],
        ["Gender", GENDERS[gender]],
        ["Adjective", fullAnswer],
        ["Focus", "Case"]
      ],
      explanation: `${completedParts.join(" ")} is ${CASES[caseKey]}; the adjective form is ${fullAnswer}.`
    };
  }

  if (appState.adjMode === "article") {
    return {
      ...base,
      title: "Which article pattern?",
      prompt: completedPrompt,
      answer: ARTICLE_TYPES[articleType],
      options: shuffle(Object.values(ARTICLE_TYPES)),
      meta: [
        ["Case", CASES[caseKey]],
        ["Gender", GENDERS[gender]],
        ["Adjective", fullAnswer],
        ["Focus", "Article type"]
      ],
      explanation: `${completedParts.join(" ")} uses ${ARTICLE_TYPES[articleType]}; the adjective form is ${fullAnswer}.`
    };
  }

  if (appState.adjMode === "gender") {
    return {
      ...base,
      title: "Which gender or number?",
      prompt: completedPrompt,
      answer: GENDERS[gender],
      options: shuffle(Object.values(GENDERS)),
      meta: [
        ["Article", ARTICLE_TYPES[articleType]],
        ["Case", CASES[caseKey]],
        ["Adjective", fullAnswer],
        ["Focus", "Gender/number"]
      ],
      explanation: `${completedParts.join(" ")} is ${GENDERS[gender]} in ${CASES[caseKey]}; the adjective form is ${fullAnswer}.`
    };
  }

  const answer = appState.adjMode === "ending" ? `-${ending}` : fullAnswer;
  const optionPool =
    appState.adjMode === "ending"
      ? endings.map((candidate) => `-${candidate}`)
      : endings.map((candidate) => adjectiveWithEnding(adjective, candidate));
  const options = shuffle(Array.from(new Set([answer, ...optionPool]))).slice(0, 4);

  if (!options.includes(answer)) {
    options[Math.floor(Math.random() * options.length)] = answer;
  }

  return {
    ...base,
    title: appState.adjMode === "ending" ? "Ending only" : "Adjective form",
    prompt,
    answer,
    options: shuffle(options),
    meta: [
      ["Article", ARTICLE_TYPES[articleType]],
      ["Case", CASES[caseKey]],
      ["Gender", GENDERS[gender]],
      ["Focus", appState.adjMode === "ending" ? "Ending" : adjective]
    ]
  };
}

function buildVerbExercise() {
  const item = weightedPick(activeVerbItems());
  const mode = appState.verbMode;

  if (mode === "case") {
    return {
      topic: "verbs",
      id: `verb-case:${item.id}`,
      title: "Case after preposition",
      prompt: item.sentence.replace("___", item.prep),
      answer: CASES[item.caseKey],
      options: shuffle(["Akkusativ", "Dativ", "Genitiv", "Nominativ"]),
      meta: [
        ["Verb", item.verb],
        ["Preposition", item.prep],
        ["Meaning", item.meaning],
        ["Focus", "Case"]
      ],
      explanation: item.pattern
    };
  }

  if (mode === "pattern") {
    const patterns = Array.from(new Set(VERB_ITEMS.map((verbItem) => verbItem.pattern)));
    const distractors = shuffle(patterns.filter((pattern) => pattern !== item.pattern)).slice(0, 3);

    return {
      topic: "verbs",
      id: `verb-pattern:${item.id}`,
      title: "Full verb pattern",
      prompt: item.sentence.replace("___", item.prep),
      answer: item.pattern,
      options: shuffle([item.pattern, ...distractors]),
      meta: [
        ["Verb", item.verb],
        ["Meaning", item.meaning],
        ["Focus", "Full pattern"],
        ["Sentence", "Preposition shown"]
      ],
      explanation: item.pattern
    };
  }

  const distractors = shuffle(PREPOSITIONS.filter((prep) => prep !== item.prep)).slice(0, 3);

  return {
    topic: "verbs",
    id: `verb-prep:${item.id}`,
    title: "Missing preposition",
    prompt: item.sentence,
    answer: item.prep,
    options: shuffle([item.prep, ...distractors]),
    meta: [
      ["Verb", item.verb],
      ["Case", CASES[item.caseKey]],
      ["Meaning", item.meaning],
      ["Focus", "Preposition"]
    ],
    explanation: item.pattern
  };
}

function weightedPick(items) {
  const weighted = items.flatMap((item) => {
    const prepStats = getItemStats(`verb-prep:${item.id}`);
    const caseStats = getItemStats(`verb-case:${item.id}`);
    const patternStats = getItemStats(`verb-pattern:${item.id}`);
    const mastery = Math.min(prepStats.mastery, caseStats.mastery, patternStats.mastery);
    const weight = Math.max(1, 6 - mastery);
    return Array.from({ length: weight }, () => item);
  });
  return sample(weighted);
}

function nextExercise() {
  if (appState.reviewOnly) {
    const miss = sample(currentTopicMisses(false)) || sample(currentTopicMisses(true));
    if (miss) {
      appState.current = exerciseFromMistake(miss);
    } else {
      appState.reviewOnly = false;
      appState.current =
        appState.topic === "adjective" ? buildAdjectiveExercise() : buildVerbExercise();
    }
  } else {
    appState.current =
      appState.topic === "adjective" ? buildAdjectiveExercise() : buildVerbExercise();
  }
  appState.selected = "";
  appState.answered = false;
  elements.feedbackBox.textContent = "";
  elements.feedbackBox.className = "feedback";
  render();
}

function reviewMistake(signature) {
  const miss = appState.progress.misses.find((candidate) => candidate.signature === signature);
  if (!miss?.exercise) {
    return;
  }
  appState.topic = miss.topic;
  appState.reviewOnly = true;
  appState.current = exerciseFromMistake(miss);
  appState.selected = "";
  appState.answered = false;
  elements.feedbackBox.textContent = "";
  elements.feedbackBox.className = "feedback";
  render();
}

function render() {
  renderHeaderStats();
  renderTopicChrome();
  renderControls();
  renderQuestion();
  renderVerbTrainingList();
  renderTopicStats();
}

function renderHeaderStats() {
  const { total, correct, streak, bestStreak } = appState.progress;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  elements.streak.textContent = String(streak);
  elements.accuracy.textContent = `${accuracy}%`;
  elements.total.textContent = String(total);
  elements.bestStreak.textContent = String(bestStreak);
}

function renderTopicChrome() {
  elements.topicButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.topic === appState.topic);
  });

  if (appState.topic === "adjective") {
    elements.topicKicker.textContent = "Cases, gender, article type";
    elements.topicTitle.textContent = "Adjective ending";
    elements.dataBadge.textContent = `${NOUNS.length + STRONG_SINGULAR_NOUNS.length} nouns, ${ADJECTIVES.length} adjectives`;
  } else {
    const selectedCount = selectedVerbIds().length;
    elements.topicKicker.textContent = "Preposition plus case";
    elements.topicTitle.textContent = "Verb pattern";
    elements.dataBadge.textContent = isVerbListActive()
      ? `${selectedCount} selected of ${VERB_ITEMS.length} patterns`
      : `${VERB_ITEMS.length} authored patterns`;
  }
}

function renderControls() {
  elements.controlsRow.replaceChildren();
  const controls =
    appState.topic === "adjective"
      ? [
          ["mode", "form", "Full word"],
          ["mode", "ending", "Ending only"],
          ["mode", "case", "Case"],
          ["mode", "article", "Article type"],
          ["mode", "gender", "Gender"],
          ["review", "mistakes", "Mistakes"],
          ["filter", "all", "All"],
          ["filter", "definite", "der/die/das"],
          ["filter", "mixed", "ein/kein/mein"],
          ["filter", "strong", "No article"]
        ]
      : [
          ["mode", "prep", "Preposition"],
          ["mode", "case", "Case"],
          ["mode", "pattern", "Pattern"],
          ["review", "mistakes", "Mistakes"]
        ];

  controls.forEach(([kind, value, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-button";
    button.textContent = label;
    button.disabled = kind === "review" && !hasTopicMisses();
    const active =
      appState.topic === "adjective"
        ? (kind === "review" && appState.reviewOnly) ||
          (kind === "mode" && appState.adjMode === value) ||
          (kind === "filter" && appState.adjFilter === value)
        : (kind === "review" && appState.reviewOnly) ||
          (kind === "mode" && appState.verbMode === value);
    button.classList.toggle("active", active);
    button.addEventListener("click", () => {
      if (kind === "review") {
        appState.reviewOnly = !appState.reviewOnly;
      } else if (appState.topic === "adjective") {
        appState.reviewOnly = false;
        if (kind === "mode") {
          appState.adjMode = value;
        } else {
          appState.adjFilter = value;
        }
      } else {
        appState.reviewOnly = false;
        appState.verbMode = value;
      }
      nextExercise();
    });
    elements.controlsRow.append(button);
  });
}

function renderQuestion() {
  const exercise = appState.current;
  elements.metaGrid.replaceChildren();
  exercise.meta.forEach(([label, value]) => {
    const item = document.createElement("div");
    item.className = "meta-item";
    const labelEl = document.createElement("span");
    labelEl.textContent = label;
    const valueEl = document.createElement("strong");
    valueEl.textContent = value;
    item.append(labelEl, valueEl);
    elements.metaGrid.append(item);
  });

  elements.promptText.innerHTML = escapeHtml(exercise.prompt).replace("___", '<span class="blank">___</span>');
  elements.answerGrid.replaceChildren();
  exercise.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = option;
    button.classList.toggle("selected", appState.selected === option);
    if (appState.answered) {
      button.disabled = true;
      button.classList.toggle("correct", option === exercise.answer);
      button.classList.toggle("incorrect", option === appState.selected && option !== exercise.answer);
    }
    button.addEventListener("click", () => {
      if (appState.answered) {
        return;
      }
      appState.selected = option;
      renderQuestion();
      elements.feedbackBox.textContent = "";
      elements.feedbackBox.className = "feedback";
    });
    elements.answerGrid.append(button);
  });

  elements.submitButton.classList.toggle("hidden", appState.answered);
  elements.nextButton.classList.toggle("hidden", !appState.answered);
}

function renderTopicStats() {
  const topicStats = getTopicStats(appState.topic);
  const missed = topicStats.total - topicStats.correct;
  const accuracy = topicStats.total ? Math.round((topicStats.correct / topicStats.total) * 100) : 0;
  elements.topicAccuracyLabel.textContent = `${accuracy}% topic accuracy`;
  elements.topicMeter.style.width = `${accuracy}%`;
  elements.topicCorrect.textContent = String(topicStats.correct);
  elements.topicMissed.textContent = String(missed);

  elements.missList.replaceChildren();
  const misses = appState.progress.misses
    .filter((miss) => miss.topic === appState.topic)
    .slice(0, 8);

  if (!misses.length) {
    const item = document.createElement("li");
    item.textContent = "No misses yet.";
    elements.missList.append(item);
    return;
  }

  misses.forEach((miss) => {
    const item = document.createElement("li");
    if (!miss.exercise) {
      item.innerHTML = `<strong>${escapeHtml(miss.answer)}</strong> in ${escapeHtml(miss.label)}`;
      elements.missList.append(item);
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "miss-button";
    const answer = document.createElement("strong");
    answer.textContent = miss.answer;
    const detail = document.createElement("span");
    detail.textContent = `${miss.resolved ? "reviewed" : `${miss.missedCount || 1}x missed`} · ${miss.exercise.title}`;
    button.append(answer, detail);
    button.addEventListener("click", () => reviewMistake(miss.signature));
    item.append(button);
    elements.missList.append(item);
  });
}

function renderVerbTrainingList() {
  const isVerbTopic = appState.topic === "verbs";
  elements.verbListBlock.classList.toggle("hidden", !isVerbTopic);
  if (!isVerbTopic) {
    return;
  }

  const selectedIds = selectedVerbIds();
  const selectedSet = new Set(selectedIds);
  const selectedItems = selectedVerbItems();
  elements.verbListCount.textContent = `${selectedIds.length} selected`;
  elements.verbListToggle.checked = isVerbListActive();
  elements.verbListToggle.disabled = !selectedIds.length;
  elements.verbListClear.disabled = !selectedIds.length;
  const bulk = bulkVerbSummary();
  const newBulkItems = bulk.items.filter((item) => !selectedSet.has(item.id)).length;
  elements.verbBulkAdd.disabled = !bulk.items.length;
  elements.verbBulkStatus.textContent =
    appState.verbBulkStatus ||
    (bulk.terms.length > 1 ? bulkStatusText(bulk, newBulkItems) : "");
  elements.verbBulkStatus.className = `verb-bulk-status${
    bulk.items.length && bulk.terms.length > 1 ? " good" : ""
  }${!bulk.items.length && bulk.terms.length > 1 ? " bad" : ""}`;

  if (document.activeElement !== elements.verbSearchInput) {
    elements.verbSearchInput.value = appState.verbSearch;
  }

  elements.selectedVerbList.replaceChildren();
  if (!selectedItems.length) {
    const empty = document.createElement("div");
    empty.className = "selected-verb-empty";
    empty.textContent = "No words selected.";
    elements.selectedVerbList.append(empty);
  } else {
    selectedItems.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "selected-verb-chip";
      button.title = "Remove";
      const name = document.createElement("strong");
      name.textContent = item.verb;
      const pattern = document.createElement("span");
      pattern.textContent = verbPatternLabel(item);
      const mark = document.createElement("span");
      mark.className = "remove-mark";
      mark.textContent = "x";
      button.append(name, pattern, mark);
      button.addEventListener("click", () => toggleVerbInTrainingList(item.id));
      elements.selectedVerbList.append(button);
    });
  }

  elements.verbSearchResults.replaceChildren();
  const results = matchingVerbItems();
  if (!results.length) {
    const item = document.createElement("li");
    item.className = "verb-result-empty";
    item.textContent = "No matches.";
    elements.verbSearchResults.append(item);
    return;
  }

  results.forEach((verbItem) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    const selected = selectedSet.has(verbItem.id);
    button.type = "button";
    button.className = "verb-result-button";
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    const name = document.createElement("strong");
    name.textContent = verbItem.verb;
    const detail = document.createElement("span");
    detail.textContent = `${verbPatternLabel(verbItem)} · ${verbItem.meaning}`;
    button.append(name, detail);
    button.addEventListener("click", () => toggleVerbInTrainingList(verbItem.id));
    item.append(button);
    elements.verbSearchResults.append(item);
  });
}

function submitAnswer() {
  if (!appState.selected || appState.answered) {
    elements.feedbackBox.textContent = "Choose an answer first.";
    elements.feedbackBox.className = "feedback bad";
    return;
  }

  const exercise = appState.current;
  const correct = appState.selected === exercise.answer;
  const topicStats = getTopicStats(exercise.topic);
  const itemStats = getItemStats(exercise.id);

  appState.answered = true;
  appState.progress.total += 1;
  topicStats.total += 1;
  itemStats.seen += 1;

  if (correct) {
    appState.progress.correct += 1;
    appState.progress.streak += 1;
    appState.progress.bestStreak = Math.max(
      appState.progress.bestStreak,
      appState.progress.streak
    );
    topicStats.correct += 1;
    itemStats.correct += 1;
    itemStats.mastery = Math.min(5, itemStats.mastery + 1);
    resolveMistake(exercise);
    elements.feedbackBox.textContent = `Correct. ${exercise.explanation}`;
    elements.feedbackBox.className = "feedback good";
  } else {
    appState.progress.streak = 0;
    itemStats.mastery = Math.max(0, itemStats.mastery - 2);
    recordMistake(exercise, appState.selected);
    elements.feedbackBox.textContent = `Answer: ${exercise.answer}. ${exercise.explanation}`;
    elements.feedbackBox.className = "feedback bad";
  }

  saveProgress();
  render();
}

function resetProgress() {
  if (!window.confirm("Reset all local progress?")) {
    return;
  }
  localStorage.removeItem(STORE_KEY);
  appState.progress = loadProgress();
  nextExercise();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

elements.topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.topic = button.dataset.topic;
    appState.reviewOnly = false;
    nextExercise();
  });
});

elements.submitButton.addEventListener("click", submitAnswer);
elements.nextButton.addEventListener("click", nextExercise);
elements.resetButton.addEventListener("click", resetProgress);
elements.verbSearchInput.addEventListener("input", (event) => {
  appState.verbSearch = event.target.value;
  appState.verbBulkStatus = "";
  renderVerbTrainingList();
});
elements.verbBulkAdd.addEventListener("click", addBulkVerbMatches);
elements.verbListToggle.addEventListener("change", (event) => {
  setVerbListEnabled(event.target.checked);
});
elements.verbListClear.addEventListener("click", clearVerbTrainingList);

nextExercise();
