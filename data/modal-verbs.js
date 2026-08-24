"use strict";

const MODAL_FORM_DEFINITIONS = [
  { id: "present", label: "Präsens" },
  { id: "preterite", label: "Präteritum" },
  { id: "subjunctive2", label: "Konjunktiv II" }
];

const MODAL_PERSON_DEFINITIONS = [
  { id: "ich", label: "ich", subjects: ["ich"], formIndex: 0 },
  { id: "du", label: "du", subjects: ["du"], formIndex: 1 },
  { id: "erSieEs", label: "er/sie/es", subjects: ["er", "sie", "es"], formIndex: 2 },
  { id: "wir", label: "wir", subjects: ["wir"], formIndex: 3 },
  { id: "ihr", label: "ihr", subjects: ["ihr"], formIndex: 4 },
  { id: "sieSie", label: "sie/Sie", subjects: ["sie", "Sie"], formIndex: 5 }
];

const MODAL_VERBS = [
  {
    id: "duerfen",
    infinitive: "dürfen",
    forms: {
      present: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
      preterite: ["durfte", "durftest", "durfte", "durften", "durftet", "durften"],
      subjunctive2: ["dürfte", "dürftest", "dürfte", "dürften", "dürftet", "dürften"]
    },
    contexts: {
      present: "Heute ___ {subject} länger bleiben.",
      preterite: "Damals ___ {subject} länger bleiben.",
      subjunctive2: "Wenn es erlaubt wäre, ___ {subject} länger bleiben."
    }
  },
  {
    id: "koennen",
    infinitive: "können",
    forms: {
      present: ["kann", "kannst", "kann", "können", "könnt", "können"],
      preterite: ["konnte", "konntest", "konnte", "konnten", "konntet", "konnten"],
      subjunctive2: ["könnte", "könntest", "könnte", "könnten", "könntet", "könnten"]
    },
    contexts: {
      present: "Heute ___ {subject} die Aufgabe allein lösen.",
      preterite: "Damals ___ {subject} die Aufgabe allein lösen.",
      subjunctive2: "Mit mehr Zeit ___ {subject} die Aufgabe allein lösen."
    }
  },
  {
    id: "moegen",
    infinitive: "mögen",
    forms: {
      present: ["mag", "magst", "mag", "mögen", "mögt", "mögen"],
      preterite: ["mochte", "mochtest", "mochte", "mochten", "mochtet", "mochten"],
      subjunctive2: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"]
    },
    contexts: {
      present: "Heute ___ {subject} diesen Film.",
      preterite: "Früher ___ {subject} diesen Film.",
      subjunctive2: "Jetzt ___ {subject} gern einen Tee."
    },
    notes: {
      subjunctive2:
        "möchten is the Konjunktiv II form of mögen and commonly expresses a polite wish."
    }
  },
  {
    id: "muessen",
    infinitive: "müssen",
    forms: {
      present: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
      preterite: ["musste", "musstest", "musste", "mussten", "musstet", "mussten"],
      subjunctive2: ["müsste", "müsstest", "müsste", "müssten", "müsstet", "müssten"]
    },
    contexts: {
      present: "Heute ___ {subject} früh aufstehen.",
      preterite: "Gestern ___ {subject} früh aufstehen.",
      subjunctive2: "Ohne Hilfe ___ {subject} länger arbeiten."
    }
  },
  {
    id: "sollen",
    infinitive: "sollen",
    forms: {
      present: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
      preterite: ["sollte", "solltest", "sollte", "sollten", "solltet", "sollten"],
      subjunctive2: ["sollte", "solltest", "sollte", "sollten", "solltet", "sollten"]
    },
    contexts: {
      present: "Heute ___ {subject} den Arzt anrufen.",
      preterite: "Gestern ___ {subject} den Arzt anrufen.",
      subjunctive2: "Was ___ {subject} jetzt tun?"
    },
    notes: {
      preterite:
        "The Präteritum and Konjunktiv II forms of sollen are identical; context determines the meaning.",
      subjunctive2:
        "The Präteritum and Konjunktiv II forms of sollen are identical; context determines the meaning."
    }
  },
  {
    id: "wollen",
    infinitive: "wollen",
    forms: {
      present: ["will", "willst", "will", "wollen", "wollt", "wollen"],
      preterite: ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"],
      subjunctive2: ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"]
    },
    contexts: {
      present: "Heute ___ {subject} Deutsch lernen.",
      preterite: "Früher ___ {subject} Deutsch lernen.",
      subjunctive2: "Wenn {subject} später kommen ___, wäre ein anderer Termin möglich."
    },
    notes: {
      preterite:
        "The Präteritum and Konjunktiv II forms of wollen are identical; context determines the meaning.",
      subjunctive2:
        "The Präteritum and Konjunktiv II forms of wollen are identical; context determines the meaning."
    }
  }
];
