import { CONTENT } from "./content.js";
import { STUDY_PLAN, PAPERS } from "./study-plan.js";

const STORAGE_KEY = "b1sprint-state-v1";
const EXAM_DATE = new Date("2026-07-15T00:00:00");

// ---- study-plan-driven content selection -------------------------------
// Every category's daily content is chosen by the fixed 15-day plan, not by a
// bare modulo, so "Heute" always mirrors the plan for that calendar day.
function planDay(di) {
  const i = Math.min(Math.max(di, 0), STUDY_PLAN.length - 1);
  return STUDY_PLAN[i];
}
function idxFor(key, di) {
  const p = planDay(di);
  const map = { vocab: p.deck, lesen: p.lesen, hoeren: p.hoeren, schreiben: p.schreiben, sprechen: p.sprechen, grammatik: p.grammatik };
  return map[key] ?? 0;
}

const CATS = [
  { key: "vocab", de: "Wortschatz", en: "Vocabulary", time: "20 Min" },
  { key: "bausteine", de: "Sprachbausteine", en: "Language elements", time: "10 Min" },
  { key: "lesen", de: "Leseverstehen", en: "Reading", time: "15 Min" },
  { key: "hoeren", de: "Hörverstehen", en: "Listening", time: "10 Min" },
  { key: "schreiben", de: "Schriftlicher Ausdruck", en: "Writing", time: "20 Min" },
  { key: "sprechen", de: "Mündlicher Ausdruck", en: "Speaking", time: "10 Min" },
  { key: "grammatik", de: "Grammatik-Review", en: "Grammar refresher", time: "8 Min" }
];

// ------------------------------------------------------------------ helpers

function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function todayKey(d = new Date()) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function daysLeft() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((EXAM_DATE - t) / 86400000));
}

function shuffleArr(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function shuffledIndices(n) { return shuffleArr(Array.from({ length: n }, (_, i) => i)); }

// ------------------------------------------------------------------ state

function allCatsDone(done) { return CATS.every(c => done[c.key]); }

function rollover(state) {
  const today = todayKey();
  if (state.lastCalendarDate === today) return state;
  if (!state.lastCalendarDate) return { ...state, lastCalendarDate: today };

  const wasAllDone = allCatsDone(state.done);
  if (wasAllDone) {
    const st = state.streak + 1;
    return {
      ...state,
      completedDays: [...state.completedDays, state.dayIndex],
      streak: st, bestStreak: Math.max(state.bestStreak, st),
      dayIndex: state.dayIndex + 1,
      done: {}, progress: {},
      sprintLength: Math.max(state.sprintLength, state.dayIndex + 2),
      lastCalendarDate: today
    };
  }
  return {
    ...state,
    streak: 0,
    dayIndex: state.dayIndex + 1,
    done: {}, progress: {},
    sprintLength: Math.max(state.sprintLength, state.dayIndex + 2),
    lastCalendarDate: today
  };
}

function loadState() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { /* ignore corrupt storage */ }
  const base = {
    dayIndex: 0, streak: 0, bestStreak: 0, completedDays: [],
    sprintLength: Math.max(daysLeft(), 7),
    done: {}, progress: {}, mockTests: [], lastCalendarDate: null
  };
  const merged = saved ? { ...base, ...saved } : base;
  return rollover(merged);
}

let state = { ...loadState(), openCat: null, celebrate: false };

function persist() {
  if (typeof localStorage === "undefined") return;
  const { dayIndex, streak, bestStreak, completedDays, sprintLength, done, progress, mockTests, lastCalendarDate } = state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ dayIndex, streak, bestStreak, completedDays, sprintLength, done, progress, mockTests, lastCalendarDate }));
}

let persistTimer = null;
function schedulePersist() { clearTimeout(persistTimer); persistTimer = setTimeout(persist, 400); }

function setState(patch) {
  state = { ...state, ...patch };
  persist();
  render();
}

function ensureProgress(key) {
  if (state.progress[key]) return state.progress[key];
  const p = initProgress(key);
  state.progress = { ...state.progress, [key]: p };
  return p;
}

function initProgress(key) {
  const di = state.dayIndex;
  if (key === "vocab") {
    const deck = CONTENT.decks[idxFor("vocab", di)];
    return { order: shuffledIndices(deck.cards.length), i: 0, flipped: false, known: [], review: [] };
  }
  if (key === "bausteine") {
    const pool = CONTENT.bausteine;
    const start = planDay(di).bausteineStart ?? ((di * 7) % pool.length);
    const idxs = Array.from({ length: 10 }, (_, i) => (start + i) % pool.length);
    const optionOrder = {};
    idxs.forEach(qi => { optionOrder[qi] = shuffleArr(pool[qi].options); });
    return { idxs, answers: {}, optionOrder };
  }
  if (key === "lesen") return { answers: {} };
  if (key === "hoeren") return { revealed: false, answers: {} };
  if (key === "schreiben") return { draft: "", checked: {} };
  if (key === "sprechen") return { practiced: false };
  if (key === "grammatik") {
    const g = CONTENT.grammatik[idxFor("grammatik", di)];
    return { answers: {}, optionOrder: g.items.map(it => shuffleArr(it.options)) };
  }
  return {};
}

