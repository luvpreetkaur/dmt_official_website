-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run

create table if not exists site_settings (
  id int primary key default 1 check (id = 1),
  hero_title text default 'Divyah Moments of Trance',
  hero_tagline text default 'Psytrance gatherings across India.',
  hero_cta_label text default 'See upcoming events',
  ticket_url text,
  about_title text default 'About DMT',
  about_body text default 'Tell your story here.',
  about_image_url text,
  instagram text,
  youtube text,
  facebook text,
  soundcloud text,
  whatsapp text,
  email text,
  footer_note text default 'Made for the dancefloor.',
  updated_at timestamptz default now()
);
insert into site_settings (id) values (1) on conflict do nothing;

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  venue text,
  city text,
  description text,
  lineup text,
  flyer_url text,
  ticket_url text,
  created_at timestamptz default now()
);

create table if not exists artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  origin text,
  bio text,
  photo_url text,
  link_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'image' check (kind in ('image','video')),
  url text not null,
  caption text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Security: anyone can read, only logged-in admins can write
alter table site_settings enable row level security;
alter table events enable row level security;
alter table artists enable row level security;
alter table gallery enable row level security;

do $$
declare t text;
begin
  foreach t in array array['site_settings','events','artists','gallery'] loop
    execute format('drop policy if exists "public read" on %I', t);
    execute format('create policy "public read" on %I for select using (true)', t);
    execute format('drop policy if exists "admin write" on %I', t);
    execute format('create policy "admin write" on %I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- File uploads (flyers, photos, videos)
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'media');
drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects for update to authenticated using (bucket_id = 'media');
drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects for delete to authenticated using (bucket_id = 'media');
