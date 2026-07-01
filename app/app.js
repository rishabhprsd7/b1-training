import { CONTENT } from "./content.js";
import "./papers-content.js"; // appends real exam exercises to the CONTENT pools
import { STUDY_PLAN } from "./study-plan.js";
import { getSyncMeta, setSyncMeta, syncReady, syncPull, syncPush } from "./sync.js";

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

// Small "Quelle" badge shown on content that comes verbatim from a supplied
// source — either a real telc model test or the learner's own study material.
function srcTag(source) {
  if (!source) return "";
  const own = source.startsWith("Eigen");
  const label = own ? "Dein Material" : "Echte Prüfungsaufgabe";
  return `<div class="src-tag"><span class="src-dot">●</span> ${label} · ${esc(source)}</div>`;
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

function hydrate(saved) {
  const base = {
    dayIndex: 0, streak: 0, bestStreak: 0, completedDays: [],
    sprintLength: Math.max(daysLeft(), 7),
    done: {}, progress: {}, libProgress: {}, mockTests: [], mock: null, mockRuns: [],
    lastCalendarDate: null, updatedAt: 0
  };
  const merged = saved ? { ...base, ...saved } : base;
  return rollover(merged);
}
function loadState() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { /* ignore corrupt storage */ }
  return hydrate(saved);
}

let state = { ...loadState(), openCat: null, openLib: null, celebrate: false };
if (!state.libProgress) state.libProgress = {};

const PERSIST_KEYS = ["dayIndex", "streak", "bestStreak", "completedDays", "sprintLength", "done", "progress", "libProgress", "mockTests", "mock", "mockRuns", "lastCalendarDate", "updatedAt"];
function stateBlob() {
  const o = {};
  for (const k of PERSIST_KEYS) o[k] = state[k];
  return o;
}
function persist() {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stateBlob()));
  scheduleSyncPush();
}
// Mark local data as changed "now" so last-write-wins sync compares correctly.
function touch() { state.updatedAt = Date.now(); }

let persistTimer = null;
function schedulePersist() { clearTimeout(persistTimer); persistTimer = setTimeout(persist, 400); }

function setState(patch) {
  state = { ...state, ...patch };
  touch();
  persist();
  render();
}

// ---------------------------------------------------------------- cloud sync
let syncStatus = "";
let syncBusy = false;
let syncPushTimer = null;
function fmtClock(ms) { return new Date(ms).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }); }
function setSyncStatus(s) {
  syncStatus = s;
  const el = document.getElementById("sync-status");
  if (el) el.textContent = s;
}
function persistLocalOnly() { if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(stateBlob())); }

function scheduleSyncPush() {
  if (!syncReady()) return;
  clearTimeout(syncPushTimer);
  syncPushTimer = setTimeout(doSyncPush, 1500);
}
async function doSyncPush() {
  if (!syncReady() || syncBusy) return;
  syncBusy = true;
  setSyncStatus("Speichere …");
  try {
    await syncPush(stateBlob(), state.updatedAt || 0);
    setSyncMeta({ lastSync: Date.now() });
    setSyncStatus("aktuell · " + fmtClock(Date.now()));
  } catch (e) { setSyncStatus("Fehler: " + e.message); }
  finally { syncBusy = false; }
}
function applyRemote(data) {
  state = { ...hydrate(data), openCat: null, openLib: null, celebrate: false };
  if (!state.libProgress) state.libProgress = {};
  persistLocalOnly();
  render();
}
// On load: the cloud is the source of truth — take remote unless this device has
// newer unsynced (offline) changes, in which case push them up.
async function doInitialSync() {
  if (!syncReady()) return;
  setSyncStatus("Synchronisiere …");
  try {
    const remote = await syncPull();
    if (remote && remote.updated >= (state.updatedAt || 0)) { applyRemote(remote.data); setSyncStatus("aktuell · " + fmtClock(Date.now())); }
    else { await syncPush(stateBlob(), state.updatedAt || 0); setSyncStatus("aktuell · " + fmtClock(Date.now())); }
    setSyncMeta({ lastSync: Date.now() });
  } catch (e) { setSyncStatus("Offline / Fehler: " + e.message); }
}
// Refresh from cloud (manual button, and when the app regains focus).
let lastFocusPull = 0;
async function pullFresh(force) {
  if (!syncReady() || syncBusy) return;
  const now = Date.now();
  if (!force && now - lastFocusPull < 4000) return;
  lastFocusPull = now;
  syncBusy = true;
  if (force) { setSyncStatus("Aktualisiere …"); render(); }
  try {
    const remote = await syncPull();
    if (remote && remote.updated > (state.updatedAt || 0)) applyRemote(remote.data);
    setSyncStatus("aktuell · " + fmtClock(Date.now()));
    setSyncMeta({ lastSync: Date.now() });
  } catch (e) { setSyncStatus("Offline / Fehler: " + e.message); }
  finally { syncBusy = false; if (force) render(); }
}

// ---- exercise context (works for both the daily plan and the free library) ----
// A "ctx" describes the exercise currently open: its skill (kind), which content
// item, a stable id, and whether its progress lives in the daily store
// (state.progress[kind], reset each day) or the library store
// (state.libProgress[id], kept forever).
function baustSetForDay(di) {
  const pool = CONTENT.bausteine;
  const start = planDay(di).bausteineStart ?? ((di * 7) % pool.length);
  return Array.from({ length: 10 }, (_, i) => (start + i) % pool.length);
}
function baustLibSet(setIndex) {
  const pool = CONTENT.bausteine;
  const start = (setIndex * 10) % pool.length;
  return Array.from({ length: 10 }, (_, i) => (start + i) % pool.length).filter(n => n < pool.length);
}

function mockPartCtx() {
  const m = state.mock;
  if (!m) return null;
  const part = m.parts[m.i];
  return { mode: "mock", kind: part.kind, index: part.index, partIndex: m.i, id: `mock:${m.i}` };
}