function taskFor(key) {
  const di = state.dayIndex;
  if (key === "vocab") { const d = CONTENT.decks[idxFor("vocab", di)]; return `Thema „${d.de}“ · ${d.cards.length} Karten`; }
  if (key === "bausteine") return "10 Lückensätze (a / b / c)";
  if (key === "lesen") { const l = CONTENT.lesen[idxFor("lesen", di)]; return ({ headline: "Teil 1 · 5 Überschriften zuordnen", mc: "Teil 2 · Text + 5 Fragen", ads: "Teil 3 · Situationen & Anzeigen" })[l.type]; }
  if (key === "hoeren") { const h = CONTENT.hoeren[idxFor("hoeren", di)]; return `Richtig / Falsch · „${h.title}“`; }
  if (key === "schreiben") { const w = CONTENT.schreiben[idxFor("schreiben", di)]; return (w.register === "informell" ? "Informelle" : "Halbformelle") + " E-Mail · 4 Leitpunkte"; }
  if (key === "sprechen") { const s = CONTENT.sprechen[idxFor("sprechen", di)]; return s.teil === 2 ? "Teil 2 · Meinung sagen" : "Teil 3 · gemeinsam planen"; }
  if (key === "grammatik") { const g = CONTENT.grammatik[idxFor("grammatik", di)]; return g.topic; }
  return "";
}

function finishDay() {
  const st = state.streak + 1;
  setState({
    completedDays: [...state.completedDays, state.dayIndex],
    streak: st, bestStreak: Math.max(state.bestStreak, st),
    dayIndex: state.dayIndex + 1,
    done: {}, progress: {},
    sprintLength: Math.max(state.sprintLength, state.dayIndex + 2),
    celebrate: true
  });
  setTimeout(() => setState({ celebrate: false }), 2600);
}

function advanceVocab(result) {
  const p = ensureProgress("vocab");
  const cardIdx = p.order[p.i];
  const known = result === "known" ? [...p.known, cardIdx] : p.known;
  const review = result === "review" ? [...p.review, cardIdx] : p.review;
  const i = p.i + 1;
  const patch = { progress: { ...state.progress, vocab: { ...p, i, known, review, flipped: false } } };
  const deck = CONTENT.decks[idxFor("vocab", state.dayIndex)];
  if (i >= deck.cards.length) patch.done = { ...state.done, vocab: true };
  setState(patch);
}

// ------------------------------------------------------------------ render: shell

function renderHeader() {
  return `
  <div class="header">
    <div class="header-inner">
      <div class="brand"><div class="brand-badge">B1</div><div class="brand-name">Sprint</div></div>
      <div class="header-right">
        <div class="header-exam">telc Deutsch B1</div>
        <div class="header-days">noch ${daysLeft()} Tage</div>
      </div>
    </div>
  </div>`;
}

function renderHero() {
  const dl = daysLeft();
  const examDateLabel = EXAM_DATE.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return `
  <section class="hero container">
    <div class="hero-card">
      <div style="min-width:230px">
        <div class="eyebrow">Bis zur Prüfung</div>
        <div class="countdown-num"><div class="n">${dl}</div><div class="u">Tage</div></div>
        <div class="countdown-date">${examDateLabel}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:11px;min-width:250px;flex:1">
        <div class="threshold-title">Bestehensgrenze — 60&thinsp;% in <em>jedem</em> Teil</div>
        <div class="threshold-row">
          <div class="threshold-box"><div class="threshold-label">Schriftlich</div><div class="threshold-val">135 <span class="of">/ 225 Pkt</span></div></div>
          <div class="threshold-box"><div class="threshold-label">Mündlich</div><div class="threshold-val">45 <span class="of">/ 75 Pkt</span></div></div>
        </div>
        <div class="threshold-note">Keine Kompensation zwischen schriftlich und mündlich.</div>
      </div>
    </div>
  </section>`;
}

function renderSubNav() {
  return `
  <div class="container sub-nav" style="padding-top:14px">
    <a href="#heute" class="nav-btn">Heute</a>
    <a href="#plan" class="nav-btn">15-Tage-Plan</a>
    <a href="#schreibhilfe" class="nav-btn">Schreibhilfe</a>
    <a href="#sprechhilfe" class="nav-btn">Sprechhilfe</a>
    <a href="#mocktest" class="nav-btn">Mock-Test</a>
  </div>`;
}

