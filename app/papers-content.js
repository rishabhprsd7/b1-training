// B1 Sprint — REAL exercises lifted from the supplied telc model tests.
// (telc only — the Goethe/ÖSD Modellsatz is a different exam and is not used.)
// Every item is transcribed from the actual PDFs and tagged with `source`.
// This module appends the items to the existing CONTENT pools (mutating the
// shared arrays) at fixed, documented indices that study-plan.js points at.
// Answer keys: telc B1a solutions are printed in that paper; the telc Übungstest
// Sprachbausteine answers are derived from the unambiguous grammar of the text.
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
// index 7 — telc Übungstest (neu): Kurznachricht
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

// ---------------------------------------------------------------- WORTSCHATZ (eigenes Material)
// Reflexive Verben — transcribed from the learner's own handwritten study sheet
// (reflexive_verb.pdf, scanned). German verb + the sheet's English meaning; short
// correct B1 example added for each card. Appended as a new deck (index 9).
CONTENT.decks.push({
  id: "reflexiv", de: "Reflexive Verben", en: "Reflexive verbs (dein PDF)",
  source: "Eigene Reflexive-Verben-Liste (dein PDF)",
  cards: [
    // 1) Feste reflexive Verben (oft + Präposition)
    { de: "sich ausruhen", en: "to relax / rest", ex: "Nach der Arbeit ruhe ich mich eine Stunde aus." },
    { de: "sich bedanken für / bei", en: "to thank for", ex: "Ich bedanke mich für deine Hilfe." },
    { de: "sich beeilen", en: "to hurry", ex: "Beeil dich, der Bus kommt gleich!" },
    { de: "sich beschweren bei / über", en: "to complain (to / about)", ex: "Er beschwert sich beim Kellner über das Essen." },
    { de: "sich betrinken", en: "to get drunk", ex: "Auf der Party hat er sich betrunken." },
    { de: "sich bewerben um", en: "to apply for", ex: "Ich bewerbe mich um eine neue Stelle." },
    { de: "sich erholen", en: "to relax / recover", ex: "Im Urlaub erhole ich mich vom Stress." },
    { de: "sich erkälten", en: "to catch a cold", ex: "Zieh dich warm an, sonst erkältest du dich." },
    { de: "sich freuen auf / über", en: "to look forward to / be happy about", ex: "Ich freue mich auf das Wochenende." },
    { de: "sich erkundigen nach / über", en: "to enquire after / about", ex: "Ich erkundige mich nach den Öffnungszeiten." },
    { de: "sich kümmern um", en: "to take care of", ex: "Ich kümmere mich um die Kinder." },
    { de: "sich konzentrieren auf", en: "to concentrate on", ex: "Beim Lernen konzentriere ich mich auf die Grammatik." },
    { de: "sich schämen", en: "to be ashamed", ex: "Er schämt sich für seinen Fehler." },
    { de: "sich setzen", en: "to sit down", ex: "Bitte setzen Sie sich!" },
    { de: "sich sonnen", en: "to sunbathe", ex: "Am Strand sonnen wir uns." },
    { de: "sich umschauen", en: "to look around", ex: "Im Geschäft schaue ich mich erst einmal um." },
    { de: "sich verlieben in", en: "to fall in love with", ex: "Sie hat sich in ihn verliebt." },
    { de: "sich verloben mit", en: "to get engaged to", ex: "Er hat sich mit seiner Freundin verlobt." },
    { de: "sich wundern über", en: "to wonder / be surprised about", ex: "Ich wundere mich über sein Verhalten." },
    // 2) Subjekt = Objekt (nicht fest reflexiv)
    { de: "sich abtrocknen", en: "to dry oneself", ex: "Nach dem Duschen trockne ich mich ab." },
    { de: "sich anziehen", en: "to get dressed / put on (clothes)", ex: "Ich ziehe mich schnell an." },
    { de: "sich ausziehen", en: "to get undressed / take off (clothes)", ex: "Am Abend ziehe ich mich aus." },
    { de: "sich ändern", en: "to change", ex: "Mit der Zeit ändert man sich." },
    { de: "sich ärgern über", en: "to be annoyed about", ex: "Ich ärgere mich über den Lärm." },
    { de: "sich anstrengen", en: "to make an effort / strain oneself", ex: "Für die Prüfung muss ich mich anstrengen." },
    { de: "sich anmelden für", en: "to register / sign up for", ex: "Ich melde mich für einen Deutschkurs an." },
    { de: "sich aufregen über", en: "to get worked up about", ex: "Reg dich nicht über die Politik auf!" },
    { de: "sich bewegen", en: "to move (oneself)", ex: "Du solltest dich mehr bewegen." },
    { de: "sich beklagen über", en: "to complain about", ex: "Sie beklagt sich über die Kälte." },
    { de: "sich beschäftigen mit", en: "to occupy oneself with", ex: "Ich beschäftige mich mit Kunst." },
    { de: "sich duschen", en: "to take a shower", ex: "Morgens dusche ich mich." },
    { de: "sich eincremen", en: "to apply cream", ex: "Nach dem Sonnen creme ich mich ein." },
    { de: "sich ekeln vor", en: "to be disgusted by", ex: "Ich ekle mich vor Spinnen." },
    { de: "sich engagieren für", en: "to get involved / commit oneself to", ex: "Sie engagiert sich für den Umweltschutz." },
    { de: "sich entscheiden für", en: "to decide on", ex: "Ich habe mich für das blaue Auto entschieden." },
    { de: "sich entschuldigen für / bei", en: "to apologize (for / to)", ex: "Ich entschuldige mich für die Verspätung." },
    { de: "sich entspannen", en: "to relax", ex: "Beim Musikhören entspanne ich mich." },
    { de: "sich erinnern an", en: "to remember", ex: "Erinnerst du dich an den Urlaub?" },
    { de: "sich erschrecken", en: "to be frightened / shocked", ex: "Ich habe mich sehr erschrocken." },
    { de: "sich fragen", en: "to wonder", ex: "Ich frage mich, ob das stimmt." },
    { de: "sich fühlen", en: "to feel", ex: "Ich fühle mich heute viel besser." },
    { de: "sich fürchten vor", en: "to be afraid of", ex: "Das Kind fürchtet sich vor dem Hund." },
    { de: "sich gewöhnen an", en: "to get used to", ex: "Ich gewöhne mich langsam an das Wetter." },
    { de: "sich informieren über", en: "to inform oneself about", ex: "Ich informiere mich über die Reise." },
    { de: "sich interessieren für", en: "to be interested in", ex: "Wir interessieren uns für Politik." },
    { de: "sich kennenlernen", en: "to get to know each other", ex: "Wir haben uns im Kurs kennengelernt." },
    { de: "sich kämmen", en: "to comb one's hair", ex: "Ich kämme mich vor dem Spiegel." },
    { de: "sich nähern", en: "to approach / come near", ex: "Der Zug nähert sich dem Bahnhof." },
    { de: "sich orientieren", en: "to orient oneself", ex: "In der neuen Stadt muss ich mich erst orientieren." },
    { de: "sich rasieren", en: "to shave", ex: "Morgens rasiere ich mich." },
    { de: "sich schminken", en: "to put on makeup", ex: "Sie schminkt sich für die Party." },
    { de: "sich schneiden", en: "to cut oneself", ex: "Ich habe mich in den Finger geschnitten." },
    { de: "sich streiten", en: "to argue", ex: "Die Geschwister streiten sich oft." },
    { de: "sich sorgen um", en: "to be worried about", ex: "Die Mutter sorgt sich um ihr Kind." },
    { de: "sich treffen", en: "to meet", ex: "Wir treffen uns um acht Uhr." },
    { de: "sich trennen von", en: "to separate from", ex: "Sie hat sich von ihm getrennt." },
    { de: "sich umziehen", en: "to change clothes", ex: "Nach der Arbeit ziehe ich mich um." },
    { de: "sich unterhalten mit / über", en: "to converse (with / about)", ex: "Wir unterhalten uns über den Film." },
    { de: "sich verabreden mit", en: "to arrange to meet", ex: "Ich habe mich mit Freunden verabredet." },
    { de: "sich verabschieden von", en: "to say goodbye to", ex: "Ich verabschiede mich von den Gästen." },
    { de: "sich verändern", en: "to change", ex: "Die Stadt hat sich stark verändert." },
    { de: "sich verhalten / sich benehmen", en: "to behave (oneself)", ex: "Die Kinder haben sich gut benommen." },
    { de: "sich verkleiden", en: "to dress up (in costume)", ex: "Zu Karneval verkleiden wir uns." },
    { de: "sich verlassen auf", en: "to rely on", ex: "Du kannst dich auf mich verlassen." },
    { de: "sich verletzen", en: "to injure oneself", ex: "Beim Sport hat er sich verletzt." },
    { de: "sich verstehen mit", en: "to get along with", ex: "Ich verstehe mich gut mit meinen Kollegen." },
    { de: "sich vorbereiten auf", en: "to prepare for", ex: "Ich bereite mich auf die Prüfung vor." },
    { de: "sich waschen", en: "to wash oneself", ex: "Ich wasche mich mit warmem Wasser." },
    { de: "sich wenden an", en: "to turn to (for help)", ex: "Bei Problemen wende ich mich an den Lehrer." },
    { de: "sich vorstellen", en: "to introduce oneself; (Dativ) to imagine", ex: "Darf ich mich vorstellen? – Das kann ich mir gut vorstellen." },
    // 3) Akkusativ-reflexiv, aber mit Akkusativ-Objekt → Dativ-reflexiv
    { de: "sich (Dativ) etwas ansehen", en: "to look at sth", ex: "Ich sehe mir den Film an." },
    { de: "sich (Dativ) etwas überlegen", en: "to consider sth", ex: "Ich überlege mir die Sache noch einmal." },
    { de: "sich (Dativ) etwas wünschen", en: "to wish for sth", ex: "Zum Geburtstag wünsche ich mir ein Fahrrad." },
    { de: "sich (Dativ) die Hände waschen", en: "to wash one's hands (Dativ + Akk-Objekt)", ex: "Vor dem Essen wasche ich mir die Hände." },
    { de: "sich stoßen an (+ Dativ)", en: "to bump into", ex: "Ich habe mich am Tisch gestoßen." },
    { de: "sich verbrennen", en: "to burn oneself", ex: "Ich habe mich an der heißen Pfanne verbrannt." }
  ]
});

