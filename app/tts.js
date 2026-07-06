// B1 Sprint — Hörverstehen-Audio über die Web Speech API.
// Liest die Transkripte mit einer deutschen System-Stimme vor (on-device,
// offline, kostenlos). Dialoge: Sprecherwechsel („Name: …“) bekommen
// unterschiedliche Tonhöhen. Lange Texte werden satzweise in die Queue gelegt
// (umgeht Chrome-Abbrüche bei langen Utterances und erlaubt Tempo-Wechsel).

let queue = [], qi = 0, speaking = false, paused = false, rate = 1, key = null;
let gen = 0; // Generationszähler: entwertet onend-Handler nach cancel()
const listeners = [];

export function ttsAvailable() { return typeof window !== "undefined" && "speechSynthesis" in window; }
export function ttsState() { return { speaking, paused, rate, key, total: queue.length, at: Math.min(qi, Math.max(queue.length - 1, 0)) }; }
export function onTts(fn) { listeners.push(fn); }
function emit() { listeners.forEach(f => { try { f(); } catch { /* UI-Callback darf nie das Audio stoppen */ } }); }

function germanVoice() {
  const de = speechSynthesis.getVoices().filter(v => (v.lang || "").toLowerCase().startsWith("de"));
  return de.find(v => /de[-_]de/i.test(v.lang) && /google/i.test(v.name))
    || de.find(v => /de[-_]de/i.test(v.lang))
    || de[0] || null;
}

// „Florian: Hallo!“ → Inhalt ohne Sprechername, Tonhöhe pro Sprecher alternierend.
function chunkTranscript(text) {
  const chunks = [];
  const speakers = new Map();
  for (const raw of String(text).split(/\n+/)) {
    const line = raw.trim();
    if (!line) continue;
    const m = line.match(/^([A-ZÄÖÜ][\w.äöüß-]{0,18}):\s*(.+)$/);
    let pitch = 1, content = line;
    if (m) {
      if (!speakers.has(m[1])) speakers.set(m[1], speakers.size);
      pitch = speakers.get(m[1]) % 2 ? 0.85 : 1.1;
      content = m[2];
    }
    for (const s of content.match(/[^.!?…]+[.!?…]*/g) || []) {
      const t = s.trim();
      if (t) chunks.push({ t, pitch });
    }
  }
  return chunks;
}

function playNext(g) {
  if (g !== gen) return;
  if (qi >= queue.length) { speaking = false; paused = false; key = null; emit(); return; }
  const { t, pitch } = queue[qi];
  const u = new SpeechSynthesisUtterance(t);
  u.lang = "de-DE";
  u.rate = rate;
  u.pitch = pitch;
  // Stimme ist optional — u.lang reicht meist; Setter kann bei Engine-Eigenheiten werfen.
  try { const v = germanVoice(); if (v) u.voice = v; } catch { /* dann Systemwahl über lang */ }
  u.onend = () => { if (g !== gen) return; qi++; emit(); playNext(g); };
  u.onerror = () => { if (g !== gen) return; qi++; playNext(g); };
  speechSynthesis.speak(u);
}

export function ttsPlay(k, text) {
  if (!ttsAvailable()) return;
  ttsStop();
  queue = chunkTranscript(text);
  qi = 0; key = k; speaking = true; paused = false;
  gen++;
  speechSynthesis.getVoices(); // Chrome lädt Stimmen asynchron — anstoßen
  playNext(gen);
  emit();
}

export function ttsPauseResume() {
  if (!speaking) return;
  if (paused) { speechSynthesis.resume(); paused = false; }
  else { speechSynthesis.pause(); paused = true; }
  emit();
}

export function ttsStop() {
  if (!ttsAvailable()) return;
  gen++;
  speechSynthesis.cancel();
  queue = []; qi = 0; speaking = false; paused = false; key = null;
  emit();
}

// Tempo umschalten; greift sofort (aktueller Satz wird mit neuem Tempo neu gestartet).
export function ttsSetRate(r) {
  rate = r;
  if (speaking && !paused) {
    gen++;
    speechSynthesis.cancel();
    playNext(gen);
  }
  emit();
}
