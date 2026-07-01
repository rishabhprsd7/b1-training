// B1 Sprint — REAL exercises lifted from the supplied model tests.
// Every item is transcribed from the actual PDFs and tagged with `source`.
// This module appends the items to the existing CONTENT pools (mutating the
// shared arrays) at fixed, documented indices that study-plan.js points at.
// Answer keys: telc B1a solutions are printed in that paper; the Goethe/ÖSD
// listening answers and the telc Übungstest Sprachbausteine answers are derived
// directly from the transcript / the unambiguous grammar of the printed text.
import { CONTENT } from "./content.js";

// ---------------------------------------------------------------- LESEVERSTEHEN
// telc Deutsch B1a Probe — Lesen Teil 1 (Überschriften), Teil 2 (MC), Teil 3 (Anzeigen).
// Printed solutions: T1 1f 2i 3e 4b 5d · T2 6c 7c 8a 9c 10a ·
// T3 11x 12l 13a 14d 15k 16f 17i 18x 19h 20c.

// index 6
CONTENT.lesen.push({
  type: "headline", source: "telc B1a Probe · Leseverstehen Teil 1",
  title: "Teil 1 — Überschriften zuordnen",
  intro: "Lesen Sie zuerst die 10 Überschriften. Lesen Sie dann die 5 Texte und entscheiden Sie, welcher Text am besten zu welcher Überschrift (a–j) passt.",
  texts: [
    { n: 1, body: "Der diesjährige Umwelttag informiert über ökologische und soziale Auswirkungen der Produktion unserer Kleidung. Beim Blick aufs Etikett lesen wir den Namen eines weit entfernten Landes und machen uns wenig Gedanken darüber, wie und wo die Kleider produziert werden. Die meisten Kleidungsstücke werden in Asien oder Lateinamerika unter katastrophalen Arbeitsbedingungen hergestellt.", sol: "f" },
    { n: 2, body: "Kindererziehung ist für Studierende keine leichte Aufgabe. Das Hin- und Herrennen zwischen Kinderbetreuung, Schreibtisch, Hörsaal und Wickeltisch ist eine wahre Herausforderung. Ein Studium mit Kind ist eine Doppelbelastung. Man muss ein wahres Organisationstalent sein, um Studium, Kind, Haushalt und Nebenjob gleichzeitig zu managen.", sol: "i" },
    { n: 3, body: "In einem Pilotprojekt testen fünf Unternehmen und das Familienministerium anonymisierte Bewerbungsverfahren. Nur die Qualifikation soll entscheiden, wer zum Bewerbungsgespräch eingeladen wird. Die Bewerbung soll kein Foto, keinen Namen und keine Informationen über Alter, Geschlecht oder Herkunft enthalten. So sollen Vorurteile der Personalchefs keine Rolle mehr spielen.", sol: "e" },
    { n: 4, body: "Mehr Geld im Portemonnaie ohne zu verzichten und gleichzeitig etwas für die Umwelt tun? Das ist ganz einfach – mit mehr Energieeffizienz. Unsere Tipps und Tricks zum Stromsparen machen es möglich. Denn oft reicht schon ein einfacher Klick, um Ihre Stromrechnung im Griff zu behalten.", sol: "b" },
    { n: 5, body: "Eine neue Studie nennt als Berufe mit guten Zukunftsaussichten Gesundheitsberufe wie Altenpfleger und Krankenschwester oder sozialpflegerische Berufe wie Heimleiter und Sozialarbeiter. Besonders gefragt werden in zehn Jahren aber Akademiker sein. Der Bedarf steigt ständig.", sol: "d" }
  ],
  headlines: [
    { id: "a", text: "Neues Bewerbungstraining für Frauen" },
    { id: "b", text: "Einfach Strom und Geld sparen" },
    { id: "c", text: "Finanzielle Unterstützung für studierende Eltern" },
    { id: "d", text: "Die Jobs von morgen" },
    { id: "e", text: "Zur neuen Stelle ohne Namen und Foto" },
    { id: "f", text: "Was haben Kleidung und Umweltschutz miteinander zu tun?" },
    { id: "g", text: "Studie: Zu wenig Bewerber in sozialen Berufen" },
    { id: "h", text: "Ganz einfach den Stromanbieter wechseln" },
    { id: "i", text: "Studieren mit Kind – geht das?" },
    { id: "j", text: "Neue Mode aus fernen Ländern" }
  ]
});

