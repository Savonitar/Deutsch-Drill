const fs = require("fs");
const vm = require("vm");

const dataScripts = ["data/verbs.js", "data/translations.js", "app.js"];
const app = dataScripts.map((file) => fs.readFileSync(file, "utf8")).join("\n\n");
const index = fs.readFileSync("index.html", "utf8");

class ClassList {
  constructor() {
    this.values = new Set();
  }

  toggle(name, force) {
    if (force) {
      this.values.add(name);
    } else {
      this.values.delete(name);
    }
  }
}

function makeElement(selector = "") {
  return {
    selector,
    dataset: {},
    style: {},
    children: [],
    listeners: {},
    classList: new ClassList(),
    className: "",
    textContent: "",
    innerHTML: "",
    disabled: false,
    checked: false,
    title: "",
    type: "",
    value: "",
    attributes: {},
    append(...children) {
      this.children.push(...children);
    },
    replaceChildren(...children) {
      this.children = [...children];
    },
    addEventListener(type, handler) {
      this.listeners[type] = handler;
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    }
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const verbDataScriptIndex = index.indexOf('src="data/verbs.js"');
const translationDataScriptIndex = index.indexOf('src="data/translations.js"');
const appScriptIndex = index.indexOf('src="app.js"');
assert(
  verbDataScriptIndex >= 0 &&
    translationDataScriptIndex >= 0 &&
    appScriptIndex >= 0 &&
    verbDataScriptIndex < translationDataScriptIndex &&
    translationDataScriptIndex < appScriptIndex,
  "Data scripts should load before app.js"
);

const elements = new Map();
const topicButtons = ["adjective", "verbs"].map((topic) => {
  const button = makeElement(`[data-topic=${topic}]`);
  button.dataset.topic = topic;
  return button;
});

const document = {
  activeElement: null,
  querySelector(selector) {
    if (!elements.has(selector)) {
      elements.set(selector, makeElement(selector));
    }
    return elements.get(selector);
  },
  querySelectorAll(selector) {
    return selector === "[data-topic]" ? topicButtons : [];
  },
  createElement(tagName) {
    return makeElement(tagName);
  }
};

const storage = new Map();
const localStorage = {
  getItem(key) {
    return storage.has(key) ? storage.get(key) : null;
  },
  setItem(key, value) {
    storage.set(key, String(value));
  },
  removeItem(key) {
    storage.delete(key);
  }
};

const context = vm.createContext({
  assert,
  document,
  elementMap: elements,
  localStorage,
  window: { confirm: () => true },
  console,
  Math,
  Date,
  Array,
  Object,
  Set,
  String,
  JSON
});

vm.runInContext(`${app}

(() => {
  const cases = Object.keys(CASES);
  const genders = Object.keys(GENDERS);
  const articleTypes = Object.keys(ARTICLE_TYPES);

  assert(NOUNS.length > 0, "NOUNS should not be empty");
  assert(STRONG_SINGULAR_NOUNS.length > 0, "STRONG_SINGULAR_NOUNS should not be empty");
  assert(VERB_ITEMS.length >= 80, "VERB_ITEMS should contain the authored drill set");

  for (const type of articleTypes) {
    for (const caseKey of cases) {
      for (const gender of genders) {
        assert(
          typeof ADJECTIVE_ENDINGS[type][caseKey][gender] === "string",
          "Bad adjective ending value"
        );
        assert(
          typeof ARTICLES[type][gender][caseKey] === "string",
          "Bad article value"
        );
      }
    }
  }

  const nounNames = new Set([...NOUNS, ...STRONG_SINGULAR_NOUNS].map((noun) => noun.nom));
  for (const name of Object.keys(NOUN_ADJECTIVES)) {
    assert(nounNames.has(name), "Adjective map references unknown noun: " + name);
  }

  const verbIds = new Set();
  const rawVerbSentences = new Set();
  const completedVerbSentences = new Set();
  for (const item of VERB_ITEMS) {
    assert(!verbIds.has(item.id), "Duplicate verb id: " + item.id);
    verbIds.add(item.id);
    assert(
      !Object.prototype.hasOwnProperty.call(item, "meaning"),
      "Verb data should not store translations: " + item.id
    );
    assert(VERB_TRANSLATIONS[item.id]?.en?.meaning, "Missing English meaning: " + item.id);
    const verbSentences = verbSentencesFor(item);
    assert(
      verbSentences.length >= 3,
      "Verb item should include generated sentence variants: " + item.id
    );
    assert(
      verbSentences[0] === item.sentence,
      "First sentence variant should match sentence: " + item.id
    );
    for (const sentence of verbSentences) {
      assert(
        (sentence.match(/___/g) || []).length === 1,
        "Sentence must contain exactly one blank: " + item.id
      );
      assert(!rawVerbSentences.has(sentence), "Duplicate verb sentence: " + sentence);
      rawVerbSentences.add(sentence);
      const completedSentence = completedVerbSentence(item, sentence);
      assert(
        !completedVerbSentences.has(completedSentence),
        "Duplicate completed verb sentence: " + completedSentence
      );
      completedVerbSentences.add(completedSentence);
    }
    assert(item.pattern.includes(item.prep), "Pattern does not include preposition: " + item.id);
    assert(
      item.pattern.includes(CASES[item.caseKey]),
      "Pattern does not include case label: " + item.id
    );
  }

  for (const mode of ["form", "ending", "case", "article", "gender"]) {
    appState.topic = "adjective";
    appState.adjMode = mode;
    appState.adjFilter = "all";
    appState.reviewOnly = false;
    nextExercise();
    assert(appState.current.topic === "adjective", "Wrong topic for adjective mode " + mode);
    assert(
      appState.current.options.includes(appState.current.answer),
      "Answer missing from adjective options: " + mode
    );
  }

  for (const mode of ["prep", "case", "pattern"]) {
    appState.topic = "verbs";
    appState.verbMode = mode;
    appState.trainingList.verbs = [];
    appState.trainingList.useVerbList = false;
    appState.reviewOnly = false;
    nextExercise();
    assert(appState.current.topic === "verbs", "Wrong topic for verb mode " + mode);
    assert(
      appState.current.options.includes(appState.current.answer),
      "Answer missing from verb options: " + mode
    );
  }

  appState.topic = "adjective";
  appState.adjMode = "form";
  appState.reviewOnly = false;
  nextExercise();
  const adjectiveTotal = appState.progress.total;
  const adjectiveChoice = elementMap
    .get("#answerGrid")
    .children.find((button) => button.textContent === appState.current.answer);
  adjectiveChoice.listeners.click();
  assert(!appState.answered, "Adjective choices should still wait for Check");
  assert(appState.progress.total === adjectiveTotal, "Adjective click should not count immediately");

  appState.topic = "verbs";
  appState.verbMode = "prep";
  appState.trainingList.verbs = ["warten-auf-akk"];
  appState.trainingList.useVerbList = true;
  appState.reviewOnly = false;
  nextExercise();
  const verbTotal = appState.progress.total;
  const verbChoice = elementMap
    .get("#answerGrid")
    .children.find((button) => button.textContent === appState.current.answer);
  verbChoice.listeners.click();
  assert(appState.answered, "Verb choices should submit immediately");
  assert(appState.progress.total === verbTotal + 1, "Verb click should count the answer");

  appState.topic = "verbs";
  appState.verbMode = "prep";
  appState.translationLanguage = "ru";
  appState.trainingList.verbs = ["warten-auf-akk"];
  appState.trainingList.useVerbList = true;
  appState.reviewOnly = false;
  nextExercise();
  assert(appState.current.translation.meaning === "ждать чего-либо", "Russian meaning should render");
  assert(appState.current.translation.sentence === "Я жду автобус.", "Russian sentence should render");
  assert(
    appState.current.meta.some(([label, value]) => label === "Meaning" && value === "ждать чего-либо"),
    "Verb meta should use the selected translation language"
  );
  appState.translationLanguage = "tr";
  refreshCurrentVerbTranslation();
  assert(
    appState.current.translation.sentence === "Otobüsü bekliyorum.",
    "Language changes should refresh the current translation"
  );

  appState.topic = "adjective";
  appState.adjMode = "form";
  appState.reviewOnly = false;
  appState.favorites = emptyFavorites();
  nextExercise();
  const favoriteAdjective = appState.current;
  toggleCurrentFavorite();
  assert(isCurrentFavorite(), "Current drill should be saved as a favourite");
  assert(favoritesForTopic("adjective").length === 1, "Adjective favourite should be listed");
  setFavoriteTrainingEnabled(true);
  assert(isFavoritesActive("adjective"), "Favourite-only adjective training should activate");
  nextExercise();
  assert(
    appState.current.prompt === favoriteAdjective.prompt &&
      appState.current.answer === favoriteAdjective.answer,
    "Favourite training should replay saved adjective drills"
  );
  removeFavorite(favoriteSignatureFor(appState.current));
  assert(!favoritesForTopic("adjective").length, "Removing should clear the adjective favourite");
  assert(!isFavoritesActive("adjective"), "Empty favourites should disable favourite training");

  appState.topic = "verbs";
  appState.verbMode = "prep";
  appState.trainingList.verbs = ["warten-auf-akk"];
  appState.trainingList.useVerbList = true;
  appState.reviewOnly = false;
  nextExercise();
  const favoriteVerb = appState.current;
  toggleCurrentFavorite();
  assert(favoritesForTopic("verbs").length === 1, "Verb favourite should be listed");
  startFavorite(favoriteSignatureFor(favoriteVerb));
  assert(
    appState.current.prompt === favoriteVerb.prompt &&
      appState.current.answer === favoriteVerb.answer,
    "Starting a favourite should replay the saved verb drill"
  );
  clearTopicFavorites();
  assert(!favoritesForTopic("verbs").length, "Clearing should remove topic favourites");

  appState.translationLanguage = "ru";
  const untranslatedVerbFallback = verbTranslationFor(VERB_LOOKUP.get("verhandeln-mit-dat"));
  assert(
    untranslatedVerbFallback.language === "en",
    "Missing selected-language verb translations should fall back to English"
  );
  assert(
    untranslatedVerbFallback.languageLabel === "English",
    "Fallback translation should use the fallback language label"
  );
  assert(
    untranslatedVerbFallback.meaning === "to negotiate with",
    "Fallback translation should use the English meaning"
  );
  assert(
    untranslatedVerbFallback.sentence !== "Translation coming soon.",
    "Fallback translation should not render placeholder text"
  );
  renderTranslationPanel({
    meta: [["Verb", "verhandeln"]],
    translation: untranslatedVerbFallback
  });
  assert(
    !elementMap
      .get("#translationPanel")
      .children.some((row) =>
        row.children.some((child) => child.textContent === "Translation coming soon.")
      ),
    "Translation panel should not render placeholder example rows"
  );

  appState.verbSearch = "kuemmern um";
  assert(
    matchingVerbItems().some((item) => item.id === "sich-kuemmern-um-akk"),
    "ASCII search should find umlaut verb ids"
  );
  appState.verbSearch = "über";
  assert(
    matchingVerbItems().some((item) => item.id === "sich-beschweren-ueber-akk"),
    "Search should match accented prepositions"
  );
  appState.verbSearch = "Gegenverkehr";
  assert(
    matchingVerbItems().some((item) => item.id === "achten-auf-akk"),
    "Search should match generated sentence variants"
  );
  appState.verbSearch = "Ampel";
  assert(
    matchingVerbItems().some((item) => item.id === "achten-auf-akk"),
    "Search should match newly imported sentence variants"
  );

  appState.topic = "verbs";
  appState.verbMode = "prep";
  appState.trainingList.verbs = ["warten-auf-akk"];
  appState.trainingList.useVerbList = true;
  appState.reviewOnly = false;
  appState.recentVerbSentenceKeys = [];
  const smallListRecentSentences = [];
  for (let index = 0; index < 9; index += 1) {
    nextExercise();
    const sentenceKey = verbSentenceKey(
      VERB_LOOKUP.get(appState.current.verbItemId),
      appState.current.verbSentence
    );
    assert(
      !smallListRecentSentences.includes(sentenceKey),
      "Single-verb lists should rotate available sentence variants before repeating"
    );
    smallListRecentSentences.push(sentenceKey);
    if (smallListRecentSentences.length > 2) {
      smallListRecentSentences.shift();
    }
  }

  appState.trainingList.verbs = [
    "achten-auf-akk",
    "warten-auf-akk",
    "sich-vorbereiten-auf-akk",
    "sich-freuen-auf-akk",
    "denken-an-akk",
    "glauben-an-akk",
    "sich-interessieren-fuer-akk",
    "sich-entscheiden-fuer-akk",
    "danken-fuer-akk",
    "sprechen-mit-dat",
    "sich-beschaeftigen-mit-dat",
    "teilnehmen-an-dat",
    "sich-beschweren-ueber-akk",
    "traeumen-von-dat",
    "abhaengen-von-dat",
    "sich-kuemmern-um-akk",
    "sich-verlieben-in-akk"
  ];
  appState.trainingList.useVerbList = true;
  appState.recentVerbSentenceKeys = [];
  const selectedListRecentSentences = [];
  for (let index = 0; index < 40; index += 1) {
    nextExercise();
    const sentenceKey = verbSentenceKey(
      VERB_LOOKUP.get(appState.current.verbItemId),
      appState.current.verbSentence
    );
    assert(
      !selectedListRecentSentences.includes(sentenceKey),
      "Selected verb lists should not repeat a sentence inside the cooldown window"
    );
    selectedListRecentSentences.push(sentenceKey);
    if (selectedListRecentSentences.length > VERB_SENTENCE_COOLDOWN) {
      selectedListRecentSentences.shift();
    }
  }

  appState.verbSearch = [
    "achten",
    "warten",
    "vorbereiten",
    "freuen",
    "denken",
    "glauben",
    "interessieren",
    "entscheiden",
    "danken",
    "sprechen",
    "beschäftigen",
    "teilnehmen",
    "beschweren",
    "träumen",
    "abhängen",
    "kümmern",
    "verlieben"
  ].join(", ");
  const pastedSummary = bulkVerbSummary();
  assert(!pastedSummary.missing.length, "User pasted list should fully match known examples");
  assert(
    pastedSummary.items.some((item) => item.id === "sich-vorbereiten-auf-akk"),
    "Bulk paste should match reflexive verbs without typed sich"
  );
  assert(
    pastedSummary.items.some((item) => item.id === "sich-freuen-auf-akk") &&
      pastedSummary.items.some((item) => item.id === "sich-freuen-ueber-akk"),
    "Bulk paste should include all known examples for a matching verb"
  );
  addBulkVerbMatches();
  assert(isVerbListActive(), "Bulk add should enable selected-only training");
  assert(
    selectedVerbIds().includes("sich-kuemmern-um-akk") &&
      selectedVerbIds().includes("sich-verlieben-in-akk"),
    "Bulk add should save matching reflexive items"
  );

  clearVerbTrainingList();
  appState.verbSearch = "sich kümmern / sich verlieben / sich freuen";
  addBulkVerbMatches();
  assert(
    selectedVerbIds().includes("sich-kuemmern-um-akk") &&
      selectedVerbIds().includes("sich-verlieben-in-akk") &&
      selectedVerbIds().includes("sich-freuen-auf-akk"),
    "Bulk add should accept terms typed with sich"
  );

  clearVerbTrainingList();
  appState.verbSearch = "denken, missingverb";
  addBulkVerbMatches();
  assert(
    selectedVerbIds().includes("denken-an-akk") &&
      !selectedVerbIds().includes("nachdenken-ueber-akk"),
    "Bulk add should exact-match verb names and report missing terms"
  );
  assert(appState.verbBulkStatus.includes("Missing: missingverb"), "Bulk add should report misses");

  appState.topic = "verbs";
  appState.verbMode = "prep";
  appState.trainingList.verbs = ["warten-auf-akk", "sich-kuemmern-um-akk"];
  appState.trainingList.useVerbList = true;
  appState.reviewOnly = false;
  for (let index = 0; index < 30; index += 1) {
    nextExercise();
    const baseId = appState.current.id.replace(/^verb-(prep|case|pattern):/, "");
    assert(
      appState.trainingList.verbs.includes(baseId),
      "Selected-only training used an unselected verb: " + baseId
    );
  }

  appState.trainingList.verbs = [];
  appState.trainingList.useVerbList = true;
  nextExercise();
  assert(appState.current.topic === "verbs", "Empty selected list should fall back cleanly");
  assert(!isVerbListActive(), "Empty selected list should not be active");

  toggleVerbInTrainingList("warten-auf-akk");
  assert(selectedVerbIds().includes("warten-auf-akk"), "Toggle should add a verb");
  setVerbListEnabled(true);
  assert(isVerbListActive(), "Selected list should activate with one verb");
  clearVerbTrainingList();
  assert(!selectedVerbIds().length, "Clear should remove selected verbs");
  assert(!isVerbListActive(), "Clear should disable selected-only training");

  appState.topic = "verbs";
  appState.verbMode = "prep";
  appState.trainingList.verbs = [];
  appState.trainingList.useVerbList = false;
  appState.reviewOnly = false;
  nextExercise();
  const original = appState.current;
  appState.selected = original.options.find((option) => option !== original.answer);
  assert(appState.selected, "Need a wrong answer option");
  submitAnswer();
  const miss = appState.progress.misses[0];
  assert(miss && !miss.resolved, "Incorrect answer should create active miss");
  reviewMistake(miss.signature);
  assert(appState.reviewOnly, "Review mode should activate from miss click");
  assert(appState.current.prompt === original.prompt, "Review should repeat exact prompt");
  assert(appState.current.answer === original.answer, "Review should repeat exact answer");
  appState.selected = appState.current.answer;
  submitAnswer();
  assert(appState.progress.misses[0].resolved, "Correct review should mark miss resolved");
})()`, context, { filename: "app.js" });

console.log("app tests ok");
