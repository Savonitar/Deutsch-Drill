"use strict";

const STORE_KEY = "deutsch-drill-progress-v1";
const TRAINING_LIST_KEY = "deutsch-drill-training-list-v1";
const TRANSLATION_LANGUAGE_KEY = "deutsch-drill-translation-language-v1";
const FAVORITES_KEY = "deutsch-drill-favourites-v1";
const UI_PREFERENCES_KEY = "deutsch-drill-ui-preferences-v1";
const VERB_SENTENCE_COOLDOWN = 8;

const TOPICS = ["adjective", "verbs"];
const ADJECTIVE_MODES = ["form", "ending", "case", "article", "gender"];
const ADJECTIVE_FILTERS = ["all", "definite", "mixed", "strong"];
const VERB_MODES = ["prep", "case", "pattern"];
const DEFAULT_UI_PREFERENCES = {
  topic: "adjective",
  adjMode: "form",
  adjFilter: "all",
  verbMode: "prep"
};

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

const PREPOSITIONS = Array.from(new Set(VERB_ITEMS.map((item) => item.prep))).sort((a, b) =>
  a.localeCompare(b, "de-DE")
);
const VERB_PATTERN_CASE_KEYS = Array.from(new Set(VERB_ITEMS.map((item) => item.caseKey)));
const VERB_LOOKUP = new Map(VERB_ITEMS.map((item) => [item.id, item]));
const VERB_IDS = new Set(VERB_LOOKUP.keys());

const TRANSLATION_LANGUAGES = {
  en: "English",
  ru: "Русский",
  uk: "Українська",
  tr: "Türkçe"
};

const elements = {
  streak: document.querySelector("#streakValue"),
  accuracy: document.querySelector("#accuracyValue"),
  total: document.querySelector("#totalValue"),
  topicButtons: document.querySelectorAll("[data-topic]"),
  topicKicker: document.querySelector("#topicKicker"),
  topicTitle: document.querySelector("#topicTitle"),
  dataBadge: document.querySelector("#dataBadge"),
  favoriteButton: document.querySelector("#favoriteButton"),
  controlsRow: document.querySelector("#controlsRow"),
  metaGrid: document.querySelector("#metaGrid"),
  promptText: document.querySelector("#promptText"),
  answerGrid: document.querySelector("#answerGrid"),
  translationPanel: document.querySelector("#translationPanel"),
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
  translationLanguage: document.querySelector("#translationLanguage"),
  verbSearchInput: document.querySelector("#verbSearchInput"),
  selectedVerbList: document.querySelector("#selectedVerbList"),
  verbBulkAdd: document.querySelector("#verbBulkAdd"),
  verbBulkStatus: document.querySelector("#verbBulkStatus"),
  verbListClear: document.querySelector("#verbListClear"),
  verbSearchResults: document.querySelector("#verbSearchResults"),
  favoriteListBlock: document.querySelector("#favoriteListBlock"),
  favoriteCount: document.querySelector("#favoriteCount"),
  favoriteToggle: document.querySelector("#favoriteToggle"),
  favoriteList: document.querySelector("#favoriteList"),
  favoriteClear: document.querySelector("#favoriteClear")
};

const uiPreferences = loadUiPreferences();

const appState = {
  topic: uiPreferences.topic,
  adjMode: uiPreferences.adjMode,
  adjFilter: uiPreferences.adjFilter,
  verbMode: uiPreferences.verbMode,
  verbSearch: "",
  verbBulkStatus: "",
  translationLanguage: loadTranslationLanguage(),
  reviewOnly: false,
  current: null,
  selected: "",
  answered: false,
  recentVerbSentenceKeys: [],
  progress: loadProgress(),
  trainingList: loadTrainingList(),
  favorites: loadFavorites()
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

function loadTranslationLanguage() {
  const saved = localStorage.getItem(TRANSLATION_LANGUAGE_KEY);
  return Object.prototype.hasOwnProperty.call(TRANSLATION_LANGUAGES, saved) ? saved : "en";
}

function saveTranslationLanguage() {
  localStorage.setItem(TRANSLATION_LANGUAGE_KEY, appState.translationLanguage);
}

function loadUiPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(UI_PREFERENCES_KEY));
    return sanitizeUiPreferences(saved);
  } catch (error) {
    localStorage.removeItem(UI_PREFERENCES_KEY);
  }
  return { ...DEFAULT_UI_PREFERENCES };
}