// index 7
CONTENT.lesen.push({
  type: "mc", source: "telc B1a Probe · Leseverstehen Teil 2",
  title: "Teil 2 — Lesen & Multiple Choice",
  intro: "Lesen Sie den Zeitungsartikel „Von Fitmachern und Müdemachern“ und lösen Sie die Aufgaben. Nur eine Antwort ist richtig. Die Reihenfolge der Aufgaben folgt nicht immer dem Text.",
  text: "Wenn es einen Test zum Thema „Gesunde Ernährung“ geben würde – in der Villa Maus würden ihn schon Fünfjährige spielend bestehen. Fitmacher und Müdemacher – fast jedes der über 100 Kinder der Kindertagesstätte in Mannheim kann sie unterscheiden.\n\nDas verdanken sie ihrer engagierten Köchin Amelie Wohlgemuth. In der sauberen Küche wird täglich frisch gekocht. Fertigprodukte werden so wenig wie möglich verwendet, auch wenn es länger dauert. Um die Umwelt zu schonen, stammen alle Lebensmittel aus der Region. Einmal wöchentlich gibt es Fisch, ein- bis zweimal Fleisch.\n\n„Entscheidend ist, die Kinder am Kochen zu beteiligen. Deshalb ist die Küche ein Ort, an dem Kinder ausdrücklich erwünscht sind“, sagt Frau Wohlgemuth. Ihr eigentliches Ding, sagt sie, ist die Früherziehung zur Gesundheit; die pädagogische Arbeit mit den Kindern ist ihr das Wichtigste. Spielerisch lernen die Kinder, Fit- und Müdemacher zu bestimmen und verschiedene Salatsorten zu unterscheiden.",
  questions: [
    { q: "Die Köchin achtet darauf, dass …", options: ["die Lebensmittel aus der Nähe kommen.", "das Kochen wenig Zeit braucht.", "es jeden Tag Fleisch gibt."], answer: "die Lebensmittel aus der Nähe kommen." },
    { q: "Die Kinder in der Villa Maus …", options: ["wissen, welches Essen gesund ist.", "essen am liebsten Pizza.", "haben eine Prüfung zum Thema Ernährung gemacht."], answer: "wissen, welches Essen gesund ist." },
    { q: "In der Küche der Villa Maus …", options: ["dürfen die Kinder mithelfen.", "frühstücken die Kinder mit den Eltern.", "sind Kinder nicht willkommen."], answer: "dürfen die Kinder mithelfen." },
    { q: "Amelie Wohlgemuth ist das Wichtigste an ihrer Arbeit, …", options: ["mit den Kindern zu arbeiten.", "dass in der Küche alles gut funktioniert.", "ihr Küchenteam selbst fortzubilden."], answer: "mit den Kindern zu arbeiten." },
    { q: "Bei Amelie Wohlgemuth lernen die Kinder, …", options: ["welche Nahrungsmittel müde machen.", "wie man Pizza macht.", "wie man Salat putzt."], answer: "welche Nahrungsmittel müde machen." }
  ]
});