function currentCtx() {
  if (state.mock) return mockPartCtx();
  if (state.openLib) {
    const { kind, index } = state.openLib;
    return { mode: "lib", kind, index, id: `lib:${kind}:${index}` };
  }
  if (state.openCat) {
    const kind = state.openCat;
    return { mode: "day", kind, index: idxFor(kind, state.dayIndex), id: `day:${state.dayIndex}:${kind}` };
  }
  return null;
}

function ctxItem(ctx) {
  if (ctx.kind === "vocab") return CONTENT.decks[ctx.mode === "day" ? idxFor("vocab", state.dayIndex) : ctx.index];
  if (ctx.kind === "bausteine") return null; // uses prog.idxs
  const idx = ctx.mode === "day" ? idxFor(ctx.kind, state.dayIndex) : ctx.index;
  return CONTENT[ctx.kind][idx];
}

function initProgressFor(kind, ref) {
  if (kind === "vocab") { const deck = CONTENT.decks[ref]; return { order: shuffledIndices(deck.cards.length), i: 0, flipped: false, known: [], review: [] }; }
  if (kind === "bausteine") { const idxs = ref; const optionOrder = {}; idxs.forEach(qi => { optionOrder[qi] = shuffleArr(CONTENT.bausteine[qi].options); }); return { idxs, answers: {}, optionOrder }; }
  if (kind === "lesen") return { answers: {} };
  if (kind === "hoeren") return { revealed: false, answers: {} };
  if (kind === "schreiben") return { draft: "", checked: {} };
  if (kind === "sprechen") return { practiced: false };
  if (kind === "grammatik") { const g = CONTENT.grammatik[ref]; return { answers: {}, optionOrder: g.items.map(it => shuffleArr(it.options)) }; }
  return {};
}

function initForCtx(ctx) {
  const day = ctx.mode === "day";
  if (ctx.kind === "vocab") return initProgressFor("vocab", day ? idxFor("vocab", state.dayIndex) : ctx.index);
  if (ctx.kind === "bausteine") return initProgressFor("bausteine", day ? baustSetForDay(state.dayIndex) : baustLibSet(ctx.index));
  if (ctx.kind === "grammatik") return initProgressFor("grammatik", day ? idxFor("grammatik", state.dayIndex) : ctx.index);
  return initProgressFor(ctx.kind, 0);
}

function ctxProgress(ctx) {
  if (ctx.mode === "mock") {
    if (!state.mock.prog[ctx.partIndex]) state.mock.prog[ctx.partIndex] = initForCtx(ctx);
    return state.mock.prog[ctx.partIndex];
  }
  if (ctx.mode === "lib") {
    if (!state.libProgress[ctx.id]) state.libProgress[ctx.id] = initForCtx(ctx);
    return state.libProgress[ctx.id];
  }
  if (!state.progress[ctx.kind]) state.progress[ctx.kind] = initForCtx(ctx);
  return state.progress[ctx.kind];
}

// Apply an update to the currently-open exercise's progress and re-render.
function patchProgress(fn) {
  const ctx = currentCtx();
  if (!ctx) return;
  const next = fn(ctxProgress(ctx));
  if (ctx.mode === "mock") state.mock = { ...state.mock, prog: { ...state.mock.prog, [ctx.partIndex]: next } };
  else if (ctx.mode === "lib") state.libProgress = { ...state.libProgress, [ctx.id]: next };
  else state.progress = { ...state.progress, [ctx.kind]: next };
  persist();
  render();
}

