// B1 Sprint — Doppelkonnektoren, da-Wörter, Muster-Texte und Prüfungsstrategie
// für Sprechen & Schreiben. Ergänzt die CONTENT-Pools (neues Deck + zwei neue
// Grammatik-Übungen) und exportiert die Daten für Sprechhilfe/Schreibhilfe.
import { CONTENT } from "./content.js";

// ---------------------------------------------------------------- Doppelkonnektoren
// Die zweiteiligen Konnektoren vom Lernblatt (B1.2) + je … desto.
// Jeder Eintrag ist als lernbarer "Chunk" gedacht: Muster + Beispielsatz,
// direkt einsetzbar in Mündlich Teil 2 (Meinung) und Teil 3 (Planen).
export const DOPPEL = [
  { k: "nicht nur … sondern auch", en: "not only … but also",
    ex: "Berlin ist <mark>nicht nur</mark> groß, <mark>sondern auch</mark> sehr grün.",
    use: "Zwei Vorteile aufzählen — stark in Teil 2, wenn du deine Meinung begründest." },
  { k: "einerseits … andererseits", en: "on the one hand … on the other",
    ex: "<mark>Einerseits</mark> ist die Stadt teuer, <mark>andererseits</mark> gibt es dort mehr Arbeit.",
    use: "Beide Seiten zeigen, bevor du deine Meinung sagst — wirkt sehr B1+!" },
  { k: "sowohl … als auch", en: "both … and",
    ex: "Der Ausflug ist <mark>sowohl</mark> für Kinder <mark>als auch</mark> für Erwachsene interessant.",
    use: "Zwei Dinge positiv verbinden — auch super in der E-Mail." },
  { k: "entweder … oder", en: "either … or",
    ex: "Wir treffen uns <mark>entweder</mark> am Samstag <mark>oder</mark> am Sonntag.",
    use: "Perfekt für Teil 3 (gemeinsam planen): zwei Vorschläge anbieten." },
  { k: "weder … noch", en: "neither … nor",
    ex: "Ich habe <mark>weder</mark> Zeit <mark>noch</mark> Geld für lange Reisen.",
    use: "Doppelte Verneinung — Achtung: OHNE zusätzliches „nicht“." },
  { k: "zwar … aber", en: "admittedly … but",
    ex: "Das Smartphone ist <mark>zwar</mark> praktisch, <mark>aber</mark> es lenkt auch ab.",
    use: "DER Meinungs-Konnektor: Gegenargument zugeben, dann dein Argument bringen." },
  { k: "je … desto", en: "the … the",
    ex: "<mark>Je</mark> mehr man übt, <mark>desto</mark> sicherer spricht man.",
    use: "je + Nebensatz (Verb am Ende), desto + Komparativ. Ein Satz davon im Gespräch = Pluspunkte." }
];

// ---------------------------------------------------------------- da-Wörter
// Präpositionaladverbien (da(r)+Präposition) + damals/danach/dabei. Der Clou:
// sie ersetzen „Präposition + Sache“ — genau bei deinen reflexiven Verben!
export const DA_WOERTER = [
  { k: "dafür / dagegen", en: "for it / against it",
    ex: "Handys in der Schule? Ich bin <mark>dafür</mark>, weil … / Ich bin <mark>dagegen</mark>, denn …",
    use: "Deine Position in Teil 2 in 3 Wörtern klarmachen." },
  { k: "darauf", en: "for/to it",
    ex: "Ich freue mich schon <mark>darauf</mark>.",
    use: "sich freuen auf → darauf. Statt die Sache zu wiederholen." },
  { k: "darüber", en: "about it",
    ex: "Wir haben lange <mark>darüber</mark> gesprochen und uns <mark>darüber</mark> gefreut.",
    use: "sprechen über / sich freuen über / sich ärgern über → darüber." },
  { k: "davon", en: "of/about it",
    ex: "Ich habe noch nie <mark>davon</mark> gehört.",
    use: "hören von / träumen von → davon." },
  { k: "damit", en: "with it",
    ex: "Ich fahre mit dem Rad zur Arbeit. <mark>Damit</mark> spare ich Geld und bleibe fit.",
    use: "Als da-Wort = „mit dieser Sache“. (Als Konnektor mit Nebensatz = Absicht: „…, damit ich Geld spare.“)" },
  { k: "dabei", en: "while doing so",
    ex: "Ich koche gern und höre <mark>dabei</mark> Musik.",
    use: "Zwei Handlungen gleichzeitig — macht Erzählungen lebendig." },
  { k: "danach", en: "afterwards",
    ex: "Zuerst besichtigen wir die Stadt, <mark>danach</mark> gehen wir essen.",
    use: "Teil 3 planen: zuerst → danach → zum Schluss." },
  { k: "damals", en: "back then",
    ex: "<mark>Damals</mark> hatte ich kein Smartphone — heute geht nichts mehr ohne.",
    use: "Früher/heute vergleichen — Prüfer lieben diesen Kontrast in Teil 2." }
];

