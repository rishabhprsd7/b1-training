// B1 Sprint — KI-Prüfer für den Schriftlichen Ausdruck (Brief/E-Mail).
// Ruft die Claude API direkt aus dem Browser auf (eigener API-Key nötig).
// Der Schlüssel liegt in einem EIGENEN localStorage-Eintrag — bewusst nicht
// Teil des synchronisierten Zustands, damit er nie in der Cloud landet.

const KEY_STORAGE = "b1sprint-anthropic-key";
const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-opus-4-8";

export function getApiKey() { try { return localStorage.getItem(KEY_STORAGE) || ""; } catch { return ""; } }
export function setApiKey(k) { try { localStorage.setItem(KEY_STORAGE, k); } catch { /* private mode o.ä. */ } }
export function clearApiKey() { try { localStorage.removeItem(KEY_STORAGE); } catch { /* s.o. */ } }

// Antwortformat: 5-Kriterien-Rubrik (lernerfreundlich, wie im Beispiel des
// Nutzers) + offizielle telc-Bewertung (3 Kriterien A–D, Summe × 3 = /45).
// Nur der sicher unterstützte JSON-Schema-Kern (type/properties/required/
// enum/items) — Wertebereiche stehen in den descriptions.
const GRADE = {
  type: "object",
  additionalProperties: false,
  properties: {
    note: { type: "string", enum: ["A", "B", "C", "D"] },
    punkte: { type: "integer", description: "A=5, B=3, C=1, D=0" },
    begruendung: { type: "string", description: "1-2 short sentences, simple English, cite German examples from the letter" }
  },
  required: ["note", "punkte", "begruendung"]
};

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    criteria: {
      type: "array",
      description: "Exactly 5 entries, in this order: Task completion, Vocabulary, Grammar, Organization, Register",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string" },
          score: { type: "integer", description: "0-5" },
          feedback: { type: "string", description: "1-2 short sentences, simple English" }
        },
        required: ["name", "score", "feedback"]
      }
    },
    telc: {
      type: "object",
      additionalProperties: false,
      properties: {
        leitpunkte: GRADE,
        gestaltung: GRADE,
        korrektheit: GRADE,
        punkte: { type: "integer", description: "(sum of the three criteria points) x 3, 0-45; 0 if leitpunkte is D" },
        bestanden: { type: "boolean", description: "true if punkte >= 27 (60%)" },
        kommentar: { type: "string", description: "2-3 sentence overall examiner comment, simple English" }
      },
      required: ["leitpunkte", "gestaltung", "korrektheit", "punkte", "bestanden", "kommentar"]
    },
    korrigiert: { type: "string", description: "the learner's letter, minimally corrected, same content and order" },
    tipps: { type: "array", items: { type: "string" }, description: "2-3 highest-impact tips, English, <25 words each" }
  },
  required: ["criteria", "telc", "korrigiert", "tipps"]
};

const SYSTEM = `You are a certified telc Deutsch B1 examiner grading the "Schriftlicher Ausdruck" (letter/email) section of the telc Deutsch B1 exam (Zertifikat Deutsch). Grade exactly like the real exam — strict but fair, calibrated to B1 (correct simple language is fine; do not demand C1 style).

OFFICIAL TELC SCORING — three criteria, each graded A, B, C or D (A=5, B=3, C=1, D=0 points). Final score = (sum of the three criteria) × 3, maximum 45. Special rule: if criterion I is D, the whole section scores 0.
I. Berücksichtigung der Leitpunkte: A = all four Leitpunkte addressed appropriately and with enough substance; B = three addressed well (or all four but thin); C = only two; D = one or none / off task / far too short.
II. Kommunikative Gestaltung: text-type conventions (Anrede, Gruß), register matching the recipient, logical order, connectors and sentence linking.
III. Formale Richtigkeit: grammar (cases, verb position, tense), prepositions, spelling, punctuation. A = at most isolated slips; B = several errors but the message always stays clear; C = errors sometimes hinder understanding; D = large parts incomprehensible.
"bestanden" means punkte >= 27 (60%).

ALSO produce a learner-friendly rubric of exactly 5 criteria in this order, each scored 0-5: "Task completion", "Vocabulary", "Grammar", "Organization", "Register".

FEEDBACK STYLE: 1-2 short sentences per criterion in clear, simple English (the learner is a B1 German student). Quote concrete German examples from the letter with corrections where useful, e.g. „ich habe gegangen" → „ich bin gegangen".

"korrigiert": the learner's letter minimally corrected — fix every language error and unnatural phrasing, keep the learner's content, order and level. Add nothing new (except a missing Anrede/Gruß if required by the task).

If the letter is empty, far too short (under ~30 words), in the wrong language, or ignores the task, still return valid JSON with honest low grades and explain why.`;