// back-compat helper still used by the daily hero bar
function ensureProgress(key) {
  if (!state.progress[key]) state.progress[key] = initForCtx({ mode: "day", kind: key });
  return state.progress[key];
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
  const ctx = currentCtx();
  if (!ctx || ctx.kind !== "vocab") return;
  patchProgress(p => {
    const cardIdx = p.order[p.i];
    return {
      ...p, i: p.i + 1, flipped: false,
      known: result === "known" ? [...p.known, cardIdx] : p.known,
      review: result === "review" ? [...p.review, cardIdx] : p.review
    };
  });
  if (ctx.mode === "day") {
    const deck = CONTENT.decks[idxFor("vocab", state.dayIndex)];
    const p = state.progress.vocab;
    if (p && p.i >= deck.cards.length && !state.done.vocab) setState({ done: { ...state.done, vocab: true } });
  }
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
    <a href="#uebungen" class="nav-btn">Übungen</a>
    <a href="#plan" class="nav-btn">15-Tage-Plan</a>
    <a href="#schreibhilfe" class="nav-btn">Schreibhilfe</a>
    <a href="#sprechhilfe" class="nav-btn">Sprechhilfe</a>
    <a href="#mocktest" class="nav-btn">Mock-Test</a>
    <a href="#sync" class="nav-btn">Sync</a>
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
        <div class="plan-chips">${planTaskChips(pd)}</div>
        <div class="plan-day-tip"><span class="focus-tip-label">Tipp</span> ${esc(pd.tip)}</div>
      </div>
    </div>`;
  }).join("");
  return `
  <section id="plan" class="section container">
    <div class="section-head"><div><h2 class="section-title">15-Tage-Plan</h2><div class="section-sub">1.–15. Juli · fester Fahrplan bis zur Prüfung. Der Tag „Heute“ folgt genau diesem Plan.</div></div></div>
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
  const runRows = state.mockRuns.map(r => `<tr>
      <td>${esc(r.date)}</td>
      <td>${r.points} / 180 <span style="color:#9A9AA6">· ${fmtDur(r.durationMs)}</span></td>
      <td>L ${r.scaled.lesen} · SB ${r.scaled.bausteine} · H ${r.scaled.hoeren}</td>
      <td><span class="pill ${r.pass ? "pass" : "fail"}">${r.pct}%</span></td>
    </tr>`).join("");
  const bestPct = state.mockRuns.length ? Math.max(...state.mockRuns.map(r => r.pct)) : 0;

  return `
  <section id="mocktest" class="section container">
    <div class="section-head"><div><h2 class="section-title">Mock-Test</h2><div class="section-sub">Kompletter Übungstest (Leseverstehen + Sprachbausteine + Hörverstehen) — auf Zeit, ohne Zwischen-Feedback, dann automatisch bewertet. So oft du willst.</div></div></div>
    <div class="helper-card mock-start-card">
      <div class="mock-start-left">
        <div class="mock-start-title">Neuen Mock-Test starten</div>
        <div class="mock-start-sub">6 Teile · ca. 20–30 Min · Feedback erst am Ende. ${state.mockRuns.length ? `Versuche: ${state.mockRuns.length} · Bestwert: ${bestPct}%` : "Noch kein Versuch."}</div>
      </div>
      <button class="finish-btn" data-action="start-mock">▶ Mock-Test starten</button>
    </div>
    ${state.mockRuns.length ? `<div class="helper-card">
      <div class="helper-title" style="font-size:15px;margin-bottom:10px">Deine Versuche</div>
      <table class="mock-table">
        <thead><tr><th>Datum</th><th>Punkte (obj.)</th><th>Sektionen</th><th>Ergebnis</th></tr></thead>
        <tbody>${runRows}</tbody>
      </table>
    </div>` : ""}
    <div class="section-head" style="margin-top:8px"><div><h3 class="helper-title" style="font-size:16px">Punkte-Protokoll (Schreiben &amp; Sprechen)</h3><div class="section-sub">Eigene Punkte inkl. Schreiben/Sprechen gegen 135 schriftlich / 45 mündlich (keine Kompensation)</div></div></div>
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

function renderVocab(deck, p) {
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
    ${srcTag(deck.source)}<div class="ex-progress">Karte ${p.i + 1} / ${total} · Thema „${esc(deck.de)}“</div>
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

function renderBausteine(_item, p, reveal = true) {
  const pool = CONTENT.bausteine;
  const answered = Object.keys(p.answers).length;
  const correct = p.idxs.filter(qi => p.answers[qi] === pool[qi].answer).length;
  const rows = p.idxs.map((qi, n) => {
    const q = pool[qi];
    const picked = p.answers[qi];
    const optsHtml = p.optionOrder[qi].map(o => {
      let cls = "opt-btn";
      if (picked) { if (reveal) { if (o === q.answer) cls += " correct"; else if (o === picked) cls += " incorrect"; } else if (o === picked) cls += " selected"; }
      return `<button class="${cls}" data-action="answer-bausteine" data-qi="${qi}" data-opt="${esc(o)}" ${reveal && picked ? "disabled" : ""}>${esc(o)}</button>`;
    }).join("");
    return `<div class="q-block">
      <div class="q-num">Frage ${n + 1} / ${p.idxs.length}</div>
      <div class="q-text">${esc(q.q).replace("___", "<u>___</u>")}</div>
      <div class="q-options">${optsHtml}</div>
      ${reveal && picked ? `<div class="q-hint">${esc(q.hint)}</div>` : ""}
    </div>`;
  }).join("");
  const src = pool[p.idxs[0]] && pool[p.idxs[0]].source;
  return `
    ${reveal ? srcTag(src) : ""}<div class="ex-intro">Wählen Sie die richtige Lösung (a / b / c).</div>
    <div class="ex-progress">${answered} / ${p.idxs.length} beantwortet${reveal ? ` · ${correct} richtig` : ""}</div>
    ${rows}`;
}

function renderLesen(item, p, reveal = true) {
  if (item.type === "mc") {
    const answered = Object.keys(p.answers).length;
    const correct = item.questions.filter((q, i) => p.answers[i] === q.answer).length;
    const qHtml = item.questions.map((q, i) => {
      const picked = p.answers[i];
      const optsHtml = q.options.map(o => {
        let cls = "opt-btn";
        if (picked) { if (reveal) { if (o === q.answer) cls += " correct"; else if (o === picked) cls += " incorrect"; } else if (o === picked) cls += " selected"; }
        return `<button class="${cls}" data-action="answer-lesen-mc" data-qi="${i}" data-opt="${esc(o)}" ${reveal && picked ? "disabled" : ""}>${esc(o)}</button>`;
      }).join("");
      return `<div class="q-block"><div class="q-num">Frage ${i + 1}</div><div class="q-text">${esc(q.q)}</div><div class="q-options">${optsHtml}</div></div>`;
    }).join("");
    return `${reveal ? srcTag(item.source) : ""}<div class="ex-intro">${esc(item.intro)}</div>
      <div class="passage">${esc(item.text)}</div>
      <div class="ex-progress">${answered} / ${item.questions.length} beantwortet${reveal ? ` · ${correct} richtig` : ""}</div>
      ${qHtml}`;
  }

  if (item.type === "headline") {
    const answered = Object.keys(p.answers).length;
    const correct = item.texts.filter(t => p.answers[t.n] === t.sol).length;
    const rows = item.texts.map(t => {
      const picked = p.answers[t.n];
      const chips = item.headlines.map(h => {
        let cls = "chip-btn";
        if (picked) { if (reveal) { if (h.id === t.sol) cls += " correct"; else if (h.id === picked) cls += " incorrect"; } else if (h.id === picked) cls += " selected"; }
        return `<button class="${cls}" data-action="answer-lesen-match" data-n="${t.n}" data-choice="${h.id}" ${reveal && picked ? "disabled" : ""}>${h.id}</button>`;
      }).join("");
      return `<div class="match-row"><div class="match-n">${t.n}</div><div class="match-text">${esc(t.body)}</div><div class="match-select">${chips}</div></div>`;
    }).join("");
    const legend = item.headlines.map(h => `<div class="ad-item"><span class="ad-id">${h.id}</span>${esc(h.text)}</div>`).join("");
    return `${reveal ? srcTag(item.source) : ""}<div class="ex-intro">${esc(item.intro)}</div>
      <div class="ex-progress">${answered} / ${item.texts.length} beantwortet${reveal ? ` · ${correct} richtig` : ""}</div>
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
      if (picked) { if (reveal) { if (id === s.sol) cls += " correct"; else if (id === picked) cls += " incorrect"; } else if (id === picked) cls += " selected"; }
      return `<button class="${cls}" data-action="answer-lesen-match" data-n="${s.n}" data-choice="${id}" ${reveal && picked ? "disabled" : ""}>${id}</button>`;
    }).join("");
    return `<div class="match-row"><div class="match-n">${s.n}</div><div class="match-text">${esc(s.text)}</div><div class="match-select">${chips}</div></div>`;
  }).join("");
  const legend = item.ads.map(a => `<div class="ad-item"><span class="ad-id">${a.id}</span>${esc(a.text)}</div>`).join("");
  return `${reveal ? srcTag(item.source) : ""}<div class="ex-intro">${esc(item.intro)}</div>
    <div class="ex-progress">${answered} / ${item.situations.length} beantwortet${reveal ? ` · ${correct} richtig` : ""}</div>
    ${rows}
    <div class="ad-list">${legend}</div>`;
}

