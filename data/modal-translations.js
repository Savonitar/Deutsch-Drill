"use strict";

const MODAL_TRANSLATIONS = {
  duerfen: {
    en: {
      verb: "may; to be allowed to",
      meanings: {
        present: "permission: may or be allowed to",
        preterite: "past permission: was or were allowed to",
        subjunctive2: "conditional or polite permission: would or might be allowed to"
      },
      note: "nicht dürfen means that something is forbidden."
    },
    ru: {
      verb: "мочь; иметь разрешение",
      meanings: {
        present: "разрешение: можно или иметь право",
        preterite: "разрешение в прошлом: было можно или разрешили",
        subjunctive2: "условное или вежливое разрешение: можно было бы"
      },
      note: "nicht dürfen означает, что действие запрещено."
    },
    uk: {
      verb: "могти; мати дозвіл",
      meanings: {
        present: "дозвіл: можна або мати право",
        preterite: "дозвіл у минулому: було можна або дозволили",
        subjunctive2: "умовний або ввічливий дозвіл: можна було б"
      },
      note: "nicht dürfen означає, що дію заборонено."
    },
    tr: {
      verb: "izinli olmak; -ebilmek",
      meanings: {
        present: "izin: yapabilmek veya izinli olmak",
        preterite: "geçmişte izin: yapmasına izin verilmiş olmak",
        subjunctive2: "koşullu veya nazik izin: izin verilse yapabilmek"
      },
      note: "nicht dürfen bir şeyin yasak olduğu anlamına gelir."
    }
  },
  koennen: {
    en: {
      verb: "can; to be able to",
      meanings: {
        present: "present ability or possibility",
        preterite: "ability or possibility in the past",
        subjunctive2: "conditional ability or possibility: could"
      }
    },
    ru: {
      verb: "мочь; уметь",
      meanings: {
        present: "способность или возможность в настоящем",
        preterite: "способность или возможность в прошлом",
        subjunctive2: "условная способность или возможность: мог бы"
      }
    },
    uk: {
      verb: "могти; уміти",
      meanings: {
        present: "здатність або можливість у теперішньому",
        preterite: "здатність або можливість у минулому",
        subjunctive2: "умовна здатність або можливість: міг би"
      }
    },
    tr: {
      verb: "-ebilmek; yapabilmek",
      meanings: {
        present: "şimdiki yetenek veya olasılık",
        preterite: "geçmişteki yetenek veya olasılık",
        subjunctive2: "koşullu yetenek veya olasılık"
      }
    }
  },
  moegen: {
    en: {
      verb: "to like; möchten: would like",
      meanings: {
        present: "a present preference: to like",
        preterite: "a preference in the past: liked",
        subjunctive2: "a polite present wish: would like"
      },
      note: "möchten is the Konjunktiv II form of mögen, not a separate infinitive."
    },
    ru: {
      verb: "любить; нравиться; möchten: хотеть вежливо",
      meanings: {
        present: "предпочтение в настоящем: любить или нравиться",
        preterite: "предпочтение в прошлом: любил или нравилось",
        subjunctive2: "вежливое желание в настоящем: хотелось бы"
      },
      note: "möchten — это форма Konjunktiv II глагола mögen, а не отдельный инфинитив."
    },
    uk: {
      verb: "любити; подобатися; möchten: хотіти ввічливо",
      meanings: {
        present: "уподобання в теперішньому: любити або подобатися",
        preterite: "уподобання в минулому: любив або подобалося",
        subjunctive2: "ввічливе бажання в теперішньому: хотілося б"
      },
      note: "möchten — це форма Konjunktiv II дієслова mögen, а не окремий інфінітив."
    },
    tr: {
      verb: "sevmek; möchten: kibarca istemek",
      meanings: {
        present: "şimdiki tercih: sevmek veya hoşlanmak",
        preterite: "geçmişteki tercih: sevmek veya hoşlanmak",
        subjunctive2: "şimdiki nazik istek: istemek"
      },
      note: "möchten, ayrı bir mastar değil, mögen fiilinin Konjunktiv II biçimidir."
    }
  },
  muessen: {
    en: {
      verb: "must; to have to",
      meanings: {
        present: "present necessity: must or have to",
        preterite: "necessity in the past: had to",
        subjunctive2: "conditional necessity: would have to"
      },
      note: "nicht müssen means that something is not necessary."
    },
    ru: {
      verb: "быть должным; быть вынужденным",
      meanings: {
        present: "необходимость в настоящем: должен или вынужден",
        preterite: "необходимость в прошлом: должен был или пришлось",
        subjunctive2: "условная необходимость: пришлось бы"
      },
      note: "nicht müssen означает отсутствие необходимости: не обязательно."
    },
    uk: {
      verb: "мусити; бути змушеним",
      meanings: {
        present: "необхідність у теперішньому: мусити або бути змушеним",
        preterite: "необхідність у минулому: мусив або довелося",
        subjunctive2: "умовна необхідність: довелося б"
      },
      note: "nicht müssen означає відсутність необхідності: не обов’язково."
    },
    tr: {
      verb: "zorunda olmak; gerekmek",
      meanings: {
        present: "şimdiki zorunluluk: zorunda olmak",
        preterite: "geçmişteki zorunluluk: zorunda kalmış olmak",
        subjunctive2: "koşullu zorunluluk: zorunda kalacak olmak"
      },
      note: "nicht müssen zorunluluk olmadığı anlamına gelir."
    }
  },
  sollen: {
    en: {
      verb: "should; to be supposed to",
      meanings: {
        present: "a present instruction or expectation: should or be supposed to",
        preterite: "an instruction or expectation in the past: was or were supposed to",
        subjunctive2: "advice or recommendation: should or ought to"
      },
      note: "The Präteritum and Konjunktiv II forms are spelled identically."
    },
    ru: {
      verb: "следует; быть должным по указанию",
      meanings: {
        present: "указание или ожидание в настоящем: следует или должен",
        preterite: "указание или ожидание в прошлом: должен был",
        subjunctive2: "совет или рекомендация: следовало бы"
      },
      note: "Формы Präteritum и Konjunktiv II пишутся одинаково."
    },
    uk: {
      verb: "слід; мати зробити за вказівкою",
      meanings: {
        present: "вказівка або очікування в теперішньому: слід або має",
        preterite: "вказівка або очікування в минулому: мав зробити",
        subjunctive2: "порада або рекомендація: слід було б"
      },
      note: "Форми Präteritum і Konjunktiv II пишуться однаково."
    },
    tr: {
      verb: "-meli/-malı; beklenmek",
      meanings: {
        present: "şimdiki talimat veya beklenti: yapması gerekmek",
        preterite: "geçmişteki talimat veya beklenti: yapması beklenmiş olmak",
        subjunctive2: "tavsiye veya öneri: yapmalı"
      },
      note: "Präteritum ve Konjunktiv II biçimleri aynı yazılır."
    }
  },
  wollen: {
    en: {
      verb: "to want to; to intend to",
      meanings: {
        present: "a present wish or intention: want to",
        preterite: "a wish or intention in the past: wanted to",
        subjunctive2: "a conditional wish or intention: would want to"
      },
      note: "The Präteritum and Konjunktiv II forms are spelled identically."
    },
    ru: {
      verb: "хотеть; намереваться",
      meanings: {
        present: "желание или намерение в настоящем: хотеть",
        preterite: "желание или намерение в прошлом: хотел",
        subjunctive2: "условное желание или намерение: хотел бы"
      },
      note: "Формы Präteritum и Konjunktiv II пишутся одинаково."
    },
    uk: {
      verb: "хотіти; мати намір",
      meanings: {
        present: "бажання або намір у теперішньому: хотіти",
        preterite: "бажання або намір у минулому: хотів",
        subjunctive2: "умовне бажання або намір: хотів би"
      },
      note: "Форми Präteritum і Konjunktiv II пишуться однаково."
    },
    tr: {
      verb: "istemek; niyet etmek",
      meanings: {
        present: "şimdiki istek veya niyet: istemek",
        preterite: "geçmişteki istek veya niyet: istemiş olmak",
        subjunctive2: "koşullu istek veya niyet: istemek"
      },
      note: "Präteritum ve Konjunktiv II biçimleri aynı yazılır."
    }
  }
};