function renderHeute() {
  const di = state.dayIndex;
  const todayLabel = new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
  const cats = CATS.map(c => ({ ...c, done: !!state.done[c.key], task: taskFor(c.key) }));
  const doneCount = cats.filter(c => c.done).length;
  const total = cats.length;
  const ringC = 213.6, ringOffset = ringC * (1 - doneCount / total);
  const len = STUDY_PLAN.length;
  const runway = Array.from({ length: len }, (_, i) => ({
    done: state.completedDays.includes(i),
    today: i === di && !state.completedDays.includes(i)
  }));
  const deck = CONTENT.decks[idxFor("vocab", di)];
  const vp = state.progress.vocab;
  const vSeen = vp ? vp.known.length + vp.review.length : 0;
  const vTotal = deck.cards.length;
  const vocabPct = Math.round((vSeen / vTotal) * 100);
  const heroCat = cats.find(c => c.key === "vocab");
  const otherCats = cats.filter(c => c.key !== "vocab");
  const allDone = doneCount === total;

  const runwayHtml = runway.map(cell => {
    if (cell.done) return `<span class="runway-cell done" title="erledigt">✓</span>`;
    if (cell.today) return `<span class="runway-cell today" title="heute"></span>`;
    return `<span class="runway-cell future"></span>`;
  }).join("");

  const otherCatsHtml = otherCats.map(c => `
    <button class="cat-card" data-action="open" data-key="${c.key}">
      <div class="cat-card-top">
        <div><div class="cat-card-de">${esc(c.de)}</div><div class="cat-card-en">${esc(c.en)}</div></div>
        <span class="cat-toggle" data-action="toggle-done" data-key="${c.key}" role="button" aria-label="Als erledigt markieren">
          ${c.done ? '<span class="on">✓</span>' : '<span class="off"></span>'}
        </span>
      </div>
      <div class="cat-card-task">Heute: ${esc(c.task)}</div>
      <div class="cat-card-bottom">
        <span class="cat-card-time">⏱ ${c.time}</span>
        ${c.done ? '<span class="cat-card-done">Erledigt ✓</span>' : '<span class="cat-card-open">Öffnen →</span>'}
      </div>
    </button>`).join("");

  const pd = planDay(di);
  const dayNum = Math.min(di + 1, STUDY_PLAN.length);
  const specialBadge = pd.special === "mock-written" ? '<span class="focus-flag">📝 Prüfungssimulation schriftlich</span>'
    : pd.special === "mock-oral" ? '<span class="focus-flag">🎤 Mündliche Simulation</span>'
    : pd.special === "exam-day" ? '<span class="focus-flag">🍀 Prüfungstag</span>' : "";

  return `
  <section id="heute" class="section container">
    <div class="section-head">
      <div><h2 class="section-title">Heute</h2><div class="section-sub">${todayLabel} · Tag ${dayNum} von ${STUDY_PLAN.length} · Phase „${esc(pd.phase)}“</div></div>
    </div>

    <div class="focus-banner">
      <div class="focus-top">
        <div class="focus-eyebrow">Fokus heute</div>
        ${specialBadge}
      </div>
      <div class="focus-title">${esc(pd.focus)}</div>
      <div class="focus-goal">${esc(pd.goal)}</div>
      ${pd.paper ? `<div class="focus-paper"><span class="focus-paper-label">Modelltest</span> <strong>${esc(PAPERS[pd.paper].label)}</strong> — ${esc(pd.paperTask)}</div>` : ""}
      <div class="focus-tip"><span class="focus-tip-label">Tipp</span> ${esc(pd.tip)}</div>
    </div>

    <div class="status-card">
      <div class="status-left">
        <div class="ring-wrap">
          <svg width="84" height="84" viewBox="0 0 84 84">
            <circle cx="42" cy="42" r="34" fill="none" stroke="#EDEDEF" stroke-width="9"></circle>
            <circle cx="42" cy="42" r="34" fill="none" stroke="#0E8C6D" stroke-width="9" stroke-linecap="round" stroke-dasharray="${ringC}" stroke-dashoffset="${ringOffset}" transform="rotate(-90 42 42)" style="transition:stroke-dashoffset .6s cubic-bezier(.4,0,.2,1)"></circle>
          </svg>
          <div class="ring-center"><div class="n">${doneCount}</div><div class="t">/ ${total}</div></div>
        </div>
        <div><div class="status-pct">${doneCount} von ${total} erledigt</div><div class="status-hint">Alle Kategorien heute abhaken</div></div>
      </div>
      <div class="streak-box">
        <div class="streak-flame">▲</div>
        <div><div class="streak-n">${state.streak}</div><div class="streak-label">Tage in Folge</div></div>
      </div>
      ${allDone
        ? `<button class="finish-btn" data-action="finish-day">Tag abschließen →</button>`
        : `<div class="remaining-hint"><div class="r">Noch ${total - doneCount} offen</div><div class="h">Dann Tag abschließen</div></div>`}
    </div>

    <div class="runway"><span class="runway-label">Sprint</span>${runwayHtml}</div>

    <button class="hero-cat" data-action="open" data-key="vocab">
      <div class="hero-cat-main">
        <div class="hero-tag">★ Schwerpunkt · dein Fokus</div>
        <div class="hero-title-row"><div class="de">Wortschatz</div><div class="en">Vocabulary</div></div>
        <div class="hero-task">Heute: Thema „${esc(deck.de)}“ · ${vTotal} Karten</div>
        <div class="hero-bar"><div class="hero-bar-fill" style="width:${vocabPct}%"></div></div>
      </div>
      <div class="hero-cat-side">
        ${heroCat.done
          ? `<div class="hero-done"><span class="tick">✓</span> Erledigt</div>`
          : `<div class="hero-open-btn">Üben →</div>`}
        <div class="hero-time">⏱ ${heroCat.time}</div>
      </div>
    </button>

    <div class="cat-grid">${otherCatsHtml}</div>
  </section>`;
}

function planTaskChips(pd) {
  const deck = CONTENT.decks[pd.deck];
  const lesenType = ({ headline: "Lesen T1 · Überschriften", mc: "Lesen T2 · Text + Fragen", ads: "Lesen T3 · Anzeigen" })[CONTENT.lesen[pd.lesen].type];
  const s = CONTENT.sprechen[pd.sprechen];
  const w = CONTENT.schreiben[pd.schreiben];
  const chips = [
    `Wortschatz: „${deck.de}“ (${deck.cards.length})`,
    `Sprachbausteine: ${pd.bausteineFocus}`,
    lesenType,
    `Hören: „${CONTENT.hoeren[pd.hoeren].title}“`,
    `Schreiben: ${w.register === "informell" ? "informelle" : "halbformelle"} E-Mail`,
    `Sprechen: ${s.teil === 2 ? "Teil 2 Meinung" : "Teil 3 planen"}`,
    `Grammatik: ${CONTENT.grammatik[pd.grammatik].topic}`
  ];
  return chips.map(c => `<span class="plan-chip">${esc(c)}</span>`).join("");
}

