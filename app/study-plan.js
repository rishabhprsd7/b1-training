// B1 Sprint — the 15-day study plan (1–15 July 2026, exam = Tag 15).
//
// Built by working through the five real model tests supplied by the learner and
// the in-app practice pools (content.js). No invented exam content: the daily
// "Modelltest-Aufgabe" points at concrete modules of the actual papers, and the
// in-app tasks reuse the existing decks/exercises. Structure confirmed across the
// papers: telc Deutsch B1 / Zertifikat Deutsch — Schriftlich 150 Min (Lesen +
// Sprachbausteine + Hören + Schreiben), Mündlich ~15 Min (kennenlernen · Thema ·
// planen). Bestehen: 60 % in JEDEM Teil, keine Kompensation (135/225 · 45/75).
//
// The five papers:
export const PAPERS = {
  P1: { label: "telc Übungstest 1", full: "telc Deutsch B1 · Übungstest 1 (2020)" },
  P2: { label: "Zertifikat Deutsch Übungstest", full: "Zertifikat Deutsch B1 · Übungstest (ZD)" },
  P3: { label: "telc Übungstest (neu)", full: "telc Deutsch B1 · Übungstest (neuere Form: Lesen/Hören 4 Teile, Kurznachricht)" },
  P4: { label: "Goethe/ÖSD Modellsatz", full: "Goethe·ÖSD Zertifikat B1 · Modellsatz Erwachsene" },
  P5: { label: "telc B1a Probe", full: "telc Deutsch B1a · Probe (Auszug: Lesen + Sprachbausteine)" }
};