function sanitizeUiPreferences(saved) {
  if (!saved || typeof saved !== "object") {
    return { ...DEFAULT_UI_PREFERENCES };
  }
  return {
    topic: TOPICS.includes(saved.topic) ? saved.topic : DEFAULT_UI_PREFERENCES.topic,
    adjMode: ADJECTIVE_MODES.includes(saved.adjMode)
      ? saved.adjMode
      : DEFAULT_UI_PREFERENCES.adjMode,
    adjFilter: ADJECTIVE_FILTERS.includes(saved.adjFilter)
      ? saved.adjFilter
      : DEFAULT_UI_PREFERENCES.adjFilter,
    verbMode: VERB_MODES.includes(saved.verbMode)
      ? saved.verbMode
      : DEFAULT_UI_PREFERENCES.verbMode
  };
}

function saveUiPreferences() {
  localStorage.setItem(
    UI_PREFERENCES_KEY,
    JSON.stringify({
      topic: appState.topic,
      adjMode: appState.adjMode,
      adjFilter: appState.adjFilter,
      verbMode: appState.verbMode
    })
  );
}

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    if (saved && typeof saved === "object") {
      const items = sanitizeFavorites(saved.items);
      return {
        items,
        useFavorites: sanitizeFavoriteUsage(saved.useFavorites, items)
      };
    }
  } catch (error) {
    localStorage.removeItem(FAVORITES_KEY);
  }
  return emptyFavorites();
}

function emptyFavorites() {
  return {
    items: [],
    useFavorites: { adjective: false, verbs: false }
  };
}

function saveFavorites() {
  appState.favorites.items = sanitizeFavorites(appState.favorites.items);
  appState.favorites.useFavorites = sanitizeFavoriteUsage(
    appState.favorites.useFavorites,
    appState.favorites.items
  );
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(appState.favorites));
}

function sanitizeFavoriteUsage(value, items) {
  const counts = favoriteCountsByTopic(items);
  return {
    adjective: Boolean(value?.adjective) && counts.adjective > 0,
    verbs: Boolean(value?.verbs) && counts.verbs > 0
  };
}

function favoriteCountsByTopic(items) {
  return items.reduce(
    (counts, favorite) => {
      if (favorite.topic === "adjective" || favorite.topic === "verbs") {
        counts[favorite.topic] += 1;
      }
      return counts;
    },
    { adjective: 0, verbs: 0 }
  );
}

function sanitizeFavorites(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  const seen = new Set();
  return items
    .map((favorite) => sanitizeFavorite(favorite))
    .filter(Boolean)
    .filter((favorite) => {
      const keep = !seen.has(favorite.signature);
      seen.add(favorite.signature);
      return keep;
    })
    .slice(0, 120);
}

function sanitizeFavorite(favorite) {
  const exercise = sanitizeExerciseSnapshot(favorite?.exercise);
  if (!exercise) {
    return null;
  }
  return {
    signature: String(favorite.signature || favoriteSignatureFor(exercise)),
    topic: exercise.topic,
    exercise,
    at: Number(favorite.at) || Date.now()
  };
}

function sanitizeExerciseSnapshot(exercise) {
  if (
    !exercise ||
    (exercise.topic !== "adjective" && exercise.topic !== "verbs") ||
    typeof exercise.id !== "string" ||
    typeof exercise.title !== "string" ||
    typeof exercise.prompt !== "string" ||
    typeof exercise.answer !== "string" ||
    !Array.isArray(exercise.options) ||
    !exercise.options.includes(exercise.answer) ||
    !Array.isArray(exercise.meta)
  ) {
    return null;
  }

  return {
    topic: exercise.topic,
    verbItemId: exercise.verbItemId,
    verbSentence: exercise.verbSentence,
    id: exercise.id,
    title: exercise.title,
    prompt: exercise.prompt,
    answer: exercise.answer,
    options: [...exercise.options],
    meta: exercise.meta
      .filter((row) => Array.isArray(row) && row.length >= 2)
      .map(([label, value]) => [String(label), String(value)])
      .filter(([label]) => label !== "Review" && label !== "Favourite"),
    explanation: String(exercise.explanation || "")
  };
}