// Verbindung zu den reflexiven Verben (dein PDF): Verb + feste Präposition
// → da-Wort, wenn die Sache schon bekannt ist.
export const DA_REFLEXIV_NOTE = "Merk-Trick mit deinen reflexiven Verben: sich freuen auf → darauf · sich ärgern über → darüber · sich interessieren für → dafür · sich beschäftigen mit → damit. Erst das Verb mit Präposition lernen, dann automatisch das da-Wort können!";

// ---------------------------------------------------------------- Lern-Empfehlung
export const LERN_METHODE = [
  "Chunks statt Regeln: Lern den ganzen Beispielsatz auswendig, nicht nur das Wort.",
  "Jeden Satz 5× LAUT sprechen (flüstern gilt nicht) — dein Mund muss das Muster kennen.",
  "Dann 2 eigene Sätze zum Tagesthema bauen und laut sagen (z. B. über deine Arbeit, deine Stadt).",
  "Den Satz des Tages sofort in der heutigen Sprechen-Übung benutzen — und abends 1× in die E-Mail einbauen.",
  "Vor dem Schlafen 1× wiederholen. Ein Chunk pro Tag reicht — in 13 Tagen sitzen alle."
];

// Rotation "Satz des Tages" — pro Tag ein Chunk (Doppelkonnektor oder da-Wort).
export const SATZ_ROTATION = [
  ...DOPPEL.map(d => ({ typ: "Doppelkonnektor", ...d })),
  ...DA_WOERTER.map(d => ({ typ: "da-Wort", ...d }))
];

// ---------------------------------------------------------------- Sprechen-Strategie
export const SPRECH_STRATEGIE = [
  { teil: "Teil 1 · Kennenlernen (~3 Min)",
    tipps: ["Bereite eine 60-Sekunden-Vorstellung vor und kann sie im Schlaf: Name, Herkunft, Wohnort, Familie, Arbeit, Hobbys, warum Deutsch.", "Baue 1 Doppelkonnektor ein: „Ich lerne Deutsch nicht nur für die Arbeit, sondern auch, weil …“", "Stell am Ende eine Rückfrage — Interaktion gibt Punkte."] },
  { teil: "Teil 2 · Über ein Thema sprechen (~6 Min)",
    tipps: ["Fester Fahrplan: 1) „In meinem Text geht es um …“ 2) „Die Person meint, dass …“ 3) Deine Meinung: „Zwar …, aber …“ / „Ich bin dafür, weil …“ 4) Eigene Erfahrung: „Damals …, heute …“ 5) Partnerfrage: „Was denkst du darüber?“", "Nicht perfekt — FLÜSSIG. Kurze Sätze mit Konnektoren schlagen lange kaputte Sätze.", "Immer auf den Partner reagieren: „Da stimme ich dir zu, aber …“"] },
  { teil: "Teil 3 · Gemeinsam etwas planen (~6 Min)",
    tipps: ["Struktur: Vorschlag → Reaktion → Kompromiss → Zusammenfassung.", "Vorschläge immer doppelt: „Wir könnten entweder … oder …“ — dann hat der Partner etwas zu tun.", "Plane laut mit Zeitwörtern: „Zuerst …, danach …, zum Schluss …“", "Am Ende einigen: „Einerseits hast du recht, andererseits … Einigen wir uns auf …?“"] }
];
export const SPRECH_BEWERTUNG = "Bewertet werden Ausdrucksfähigkeit, Aufgabenbewältigung (Interaktion!), Flüssigkeit und formale Richtigkeit — kleine Grammatikfehler kosten weniger als Schweigen. Sprich, reagiere, frag nach.";