function renderPlan() {
  const di = state.dayIndex;
  const rows = STUDY_PLAN.map((pd, i) => {
    const done = state.completedDays.includes(i);
    const isToday = i === di && !done;
    const dateLabel = new Date(pd.date + "T00:00:00").toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" });
    const stateCls = done ? "done" : isToday ? "today" : (i < di ? "missed" : "future");
    const stateBadge = done ? '<span class="plan-badge done">✓ erledigt</span>'
      : isToday ? '<span class="plan-badge today">Heute</span>'
      : (i < di ? '<span class="plan-badge missed">verpasst</span>' : '');
    return `
    <div class="plan-day ${stateCls}">
      <div class="plan-day-rail">
        <div class="plan-day-num">${pd.day}</div>
        <div class="plan-day-date">${dateLabel}</div>
      </div>
      <div class="plan-day-body">
        <div class="plan-day-head">
          <div>
            <span class="plan-phase">${esc(pd.phase)}</span>
            <span class="plan-focus">${esc(pd.focus)}</span>
          </div>
          ${stateBadge}
        </div>
        <div class="plan-day-goal">${esc(pd.goal)}</div>
        ${pd.paper ? `<div class="plan-day-paper"><span class="plan-paper-tag">${esc(PAPERS[pd.paper].label)}</span>${esc(pd.paperTask)}</div>` : ""}
        <div class="plan-chips">${planTaskChips(pd)}</div>
        <div class="plan-day-tip"><span class="focus-tip-label">Tipp</span> ${esc(pd.tip)}</div>
      </div>
    </div>`;
  }).join("");
  const legend = Object.values(PAPERS).map(p => `<div class="paper-legend-item"><span class="plan-paper-tag">${esc(p.label)}</span><span class="paper-legend-full">${esc(p.full)}</span></div>`).join("");
  return `
  <section id="plan" class="section container">
    <div class="section-head"><div><h2 class="section-title">15-Tage-Plan</h2><div class="section-sub">1.–15. Juli · fester Fahrplan bis zur Prüfung. Der Tag „Heute“ folgt genau diesem Plan.</div></div></div>
    <div class="helper-card" style="padding:16px 18px;margin-bottom:14px">
      <div class="helper-title" style="font-size:15px;margin-bottom:10px">Deine 5 Modelltests</div>
      <div class="paper-legend">${legend}</div>
    </div>
    <div class="plan-list">${rows}</div>
  </section>`;
}

function renderSchreibhilfe() {
  const w = CONTENT.phrases.writing;
  const steps = w.template.map(t => `
    <div class="template-row">
      <div class="template-step">${esc(t.step)}</div>
      <div class="template-body"><div class="de">${esc(t.de)}</div><div class="note">${esc(t.note)}</div></div>
    </div>`).join("");
  const bankGroups = Object.entries(w.bank).map(([label, phrases]) => `
    <div class="bank-group">
      <div class="bank-group-title">${esc(label)}</div>
      ${phrases.map(p => `<div class="bank-phrase">${esc(p)}</div>`).join("")}
    </div>`).join("");
  return `
  <section id="schreibhilfe" class="section container">
    <div class="section-head"><div><h2 class="section-title">Schreibhilfe</h2><div class="section-sub">E-Mail-Vorlage &amp; Redemittel für Schriftlicher Ausdruck</div></div></div>
    <div class="helper-card">
      <div class="helper-title">Aufbau einer E-Mail</div>
      <div class="template-list">${steps}</div>
    </div>
    <div class="helper-card">
      <div class="helper-title">Redemittel-Bank</div>
      <div class="bank-grid">${bankGroups}</div>
    </div>
  </section>`;
}

function renderSprechhilfe() {
  const bankGroups = Object.entries(CONTENT.phrases.speaking).map(([label, phrases]) => `
    <div class="bank-group">
      <div class="bank-group-title">${esc(label)}</div>
      ${phrases.map(p => `<div class="bank-phrase">${esc(p)}</div>`).join("")}
    </div>`).join("");
  return `
  <section id="sprechhilfe" class="section container">
    <div class="section-head"><div><h2 class="section-title">Sprechhilfe</h2><div class="section-sub">Redemittel für Mündlicher Ausdruck — vorschlagen, zustimmen, widersprechen, Kompromiss finden</div></div></div>
    <div class="helper-card"><div class="bank-grid">${bankGroups}</div></div>
  </section>`;
}

function computeMockResult(m) {
  const written = m.lesen + m.bausteine + m.hoeren + m.schreiben;
  const oral = m.sprechen;
  const passWritten = written >= 135;
  const passOral = oral >= 45;
  return { written, oral, passWritten, passOral, pass: passWritten && passOral };
}

