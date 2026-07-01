// B1 Sprint — content pool. Plain data module imported by the DC logic.
// All German checked for B1 (telc Deutsch B1 / Zertifikat Deutsch).
export const CONTENT = {
  exam: {
    name: "telc Deutsch B1 / Zertifikat Deutsch",
    date: "2026-07-15",
    totalMax: 300,
    written: { max: 225, pass: 135, minutes: 150 },
    oral: { max: 75, pass: 45, minutes: 15 },
    sections: [
      { key: "lesen", de: "Leseverstehen", en: "Reading", weight: 25, max: 75, part: "written" },
      { key: "bausteine", de: "Sprachbausteine", en: "Language elements", weight: 10, max: 30, part: "written" },
      { key: "hoeren", de: "Hörverstehen", en: "Listening", weight: 25, max: 75, part: "written" },
      { key: "schreiben", de: "Schriftlicher Ausdruck", en: "Writing", weight: 15, max: 45, part: "written" },
      { key: "sprechen", de: "Mündlicher Ausdruck", en: "Speaking", weight: 25, max: 75, part: "oral" }
    ]
  },

  // ---------------------------------------------------------------- VOCAB DECKS
  decks: [
    { id: "arbeit", de: "Arbeit & Beruf", en: "Work & Profession", cards: [
      { de: "die Bewerbung", en: "job application", ex: "Ich habe meine Bewerbung gestern abgeschickt." },
      { de: "das Vorstellungsgespräch", en: "job interview", ex: "Morgen habe ich ein Vorstellungsgespräch bei einer Bank." },
      { de: "der Arbeitgeber", en: "employer", ex: "Mein Arbeitgeber bietet flexible Arbeitszeiten an." },
      { de: "der Arbeitnehmer", en: "employee", ex: "Die Arbeitnehmer fordern mehr Lohn." },
      { de: "der Lebenslauf", en: "CV / résumé", ex: "Bitte schicken Sie uns Ihren Lebenslauf." },
      { de: "die Stelle", en: "position / job", ex: "Ich suche eine Stelle als Krankenpfleger." },
      { de: "die Erfahrung", en: "experience", ex: "Sie hat viel Erfahrung im Verkauf." },
      { de: "das Gehalt", en: "salary", ex: "Das Gehalt ist leider nicht sehr hoch." },
      { de: "die Abteilung", en: "department", ex: "Ich arbeite in der Abteilung Marketing." },
      { de: "der Kollege", en: "colleague (m.)", ex: "Meine Kollegen sind sehr hilfsbereit." },
      { de: "die Besprechung", en: "meeting", ex: "Die Besprechung beginnt um neun Uhr." },
      { de: "der Termin", en: "appointment", ex: "Ich habe morgen einen wichtigen Termin." },
      { de: "die Überstunde", en: "hour of overtime", ex: "Diese Woche muss ich viele Überstunden machen." },
      { de: "selbstständig", en: "self-employed", ex: "Seit zwei Jahren bin ich selbstständig." },
      { de: "kündigen", en: "to quit / give notice", ex: "Er hat seinen Job gekündigt." },
      { de: "sich bewerben um", en: "to apply for", ex: "Ich bewerbe mich um eine neue Stelle." }
    ]},
    { id: "reise", de: "Reise & Verkehr", en: "Travel", cards: [
      { de: "die Reise", en: "trip / journey", ex: "Wir planen eine Reise nach Italien." },
      { de: "der Flug", en: "flight", ex: "Der Flug nach Berlin war pünktlich." },
      { de: "die Unterkunft", en: "accommodation", ex: "Die Unterkunft war sauber und günstig." },
      { de: "die Buchung", en: "booking", ex: "Ich habe die Buchung online gemacht." },
      { de: "der Aufenthalt", en: "stay", ex: "Unser Aufenthalt in Wien war wunderbar." },
      { de: "die Sehenswürdigkeit", en: "sight / attraction", ex: "Köln hat viele Sehenswürdigkeiten." },
      { de: "das Gepäck", en: "luggage", ex: "Mein Gepäck ist leider sehr schwer." },
      { de: "der Koffer", en: "suitcase", ex: "Ich packe meinen Koffer am Abend vorher." },
      { de: "die Verspätung", en: "delay", ex: "Der Zug hatte zwanzig Minuten Verspätung." },
      { de: "umsteigen", en: "to change (trains)", ex: "In Frankfurt müssen wir umsteigen." },
      { de: "die Grenze", en: "border", ex: "An der Grenze wurde unser Pass kontrolliert." },
      { de: "die Versicherung", en: "insurance", ex: "Für die Reise habe ich eine Versicherung abgeschlossen." },
      { de: "der Ausflug", en: "excursion / day trip", ex: "Am Samstag machen wir einen Ausflug ans Meer." },
      { de: "die Rückfahrt", en: "return journey", ex: "Die Rückfahrt dauert vier Stunden." },
      { de: "buchen", en: "to book", ex: "Wir haben das Hotel schon gebucht." },
      { de: "sich erholen", en: "to relax / recover", ex: "Im Urlaub will ich mich richtig erholen." }
    ]},
    { id: "gesundheit", de: "Gesundheit", en: "Health", cards: [
      { de: "die Gesundheit", en: "health", ex: "Gesundheit ist das Wichtigste im Leben." },
      { de: "die Krankheit", en: "illness", ex: "Eine gesunde Ernährung schützt vor Krankheiten." },
      { de: "die Beschwerden", en: "symptoms / complaints", ex: "Ich habe seit Tagen Beschwerden im Rücken." },
      { de: "die Behandlung", en: "treatment", ex: "Die Behandlung beim Zahnarzt war schmerzlos." },
      { de: "das Rezept", en: "prescription", ex: "Der Arzt hat mir ein Rezept ausgestellt." },
      { de: "die Apotheke", en: "pharmacy", ex: "Die Tabletten bekommst du in der Apotheke." },
      { de: "die Krankenkasse", en: "health insurance fund", ex: "Meine Krankenkasse zahlt die Brille." },
      { de: "sich erkälten", en: "to catch a cold", ex: "Zieh dich warm an, sonst erkältest du dich." },
      { de: "die Untersuchung", en: "examination / check-up", ex: "Die Untersuchung dauert nur zehn Minuten." },
      { de: "das Medikament", en: "medication", ex: "Nehmen Sie das Medikament dreimal täglich." },
      { de: "die Ernährung", en: "nutrition / diet", ex: "Eine ausgewogene Ernährung ist wichtig." },
      { de: "sich fühlen", en: "to feel", ex: "Ich fühle mich heute viel besser." },
      { de: "der Notfall", en: "emergency", ex: "Im Notfall rufen Sie die 112." },
      { de: "gesund", en: "healthy", ex: "Obst und Gemüse sind sehr gesund." },
      { de: "die Bewegung", en: "exercise / movement", ex: "Mehr Bewegung tut dem Körper gut." },
      { de: "die Schmerzen", en: "pain", ex: "Ich habe seit gestern starke Kopfschmerzen." }
    ]},
    { id: "wohnen", de: "Wohnen & Alltag", en: "Living & Daily Life", cards: [
      { de: "die Wohnung", en: "apartment", ex: "Wir suchen eine größere Wohnung." },
      { de: "die Miete", en: "rent", ex: "Die Miete ist in der Stadt sehr hoch." },
      { de: "der Vermieter", en: "landlord", ex: "Der Vermieter hat die Heizung repariert." },
      { de: "der Nachbar", en: "neighbour", ex: "Unsere Nachbarn sind sehr freundlich." },
      { de: "der Haushalt", en: "household", ex: "Wir teilen uns die Arbeit im Haushalt." },
      { de: "die Nebenkosten", en: "utilities / extra costs", ex: "Die Nebenkosten sind ziemlich gestiegen." },
      { de: "der Mietvertrag", en: "rental contract", ex: "Wir haben den Mietvertrag unterschrieben." },
      { de: "umziehen", en: "to move (house)", ex: "Nächsten Monat ziehen wir um." },
      { de: "die Einrichtung", en: "furnishings", ex: "Die Einrichtung der Wohnung ist modern." },
      { de: "aufräumen", en: "to tidy up", ex: "Am Wochenende räume ich mein Zimmer auf." },
      { de: "der Müll", en: "rubbish / waste", ex: "Den Müll bringe ich jeden Abend raus." },
      { de: "die Reparatur", en: "repair", ex: "Die Reparatur der Waschmaschine war teuer." },
      { de: "das Erdgeschoss", en: "ground floor", ex: "Unsere Wohnung liegt im Erdgeschoss." },
      { de: "die Aussicht", en: "view", ex: "Von hier hat man eine schöne Aussicht." },
      { de: "gemütlich", en: "cosy / comfortable", ex: "Das Wohnzimmer ist sehr gemütlich." },
      { de: "sich kümmern um", en: "to take care of", ex: "Ich kümmere mich um den Garten." }
    ]},
    { id: "umwelt", de: "Umwelt", en: "Environment", cards: [
      { de: "die Umwelt", en: "environment", ex: "Wir müssen die Umwelt besser schützen." },
      { de: "der Klimawandel", en: "climate change", ex: "Der Klimawandel ist ein globales Problem." },
      { de: "der Abfall", en: "waste / rubbish", ex: "Plastikabfall ist ein großes Problem." },
      { de: "die Mülltrennung", en: "waste separation", ex: "In Deutschland ist Mülltrennung normal." },
      { de: "der Umweltschutz", en: "environmental protection", ex: "Umweltschutz beginnt im Alltag." },
      { de: "die erneuerbare Energie", en: "renewable energy", ex: "Wind ist eine erneuerbare Energie." },
      { de: "das Klima", en: "climate", ex: "Das Klima verändert sich immer schneller." },
      { de: "verschmutzen", en: "to pollute", ex: "Abgase verschmutzen die Luft." },
      { de: "sparen", en: "to save (resources)", ex: "Wir sollten mehr Wasser sparen." },
      { de: "der Verbrauch", en: "consumption", ex: "Der Stromverbrauch ist im Winter höher." },
      { de: "die Verpackung", en: "packaging", ex: "Diese Verpackung ist aus Recyclingpapier." },
      { de: "nachhaltig", en: "sustainable", ex: "Wir kaufen möglichst nachhaltige Produkte." },
      { de: "die Luft", en: "air", ex: "In den Bergen ist die Luft sehr sauber." },
      { de: "recyceln", en: "to recycle", ex: "Glas und Papier kann man recyceln." },
      { de: "die Natur", en: "nature", ex: "Am Wochenende sind wir gern in der Natur." },
      { de: "der Strom", en: "electricity", ex: "Diese Lampen sparen viel Strom." }
    ]},
    { id: "familie", de: "Familie & Soziales", en: "Family", cards: [
      { de: "die Familie", en: "family", ex: "Meine Familie wohnt nicht in Deutschland." },
      { de: "die Beziehung", en: "relationship", ex: "Sie haben eine gute Beziehung." },
      { de: "die Ehe", en: "marriage", ex: "Ihre Ehe hält schon zwanzig Jahre." },
      { de: "die Erziehung", en: "upbringing / parenting", ex: "Die Erziehung der Kinder ist nicht leicht." },
      { de: "der Verwandte", en: "relative", ex: "Zu Weihnachten besuchen wir unsere Verwandten." },
      { de: "heiraten", en: "to marry", ex: "Im Sommer heiraten meine Schwester und ihr Freund." },
      { de: "sich verstehen mit", en: "to get along with", ex: "Ich verstehe mich gut mit meinen Eltern." },
      { de: "sich streiten", en: "to argue", ex: "Die Geschwister streiten sich oft." },
      { de: "getrennt", en: "separated", ex: "Meine Eltern leben seit einem Jahr getrennt." },
      { de: "die Schwangerschaft", en: "pregnancy", ex: "Während der Schwangerschaft soll man nicht rauchen." },
      { de: "alleinerziehend", en: "single-parenting", ex: "Viele alleinerziehende Mütter brauchen Unterstützung." },
      { de: "vertrauen", en: "to trust", ex: "Kinder müssen ihren Eltern vertrauen können." },
      { de: "die Unterstützung", en: "support", ex: "Ohne die Unterstützung meiner Familie ginge das nicht." },
      { de: "erwachsen", en: "grown-up / adult", ex: "Ihre Kinder sind schon erwachsen." },
      { de: "die Verantwortung", en: "responsibility", ex: "Eltern tragen viel Verantwortung." },
      { de: "sich kümmern um", en: "to look after", ex: "Oma kümmert sich um die Enkel." }
    ]},
    { id: "bildung", de: "Bildung & Lernen", en: "Education", cards: [
      { de: "die Bildung", en: "education", ex: "Bildung ist der Schlüssel zum Erfolg." },
      { de: "die Ausbildung", en: "vocational training", ex: "Sie macht eine Ausbildung als Erzieherin." },
      { de: "das Studium", en: "(university) studies", ex: "Mein Studium dauert noch zwei Jahre." },
      { de: "die Prüfung", en: "exam", ex: "Die Prüfung war schwerer als erwartet." },
      { de: "die Note", en: "grade / mark", ex: "Ich habe eine gute Note bekommen." },
      { de: "der Kurs", en: "course", ex: "Der Deutschkurs findet abends statt." },
      { de: "die Kenntnisse", en: "knowledge / skills", ex: "Gute Englischkenntnisse sind wichtig." },
      { de: "bestehen", en: "to pass (an exam)", ex: "Ich hoffe, dass ich die Prüfung bestehe." },
      { de: "wiederholen", en: "to repeat / revise", ex: "Vor dem Test wiederhole ich den Stoff." },
      { de: "das Zeugnis", en: "certificate / report", ex: "Mit dem Zeugnis kann ich mich bewerben." },
      { de: "die Weiterbildung", en: "further training", ex: "Mein Chef bezahlt eine Weiterbildung." },
      { de: "teilnehmen an", en: "to take part in", ex: "Ich nehme an einem Seminar teil." },
      { de: "der Abschluss", en: "degree / qualification", ex: "Sie hat einen Abschluss in Biologie." },
      { de: "sich konzentrieren auf", en: "to concentrate on", ex: "Beim Lernen muss ich mich konzentrieren." },
      { de: "anstrengend", en: "exhausting / demanding", ex: "Das Studium ist manchmal sehr anstrengend." },
      { de: "das Fach", en: "(school) subject", ex: "Mein Lieblingsfach war Mathematik." }
    ]},
    { id: "konnektoren", de: "Konnektoren", en: "Connectors", cards: [
      { de: "deshalb", en: "therefore / that is why", ex: "Es regnet, deshalb bleiben wir zu Hause. (Verb auf Position 2)" },
      { de: "weil", en: "because (subordinate)", ex: "Ich lerne viel, weil ich die Prüfung bestehen will. (Verb am Ende)" },
      { de: "obwohl", en: "although", ex: "Obwohl er müde war, ging er joggen. (Verb am Ende)" },
      { de: "trotzdem", en: "nevertheless", ex: "Es war kalt, trotzdem sind wir schwimmen gegangen." },
      { de: "damit", en: "so that (purpose)", ex: "Ich spreche langsam, damit du mich verstehst. (Verb am Ende)" },
      { de: "denn", en: "because (coordinating)", ex: "Ich bleibe zu Hause, denn ich bin krank. (normale Wortstellung)" },
      { de: "deswegen", en: "for that reason", ex: "Sie war krank, deswegen ist sie nicht gekommen." },
      { de: "trotz", en: "despite (+ Genitiv)", ex: "Trotz des Regens spielten die Kinder draußen." },
      { de: "wegen", en: "because of (+ Genitiv)", ex: "Wegen des Staus kam ich zu spät." },
      { de: "außerdem", en: "besides / moreover", ex: "Das Auto ist alt; außerdem ist es teuer." },
      { de: "sondern", en: "but rather", ex: "Ich trinke keinen Kaffee, sondern Tee." },
      { de: "sowohl … als auch", en: "both … and", ex: "Sie spricht sowohl Spanisch als auch Französisch." },
      { de: "entweder … oder", en: "either … or", ex: "Wir fahren entweder nach Rom oder nach Paris." },
      { de: "je … desto", en: "the … the", ex: "Je mehr ich übe, desto besser werde ich." },
      { de: "nachdem", en: "after (temporal)", ex: "Nachdem ich gegessen hatte, ging ich spazieren." },
      { de: "während", en: "while / during", ex: "Während sie kochte, deckte er den Tisch." }
    ]},
    { id: "verben", de: "Verben mit Präposition", en: "Reflexive & fixed-prep verbs", cards: [
      { de: "sich freuen auf (+ Akk)", en: "to look forward to", ex: "Ich freue mich auf das Wochenende." },
      { de: "sich freuen über (+ Akk)", en: "to be happy about", ex: "Sie freut sich über das Geschenk." },
      { de: "sich bewerben um (+ Akk)", en: "to apply for", ex: "Er bewirbt sich um einen Studienplatz." },
      { de: "sich kümmern um (+ Akk)", en: "to take care of", ex: "Ich kümmere mich um die Kinder." },
      { de: "sich interessieren für (+ Akk)", en: "to be interested in", ex: "Wir interessieren uns für Politik." },
      { de: "sich ärgern über (+ Akk)", en: "to be annoyed about", ex: "Er ärgert sich über den Lärm." },
      { de: "sich erinnern an (+ Akk)", en: "to remember", ex: "Erinnerst du dich an den Urlaub?" },
      { de: "sich gewöhnen an (+ Akk)", en: "to get used to", ex: "Ich gewöhne mich langsam an das Wetter." },
      { de: "sich treffen mit (+ Dat)", en: "to meet with", ex: "Ich treffe mich mit Freunden." },
      { de: "sich beschäftigen mit (+ Dat)", en: "to occupy oneself with", ex: "Sie beschäftigt sich mit Kunst." },
      { de: "sich entscheiden für (+ Akk)", en: "to decide on", ex: "Wir haben uns für das blaue Auto entschieden." },
      { de: "sich verlassen auf (+ Akk)", en: "to rely on", ex: "Du kannst dich auf mich verlassen." },
      { de: "sich bedanken für (+ Akk)", en: "to thank for", ex: "Ich bedanke mich für deine Hilfe." },
      { de: "sich vorbereiten auf (+ Akk)", en: "to prepare for", ex: "Ich bereite mich auf die Prüfung vor." },
      { de: "sich beschweren über (+ Akk)", en: "to complain about", ex: "Die Gäste beschweren sich über den Service." },
      { de: "warten auf (+ Akk)", en: "to wait for", ex: "Wir warten schon eine Stunde auf den Bus." }
    ]}
  ],

  // ------------------------------------------------------ SPRACHBAUSTEINE POOL
  // answer = correct option string; engine shuffles option order at render time.
  bausteine: [
    { q: "Ich interessiere mich ___ Politik.", options: ["für", "an", "über"], answer: "für", hint: "sich interessieren für + Akkusativ" },
    { q: "Wir warten schon lange ___ den Bus.", options: ["auf", "für", "an"], answer: "auf", hint: "warten auf + Akkusativ" },
    { q: "Er hat sich ___ die neue Stelle beworben.", options: ["um", "für", "auf"], answer: "um", hint: "sich bewerben um + Akkusativ" },
    { q: "___ es regnete, gingen wir spazieren.", options: ["Obwohl", "Weil", "Damit"], answer: "Obwohl", hint: "obwohl = Gegensatz, Verb am Ende" },
    { q: "Ich nehme ___ einem Sprachkurs teil.", options: ["an", "in", "auf"], answer: "an", hint: "teilnehmen an + Dativ" },
    { q: "Das ist der Mann, ___ mir geholfen hat.", options: ["der", "den", "dem"], answer: "der", hint: "Relativpronomen im Nominativ (Subjekt)" },
    { q: "Kannst du mir das Buch geben, ___ auf dem Tisch liegt?", options: ["das", "dem", "den"], answer: "das", hint: "das Buch → Neutrum, Nominativ" },
    { q: "Ich freue mich schon ___ die Ferien.", options: ["auf", "über", "an"], answer: "auf", hint: "sich freuen auf = etwas Zukünftiges" },
    { q: "Wir fahren morgen ___ Österreich.", options: ["nach", "in", "zu"], answer: "nach", hint: "Länder ohne Artikel → nach" },
    { q: "Ich gehe heute ___ Arzt.", options: ["zum", "zur", "ins"], answer: "zum", hint: "zu dem Arzt → zum" },
    { q: "Das Auto gehört ___ Nachbarn.", options: ["dem", "den", "der"], answer: "dem", hint: "gehören + Dativ" },
    { q: "Er fährt ___ dem Fahrrad zur Arbeit.", options: ["mit", "auf", "in"], answer: "mit", hint: "Verkehrsmittel: mit + Dativ" },
    { q: "Ich habe keine Zeit, ___ ich viel arbeite.", options: ["weil", "obwohl", "damit"], answer: "weil", hint: "Grund → weil, Verb am Ende" },
    { q: "Beeil dich, ___ wir den Zug nicht verpassen.", options: ["damit", "weil", "obwohl"], answer: "damit", hint: "Absicht/Ziel → damit" },
    { q: "Trotz ___ Regens spielten sie Fußball.", options: ["des", "dem", "der"], answer: "des", hint: "trotz + Genitiv (der Regen → des Regens)" },
    { q: "Während ___ Woche arbeite ich viel.", options: ["der", "die", "dem"], answer: "der", hint: "während + Genitiv (die Woche → der Woche)" },
    { q: "Wenn ich Zeit ___, würde ich mehr reisen.", options: ["hätte", "habe", "hatte"], answer: "hätte", hint: "Konjunktiv II: hätte" },
    { q: "An deiner Stelle ___ ich den Arzt fragen.", options: ["würde", "werde", "wurde"], answer: "würde", hint: "Konjunktiv II: würde + Infinitiv" },
    { q: "Das Fenster ___ gestern repariert.", options: ["wurde", "wird", "ist"], answer: "wurde", hint: "Passiv Präteritum: wurde + Partizip" },
    { q: "Der Brief ist schon ___ worden.", options: ["geschrieben", "schreiben", "schrieb"], answer: "geschrieben", hint: "Passiv Perfekt: ist … geschrieben worden" },
    { q: "Je mehr ich übe, ___ besser werde ich.", options: ["desto", "als", "wie"], answer: "desto", hint: "je … desto" },
    { q: "Sie ist nicht nur klug, ___ auch fleißig.", options: ["sondern", "aber", "denn"], answer: "sondern", hint: "nicht nur … sondern auch" },
    { q: "Ich weiß nicht, ___ er heute kommt.", options: ["ob", "wenn", "als"], answer: "ob", hint: "indirekte Ja/Nein-Frage → ob" },
    { q: "___ ich klein war, wohnten wir in Köln.", options: ["Als", "Wenn", "Wann"], answer: "Als", hint: "einmalige Sache in der Vergangenheit → als" },
    { q: "Ruf mich an, ___ du angekommen bist.", options: ["wenn", "als", "ob"], answer: "wenn", hint: "Bedingung/Zeit in Zukunft → wenn" },
    { q: "Ich interessiere mich für ein ___ Auto.", options: ["neues", "neue", "neuen"], answer: "neues", hint: "ein + Neutrum (Akk.) → -es" },
    { q: "Er trägt einen ___ Mantel.", options: ["warmen", "warmer", "warmes"], answer: "warmen", hint: "einen + Maskulinum (Akk.) → -en" },
    { q: "Mit dem ___ Auto fahren wir in den Urlaub.", options: ["neuen", "neue", "neues"], answer: "neuen", hint: "dem + Dativ → -en" },
    { q: "Das ist die Frau, ___ Mann Arzt ist.", options: ["deren", "dessen", "die"], answer: "deren", hint: "Genitiv-Relativ, feminin → deren" },
    { q: "Ich erkläre es noch einmal, ___ alle es verstehen.", options: ["damit", "weil", "obwohl"], answer: "damit", hint: "Ziel → damit" },
    { q: "Er ist müde, ___ er die ganze Nacht gearbeitet hat.", options: ["weil", "obwohl", "trotzdem"], answer: "weil", hint: "Grund → weil" },
    { q: "Ich denke oft ___ meine Familie.", options: ["an", "über", "auf"], answer: "an", hint: "denken an + Akkusativ" },
    { q: "Wir haben uns ___ den Film unterhalten.", options: ["über", "von", "auf"], answer: "über", hint: "sich unterhalten über + Akkusativ" },
    { q: "Ich bin stolz ___ meine Tochter.", options: ["auf", "über", "an"], answer: "auf", hint: "stolz auf + Akkusativ" },
    { q: "Sie hat Angst ___ der Prüfung.", options: ["vor", "von", "für"], answer: "vor", hint: "Angst vor + Dativ" },
    { q: "Vielen Dank ___ die Einladung.", options: ["für", "zu", "an"], answer: "für", hint: "sich bedanken / danken für + Akkusativ" },
    { q: "Das hängt ___ dem Wetter ab.", options: ["von", "an", "auf"], answer: "von", hint: "abhängen von + Dativ" },
    { q: "Ich gratuliere dir ___ Geburtstag.", options: ["zum", "für", "an"], answer: "zum", hint: "gratulieren zu + Dativ" },
    { q: "Kannst du ___ bitte helfen?", options: ["mir", "mich", "mein"], answer: "mir", hint: "helfen + Dativ" },
    { q: "Ich rufe dich an, sobald ich ___ Hause bin.", options: ["zu", "nach", "in"], answer: "zu", hint: "zu Hause (Ort), nach Hause (Richtung)" }
  ],

  // ------------------------------------------------------------- LESEVERSTEHEN
  lesen: [
    { type: "headline", title: "Teil 1 — Überschriften zuordnen",
      intro: "Lesen Sie die fünf kurzen Texte. Welche Überschrift (a–e) passt zu welchem Text? Jede Überschrift passt genau einmal.",
      texts: [
        { n: 1, body: "Wer gern in der Natur ist, kann sich unserem Verein anschließen. Jeden Sonntag wandern wir gemeinsam durch die Wälder der Umgebung.", sol: "d" },
        { n: 2, body: "Sie möchten eine neue Sprache lernen? In unserer Volkshochschule beginnen im September neue Kurse für Anfänger.", sol: "c" },
        { n: 3, body: "Ab nächster Woche ist die Hauptstraße wegen Bauarbeiten gesperrt. Bitte benutzen Sie die Umleitung über die Bahnhofstraße.", sol: "b" },
        { n: 4, body: "Unser Schwimmbad hat ab Montag wieder geöffnet. In den Sommerferien gelten verlängerte Öffnungszeiten.", sol: "a" },
        { n: 5, body: "Am Samstag findet auf dem Marktplatz ein Flohmarkt statt. Wer einen Stand möchte, meldet sich bitte bis Freitag an.", sol: "e" }
      ],
      headlines: [
        { id: "a", text: "Längere Öffnungszeiten im Sommer" },
        { id: "b", text: "Achtung: Umleitung in der Stadt" },
        { id: "c", text: "Neue Sprachkurse im Herbst" },
        { id: "d", text: "Mit dem Verein durch die Natur" },
        { id: "e", text: "Verkaufen auf dem Marktplatz" }
      ] },
    { type: "headline", title: "Teil 1 — Überschriften zuordnen",
      intro: "Lesen Sie die fünf kurzen Anzeigen. Welche Überschrift (a–e) passt? Jede passt genau einmal.",
      texts: [
        { n: 1, body: "Buchen Sie jetzt Ihren Sommerurlaub und sparen Sie 20 Prozent. Das Angebot gilt nur bis Ende des Monats.", sol: "d" },
        { n: 2, body: "Unser Restaurant sucht ab sofort eine Bedienung für das Wochenende. Erfahrung ist nicht nötig.", sol: "b" },
        { n: 3, body: "Wegen eines Umzugs verkaufe ich meine fast neue Waschmaschine zu einem guten Preis.", sol: "e" },
        { n: 4, body: "Der Deutschkurs am Dienstagabend fällt diese Woche leider aus. Der nächste Termin ist wie gewohnt am Donnerstag.", sol: "c" },
        { n: 5, body: "Sie haben Ihren Schlüssel verloren? Unser Schlüsseldienst hilft Ihnen rund um die Uhr.", sol: "a" }
      ],
      headlines: [
        { id: "a", text: "Immer für Sie da" },
        { id: "b", text: "Mitarbeiter gesucht" },
        { id: "c", text: "Diese Woche kein Unterricht" },
        { id: "d", text: "Rabatt für Reisende" },
        { id: "e", text: "Gebraucht, aber günstig" }
      ] },
    { type: "mc", title: "Teil 2 — Lesen & Multiple Choice",
      intro: "Lesen Sie den Text und beantworten Sie die Fragen. Nur eine Antwort ist richtig.",
      text: "Seit der Pandemie arbeiten viele Menschen in Deutschland im Homeoffice. Auch Petra Klein, 38, hat ihren Arbeitsplatz nach Hause verlegt. Früher fuhr sie jeden Tag eine Stunde mit dem Zug ins Büro. „Diese Zeit fehlt mir überhaupt nicht“, sagt sie und lacht. Heute beginnt sie ihren Arbeitstag direkt am Küchentisch.\n\nDoch das Arbeiten zu Hause hat nicht nur Vorteile. Am Anfang fiel es Petra schwer, sich zu konzentrieren. „Die Wäsche, das Geschirr – überall gab es etwas zu tun“, erzählt sie. Deshalb hat sie sich feste Arbeitszeiten gesetzt und ein eigenes Zimmer als Büro eingerichtet.\n\nWas ihr am meisten fehlt, sind die Kollegen. Einmal pro Woche fährt Petra deshalb ins Büro. Dort hat sie Besprechungen und sieht ihr Team. Insgesamt möchte sie das Homeoffice trotzdem nicht mehr aufgeben. „Ich bin produktiver und habe mehr Zeit für meine Familie. Aber ohne klare Regeln funktioniert es nicht.“",
      questions: [
        { q: "Wie kam Petra früher zur Arbeit?", options: ["Sie fuhr eine Stunde mit dem Zug.", "Sie ging zu Fuß.", "Sie fuhr mit dem Auto."], answer: "Sie fuhr eine Stunde mit dem Zug." },
        { q: "Welches Problem hatte Petra am Anfang?", options: ["Sie konnte sich schlecht konzentrieren.", "Der Zug war zu teuer.", "Ihr Computer war kaputt."], answer: "Sie konnte sich schlecht konzentrieren." },
        { q: "Wie hat Petra das Problem gelöst?", options: ["Sie hat feste Arbeitszeiten und ein Arbeitszimmer.", "Sie hat gekündigt.", "Sie arbeitet nur noch im Büro."], answer: "Sie hat feste Arbeitszeiten und ein Arbeitszimmer." },
        { q: "Was fehlt Petra im Homeoffice am meisten?", options: ["die Kollegen", "der Küchentisch", "der Zug"], answer: "die Kollegen" },
        { q: "Wie sieht Petra das Homeoffice insgesamt?", options: ["Sie möchte es behalten.", "Sie will wieder jeden Tag ins Büro.", "Sie findet es schlecht für die Familie."], answer: "Sie möchte es behalten." }
      ] },
    { type: "mc", title: "Teil 2 — Lesen & Multiple Choice",
      intro: "Lesen Sie den Text und beantworten Sie die Fragen. Nur eine Antwort ist richtig.",
      text: "In vielen deutschen Städten gibt es heute sogenannte Repair-Cafés. Das sind Treffpunkte, an denen Menschen kaputte Dinge gemeinsam reparieren, statt sie wegzuwerfen. Die Idee kommt ursprünglich aus den Niederlanden und ist inzwischen auch in Deutschland sehr beliebt.\n\nDas Prinzip ist einfach: Wer ein kaputtes Gerät hat – zum Beispiel eine Lampe, ein Fahrrad oder eine Kaffeemaschine –, bringt es mit. Ehrenamtliche Helfer versuchen dann, den Fehler zu finden. Die Besucher schauen zu und lernen dabei selbst etwas. Das Reparieren ist kostenlos, nur für Material muss man manchmal bezahlen.\n\nDie Repair-Cafés haben mehrere Vorteile. Sie schonen die Umwelt, weil weniger Müll entsteht. Außerdem sparen die Besucher Geld. Und nicht zuletzt lernen sich die Menschen im Stadtteil besser kennen. Wer mitmachen möchte, findet die Termine im Internet. Eine Anmeldung ist meistens nicht nötig.",
      questions: [
        { q: "Was macht man in einem Repair-Café?", options: ["Man repariert kaputte Dinge zusammen.", "Man kauft neue Geräte.", "Man trinkt nur Kaffee."], answer: "Man repariert kaputte Dinge zusammen." },
        { q: "Woher kommt die Idee ursprünglich?", options: ["aus den Niederlanden", "aus Deutschland", "aus den USA"], answer: "aus den Niederlanden" },
        { q: "Was kostet das Reparieren?", options: ["Es ist kostenlos, nur Material kostet manchmal.", "Es ist sehr teuer.", "Man zahlt pro Stunde."], answer: "Es ist kostenlos, nur Material kostet manchmal." },
        { q: "Welchen Vorteil nennt der Text NICHT?", options: ["Man bekommt ein neues Gerät geschenkt.", "Es entsteht weniger Müll.", "Die Besucher sparen Geld."], answer: "Man bekommt ein neues Gerät geschenkt." },
        { q: "Wie kann man teilnehmen?", options: ["Man findet die Termine im Internet, meist ohne Anmeldung.", "Man muss sich immer anmelden.", "Man muss Mitglied sein."], answer: "Man findet die Termine im Internet, meist ohne Anmeldung." }
      ] },
    { type: "ads", title: "Teil 3 — Situationen & Anzeigen",
      intro: "Welche Anzeige (a–g) passt zu welcher Situation? Wenn keine Anzeige passt, wählen Sie „x“.",
      situations: [
        { n: 1, text: "Ihre Tochter (10) möchte in den Ferien schwimmen lernen.", sol: "a" },
        { n: 2, text: "Sie suchen einen günstigen Computerkurs für Senioren.", sol: "b" },
        { n: 3, text: "Sie möchten am Wochenende mit anderen zusammen kochen lernen.", sol: "c" },
        { n: 4, text: "Sie suchen jemanden, der tagsüber mit Ihrem Hund spazieren geht.", sol: "e" },
        { n: 5, text: "Sie möchten Ihr altes Fahrrad reparieren lassen.", sol: "x" }
      ],
      ads: [
        { id: "a", text: "Schwimmkurse für Kinder ab 6 Jahren – auch in den Sommerferien. Anmeldung im Hallenbad." },
        { id: "b", text: "PC für Anfänger: geduldige Kurse speziell für ältere Menschen, vormittags, kleine Gruppen." },
        { id: "c", text: "Gemeinsam kochen: Unser Kochstudio bietet samstags Kurse für alle, die gern in der Gruppe kochen." },
        { id: "d", text: "Hundeschule: Wir bringen Ihrem Hund Gehorsam und Tricks bei." },
        { id: "e", text: "Tierfreund mit Zeit geht mit Ihrem Hund spazieren, wenn Sie arbeiten – täglich möglich." },
        { id: "f", text: "Fahrräder günstig zu verkaufen, gebraucht und neu, viele Modelle." },
        { id: "g", text: "Computer-Reparatur zum Festpreis, schnell und zuverlässig." }
      ] },
    { type: "ads", title: "Teil 3 — Situationen & Anzeigen",
      intro: "Welche Anzeige (a–g) passt zu welcher Situation? Wenn keine Anzeige passt, wählen Sie „x“.",
      situations: [
        { n: 1, text: "Sie suchen eine helle 2-Zimmer-Wohnung im Stadtzentrum.", sol: "a" },
        { n: 2, text: "Sie suchen günstige, gebrauchte Möbel für Ihre erste Wohnung.", sol: "b" },
        { n: 3, text: "Ihr Sohn braucht Nachhilfe in Mathematik.", sol: "c" },
        { n: 4, text: "Sie möchten Ihre Katze während der Ferien betreuen lassen.", sol: "d" },
        { n: 5, text: "Sie suchen einen Babysitter für Samstagabend.", sol: "e" }
      ],
      ads: [
        { id: "a", text: "Helle 2-Zimmer-Wohnung, zentral gelegen, ab sofort zu vermieten, ruhige Lage." },
        { id: "b", text: "Verschenke Sofa, Tisch und Regal, gut erhalten, nur Abholung." },
        { id: "c", text: "Nachhilfe in Mathematik und Physik, alle Klassen, erfahrener Student, günstig." },
        { id: "d", text: "Tierpension nimmt Katzen in den Ferien auf, liebevolle Betreuung." },
        { id: "e", text: "Zuverlässige Studentin babysittet gern, auch abends und am Wochenende." },
        { id: "f", text: "Möblierte Zimmer für Studenten am Stadtrand zu vermieten." },
        { id: "g", text: "Hundebetreuung in den Ferien, mit großem Garten." }
      ] }
  ],

  // -------------------------------------------------------------- HÖRVERSTEHEN
  hoeren: [
    { title: "Durchsage am Bahnhof", kind: "Ansage",
      transcript: "Sehr geehrte Fahrgäste, wir informieren Sie über eine Änderung. Der ICE 597 nach München, planmäßige Abfahrt 14:20 Uhr, hat heute etwa 15 Minuten Verspätung. Grund dafür ist eine technische Störung. Der Zug fährt heute außerdem von Gleis 9 ab, nicht wie üblich von Gleis 7. Reisende mit Anschlusszügen in München bitten wir, sich am Service-Point zu informieren. Wir danken für Ihr Verständnis.",
      statements: [
        { text: "Der Zug fährt nach München.", answer: true },
        { text: "Der ICE hat keine Verspätung.", answer: false },
        { text: "Der Zug fährt heute von Gleis 7 ab.", answer: false },
        { text: "Der Grund für die Verspätung ist eine technische Störung.", answer: true },
        { text: "Reisende mit Anschluss sollen zum Service-Point gehen.", answer: true }
      ] },
    { title: "Nachricht auf dem Anrufbeantworter", kind: "Telefon",
      transcript: "Guten Tag, hier ist die Praxis Dr. Schneider. Sie erreichen uns von Montag bis Freitag zwischen 8 und 12 Uhr sowie am Dienstag und Donnerstag auch nachmittags von 15 bis 18 Uhr. In dringenden Fällen wenden Sie sich bitte an den ärztlichen Notdienst unter der Nummer 116 117. Wenn Sie einen Termin absagen möchten, tun Sie das bitte mindestens 24 Stunden vorher. Vielen Dank.",
      statements: [
        { text: "Die Praxis hat auch am Wochenende geöffnet.", answer: false },
        { text: "Am Dienstagnachmittag kann man in die Praxis kommen.", answer: true },
        { text: "Der ärztliche Notdienst hat die Nummer 116 117.", answer: true },
        { text: "Einen Termin kann man eine Stunde vorher absagen.", answer: false },
        { text: "Die Nachricht kommt von einer Arztpraxis.", answer: true }
      ] },
    { title: "Veranstaltungstipp im Radio", kind: "Radio",
      transcript: "Und hier noch unser Veranstaltungstipp für das Wochenende: Am Sonntag findet im Stadtpark das große Sommerfest statt. Los geht es um 11 Uhr mit einem Programm für Kinder. Ab 15 Uhr spielen verschiedene Bands Live-Musik. Der Eintritt ist frei. Für Essen und Getränke ist gesorgt. Bei schlechtem Wetter wird das Fest auf den nächsten Sonntag verschoben. Parkplätze gibt es nur wenige – kommen Sie am besten mit dem Fahrrad.",
      statements: [
        { text: "Das Sommerfest findet am Samstag statt.", answer: false },
        { text: "Für Kinder gibt es ein eigenes Programm.", answer: true },
        { text: "Der Eintritt kostet zehn Euro.", answer: false },
        { text: "Bei Regen fällt das Fest komplett aus.", answer: false },
        { text: "Man soll am besten mit dem Fahrrad kommen.", answer: true }
      ] },
    { title: "Der Wetterbericht", kind: "Radio",
      transcript: "Nun zum Wetter für morgen, Mittwoch. Am Vormittag bleibt es im Norden noch trocken, im Süden regnet es zeitweise. Am Nachmittag ziehen auch im Norden Wolken auf, es bleibt aber meist trocken. Die Temperaturen liegen zwischen 12 Grad an der Küste und 19 Grad im Süden. Dazu weht ein schwacher bis mäßiger Wind. Am Donnerstag wird es deutlich wärmer und sonniger.",
      statements: [
        { text: "Der Wetterbericht gilt für Mittwoch.", answer: true },
        { text: "Im Süden regnet es am Vormittag.", answer: true },
        { text: "Es wird überall 25 Grad warm.", answer: false },
        { text: "Am Donnerstag wird es kälter.", answer: false },
        { text: "Morgen weht ein starker Sturm.", answer: false }
      ] }
  ],

  // ------------------------------------------------------------------ SCHREIBEN
  schreiben: [
    { register: "informell", recipient: "Liebe Sandra,",
      situation: "Eine Freundin aus Ihrem Deutschkurs, Sandra, hat Geburtstag und lädt Sie zu ihrer Party ein. Sie können aber leider nicht kommen. Schreiben Sie eine E-Mail.",
      leitpunkte: ["Bedanken Sie sich für die Einladung.", "Erklären Sie, warum Sie nicht kommen können.", "Machen Sie einen Vorschlag, wann Sie sich treffen können.", "Wünschen Sie ihr alles Gute zum Geburtstag."] },
    { register: "semi-formell", recipient: "Sehr geehrte Frau Berg,",
      situation: "Sie können nächste Woche nicht zum Deutschkurs kommen. Schreiben Sie eine E-Mail an Ihre Kursleiterin, Frau Berg.",
      leitpunkte: ["Sagen Sie, dass Sie nächste Woche fehlen.", "Nennen Sie den Grund.", "Fragen Sie nach den Hausaufgaben.", "Bitten Sie um die Materialien aus dem Unterricht."] },
    { register: "informell", recipient: "Lieber Tom,",
      situation: "Sie waren im Urlaub und haben dort Ihren Freund Tom besucht. Schreiben Sie ihm nach dem Urlaub eine E-Mail.",
      leitpunkte: ["Bedanken Sie sich für die schöne Zeit.", "Beschreiben Sie, was Ihnen am besten gefallen hat.", "Berichten Sie kurz über Ihre Rückreise.", "Laden Sie ihn zu sich nach Hause ein."] },
    { register: "semi-formell", recipient: "Sehr geehrte Damen und Herren,",
      situation: "Sie haben online eine Jacke bestellt, aber die falsche Größe bekommen. Schreiben Sie eine E-Mail an den Online-Shop.",
      leitpunkte: ["Beschreiben Sie das Problem.", "Nennen Sie Ihre Bestellnummer.", "Sagen Sie, was Sie sich wünschen (Umtausch oder Geld zurück).", "Fragen Sie, wie Sie die Jacke zurückschicken können."] },
    { register: "informell", recipient: "Liebe Mara,",
      situation: "Sie ziehen am Wochenende um und brauchen Hilfe. Schreiben Sie Ihrer Freundin Mara eine E-Mail.",
      leitpunkte: ["Erzählen Sie, dass Sie umziehen.", "Bitten Sie um Hilfe beim Umzug.", "Sagen Sie, wann und wo Sie Hilfe brauchen.", "Schlagen Sie vor, wie Sie sich bedanken (z. B. mit Essen)."] },
    { register: "semi-formell", recipient: "Sehr geehrte Damen und Herren,",
      situation: "Sie interessieren sich für einen Sportkurs in einem Fitnessstudio. Schreiben Sie eine E-Mail und bitten Sie um Informationen.",
      leitpunkte: ["Sagen Sie, für welchen Kurs Sie sich interessieren.", "Fragen Sie nach den Kurszeiten.", "Fragen Sie nach den Kosten.", "Fragen Sie, ob eine Probestunde möglich ist."] }
  ],

  // ------------------------------------------------------------------ SPRECHEN
  sprechen: [
    { teil: 2, type: "meinung", topic: "Sollten Kinder schon in der Grundschule ein eigenes Smartphone haben?",
      cues: ["Vorteile (z. B. erreichbar, lernen Medien kennen)", "Nachteile (z. B. Ablenkung, zu viel Bildschirmzeit)", "Ihre eigene Meinung mit Begründung", "Fragen Sie Ihren Partner: „Was denkst du dazu?“"] },
    { teil: 2, type: "meinung", topic: "Ist es besser, in der Stadt oder auf dem Land zu leben?",
      cues: ["Vorteile der Stadt", "Vorteile vom Land", "Wo möchten Sie selbst leben? Warum?", "Fragen Sie Ihren Partner nach seiner Meinung."] },
    { teil: 2, type: "meinung", topic: "Was ist im Beruf wichtiger: viel Geld verdienen oder eine sinnvolle Arbeit?",
      cues: ["Argumente für ein hohes Gehalt", "Argumente für sinnvolle Arbeit", "Ihre Meinung mit Beispiel", "Reagieren Sie auf die Meinung Ihres Partners."] },
    { teil: 3, type: "planen", topic: "Ihr Deutschkurs möchte am letzten Kurstag einen gemeinsamen Ausflug machen. Planen Sie den Ausflug zusammen.",
      cues: ["Wohin? (Ziel vorschlagen)", "Wann und wie lange?", "Wie kommt ihr dorthin?", "Was muss man mitnehmen / was kostet es?"] },
    { teil: 3, type: "planen", topic: "Eine gemeinsame Freundin liegt im Krankenhaus. Planen Sie zusammen einen Besuch und eine kleine Überraschung.",
      cues: ["Wann besucht ihr sie?", "Was bringt ihr mit (Geschenk, Blumen)?", "Wer organisiert was?", "Wie kommt ihr ins Krankenhaus?"] },
    { teil: 3, type: "planen", topic: "Eine Kollegin verlässt die Stadt. Planen Sie zusammen ein Abschiedsfest für sie.",
      cues: ["Wo soll das Fest sein?", "Was gibt es zu essen und zu trinken?", "Wen ladet ihr ein?", "Wer kümmert sich um Musik / Programm?"] }
  ],

  // ------------------------------------------------------------ GRAMMATIK-REVIEW
  grammatik: [
    { topic: "Verben mit fester Präposition", en: "Verbs with fixed prepositions",
      rule: "Viele Verben haben eine feste Präposition mit festem Kasus. Lerne sie immer als Paar: warten auf + Akk, denken an + Akk, sich freuen auf + Akk, sich interessieren für + Akk, Angst haben vor + Dat.",
      items: [
        { q: "Ich warte schon eine Stunde ___ den Bus.", options: ["auf", "für", "an"], answer: "auf", hint: "warten auf + Akkusativ" },
        { q: "Sie denkt oft ___ ihre Heimat.", options: ["an", "auf", "über"], answer: "an", hint: "denken an + Akkusativ" },
        { q: "Wir freuen uns ___ das Sommerfest.", options: ["auf", "über", "an"], answer: "auf", hint: "sich freuen auf = Zukunft" },
        { q: "Er interessiert sich sehr ___ Sport.", options: ["für", "an", "auf"], answer: "für", hint: "sich interessieren für + Akkusativ" }
      ] },
    { topic: "Konnektoren & Wortstellung", en: "Connectors & word order",
      rule: "weil / obwohl / damit → Verb ans Satzende. deshalb / trotzdem / deswegen → Verb auf Position 2 (V2). denn → normale Wortstellung.",
      items: [
        { q: "Es regnet, ___ nehme ich einen Schirm mit.", options: ["deshalb", "weil", "obwohl"], answer: "deshalb", hint: "Folge → deshalb (Verb Position 2)" },
        { q: "Ich gehe nicht mit, ___ ich keine Zeit habe.", options: ["weil", "deshalb", "trotzdem"], answer: "weil", hint: "Grund → weil (Verb am Ende)" },
        { q: "___ es spät war, sind wir noch ausgegangen.", options: ["Obwohl", "Weil", "Damit"], answer: "Obwohl", hint: "Gegensatz → obwohl" },
        { q: "Ich spare Geld, ___ ich in den Urlaub fahren kann.", options: ["damit", "weil", "obwohl"], answer: "damit", hint: "Ziel/Absicht → damit" }
      ] },
    { topic: "Reflexive Verben", en: "Reflexive verbs",
      rule: "Reflexivpronomen: mich/dich/sich/uns/euch/sich (Akkusativ). Im Dativ (wenn es schon ein Akkusativ-Objekt gibt): mir/dir/sich … z. B. „Ich wasche mir die Hände.“",
      items: [
        { q: "Ich freue ___ auf das Wochenende.", options: ["mich", "mir", "sich"], answer: "mich", hint: "sich freuen → Akkusativ: mich" },
        { q: "Ich putze ___ die Zähne.", options: ["mir", "mich", "sich"], answer: "mir", hint: "Akk.-Objekt 'die Zähne' → Dativ: mir" },
        { q: "Wir treffen ___ um acht Uhr.", options: ["uns", "sich", "euch"], answer: "uns", hint: "wir → uns" },
        { q: "Erinnerst du ___ noch an ihn?", options: ["dich", "dir", "sich"], answer: "dich", hint: "sich erinnern → Akkusativ: dich" }
      ] },
    { topic: "Wechselpräpositionen (Wo? / Wohin?)", en: "Two-way prepositions",
      rule: "an, auf, in, über, unter, vor, hinter, neben, zwischen: Wo? → Dativ (Position). Wohin? → Akkusativ (Bewegung/Richtung).",
      items: [
        { q: "Das Bild hängt an ___ Wand. (Wo?)", options: ["der", "die", "dem"], answer: "der", hint: "Wo? → Dativ (die Wand → der)" },
        { q: "Häng das Bild an ___ Wand! (Wohin?)", options: ["die", "der", "dem"], answer: "die", hint: "Wohin? → Akkusativ (die Wand)" },
        { q: "Die Katze sitzt unter ___ Tisch. (Wo?)", options: ["dem", "den", "der"], answer: "dem", hint: "Wo? → Dativ (der Tisch → dem)" },
        { q: "Stell die Flasche in ___ Kühlschrank! (Wohin?)", options: ["den", "dem", "das"], answer: "den", hint: "Wohin? → Akkusativ (der Kühlschrank → den)" }
      ] },
    { topic: "Genitiv", en: "Genitive case",
      rule: "Genitiv zeigt Besitz: der Wagen meines Vaters. Maskulinum/Neutrum: des + Nomen + -s (des Mannes, des Kindes). Feminin/Plural: der. Präpositionen mit Genitiv: wegen, trotz, während, (an)statt.",
      items: [
        { q: "Das ist das Auto ___ Vaters.", options: ["meines", "meinem", "mein"], answer: "meines", hint: "Genitiv maskulin → meines …-s" },
        { q: "___ des schlechten Wetters bleiben wir zu Hause.", options: ["Wegen", "Mit", "Bei"], answer: "Wegen", hint: "wegen + Genitiv" },
        { q: "Während ___ Pause esse ich etwas.", options: ["der", "die", "dem"], answer: "der", hint: "während + Genitiv (die Pause → der)" },
        { q: "Trotz ___ Problems blieb sie ruhig.", options: ["des", "dem", "der"], answer: "des", hint: "trotz + Genitiv (das Problem → des …-s)" }
      ] }
  ],

  // ------------------------------------------------------------------ PHRASES
  phrases: {
    writing: {
      template: [
        { step: "Anrede", de: "Liebe/Lieber … ,  /  Sehr geehrte Frau … ,", note: "Nach der Anrede klein weiterschreiben." },
        { step: "Einleitung", de: "vielen Dank für deine E-Mail. / ich schreibe Ihnen, weil …", note: "Grund fürs Schreiben nennen." },
        { step: "Hauptteil", de: "Die 4 Leitpunkte nacheinander bearbeiten.", note: "Mit Konnektoren verbinden: zuerst, außerdem, deshalb …" },
        { step: "Schluss", de: "Ich freue mich auf deine Antwort.", note: "Erwartung / Bitte formulieren." },
        { step: "Grußformel", de: "Liebe Grüße  /  Mit freundlichen Grüßen", note: "Informell vs. formell wählen." }
      ],
      bank: {
        "Anrede (informell)": ["Liebe/Lieber … ,", "Hallo … ,"],
        "Anrede (formell)": ["Sehr geehrte Frau … ,", "Sehr geehrter Herr … ,", "Sehr geehrte Damen und Herren,"],
        "Einleitung": ["vielen Dank für deine E-Mail.", "ich hoffe, es geht dir gut.", "ich schreibe Ihnen, weil …", "wie geht es dir? Bei mir ist gerade viel los."],
        "Verbinden": ["Zuerst … , dann …", "Außerdem …", "Deshalb …", "Trotzdem …", "Zum Schluss möchte ich noch sagen, dass …"],
        "Vorschlag machen": ["Wie wäre es, wenn …?", "Ich schlage vor, dass …", "Wollen wir … ?", "Vielleicht könnten wir …"],
        "Bitten": ["Könntest du mir bitte …?", "Ich würde mich freuen, wenn …", "Wäre es möglich, dass …?"],
        "Schluss": ["Ich freue mich auf deine Antwort.", "Vielen Dank im Voraus.", "Bitte melde dich bald.", "Lass bald von dir hören."],
        "Grußformel": ["Liebe Grüße", "Viele Grüße", "Mit freundlichen Grüßen"]
      }
    },
    speaking: {
      "Meinung äußern": ["Meiner Meinung nach …", "Ich finde, dass …", "Ich bin der Meinung, dass …", "Aus meiner Sicht …"],
      "Vorschlagen": ["Ich schlage vor, dass wir …", "Wie wäre es mit …?", "Wir könnten …", "Sollen wir … ?", "Ich hätte da eine Idee: …"],
      "Zustimmen": ["Das ist eine gute Idee.", "Da stimme ich dir zu.", "Genau, das sehe ich auch so.", "Du hast recht."],
      "Widersprechen": ["Das sehe ich anders.", "Da bin ich nicht deiner Meinung.", "Das stimmt schon, aber …", "Ich bin mir nicht sicher, ob …"],
      "Kompromiss finden": ["Vielleicht finden wir einen Kompromiss.", "Wir könnten es so machen: …", "Was hältst du davon, wenn wir …?", "Einigen wir uns auf …"],
      "Partner einbeziehen": ["Was denkst du dazu?", "Wie siehst du das?", "Bist du einverstanden?", "Was meinst du?"]
    }
  }
};

if (typeof window !== "undefined") { window.B1_CONTENT = CONTENT; }