// index 8
CONTENT.lesen.push({
  type: "ads", source: "telc B1a Probe · Leseverstehen Teil 3",
  title: "Teil 3 — Situationen & Anzeigen",
  intro: "Lesen Sie die Situationen und die 12 Anzeigen (a–l). Welche Anzeige passt zu welcher Situation? Jede Anzeige nur einmal. Wenn nichts passt, wählen Sie „x“.",
  situations: [
    { n: 11, text: "Zum Geburtstag möchten Sie Ihrem Vater eine schicke Jacke kaufen.", sol: "x" },
    { n: 12, text: "Sie singen gern und möchten am Samstagabend Ihr Können vor Publikum zeigen.", sol: "l" },
    { n: 13, text: "Eine Freundin will in Weiß heiraten, aber das Kleid nicht kaufen.", sol: "a" },
    { n: 14, text: "Sie möchten mitten in der Stadt im Freien etwas trinken.", sol: "d" },
    { n: 15, text: "Ein Freund, 20, sucht eine neue Hose zum Ausgehen. Er hat nicht viel Geld.", sol: "k" },
    { n: 16, text: "Ihre Tochter braucht eine neue, billige Kinderbrille, weil sie ihre Brillen ständig verliert.", sol: "f" },
    { n: 17, text: "Eine nicht ganz schlanke Freundin sucht einen preiswerten Rock.", sol: "i" },
    { n: 18, text: "Sie möchten am Sonntag in einem Biergarten Mittagessen gehen.", sol: "x" },
    { n: 19, text: "Sie brauchen eine gute Sportbrille. Die Qualität muss stimmen, sie darf auch etwas kosten.", sol: "h" },
    { n: 20, text: "Sie möchten gute Musik hören und gleichzeitig etwas für Menschen in Not tun.", sol: "c" }
  ],
  ads: [
    { id: "a", text: "Träume in Weiß – für den schönsten Tag im Leben! Second-Hand-Brautkleider und Verleih von Brautkleidern zu fairen Preisen." },
    { id: "b", text: "Am Waldturm – Biergarten im Grünen. Täglich ab 15 Uhr, Fleisch und Wurst vom Grill. Zu Fuß in einer halben Stunde vom Zentrum." },
    { id: "c", text: "Blues-Benefiz-Konzert. Klasse Musik für einen guten Zweck – der Gewinn geht an „Ärzte ohne Grenzen“. Eintritt 11 Euro." },
    { id: "d", text: "Stadtstrand – mitten im Zentrum und draußen! Entspann dich unter Palmen bei cooler Musik und kühlen Drinks." },
    { id: "e", text: "Original Karaoke: Freitag + Sonntag Karaoke-Party. Über 9.000 Video-Karaoke-Songs in vielen Sprachen." },
    { id: "f", text: "Brillen-Max! Ihr Optiker für die ganze Familie – topmodische Modelle für Damen, Herren und Kinder zu günstigen Preisen." },
    { id: "g", text: "Sommerschlussverkauf bei A & C: Röcke, Kleider, Tops – Leichtes und Luftiges, auch in großen Größen." },
    { id: "h", text: "Individuelle Brillengläser für den Sport – haarscharfe Sicht, ideal für alle Sportarten. 3 Jahre Garantie." },
    { id: "i", text: "Das ideale Geschenk für den Herrn: individuell angefertigte Hemden auch für den kleinen Geldbeutel, nur 39,90 €." },
    { id: "j", text: "Afterwork-Party im Primavera – die erfolgreichsten Partys der Stadt, jetzt mit Außenterrasse. Eintritt 6 €." },
    { id: "k", text: "Clubwear & More: Neues zum Anziehen für die Disco – coole Marken, große Auswahl, faire Preise. Röcke, Hosen, T-Shirts …" },
    { id: "l", text: "Karaoke-Nacht mit Missus Blue – jeden Samstagabend im Chill out! Auf einer echten Bühne, mit Publikum. Freier Eintritt!" }
  ]
});

// ---------------------------------------------------------------- HÖRVERSTEHEN
// Goethe/ÖSD Zertifikat B1 Modellsatz — Hören Teil 3 (Gespräch über ein Fest),
// Aufgaben 16–22, alle Richtig/Falsch. Antworten aus der Transkription abgeleitet.
// index 4
CONTENT.hoeren.push({
  title: "Gespräch über ein Fest", kind: "Gespräch · Goethe/ÖSD Modellsatz, Hören Teil 3",
  source: "Goethe/ÖSD Zertifikat B1 Modellsatz · Hören Teil 3",
  transcript: "Florian: Ach ja, du wolltest ja am Samstag zu einem Fest, oder?\nNadia: Ja, es war ein Geburtstagsfest. Anna, die Freundin meiner Mutter, wurde 50. Ihr Mann ist Diplomat und die beiden haben ein großes Fest gemacht – an die 60 Leute. Schon speziell, wie die wohnen: ein richtiges Traumhaus, eine große Eingangshalle, wunderschöne alte Möbel, eine riesige Terrasse. So ein Haus, das wär schon was.\nFlorian: Und deine Mutter?\nNadia: Die musste mich natürlich allen vorstellen: „Das ist meine Tochter, sie studiert Medienwissenschaft, sie will später zum Fernsehen und Reportagen machen.“ Ganz schön peinlich.\nFlorian: Und das Essen?\nNadia: Vom Feinsten – ein kaltes Buffet, danach drei, vier Hauptgerichte und Nachspeisen.\nNadia: Das Beste war die Musik. Der Klavierspieler war genial. Ich habe mich neben das Klavier gesetzt, und er fragte, ob ich auch Musik mache. Ich sagte, ich spiele Querflöte und Klavier, aber nur als Hobby. In seiner Pause sollte ich mich ans Klavier setzen und etwas vorspielen. Ich habe ein paar klassische Lieder gespielt; als jemand Jazz hören wollte, kam zum Glück der Pianist zurück. Als wir nach Mitternacht gingen, spielte er immer noch Jazz.",
  statements: [
    { text: "Bei dem Fest wurde der Geburtstag von Annas Mann gefeiert.", answer: false },
    { text: "Nadia ist vom Haus der Gastgeber begeistert.", answer: true },
    { text: "Nadia arbeitet beim Fernsehen.", answer: false },
    { text: "Das Essen war ausgezeichnet.", answer: true },
    { text: "Nadia hat zusammen mit dem Musiker gespielt.", answer: false },
    { text: "Nadia hat auch Jazz gespielt.", answer: false },
    { text: "Das Fest dauerte bis nach 12 Uhr nachts.", answer: true }
  ]
});