function completedVerbSentence(item, sentence = item.sentence) {
  return sentence.replace("___", item.prep);
}

function verbSentencesFor(item) {
  if (Array.isArray(item.sentences) && item.sentences.length) {
    return item.sentences;
  }
  return [item.sentence];
}

function verbSentenceKey(item, sentence) {
  return `${item.id}\u0000${sentence}`;
}

function verbItemWeight(item) {
  const prepStats = getItemStats(`verb-prep:${item.id}`);
  const caseStats = getItemStats(`verb-case:${item.id}`);
  const patternStats = getItemStats(`verb-pattern:${item.id}`);
  const mastery = Math.min(prepStats.mastery, caseStats.mastery, patternStats.mastery);
  return Math.max(1, 6 - mastery);
}

function verbSentenceCooldownLimit(candidates) {
  return Math.min(VERB_SENTENCE_COOLDOWN, Math.max(0, candidates.length - 1));
}

function trimRecentVerbSentenceKeys(candidates, nextKey = "") {
  const activeKeys = new Set(candidates.map((candidate) => candidate.key));
  const limit = verbSentenceCooldownLimit(candidates);
  if (limit === 0) {
    appState.recentVerbSentenceKeys = [];
    return;
  }
  appState.recentVerbSentenceKeys = appState.recentVerbSentenceKeys
    .filter((key) => activeKeys.has(key) && key !== nextKey)
    .slice(-limit);
}

function rememberVerbSentence(candidates, key) {
  trimRecentVerbSentenceKeys(candidates, key);
  const limit = verbSentenceCooldownLimit(candidates);
  if (limit > 0) {
    appState.recentVerbSentenceKeys.push(key);
    appState.recentVerbSentenceKeys = appState.recentVerbSentenceKeys.slice(-limit);
  }
}

function pickVerbExerciseSource(items) {
  const candidates = items.flatMap((item) =>
    verbSentencesFor(item).map((sentence) => ({
      item,
      sentence,
      key: verbSentenceKey(item, sentence)
    }))
  );
  trimRecentVerbSentenceKeys(candidates);
  const recentKeys = new Set(appState.recentVerbSentenceKeys);
  const freshCandidates = candidates.filter((candidate) => !recentKeys.has(candidate.key));
  const pool = freshCandidates.length ? freshCandidates : candidates;
  const weighted = pool.flatMap((candidate) =>
    Array.from({ length: verbItemWeight(candidate.item) }, () => candidate)
  );
  const selected = sample(weighted);
  rememberVerbSentence(candidates, selected.key);
  return selected;
}

function verbMeaningFor(item) {
  return VERB_TRANSLATIONS[item.id]?.en?.meaning || item.pattern;
}

function availableVerbTranslation(item, language) {
  const translations = VERB_TRANSLATIONS[item.id] || {};
  if (translations[language]) {
    return { language, entry: translations[language] };
  }
  if (translations.en) {
    return { language: "en", entry: translations.en };
  }
  return { language, entry: {} };
}

