# B1 Sprint Daily Trainer

_Started 2026-06-30 15:20 UTC_

---

## User

Build me a single-page German exam prep website called "B1 Sprint" — a daily-practice training companion for the telc Deutsch B1 / Zertifikat Deutsch exam on July 15, 2026. I have very little time, so the site's whole job is to give me a fixed daily session of 1–2 hours that practices ALL exam modules every single day and tracks completion day by day.
About me (the user): I'm at B2.2 level in class but struggle with it; my single biggest weakness is vocabulary. I learn best from structured, repeatable routines. The site should feel like a daily workout plan, not a textbook.
THE CENTRAL FEATURE — a daily session that covers every category:
Build a "Heute" (Today) dashboard as the homepage. It shows a checklist of categories that I must complete each day. Every category has a small, finishable daily task (sized so the whole set takes 1–2 hours total). When I finish all categories, the day is marked complete; the checklist resets the next day, and a streak counter ticks up. Show a daily progress ring/bar ("4 of 7 done today") and a multi-day streak tracker.
The daily categories (each must have a bite-sized daily task):

Wortschatz (Vocabulary) — make this the biggest/most prominent since it's my weakness. Daily target: ~15–20 flashcards from a rotating theme. Cards flip, track known/review, show progress.
Sprachbausteine (Grammar/Vocab gaps) — daily set of ~10 gap-fill questions (multiple-choice + word-bank style).
Leseverstehen (Reading) — one short reading task per day (rotate the 3 task types: headline-matching, multiple-choice on a text, situation-to-ad matching).
Hörverstehen (Listening) — one daily listening-style richtig/falsch task or transcript-reading drill.
Schriftlicher Ausdruck (Writing) — every day, write one short email answering 4 Leitpunkte, using the provided template + phrase bank.
Mündlicher Ausdruck (Speaking) — daily speaking prompt + phrase bank to practice aloud (proposing/agreeing/disagreeing/compromise; remember to ask the partner "Was denkst du dazu?").
Grammatik-Review — one quick daily grammar refresher (rotate: Präpositionen, Konnektoren, reflexive Verben, Wechselverben, Genitiv).

Each category card shows: its name (German + short English), today's specific task, a "mark done" toggle, and time estimate. Tapping a card opens that day's exercise inline.
Use the REAL exam structure (exact facts) so tasks mirror the test:
Written exam = 150 min, 225 points; oral = 75 points; must hit 60% in EACH part separately (135 written / 45 oral — no compensation between them). Weighting: Leseverstehen 25%, Sprachbausteine 10%, Hörverstehen 25%, Schreiben 15%, Sprechen 25%.

Leseverstehen: Teil 1 match 5 headlines→5 texts; Teil 2 = 5 MC on one text; Teil 3 = match 10 situations→12 ads (mark "x" if none fits).
Sprachbausteine: Teil 1 = 10 MC gaps (a/b/c); Teil 2 = fill 10 gaps from 15 words. Note it's highly pattern-based — the cheapest points.
Hörverstehen: Teil 1 = 5 R/F played ONCE only; Teil 2 = 10 R/F twice; Teil 3 = 5 R/F twice. Tip: read questions before audio.
Schreiben: one informal/semi-formal email, 4 Leitpunkte, 30 min. Scored on Aufgabenbewältigung (cover all 4), Kommunikative Gestaltung, Formale Richtigkeit.
Sprechen: paired, ~15 min, 20 min prep — Teil 1 kennenlernen, Teil 2 über ein Thema sprechen (opposing opinions), Teil 3 gemeinsam etwas planen.

Vocabulary decks (centerpiece): thematic flashcard sets for telc B1 topics — Arbeit/Beruf, Reise, Gesundheit, Wohnen/Alltag, Umwelt, Familie, Bildung — plus a Konnektoren deck (deshalb, obwohl, trotzdem, weil, damit) and a fixed-preposition reflexive-verb deck (sich freuen auf, sich bewerben um, sich kümmern um). Each card: German word, English meaning, example sentence.
Supporting sections (below the Heute dashboard):

Persistent countdown to July 15 + my pass thresholds (135 / 45) in the hero.
Writing helper: email template (Anrede → Einleitung → 4 Leitpunkte → Schluss → Grußformel) + phrase bank + "all 4 points covered?" checklist.
Speaking helper: phrase banks for proposing/agreeing/disagreeing/compromise.
Mock-test log: I enter my self-scored points per section against the 60% thresholds; show pass/fail per part.

Design direction: Clean, calm, exam-focused — serious "German certification" feel, but avoid the cream-serif-terracotta cliché. Disciplined two-color palette plus neutrals; strong display face paired with a highly readable body face (the site is dense with German). Mobile-responsive, keyboard-accessible, calm motion only. The daily checklist completing, the streak incrementing, and flashcard progress should feel rewarding and alive.
Copy tone: German category titles with concise English support; encouraging, no fluff, every tip actionable.
Use in-memory state only (no localStorage). Make the "Today" dashboard the emotional core — every day I open it, I should see exactly what to do and feel the streak building.

## Assistant

This is a meaty, well-specified brief — I have the structure, content, and exam facts. Before I build, let me lock the two genuinely open aesthetic choices (palette + type) and a couple of scope decisions, since redoing those across a build this size is costly.

_[tool: questions_v2]_

## User

Questions answered:
- palette_label: light colors
- type_pairing: I like the chatgpt stle
- content_depth: Go deep — full decks (~15–20 cards per theme) + full exercise pools so it lasts weeks
- scope: One polished, complete direction (recommended)
- anything_else: this is for myself so I dont care about the UI to much but i need to pass the exam

## Assistant

Clear direction: **ChatGPT-style** — clean, light, neutral, minimal, lots of whitespace, one restrained accent. Function-first, deep real content, single polished build. Let me grab the interactive-prototype recipe and lay out the plan.

_[tool: read_skill_prompt]_

_[tool: update_todos]_

Starting with the content layer — the deep, correct German data the whole app runs on. Writing it as a sanctioned data module the DC imports.

_[tool: write_file]_

Content layer is in. Now the app shell + Heute dashboard with the live ring, streak, and sprint runway. Building the Design Component skeleton with core state and day-rotation logic first, then I'll layer in each exercise engine.

_[tool: dc_write]_