// ---------------------------------------------------------------- Schreiben-Strategie
export const SCHREIB_STRATEGIE = {
  zeit: [
    { t: "5 Min", was: "Planen: Alle 4 Leitpunkte lesen, zu jedem 3–4 Stichwörter notieren, Reihenfolge festlegen." },
    { t: "20 Min", was: "Schreiben: Betreff → Anrede → Einleitung → 4 Punkte (je 1–2 Sätze, mit Konnektoren verbinden) → Schluss → Gruß." },
    { t: "5 Min", was: "Prüfen: Verb an Position 2? Verb am Ende nach weil/dass/wenn? Nomen groß? Alle 4 Punkte drin?" }
  ],
  kriterien: [
    { k: "Aufgabenbewältigung", d: "Alle 4 Leitpunkte inhaltlich behandelt — ein fehlender Punkt kostet massiv. Deshalb: abhaken!" },
    { k: "Kommunikative Gestaltung", d: "Aufbau + Verbindungswörter: Anrede/Gruß passend (du/Sie!), Sätze mit deshalb, trotzdem, zwar … aber verbunden." },
    { k: "Formale Richtigkeit", d: "Grammatik & Rechtschreibung. Häufigste B1-Fehler: Verbposition, Groß­schreibung, Perfekt mit sein/haben." }
  ],
  checkliste: ["Betreff geschrieben?", "Anrede passend (Liebe/r … , / Sehr geehrte/r …)? Danach klein weiter!", "Alle 4 Leitpunkte? (Im Kopf abhaken: 1-2-3-4)", "Mindestens 2 Konnektoren benutzt (weil, deshalb, zwar … aber)?", "Schlusssatz + Grußformel + Name?"]
};

// Muster-E-Mail (informell, zur echten Aufgabe „Sandra lädt zur Party ein“) —
// zeigt alle 4 Leitpunkte + die Konnektoren im Einsatz. Statisch & vertrauenswürdig,
// wird bewusst als HTML gerendert (mark/​em-Hervorhebungen).
export const MUSTER_EMAIL = {
  aufgabe: "Sandra lädt dich zu ihrer Geburtstagsparty ein. Du kannst nicht kommen. (4 Punkte: danken · Grund · neuer Vorschlag · gratulieren)",
  betreff: "Deine Geburtstagsparty",
  html: `<p><strong>Betreff:</strong> Deine Geburtstagsparty</p>
<p>Liebe Sandra,</p>
<p>vielen Dank für deine Einladung — ich habe mich sehr <mark>darüber</mark> gefreut! <span class="lp-badge">Punkt 1 ✓</span></p>
<p>Leider kann ich am Samstag nicht kommen, <mark>weil</mark> ich arbeiten muss. <span class="lp-badge">Punkt 2 ✓</span> Das ist <mark>zwar</mark> sehr schade, <mark>aber</mark> ich habe eine Idee: Wie wäre es, wenn wir uns nächste Woche treffen? Wir könnten <mark>entweder</mark> am Mittwoch <mark>oder</mark> am Freitag zusammen essen gehen. <span class="lp-badge">Punkt 3 ✓</span></p>
<p>Ich wünsche dir <mark>nicht nur</mark> eine tolle Party, <mark>sondern auch</mark> alles Gute zum Geburtstag! <span class="lp-badge">Punkt 4 ✓</span></p>
<p>Liebe Grüße<br>Rishabh</p>`,
  hinweis: "~90 Wörter, alle 4 Punkte, 5 Konnektoren, 1 da-Wort. Genau dieses Gerüst (Dank → Grund → Vorschlag → Wunsch) passt auf fast jede informelle telc-E-Mail — nur die Inhalte austauschen."
};

