-- Çok dilli blog yazıları
--
-- Her yazı tek satırdır; dile özgü içerik `translations` (jsonb) alanında tutulur:
--
-- {
--   "tr": {
--     "slug": "e-posta-nedir",                 -- zorunlu, dile özgü URL (küçük harf, rakam, tire)
--     "title": "E-posta Nedir?",                -- zorunlu
--     "excerpt": "Kısa özet…",                  -- liste kartı ve varsayılan meta description
--     "content": "<p>HTML içerik…</p>",         -- HTML; sitede gösterilmeden önce temizlenir (XSS)
--     "seo_title": "…",                         -- isteğe bağlı, <title> için (≈60 karakter)
--     "seo_description": "…",                   -- isteğe bağlı, meta description (≈155 karakter)
--     "cover_alt": "…",                         -- isteğe bağlı, kapak görseli alt metni
--     "category": "Rehber"                      -- isteğe bağlı, kartta görünen etiket
--   },
--   "en": { … }, "de": { … }, "ar": { … }
-- }
--
-- Bir dilde çevirisi olmayan yazı o dilde listelenmez ve hreflang'e eklenmez
-- (yinelenen / ince içerik SEO cezası almamak için).

create extension if not exists pgcrypto;

-- translations alanının yapısını doğrular
create or replace function public.blog_translations_valid(t jsonb)
returns boolean
language plpgsql
immutable
as $$
declare
  lang text;
  item jsonb;
begin
  if t is null or jsonb_typeof(t) <> 'object' or t = '{}'::jsonb then
    return false;
  end if;

  for lang, item in select * from jsonb_each(t) loop
    if lang not in ('tr', 'en', 'de', 'ar') then
      return false;
    end if;
    if jsonb_typeof(item) <> 'object' then
      return false;
    end if;
    if coalesce(item->>'slug', '') !~ '^[a-z0-9]+(-[a-z0-9]+)*$' then
      return false;
    end if;
    if length(coalesce(item->>'title', '')) = 0 then
      return false;
    end if;
  end loop;

  return true;
end;
$$;

create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  translations  jsonb not null check (public.blog_translations_valid(translations)),
  cover_image   text check (cover_image is null or cover_image ~ '^https://'),
  tags          text[] not null default '{}',
  status        text not null default 'draft' check (status in ('draft', 'published')),
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint blog_posts_published_has_date check (status = 'draft' or published_at is not null)
);

comment on table public.blog_posts is 'Çok dilli blog yazıları. Dil içerikleri translations (jsonb) alanında.';

-- Her dilde slug benzersiz olmalı ve hızlı bulunmalı
create unique index if not exists blog_posts_slug_tr on public.blog_posts ((translations->'tr'->>'slug'));
create unique index if not exists blog_posts_slug_en on public.blog_posts ((translations->'en'->>'slug'));
create unique index if not exists blog_posts_slug_de on public.blog_posts ((translations->'de'->>'slug'));
create unique index if not exists blog_posts_slug_ar on public.blog_posts ((translations->'ar'->>'slug'));

-- Liste sorgusu: yayındaki yazılar, en yeni önce
create index if not exists blog_posts_published_idx
  on public.blog_posts (published_at desc)
  where status = 'published';

-- updated_at otomatik güncellenir (sitemap lastModified ve dateModified için)
create or replace function public.blog_posts_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists blog_posts_touch_updated_at on public.blog_posts;
create trigger blog_posts_touch_updated_at
  before update on public.blog_posts
  for each row execute function public.blog_posts_touch_updated_at();

-- Güvenlik: site anon anahtarla sadece yayındaki yazıları okuyabilir.
-- Yazma işlemleri yalnızca Supabase paneli / service_role ile yapılır.
alter table public.blog_posts enable row level security;

drop policy if exists "Yayındaki yazılar herkese açık" on public.blog_posts;
create policy "Yayındaki yazılar herkese açık"
  on public.blog_posts
  for select
  to anon, authenticated
  using (status = 'published' and published_at <= now());

revoke insert, update, delete, truncate on public.blog_posts from anon, authenticated;
grant select on public.blog_posts to anon, authenticated;

-- Örnek kayıt (gerekirse yorumdan çıkarın):
-- insert into public.blog_posts (translations, cover_image, tags, status, published_at) values (
--   '{
--     "tr": {"slug": "merhaba-dunya", "title": "Merhaba Dünya", "excerpt": "İlk yazımız.", "content": "<p>Merhaba!</p>"},
--     "en": {"slug": "hello-world", "title": "Hello World", "excerpt": "Our first post.", "content": "<p>Hello!</p>"}
--   }'::jsonb,
--   'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80',
--   array['Rehber'],
--   'published',
--   now()
-- );
