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
      verb: "to answer",
      meaning: "to answer/respond to",
      sentence: "I answer the message."
    },
    ru: {
      verb: "отвечать",
      meaning: "отвечать на",
      sentence: "Я отвечаю на сообщение."
    },
    uk: {
      verb: "відповідати",
      meaning: "відповідати на",
      sentence: "Я відповідаю на повідомлення."
    },
    tr: {
      verb: "cevap vermek",
      meaning: "bir şeye cevap vermek",
      sentence: "Mesaja cevap veriyorum."
    }
  },
  "bestehen-auf-dat": {
    en: {
      verb: "to insist",
      meaning: "to insist on",
      sentence: "I insist on an explanation."
    },
    ru: {
      verb: "настаивать",
      meaning: "настаивать на",
      sentence: "Я настаиваю на объяснении."
    },
    uk: {
      verb: "наполягати",
      meaning: "наполягати на",
      sentence: "Я наполягаю на поясненні."
    },
    tr: {
      verb: "ısrar etmek",
      meaning: "bir şeyde ısrar etmek",
      sentence: "Bir açıklamada ısrar ediyorum."
    }
  },
  "hoffen-auf-akk": {
    en: {
      verb: "to hope",
      meaning: "to hope for",
      sentence: "We hope for success."
    },
    ru: {
      verb: "надеяться",
      meaning: "надеяться на",
      sentence: "Мы надеемся на успех."
    },
    uk: {
      verb: "сподіватися",
      meaning: "сподіватися на",
      sentence: "Ми сподіваємося на успіх."
    },
    tr: {
      verb: "ummak",
      meaning: "bir şeyi ummak",
      sentence: "Başarıyı umuyoruz."
    }
  },
  "reagieren-auf-akk": {
    en: {
      verb: "to react",
      meaning: "to react to",
      sentence: "How do you react to the suggestion?"
    },
    ru: {
      verb: "реагировать",
      meaning: "реагировать на",
      sentence: "Как ты реагируешь на предложение?"
    },
    uk: {
      verb: "реагувати",
      meaning: "реагувати на",
      sentence: "Як ти реагуєш на пропозицію?"
    },
    tr: {
      verb: "tepki vermek",
      meaning: "bir şeye tepki vermek",
      sentence: "Öneriye nasıl tepki veriyorsun?"
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
      verb: "to concentrate",
      meaning: "to concentrate on",
      sentence: "She concentrates on the task."
    },
    ru: {
      verb: "концентрироваться",
      meaning: "концентрироваться на",
      sentence: "Она концентрируется на задаче."
    },
    uk: {
      verb: "зосереджуватися",
      meaning: "зосереджуватися на",
      sentence: "Вона зосереджується на завданні."
    },
    tr: {
      verb: "odaklanmak",
      meaning: "bir şeye odaklanmak",
      sentence: "Göreve odaklanıyor."
    }
  },
  "sich-verlassen-auf-akk": {
    en: {
      verb: "to rely",
      meaning: "to rely on",
      sentence: "I rely on the plan."
    },
    ru: {
      verb: "полагаться",
      meaning: "полагаться на",
      sentence: "Я полагаюсь на план."
    },
    uk: {
      verb: "покладатися",
      meaning: "покладатися на",
      sentence: "Я покладаюся на план."
    },
    tr: {
      verb: "güvenmek",
      meaning: "bir şeye güvenmek",
      sentence: "Plana güveniyorum."
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
      meaning: "to do without",
      sentence: "I do without dessert."
    },
    ru: {
      verb: "отказываться",
      meaning: "отказываться от",
      sentence: "Я отказываюсь от десерта."
    },
    uk: {
      verb: "відмовлятися",
      meaning: "відмовлятися від",
      sentence: "Я відмовляюся від десерту."
    },
    tr: {
      verb: "vazgeçmek",
      meaning: "bir şeyden vazgeçmek",
      sentence: "Tatlıdan vazgeçiyorum."
    }
  },
  "arbeiten-an-dat": {
    en: {
      verb: "to work",
      meaning: "to work on",
      sentence: "I am working on the project."
    },
    ru: {
      verb: "работать",
      meaning: "работать над",
      sentence: "Я работаю над проектом."
    },
    uk: {
      verb: "працювати",
      meaning: "працювати над",
      sentence: "Я працюю над проєктом."
    },
    tr: {
      verb: "çalışmak",
      meaning: "bir şey üzerinde çalışmak",
      sentence: "Proje üzerinde çalışıyorum."
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
      verb: "to suffer",
      meaning: "to suffer from",
      sentence: "He suffers from an illness."
    },
    ru: {
      verb: "страдать",
      meaning: "страдать от",
      sentence: "Он страдает от болезни."
    },
    uk: {
      verb: "страждати",
      meaning: "страждати на",
      sentence: "Він страждає на хворобу."
    },
    tr: {
      verb: "muzdarip olmak",
      meaning: "bir şeyden muzdarip olmak",
      sentence: "Bir hastalıktan muzdarip."
    }
  },
  "erkennen-an-dat": {
    en: {
      verb: "to recognize",
      meaning: "to recognize by",
      sentence: "I recognize him by his voice."
    },
    ru: {
      verb: "узнавать",
      meaning: "узнавать по",
      sentence: "Я узнаю его по голосу."
    },
    uk: {
      verb: "впізнавати",
      meaning: "впізнавати за",
      sentence: "Я впізнаю його за голосом."
    },
    tr: {
      verb: "tanımak",
      meaning: "bir şeyden tanımak",
      sentence: "Onu sesinden tanıyorum."
    }
  },
  "schreiben-an-akk": {
    en: {
      verb: "to write",
      meaning: "to write to",
      sentence: "She writes to the customer."
    },
    ru: {
      verb: "писать",
      meaning: "писать кому-либо",
      sentence: "Она пишет клиенту."
    },
    uk: {
      verb: "писати",
      meaning: "писати комусь",
      sentence: "Вона пише клієнту."
    },
    tr: {
      verb: "yazmak",
      meaning: "birine yazmak",
      sentence: "Müşteriye yazıyor."
    }
  },
  "sich-beteiligen-an-dat": {
    en: {
      verb: "to take part",
      meaning: "to take part in",
      sentence: "She takes part in the conversation."
    },
    ru: {
      verb: "участвовать",
      meaning: "участвовать в",
      sentence: "Она участвует в разговоре."
    },
    uk: {
      verb: "брати участь",
      meaning: "брати участь у",
      sentence: "Вона бере участь у розмові."
    },
    tr: {
      verb: "katılmak",
      meaning: "bir şeye katılmak",
      sentence: "Sohbete katılıyor."
    }
  },
  "sich-erinnern-an-akk": {
    en: {
      verb: "to remember",
      meaning: "to remember",
      sentence: "He remembers the name."
    },
    ru: {
      verb: "вспоминать",
      meaning: "вспоминать о",
      sentence: "Он вспоминает имя."
    },
    uk: {
      verb: "згадувати",
      meaning: "згадувати про",
      sentence: "Він згадує ім'я."
    },
    tr: {
      verb: "hatırlamak",
      meaning: "bir şeyi hatırlamak",
      sentence: "İsmi hatırlıyor."
    }
  },
  "sich-gewoehnen-an-akk": {
    en: {
      verb: "to get used",
      meaning: "to get used to",
      sentence: "I am getting used to the traffic."
    },
    ru: {
      verb: "привыкать",
      meaning: "привыкать к",
      sentence: "Я привыкаю к движению."
    },
    uk: {
      verb: "звикати",
      meaning: "звикати до",
      sentence: "Я звикаю до руху."
    },
    tr: {
      verb: "alışmak",
      meaning: "bir şeye alışmak",
      sentence: "Trafiğe alışıyorum."
    }
  },
  "sich-halten-an-akk": {
    en: {
      verb: "to stick",
      meaning: "to stick to/follow",
      sentence: "Stick to the plan."
    },
    ru: {
      verb: "придерживаться",
      meaning: "придерживаться",
      sentence: "Придерживайся плана."
    },
    uk: {
      verb: "дотримуватися",
      meaning: "дотримуватися",
      sentence: "Дотримуйся плану."
    },
    tr: {
      verb: "uymak",
      meaning: "bir şeye uymak",
      sentence: "Plana uy."
    }
  },
  "sich-binden-an-akk": {
    en: {
      verb: "to commit oneself",
      meaning: "to commit oneself to",
      sentence: "He does not like to commit himself to a contract."
    },
    ru: {
      verb: "связывать себя",
      meaning: "связывать себя с",
      sentence: "Он не любит связывать себя договором."
    },
    uk: {
      verb: "зв'язувати себе",
      meaning: "зв'язувати себе з",
      sentence: "Він не любить зв'язувати себе договором."
    },
    tr: {
      verb: "bağlanmak",
      meaning: "bir şeye bağlanmak",
      sentence: "Bir sözleşmeye bağlanmayı pek sevmez."
    }
  },
  "sich-orientieren-an-dat": {
    en: {
      verb: "to orient oneself",
      meaning: "to orient oneself by",
      sentence: "We orient ourselves by the example."
    },
    ru: {
      verb: "ориентироваться",
      meaning: "ориентироваться на",
      sentence: "Мы ориентируемся на пример."
    },
    uk: {
      verb: "орієнтуватися",
      meaning: "орієнтуватися на",
      sentence: "Ми орієнтуємося на приклад."
    },
    tr: {
      verb: "örnek almak",
      meaning: "bir şeyi örnek almak",
      sentence: "Örneği esas alıyoruz."
    }
  },
  "sich-wenden-an-akk": {
    en: {
      verb: "to contact",
      meaning: "to contact/turn to",
      sentence: "Please contact reception."
    },
    ru: {
      verb: "обращаться",
      meaning: "обращаться к",
      sentence: "Обратитесь на стойку регистрации."
    },
    uk: {
      verb: "звертатися",
      meaning: "звертатися до",
      sentence: "Зверніться на рецепцію."
    },
    tr: {
      verb: "başvurmak",
      meaning: "birine/bir yere başvurmak",
      sentence: "Resepsiyona başvurun."
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
      verb: "to die",
      meaning: "to die of/from",
      sentence: "He died of an illness."
    },
    ru: {
      verb: "умирать",
      meaning: "умирать от",
      sentence: "Он умер от болезни."
    },
    uk: {
      verb: "помирати",
      meaning: "помирати від",
      sentence: "Він помер від хвороби."
    },
    tr: {
      verb: "ölmek",
      meaning: "bir şeyden ölmek",
      sentence: "Bir hastalıktan öldü."
    }
  },
  "liegen-an-dat": {
    en: {
      verb: "to be due",
      meaning: "to be due to",
      sentence: "It is due to your behavior."
    },
    ru: {
      verb: "быть связанным",
      meaning: "быть связанным с",
      sentence: "Это связано с твоим поведением."
    },
    uk: {
      verb: "бути пов'язаним",
      meaning: "бути пов'язаним з",
      sentence: "Це пов'язано з твоєю поведінкою."
    },
    tr: {
      verb: "kaynaklanmak",
      meaning: "bir şeyden kaynaklanmak",
      sentence: "Bu senin davranışından kaynaklanıyor."
    }
  },
  "schuld-sein-an-dat": {
    en: {
      verb: "to be responsible",
      meaning: "to be responsible for",
      sentence: "He is responsible for the accident."
    },
    ru: {
      verb: "быть виноватым",
      meaning: "быть виноватым в",
      sentence: "Он виноват в аварии."
    },
    uk: {
      verb: "бути винним",
      meaning: "бути винним у",
      sentence: "Він винен в аварії."
    },
    tr: {
      verb: "sorumlu olmak",
      meaning: "bir şeyden sorumlu olmak",
      sentence: "Kazadan o sorumlu."
    }
  },
  "zweifeln-an-dat": {
    en: {
      verb: "to doubt",
      meaning: "to doubt",
      sentence: "She doubts the solution."
    },
    ru: {
      verb: "сомневаться",
      meaning: "сомневаться в",
      sentence: "Она сомневается в решении."
    },
    uk: {
      verb: "сумніватися",
      meaning: "сумніватися в",
      sentence: "Вона сумнівається в рішенні."
    },
    tr: {
      verb: "şüphe etmek",
      meaning: "bir şeyden şüphe etmek",
      sentence: "Çözümden şüphe ediyor."
    }
  },
  "sich-entschuldigen-bei-dat": {
    en: {
      verb: "to apologize",
      meaning: "to apologize to",
      sentence: "I apologize to the neighbor."
    },
    ru: {
      verb: "извиняться",
      meaning: "извиняться перед",
      sentence: "Я извиняюсь перед соседом."
    },
    uk: {
      verb: "вибачатися",
      meaning: "вибачатися перед",
      sentence: "Я вибачаюся перед сусідом."
    },
    tr: {
      verb: "özür dilemek",
      meaning: "birinden özür dilemek",
      sentence: "Komşudan özür diliyorum."
    }
  },
  "helfen-bei-dat": {
    en: {
      verb: "to help",
      meaning: "to help with",
      sentence: "I help you with the task."
    },
    ru: {
      verb: "помогать",
      meaning: "помогать с",
      sentence: "Я помогаю тебе с задачей."
    },
    uk: {
      verb: "допомагати",
      meaning: "допомагати з",
      sentence: "Я допомагаю тобі із завданням."
    },
    tr: {
      verb: "yardım etmek",
      meaning: "bir şeye yardım etmek",
      sentence: "Görevde sana yardım ediyorum."
    }
  },
  "wohnen-bei-dat": {
    en: {
      verb: "to stay",
      meaning: "to stay/live at someone's place",
      sentence: "We are staying at my brother's place."
    },
    ru: {
      verb: "жить",
      meaning: "жить у",
      sentence: "Мы живём у моего брата."
    },
    uk: {
      verb: "жити",
      meaning: "жити у",
      sentence: "Ми живемо у мого брата."
    },
    tr: {
      verb: "kalmak",
      meaning: "birinin yanında kalmak",
      sentence: "Kardeşimin yanında kalıyoruz."
    }
  },
  "kaempfen-fuer-akk": {
    en: {
      verb: "to fight",
      meaning: "to fight for",
      sentence: "We fight for freedom."
    },
    ru: {
      verb: "бороться",
      meaning: "бороться за",
      sentence: "Мы боремся за свободу."
    },
    uk: {
      verb: "боротися",
      meaning: "боротися за",
      sentence: "Ми боремося за свободу."
    },
    tr: {
      verb: "mücadele etmek",
      meaning: "bir şey için mücadele etmek",
      sentence: "Özgürlük için mücadele ediyoruz."
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
      verb: "to apologize",
      meaning: "to apologize for",
      sentence: "I apologize for the mistake."
    },
    ru: {
      verb: "извиняться",
      meaning: "извиняться за",
      sentence: "Я извиняюсь за ошибку."
    },
    uk: {
      verb: "вибачатися",
      meaning: "вибачатися за",
      sentence: "Я вибачаюся за помилку."
    },
    tr: {
      verb: "özür dilemek",
      meaning: "bir şey için özür dilemek",
      sentence: "Hata için özür diliyorum."
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
      verb: "to provide",
      meaning: "to take care of/provide",
      sentence: "You take care of the transport."
    },
    ru: {
      verb: "заботиться",
      meaning: "заботиться о/обеспечивать",
      sentence: "Ты отвечаешь за транспорт."
    },
    uk: {
      verb: "дбати",
      meaning: "дбати про/забезпечувати",
      sentence: "Ти дбаєш про транспорт."
    },
    tr: {
      verb: "sağlamak",
      meaning: "bir şeyi sağlamak",
      sentence: "Ulaşımı sen sağlıyorsun."
    }
  },
  "investieren-in-akk": {
    en: {
      verb: "to invest",
      meaning: "to invest in",
      sentence: "We invest in further training."
    },
    ru: {
      verb: "инвестировать",
      meaning: "инвестировать в",
      sentence: "Мы инвестируем в повышение квалификации."
    },
    uk: {
      verb: "інвестувати",
      meaning: "інвестувати в",
      sentence: "Ми інвестуємо в підвищення кваліфікації."
    },
    tr: {
      verb: "yatırım yapmak",
      meaning: "bir şeye yatırım yapmak",
      sentence: "Mesleki gelişime yatırım yapıyoruz."
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
      verb: "to translate",
      meaning: "to translate into",
      sentence: "We translate the text into German."
    },
    ru: {
      verb: "переводить",
      meaning: "переводить на",
      sentence: "Мы переводим текст на немецкий язык."
    },
    uk: {
      verb: "перекладати",
      meaning: "перекладати на",
      sentence: "Ми перекладаємо текст німецькою мовою."
    },
    tr: {
      verb: "çevirmek",
      meaning: "bir şeye çevirmek",
      sentence: "Metni Almancaya çeviriyoruz."
    }
  },
  "anfangen-mit-dat": {
    en: {
      verb: "to start",
      meaning: "to start with",
      sentence: "We start with the first chapter."
    },
    ru: {
      verb: "начинать",
      meaning: "начинать с",
      sentence: "Мы начинаем с первой главы."
    },
    uk: {
      verb: "починати",
      meaning: "починати з",
      sentence: "Ми починаємо з першого розділу."
    },
    tr: {
      verb: "başlamak",
      meaning: "bir şeyle başlamak",
      sentence: "İlk bölümle başlıyoruz."
    }
  },
  "aufhoeren-mit-dat": {
    en: {
      verb: "to stop",
      meaning: "to stop doing",
      sentence: "He stops smoking."
    },
    ru: {
      verb: "бросать",
      meaning: "бросать что-либо",
      sentence: "Он бросает курить."
    },
    uk: {
      verb: "кидати",
      meaning: "кидати щось",
      sentence: "Він кидає курити."
    },
    tr: {
      verb: "bırakmak",
      meaning: "bir şeyi bırakmak",
      sentence: "Sigarayı bırakıyor."
    }
  },
  "beginnen-mit-dat": {
    en: {
      verb: "to begin",
      meaning: "to begin with",
      sentence: "The course begins with an exercise."
    },
    ru: {
      verb: "начинаться",
      meaning: "начинаться с",
      sentence: "Курс начинается с упражнения."
    },
    uk: {
      verb: "починатися",
      meaning: "починатися з",
      sentence: "Курс починається з вправи."
    },
    tr: {
      verb: "başlamak",
      meaning: "bir şeyle başlamak",
      sentence: "Kurs bir alıştırmayla başlıyor."
    }
  },
  "rechnen-mit-dat": {
    en: {
      verb: "to expect",
      meaning: "to expect/count on",
      sentence: "We expect a good result."
    },
    ru: {
      verb: "рассчитывать",
      meaning: "рассчитывать на",
      sentence: "Мы рассчитываем на хороший результат."
    },
    uk: {
      verb: "розраховувати",
      meaning: "розраховувати на",
      sentence: "Ми розраховуємо на хороший результат."
    },
    tr: {
      verb: "beklemek",
      meaning: "bir şeyi beklemek/hesaba katmak",
      sentence: "İyi bir sonuç bekliyoruz."
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
      verb: "to meet",
      meaning: "to meet with",
      sentence: "I am meeting a friend."
    },
    ru: {
      verb: "встречаться",
      meaning: "встречаться с",
      sentence: "Я встречаюсь с другом."
    },
    uk: {
      verb: "зустрічатися",
      meaning: "зустрічатися з",
      sentence: "Я зустрічаюся з другом."
    },
    tr: {
      verb: "buluşmak",
      meaning: "biriyle buluşmak",
      sentence: "Bir arkadaşımla buluşuyorum."
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
      verb: "to talk on the phone",
      meaning: "to talk on the phone with",
      sentence: "She is talking on the phone with her mother."
    },
    ru: {
      verb: "разговаривать по телефону",
      meaning: "разговаривать по телефону с",
      sentence: "Она разговаривает по телефону со своей мамой."
    },
    uk: {
      verb: "розмовляти телефоном",
      meaning: "розмовляти телефоном з",
      sentence: "Вона розмовляє телефоном зі своєю мамою."
    },
    tr: {
      verb: "telefonla konuşmak",
      meaning: "biriyle telefonla konuşmak",
      sentence: "Annesiyle telefonla konuşuyor."
    }
  },
  "sich-streiten-mit-dat": {
    en: {
      verb: "to argue",
      meaning: "to argue with",
      sentence: "I argue with my brother."
    },
    ru: {
      verb: "ссориться",
      meaning: "ссориться с",
      sentence: "Я ссорюсь со своим братом."
    },
    uk: {
      verb: "сваритися",
      meaning: "сваритися з",
      sentence: "Я сварюся зі своїм братом."
    },
    tr: {
      verb: "tartışmak",
      meaning: "biriyle tartışmak",
      sentence: "Kardeşimle tartışıyorum."
    }
  },
  "spielen-mit-dat": {
    en: {
      verb: "to play",
      meaning: "to play with",
      sentence: "Children play with the ball."
    },
    ru: {
      verb: "играть",
      meaning: "играть с",
      sentence: "Дети играют с мячом."
    },
    uk: {
      verb: "гратися",
      meaning: "гратися з",
      sentence: "Діти граються з м'ячем."
    },
    tr: {
      verb: "oynamak",
      meaning: "bir şeyle oynamak",
      sentence: "Çocuklar topla oynuyor."
    }
  },
  "diskutieren-mit-dat": {
    en: {
      verb: "to discuss",
      meaning: "to discuss with",
      sentence: "I discuss it with the boss."
    },
    ru: {
      verb: "обсуждать",
      meaning: "обсуждать с",
      sentence: "Я обсуждаю это с начальником."
    },
    uk: {
      verb: "обговорювати",
      meaning: "обговорювати з",
      sentence: "Я обговорюю це з керівником."
    },
    tr: {
      verb: "tartışmak",
      meaning: "biriyle tartışmak",
      sentence: "Patronla bunu tartışıyorum."
    }
  },
  "verhandeln-mit-dat": {
    en: {
      verb: "to negotiate",
      meaning: "to negotiate with",
      sentence: "The company negotiates with the partners."
    },
    ru: {
      verb: "вести переговоры",
      meaning: "вести переговоры с",
      sentence: "Фирма ведет переговоры с партнерами."
    },
    uk: {
      verb: "вести переговори",
      meaning: "вести переговори з",
      sentence: "Компанія веде переговори з партнерами."
    },
    tr: {
      verb: "müzakere etmek",
      meaning: "biriyle müzakere etmek",
      sentence: "Şirket ortaklarla müzakere ediyor."
    }
  },
  "sich-versoehnen-mit-dat": {
    en: {
      verb: "to reconcile",
      meaning: "to reconcile with",
      sentence: "I reconciled with my brother."
    },
    ru: {
      verb: "мириться",
      meaning: "мириться с",
      sentence: "Я помирился со своим братом."
    },
    uk: {
      verb: "миритися",
      meaning: "миритися з",
      sentence: "Я помирився зі своїм братом."
    },
    tr: {
      verb: "barışmak",
      meaning: "biriyle barışmak",
      sentence: "Kardeşimle barıştım."
    }
  },
  "fragen-nach-dat": {
    en: {
      verb: "to ask",
      meaning: "to ask for/about",
      sentence: "He asks for the way."
    },
    ru: {
      verb: "спрашивать",
      meaning: "спрашивать о",
      sentence: "Он спрашивает дорогу."
    },
    uk: {
      verb: "питати",
      meaning: "питати про",
      sentence: "Він питає дорогу."
    },
    tr: {
      verb: "sormak",
      meaning: "bir şeyi sormak",
      sentence: "Yolu soruyor."
    }
  },
  "riechen-nach-dat": {
    en: {
      verb: "to smell",
      meaning: "to smell like",
      sentence: "It smells like food."
    },
    ru: {
      verb: "пахнуть",
      meaning: "пахнуть чем-либо",
      sentence: "Пахнет едой."
    },
    uk: {
      verb: "пахнути",
      meaning: "пахнути чимось",
      sentence: "Пахне їжею."
    },
    tr: {
      verb: "kokmak",
      meaning: "bir şey gibi kokmak",
      sentence: "Yemek gibi kokuyor."
    }
  },
  "schmecken-nach-dat": {
    en: {
      verb: "to taste",
      meaning: "to taste like",
      sentence: "It tastes like fresh bread."
    },
    ru: {
      verb: "быть на вкус",
      meaning: "иметь вкус чего-либо",
      sentence: "Это на вкус как свежий хлеб."
    },
    uk: {
      verb: "смакувати",
      meaning: "мати смак чогось",
      sentence: "Це смакує як свіжий хліб."
    },
    tr: {
      verb: "tadı olmak",
      meaning: "bir şey gibi tadı olmak",
      sentence: "Tadı taze ekmek gibi."
    }
  },
  "sich-erkundigen-nach-dat": {
    en: {
      verb: "to inquire",
      meaning: "to inquire about",
      sentence: "He asks about the price."
    },
    ru: {
      verb: "узнавать",
      meaning: "узнавать о",
      sentence: "Он узнает о цене."
    },
    uk: {
      verb: "дізнаватися",
      meaning: "дізнаватися про",
      sentence: "Він дізнається про ціну."
    },
    tr: {
      verb: "bilgi almak",
      meaning: "bir şey hakkında bilgi almak",
      sentence: "Fiyat hakkında bilgi alıyor."
    }
  },
  "sich-sehnen-nach-dat": {
    en: {
      verb: "to long",
      meaning: "to long for",
      sentence: "I long for summer."
    },
    ru: {
      verb: "тосковать",
      meaning: "тосковать по",
      sentence: "Я тоскую по лету."
    },
    uk: {
      verb: "сумувати",
      meaning: "сумувати за",
      sentence: "Я сумую за літом."
    },
    tr: {
      verb: "özlemek",
      meaning: "bir şeyi özlemek",
      sentence: "Yazı özlüyorum."
    }
  },
  "suchen-nach-dat": {
    en: {
      verb: "to look",
      meaning: "to look for",
      sentence: "I am looking for the key."
    },
    ru: {
      verb: "искать",
      meaning: "искать что-либо",
      sentence: "Я ищу ключ."
    },
    uk: {
      verb: "шукати",
      meaning: "шукати щось",
      sentence: "Я шукаю ключ."
    },
    tr: {
      verb: "aramak",
      meaning: "bir şeyi aramak",
      sentence: "Anahtarı arıyorum."
    }
  },
  "streben-nach-dat": {
    en: {
      verb: "to strive",
      meaning: "to strive for",
      sentence: "We strive for a better life."
    },
    ru: {
      verb: "стремиться",
      meaning: "стремиться к",
      sentence: "Мы стремимся к лучшей жизни."
    },
    uk: {
      verb: "прагнути",
      meaning: "прагнути до",
      sentence: "Ми прагнемо кращого життя."
    },
    tr: {
      verb: "çabalamak",
      meaning: "bir şey için çabalamak",
      sentence: "Daha iyi bir yaşam için çabalıyoruz."
    }
  },
  "benennen-nach-dat": {
    en: {
      verb: "to name",
      meaning: "to name after",
      sentence: "The street was named after a politician."
    },
    ru: {
      verb: "называть",
      meaning: "называть в честь",
      sentence: "Улицу назвали в честь политика."
    },
    uk: {
      verb: "називати",
      meaning: "називати на честь",
      sentence: "Вулицю назвали на честь політика."
    },
    tr: {
      verb: "adlandırmak",
      meaning: "birinin adını vermek",
      sentence: "Sokağa bir siyasetçinin adı verildi."
    }
  },
  "beitragen-zu-dat": {
    en: {
      verb: "to contribute",
      meaning: "to contribute to",
      sentence: "That contributes to a solution."
    },
    ru: {
      verb: "способствовать",
      meaning: "способствовать чему-либо",
      sentence: "Это способствует решению."
    },
    uk: {
      verb: "сприяти",
      meaning: "сприяти чомусь",
      sentence: "Це сприяє вирішенню."
    },
    tr: {
      verb: "katkıda bulunmak",
      meaning: "bir şeye katkıda bulunmak",
      sentence: "Bu çözüme katkıda bulunur."
    }
  },
  "einladen-zu-dat": {
    en: {
      verb: "to invite",
      meaning: "to invite to",
      sentence: "I invite you to my party."
    },
    ru: {
      verb: "приглашать",
      meaning: "приглашать на",
      sentence: "Я приглашаю тебя на свою вечеринку."
    },
    uk: {
      verb: "запрошувати",
      meaning: "запрошувати на",
      sentence: "Я запрошую тебе на свою вечірку."
    },
    tr: {
      verb: "davet etmek",
      meaning: "bir yere davet etmek",
      sentence: "Seni partime davet ediyorum."
    }
  },
  "fuehren-zu-dat": {
    en: {
      verb: "to lead",
      meaning: "to lead to",
      sentence: "That leads to a problem."
    },
    ru: {
      verb: "приводить",
      meaning: "приводить к",
      sentence: "Это приводит к проблеме."
    },
    uk: {
      verb: "призводити",
      meaning: "призводити до",
      sentence: "Це призводить до проблеми."
    },
    tr: {
      verb: "yol açmak",
      meaning: "bir şeye yol açmak",
      sentence: "Bu bir soruna yol açar."
    }
  },
  "gehoeren-zu-dat": {
    en: {
      verb: "to belong",
      meaning: "to belong to",
      sentence: "These keys belong to this apartment."
    },
    ru: {
      verb: "принадлежать",
      meaning: "принадлежать чему-либо",
      sentence: "Эти ключи принадлежат этой квартире."
    },
    uk: {
      verb: "належати",
      meaning: "належати до",
      sentence: "Ці ключі належать до цієї квартири."
    },
    tr: {
      verb: "ait olmak",
      meaning: "bir şeye ait olmak",
      sentence: "Bu anahtarlar bu daireye ait."
    }
  },
  "gratulieren-zu-dat": {
    en: {
      verb: "to congratulate",
      meaning: "to congratulate on",
      sentence: "We congratulate you on your success."
    },
    ru: {
      verb: "поздравлять",
      meaning: "поздравлять с",
      sentence: "Мы поздравляем тебя с успехом."
    },
    uk: {
      verb: "вітати",
      meaning: "вітати з",
      sentence: "Ми вітаємо тебе з успіхом."
    },
    tr: {
      verb: "tebrik etmek",
      meaning: "bir şey için tebrik etmek",
      sentence: "Başarın için seni tebrik ediyoruz."
    }
  },
  "passen-zu-dat": {
    en: {
      verb: "to fit",
      meaning: "to fit/go with",
      sentence: "That fits your plan."
    },
    ru: {
      verb: "подходить",
      meaning: "подходить к",
      sentence: "Это подходит к твоему плану."
    },
    uk: {
      verb: "пасувати",
      meaning: "пасувати до",
      sentence: "Це пасує до твого плану."
    },
    tr: {
      verb: "uymak",
      meaning: "bir şeye uymak",
      sentence: "Bu senin planına uyuyor."
    }
  },
  "sich-entschliessen-zu-dat": {
    en: {
      verb: "to decide",
      meaning: "to decide on",
      sentence: "I decide to study."
    },
    ru: {
      verb: "решаться",
      meaning: "решаться на",
      sentence: "Я решаюсь на учёбу в вузе."
    },
    uk: {
      verb: "зважуватися",
      meaning: "зважуватися на",
      sentence: "Я зважуюся на навчання в університеті."
    },
    tr: {
      verb: "karar vermek",
      meaning: "bir şeye karar vermek",
      sentence: "Üniversite eğitimine karar veriyorum."
    }
  },
  "sich-bekennen-zu-dat": {
    en: {
      verb: "to admit",
      meaning: "to admit/declare allegiance to",
      sentence: "He admits his guilt."
    },
    ru: {
      verb: "признаваться",
      meaning: "признаваться в",
      sentence: "Он признает свою вину."
    },
    uk: {
      verb: "зізнаватися",
      meaning: "зізнаватися в",
      sentence: "Він визнає свою провину."
    },
    tr: {
      verb: "kabul etmek",
      meaning: "bir şeyi kabul etmek",
      sentence: "Suçunu kabul ediyor."
    }
  },
  "neigen-zu-dat": {
    en: {
      verb: "to tend",
      meaning: "to tend toward",
      sentence: "She tends to have strong reactions."
    },
    ru: {
      verb: "быть склонным",
      meaning: "быть склонным к",
      sentence: "Она склонна к сильным реакциям."
    },
    uk: {
      verb: "бути схильним",
      meaning: "бути схильним до",
      sentence: "Вона схильна до сильних реакцій."
    },
    tr: {
      verb: "eğilimli olmak",
      meaning: "bir şeye eğilimli olmak",
      sentence: "Güçlü tepkilere eğilimli."
    }
  },
  "bitten-um-akk": {
    en: {
      verb: "to ask",
      meaning: "to ask for",
      sentence: "I ask you for an appointment."
    },
    ru: {
      verb: "просить",
      meaning: "просить о",
      sentence: "Я прошу тебя о встрече."
    },
    uk: {
      verb: "просити",
      meaning: "просити про",
      sentence: "Я прошу тебе про зустріч."
    },
    tr: {
      verb: "istemek",
      meaning: "bir şey istemek",
      sentence: "Senden randevu istiyorum."
    }
  },
  "sich-bewerben-um-akk": {
    en: {
      verb: "to apply",
      meaning: "to apply for",
      sentence: "He applies for the job."
    },
    ru: {
      verb: "подавать заявку",
      meaning: "подавать заявку на",
      sentence: "Он подает заявку на вакансию."
    },
    uk: {
      verb: "подаватися",
      meaning: "подаватися на",
      sentence: "Він подається на посаду."
    },
    tr: {
      verb: "başvurmak",
      meaning: "bir şeye başvurmak",
      sentence: "İşe başvuruyor."
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
      verb: "to worry",
      meaning: "to worry about",
      sentence: "I worry about the patient."
    },
    ru: {
      verb: "беспокоиться",
      meaning: "беспокоиться о",
      sentence: "Я беспокоюсь о пациенте."
    },
    uk: {
      verb: "хвилюватися",
      meaning: "хвилюватися за",
      sentence: "Я хвилююся за пацієнта."
    },
    tr: {
      verb: "endişelenmek",
      meaning: "biri/bir şey için endişelenmek",
      sentence: "Hasta için endişeleniyorum."
    }
  },
  "sich-streiten-um-akk": {
    en: {
      verb: "to argue",
      meaning: "to argue over",
      sentence: "They argue over the parking space."
    },
    ru: {
      verb: "спорить",
      meaning: "спорить из-за",
      sentence: "Они спорят из-за парковочного места."
    },
    uk: {
      verb: "сперечатися",
      meaning: "сперечатися за",
      sentence: "Вони сперечаються за паркувальне місце."
    },
    tr: {
      verb: "tartışmak",
      meaning: "bir şey için tartışmak",
      sentence: "Park yeri için tartışıyorlar."
    }
  },
  "sich-bemuehen-um-akk": {
    en: {
      verb: "to make an effort",
      meaning: "to make an effort for",
      sentence: "I am trying to get a place."
    },
    ru: {
      verb: "стараться",
      meaning: "стараться получить",
      sentence: "Я стараюсь получить место."
    },
    uk: {
      verb: "докладати зусиль",
      meaning: "докладати зусиль для",
      sentence: "Я докладаю зусиль, щоб отримати місце."
    },
    tr: {
      verb: "çaba göstermek",
      meaning: "bir şey için çaba göstermek",
      sentence: "Bir yer için çaba gösteriyorum."
    }
  },
  "werben-um-akk": {
    en: {
      verb: "to seek",
      meaning: "to court/seek",
      sentence: "The company seeks the contract."
    },
    ru: {
      verb: "добиваться",
      meaning: "добиваться чего-либо",
      sentence: "Фирма добивается заказа."
    },
    uk: {
      verb: "домагатися",
      meaning: "домагатися чогось",
      sentence: "Компанія домагається замовлення."
    },
    tr: {
      verb: "uğraşmak",
      meaning: "bir şeyi kazanmak için uğraşmak",
      sentence: "Şirket siparişi almak için uğraşıyor."
    }
  },
  "es-geht-um-akk": {
    en: {
      verb: "to be about",
      meaning: "to be about",
      sentence: "It is about the contract."
    },
    ru: {
      verb: "речь идёт",
      meaning: "речь идёт о",
      sentence: "Речь идёт о договоре."
    },
    uk: {
      verb: "йдеться",
      meaning: "йдеться про",
      sentence: "Йдеться про договір."
    },
    tr: {
      verb: "söz konusu olmak",
      meaning: "konu olmak",
      sentence: "Konu sözleşme."
    }
  },
  "berichten-ueber-akk": {
    en: {
      verb: "to report",
      meaning: "to report on",
      sentence: "The newspaper reports on the accident."
    },
    ru: {
      verb: "сообщать",
      meaning: "сообщать о",
      sentence: "Газета сообщает об аварии."
    },
    uk: {
      verb: "повідомляти",
      meaning: "повідомляти про",
      sentence: "Газета повідомляє про аварію."
    },
    tr: {
      verb: "haber yapmak",
      meaning: "bir şey hakkında haber yapmak",
      sentence: "Gazete kazayı haber yapıyor."
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
      meaning: "to discuss",
      sentence: "We discuss the plan."
    },
    ru: {
      verb: "обсуждать",
      meaning: "обсуждать",
      sentence: "Мы обсуждаем план."
    },
    uk: {
      verb: "обговорювати",
      meaning: "обговорювати",
      sentence: "Ми обговорюємо план."
    },
    tr: {
      verb: "tartışmak",
      meaning: "bir şeyi tartışmak",
      sentence: "Planı tartışıyoruz."
    }
  },
  "lachen-ueber-akk": {
    en: {
      verb: "to laugh",
      meaning: "to laugh about",
      sentence: "She laughs about the joke."
    },
    ru: {
      verb: "смеяться",
      meaning: "смеяться над",
      sentence: "Она смеётся над шуткой."
    },
    uk: {
      verb: "сміятися",
      meaning: "сміятися з",
      sentence: "Вона сміється з жарту."
    },
    tr: {
      verb: "gülmek",
      meaning: "bir şeye gülmek",
      sentence: "Şakaya gülüyor."
    }
  },
  "nachdenken-ueber-akk": {
    en: {
      verb: "to think",
      meaning: "to think about",
      sentence: "I am thinking about the offer."
    },
    ru: {
      verb: "размышлять",
      meaning: "размышлять о",
      sentence: "Я размышляю о предложении."
    },
    uk: {
      verb: "думати",
      meaning: "думати над",
      sentence: "Я думаю над пропозицією."
    },
    tr: {
      verb: "düşünmek",
      meaning: "bir şey hakkında düşünmek",
      sentence: "Teklif hakkında düşünüyorum."
    }
  },
  "sich-aergern-ueber-akk": {
    en: {
      verb: "to be annoyed",
      meaning: "to be annoyed about",
      sentence: "He is annoyed about the mistake."
    },
    ru: {
      verb: "сердиться",
      meaning: "сердиться из-за",
      sentence: "Он сердится из-за ошибки."
    },
    uk: {
      verb: "сердитися",
      meaning: "сердитися через",
      sentence: "Він сердиться через помилку."
    },
    tr: {
      verb: "kızmak",
      meaning: "bir şeye kızmak",
      sentence: "Hataya kızıyor."
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
      verb: "to inform oneself",
      meaning: "to inform oneself about",
      sentence: "I inform myself about the topic."
    },
    ru: {
      verb: "узнавать",
      meaning: "узнавать о",
      sentence: "Я узнаю информацию о теме."
    },
    uk: {
      verb: "дізнаватися",
      meaning: "дізнаватися про",
      sentence: "Я дізнаюся про тему."
    },
    tr: {
      verb: "bilgi almak",
      meaning: "bir şey hakkında bilgi almak",
      sentence: "Konu hakkında bilgi alıyorum."
    }
  },
  "sich-wundern-ueber-akk": {
    en: {
      verb: "to be surprised",
      meaning: "to be surprised about",
      sentence: "I am surprised about his reaction."
    },
    ru: {
      verb: "удивляться",
      meaning: "удивляться чему-либо",
      sentence: "Я удивляюсь его реакции."
    },
    uk: {
      verb: "дивуватися",
      meaning: "дивуватися чомусь",
      sentence: "Я дивуюся його реакції."
    },
    tr: {
      verb: "şaşırmak",
      meaning: "bir şeye şaşırmak",
      sentence: "Onun tepkisine şaşırıyorum."
    }
  },
  "bestehen-aus-dat": {
    en: {
      verb: "to consist",
      meaning: "to consist of",
      sentence: "The package consists of a book and a notebook."
    },
    ru: {
      verb: "состоять",
      meaning: "состоять из",
      sentence: "Пакет состоит из книги и тетради."
    },
    uk: {
      verb: "складатися",
      meaning: "складатися з",
      sentence: "Пакунок складається з книги та зошита."
    },
    tr: {
      verb: "oluşmak",
      meaning: "bir şeyden oluşmak",
      sentence: "Paket bir kitap ve bir defterden oluşuyor."
    }
  },
  "kommen-aus-dat": {
    en: {
      verb: "to come",
      meaning: "to come from",
      sentence: "He comes from Switzerland."
    },
    ru: {
      verb: "быть родом",
      meaning: "быть из",
      sentence: "Он из Швейцарии."
    },
    uk: {
      verb: "походити",
      meaning: "походити з",
      sentence: "Він зі Швейцарії."
    },
    tr: {
      verb: "gelmek",
      meaning: "bir yerden gelmek",
      sentence: "İsviçre'den geliyor."
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
      verb: "to tell",
      meaning: "to tell about",
      sentence: "She tells about her trip."
    },
    ru: {
      verb: "рассказывать",
      meaning: "рассказывать о",
      sentence: "Она рассказывает о своей поездке."
    },
    uk: {
      verb: "розповідати",
      meaning: "розповідати про",
      sentence: "Вона розповідає про свою подорож."
    },
    tr: {
      verb: "bahsetmek",
      meaning: "bir şeyden bahsetmek",
      sentence: "Seyahatinden bahsediyor."
    }
  },
  "wissen-von-dat": {
    en: {
      verb: "to know",
      meaning: "to know about",
      sentence: "Do you know about the appointment?"
    },
    ru: {
      verb: "знать",
      meaning: "знать о",
      sentence: "Ты знаешь о встрече?"
    },
    uk: {
      verb: "знати",
      meaning: "знати про",
      sentence: "Ти знаєш про зустріч?"
    },
    tr: {
      verb: "haberi olmak",
      meaning: "bir şeyden haberi olmak",
      sentence: "Randevudan haberin var mı?"
    }
  },
  "hoeren-von-dat": {
    en: {
      verb: "to hear",
      meaning: "to hear about/from",
      sentence: "I heard about the change."
    },
    ru: {
      verb: "слышать",
      meaning: "слышать о",
      sentence: "Я слышал об изменении."
    },
    uk: {
      verb: "чути",
      meaning: "чути про",
      sentence: "Я чув про зміну."
    },
    tr: {
      verb: "duymak",
      meaning: "bir şeyden haberdar olmak",
      sentence: "Değişikliği duydum."
    }
  },
  "reden-von-dat": {
    en: {
      verb: "to talk",
      meaning: "to talk about",
      sentence: "We are talking about the problem."
    },
    ru: {
      verb: "говорить",
      meaning: "говорить о",
      sentence: "Мы говорим о проблеме."
    },
    uk: {
      verb: "говорити",
      meaning: "говорити про",
      sentence: "Ми говоримо про проблему."
    },
    tr: {
      verb: "söz etmek",
      meaning: "bir şeyden söz etmek",
      sentence: "Sorundan söz ediyoruz."
    }
  },
  "leben-von-dat": {
    en: {
      verb: "to live",
      meaning: "to live on",
      sentence: "He lives on his salary."
    },
    ru: {
      verb: "жить",
      meaning: "жить на",
      sentence: "Он живёт на свою зарплату."
    },
    uk: {
      verb: "жити",
      meaning: "жити на",
      sentence: "Він живе на свою зарплату."
    },
    tr: {
      verb: "geçinmek",
      meaning: "bir şeyle geçinmek",
      sentence: "Maaşıyla geçiniyor."
    }
  },
  "handeln-von-dat": {
    en: {
      verb: "to be about",
      meaning: "to be about",
      sentence: "The film is about a family."
    },
    ru: {
      verb: "рассказывать",
      meaning: "рассказывать о",
      sentence: "Фильм рассказывает о семье."
    },
    uk: {
      verb: "розповідати",
      meaning: "розповідати про",
      sentence: "Фільм розповідає про сім'ю."
    },
    tr: {
      verb: "konu almak",
      meaning: "bir şeyi konu almak",
      sentence: "Film bir aileyi konu alıyor."
    }
  },
  "profitieren-von-dat": {
    en: {
      verb: "to benefit",
      meaning: "to benefit from",
      sentence: "We benefit from the experience."
    },
    ru: {
      verb: "получать пользу",
      meaning: "получать пользу от",
      sentence: "Мы получаем пользу от опыта."
    },
    uk: {
      verb: "отримувати користь",
      meaning: "отримувати користь від",
      sentence: "Ми отримуємо користь від досвіду."
    },
    tr: {
      verb: "faydalanmak",
      meaning: "bir şeyden faydalanmak",
      sentence: "Deneyimden faydalanıyoruz."
    }
  },
  "sich-trennen-von-dat": {
    en: {
      verb: "to separate",
      meaning: "to separate from",
      sentence: "She parts with her car."
    },
    ru: {
      verb: "расставаться",
      meaning: "расставаться с",
      sentence: "Она расстаётся со своей машиной."
    },
    uk: {
      verb: "розставатися",
      meaning: "розставатися з",
      sentence: "Вона розстається зі своїм автомобілем."
    },
    tr: {
      verb: "ayrılmak",
      meaning: "bir şeyden ayrılmak",
      sentence: "Arabasından ayrılıyor."
    }
  },
  "sich-verabschieden-von-dat": {
    en: {
      verb: "to say goodbye",
      meaning: "to say goodbye to",
      sentence: "We say goodbye to our guests."
    },
    ru: {
      verb: "прощаться",
      meaning: "прощаться с",
      sentence: "Мы прощаемся с гостями."
    },
    uk: {
      verb: "прощатися",
      meaning: "прощатися з",
      sentence: "Ми прощаємося з гостями."
    },
    tr: {
      verb: "vedalaşmak",
      meaning: "biriyle vedalaşmak",
      sentence: "Misafirlerimizle vedalaşıyoruz."
    }
  },
  "sich-erholen-von-dat": {
    en: {
      verb: "to recover",
      meaning: "to recover from",
      sentence: "I am recovering from the illness."
    },
    ru: {
      verb: "восстанавливаться",
      meaning: "восстанавливаться после",
      sentence: "Я восстанавливаюсь после болезни."
    },
    uk: {
      verb: "відновлюватися",
      meaning: "відновлюватися після",
      sentence: "Я одужую після хвороби."
    },
    tr: {
      verb: "toparlanmak",
      meaning: "bir şeyden sonra toparlanmak",
      sentence: "Hastalıktan sonra toparlanıyorum."
    }
  },
  "schuetzen-vor-dat": {
    en: {
      verb: "to protect",
      meaning: "to protect from",
      sentence: "The glasses protect from the sun."
    },
    ru: {
      verb: "защищать",
      meaning: "защищать от",
      sentence: "Очки защищают от солнца."
    },
    uk: {
      verb: "захищати",
      meaning: "захищати від",
      sentence: "Окуляри захищають від сонця."
    },
    tr: {
      verb: "korumak",
      meaning: "bir şeyden korumak",
      sentence: "Gözlük güneşten korur."
    }
  },
  "sich-fuerchten-vor-dat": {
    en: {
      verb: "to be afraid",
      meaning: "to be afraid of",
      sentence: "She is afraid of the exam."
    },
    ru: {
      verb: "бояться",
      meaning: "бояться",
      sentence: "Она боится экзамена."
    },
    uk: {
      verb: "боятися",
      meaning: "боятися",
      sentence: "Вона боїться іспиту."
    },
    tr: {
      verb: "korkmak",
      meaning: "bir şeyden korkmak",
      sentence: "Sınavdan korkuyor."
    }
  },
  "warnen-vor-dat": {
    en: {
      verb: "to warn",
      meaning: "to warn about",
      sentence: "I warn you about the dog."
    },
    ru: {
      verb: "предупреждать",
      meaning: "предупреждать о",
      sentence: "Я предупреждаю тебя о собаке."
    },
    uk: {
      verb: "попереджати",
      meaning: "попереджати про",
      sentence: "Я попереджаю тебе про собаку."
    },
    tr: {
      verb: "uyarmak",
      meaning: "bir şey hakkında uyarmak",
      sentence: "Seni köpek konusunda uyarıyorum."
    }
  }
};