function renderHoeren(item, p, reveal = true) {
  const answered = Object.keys(p.answers).length;
  const correct = item.statements.filter((s, i) => p.answers[i] === s.answer).length;
  const rows = item.statements.map((s, i) => {
    const picked = p.answers[i];
    const btn = (val, label) => {
      let cls = "rf-btn";
      if (picked !== undefined) { if (reveal) { if (val === s.answer) cls += " correct"; else if (val === picked) cls += " incorrect"; } else if (val === picked) cls += " selected"; }
      return `<button class="${cls}" data-action="answer-hoeren" data-i="${i}" data-val="${val}" ${reveal && picked !== undefined ? "disabled" : ""}>${label}</button>`;
    };
    return `<div class="statement-row"><div class="statement-text">${esc(s.text)}</div><div class="rf-btns">${btn(true, "Richtig")}${btn(false, "Falsch")}</div></div>`;
  }).join("");
  const transcriptBlock = reveal ? `
    <div class="transcript-toggle">
      <button class="mark-done-btn secondary" data-action="toggle-transcript">${p.revealed ? "Transkript ausblenden" : "Transkript anzeigen"}</button>
    </div>
    ${p.revealed ? `<div class="passage">${esc(item.transcript)}</div>` : ""}` : "";
  return `
    ${reveal ? srcTag(item.source) : ""}<div class="ex-intro"><strong>${esc(item.kind)}:</strong> „${esc(item.title)}“ — Tipp: Lesen Sie zuerst die Aussagen, wie in der echten Prüfung.</div>
    <div class="ex-progress">${answered} / ${item.statements.length} beantwortet${reveal ? ` · ${correct} richtig` : ""}</div>
    ${rows}
    ${transcriptBlock}
  `;
}

function renderSchreiben(item, p) {
  const checkedCount = item.leitpunkte.filter((_, i) => p.checked[i]).length;
  const leitHtml = item.leitpunkte.map((lp, i) => {
    const on = !!p.checked[i];
    return `<button class="checklist-item ${on ? "checked" : ""}" data-action="toggle-leitpunkt" data-i="${i}">
      <span class="check-box">${on ? "✓" : ""}</span>
      <span class="checklist-text">${esc(lp)}</span>
    </button>`;
  }).join("");
  const n = item.leitpunkte.length;
  const regLabel = item.register === "informell" ? "Informell" : item.register === "Kurznachricht" ? "Kurznachricht" : "Halbformell";
  const timeLabel = item.register === "Kurznachricht" ? "10 Min" : "30 Min";
  return `
    ${srcTag(item.source)}<div class="task-meta"><span class="task-badge">${regLabel}</span><span class="task-badge">${n} ${n === 1 ? "Leitpunkt" : "Leitpunkte"}</span><span class="task-badge">${timeLabel}</span></div>
    <div class="situation">${esc(item.situation)}</div>
    <div class="recipient">${esc(item.recipient)}</div>
    <div class="leitpunkte">${leitHtml}</div>
    <div class="ex-progress">${checkedCount} / ${n} Punkte abgedeckt</div>
    <textarea class="email-area" data-action-input="schreiben-draft" placeholder="Schreiben Sie hier Ihre E-Mail …">${esc(p.draft || "")}</textarea>
    <div><button class="mark-done-btn secondary" data-action="jump-schreibhilfe" style="margin-top:14px">→ Zur Schreibhilfe (Vorlage &amp; Redemittel)</button></div>
  `;
}

function renderSprechen(item, p) {
  const cueHtml = item.cues.map(c => `<div class="cue-item"><span class="cue-dot">→</span>${esc(c)}</div>`).join("");
  return `
    ${srcTag(item.source)}<div class="task-meta"><span class="task-badge">Teil ${item.teil}</span><span class="task-badge">${item.type === "meinung" ? "Meinung äußern" : "Gemeinsam planen"}</span></div>
    <div class="situation">${esc(item.topic)}</div>
    <div class="cue-list">${cueHtml}</div>
    <button class="checklist-item ${p.practiced ? "checked" : ""}" data-action="toggle-practiced">
      <span class="check-box">${p.practiced ? "✓" : ""}</span>
      <span class="checklist-text">Ich habe laut geübt (allein oder mit Partner) und „Was denkst du dazu?“ benutzt.</span>
    </button>
    <div><button class="mark-done-btn secondary" data-action="jump-sprechhilfe" style="margin-top:14px">→ Zur Sprechhilfe (Redemittel)</button></div>
  `;
}

