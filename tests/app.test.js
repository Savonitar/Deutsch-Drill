const fs = require("fs");
const vm = require("vm");

const dataScripts = [
  "data/verbs.js",
  "data/modal-verbs.js",
  "data/translations.js",
  "data/modal-translations.js",
  "app.js"
];
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
const modalDataScriptIndex = index.indexOf('src="data/modal-verbs.js"');
const translationDataScriptIndex = index.indexOf('src="data/translations.js"');
const modalTranslationScriptIndex = index.indexOf('src="data/modal-translations.js"');
const appScriptIndex = index.indexOf('src="app.js"');
assert(
  verbDataScriptIndex >= 0 &&
    modalDataScriptIndex >= 0 &&
    translationDataScriptIndex >= 0 &&
    modalTranslationScriptIndex >= 0 &&
    appScriptIndex >= 0 &&
    verbDataScriptIndex < modalDataScriptIndex &&
    modalDataScriptIndex < translationDataScriptIndex &&
    translationDataScriptIndex < modalTranslationScriptIndex &&
    modalTranslationScriptIndex < appScriptIndex,
  "Data scripts should load before app.js"
);

function makeHarness(initialStorage = {}) {
  const elements = new Map();
  const topicButtons = ["adjective", "verbs", "modals"].map((topic) => {
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

  const storage = new Map(Object.entries(initialStorage));
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

  return { context, elements, localStorage };
}

const { context, elements, localStorage } = makeHarness();

vm.runInContext(`${app}

(() => {
  const cases = Object.keys(CASES);
  const genders = Object.keys(GENDERS);
  const articleTypes = Object.keys(ARTICLE_TYPES);
  const translationLanguages = Object.keys(TRANSLATION_LANGUAGES);
  const forbiddenTranslationText = ["coming soon", "placeholder", "todo", "tbd"];

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
    for (const language of translationLanguages) {
      const translation = VERB_TRANSLATIONS[item.id]?.[language];
      for (const field of ["verb", "meaning", "sentence"]) {
        assert(translation?.[field], "Missing " + language + " " + field + ": " + item.id);
        assert(
          !forbiddenTranslationText.some((text) =>
            translation[field].toLowerCase().includes(text)
          ),
          "Placeholder " + language + " " + field + ": " + item.id
        );
      }
    }
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

  for (const id of Object.keys(VERB_TRANSLATIONS)) {
    assert(verbIds.has(id), "Translation references unknown verb id: " + id);
  }

  const expectedModalForms = {
    duerfen: {
      present: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
      preterite: ["durfte", "durftest", "durfte", "durften", "durftet", "durften"],
      subjunctive2: ["dürfte", "dürftest", "dürfte", "dürften", "dürftet", "dürften"]
    },
    koennen: {
      present: ["kann", "kannst", "kann", "können", "könnt", "können"],
      preterite: ["konnte", "konntest", "konnte", "konnten", "konntet", "konnten"],
      subjunctive2: ["könnte", "könntest", "könnte", "könnten", "könntet", "könnten"]
    },
    moegen: {
      present: ["mag", "magst", "mag", "mögen", "mögt", "mögen"],
      preterite: ["mochte", "mochtest", "mochte", "mochten", "mochtet", "mochten"],
      subjunctive2: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"]
    },
    muessen: {
      present: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
      preterite: ["musste", "musstest", "musste", "mussten", "musstet", "mussten"],
      subjunctive2: ["müsste", "müsstest", "müsste", "müssten", "müsstet", "müssten"]
    },
    sollen: {
      present: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
      preterite: ["sollte", "solltest", "sollte", "sollten", "solltet", "sollten"],
      subjunctive2: ["sollte", "solltest", "sollte", "sollten", "solltet", "sollten"]
    },
    wollen: {
      present: ["will", "willst", "will", "wollen", "wollt", "wollen"],
      preterite: ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"],
      subjunctive2: ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"]
    }
  };
  assert(MODAL_VERBS.length === 6, "There should be six core modal verbs");
  assert(MODAL_FORM_DEFINITIONS.length === 3, "There should be three modal forms");
  assert(MODAL_PERSON_DEFINITIONS.length === 6, "There should be six modal person groups");
  assert(
    MODAL_PERSON_DEFINITIONS.map((person) => person.label).join("|") ===
      "ich|du|er/sie/es|wir|ihr|sie/Sie",
    "Modal person labels should match the requested groups"
  );
  for (const item of MODAL_VERBS) {
    assert(expectedModalForms[item.id], "Unexpected modal verb id: " + item.id);
    for (const form of MODAL_FORM_DEFINITIONS) {
      assert(
        JSON.stringify(item.forms[form.id]) ===
          JSON.stringify(expectedModalForms[item.id][form.id]),
        "Incorrect modal paradigm: " + item.id + " " + form.id
      );
      assert(
        (item.contexts[form.id].match(/___/g) || []).length === 1,
        "Modal context should contain one blank: " + item.id + " " + form.id
      );
      assert(
        item.contexts[form.id].includes("{subject}"),
        "Modal context should contain a subject placeholder: " + item.id + " " + form.id
      );
    }
    for (const language of translationLanguages) {
      const translation = MODAL_TRANSLATIONS[item.id]?.[language];
      assert(translation?.verb, "Missing modal verb translation: " + item.id + " " + language);
      for (const form of MODAL_FORM_DEFINITIONS) {
        assert(
          translation.meanings?.[form.id],
          "Missing modal form meaning: " + item.id + " " + language + " " + form.id
        );
      }
    }
  }
  assert(
    MODAL_VERB_LOOKUP.get("moegen").forms.subjunctive2[0] === "möchte",
    "möchten should be taught as Konjunktiv II of mögen"
  );
  assert(
    JSON.stringify(MODAL_VERB_LOOKUP.get("sollen").forms.preterite) ===
      JSON.stringify(MODAL_VERB_LOOKUP.get("sollen").forms.subjunctive2),
    "sollen should preserve identical Präteritum and Konjunktiv II forms"
  );
  assert(
    JSON.stringify(MODAL_VERB_LOOKUP.get("wollen").forms.preterite) ===
      JSON.stringify(MODAL_VERB_LOOKUP.get("wollen").forms.subjunctive2),
    "wollen should preserve identical Präteritum and Konjunktiv II forms"
  );

  assert(appState.topic === "adjective", "Default topic should be adjective practice");
  assert(appState.verbMode === "prep", "Default verb mode should be preposition practice");
  document
    .querySelectorAll("[data-topic]")
    .find((button) => button.dataset.topic === "verbs")
    .listeners.click();
  const patternButton = elementMap
    .get("#controlsRow")
    .children.find((button) => button.textContent === "Pattern");
  patternButton.listeners.click();
  const savedUiPreferences = JSON.parse(localStorage.getItem(UI_PREFERENCES_KEY));
  assert(savedUiPreferences.topic === "verbs", "Topic tab clicks should save UI preference");
  assert(savedUiPreferences.verbMode === "pattern", "Verb mode clicks should save UI preference");
  localStorage.setItem(
    UI_PREFERENCES_KEY,
    JSON.stringify({ topic: "verbs", adjMode: "ending", adjFilter: "strong", verbMode: "case" })
  );
  const loadedUiPreferences = loadUiPreferences();
  assert(loadedUiPreferences.topic === "verbs", "Saved topic should load");
  assert(loadedUiPreferences.adjMode === "ending", "Saved adjective mode should load");
  assert(loadedUiPreferences.adjFilter === "strong", "Saved adjective filter should load");
  assert(loadedUiPreferences.verbMode === "case", "Saved verb mode should load");
  assert(loadedUiPreferences.modalMode === "form", "Old preferences should get modal defaults");
  assert(
    loadedUiPreferences.modalVerbFilter === "all" &&
      loadedUiPreferences.modalFormFilter === "all" &&
      loadedUiPreferences.modalPersonFilter === "all",
    "Old preferences should get safe modal filter defaults"
  );
  localStorage.setItem(
    UI_PREFERENCES_KEY,
    JSON.stringify({
      topic: "modals",
      adjMode: "form",
      adjFilter: "all",
      verbMode: "prep",
      modalMode: "infinitive",
      modalVerbFilter: "moegen",
      modalFormFilter: "subjunctive2",
      modalPersonFilter: "du"
    })
  );
  const loadedModalPreferences = loadUiPreferences();
  assert(loadedModalPreferences.topic === "modals", "Saved modal topic should load");
  assert(loadedModalPreferences.modalMode === "infinitive", "Saved modal mode should load");
  assert(loadedModalPreferences.modalVerbFilter === "moegen", "Saved modal verb should load");
  assert(
    loadedModalPreferences.modalFormFilter === "subjunctive2",
    "Saved modal form should load"
  );
  assert(loadedModalPreferences.modalPersonFilter === "du", "Saved modal person should load");
  localStorage.setItem(
    UI_PREFERENCES_KEY,
    JSON.stringify({
      topic: "bad",
      adjMode: "bad",
      adjFilter: "bad",
      verbMode: "bad",
      modalMode: "bad",
      modalVerbFilter: "bad",
      modalFormFilter: "bad",
      modalPersonFilter: "bad"
    })
  );
  const sanitizedUiPreferences = loadUiPreferences();
  assert(sanitizedUiPreferences.topic === "adjective", "Invalid saved topic should fall back");
  assert(sanitizedUiPreferences.adjMode === "form", "Invalid adjective mode should fall back");
  assert(sanitizedUiPreferences.adjFilter === "all", "Invalid adjective filter should fall back");
  assert(sanitizedUiPreferences.verbMode === "prep", "Invalid verb mode should fall back");
  assert(sanitizedUiPreferences.modalMode === "form", "Invalid modal mode should fall back");
  assert(
    sanitizedUiPreferences.modalVerbFilter === "all" &&
      sanitizedUiPreferences.modalFormFilter === "all" &&
      sanitizedUiPreferences.modalPersonFilter === "all",
    "Invalid modal filters should fall back"
  );

  document
    .querySelectorAll("[data-topic]")
    .find((button) => button.dataset.topic === "modals")
    .listeners.click();
  elementMap.get("#modalVerbFilter").listeners.change({ target: { value: "duerfen" } });
  elementMap.get("#modalFormFilter").listeners.change({ target: { value: "preterite" } });
  elementMap.get("#modalPersonFilter").listeners.change({ target: { value: "wir" } });
  assert(
    appState.current.modalVerbId === "duerfen" &&
      appState.current.modalForm === "preterite" &&
      appState.current.modalPerson === "wir",
    "Modal filter controls should immediately constrain the exercise"
  );
  const infinitiveButton = elementMap
    .get("#controlsRow")
    .children.find((button) => button.textContent === "Find infinitive");
  infinitiveButton.listeners.click();
  const savedModalUiPreferences = JSON.parse(localStorage.getItem(UI_PREFERENCES_KEY));
  assert(savedModalUiPreferences.topic === "modals", "Modal tab clicks should save topic");
  assert(savedModalUiPreferences.modalMode === "infinitive", "Modal mode should be saved");
  assert(savedModalUiPreferences.modalVerbFilter === "duerfen", "Modal verb filter should be saved");
  assert(
    savedModalUiPreferences.modalFormFilter === "preterite",
    "Modal form filter should be saved"
  );
  assert(savedModalUiPreferences.modalPersonFilter === "wir", "Modal person filter should be saved");

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

  appState.topic = "modals";
  appState.translationLanguage = "en";
  appState.reviewOnly = false;
  for (const mode of MODAL_MODES) {
    appState.modalMode = mode;
    for (const item of MODAL_VERBS) {
      appState.modalVerbFilter = item.id;
      for (const form of MODAL_FORM_DEFINITIONS) {
        appState.modalFormFilter = form.id;
        for (const person of MODAL_PERSON_DEFINITIONS) {
          appState.modalPersonFilter = person.id;
          nextExercise();
          const exercise = appState.current;
          const expectedAnswer =
            mode === "form" ? item.forms[form.id][person.formIndex] : item.infinitive;
          assert(exercise.topic === "modals", "Modal filters should build a modal exercise");
          assert(exercise.modalVerbId === item.id, "Modal verb filter should be respected");
          assert(exercise.modalForm === form.id, "Modal form filter should be respected");
          assert(exercise.modalPerson === person.id, "Modal person filter should be respected");
          assert(exercise.answer === expectedAnswer, "Incorrect generated modal answer");
          assert(exercise.options.includes(expectedAnswer), "Modal options should include the answer");
          assert(exercise.options.length === 4, "Modal exercises should have four choices");
          assert(
            new Set(exercise.options).size === exercise.options.length,
            "Modal choices should be unique"
          );
          assert(
            person.subjects.includes(exercise.modalSubject),
            "Modal exercise should use a subject from the selected person group"
          );
          assert(
            exercise.translation.meaning === MODAL_TRANSLATIONS[item.id].en.meanings[form.id],
            "Modal exercise should use the form-aware translation"
          );
          if (mode === "form") {
            assert(
              (exercise.prompt.match(/___/g) || []).length === 1,
              "Conjugation prompts should contain one blank"
            );
          } else {
            assert(!exercise.prompt.includes("___"), "Infinitive prompts should show the finite form");
            assert(
              exercise.revealTranslationAfterAnswer,
              "Infinitive drills should hide the answer-bearing translation before submission"
            );
          }
        }
      }
    }
  }
  appState.modalVerbFilter = "all";
  appState.modalFormFilter = "all";
  appState.modalPersonFilter = "all";

  VERB_ITEMS.forEach((verbItem) => {
    const patternOptions = verbPatternOptions(verbItem);
    assert(patternOptions.includes(verbItem.pattern), "Pattern options should include answer: " + verbItem.id);
    assert(
      patternOptions.every((option) => option.startsWith(verbItem.verb + " ")),
      "Pattern options should keep the prompt verb fixed: " + verbItem.id
    );
    assert(
      patternOptions.some((option) => option !== verbItem.pattern),
      "Pattern options should include distractors: " + verbItem.id
    );
  });

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

  appState.topic = "modals";
  appState.modalMode = "form";
  appState.modalVerbFilter = "koennen";
  appState.modalFormFilter = "subjunctive2";
  appState.modalPersonFilter = "du";
  appState.reviewOnly = false;
  nextExercise();
  const modalTotal = appState.progress.total;
  const modalChoice = elementMap
    .get("#answerGrid")
    .children.find((button) => button.textContent === appState.current.answer);
  modalChoice.listeners.click();
  assert(appState.answered, "Modal choices should submit immediately");
  assert(appState.progress.total === modalTotal + 1, "Modal click should count the answer");

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

  appState.topic = "modals";
  appState.modalMode = "form";
  appState.modalVerbFilter = "moegen";
  appState.modalFormFilter = "subjunctive2";
  appState.modalPersonFilter = "ich";
  appState.translationLanguage = "ru";
  appState.reviewOnly = false;
  nextExercise();
  assert(appState.current.answer === "möchte", "mögen Konjunktiv II should produce möchte");
  assert(
    appState.current.translation.meaning === "вежливое желание в настоящем: хотелось бы",
    "Russian modal meaning should render"
  );
  appState.translationLanguage = "uk";
  refreshCurrentModalTranslation();
  assert(
    appState.current.translation.verb === "любити; подобатися; möchten: хотіти ввічливо",
    "Language changes should refresh modal translations"
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

  appState.topic = "modals";
  appState.modalMode = "form";
  appState.modalVerbFilter = "muessen";
  appState.modalFormFilter = "preterite";
  appState.modalPersonFilter = "ihr";
  appState.reviewOnly = false;
  nextExercise();
  const favoriteModal = appState.current;
  toggleCurrentFavorite();
  assert(favoritesForTopic("modals").length === 1, "Modal favourite should be listed");
  setFavoriteTrainingEnabled(true);
  assert(isFavoritesActive("modals"), "Favourite-only modal training should activate");
  nextExercise();
  assert(
    appState.current.prompt === favoriteModal.prompt &&
      appState.current.answer === favoriteModal.answer &&
      appState.current.modalVerbId === "muessen",
    "Favourite training should replay the saved modal drill"
  );
  clearTopicFavorites();
  assert(!favoritesForTopic("modals").length, "Clearing should remove modal favourites");

  appState.translationLanguage = "ru";
  const verhandelnTranslations = VERB_TRANSLATIONS["verhandeln-mit-dat"];
  const savedVerhandelnRu = verhandelnTranslations.ru;
  delete verhandelnTranslations.ru;
  const untranslatedVerbFallback = verbTranslationFor(VERB_LOOKUP.get("verhandeln-mit-dat"));
  verhandelnTranslations.ru = savedVerhandelnRu;
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

  const savedWollenRu = MODAL_TRANSLATIONS.wollen.ru;
  delete MODAL_TRANSLATIONS.wollen.ru;
  const untranslatedModalFallback = modalTranslationFor(
    MODAL_VERB_LOOKUP.get("wollen"),
    "subjunctive2"
  );
  MODAL_TRANSLATIONS.wollen.ru = savedWollenRu;
  assert(
    untranslatedModalFallback.language === "en" &&
      untranslatedModalFallback.languageLabel === "English",
    "Missing selected-language modal translations should fall back to English"
  );
  assert(
    untranslatedModalFallback.meaning === "a conditional wish or intention: would want to",
    "Modal fallback should preserve the form-aware English meaning"
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
    "ankommen-auf-akk",
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
    "ankommen",
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
  appState.verbSearch =
    "sich interessieren für, sich kümmern um, teilnehmen an, gehören zu, ankommen auf, denken an, sich ärgern über, sprechen mit, diskutieren über";
  const screenshotListSummary = bulkVerbSummary();
  assert(
    !screenshotListSummary.missing.length,
    "Bulk paste should accept full verb-preposition phrases"
  );
  [
    "sich-interessieren-fuer-akk",
    "sich-kuemmern-um-akk",
    "teilnehmen-an-dat",
    "gehoeren-zu-dat",
    "ankommen-auf-akk",
    "denken-an-akk",
    "sich-aergern-ueber-akk",
    "sprechen-mit-dat",
    "diskutieren-ueber-akk"
  ].forEach((id) => {
    assert(
      screenshotListSummary.items.some((item) => item.id === id),
      "Bulk paste should match phrase item: " + id
    );
  });

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

  appState.topic = "modals";
  appState.modalMode = "form";
  appState.modalVerbFilter = "duerfen";
  appState.modalFormFilter = "subjunctive2";
  appState.modalPersonFilter = "du";
  appState.reviewOnly = false;
  nextExercise();
  const originalModal = appState.current;
  appState.selected = originalModal.options.find((option) => option !== originalModal.answer);
  submitAnswer();
  const modalMiss = appState.progress.misses.find(
    (candidate) => candidate.topic === "modals" && candidate.signature === mistakeSignature(originalModal)
  );
  assert(modalMiss && !modalMiss.resolved, "Incorrect modal answer should create an active miss");
  reviewMistake(modalMiss.signature);
  assert(appState.reviewOnly, "Modal review mode should activate from a miss");
  assert(appState.current.prompt === originalModal.prompt, "Modal review should repeat exact prompt");
  assert(appState.current.answer === originalModal.answer, "Modal review should repeat exact answer");
  assert(
    appState.current.modalVerbId === "duerfen" &&
      appState.current.modalForm === "subjunctive2" &&
      appState.current.modalPerson === "du",
    "Modal review should preserve canonical dimension keys"
  );
  appState.selected = appState.current.answer;
  submitAnswer();
  assert(modalMiss.resolved, "Correct modal review should mark the miss resolved");
})()`, context, { filename: "app.js" });

const { context: reloadContext } = makeHarness({
  "deutsch-drill-ui-preferences-v1": JSON.stringify({
    topic: "verbs",
    adjMode: "ending",
    adjFilter: "strong",
    verbMode: "case"
  })
});

vm.runInContext(`${app}

(() => {
  assert(appState.topic === "verbs", "Startup should restore saved topic");
  assert(appState.adjMode === "ending", "Startup should restore saved adjective mode");
  assert(appState.adjFilter === "strong", "Startup should restore saved adjective filter");
  assert(appState.verbMode === "case", "Startup should restore saved verb mode");
  assert(appState.current.topic === "verbs", "Initial exercise should use restored topic");
  assert(appState.current.title === "Case after preposition", "Initial exercise should use restored verb mode");
})()`, reloadContext, { filename: "app-reload.js" });

const { context: modalReloadContext } = makeHarness({
  "deutsch-drill-ui-preferences-v1": JSON.stringify({
    topic: "modals",
    adjMode: "form",
    adjFilter: "all",
    verbMode: "prep",
    modalMode: "infinitive",
    modalVerbFilter: "moegen",
    modalFormFilter: "subjunctive2",
    modalPersonFilter: "du"
  }),
  "deutsch-drill-translation-language-v1": "ru"
});

vm.runInContext(`${app}

(() => {
  assert(appState.topic === "modals", "Startup should restore the modal topic");
  assert(appState.modalMode === "infinitive", "Startup should restore the modal mode");
  assert(appState.modalVerbFilter === "moegen", "Startup should restore the modal verb filter");
  assert(
    appState.modalFormFilter === "subjunctive2",
    "Startup should restore the modal form filter"
  );
  assert(appState.modalPersonFilter === "du", "Startup should restore the modal person filter");
  assert(appState.current.topic === "modals", "Initial exercise should use the modal topic");
  assert(appState.current.answer === "mögen", "Infinitive mode should map möchtest back to mögen");
  assert(appState.current.translation.language === "ru", "Startup should restore modal language");
})()`, modalReloadContext, { filename: "app-modal-reload.js" });

const { context: learningContext } = makeHarness({
  "deutsch-drill-ui-preferences-v1": JSON.stringify({ topic: "verbs", verbMode: "learn" }),
  "deutsch-drill-training-list-v1": JSON.stringify({
    verbs: ["sich-bedanken-bei-dat", "sich-bedanken-fuer-akk"],
    useVerbList: true
  }),
  "deutsch-drill-translation-language-v1": "ru"
});

vm.runInContext(`${app}

(() => {
  const firstId = "sich-bedanken-bei-dat";
  const secondId = "sich-bedanken-fuer-akk";
  const firstItem = VERB_LOOKUP.get(firstId);
  const hidden = (selector) => elementMap.get(selector).classList.values.has("hidden");
  const clickMode = (label) => elementMap.get("#controlsRow").children
    .find((button) => button.textContent === label).listeners.click();
  assert(appState.verbMode === "learn" && appState.current.isLearning, "Reload should restore Learn mode");
  assert(appState.current.verbItemId === firstId, "Learning should start with the selected list");
  assert(appState.current.learningCount === 2, "Learning should count selected patterns");
  assert(appState.current.prompt === completedVerbSentence(firstItem), "Learning should show the complete main example");
  assert(elementMap.get("#learningPattern").textContent === firstItem.pattern, "Learning should reveal the full pattern and case");
  assert(!hidden("#learningIntro") && !hidden("#translationPanel"), "Learning guidance and translation should appear immediately");
  assert(hidden("#answerGrid") && hidden("#submitButton"), "Learning should not ask for an answer");
  assert(!hidden("#nextButton") && !hidden("#previousButton"), "Learning navigation should appear immediately");
  assert(elementMap.get("#previousButton").disabled, "Previous should be disabled at the first card");
  const progressBefore = JSON.stringify(appState.progress);
  const favoritesBefore = JSON.stringify(appState.favorites);
  const firstPrompt = appState.current.prompt;
  for (const language of Object.keys(TRANSLATION_LANGUAGES)) {
    elementMap.get("#translationLanguage").listeners.change({ target: { value: language } });
    assert(appState.current.prompt === firstPrompt, "Language changes should keep the current card");
    assert(appState.current.translation.sentence === VERB_TRANSLATIONS[firstId][language].sentence,
      "Learning translation should match the main example in " + language);
    assert(!hidden("#exampleTranslation") &&
      elementMap.get("#exampleTranslation").textContent === VERB_TRANSLATIONS[firstId][language].sentence,
      "The translated example should appear under the German example in " + language);
    assert(!elementMap.get("#translationPanel").children.some((row) => row.children[0].textContent === "Example"),
      "Learning should not repeat the translated example in the details panel");
  }
  elementMap.get("#nextButton").listeners.click();
  assert(appState.current.verbItemId === secondId, "Next should visit the next selected pattern without guessing");
  assert(elementMap.get("#nextButton").textContent === "Start again", "Last card should offer a restart");
  assert(!elementMap.get("#previousButton").disabled, "Previous should be available after advancing");
  elementMap.get("#previousButton").listeners.click();
  assert(appState.current.verbItemId === firstId, "Previous should return to the same example");
  nextExercise();
  nextExercise();
  assert(appState.current.verbItemId === firstId, "Restart should return to the first card");
  appState.selected = "bei";
  submitAnswer();
  toggleCurrentFavorite();
  assert(JSON.stringify(appState.progress) === progressBefore, "Learning must not change scores, streaks, mastery, or mistakes");
  assert(JSON.stringify(appState.favorites) === favoritesBefore, "Learning cards must not be stored as scored favourite drills");
  clickMode("Preposition");
  assert(!appState.current.isLearning && !hidden("#answerGrid"), "Practice mode should restore answer choices");
  assert(hidden("#learningPattern") && hidden("#previousButton"), "Practice mode should hide learning controls");
  assert(hidden("#exampleTranslation"), "Practice mode should hide the learning example translation");
  const practice = appState.current;
  appState.selected = practice.options.find((option) => option !== practice.answer);
  submitAnswer();
  clickMode("Learn");
  assert(appState.current.isLearning && !appState.reviewOnly, "Learn should exit practice and review");
  assert(loadUiPreferences().verbMode === "learn", "The Learn choice should be saved");
  clickMode("Mistakes");
  assert(appState.reviewOnly && !appState.current.isLearning && !hidden("#answerGrid"),
    "Mistake review should remain an answerable drill after learning");
  clickMode("Learn");
  toggleVerbInTrainingList(firstId);
  assert(appState.current.verbItemId === secondId && appState.current.learningCount === 1,
    "Changing the selected list should refresh learning scope");
  nextExercise();
  assert(appState.current.verbItemId === secondId, "A single-card list should stay in scope");
  clearVerbTrainingList();
  assert(appState.current.learningCount === VERB_ITEMS.length, "An empty list should fall back to the full catalog");
  const seen = new Set();
  for (let index = 0; index < VERB_ITEMS.length; index += 1) {
    const card = appState.current;
    const item = VERB_LOOKUP.get(card.verbItemId);
    assert(!seen.has(item.id), "Learning should cover every pattern before repeating");
    seen.add(item.id);
    assert(card.prompt === completedVerbSentence(item), "Every learning example should match its translation source");
    assert(card.translation.sentence === VERB_TRANSLATIONS[item.id][appState.translationLanguage].sentence,
      "Every learning card should have the matching translated example");
    nextExercise();
  }
})()`, learningContext, { filename: "app-learning.js" });

console.log("app tests ok");