function verbTranslationFor(item, sentence = item.sentence) {
  const requestedLanguage = Object.prototype.hasOwnProperty.call(
    TRANSLATION_LANGUAGES,
    appState.translationLanguage
  )
    ? appState.translationLanguage
    : "en";
  const { language, entry } = availableVerbTranslation(item, requestedLanguage);
  return {
    language,
    languageLabel: TRANSLATION_LANGUAGES[language],
    verb: entry.verb || item.verb,
    meaning: entry.meaning || verbMeaningFor(item),
    sentence: entry.sentence || ""
  };
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

function favoritesForTopic(topic = appState.topic) {
  return appState.favorites.items.filter(
    (favorite) => favorite.topic === topic && favorite.exercise
  );
}

function isFavoritesActive(topic = appState.topic) {
  return Boolean(appState.favorites.useFavorites?.[topic]) && favoritesForTopic(topic).length > 0;
}

function verbPatternLabel(item) {
  return `${item.prep} + ${CASE_SHORT[item.caseKey]}`;
}

function verbPatternOption(item, prep, caseKey) {
  return `${item.verb} ${prep} + ${CASES[caseKey]}`;
}

function verbPatternOptions(item) {
  const options = new Set([item.pattern]);
  const normalizedVerb = normalizeVerbName(item.verb);

  VERB_ITEMS.filter(
    (verbItem) => verbItem.id !== item.id && normalizeVerbName(verbItem.verb) === normalizedVerb
  ).forEach((verbItem) => options.add(verbItem.pattern));

  VERB_PATTERN_CASE_KEYS.filter((caseKey) => caseKey !== item.caseKey).forEach((caseKey) => {
    options.add(verbPatternOption(item, item.prep, caseKey));
  });

  shuffle(
    PREPOSITIONS.flatMap((prep) =>
      VERB_PATTERN_CASE_KEYS.map((caseKey) => ({ prep, caseKey }))
    ).filter(({ prep, caseKey }) => prep !== item.prep || caseKey !== item.caseKey)
  ).forEach(({ prep, caseKey }) => {
    options.add(verbPatternOption(item, prep, caseKey));
  });

  return shuffle(Array.from(options).slice(0, 4));
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

function normalizeGermanKeyboard(value) {
  return String(value)
    .toLocaleLowerCase("de-DE")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedTermForms(value) {
  return Array.from(
    new Set([normalizeVerbName(value), normalizeGermanKeyboard(value)].filter(Boolean))
  );
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
      verbMeaningFor(item),
      ...verbSentencesFor(item)
    ].join(" ")
  );
}

function verbNameMatchesTerm(item, term) {
  const termForms = normalizedTermForms(term);
  const termTargets = new Set([
    ...termForms,
    ...termForms.map((form) => form.replace(/^sich\s+/, ""))
  ]);
  const verbForms = normalizedTermForms(item.verb);
  const bareVerbForms = verbForms.map((form) => form.replace(/^sich\s+/, ""));
  const prepForms = normalizedTermForms(item.prep);
  const itemTargets = new Set([...verbForms, ...bareVerbForms]);

  [...verbForms, ...bareVerbForms].forEach((verbForm) => {
    prepForms.forEach((prepForm) => itemTargets.add(`${verbForm} ${prepForm}`));
  });

  return Array.from(termTargets).some((termForm) => itemTargets.has(termForm));
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

function refreshCurrentVerbTranslation() {
  if (appState.topic !== "verbs" || !appState.current?.verbItemId) {
    return;
  }
  const item = VERB_LOOKUP.get(appState.current.verbItemId);
  if (!item) {
    return;
  }
  const translation = verbTranslationFor(item, appState.current.verbSentence || item.sentence);
  appState.current.translation = translation;
  appState.current.meta = appState.current.meta.map(([label, value]) =>
    label === "Meaning" ? [label, translation.meaning] : [label, value]
  );
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

function favoriteSignatureFor(exercise) {
  return (
    exercise.favoriteSignature ||
    exercise.reviewSignature ||
    `${exercise.id}|${exercise.prompt}|${exercise.answer}`
  );
}

function exerciseSnapshot(exercise) {
  return {
    topic: exercise.topic,
    verbItemId: exercise.verbItemId,
    verbSentence: exercise.verbSentence,
    id: exercise.id,
    title: exercise.title,
    prompt: exercise.prompt,
    answer: exercise.answer,
    options: [...exercise.options],
    meta: exercise.meta.filter(([label]) => label !== "Review" && label !== "Favourite"),
    explanation: exercise.explanation
  };
}

function exerciseFromMistake(miss) {
  const exercise = {
    ...miss.exercise,
    options: [...miss.exercise.options],
    meta: [["Review", miss.resolved ? "Mistake history" : "Active mistake"], ...miss.exercise.meta],
    reviewSignature: miss.signature
  };
  if (exercise.verbItemId && VERB_LOOKUP.has(exercise.verbItemId)) {
    const item = VERB_LOOKUP.get(exercise.verbItemId);
    const translation = verbTranslationFor(item, exercise.verbSentence || item.sentence);
    exercise.translation = translation;
    exercise.meta = exercise.meta.map(([label, value]) =>
      label === "Meaning" ? [label, translation.meaning] : [label, value]
    );
  }
  return exercise;
}

function exerciseFromFavorite(favorite) {
  const exercise = {
    ...favorite.exercise,
    options: [...favorite.exercise.options],
    meta: [["Favourite", "Saved drill"], ...favorite.exercise.meta],
    favoriteSignature: favorite.signature
  };
  if (exercise.verbItemId && VERB_LOOKUP.has(exercise.verbItemId)) {
    const item = VERB_LOOKUP.get(exercise.verbItemId);
    const translation = verbTranslationFor(item, exercise.verbSentence || item.sentence);
    exercise.translation = translation;
    exercise.meta = exercise.meta.map(([label, value]) =>
      label === "Meaning" ? [label, translation.meaning] : [label, value]
    );
  }
  return exercise;
}

function currentFavoriteIndex() {
  if (!appState.current) {
    return -1;
  }
  const signature = favoriteSignatureFor(appState.current);
  return appState.favorites.items.findIndex((favorite) => favorite.signature === signature);
}

function isCurrentFavorite() {
  return currentFavoriteIndex() >= 0;
}

function toggleCurrentFavorite() {
  if (!appState.current) {
    return;
  }
  const index = currentFavoriteIndex();
  if (index >= 0) {
    appState.favorites.items.splice(index, 1);
  } else {
    const snapshot = exerciseSnapshot(appState.current);
    appState.favorites.items.unshift({
      signature: favoriteSignatureFor(appState.current),
      topic: snapshot.topic,
      exercise: snapshot,
      at: Date.now()
    });
  }
  saveFavorites();
  render();
}

function setFavoriteTrainingEnabled(enabled) {
  appState.favorites.useFavorites[appState.topic] = enabled && favoritesForTopic().length > 0;
  appState.reviewOnly = false;
  saveFavorites();
  nextExercise();
}

function startFavorite(signature) {
  const favorite = appState.favorites.items.find((candidate) => candidate.signature === signature);
  if (!favorite) {
    return;
  }
  appState.topic = favorite.topic;
  appState.reviewOnly = false;
  appState.current = exerciseFromFavorite(favorite);
  appState.selected = "";
  appState.answered = false;
  elements.feedbackBox.textContent = "";
  elements.feedbackBox.className = "feedback";
  saveUiPreferences();
  render();
}

function removeFavorite(signature) {
  const wasActive = isFavoritesActive();
  appState.favorites.items = appState.favorites.items.filter(
    (favorite) => favorite.signature !== signature
  );
  saveFavorites();
  if (wasActive && !isFavoritesActive() && !appState.reviewOnly) {
    nextExercise();
  } else {
    render();
  }
}

function clearTopicFavorites() {
  const topic = appState.topic;
  const wasActive = isFavoritesActive(topic);
  appState.favorites.items = appState.favorites.items.filter(
    (favorite) => favorite.topic !== topic
  );
  appState.favorites.useFavorites[topic] = false;
  saveFavorites();
  if (wasActive && !appState.reviewOnly) {
    nextExercise();
  } else {
    render();
  }
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
  const { item, sentence } = pickVerbExerciseSource(activeVerbItems());
  const mode = appState.verbMode;
  const completedSentence = sentence.replace("___", item.prep);
  const translation = verbTranslationFor(item, sentence);

  if (mode === "case") {
    return {
      topic: "verbs",
      verbItemId: item.id,
      verbSentence: sentence,
      id: `verb-case:${item.id}`,
      title: "Case after preposition",
      prompt: completedSentence,
      answer: CASES[item.caseKey],
      options: shuffle(["Akkusativ", "Dativ", "Genitiv", "Nominativ"]),
      meta: [
        ["Verb", item.verb],
        ["Preposition", item.prep],
        ["Meaning", translation.meaning],
        ["Focus", "Case"]
      ],
      translation,
      explanation: item.pattern
    };
  }

  if (mode === "pattern") {
    return {
      topic: "verbs",
      verbItemId: item.id,
      verbSentence: sentence,
      id: `verb-pattern:${item.id}`,
      title: "Full verb pattern",
      prompt: completedSentence,
      answer: item.pattern,
      options: verbPatternOptions(item),
      meta: [
        ["Verb", item.verb],
        ["Meaning", translation.meaning],
        ["Focus", "Full pattern"],
        ["Sentence", "Preposition shown"]
      ],
      translation,
      explanation: item.pattern
    };
  }

  const distractors = shuffle(PREPOSITIONS.filter((prep) => prep !== item.prep)).slice(0, 3);

  return {
    topic: "verbs",
    verbItemId: item.id,
    verbSentence: sentence,
    id: `verb-prep:${item.id}`,
    title: "Missing preposition",
    prompt: sentence,
    answer: item.prep,
    options: shuffle([item.prep, ...distractors]),
    meta: [
      ["Verb", item.verb],
      ["Case", CASES[item.caseKey]],
      ["Meaning", translation.meaning],
      ["Focus", "Preposition"]
    ],
    translation,
    explanation: item.pattern
  };
}

function buildStandardExercise() {
  return appState.topic === "adjective" ? buildAdjectiveExercise() : buildVerbExercise();
}

function nextExercise() {
  if (appState.reviewOnly) {
    const miss = sample(currentTopicMisses(false)) || sample(currentTopicMisses(true));
    if (miss) {
      appState.current = exerciseFromMistake(miss);
    } else {
      appState.reviewOnly = false;
      appState.current = buildStandardExercise();
    }
  } else if (isFavoritesActive()) {
    appState.current = exerciseFromFavorite(sample(favoritesForTopic()));
  } else {
    appState.current = buildStandardExercise();
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
  renderFavoriteList();
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
        if (appState.reviewOnly) {
          appState.favorites.useFavorites[appState.topic] = false;
          saveFavorites();
        }
      } else if (appState.topic === "adjective") {
        appState.reviewOnly = false;
        appState.favorites.useFavorites[appState.topic] = false;
        saveFavorites();
        if (kind === "mode") {
          appState.adjMode = value;
        } else {
          appState.adjFilter = value;
        }
      } else {
        appState.reviewOnly = false;
        appState.favorites.useFavorites[appState.topic] = false;
        saveFavorites();
        appState.verbMode = value;
      }
      saveUiPreferences();
      nextExercise();
    });
    elements.controlsRow.append(button);
  });
}

