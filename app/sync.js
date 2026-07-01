// B1 Sprint — cross-device sync via Supabase RPC.
// Talks only to sync_pull / sync_push (see supabase-setup.sql). The device's
// Supabase URL, anon key and secret sync code live in localStorage (or the
// defaults in sync-config.js).
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./sync-config.js";

const CFG_KEY = "b1sprint-sync";

export function getSyncCfg() {
  let c = {};
  try { c = JSON.parse(localStorage.getItem(CFG_KEY) || "{}"); } catch { /* ignore */ }
  return {
    url: (c.url || SUPABASE_URL || "").replace(/\/+$/, ""),
    key: c.key || SUPABASE_ANON_KEY || "",
    code: c.code || "",
    enabled: !!c.enabled,
    lastSync: c.lastSync || 0
  };
}

export function setSyncCfg(patch) {
  const c = { ...getSyncCfg(), ...patch };
  localStorage.setItem(CFG_KEY, JSON.stringify({ url: c.url, key: c.key, code: c.code, enabled: c.enabled, lastSync: c.lastSync }));
  return c;
}

export function syncConfigured() { const c = getSyncCfg(); return !!(c.url && c.key && c.code); }
export function syncReady() { const c = getSyncCfg(); return !!(c.enabled && c.url && c.key && c.code); }

export function randomCode() {
  const a = "abcdefghijkmnpqrstuvwxyz23456789";
  let s = "";
  const rnd = (typeof crypto !== "undefined" && crypto.getRandomValues) ? crypto.getRandomValues(new Uint32Array(16)) : null;
  for (let i = 0; i < 16; i++) { const r = rnd ? rnd[i] : Math.floor(Math.random() * 1e9); s += a[r % a.length]; if (i === 3 || i === 7 || i === 11) s += "-"; }
  return s;
}

async function rpc(fn, body) {
  const c = getSyncCfg();
  if (!c.url || !c.key) throw new Error("Sync nicht konfiguriert");
  const res = await fetch(`${c.url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: c.key, Authorization: `Bearer ${c.key}` },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`${fn} ${res.status}: ${(await res.text()).slice(0, 140)}`);
  const txt = await res.text();
  return txt ? JSON.parse(txt) : null;
}

// Returns { data, updated } or null if nothing stored yet for this code.
export async function syncPull() {
  const c = getSyncCfg();
  const rows = await rpc("sync_pull", { p_code: c.code });
  const row = Array.isArray(rows) ? rows[0] : rows;
  return row && row.data ? { data: row.data, updated: Number(row.updated) || 0 } : null;
}

export async function syncPush(dataObj, updated) {
  const c = getSyncCfg();
  await rpc("sync_push", { p_code: c.code, p_data: dataObj, p_updated: updated });
}