// ---------------------------------------------------------------- SPRACHBAUSTEINE
// telc Deutsch B1 Übungstest 1 — Sprachbausteine Teil 1 (Lückentext „Brief an
// Karin“, Aufgaben 21–30). Reihenfolge des echten Briefs; Lösungen aus der
// eindeutigen Grammatik des gedruckten Textes. Indizes 40–49 im Pool.
const FRITZ = [
  { q: "…, wollte ich eigentlich nach Paris, ___ das hat dann leider nicht geklappt.", options: ["aber", "denn", "sondern"], answer: "aber", hint: "Gegensatz, Hauptsatz → aber" },
  { q: "Doch dann habe ich eine Stelle als Praktikant bei ___ Firma in Straßburg gefunden.", options: ["eine", "einen", "einer"], answer: "einer", hint: "bei + Dativ, feminin (die Firma) → einer" },
  { q: "Dort ___ ich drei Monate geblieben.", options: ["bin", "habe", "wurde"], answer: "bin", hint: "Perfekt von „bleiben“ mit sein → bin geblieben" },
  { q: "Die Arbeit war sehr ___ – ich musste schon um 8.00 Uhr im Büro sein.", options: ["anstrengend", "anstrengende", "anstrengendes"], answer: "anstrengend", hint: "prädikatives Adjektiv (nach „war“) → keine Endung" },
  { q: "…, hat mir aber ___ sehr gut gefallen.", options: ["trotzdem", "wegen", "weshalb"], answer: "trotzdem", hint: "Gegensatz trotz der Anstrengung → trotzdem" },
  { q: "Ich habe ___ dieser Zeit in verschiedenen Abteilungen gearbeitet.", options: ["bis", "in", "nach"], answer: "in", hint: "Zeitraum → in dieser Zeit" },
  { q: "…, und so nicht nur etwas über die Herstellung von Fernsehgeräten ___, sondern auch über den Verkauf.", options: ["gelernt", "lernen", "lernte"], answer: "gelernt", hint: "Perfekt: habe … gelernt" },
  { q: "Und die Kollegen, mit ___ ich am meisten zu tun hatte, waren sehr nett.", options: ["dem", "denen", "die"], answer: "denen", hint: "Relativpronomen, Dativ Plural (mit) → denen" },
  { q: "Nach dem Praktikum habe ich noch zwei Wochen Urlaub bei ___ Freunden gemacht.", options: ["meine", "meinen", "meiner"], answer: "meinen", hint: "bei + Dativ Plural → meinen Freunden" },
  { q: "Darüber erzähle ich ___ bald mehr – für heute muss ich Schluss machen.", options: ["dir", "Ihnen", "uns"], answer: "dir", hint: "„Liebe Karin“ → du-Form → dir" }
];
FRITZ.forEach(it => CONTENT.bausteine.push({ ...it, source: "telc Übungstest 1 · Sprachbausteine Teil 1 (Brief an Karin)" }));
export const FRITZ_START = CONTENT.bausteine.length - FRITZ.length; // = 40