function renderQuestion() {
  const exercise = appState.current;
  const favorited = isCurrentFavorite();
  elements.favoriteButton.textContent = favorited ? "★" : "☆";
  elements.favoriteButton.classList.toggle("active", favorited);
  elements.favoriteButton.setAttribute("aria-pressed", String(favorited));
  elements.favoriteButton.setAttribute(
    "aria-label",
    favorited ? "Remove from favourites" : "Add to favourites"
  );
  elements.favoriteButton.title = favorited ? "Remove from favourites" : "Add to favourites";
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
      if (appState.topic === "verbs") {
        submitAnswer();
      } else {
        renderQuestion();
        elements.feedbackBox.textContent = "";
        elements.feedbackBox.className = "feedback";
      }
    });
    elements.answerGrid.append(button);
  });

  renderTranslationPanel(exercise);
  renderQuestionActions();
}

function renderTranslationPanel(exercise) {
  elements.translationPanel.replaceChildren();
  elements.translationPanel.classList.toggle("hidden", !exercise.translation);
  if (!exercise.translation) {
    return;
  }

  const rows = [
    ["Language", exercise.translation.languageLabel],
    ["Verb", `${exercise.meta.find(([label]) => label === "Verb")?.[1] || ""} = ${exercise.translation.verb}`],
    ["Meaning", exercise.translation.meaning]
  ];
  if (exercise.translation.sentence) {
    rows.push(["Example", exercise.translation.sentence]);
  }

  rows.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "translation-row";
    const labelEl = document.createElement("span");
    labelEl.textContent = label;
    const valueEl = document.createElement("strong");
    valueEl.textContent = value;
    row.append(labelEl, valueEl);
    elements.translationPanel.append(row);
  });
}

