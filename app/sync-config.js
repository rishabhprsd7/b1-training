// B1 Sprint — Supabase sync config.
// The anon (public) key is safe to ship in client code; data access is gated by
// the SECURITY DEFINER functions in supabase-setup.sql.
export const SUPABASE_URL = "https://ldomwemssfpqaaruldyq.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkb213ZW1zc2ZwcWFhcnVsZHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MjAxMzMsImV4cCI6MjA5ODQ5NjEzM30.IqHt8pUHUbB2nIEfs0Mj0QNDpa86js5WTTIX945XKJQ";

// Single shared dataset id. Every device running this build reads/writes the
// same record, so progress is automatically the same everywhere — no code to
// enter, always current. (Effectively a private capability: keep the site URL
// to yourself, or switch to Supabase Auth if you want true per-account login.)
export const SYNC_RECORD_ID = "b1s-4e14d589e945fa46ea7939406785dea02a076a5e";
