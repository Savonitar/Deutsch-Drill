const fs = require("fs");
const vm = require("vm");

const app = fs.readFileSync("app.js", "utf8");

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
  for (const item of VERB_ITEMS) {
    assert(!verbIds.has(item.id), "Duplicate verb id: " + item.id);
    verbIds.add(item.id);
    assert(
      (item.sentence.match(/___/g) || []).length === 1,
      "Sentence must contain exactly one blank: " + item.id
    );
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