function renderGrammatik(g, p, reveal = true) {
  const answered = Object.keys(p.answers).length;
  const correct = g.items.filter((it, i) => p.answers[i] === it.answer).length;
  const rows = g.items.map((it, i) => {
    const picked = p.answers[i];
    const optsHtml = p.optionOrder[i].map(o => {
      let cls = "opt-btn";
      if (picked) { if (reveal) { if (o === it.answer) cls += " correct"; else if (o === picked) cls += " incorrect"; } else if (o === picked) cls += " selected"; }
      return `<button class="${cls}" data-action="answer-grammatik" data-qi="${i}" data-opt="${esc(o)}" ${reveal && picked ? "disabled" : ""}>${esc(o)}</button>`;
    }).join("");
    return `<div class="q-block"><div class="q-text">${esc(it.q).replace("___", "<u>___</u>")}</div><div class="q-options">${optsHtml}</div>${reveal && picked ? `<div class="q-hint">${esc(it.hint)}</div>` : ""}</div>`;
  }).join("");
  return `
    <div style="font-size:15px;font-weight:800;margin-bottom:4px">${esc(g.topic)} <span style="color:#9A9AA6;font-weight:600;font-size:13px">· ${esc(g.en)}</span></div>
    ${reveal ? `<div class="rule-box">${esc(g.rule)}</div>` : ""}
    <div class="ex-progress">${answered} / ${g.items.length} beantwortet${reveal ? ` · ${correct} richtig` : ""}</div>
    ${rows}
  `;
}

const ENGINES = { vocab: renderVocab, bausteine: renderBausteine, lesen: renderLesen, hoeren: renderHoeren, schreiben: renderSchreiben, sprechen: renderSprechen, grammatik: renderGrammatik };

// Resolve the item + progress for a ctx and run the matching engine.
function renderEngineFor(ctx) {
  const prog = ctxProgress(ctx);
  const reveal = ctx.mode !== "mock" || (state.mock && state.mock.submitted);
  return ENGINES[ctx.kind](ctxItem(ctx), prog, reveal);
}

// ------------------------------------------------------------------ Übungen library
const SKILL_NAMES = { lesen: "Leseverstehen", bausteine: "Sprachbausteine", hoeren: "Hörverstehen", grammatik: "Grammatik-Review", vocab: "Wortschatz" };

function libExerciseMeta(kind, index) {
  const skill = SKILL_NAMES[kind];
  if (kind === "vocab") { const d = CONTENT.decks[index]; return { title: `${d.de} · ${d.cards.length} Karten`, skill, source: d.source }; }
  if (kind === "bausteine") {
    const idxs = baustLibSet(index);
    const src = CONTENT.bausteine[idxs[0]] && CONTENT.bausteine[idxs[0]].source;
    return { title: src ? "Brief an Karin (10 Lücken)" : `Übungssatz ${index + 1} · 10 Lücken`, skill, source: src };
  }
  const it = CONTENT[kind][index];
  if (kind === "lesen") { const t = { headline: "Teil 1 · Überschriften", mc: "Teil 2 · Text + Fragen", ads: "Teil 3 · Anzeigen" }[it.type]; return { title: t, skill, source: it.source }; }
  if (kind === "hoeren") return { title: it.title, skill, source: it.source };
  if (kind === "grammatik") return { title: it.topic, skill, source: it.source };
  return { title: skill, skill, source: null };
}

function libScoreFor(kind, index) {
  const p = state.libProgress[`lib:${kind}:${index}`];
  const item = kind === "vocab" ? CONTENT.decks[index] : kind === "bausteine" ? null : CONTENT[kind][index];
  let total = 0, correct = 0, answered = 0;
  if (kind === "vocab") { total = item.cards.length; if (p) { answered = p.known.length + p.review.length; correct = p.known.length; } }
  else if (kind === "bausteine") { const idxs = baustLibSet(index); total = idxs.length; if (p) { answered = Object.keys(p.answers).length; correct = idxs.filter(qi => p.answers[qi] === CONTENT.bausteine[qi].answer).length; } }
  else if (kind === "lesen") {
    if (item.type === "mc") { total = item.questions.length; if (p) { answered = Object.keys(p.answers).length; correct = item.questions.filter((q, i) => p.answers[i] === q.answer).length; } }
    else if (item.type === "headline") { total = item.texts.length; if (p) { answered = Object.keys(p.answers).length; correct = item.texts.filter(t => p.answers[t.n] === t.sol).length; } }
    else { total = item.situations.length; if (p) { answered = Object.keys(p.answers).length; correct = item.situations.filter(s => p.answers[s.n] === s.sol).length; } }
  }
  else if (kind === "hoeren") { total = item.statements.length; if (p) { answered = Object.keys(p.answers).length; correct = item.statements.filter((s, i) => p.answers[i] === s.answer).length; } }
  else if (kind === "grammatik") { total = item.items.length; if (p) { answered = Object.keys(p.answers).length; correct = item.items.filter((it, i) => p.answers[i] === it.answer).length; } }
  return { total, correct, answered, touched: !!p };
}
function libScore(ctx) { return libScoreFor(ctx.kind, ctx.index); }

function renderUebungen() {
  const groups = [
    { kind: "lesen", items: CONTENT.lesen.map((_, i) => i) },
    { kind: "bausteine", items: Array.from({ length: Math.ceil(CONTENT.bausteine.length / 10) }, (_, i) => i) },
    { kind: "hoeren", items: CONTENT.hoeren.map((_, i) => i) },
    { kind: "grammatik", items: CONTENT.grammatik.map((_, i) => i) },
    { kind: "vocab", items: CONTENT.decks.map((_, i) => i) }
  ];
  const blocks = groups.map(g => {
    const cards = g.items.map(index => {
      const meta = libExerciseMeta(g.kind, index);
      const s = libScoreFor(g.kind, index);
      let badge;
      if (g.kind === "vocab") badge = s.answered ? `<span class="lib-score part">${s.correct}/${s.total} gewusst</span>` : `<span class="lib-score neu">neu</span>`;
      else if (!s.touched) badge = `<span class="lib-score neu">neu</span>`;
      else badge = `<span class="lib-score ${s.correct === s.total ? "full" : "part"}">${s.correct}/${s.total} richtig</span>`;
      const own = meta.source && meta.source.startsWith("Eigen");
      const real = meta.source ? `<span class="lib-real ${own ? "own" : ""}" title="${esc(meta.source)}">${own ? "dein PDF" : "● echt"}</span>` : "";
      return `<button class="lib-card" data-action="open-lib" data-kind="${g.kind}" data-index="${index}">
        <div class="lib-card-top"><span class="lib-title">${esc(meta.title)}</span>${real}</div>
        <div class="lib-card-bottom">${badge}<span class="lib-open">Üben →</span></div>
      </button>`;
    }).join("");
    return `<div class="lib-group">
      <div class="lib-group-title">${esc(SKILL_NAMES[g.kind])} <span class="lib-count">${g.items.length}</span></div>
      <div class="lib-grid">${cards}</div>
    </div>`;
  }).join("");
  return `
  <section id="uebungen" class="section container">
    <div class="section-head"><div><h2 class="section-title">Übungen</h2><div class="section-sub">Alle Aufgaben frei wählbar. „● echt“ = direkt aus einem telc-Modelltest. Ergebnisse werden gespeichert.</div></div></div>
    ${blocks}
  </section>`;
}