function renderMockLog() {
  const rows = state.mockTests.map(m => {
    const r = computeMockResult(m);
    return `<tr>
      <td>${esc(m.date)}</td>
      <td>${r.written} / 225 <span class="pill ${r.passWritten ? "pass" : "fail"}">${r.passWritten ? "bestanden" : "durchgefallen"}</span></td>
      <td>${r.oral} / 75 <span class="pill ${r.passOral ? "pass" : "fail"}">${r.passOral ? "bestanden" : "durchgefallen"}</span></td>
      <td><span class="pill ${r.pass ? "pass" : "fail"}">${r.pass ? "✓ Bestanden" : "✗ Nicht bestanden"}</span></td>
      <td><button class="del-btn" data-action="delete-mock" data-id="${m.id}">Löschen</button></td>
    </tr>`;
  }).join("");
  return `
  <section id="mocktest" class="section container">
    <div class="section-head"><div><h2 class="section-title">Mock-Test-Protokoll</h2><div class="section-sub">Selbst bewertete Punkte gegen die 60&thinsp;%-Grenze (135 schriftlich / 45 mündlich, keine Kompensation)</div></div></div>
    <div class="helper-card">
      <div class="mock-form">
        <div class="mock-field"><label for="mock-lesen">Leseverstehen (/75)</label><input type="number" min="0" max="75" id="mock-lesen"></div>
        <div class="mock-field"><label for="mock-bausteine">Sprachbausteine (/30)</label><input type="number" min="0" max="30" id="mock-bausteine"></div>
        <div class="mock-field"><label for="mock-hoeren">Hörverstehen (/75)</label><input type="number" min="0" max="75" id="mock-hoeren"></div>
        <div class="mock-field"><label for="mock-schreiben">Schreiben (/45)</label><input type="number" min="0" max="45" id="mock-schreiben"></div>
        <div class="mock-field"><label for="mock-sprechen">Sprechen (/75)</label><input type="number" min="0" max="75" id="mock-sprechen"></div>
      </div>
      <button class="mock-add-btn" data-action="add-mock">Eintrag hinzufügen</button>
      ${state.mockTests.length ? `
      <table class="mock-table">
        <thead><tr><th>Datum</th><th>Schriftlich</th><th>Mündlich</th><th>Ergebnis</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>` : `<div class="mock-empty">Noch keine Einträge. Trage nach deinem nächsten Übungstest die Punkte ein.</div>`}
    </div>
  </section>`;
}

function renderCelebrate() {
  if (!state.celebrate) return "";
  return `<div class="celebrate-toast">Tag ${state.streak} geschafft · Streak ${state.streak} Tage</div>`;
}

// ------------------------------------------------------------------ render: exercise engines

function renderVocab() {
  const p = ensureProgress("vocab");
  const deck = CONTENT.decks[idxFor("vocab", state.dayIndex)];
  const total = deck.cards.length;
  if (p.i >= total) {
    return `
      <div class="flash-done">
        <div class="big">Deck fertig 🎉</div>
        <div style="color:#6B6B78;font-size:14px">${p.known.length} gewusst · ${p.review.length} zum Wiederholen</div>
      </div>`;
  }
  const card = deck.cards[p.order[p.i]];
  return `
    <div class="ex-progress">Karte ${p.i + 1} / ${total} · Thema „${esc(deck.de)}“</div>
    <div class="flash-stage">
      <div class="flash-card">
        <div class="flash-card-inner ${p.flipped ? "flipped" : ""}" data-action="flip">
          <div class="flash-face front">
            <div class="flash-word">${esc(card.de)}</div>
            <div class="flash-hint">Tippen zum Umdrehen</div>
          </div>
          <div class="flash-face back">
            <div class="flash-en">${esc(card.en)}</div>
            <div class="flash-ex">„${esc(card.ex)}“</div>
          </div>
        </div>
      </div>
      <div class="flash-actions">
        <button class="flash-btn review" data-action="flash-review">Nochmal üben</button>
        <button class="flash-btn known" data-action="flash-known">Kann ich ✓</button>
      </div>
      <div class="flash-tally"><span><span class="known-n">${p.known.length}</span> gewusst</span><span><span class="review-n">${p.review.length}</span> wiederholen</span></div>
    </div>`;
}

function renderBausteine() {
  const p = ensureProgress("bausteine");
  const pool = CONTENT.bausteine;
  const answered = Object.keys(p.answers).length;
  const correct = p.idxs.filter(qi => p.answers[qi] === pool[qi].answer).length;
  const rows = p.idxs.map((qi, n) => {
    const q = pool[qi];
    const picked = p.answers[qi];
    const optsHtml = p.optionOrder[qi].map(o => {
      let cls = "opt-btn";
      if (picked) { if (o === q.answer) cls += " correct"; else if (o === picked) cls += " incorrect"; }
      return `<button class="${cls}" data-action="answer-bausteine" data-qi="${qi}" data-opt="${esc(o)}" ${picked ? "disabled" : ""}>${esc(o)}</button>`;
    }).join("");
    return `<div class="q-block">
      <div class="q-num">Frage ${n + 1} / ${p.idxs.length}</div>
      <div class="q-text">${esc(q.q).replace("___", "<u>___</u>")}</div>
      <div class="q-options">${optsHtml}</div>
      ${picked ? `<div class="q-hint">${esc(q.hint)}</div>` : ""}
    </div>`;
  }).join("");
  return `
    <div class="ex-intro">Wählen Sie die richtige Lösung (a / b / c).</div>
    <div class="ex-progress">${answered} / ${p.idxs.length} beantwortet · ${correct} richtig</div>
    ${rows}`;
}