// Fehlermeldungen für die UI (deutsch, kurz).
function httpError(status, apiMsg) {
  if (status === 401) return "API-Schlüssel ungültig — bitte prüfen (beginnt mit „sk-ant-…“).";
  if (status === 429) return "Rate-Limit erreicht — eine Minute warten und erneut versuchen.";
  if (status === 529 || status === 503) return "Claude ist gerade überlastet — gleich noch einmal versuchen.";
  return apiMsg || `Fehler ${status} — bitte erneut versuchen.`;
}

// task: {situation, recipient, leitpunkte[], register} · draft: der Briefentwurf
export async function reviewLetter(task, draft) {
  const key = getApiKey();
  if (!key) throw new Error("Kein API-Schlüssel gespeichert.");

  const user = [
    "## Aufgabe (telc B1 Schriftlicher Ausdruck)",
    `Situation: ${task.situation}`,
    `Empfänger/in: ${task.recipient}`,
    `Register: ${task.register || "halbformell"}`,
    "Leitpunkte (alle sollen behandelt werden):",
    ...task.leitpunkte.map((l, i) => `${i + 1}. ${l}`),
    "",
    "## Brief des Lerners (unverändert, bitte bewerten)",
    draft
  ].join("\n");

  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 120000);
  let res;
  try {
    res = await fetch(API_URL, {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        // Bewusst: statische Seite ohne Backend, der Key gehört dem Nutzer
        // selbst und geht ausschließlich an api.anthropic.com.
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 8000,
        thinking: { type: "adaptive" },
        system: SYSTEM,
        output_config: { format: { type: "json_schema", schema: SCHEMA } },
        messages: [{ role: "user", content: user }]
      })
    });
  } catch (e) {
    clearTimeout(timeout);
    if (e.name === "AbortError") throw new Error("Zeitüberschreitung — bitte erneut versuchen.");
    throw new Error("Keine Verbindung zu Claude (offline?).");
  }
  clearTimeout(timeout);

  if (!res.ok) {
    let apiMsg = "";
    try { const err = await res.json(); apiMsg = err && err.error && err.error.message || ""; } catch { /* Text-Fehlerseite */ }
    throw new Error(httpError(res.status, apiMsg));
  }

  const data = await res.json();
  if (data.stop_reason === "refusal") throw new Error("Das Modell hat die Anfrage abgelehnt — bitte erneut versuchen.");
  const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("");
  let out;
  try { out = JSON.parse(text); } catch { throw new Error(data.stop_reason === "max_tokens" ? "Antwort war zu lang — bitte erneut versuchen." : "Antwort war nicht lesbar — bitte erneut versuchen."); }
  return normalize(out);
}

// Defensive Normalisierung: Zahlen klemmen, Pflichtfelder sicherstellen —
// die Tabelle darf nie an einer unerwarteten Antwort zerbrechen.
function normalize(r) {
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, Number(n) || 0));
  const grade = g => ({
    note: ["A", "B", "C", "D"].includes(g && g.note) ? g.note : "D",
    punkte: clamp(g && g.punkte, 0, 5),
    begruendung: String(g && g.begruendung || "")
  });
  if (!r || !Array.isArray(r.criteria) || !r.telc) throw new Error("Antwort war unvollständig — bitte erneut versuchen.");
  return {
    criteria: r.criteria.slice(0, 5).map(c => ({ name: String(c.name || ""), score: clamp(c.score, 0, 5), feedback: String(c.feedback || "") })),
    telc: {
      leitpunkte: grade(r.telc.leitpunkte),
      gestaltung: grade(r.telc.gestaltung),
      korrektheit: grade(r.telc.korrektheit),
      punkte: clamp(r.telc.punkte, 0, 45),
      bestanden: !!r.telc.bestanden,
      kommentar: String(r.telc.kommentar || "")
    },
    korrigiert: String(r.korrigiert || ""),
    tipps: Array.isArray(r.tipps) ? r.tipps.slice(0, 3).map(String) : []
  };
}