// ------------------------------------------------------------------ Sync
function renderSync() {
  const c = getSyncMeta();
  const ready = syncReady();
  const statusText = syncStatus || (c.lastSync ? "aktuell · " + fmtClock(c.lastSync) : "verbinde …");
  return `
  <section id="sync" class="section container">
    <div class="section-head"><div><h2 class="section-title">Sync</h2><div class="section-sub">Dein Fortschritt ist automatisch auf allen Geräten gleich und immer aktuell. Kein Login, keine Einrichtung.</div></div></div>
    <div class="helper-card">
      <div class="sync-status-row">
        <span class="sync-dot ${ready ? "on" : ""}"></span>
        <span class="sync-state-label">${ready ? "Automatische Synchronisierung aktiv" : "Sync nicht verfügbar"}</span>
        <span id="sync-status" class="sync-status">${esc(statusText)}</span>
      </div>
      <div class="sync-actions">
        <button class="mock-add-btn" data-action="sync-refresh">↻ Jetzt aktualisieren</button>
      </div>
      <div class="sync-help">
        Änderungen werden sofort in der Cloud gespeichert und beim Öffnen (und beim Zurückwechseln zur App) automatisch geladen — jedes Gerät zeigt denselben, aktuellen Stand. Bei gleichzeitigen Änderungen gewinnt die zuletzt gespeicherte Version.
      </div>
    </div>
  </section>`;
}

// ------------------------------------------------------------------ Mock-Test
function scorePart(kind, index, p) {
  const item = kind === "vocab" ? CONTENT.decks[index] : kind === "bausteine" ? null : CONTENT[kind][index];
  let total = 0, correct = 0;
  if (kind === "bausteine") { const idxs = p ? p.idxs : baustLibSet(index); total = idxs.length; if (p) correct = idxs.filter(qi => p.answers[qi] === CONTENT.bausteine[qi].answer).length; }
  else if (kind === "lesen") {
    if (item.type === "mc") { total = item.questions.length; if (p) correct = item.questions.filter((q, i) => p.answers[i] === q.answer).length; }
    else if (item.type === "headline") { total = item.texts.length; if (p) correct = item.texts.filter(t => p.answers[t.n] === t.sol).length; }
    else { total = item.situations.length; if (p) correct = item.situations.filter(s => p.answers[s.n] === s.sol).length; }
  }
  else if (kind === "hoeren") { total = item.statements.length; if (p) correct = item.statements.filter((s, i) => p.answers[i] === s.answer).length; }
  else if (kind === "grammatik") { total = item.items.length; if (p) correct = item.items.filter((it, i) => p.answers[i] === it.answer).length; }
  return { total, correct };
}

function buildMock() {
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const byType = t => CONTENT.lesen.map((it, i) => ({ it, i })).filter(x => x.it.type === t).map(x => x.i);
  const parts = [];
  [byType("headline"), byType("mc"), byType("ads")].forEach(pool => { if (pool.length) parts.push({ kind: "lesen", index: pick(pool) }); });
  parts.push({ kind: "bausteine", index: Math.floor(Math.random() * Math.ceil(CONTENT.bausteine.length / 10)) });
  shuffleArr(CONTENT.hoeren.map((_, i) => i)).slice(0, Math.min(2, CONTENT.hoeren.length)).forEach(i => parts.push({ kind: "hoeren", index: i }));
  return { id: Date.now(), parts, i: 0, prog: {}, submitted: false, reviewing: false, startedAt: Date.now(), durationMs: 0 };
}

function scoreMock(m) {
  const sec = { lesen: { c: 0, t: 0 }, bausteine: { c: 0, t: 0 }, hoeren: { c: 0, t: 0 } };
  m.parts.forEach((part, pi) => { const s = scorePart(part.kind, part.index, m.prog[pi]); sec[part.kind].c += s.correct; sec[part.kind].t += s.total; });
  const scaled = {
    lesen: sec.lesen.t ? Math.round(sec.lesen.c / sec.lesen.t * 75) : 0,
    bausteine: sec.bausteine.t ? Math.round(sec.bausteine.c / sec.bausteine.t * 30) : 0,
    hoeren: sec.hoeren.t ? Math.round(sec.hoeren.c / sec.hoeren.t * 75) : 0
  };
  const c = sec.lesen.c + sec.bausteine.c + sec.hoeren.c;
  const t = sec.lesen.t + sec.bausteine.t + sec.hoeren.t;
  const pct = t ? Math.round(c / t * 100) : 0;
  return { sec, scaled, c, t, pct, points: scaled.lesen + scaled.bausteine + scaled.hoeren, max: 180, pass: pct >= 60 };
}