// ---------------------------------------------------------------- SCHREIBEN
// Reale Schreibaufgaben aus den Modelltests (Prompts, keine Lösung nötig).
// index 6 — telc Übungstest 1
CONTENT.schreiben.push({
  register: "informell", recipient: "Liebe Marianne,",
  source: "telc Übungstest 1 · Schriftlicher Ausdruck",
  situation: "Sie haben von Ihrer Freundin Marianne eine E-Mail bekommen: Sie möchte Sie in Ihrem Land besuchen, war aber noch nie da und weiß nicht, wann die beste Reisezeit ist und ob es sehr heiß wird. Antworten Sie und schreiben Sie zu allen vier Punkten.",
  leitpunkte: ["welche Ausflüge Sie mit Marianne machen wollen", "was die beste Jahreszeit für die Reise ist", "welche Kleidung sie mitnehmen soll", "wie sie sich am besten auf die Reise vorbereiten kann"]
});
// index 7 — Goethe/ÖSD Modellsatz, Schreiben Aufgabe 1
CONTENT.schreiben.push({
  register: "informell", recipient: "Liebe/r …,",
  source: "Goethe/ÖSD Modellsatz · Schreiben Aufgabe 1",
  situation: "Sie haben vor einer Woche Ihren Geburtstag gefeiert. Ein Freund/eine Freundin konnte nicht kommen, weil er/sie krank war. Schreiben Sie eine E-Mail (ca. 80 Wörter) zu allen drei Punkten.",
  leitpunkte: ["Beschreiben Sie: Wie war die Feier?", "Begründen Sie: Welches Geschenk finden Sie besonders toll und warum?", "Machen Sie einen Vorschlag für ein Treffen."]
});
// index 8 — Goethe/ÖSD Modellsatz, Schreiben Aufgabe 3
CONTENT.schreiben.push({
  register: "semi-formell", recipient: "Sehr geehrte Frau Müller,",
  source: "Goethe/ÖSD Modellsatz · Schreiben Aufgabe 3",
  situation: "Ihre Kursleiterin, Frau Müller, hat Sie zu einem Gespräch über Ihre persönlichen Lernziele eingeladen. Zu dem Termin können Sie aber nicht kommen. Schreiben Sie eine kurze E-Mail (ca. 40 Wörter).",
  leitpunkte: ["Entschuldigen Sie sich höflich.", "Berichten Sie, warum Sie nicht kommen können.", "Vergessen Sie Anrede und Gruß nicht."]
});
// index 9 — telc Übungstest (neu): Kurznachricht
CONTENT.schreiben.push({
  register: "Kurznachricht", recipient: "Hallo,",
  source: "telc Übungstest (neu) · Schreiben (Kurznachricht)",
  situation: "Neues telc-Format: Antworten Sie auf die Kurznachricht. Schreiben Sie mehr als ein Wort und zeigen Sie, was Sie können.\n\n„Kommst du am Dienstag zum Training?“ — Sie antworten: „Nein, diesen Dienstag habe ich keine Zeit.“ — Nachfrage: „Was machst du denn?“",
  leitpunkte: ["Antworten Sie höflich und in ganzen Sätzen.", "Sagen Sie, was Sie am Dienstag stattdessen machen.", "Vergessen Sie Anrede und Gruß nicht."]
});

// ---------------------------------------------------------------- SPRECHEN
// index 6 — telc Übungstest 1, Teil 2
CONTENT.sprechen.push({
  teil: 2, type: "meinung",
  source: "telc Übungstest 1 · Mündlich Teil 2",
  topic: "Thema „Gruppenreisen“. Sabine (33): „Ich verreise gern in einer Gruppe – man lernt neue Leute kennen und hat immer Gesellschaft; ein Reiseführer zeigt die Sehenswürdigkeiten.“ Jens (39): „Ich reise immer allein – in einer Gruppe gibt es ein festes Programm; ich möchte nach Lust und Laune ausschlafen oder etwas besichtigen.“ Berichten Sie darüber und sagen Sie Ihre Meinung.",
  cues: ["Vorteile von Gruppenreisen (Leute kennenlernen, Reiseführer, Gesellschaft)", "Nachteile (festes Programm, weniger Freiheit)", "Ihre eigene Meinung mit einer eigenen Erfahrung", "Reagieren Sie auf Ihren Partner: „Was denkst du dazu?“"]
});
// index 7 — telc Übungstest 1, Teil 3
CONTENT.sprechen.push({
  teil: 3, type: "planen",
  source: "telc Übungstest 1 · Mündlich Teil 3",
  topic: "Sie haben im Urlaub nette Deutsche kennengelernt. Bevor alle wieder nach Hause fahren, möchten Sie eine Abschiedsparty feiern. Planen Sie die Party gemeinsam und entscheiden Sie, wer welche Aufgaben übernimmt.",
  cues: ["Wann und wo?", "Essen", "Getränke", "Wer bezahlt wofür?"]
});
// index 8 — Goethe/ÖSD Modellsatz, Sprechen Teil 1
CONTENT.sprechen.push({
  teil: 3, type: "planen",
  source: "Goethe/ÖSD Modellsatz · Sprechen Teil 1 (gemeinsam planen)",
  topic: "Ein Teilnehmer aus Ihrem Deutschkurs hatte einen Unfall und liegt im Krankenhaus. Diese Woche möchten Sie ihn mit einem Geschenk der ganzen Gruppe besuchen. Nächste Woche darf er nach Hause – da er allein lebt, braucht er Hilfe. Planen und entscheiden Sie gemeinsam.",
  cues: ["Wann besuchen? (Tag, Uhrzeit)", "Wie hinkommen?", "Was mitnehmen? (Geschenk der Gruppe)", "Wie helfen? (vom Krankenhaus abholen, einkaufen …)"]
});