// ---------------------------------------------------------------- LESEVERSTEHEN (telc Übungstest 1)
// Verified against the paper's Lösungsschlüssel (page 41):
//   Teil 1: 1i 2d 3b 4f 5h   ·   Teil 2: 6c 7c 8b 9a 10a
// index 9 — Übungstest 1, Lesen Teil 1 (Überschriften)
CONTENT.lesen.push({
  type: "headline", source: "telc Übungstest 1 · Leseverstehen Teil 1",
  title: "Teil 1 — Überschriften zuordnen",
  intro: "Lesen Sie die 10 Überschriften a–j und die 5 Texte. Finden Sie für jeden Text die passende Überschrift. Jede Überschrift nur einmal.",
  texts: [
    { n: 1, body: "Wer ist der typische Computerfan? Das B.A.T. Freizeitforschungsinstitut Hamburg ermittelte einige Eigenschaften: Er ist männlich, jung und hat einen höheren Schulabschluss. Bei der Beschäftigung am heimischen Computer stehen Textverarbeitung und Spiele ganz oben, es folgen private Buchhaltung, Grafikprogramme und Tabellenkalkulation.", sol: "i" },
    { n: 2, body: "„Bahn&Bike“ heißt ein 222-seitiger Prospekt, den die Deutsche Bahn AG in Zusammenarbeit mit der Deutschen Zentrale für Tourismus herausgebracht hat und der wichtige Informationen für jene bereitstellt, die ihren Radurlaub mit Bahnfahren verbinden wollen. Das Motto lautet: Hin mit der Bahn – das Rad vor Ort mieten.", sol: "d" },
    { n: 3, body: "Ausführliche Informationen zum Thema „Schlafstörungen“ finden Sie im gleichnamigen Patientenratgeber von Dr. med. Fritz Hohagen. Sie erfahren, was den Schlaf stört und was Sie dagegen unternehmen können. Für 9,95 Euro erhalten Sie das Buch in Apotheken oder direkt beim Wort&Bild Verlag.", sol: "b" },
    { n: 4, body: "Jetzt wird für Familien Reisen mit der Bahn zwischen Österreich und Deutschland noch ein gutes Stück günstiger. Denn ab 6. Oktober gibt es den Familien-Super-Sparpreis. Ein echter Traumpreis für die ganze Familie – vom Baby bis zum Großpapa – da kann man wirklich sparen.", sol: "f" },
    { n: 5, body: "Touristen zwischen 14 und 29 Jahren sowie zwischen 40 und 49 Jahren haben ein besonders großes Interesse an der Kultur des jeweiligen Reiselandes, während die Gruppe der 30- bis 39-jährigen im Urlaub „eine Kulturpause einlegt“. Grundsätzlich gelte: Je höher das Einkommen und die Schulbildung, umso mehr besteht im Urlaub der Wunsch, Land und Leute kennenzulernen.", sol: "h" }
  ],
  headlines: [
    { id: "a", text: "Immer mehr deutsche Familien reisen mit der Bahn" },
    { id: "b", text: "Buchtipp: Hilfe bei Schlafproblemen" },
    { id: "c", text: "Der Computer: Liebstes Hobby von Deutschlands Frauen" },
    { id: "d", text: "Neu bei der Bahn: Spezielle Informationen und Angebote für Radfahrer" },
    { id: "e", text: "Neu am Markt: Billige Schlaftabletten" },
    { id: "f", text: "Familien reisen billiger" },
    { id: "g", text: "Urlaub mit dem Fahrrad in Deutschland immer beliebter" },
    { id: "h", text: "Kultur im Urlaub: Interessen je nach Alter unterschiedlich" },
    { id: "i", text: "Umfrage: Wer verwendet den Computer am häufigsten?" },
    { id: "j", text: "Deutschland: Immer mehr Touristen reisen in den Westen" }
  ]
});
// index 10 — Übungstest 1, Lesen Teil 2 (Büro-Werkstatt)
CONTENT.lesen.push({
  type: "mc", source: "telc Übungstest 1 · Leseverstehen Teil 2",
  title: "Teil 2 — Lesen & Multiple Choice",
  intro: "Lesen Sie den Text „Büro-Werkstatt: Chance für behinderte Menschen“ und die Aufgaben 6–10. Welche Lösung (a, b oder c) ist richtig?",
  text: "Computerarbeit im Auftrag privater Firmen – jeder Dritte findet nach einem fünfmonatigen Kurs einen Job. Margit, die junge Frau im Rollstuhl, erledigt die Lohnverrechnung für einen Verlag. Reinhard, seit der Geburt gehbehindert, tippt für die Direktion Protokolle und Preislisten. Alle drei können auf eine abgeschlossene kaufmännische Ausbildung verweisen, wurden aber auf dem Arbeitsamt als „schwer vermittelbar“ eingestuft.\n\nZurzeit arbeiten sie in der „Büro-Werkstatt“ in Wien-Stadlau. In einem fünfmonatigen Kurs lernen sie, das in der Schule Gelernte in die Praxis umzusetzen. Ihre Dienste werden von Privatfirmen zugekauft. Gleichzeitig wird ihnen bei der Jobsuche geholfen. „Leicht ist das nicht“, sagt Betreuer Günther Hos. Zwar wären die Firmen gesetzlich verpflichtet, pro 25 Beschäftigte einen Behinderten einzustellen; die meisten nutzen jedoch die Möglichkeit, sich per „Ausgleichstaxe“ (rund 150 Euro monatlich) freizukaufen.\n\n„Immerhin haben wir seit der Vereinsgründung vor drei Jahren ein Drittel unserer Leute untergebracht“, sagt Hos. Gegründet wurde die Büro-Werkstatt von der Lehrerin Heide Hanisch, die nicht länger hinnehmen wollte, dass ihre behinderten Schüler ausgebildet werden, um dann als Arbeitnehmer nicht gebraucht zu werden.",
  questions: [
    { q: "In einem fünfmonatigen Kurs können die Teilnehmer …", options: ["praktische Erfahrungen mit der Büroarbeit sammeln.", "eine berufliche Ausbildung abschließen.", "lernen, was sie in der Schule verpasst haben."], answer: "praktische Erfahrungen mit der Büroarbeit sammeln." },
    { q: "Die Büro-Werkstatt versucht außerdem, …", options: ["für die behinderten Menschen eine Arbeit zu finden.", "auch nicht behinderten Arbeitslosen zu helfen.", "Behinderte auf die Abschlussprüfungen vorzubereiten."], answer: "für die behinderten Menschen eine Arbeit zu finden." },
    { q: "Laut Gesetz müssen österreichische Firmen pro 25 Beschäftigte …", options: ["einen Behinderten einstellen oder eine monatliche Gebühr bezahlen.", "eine besondere Steuer zahlen.", "für jeden Behinderten monatlich 150 Euro bezahlen."], answer: "einen Behinderten einstellen oder eine monatliche Gebühr bezahlen." },
    { q: "Seit der Vereinsgründung …", options: ["konnte für ein Drittel der behinderten Kursteilnehmer eine Arbeit gefunden werden.", "konnte Günther Hos für den Verein schon viel Geld sparen.", "zahlen Arbeitslose um ein Drittel weniger Steuern."], answer: "konnte für ein Drittel der behinderten Kursteilnehmer eine Arbeit gefunden werden." },
    { q: "Die Lehrerin, die die Büro-Werkstatt gegründet hat, …", options: ["wollte etwas tun, damit Behinderte einen Arbeitsplatz erhalten.", "wollte nicht länger Geografie und Geschichte unterrichten.", "wird nach der Ausbildung der Behinderten nicht mehr gebraucht."], answer: "wollte etwas tun, damit Behinderte einen Arbeitsplatz erhalten." }
  ]
});
