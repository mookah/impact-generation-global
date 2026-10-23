-- Run once in the existing Supabase project's SQL editor. All data is server-only.
create extension if not exists pgcrypto;
create table if not exists public.igg_sources (
 id text primary key, text text not null, published_at timestamptz not null,
 updated_at timestamptz not null, url text not null, image_url text,
 is_video boolean not null default false, category text not null, hash text not null
);
create table if not exists public.igg_media (
 id uuid primary key default gen_random_uuid(), source_id text references public.igg_sources(id),
 storage_path text not null, caption text not null, category text not null, event text not null default '',
 approved boolean not null default false, consent boolean not null default false,
 hash text not null unique, created_at timestamptz not null default now(), check (not approved or consent)
);
create table if not exists public.igg_articles (
 id uuid primary key default gen_random_uuid(), source_id text unique references public.igg_sources(id), source_hash text,
 slug text not null unique, title text not null, body text not null, summary text not null,
 caption text not null default '', description text not null default '', category text not null default 'News',
 status text not null default 'draft' check (status in ('draft','approved','rejected','published')),
 media_id uuid references public.igg_media(id), notify boolean not null default false,
 published_at timestamptz, created_at timestamptz not null default now(),
 facebook_id text unique, facebook_state text not null default 'none' check (facebook_state in ('none','sending','published','uncertain'))
);
create table if not exists public.igg_issues (
 id uuid primary key default gen_random_uuid(), slug text not null unique, month date not null unique,
 title text not null, status text not null default 'draft' check (status in ('draft','approved','published')),
 articles jsonb not null default '[]', retrieval_status text not null,
 notify boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists public.igg_subscribers (
 id uuid primary key default gen_random_uuid(), email text not null unique check (email = lower(email)),
 status text not null default 'pending' check (status in ('pending','confirmed','unsubscribed')),
 frequency text not null check (frequency in ('immediate','daily','monthly')),
 confirm_hash text unique, confirm_expires timestamptz, confirmed_at timestamptz,
 consent_at timestamptz not null default now(), created_at timestamptz not null default now()
);
create table if not exists public.igg_deliveries (
 id uuid primary key default gen_random_uuid(), publication_id text not null,
 subscriber_id uuid not null references public.igg_subscribers(id),
 frequency text not null, title text not null, summary text not null, url text not null, media_id uuid,
 state text not null default 'pending' check (state in ('pending','sending','sent','cancelled','uncertain')),
 due_at timestamptz not null default now(), first_attempt_at timestamptz, lease_at timestamptz,
 payload jsonb, stories jsonb not null default '[]', provider_id text, attempts int not null default 0, last_error text,
 unique (publication_id, subscriber_id)
);
create table if not exists public.igg_audit (
 id uuid primary key default gen_random_uuid(), action text not null, detail text not null,
 created_at timestamptz not null default now()
);
create table if not exists public.igg_limits (key text primary key, count int not null, expires timestamptz not null);
create table if not exists public.igg_events (
 id uuid primary key default gen_random_uuid(), title text not null, date timestamptz not null,
 location text not null, description text not null, approved boolean not null default false,
 created_at timestamptz not null default now()
);
-- No public policies: anonymous/authenticated clients cannot access private records.
do $$ declare t text; begin
 foreach t in array array['igg_sources','igg_media','igg_articles','igg_issues','igg_subscribers','igg_deliveries','igg_audit','igg_limits','igg_events'] loop
 execute format('alter table public.%I enable row level security', t);
 execute format('revoke all on public.%I from anon, authenticated', t);
 execute format('grant all on public.%I to service_role', t);
 end loop;
end $$;

create or replace function public.igg_rate(p_key text, p_limit int, p_seconds int) returns boolean
language plpgsql security definer set search_path = public as $$
declare n int;
begin
 insert into igg_limits(key,count,expires) values(p_key,1,now()+make_interval(secs=>p_seconds))
 on conflict(key) do update set count=case when igg_limits.expires<now() then 1 else igg_limits.count+1 end,
 expires=case when igg_limits.expires<now() then now()+make_interval(secs=>p_seconds) else igg_limits.expires end
 returning count into n;
 return n<=p_limit;
end $$;

-- Publication and recipient snapshots are one transaction. Edits cannot enqueue again.
create or replace function public.igg_publish(p_id uuid, p_issue boolean, p_notify boolean) returns void
language plpgsql security definer set search_path = public as $$
declare a igg_articles; n igg_issues; pub text; ttl text; sm text; link text; img uuid;
begin
 if p_issue then
  select * into n from igg_issues where id=p_id for update;
  if n.id is null or n.status<>'approved' or jsonb_array_length(n.articles)=0 then raise exception 'Issue must have verified articles and approval'; end if;
  if exists(select 1 from jsonb_array_elements(n.articles) r where r->>'media_id' is not null and not exists(select 1 from igg_media m where m.id::text=r->>'media_id' and m.approved and m.consent)) then raise exception 'Photograph approval required'; end if;
  update igg_issues set status='published',notify=p_notify where id=p_id;
  pub:='issue:'||p_id; ttl:=n.title; sm:='Read our latest ministry reports and community updates.'; link:='/newsletter/'||n.slug;
 else
  select * into a from igg_articles where id=p_id for update;
  if a.id is null or a.status<>'approved' or a.published_at is not null then raise exception 'Article must be approved and unpublished'; end if;
  if a.source_id is not null and a.source_hash is distinct from (select hash from igg_sources where id=a.source_id) then raise exception 'Source changed; review again'; end if;
  if a.media_id is not null and not exists(select 1 from igg_media where id=a.media_id and approved and consent) then raise exception 'Media approval required'; end if;
  update igg_articles set status='published',published_at=now(),notify=p_notify where id=p_id;
  pub:='article:'||p_id; ttl:=a.title; sm:=a.summary; link:='/news/'||a.slug; img:=a.media_id;
 end if;
 if p_notify then
  insert into igg_deliveries(publication_id,subscriber_id,frequency,title,summary,url,media_id,due_at)
  select pub,id,frequency,ttl,sm,link,img,
    case when frequency='daily' then date_trunc('day',now() at time zone 'Africa/Lusaka') at time zone 'Africa/Lusaka'+interval '1 day 5 hours' else now() end
  from igg_subscribers where status='confirmed' and confirmed_at is not null and
    ((p_issue and frequency='monthly') or (not p_issue and frequency in ('immediate','daily')))
  on conflict do nothing;
 end if;
end $$;

create or replace function public.igg_claim_mail(p_daily boolean) returns setof public.igg_deliveries
language plpgsql security definer set search_path = public as $$
begin
 -- Do not retry ambiguous deliveries beyond the provider's 24-hour idempotency window.
 update igg_deliveries set state='uncertain',last_error='Reconcile with provider before retrying'
 where state in ('pending','sending') and first_attempt_at < now()-interval '23 hours';
 return query
 with selected as (
  select id from igg_deliveries where due_at<=now() and frequency<>'daily'
  and (state='pending' or (state='sending' and lease_at<now()-interval '5 minutes'))
  order by due_at limit 30 for update skip locked
 ) update igg_deliveries d set state='sending',lease_at=now(),first_attempt_at=coalesce(first_attempt_at,now()),attempts=attempts+1
 from selected s where d.id=s.id returning d.*;
end $$;

create or replace function public.igg_confirm(p_hash text) returns boolean
language plpgsql security definer set search_path = public as $$
begin
 update igg_subscribers set status='confirmed',confirmed_at=now(),confirm_hash=null,confirm_expires=null
 where confirm_hash=p_hash and confirm_expires>now() and status='pending';
 return found;
end $$;

-- Restrict security-definer RPCs as well as tables.
revoke all on function public.igg_rate(text,int,int) from public,anon,authenticated;
revoke all on function public.igg_publish(uuid,boolean,boolean) from public,anon,authenticated;
revoke all on function public.igg_claim_mail(boolean) from public,anon,authenticated;
revoke all on function public.igg_confirm(text) from public,anon,authenticated;
grant execute on function public.igg_rate(text,int,int), public.igg_publish(uuid,boolean,boolean), public.igg_claim_mail(boolean), public.igg_confirm(text) to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('impact-media','impact-media',false,10485760,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;

-- A truthful draft placeholder until authenticated September retrieval succeeds.
insert into public.igg_issues(slug,month,title,retrieval_status)
values('september-2026','2026-09-01','September 2026 — Ministry Newsletter','awaiting_facebook_connection') on conflict do nothing;

create or replace function public.igg_invalidate_sources() returns void
language sql security definer set search_path = public as $$
 update igg_articles a set status='draft' from igg_sources s
 where a.source_id=s.id and a.source_hash is distinct from s.hash and a.status='approved' and a.published_at is null;
$$;
create or replace function public.igg_subscribe(p_email text,p_frequency text,p_hash text) returns boolean
language plpgsql security definer set search_path = public as $$
declare s igg_subscribers;
begin
 if p_frequency not in ('immediate','daily','monthly') then raise exception 'Invalid preference'; end if;
 -- Serializes retries and avoids re-confirming or changing a confirmed subscriber anonymously.
 perform pg_advisory_xact_lock(hashtextextended(p_email,0));
 select * into s from igg_subscribers where email=p_email for update;
 if s.status='confirmed' or (s.status='pending' and s.confirm_expires>now()) then return false; end if;
 insert into igg_subscribers(email,frequency,confirm_hash,confirm_expires)
 values(p_email,p_frequency,p_hash,now()+interval '24 hours')
 on conflict(email) do update set status='pending',frequency=p_frequency,confirm_hash=p_hash,confirm_expires=now()+interval '24 hours',consent_at=now();
 return true;
end $$;
revoke all on function public.igg_invalidate_sources() from public,anon,authenticated;
revoke all on function public.igg_subscribe(text,text,text) from public,anon,authenticated;
grant execute on function public.igg_invalidate_sources(),public.igg_subscribe(text,text,text) to service_role;

create or replace function public.igg_prepare_digests() returns void
language plpgsql security definer set search_path = public as $$
begin
 perform pg_advisory_xact_lock(720261023);
 insert into igg_deliveries(publication_id,subscriber_id,frequency,title,summary,url,stories)
 select 'digest:'||to_char(d.due_at at time zone 'Africa/Lusaka','YYYY-MM-DD'), d.subscriber_id,
 'digest','Daily ministry digest','The latest approved stories from Impact Generation Global.','/blog',
 jsonb_agg(jsonb_build_object('title',d.title,'summary',d.summary,'url',d.url,'media_id',d.media_id) order by d.due_at,d.id)
 from igg_deliveries d join igg_subscribers s on s.id=d.subscriber_id
 where d.frequency='daily' and d.state='pending' and d.due_at<=now() and s.status='confirmed' and s.frequency='daily'
 group by d.subscriber_id,to_char(d.due_at at time zone 'Africa/Lusaka','YYYY-MM-DD')
 on conflict(publication_id,subscriber_id) do nothing;
 update igg_deliveries set state='cancelled',last_error='Included in daily digest or preference changed'
 where frequency='daily' and state='pending' and due_at<=now();
end $$;
revoke all on function public.igg_prepare_digests() from public,anon,authenticated;
grant execute on function public.igg_prepare_digests() to service_role;

create or replace function public.igg_save_rewrite(p_source text,p_hash text,p_content jsonb) returns setof igg_articles
language plpgsql security definer set search_path = public as $$
declare a igg_articles;
begin
 perform pg_advisory_xact_lock(hashtextextended(p_source,1));
 select * into a from igg_articles where source_id=p_source for update;
 if a.published_at is not null then raise exception 'Source already published'; end if;
 return query insert into igg_articles(source_id,source_hash,slug,title,body,summary,caption,description,category)
 values(p_source,p_hash,'update-'||replace(p_source,'_','-'),p_content->>'headline',p_content->>'article',p_content->>'summary',p_content->>'caption',p_content->>'description',(select category from igg_sources where id=p_source))
 on conflict(source_id) do update set source_hash=p_hash,title=p_content->>'headline',body=p_content->>'article',summary=p_content->>'summary',caption=p_content->>'caption',description=p_content->>'description',status='draft'
 returning *;
end $$;
revoke all on function public.igg_save_rewrite(text,text,jsonb) from public,anon,authenticated;
grant execute on function public.igg_save_rewrite(text,text,jsonb) to service_role;
