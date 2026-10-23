-- Additive only. Apply to Preview first. Existing event rows, RLS and grants survive.
begin;
alter table public.igg_events
 add column if not exists end_date timestamptz,
 add column if not exists all_day boolean not null default false,
 add column if not exists category text not null default 'Community',
 add column if not exists program_slug text,
 add column if not exists state text not null default 'scheduled',
 add column if not exists archived boolean not null default false,
 add column if not exists media_ids uuid[] not null default '{}',
 add column if not exists registration_url text,
 add column if not exists legacy_id text;
create unique index if not exists igg_events_legacy_id on public.igg_events(legacy_id) where legacy_id is not null;
do $$ begin
 if not exists(select 1 from pg_constraint where conname='igg_events_valid_range') then
  alter table public.igg_events add constraint igg_events_valid_range check(end_date is null or end_date>=date);
 end if;
 if not exists(select 1 from pg_constraint where conname='igg_events_valid_state') then
  alter table public.igg_events add constraint igg_events_valid_state check(state in ('scheduled','cancelled','postponed','completed'));
 end if;
end $$;
create table if not exists public.igg_settings(
 key text primary key, value jsonb not null default '{}', updated_at timestamptz not null default now()
);
alter table public.igg_settings enable row level security;
revoke all on public.igg_settings from anon,authenticated;
grant all on public.igg_settings to service_role;
commit;