function renderLesen() {
  const item = CONTENT.lesen[idxFor("lesen", state.dayIndex)];
  const p = ensureProgress("lesen");

  if (item.type === "mc") {
    const answered = Object.keys(p.answers).length;
    const correct = item.questions.filter((q, i) => p.answers[i] === q.answer).length;
    const qHtml = item.questions.map((q, i) => {
      const picked = p.answers[i];
      const optsHtml = q.options.map(o => {
        let cls = "opt-btn";
        if (picked) { if (o === q.answer) cls += " correct"; else if (o === picked) cls += " incorrect"; }
        return `<button class="${cls}" data-action="answer-lesen-mc" data-qi="${i}" data-opt="${esc(o)}" ${picked ? "disabled" : ""}>${esc(o)}</button>`;
      }).join("");
      return `<div class="q-block"><div class="q-num">Frage ${i + 1}</div><div class="q-text">${esc(q.q)}</div><div class="q-options">${optsHtml}</div></div>`;
    }).join("");
    return `<div class="ex-intro">${esc(item.intro)}</div>
      <div class="passage">${esc(item.text)}</div>
      <div class="ex-progress">${answered} / ${item.questions.length} beantwortet · ${correct} richtig</div>
      ${qHtml}`;
  }

  if (item.type === "headline") {
    const answered = Object.keys(p.answers).length;
    const correct = item.texts.filter(t => p.answers[t.n] === t.sol).length;
    const rows = item.texts.map(t => {
      const picked = p.answers[t.n];
      const chips = item.headlines.map(h => {
        let cls = "chip-btn";
        if (picked) { if (h.id === t.sol) cls += " correct"; else if (h.id === picked) cls += " incorrect"; }
        return `<button class="${cls}" data-action="answer-lesen-match" data-n="${t.n}" data-choice="${h.id}" ${picked ? "disabled" : ""}>${h.id}</button>`;
      }).join("");
      return `<div class="match-row"><div class="match-n">${t.n}</div><div class="match-text">${esc(t.body)}</div><div class="match-select">${chips}</div></div>`;
    }).join("");
    const legend = item.headlines.map(h => `<div class="ad-item"><span class="ad-id">${h.id}</span>${esc(h.text)}</div>`).join("");
    return `<div class="ex-intro">${esc(item.intro)}</div>
      <div class="ex-progress">${answered} / ${item.texts.length} beantwortet · ${correct} richtig</div>
      ${rows}
      <div class="ad-list">${legend}</div>`;
  }

  // ads
  const answered = Object.keys(p.answers).length;
  const correct = item.situations.filter(s => p.answers[s.n] === s.sol).length;
  const rows = item.situations.map(s => {
    const picked = p.answers[s.n];
    const choices = [...item.ads.map(a => a.id), "x"];
    const chips = choices.map(id => {
      let cls = "chip-btn";
      if (picked) { if (id === s.sol) cls += " correct"; else if (id === picked) cls += " incorrect"; }
      return `<button class="${cls}" data-action="answer-lesen-match" data-n="${s.n}" data-choice="${id}" ${picked ? "disabled" : ""}>${id}</button>`;
    }).join("");
    return `<div class="match-row"><div class="match-n">${s.n}</div><div class="match-text">${esc(s.text)}</div><div class="match-select">${chips}</div></div>`;
  }).join("");
  const legend = item.ads.map(a => `<div class="ad-item"><span class="ad-id">${a.id}</span>${esc(a.text)}</div>`).join("");
  return `<div class="ex-intro">${esc(item.intro)}</div>
    <div class="ex-progress">${answered} / ${item.situations.length} beantwortet · ${correct} richtig</div>
    ${rows}
    <div class="ad-list">${legend}</div>`;
}

function renderHoeren() {
  const item = CONTENT.hoeren[idxFor("hoeren", state.dayIndex)];
  const p = ensureProgress("hoeren");
  const answered = Object.keys(p.answers).length;
  const correct = item.statements.filter((s, i) => p.answers[i] === s.answer).length;
  const rows = item.statements.map((s, i) => {
    const picked = p.answers[i];
    const btn = (val, label) => {
      let cls = "rf-btn";
      if (picked !== undefined) { if (val === s.answer) cls += " correct"; else if (val === picked) cls += " incorrect"; }
      return `<button class="${cls}" data-action="answer-hoeren" data-i="${i}" data-val="${val}" ${picked !== undefined ? "disabled" : ""}>${label}</button>`;
    };
    return `<div class="statement-row"><div class="statement-text">${esc(s.text)}</div><div class="rf-btns">${btn(true, "Richtig")}${btn(false, "Falsch")}</div></div>`;
  }).join("");
  return `
    <div class="ex-intro"><strong>${esc(item.kind)}:</strong> „${esc(item.title)}“ — Tipp: Lesen Sie zuerst die Aussagen, wie in der echten Prüfung.</div>
    <div class="ex-progress">${answered} / ${item.statements.length} beantwortet · ${correct} richtig</div>
    ${rows}
    <div class="transcript-toggle">
      <button class="mark-done-btn secondary" data-action="toggle-transcript">${p.revealed ? "Transkript ausblenden" : "Transkript anzeigen"}</button>
    </div>
    ${p.revealed ? `<div class="passage">${esc(item.transcript)}</div>` : ""}
  `;
}

