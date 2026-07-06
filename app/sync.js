// B1 Sprint — automatic cross-device sync via Supabase RPC.
// Every device shares ONE record (SYNC_RECORD_ID), so data is always the same
// everywhere with no setup. Talks only to sync_pull / sync_push (see
// supabase-setup.sql).
import { SUPABASE_URL, SUPABASE_ANON_KEY, SYNC_RECORD_ID } from "./sync-config.js";

const META_KEY = "b1sprint-sync";

export function getSyncMeta() {
  let c = {};
  try { c = JSON.parse(localStorage.getItem(META_KEY) || "{}"); } catch { /* ignore */ }
  return {
    url: (SUPABASE_URL || "").replace(/\/+$/, ""),
    key: SUPABASE_ANON_KEY || "",
    code: SYNC_RECORD_ID || "",
    lastSync: c.lastSync || 0
  };
}
export function setSyncMeta(patch) {
  const c = getSyncMeta();
  localStorage.setItem(META_KEY, JSON.stringify({ lastSync: patch.lastSync ?? c.lastSync }));
}
export function syncReady() { const c = getSyncMeta(); return !!(c.url && c.key && c.code); }

async function rpc(fn, body) {
  const c = getSyncMeta();
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

// Returns { data, updated } or null if nothing stored yet.
export async function syncPull() {
  const rows = await rpc("sync_pull", { p_code: getSyncMeta().code });
  const row = Array.isArray(rows) ? rows[0] : rows;
  return row && row.data ? { data: row.data, updated: Number(row.updated) || 0 } : null;
}
export async function syncPush(dataObj, updated) {
  await rpc("sync_push", { p_code: getSyncMeta().code, p_data: dataObj, p_updated: updated });
}