function fmtDur(ms) { const s = Math.floor(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }
function mockPartLabel(part) {
  if (part.kind === "bausteine") return "Sprachbausteine";
  if (part.kind === "hoeren") return `Hörverstehen · ${CONTENT.hoeren[part.index].title}`;
  const it = CONTENT.lesen[part.index];
  return "Leseverstehen · " + ({ headline: "Teil 1", mc: "Teil 2", ads: "Teil 3" }[it.type]);
}

let mockTimerId = null;
function startMockTimer() { stopMockTimer(); mockTimerId = setInterval(updateMockTimer, 1000); }
function stopMockTimer() { if (mockTimerId) { clearInterval(mockTimerId); mockTimerId = null; } }
function updateMockTimer() {
  const el = document.getElementById("mock-timer");
  if (!el || !state.mock || state.mock.submitted) { stopMockTimer(); return; }
  el.textContent = fmtDur(Date.now() - state.mock.startedAt);
}

function startMock() { setState({ mock: buildMock(), openCat: null, openLib: null }); startMockTimer(); }
function submitMock() {
  stopMockTimer();
  const m = { ...state.mock, submitted: true, reviewing: false, i: 0, durationMs: Date.now() - state.mock.startedAt };
  const res = scoreMock(m);
  const run = { id: m.id, date: todayKey(), pct: res.pct, points: res.points, max: res.max, pass: res.pass, scaled: res.scaled, sec: res.sec, durationMs: m.durationMs };
  setState({ mock: m, mockRuns: [run, ...state.mockRuns].slice(0, 30) });
}
function mockNav(delta) { const m = state.mock; setState({ mock: { ...m, i: Math.max(0, Math.min(m.parts.length - 1, m.i + delta)) } }); }

function renderMockRun() {
  const m = state.mock;
  if (!m) return "";
  if (m.submitted && !m.reviewing) return renderMockResult(m);
  const reviewing = m.submitted && m.reviewing;
  const ctx = mockPartCtx();
  return `
  <div class="overlay">
    <div class="modal mock-modal">
      <div class="modal-head">
        <div class="modal-head-left">
          <button class="back-btn" data-action="${reviewing ? "mock-to-result" : "mock-abort"}" aria-label="Zurück">${reviewing ? "←" : "✕"}</button>
          <div><div class="modal-title">${reviewing ? "Antworten ansehen" : "Mock-Test"}</div><div class="modal-task">Teil ${m.i + 1} von ${m.parts.length} · ${esc(mockPartLabel(m.parts[m.i]))}</div></div>
        </div>
        ${reviewing ? "" : `<div class="mock-timer-wrap">⏱ <span id="mock-timer">${fmtDur(Date.now() - m.startedAt)}</span></div>`}
      </div>
      <div class="modal-body">
        <div class="mock-progressbar"><div class="mock-progressbar-fill" style="width:${Math.round((m.i + 1) / m.parts.length * 100)}%"></div></div>
        ${renderEngineFor(ctx)}
        <div class="mock-nav">
          <button class="mark-done-btn secondary" data-action="mock-prev" ${m.i === 0 ? "disabled" : ""}>← Zurück</button>
          ${m.i < m.parts.length - 1
            ? `<button class="mark-done-btn" data-action="mock-next">Weiter →</button>`
            : (reviewing
              ? `<button class="mark-done-btn" data-action="mock-to-result">Zum Ergebnis →</button>`
              : `<button class="mark-done-btn" data-action="mock-submit">Abgeben &amp; auswerten</button>`)}
        </div>
      </div>
    </div>
  </div>`;
}

function renderMockResult(m) {
  const res = scoreMock(m);
  const secRow = (label, key, max) => {
    const c = res.sec[key].c, t = res.sec[key].t, pct = t ? Math.round(c / t * 100) : 0;
    return `<div class="mock-res-row"><span class="mock-res-name">${label}</span><span class="mock-res-pts">${c}/${t} · ${res.scaled[key]}/${max} Pkt</span><span class="pill ${pct >= 60 ? "pass" : "fail"}">${pct}%</span></div>`;
  };
  return `
  <div class="overlay">
    <div class="modal mock-modal">
      <div class="modal-head"><div class="modal-head-left"><button class="back-btn" data-action="mock-close" aria-label="Schließen">✕</button><div><div class="modal-title">Ergebnis</div><div class="modal-task">Mock-Test · Dauer ${fmtDur(m.durationMs)}</div></div></div></div>
      <div class="modal-body">
        <div class="mock-result-big ${res.pass ? "pass" : "fail"}"><span class="mrb-pct">${res.pct}%</span><span class="mrb-sub">${res.points} / 180 Punkte (objektiv)</span></div>
        <div class="mock-result-verdict ${res.pass ? "pass" : "fail"}">${res.pass ? "✓ 60 %-Grenze erreicht — stark!" : "✗ Noch unter 60 % — dranbleiben!"}</div>
        <div class="mock-res-table">
          ${secRow("Leseverstehen", "lesen", 75)}
          ${secRow("Sprachbausteine", "bausteine", 30)}
          ${secRow("Hörverstehen", "hoeren", 75)}
        </div>
        <div class="mock-note">Schriftlicher Ausdruck (45) &amp; Mündlicher Ausdruck (75) werden von Menschen bewertet — trage sie unten im Punkte-Protokoll selbst ein.</div>
        <div class="mock-nav">
          <button class="mark-done-btn secondary" data-action="mock-review">Antworten ansehen</button>
          <button class="mark-done-btn" data-action="mock-again">Neuer Mock-Test</button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderModal() {
  const ctx = currentCtx();
  if (!ctx) return "";
  if (ctx.mode === "lib") return renderLibModal(ctx);

  const key = ctx.kind;
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
        ${renderEngineFor(ctx)}
        <div style="margin-top:22px;padding-top:18px;border-top:1px solid #EFEFF1;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div style="font-size:12.5px;color:#0B7359;font-weight:700">${done ? "✓ Heute erledigt" : ""}</div>
          <button class="mark-done-btn" data-action="toggle-done" data-key="${key}">${done ? "Als offen markieren" : "Als erledigt markieren"}</button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderLibModal(ctx) {
  const meta = libExerciseMeta(ctx.kind, ctx.index);
  const sc = libScore(ctx);
  return `
  <div class="overlay">
    <div class="modal">
      <div class="modal-head">
        <div class="modal-head-left">
          <button class="back-btn" data-action="close-lib" aria-label="Zurück">←</button>
          <div><div class="modal-title">${esc(meta.title)}</div><div class="modal-task">${esc(meta.skill)}</div></div>
        </div>
        ${sc.total ? `<div class="modal-time">${sc.correct}/${sc.total} richtig</div>` : ""}
      </div>
      <div class="modal-body">
        ${renderEngineFor(ctx)}
        <div style="margin-top:22px;padding-top:18px;border-top:1px solid #EFEFF1;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div style="font-size:12.5px;color:#6B6B78;font-weight:600">Dein Ergebnis wird gespeichert.</div>
          <button class="mark-done-btn secondary" data-action="reset-lib">Neu starten</button>
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
      ${renderUebungen()}
      ${renderPlan()}
      ${renderSchreibhilfe()}
      ${renderSprechhilfe()}
      ${renderMockLog()}
      ${renderSync()}
      <div class="footer-note">B1 Sprint · dein tägliches Trainingsprogramm. Fortschritt &amp; Streak werden lokal in diesem Browser gespeichert. Viel Erfolg am 15. Juli!</div>
    </div>
    ${renderModal()}
    ${renderMockRun()}
    ${renderCelebrate()}
  `;
}

function readMockInput(id, max) {
  const v = parseInt(document.getElementById(id).value, 10);
  return isNaN(v) ? 0 : Math.max(0, Math.min(max, v));
}

function onClick(e) {
  const overlay = e.target.closest(".overlay");
  if (overlay && !e.target.closest(".modal")) {
    if (state.mock) return; // don't lose a running mock on an accidental outside click
    setState({ openCat: null, openLib: null });
    return;
  }

  const flip = e.target.closest('[data-action="flip"]');
  if (flip) {
    const ctx = currentCtx();
    if (!ctx) return;
    const p = ctxProgress(ctx);
    p.flipped = !p.flipped;
    touch();
    schedulePersist();
    flip.classList.toggle("flipped", p.flipped);
    return;
  }

  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;

  if (action === "open") { setState({ openCat: btn.dataset.key, openLib: null }); return; }
  if (action === "close") { setState({ openCat: null }); return; }
  if (action === "open-lib") { setState({ openLib: { kind: btn.dataset.kind, index: Number(btn.dataset.index) }, openCat: null }); return; }
  if (action === "close-lib") { setState({ openLib: null }); return; }
  if (action === "reset-lib") {
    const ctx = currentCtx();
    if (ctx && ctx.mode === "lib") { const { [ctx.id]: _drop, ...rest } = state.libProgress; setState({ libProgress: rest }); }
    return;
  }
  if (action === "sync-refresh") { pullFresh(true); return; }

  if (action === "start-mock" || action === "mock-again") { startMock(); return; }
  if (action === "mock-prev") { mockNav(-1); return; }
  if (action === "mock-next") { mockNav(1); return; }
  if (action === "mock-submit") { submitMock(); return; }
  if (action === "mock-abort") { stopMockTimer(); setState({ mock: null }); return; }
  if (action === "mock-close") { stopMockTimer(); setState({ mock: null }); return; }
  if (action === "mock-review") { setState({ mock: { ...state.mock, reviewing: true, i: 0 } }); return; }
  if (action === "mock-to-result") { setState({ mock: { ...state.mock, reviewing: false, i: 0 } }); return; }

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
    patchProgress(p => ({ ...p, answers: { ...p.answers, [qi]: opt } }));
    return;
  }
  if (action === "answer-grammatik") {
    const qi = Number(btn.dataset.qi), opt = btn.dataset.opt;
    patchProgress(p => ({ ...p, answers: { ...p.answers, [qi]: opt } }));
    return;
  }
  if (action === "answer-lesen-mc") {
    const qi = Number(btn.dataset.qi), opt = btn.dataset.opt;
    patchProgress(p => ({ ...p, answers: { ...p.answers, [qi]: opt } }));
    return;
  }
  if (action === "answer-lesen-match") {
    const n = Number(btn.dataset.n), choice = btn.dataset.choice;
    patchProgress(p => ({ ...p, answers: { ...p.answers, [n]: choice } }));
    return;
  }
  if (action === "answer-hoeren") {
    const i = Number(btn.dataset.i), val = btn.dataset.val === "true";
    patchProgress(p => ({ ...p, answers: { ...p.answers, [i]: val } }));
    return;
  }
  if (action === "toggle-transcript") {
    patchProgress(p => ({ ...p, revealed: !p.revealed }));
    return;
  }
  if (action === "toggle-leitpunkt") {
    const i = Number(btn.dataset.i);
    patchProgress(p => ({ ...p, checked: { ...p.checked, [i]: !p.checked[i] } }));
    return;
  }
  if (action === "toggle-practiced") {
    patchProgress(p => ({ ...p, practiced: !p.practiced }));
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
    const ctx = currentCtx();
    if (!ctx || ctx.kind !== "schreiben") return;
    const p = ctxProgress(ctx);
    p.draft = e.target.value;
    touch();
    schedulePersist();
  }
}

const root = document.getElementById("root");
root.addEventListener("click", onClick);
root.addEventListener("input", onInput);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !state.mock && (state.openCat || state.openLib)) setState({ openCat: null, openLib: null }); });

persistLocalOnly(); // anchor calendar date / rolled-over state on first load (no push yet)
render();
if (state.mock && !state.mock.submitted) startMockTimer(); // resume a mock left running before reload
if (syncReady()) doInitialSync().then(render); // cloud is source of truth on load

// Keep it always current: refresh from cloud when returning to the app.
document.addEventListener("visibilitychange", () => { if (!document.hidden) pullFresh(false); });
window.addEventListener("focus", () => pullFresh(false));