// deck / lesen / hoeren / schreiben / sprechen / grammatik = index into the
// matching CONTENT.* array. bausteineStart = first question index in the pool.
// paper = key in PAPERS; paperTask = the concrete module(s) to do that day.
export const STUDY_PLAN = [
  { day: 1, date: "2026-07-01", phase: "Grundlagen",
    focus: "Routine starten · Arbeit & Beruf",
    deck: 0, lesen: 0, hoeren: 0, schreiben: 0, sprechen: 0, grammatik: 0, bausteineStart: 0,
    bausteineFocus: "Verben mit Präposition (sich bewerben um, warten auf)",
    paper: "P1", paperTask: "Leseverstehen Teil 1 (Überschriften a–j → 5 Texte) + Teil 2 (Zeitungsartikel + 5 MC). Ohne Zeitdruck, Format kennenlernen, danach Lösungen prüfen.",
    goal: "Alle 7 Kategorien einmal durchlaufen, Tagesroutine aufbauen, Deck „Arbeit & Beruf“ lernen.",
    tip: "Sprachbausteine sind die günstigsten Punkte – hochgradig musterbasiert. Jeden Tag 10 Stück." },

  { day: 2, date: "2026-07-02", phase: "Grundlagen",
    focus: "Reise & Verkehr · Konnektoren",
    deck: 1, lesen: 2, hoeren: 1, schreiben: 1, sprechen: 1, grammatik: 1, bausteineStart: 6,
    bausteineFocus: "Konnektoren & Wortstellung (weil / obwohl / damit)",
    paper: "P1", paperTask: "Leseverstehen Teil 3 (10 Situationen → 12 Anzeigen, „x“ wenn nichts passt) + Sprachbausteine Teil 1 & 2.",
    goal: "Leseverstehen Teil 2 & 3 sicher lösen. Deck „Reise“ lernen.",
    tip: "Bei Lesen Teil 2 zuerst die Fragen lesen – ihre Reihenfolge folgt NICHT immer dem Text." },

  { day: 3, date: "2026-07-03", phase: "Grundlagen",
    focus: "Gesundheit · Reflexive Verben",
    deck: 2, lesen: 4, hoeren: 2, schreiben: 2, sprechen: 3, grammatik: 2, bausteineStart: 12,
    bausteineFocus: "Reflexivpronomen (mich / mir)",
    paper: "P1", paperTask: "Hörverstehen Teil 1–3 (Ansagen, Gespräch, Interview). Aufgaben VOR dem Hören lesen; Teil 1 nur einmal hören.",
    goal: "Hörstrategie aufbauen. Deck „Gesundheit“ lernen.",
    tip: "Bei Lesen Teil 3 zuerst die Situation (Schlüsselwörter) verstehen, dann die Anzeigen scannen." },

  { day: 4, date: "2026-07-04", phase: "Grundlagen",
    focus: "Wohnen & Alltag · Wechselpräpositionen",
    deck: 3, lesen: 1, hoeren: 3, schreiben: 3, sprechen: 2, grammatik: 3, bausteineStart: 18,
    bausteineFocus: "Wechselpräpositionen (Wo? Dativ / Wohin? Akkusativ)",
    paper: "P1", paperTask: "Schriftlicher Ausdruck: Mariannes E-Mail beantworten (Ausflüge · beste Jahreszeit · Kleidung · Reisevorbereitung) in 30 Min. Danach Sprechen Teil 1–3 durchlesen.",
    goal: "Erste vollständige Brief-Antwort mit allen 4 Punkten. Deck „Wohnen & Alltag“.",
    tip: "Hören Teil 1 wird nur EINMAL gespielt – Aufgaben vorher lesen ist Pflicht." },

  { day: 5, date: "2026-07-05", phase: "Grundlagen",
    focus: "Umwelt · Genitiv",
    deck: 4, lesen: 3, hoeren: 0, schreiben: 4, sprechen: 4, grammatik: 4, bausteineStart: 24,
    bausteineFocus: "Genitiv (trotz / während / wegen + Genitiv)",
    paper: "P5", paperTask: "telc B1a Probe: Leseverstehen Teil 1–3 (u. a. „Von Fitmachern und Müdemachern“, anonyme Bewerbung, Zukunftsberufe) + Sprachbausteine 1 & 2. Kurz & auf Zeit, Lösungen prüfen.",
    goal: "Zweites Lese-/Sprachbausteine-Set als Vergleich. Deck „Umwelt“.",
    tip: "Beim Schreiben alle 4 Leitpunkte abhaken – ein fehlender Punkt kostet stark bei „Aufgabenbewältigung“." },

  { day: 6, date: "2026-07-06", phase: "Ausbau",
    focus: "Familie & Soziales · Woche-1-Review",
    deck: 5, lesen: 5, hoeren: 1, schreiben: 5, sprechen: 5, grammatik: 0, bausteineStart: 30,
    bausteineFocus: "Relativpronomen (der / das / dem / deren)",
    paper: "P2", paperTask: "Zertifikat-Deutsch-Übungstest: Leseverstehen komplett (alle Teile). Themen notieren, unbekannte Wörter sammeln.",
    goal: "Deck „Familie“ + kurze Wiederholung „Arbeit“ und „Gesundheit“.",
    tip: "Wiederholung schlägt Neues: die zum Review markierten Karten von gestern zuerst." },

  { day: 7, date: "2026-07-07", phase: "Ausbau",
    focus: "Bildung & Lernen · Halbzeit-Check",
    deck: 6, lesen: 0, hoeren: 2, schreiben: 0, sprechen: 0, grammatik: 1, bausteineStart: 0,
    bausteineFocus: "Gemischt – Tempo testen",
    paper: "P2", paperTask: "HALBZEIT auf Zeit: Leseverstehen + Sprachbausteine zusammen in 90 Min (echte Prüfungszeit). Danach Hörverstehen starten.",
    goal: "Zeitgefühl für den schriftlichen Teil entwickeln. Deck „Bildung“.",
    tip: "Sprachbausteine zügig lösen, damit genug Zeit fürs Lesen bleibt – zusammen nur 90 Min." },

  { day: 8, date: "2026-07-08", phase: "Ausbau",
    focus: "Konnektoren-Deck · Satzbau",
    deck: 7, lesen: 2, hoeren: 3, schreiben: 1, sprechen: 1, grammatik: 2, bausteineStart: 16,
    bausteineFocus: "Konjunktiv II (hätte / würde)",
    paper: "P2", paperTask: "Zertifikat-Deutsch-Übungstest: Hörverstehen komplett + Schriftlicher Ausdruck (Brief). Sprechen Teil 1–3 laut durchgehen.",
    goal: "Konnektoren aktiv beherrschen – sie tragen Schreiben UND Sprechen. Deck „Konnektoren“.",
    tip: "deshalb/trotzdem → Verb Position 2; weil/obwohl/damit → Verb ans Ende. Punkte in jedem Teil." },

  { day: 9, date: "2026-07-09", phase: "Ausbau",
    focus: "Verben mit Präposition · neues Testformat",
    deck: 8, lesen: 4, hoeren: 0, schreiben: 2, sprechen: 3, grammatik: 3, bausteineStart: 30,
    bausteineFocus: "Passiv (wurde … / ist … worden)",
    paper: "P3", paperTask: "telc Übungstest (neu): Leseverstehen Teil 1–4 kennenlernen (neueres Format mit 4 Teilen). Unterschiede zum klassischen ZD notieren.",
    goal: "Feste Verb-Präposition-Paare sicher. Neues Testformat kennenlernen. Deck „Verben mit Präposition“.",
    tip: "Lerne Verb + Präposition + Kasus immer als EIN Paket: „sich freuen auf + Akkusativ“." },

  { day: 10, date: "2026-07-10", phase: "Vertiefung",
    focus: "Review Schwachstelle: Gesundheit",
    deck: 2, lesen: 1, hoeren: 1, schreiben: 3, sprechen: 2, grammatik: 4, bausteineStart: 31,
    bausteineFocus: "Verben mit Präposition (denken an, warten auf, Angst vor)",
    paper: "P3", paperTask: "telc Übungstest (neu): Hörverstehen Teil 1–4 (inkl. Teil 4 „fünf Meinungen zuordnen“) + Sprachbausteine.",
    goal: "Schwierige Decks gezielt wiederholen. Volles Hörverstehen im neuen Format.",
    tip: "Nur die Karten wiederholen, die du „nochmal üben“ markiert hast – dort sitzt der Lerngewinn." },

  { day: 11, date: "2026-07-11", phase: "Vertiefung",
    focus: "Review Schwachstelle: Arbeit & Beruf",
    deck: 0, lesen: 3, hoeren: 2, schreiben: 4, sprechen: 4, grammatik: 0, bausteineStart: 25,
    bausteineFocus: "Adjektivendungen (ein neues / einen warmen)",
    paper: "P3", paperTask: "telc Übungstest (neu): Schreiben (E-Mail beantworten + kurze Nachricht) + Sprechen Teil 2 „Gemeinsam planen“ und Teil 3 „Meinung begründen“.",
    goal: "Bewerbungs-/Berufswortschatz festigen (häufiges Prüfungsthema). Neue Schreib-Aufgabentypen üben.",
    tip: "Die Kurznachricht ist neu: kurz, situationsgerecht, mit Anrede & Gruß – nicht unterschätzen." },

  { day: 12, date: "2026-07-12", phase: "Prüfungssimulation",
    focus: "Kompletter schriftlicher Test (Simulation)",
    deck: 1, lesen: 5, hoeren: 3, schreiben: 5, sprechen: 5, grammatik: 1, bausteineStart: 6,
    bausteineFocus: "Gemischt unter Prüfungsbedingungen",
    special: "mock-written",
    paper: "P4", paperTask: "VOLLSIMULATION am Stück: Goethe/ÖSD Modellsatz – Lesen (65 Min) + Hören (40 Min) + Schreiben (60 Min), ohne Pause. Punkte im Mock-Test-Protokoll eintragen.",
    goal: "Den kompletten schriftlichen Teil unter echten Bedingungen durchziehen und selbst bewerten.",
    tip: "Danach Punkte gegen 135 (schriftlich) prüfen. Jeden Fehler notieren – das ist dein Plan für morgen." },

  { day: 13, date: "2026-07-13", phase: "Prüfungssimulation",
    focus: "Fehleranalyse & gezieltes Nacharbeiten",
    deck: 4, lesen: 0, hoeren: 0, schreiben: 0, sprechen: 0, grammatik: 2, bausteineStart: 12,
    bausteineFocus: "Genau die Muster wiederholen, die gestern falsch waren",
    paper: "P4", paperTask: "Goethe/ÖSD Modellsatz: alle Fehler von gestern durchgehen (Transkriptionen & Lösungen lesen) + Sprechen Teil 2 (Präsentation zu 5 Folien) laut üben.",
    goal: "Jeden Fehler aus der Simulation verstehen und den Typ noch einmal üben. Sprechen laut trainieren.",
    tip: "Sprich Teil 2 wirklich 3 Min am Stück. Nutze „Meiner Meinung nach …“ und frag „Was denkst du dazu?“." },

  { day: 14, date: "2026-07-14", phase: "Feinschliff",
    focus: "Zweite Simulation & mündliche Generalprobe",
    deck: 7, lesen: 2, hoeren: 1, schreiben: 1, sprechen: 3, grammatik: 4, bausteineStart: 0,
    special: "mock-oral",
    paper: "P1", paperTask: "Generalprobe: den stärksten Test (telc Übungstest 1) schriftlich auf Zeit wiederholen + die MÜNDLICHE Prüfung komplett simulieren (Teil 1 kennenlernen · Teil 2 Thema · Teil 3 planen).",
    goal: "Letzte Vollprobe schriftlich + mündlich. Danach früh schlafen.",
    tip: "Morgen ist Prüfung: Ausweis + Anmeldung + Stift (kein Bleistift) bereitlegen. Nichts Neues mehr lernen." },

  { day: 15, date: "2026-07-15", phase: "Prüfungstag",
    focus: "Prüfungstag – kurzes Aufwärmen",
    deck: 0, lesen: 0, hoeren: 0, schreiben: 0, sprechen: 0, grammatik: 1, bausteineStart: 0,
    special: "exam-day",
    paper: "P4", paperTask: "Nur überfliegen: eine Leseverstehen-Teil-3-Aufgabe + die Redemittel (Schreibhilfe & Sprechhilfe). Kein neuer Stoff.",
    goal: "Leicht aufwärmen: 5 Min Karten durchblättern, Redemittel überfliegen. Kein Stress.",
    tip: "Hören: Aufgaben immer VORHER lesen. Schreiben: alle 4 Leitpunkte. Sprechen: frei reden, Partner einbeziehen. Viel Erfolg! 🍀" }
];

export const PHASE_ORDER = ["Grundlagen", "Ausbau", "Vertiefung", "Prüfungssimulation", "Feinschliff", "Prüfungstag"];
