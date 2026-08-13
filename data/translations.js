"use strict";

const VERB_TRANSLATIONS = {
  "achten-auf-akk": {
    en: {
      verb: "to pay attention",
      meaning: "to pay attention to",
      sentence: "Pay attention to the traffic."
    },
    ru: {
      verb: "обращать внимание",
      meaning: "обращать внимание на",
      sentence: "Обрати внимание на движение."
    },
    uk: {
      verb: "звертати увагу",
      meaning: "звертати увагу на",
      sentence: "Зверни увагу на дорожній рух."
    },
    tr: {
      verb: "dikkat etmek",
      meaning: "bir şeye dikkat etmek",
      sentence: "Trafiğe dikkat et."
    }
  },
  "warten-auf-akk": {
    en: {
      verb: "to wait",
      meaning: "to wait for",
      sentence: "I am waiting for the bus."
    },
    ru: {
      verb: "ждать",
      meaning: "ждать чего-либо",
      sentence: "Я жду автобус."
    },
    uk: {
      verb: "чекати",
      meaning: "чекати на щось",
      sentence: "Я чекаю на автобус."
    },
    tr: {
      verb: "beklemek",
      meaning: "bir şeyi beklemek",
      sentence: "Otobüsü bekliyorum."
    }
  },
  "antworten-auf-akk": {
    en: {
      verb: "to answer/respond to",
      meaning: "to answer/respond to"
    }
  },
  "bestehen-auf-dat": {
    en: {
      verb: "to insist on",
      meaning: "to insist on"
    }
  },
  "hoffen-auf-akk": {
    en: {
      verb: "to hope for",
      meaning: "to hope for"
    }
  },
  "reagieren-auf-akk": {
    en: {
      verb: "to react to",
      meaning: "to react to"
    }
  },
  "sich-freuen-auf-akk": {
    en: {
      verb: "to look forward to",
      meaning: "to look forward to",
      sentence: "I am looking forward to the vacation."
    },
    ru: {
      verb: "с нетерпением ждать",
      meaning: "с нетерпением ждать чего-либо",
      sentence: "Я с нетерпением жду отпуска."
    },
    uk: {
      verb: "з нетерпінням чекати",
      meaning: "з нетерпінням чекати на щось",
      sentence: "Я з нетерпінням чекаю на відпустку."
    },
    tr: {
      verb: "dört gözle beklemek",
      meaning: "bir şeyi dört gözle beklemek",
      sentence: "Tatili dört gözle bekliyorum."
    }
  },
  "sich-konzentrieren-auf-akk": {
    en: {
      verb: "to concentrate on",
      meaning: "to concentrate on"
    }
  },
  "sich-verlassen-auf-akk": {
    en: {
      verb: "to rely on",
      meaning: "to rely on"
    }
  },
  "sich-vorbereiten-auf-akk": {
    en: {
      verb: "to prepare",
      meaning: "to prepare for",
      sentence: "I am preparing for the exam."
    },
    ru: {
      verb: "готовиться",
      meaning: "готовиться к",
      sentence: "Я готовлюсь к экзамену."
    },
    uk: {
      verb: "готуватися",
      meaning: "готуватися до",
      sentence: "Я готуюся до іспиту."
    },
    tr: {
      verb: "hazırlanmak",
      meaning: "bir şeye hazırlanmak",
      sentence: "Sınava hazırlanıyorum."
    }
  },
  "verzichten-auf-akk": {
    en: {
      verb: "to do without",
      meaning: "to do without"
    }
  },
  "arbeiten-an-dat": {
    en: {
      verb: "to work on",
      meaning: "to work on"
    }
  },
  "denken-an-akk": {
    en: {
      verb: "to think",
      meaning: "to think of/about",
      sentence: "Are you thinking about the appointment?"
    },
    ru: {
      verb: "думать",
      meaning: "думать о",
      sentence: "Ты думаешь о встрече?"
    },
    uk: {
      verb: "думати",
      meaning: "думати про",
      sentence: "Ти думаєш про зустріч?"
    },
    tr: {
      verb: "düşünmek",
      meaning: "bir şeyi düşünmek",
      sentence: "Randevuyu düşünüyor musun?"
    }
  },
  "glauben-an-akk": {
    en: {
      verb: "to believe",
      meaning: "to believe in",
      sentence: "We believe in success."
    },
    ru: {
      verb: "верить",
      meaning: "верить в",
      sentence: "Мы верим в успех."
    },
    uk: {
      verb: "вірити",
      meaning: "вірити в",
      sentence: "Ми віримо в успіх."
    },
    tr: {
      verb: "inanmak",
      meaning: "bir şeye inanmak",
      sentence: "Başarıya inanıyoruz."
    }
  },
  "leiden-an-dat": {
    en: {
      verb: "to suffer from",
      meaning: "to suffer from"
    }
  },
  "erkennen-an-dat": {
    en: {
      verb: "to recognize by",
      meaning: "to recognize by"
    }
  },
  "schreiben-an-akk": {
    en: {
      verb: "to write to",
      meaning: "to write to"
    }
  },
  "sich-beteiligen-an-dat": {
    en: {
      verb: "to take part in",
      meaning: "to take part in"
    }
  },
  "sich-erinnern-an-akk": {
    en: {
      verb: "to remember",
      meaning: "to remember"
    }
  },
  "sich-gewoehnen-an-akk": {
    en: {
      verb: "to get used to",
      meaning: "to get used to"
    }
  },
  "sich-halten-an-akk": {
    en: {
      verb: "to stick to/follow",
      meaning: "to stick to/follow"
    }
  },
  "sich-binden-an-akk": {
    en: {
      verb: "to commit oneself to",
      meaning: "to commit oneself to"
    }
  },
  "sich-orientieren-an-dat": {
    en: {
      verb: "to orient oneself by",
      meaning: "to orient oneself by"
    }
  },
  "sich-wenden-an-akk": {
    en: {
      verb: "to contact/turn to",
      meaning: "to contact/turn to"
    }
  },
  "teilnehmen-an-dat": {
    en: {
      verb: "to participate",
      meaning: "to participate in",
      sentence: "He participates in the course."
    },
    ru: {
      verb: "участвовать",
      meaning: "участвовать в",
      sentence: "Он участвует в курсе."
    },
    uk: {
      verb: "брати участь",
      meaning: "брати участь у",
      sentence: "Він бере участь у курсі."
    },
    tr: {
      verb: "katılmak",
      meaning: "bir şeye katılmak",
      sentence: "Kursa katılıyor."
    }
  },
  "sterben-an-dat": {
    en: {
      verb: "to die of/from",
      meaning: "to die of/from"
    }
  },
  "liegen-an-dat": {
    en: {
      verb: "to be due to",
      meaning: "to be due to"
    }
  },
  "schuld-sein-an-dat": {
    en: {
      verb: "to be responsible for",
      meaning: "to be responsible for"
    }
  },
  "zweifeln-an-dat": {
    en: {
      verb: "to doubt",
      meaning: "to doubt"
    }
  },
  "sich-entschuldigen-bei-dat": {
    en: {
      verb: "to apologize to",
      meaning: "to apologize to"
    }
  },
  "helfen-bei-dat": {
    en: {
      verb: "to help with",
      meaning: "to help with"
    }
  },
  "wohnen-bei-dat": {
    en: {
      verb: "to stay/live at someone's place",
      meaning: "to stay/live at someone's place"
    }
  },
  "kaempfen-fuer-akk": {
    en: {
      verb: "to fight for",
      meaning: "to fight for"
    }
  },
  "danken-fuer-akk": {
    en: {
      verb: "to thank",
      meaning: "to thank for",
      sentence: "I thank you for the hint."
    },
    ru: {
      verb: "благодарить",
      meaning: "благодарить за",
      sentence: "Я благодарю тебя за подсказку."
    },
    uk: {
      verb: "дякувати",
      meaning: "дякувати за",
      sentence: "Я дякую тобі за підказку."
    },
    tr: {
      verb: "teşekkür etmek",
      meaning: "bir şey için teşekkür etmek",
      sentence: "İpucu için sana teşekkür ederim."
    }
  },
  "sich-entscheiden-fuer-akk": {
    en: {
      verb: "to decide",
      meaning: "to decide on",
      sentence: "He decides on the course."
    },
    ru: {
      verb: "выбирать",
      meaning: "выбрать что-либо",
      sentence: "Он выбирает курс."
    },
    uk: {
      verb: "обирати",
      meaning: "обрати щось",
      sentence: "Він обирає курс."
    },
    tr: {
      verb: "karar vermek",
      meaning: "bir şeye karar vermek",
      sentence: "Kursa karar veriyor."
    }
  },
  "sich-entschuldigen-fuer-akk": {
    en: {
      verb: "to apologize for",
      meaning: "to apologize for"
    }
  },
  "sich-interessieren-fuer-akk": {
    en: {
      verb: "to be interested",
      meaning: "to be interested in",
      sentence: "Lina is interested in the film."
    },
    ru: {
      verb: "интересоваться",
      meaning: "интересоваться чем-либо",
      sentence: "Лина интересуется фильмом."
    },
    uk: {
      verb: "цікавитися",
      meaning: "цікавитися чимось",
      sentence: "Ліна цікавиться фільмом."
    },
    tr: {
      verb: "ilgilenmek",
      meaning: "bir şeyle ilgilenmek",
      sentence: "Lina filmle ilgileniyor."
    }
  },
  "sorgen-fuer-akk": {
    en: {
      verb: "to take care of/provide",
      meaning: "to take care of/provide"
    }
  },
  "investieren-in-akk": {
    en: {
      verb: "to invest in",
      meaning: "to invest in"
    }
  },
  "sich-verlieben-in-akk": {
    en: {
      verb: "to fall in love",
      meaning: "to fall in love with",
      sentence: "She falls in love with the neighbor."
    },
    ru: {
      verb: "влюбляться",
      meaning: "влюбляться в",
      sentence: "Она влюбляется в соседа."
    },
    uk: {
      verb: "закохуватися",
      meaning: "закохуватися в",
      sentence: "Вона закохується в сусіда."
    },
    tr: {
      verb: "aşık olmak",
      meaning: "birine aşık olmak",
      sentence: "Komşusuna aşık oluyor."
    }
  },
  "uebersetzen-in-akk": {
    en: {
      verb: "to translate into",
      meaning: "to translate into"
    }
  },
  "anfangen-mit-dat": {
    en: {
      verb: "to start with",
      meaning: "to start with"
    }
  },
  "aufhoeren-mit-dat": {
    en: {
      verb: "to stop",
      meaning: "to stop"
    }
  },
  "beginnen-mit-dat": {
    en: {
      verb: "to begin with",
      meaning: "to begin with"
    }
  },
  "rechnen-mit-dat": {
    en: {
      verb: "to expect/count on",
      meaning: "to expect/count on"
    }
  },
  "sich-beschaeftigen-mit-dat": {
    en: {
      verb: "to deal with",
      meaning: "to deal with",
      sentence: "She is dealing with the task."
    },
    ru: {
      verb: "заниматься",
      meaning: "заниматься чем-либо",
      sentence: "Она занимается задачей."
    },
    uk: {
      verb: "займатися",
      meaning: "займатися чимось",
      sentence: "Вона займається завданням."
    },
    tr: {
      verb: "uğraşmak",
      meaning: "bir şeyle uğraşmak",
      sentence: "Görevle uğraşıyor."
    }
  },
  "sich-treffen-mit-dat": {
    en: {
      verb: "to meet with",
      meaning: "to meet with"
    }
  },
  "sprechen-mit-dat": {
    en: {
      verb: "to speak",
      meaning: "to speak with",
      sentence: "I am speaking with my teacher."
    },
    ru: {
      verb: "говорить",
      meaning: "говорить с",
      sentence: "Я говорю с моим учителем."
    },
    uk: {
      verb: "говорити",
      meaning: "говорити з",
      sentence: "Я говорю зі своїм учителем."
    },
    tr: {
      verb: "konuşmak",
      meaning: "biriyle konuşmak",
      sentence: "Öğretmenimle konuşuyorum."
    }
  },
  "telefonieren-mit-dat": {
    en: {
      verb: "to talk on the phone with",
      meaning: "to talk on the phone with"
    }
  },
  "sich-streiten-mit-dat": {
    en: {
      verb: "to argue with",
      meaning: "to argue with"
    }
  },
  "spielen-mit-dat": {
    en: {
      verb: "to play with",
      meaning: "to play with"
    }
  },
  "diskutieren-mit-dat": {
    en: {
      verb: "to discuss with",
      meaning: "to discuss with"
    }
  },
  "verhandeln-mit-dat": {
    en: {
      verb: "to negotiate with",
      meaning: "to negotiate with"
    }
  },
  "sich-versoehnen-mit-dat": {
    en: {
      verb: "to reconcile with",
      meaning: "to reconcile with"
    }
  },
  "fragen-nach-dat": {
    en: {
      verb: "to ask for/about",
      meaning: "to ask for/about"
    }
  },
  "riechen-nach-dat": {
    en: {
      verb: "to smell like",
      meaning: "to smell like"
    }
  },
  "schmecken-nach-dat": {
    en: {
      verb: "to taste like",
      meaning: "to taste like"
    }
  },
  "sich-erkundigen-nach-dat": {
    en: {
      verb: "to inquire about",
      meaning: "to inquire about"
    }
  },
  "sich-sehnen-nach-dat": {
    en: {
      verb: "to long for",
      meaning: "to long for"
    }
  },
  "suchen-nach-dat": {
    en: {
      verb: "to look for",
      meaning: "to look for"
    }
  },
  "streben-nach-dat": {
    en: {
      verb: "to strive for",
      meaning: "to strive for"
    }
  },
  "benennen-nach-dat": {
    en: {
      verb: "to name after",
      meaning: "to name after"
    }
  },
  "beitragen-zu-dat": {
    en: {
      verb: "to contribute to",
      meaning: "to contribute to"
    }
  },
  "einladen-zu-dat": {
    en: {
      verb: "to invite to",
      meaning: "to invite to"
    }
  },
  "fuehren-zu-dat": {
    en: {
      verb: "to lead to",
      meaning: "to lead to"
    }
  },
  "gehoeren-zu-dat": {
    en: {
      verb: "to belong to",
      meaning: "to belong to"
    }
  },
  "gratulieren-zu-dat": {
    en: {
      verb: "to congratulate on",
      meaning: "to congratulate on"
    }
  },
  "passen-zu-dat": {
    en: {
      verb: "to fit/go with",
      meaning: "to fit/go with"
    }
  },
  "sich-entschliessen-zu-dat": {
    en: {
      verb: "to decide on",
      meaning: "to decide on"
    }
  },
  "sich-bekennen-zu-dat": {
    en: {
      verb: "to admit/declare allegiance to",
      meaning: "to admit/declare allegiance to"
    }
  },
  "neigen-zu-dat": {
    en: {
      verb: "to tend toward",
      meaning: "to tend toward"
    }
  },
  "bitten-um-akk": {
    en: {
      verb: "to ask for",
      meaning: "to ask for"
    }
  },
  "sich-bewerben-um-akk": {
    en: {
      verb: "to apply for",
      meaning: "to apply for"
    }
  },
  "sich-kuemmern-um-akk": {
    en: {
      verb: "to take care",
      meaning: "to take care of",
      sentence: "She takes care of the registration."
    },
    ru: {
      verb: "заниматься",
      meaning: "заниматься чем-либо",
      sentence: "Она занимается регистрацией."
    },
    uk: {
      verb: "займатися",
      meaning: "займатися чимось",
      sentence: "Вона займається реєстрацією."
    },
    tr: {
      verb: "ilgilenmek",
      meaning: "bir şeyle ilgilenmek",
      sentence: "Kayıtla ilgileniyor."
    }
  },
  "sich-sorgen-um-akk": {
    en: {
      verb: "to worry about",
      meaning: "to worry about"
    }
  },
  "sich-streiten-um-akk": {
    en: {
      verb: "to argue over",
      meaning: "to argue over"
    }
  },
  "sich-bemuehen-um-akk": {
    en: {
      verb: "to make an effort for",
      meaning: "to make an effort for"
    }
  },
  "werben-um-akk": {
    en: {
      verb: "to court/seek",
      meaning: "to court/seek"
    }
  },
  "es-geht-um-akk": {
    en: {
      verb: "to be about",
      meaning: "to be about"
    }
  },
  "berichten-ueber-akk": {
    en: {
      verb: "to report on",
      meaning: "to report on"
    }
  },
  "sprechen-ueber-akk": {
    en: {
      verb: "to talk",
      meaning: "to talk about",
      sentence: "We are talking about the weather."
    },
    ru: {
      verb: "говорить",
      meaning: "говорить о",
      sentence: "Мы говорим о погоде."
    },
    uk: {
      verb: "говорити",
      meaning: "говорити про",
      sentence: "Ми говоримо про погоду."
    },
    tr: {
      verb: "konuşmak",
      meaning: "bir şey hakkında konuşmak",
      sentence: "Hava durumu hakkında konuşuyoruz."
    }
  },
  "diskutieren-ueber-akk": {
    en: {
      verb: "to discuss",
      meaning: "to discuss"
    }
  },
  "lachen-ueber-akk": {
    en: {
      verb: "to laugh about",
      meaning: "to laugh about"
    }
  },
  "nachdenken-ueber-akk": {
    en: {
      verb: "to think about",
      meaning: "to think about"
    }
  },
  "sich-aergern-ueber-akk": {
    en: {
      verb: "to be annoyed about",
      meaning: "to be annoyed about"
    }
  },
  "sich-beschweren-ueber-akk": {
    en: {
      verb: "to complain",
      meaning: "to complain about",
      sentence: "The customer complains about the noise."
    },
    ru: {
      verb: "жаловаться",
      meaning: "жаловаться на",
      sentence: "Клиент жалуется на шум."
    },
    uk: {
      verb: "скаржитися",
      meaning: "скаржитися на",
      sentence: "Клієнт скаржиться на шум."
    },
    tr: {
      verb: "şikayet etmek",
      meaning: "bir şeyden şikayet etmek",
      sentence: "Müşteri gürültüden şikayet ediyor."
    }
  },
  "sich-freuen-ueber-akk": {
    en: {
      verb: "to be happy",
      meaning: "to be happy about",
      sentence: "She is happy about the gift."
    },
    ru: {
      verb: "радоваться",
      meaning: "радоваться чему-либо",
      sentence: "Она рада подарку."
    },
    uk: {
      verb: "радіти",
      meaning: "радіти чомусь",
      sentence: "Вона рада подарунку."
    },
    tr: {
      verb: "sevinmek",
      meaning: "bir şeye sevinmek",
      sentence: "Hediyeye seviniyor."
    }
  },
  "sich-informieren-ueber-akk": {
    en: {
      verb: "to inform oneself about",
      meaning: "to inform oneself about"
    }
  },
  "sich-wundern-ueber-akk": {
    en: {
      verb: "to be surprised about",
      meaning: "to be surprised about"
    }
  },
  "bestehen-aus-dat": {
    en: {
      verb: "to consist of",
      meaning: "to consist of"
    }
  },
  "kommen-aus-dat": {
    en: {
      verb: "to come from",
      meaning: "to come from"
    }
  },
  "abhaengen-von-dat": {
    en: {
      verb: "to depend",
      meaning: "to depend on",
      sentence: "That depends on your decision."
    },
    ru: {
      verb: "зависеть",
      meaning: "зависеть от",
      sentence: "Это зависит от твоего решения."
    },
    uk: {
      verb: "залежати",
      meaning: "залежати від",
      sentence: "Це залежить від твого рішення."
    },
    tr: {
      verb: "bağlı olmak",
      meaning: "bir şeye bağlı olmak",
      sentence: "Bu senin kararına bağlı."
    }
  },
  "traeumen-von-dat": {
    en: {
      verb: "to dream",
      meaning: "to dream of",
      sentence: "I dream of a house by the sea."
    },
    ru: {
      verb: "мечтать",
      meaning: "мечтать о",
      sentence: "Я мечтаю о доме у моря."
    },
    uk: {
      verb: "мріяти",
      meaning: "мріяти про",
      sentence: "Я мрію про будинок біля моря."
    },
    tr: {
      verb: "hayal etmek",
      meaning: "bir şeyin hayalini kurmak",
      sentence: "Deniz kıyısında bir ev hayal ediyorum."
    }
  },
  "erzaehlen-von-dat": {
    en: {
      verb: "to tell about",
      meaning: "to tell about"
    }
  },
  "wissen-von-dat": {
    en: {
      verb: "to know about",
      meaning: "to know about"
    }
  },
  "hoeren-von-dat": {
    en: {
      verb: "to hear about/from",
      meaning: "to hear about/from"
    }
  },
  "reden-von-dat": {
    en: {
      verb: "to talk about",
      meaning: "to talk about"
    }
  },
  "leben-von-dat": {
    en: {
      verb: "to live on",
      meaning: "to live on"
    }
  },
  "handeln-von-dat": {
    en: {
      verb: "to be about",
      meaning: "to be about"
    }
  },
  "profitieren-von-dat": {
    en: {
      verb: "to benefit from",
      meaning: "to benefit from"
    }
  },
  "sich-trennen-von-dat": {
    en: {
      verb: "to separate from",
      meaning: "to separate from"
    }
  },
  "sich-verabschieden-von-dat": {
    en: {
      verb: "to say goodbye to",
      meaning: "to say goodbye to"
    }
  },
  "sich-erholen-von-dat": {
    en: {
      verb: "to recover from",
      meaning: "to recover from"
    }
  },
  "schuetzen-vor-dat": {
    en: {
      verb: "to protect from",
      meaning: "to protect from"
    }
  },
  "sich-fuerchten-vor-dat": {
    en: {
      verb: "to be afraid of",
      meaning: "to be afraid of"
    }
  },
  "warnen-vor-dat": {
    en: {
      verb: "to warn about",
      meaning: "to warn about"
    }
  }
};