// ---------------------------------------------------------------- CONTENT-Erweiterungen
// Neues Wortschatz-Deck: die Chunks als Karten (Vorderseite Konnektor, Rückseite
// Bedeutung + Beispielsatz zum Nachsprechen).
CONTENT.decks.push({
  id: "doppel", de: "Doppelkonnektoren & da-Wörter", en: "Two-part connectors (dein Lernblatt)",
  source: "Eigenes Lernblatt · Doppelkonnektoren B1.2",
  cards: [
    ...DOPPEL.map(d => ({ de: d.k, en: d.en, ex: d.ex.replace(/<\/?mark>/g, "") })),
    ...DA_WOERTER.map(d => ({ de: d.k, en: d.en, ex: d.ex.replace(/<\/?mark>/g, "") }))
  ]
});

// Zwei neue, automatisch korrigierte Grammatik-Übungen.
CONTENT.grammatik.push({
  topic: "Doppelkonnektoren", en: "Two-part connectors",
  rule: "Immer als Paar lernen: nicht nur … sondern auch · einerseits … andererseits · sowohl … als auch · entweder … oder · weder … noch (ohne „nicht“!) · zwar … aber · je … desto (+ Komparativ).",
  items: [
    { q: "Sie spricht ___ Deutsch als auch Englisch.", options: ["sowohl", "weder", "entweder"], answer: "sowohl", hint: "sowohl … als auch = beides" },
    { q: "Wir fahren entweder ans Meer ___ in die Berge.", options: ["oder", "noch", "sondern"], answer: "oder", hint: "entweder … oder" },
    { q: "Ich habe weder Zeit ___ Lust.", options: ["noch", "oder", "aber"], answer: "noch", hint: "weder … noch (doppelte Verneinung)" },
    { q: "Das Hotel war ___ teuer, aber wirklich gut.", options: ["zwar", "weder", "sowohl"], answer: "zwar", hint: "zwar … aber = Zugeständnis" },
    { q: "___ mehr ich übe, desto besser spreche ich.", options: ["Je", "Zwar", "Sowohl"], answer: "Je", hint: "je … desto + Komparativ" },
    { q: "Er ist nicht nur klug, ___ auch sehr fleißig.", options: ["sondern", "aber", "oder"], answer: "sondern", hint: "nicht nur … sondern auch" }
  ]
});
CONTENT.grammatik.push({
  topic: "da-Wörter (darauf, darüber, dafür …)", en: "Pronominal adverbs",
  rule: "Präposition + bekannte Sache → da(r)- + Präposition: auf → darauf, über → darüber, für → dafür, mit → damit, von → davon. Kommt direkt von den Verben mit fester Präposition: sich freuen auf → darauf!",
  items: [
    { q: "Morgen beginnt der Urlaub. Ich freue mich schon ___ .", options: ["darauf", "darüber", "dafür"], answer: "darauf", hint: "sich freuen auf + Akk → darauf" },
    { q: "Der Lärm war schlimm. Alle haben sich ___ geärgert.", options: ["darüber", "darauf", "damit"], answer: "darüber", hint: "sich ärgern über → darüber" },
    { q: "Politik? Nein, ich interessiere mich nicht ___ .", options: ["dafür", "darüber", "davon"], answer: "dafür", hint: "sich interessieren für → dafür" },
    { q: "Zuerst machen wir die Übung, ___ besprechen wir sie.", options: ["danach", "damals", "dabei"], answer: "danach", hint: "zeitliche Reihenfolge → danach" },
    { q: "___ war alles anders — es gab noch kein Internet.", options: ["Damals", "Danach", "Dabei"], answer: "Damals", hint: "früher = damals (super für Teil 2!)" }
  ]
});
