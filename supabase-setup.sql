-- B1 Sprint — cross-device sync backend (run once in Supabase → SQL Editor).
-- Stores one JSON blob per secret "sync code". The public anon key can ONLY
-- call the two functions below (never read the table directly), and every call
-- requires the code, so nobody can list or enumerate other people's data.

create table if not exists public.sync_state (
  code       text primary key,
  data       jsonb       not null,
  updated    bigint      not null,          -- client clock (ms) for last-write-wins
  changed_at timestamptz not null default now()
);

-- Lock the table: with RLS on and no policies, anon/authenticated get NO direct
-- access. Only the SECURITY DEFINER functions below can touch it.
alter table public.sync_state enable row level security;

-- Pull the blob for a code (returns 0 rows if none yet).
create or replace function public.sync_pull(p_code text)
returns table(data jsonb, updated bigint)
language sql security definer set search_path = public as $$
  select data, updated from public.sync_state where code = p_code;
$$;

-- Push a blob; never overwrite a strictly newer remote (protects against a stale
-- device clobbering fresher data).
create or replace function public.sync_push(p_code text, p_data jsonb, p_updated bigint)
returns void
language plpgsql security definer set search_path = public as $$
begin
  insert into public.sync_state(code, data, updated, changed_at)
  values (p_code, p_data, p_updated, now())
  on conflict (code) do update
    set data = excluded.data, updated = excluded.updated, changed_at = now()
    where public.sync_state.updated <= excluded.updated;
end;
$$;

-- Expose only the two functions to the anonymous (public) API key.
revoke all on function public.sync_pull(text)                from public;
revoke all on function public.sync_push(text, jsonb, bigint) from public;
grant execute on function public.sync_pull(text)                to anon;
grant execute on function public.sync_push(text, jsonb, bigint) to anon;