function renderSchreiben() {
  const item = CONTENT.schreiben[idxFor("schreiben", state.dayIndex)];
  const p = ensureProgress("schreiben");
  const checkedCount = item.leitpunkte.filter((_, i) => p.checked[i]).length;
  const leitHtml = item.leitpunkte.map((lp, i) => {
    const on = !!p.checked[i];
    return `<button class="checklist-item ${on ? "checked" : ""}" data-action="toggle-leitpunkt" data-i="${i}">
      <span class="check-box">${on ? "✓" : ""}</span>
      <span class="checklist-text">${esc(lp)}</span>
    </button>`;
  }).join("");
  return `
    <div class="task-meta"><span class="task-badge">${item.register === "informell" ? "Informell" : "Halbformell"}</span><span class="task-badge">4 Leitpunkte</span><span class="task-badge">30 Min</span></div>
    <div class="situation">${esc(item.situation)}</div>
    <div class="recipient">${esc(item.recipient)}</div>
    <div class="leitpunkte">${leitHtml}</div>
    <div class="ex-progress">${checkedCount} / 4 Punkte abgedeckt</div>
    <textarea class="email-area" data-action-input="schreiben-draft" placeholder="Schreiben Sie hier Ihre E-Mail …">${esc(p.draft || "")}</textarea>
    <div><button class="mark-done-btn secondary" data-action="jump-schreibhilfe" style="margin-top:14px">→ Zur Schreibhilfe (Vorlage &amp; Redemittel)</button></div>
  `;
}

function renderSprechen() {
  const item = CONTENT.sprechen[idxFor("sprechen", state.dayIndex)];
  const p = ensureProgress("sprechen");
  const cueHtml = item.cues.map(c => `<div class="cue-item"><span class="cue-dot">→</span>${esc(c)}</div>`).join("");
  return `
    <div class="task-meta"><span class="task-badge">Teil ${item.teil}</span><span class="task-badge">${item.teil === 2 ? "Meinung äußern" : "Gemeinsam planen"}</span></div>
    <div class="situation">${esc(item.topic)}</div>
    <div class="cue-list">${cueHtml}</div>
    <button class="checklist-item ${p.practiced ? "checked" : ""}" data-action="toggle-practiced">
      <span class="check-box">${p.practiced ? "✓" : ""}</span>
      <span class="checklist-text">Ich habe laut geübt (allein oder mit Partner) und „Was denkst du dazu?“ benutzt.</span>
    </button>
    <div><button class="mark-done-btn secondary" data-action="jump-sprechhilfe" style="margin-top:14px">→ Zur Sprechhilfe (Redemittel)</button></div>
  `;
}

function renderGrammatik() {
  const g = CONTENT.grammatik[idxFor("grammatik", state.dayIndex)];
  const p = ensureProgress("grammatik");
  const answered = Object.keys(p.answers).length;
  const correct = g.items.filter((it, i) => p.answers[i] === it.answer).length;
  const rows = g.items.map((it, i) => {
    const picked = p.answers[i];
    const optsHtml = p.optionOrder[i].map(o => {
      let cls = "opt-btn";
      if (picked) { if (o === it.answer) cls += " correct"; else if (o === picked) cls += " incorrect"; }
      return `<button class="${cls}" data-action="answer-grammatik" data-qi="${i}" data-opt="${esc(o)}" ${picked ? "disabled" : ""}>${esc(o)}</button>`;
    }).join("");
    return `<div class="q-block"><div class="q-text">${esc(it.q).replace("___", "<u>___</u>")}</div><div class="q-options">${optsHtml}</div>${picked ? `<div class="q-hint">${esc(it.hint)}</div>` : ""}</div>`;
  }).join("");
  return `
    <div style="font-size:15px;font-weight:800;margin-bottom:4px">${esc(g.topic)} <span style="color:#9A9AA6;font-weight:600;font-size:13px">· ${esc(g.en)}</span></div>
    <div class="rule-box">${esc(g.rule)}</div>
    <div class="ex-progress">${answered} / ${g.items.length} beantwortet · ${correct} richtig</div>
    ${rows}
  `;
}

const ENGINES = { vocab: renderVocab, bausteine: renderBausteine, lesen: renderLesen, hoeren: renderHoeren, schreiben: renderSchreiben, sprechen: renderSprechen, grammatik: renderGrammatik };

function renderModal() {
  if (!state.openCat) return "";
  const key = state.openCat;
  const cat = CATS.find(c => c.key === key);
  const done = !!state.done[key];
  return `
  <div class="overlay">
    <div class="modal">
      <div class="modal-head">
        <div class="modal-head-left">
          <button class="back-btn" data-action="close" aria-label="Zurück">←</button>
          <div><div class="modal-title">${esc(cat.de)}</div><div class="modal-task">${esc(taskFor(key))}</div></div>
        </div>
        <div class="modal-time">⏱ ${cat.time}</div>
      </div>
      <div class="modal-body">
        ${ENGINES[key]()}
        <div style="margin-top:22px;padding-top:18px;border-top:1px solid #EFEFF1;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div style="font-size:12.5px;color:#0B7359;font-weight:700">${done ? "✓ Heute erledigt" : ""}</div>
          <button class="mark-done-btn" data-action="toggle-done" data-key="${key}">${done ? "Als offen markieren" : "Als erledigt markieren"}</button>
        </div>
      </div>
    </div>
  </div>`;
}