function renderQuestionActions() {
  const isVerbTopic = appState.topic === "verbs";
  elements.submitButton.classList.toggle("hidden", isVerbTopic || appState.answered);
  elements.resetButton.classList.toggle("hidden", isVerbTopic);
  elements.nextButton.classList.toggle("hidden", !appState.answered);
  elements.submitButton.disabled = isVerbTopic;
  elements.resetButton.disabled = isVerbTopic;
  elements.nextButton.disabled = false;
  elements.nextButton.parentElement?.classList.toggle("verb-actions", isVerbTopic);
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
  elements.translationLanguage.value = appState.translationLanguage;
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
    detail.textContent = `${verbPatternLabel(verbItem)} · ${verbMeaningFor(verbItem)}`;
    button.append(name, detail);
    button.addEventListener("click", () => toggleVerbInTrainingList(verbItem.id));
    item.append(button);
    elements.verbSearchResults.append(item);
  });
}

function renderFavoriteList() {
  const topicFavorites = favoritesForTopic();
  elements.favoriteListBlock.classList.toggle("hidden", false);
  elements.favoriteCount.textContent = `${topicFavorites.length} saved`;
  elements.favoriteToggle.checked = isFavoritesActive();
  elements.favoriteToggle.disabled = !topicFavorites.length;
  elements.favoriteClear.disabled = !topicFavorites.length;
  elements.favoriteList.replaceChildren();

  if (!topicFavorites.length) {
    const empty = document.createElement("div");
    empty.className = "favorite-empty";
    empty.textContent = "No favourites yet.";
    elements.favoriteList.append(empty);
    return;
  }

  topicFavorites.forEach((favorite) => {
    const item = document.createElement("div");
    item.className = "favorite-item";

    const practiceButton = document.createElement("button");
    practiceButton.type = "button";
    practiceButton.className = "favorite-practice-button";
    const answer = document.createElement("strong");
    answer.textContent = favorite.exercise.answer;
    const detail = document.createElement("span");
    detail.textContent = favorite.exercise.title;
    practiceButton.append(answer, detail);
    practiceButton.addEventListener("click", () => startFavorite(favorite.signature));

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "favorite-remove-button";
    removeButton.title = "Remove";
    removeButton.setAttribute("aria-label", "Remove favourite");
    removeButton.textContent = "x";
    removeButton.addEventListener("click", () => removeFavorite(favorite.signature));

    item.append(practiceButton, removeButton);
    elements.favoriteList.append(item);
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
    saveUiPreferences();
    nextExercise();
  });
});

elements.submitButton.addEventListener("click", submitAnswer);
elements.nextButton.addEventListener("click", nextExercise);
elements.resetButton.addEventListener("click", resetProgress);
elements.favoriteButton.addEventListener("click", toggleCurrentFavorite);
elements.verbSearchInput.addEventListener("input", (event) => {
  appState.verbSearch = event.target.value;
  appState.verbBulkStatus = "";
  renderVerbTrainingList();
});
elements.verbBulkAdd.addEventListener("click", addBulkVerbMatches);
elements.verbListToggle.addEventListener("change", (event) => {
  setVerbListEnabled(event.target.checked);
});
elements.translationLanguage.addEventListener("change", (event) => {
  appState.translationLanguage = Object.prototype.hasOwnProperty.call(
    TRANSLATION_LANGUAGES,
    event.target.value
  )
    ? event.target.value
    : "en";
  saveTranslationLanguage();
  refreshCurrentVerbTranslation();
  render();
});
elements.verbListClear.addEventListener("click", clearVerbTrainingList);
elements.favoriteToggle.addEventListener("change", (event) => {
  setFavoriteTrainingEnabled(event.target.checked);
});
elements.favoriteClear.addEventListener("click", clearTopicFavorites);

nextExercise();