// ------------------------------------------------------------------ root render + events

function render() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <div class="wrap">
      ${renderHeader()}
      ${renderHero()}
      ${renderSubNav()}
      ${renderHeute()}
      ${renderPlan()}
      ${renderSchreibhilfe()}
      ${renderSprechhilfe()}
      ${renderMockLog()}
      <div class="footer-note">B1 Sprint · dein tägliches Trainingsprogramm. Fortschritt &amp; Streak werden lokal in diesem Browser gespeichert. Viel Erfolg am 15. Juli!</div>
    </div>
    ${renderModal()}
    ${renderCelebrate()}
  `;
}

function readMockInput(id, max) {
  const v = parseInt(document.getElementById(id).value, 10);
  return isNaN(v) ? 0 : Math.max(0, Math.min(max, v));
}

function onClick(e) {
  const overlay = e.target.closest(".overlay");
  if (overlay && !e.target.closest(".modal")) { setState({ openCat: null }); return; }

  const flip = e.target.closest('[data-action="flip"]');
  if (flip) {
    const p = ensureProgress("vocab");
    p.flipped = !p.flipped;
    schedulePersist();
    flip.classList.toggle("flipped", p.flipped);
    return;
  }

  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;

  if (action === "open") { setState({ openCat: btn.dataset.key }); return; }
  if (action === "close") { setState({ openCat: null }); return; }
  if (action === "finish-day") { finishDay(); return; }
  if (action === "flash-known") { advanceVocab("known"); return; }
  if (action === "flash-review") { advanceVocab("review"); return; }

  if (action === "toggle-done") {
    const key = btn.dataset.key;
    setState({ done: { ...state.done, [key]: !state.done[key] } });
    return;
  }
  if (action === "answer-bausteine") {
    const qi = Number(btn.dataset.qi), opt = btn.dataset.opt;
    const p = ensureProgress("bausteine");
    setState({ progress: { ...state.progress, bausteine: { ...p, answers: { ...p.answers, [qi]: opt } } } });
    return;
  }
  if (action === "answer-grammatik") {
    const qi = Number(btn.dataset.qi), opt = btn.dataset.opt;
    const p = ensureProgress("grammatik");
    setState({ progress: { ...state.progress, grammatik: { ...p, answers: { ...p.answers, [qi]: opt } } } });
    return;
  }
  if (action === "answer-lesen-mc") {
    const qi = Number(btn.dataset.qi), opt = btn.dataset.opt;
    const p = ensureProgress("lesen");
    setState({ progress: { ...state.progress, lesen: { ...p, answers: { ...p.answers, [qi]: opt } } } });
    return;
  }
  if (action === "answer-lesen-match") {
    const n = Number(btn.dataset.n), choice = btn.dataset.choice;
    const p = ensureProgress("lesen");
    setState({ progress: { ...state.progress, lesen: { ...p, answers: { ...p.answers, [n]: choice } } } });
    return;
  }
  if (action === "answer-hoeren") {
    const i = Number(btn.dataset.i), val = btn.dataset.val === "true";
    const p = ensureProgress("hoeren");
    setState({ progress: { ...state.progress, hoeren: { ...p, answers: { ...p.answers, [i]: val } } } });
    return;
  }
  if (action === "toggle-transcript") {
    const p = ensureProgress("hoeren");
    setState({ progress: { ...state.progress, hoeren: { ...p, revealed: !p.revealed } } });
    return;
  }
  if (action === "toggle-leitpunkt") {
    const i = Number(btn.dataset.i);
    const p = ensureProgress("schreiben");
    setState({ progress: { ...state.progress, schreiben: { ...p, checked: { ...p.checked, [i]: !p.checked[i] } } } });
    return;
  }
  if (action === "toggle-practiced") {
    const p = ensureProgress("sprechen");
    setState({ progress: { ...state.progress, sprechen: { ...p, practiced: !p.practiced } } });
    return;
  }
  if (action === "jump-schreibhilfe" || action === "jump-sprechhilfe") {
    const targetId = action === "jump-schreibhilfe" ? "schreibhilfe" : "sprechhilfe";
    state = { ...state, openCat: null };
    persist();
    render();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (action === "add-mock") {
    const entry = {
      id: Date.now(),
      date: todayKey(),
      lesen: readMockInput("mock-lesen", 75),
      bausteine: readMockInput("mock-bausteine", 30),
      hoeren: readMockInput("mock-hoeren", 75),
      schreiben: readMockInput("mock-schreiben", 45),
      sprechen: readMockInput("mock-sprechen", 75)
    };
    setState({ mockTests: [entry, ...state.mockTests] });
    return;
  }
  if (action === "delete-mock") {
    const id = Number(btn.dataset.id);
    setState({ mockTests: state.mockTests.filter(m => m.id !== id) });
    return;
  }
}

function onInput(e) {
  if (e.target.matches('[data-action-input="schreiben-draft"]')) {
    const p = ensureProgress("schreiben");
    p.draft = e.target.value;
    schedulePersist();
  }
}

const root = document.getElementById("root");
root.addEventListener("click", onClick);
root.addEventListener("input", onInput);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && state.openCat) setState({ openCat: null }); });

persist(); // anchor calendar date / rolled-over state on first load
render();
