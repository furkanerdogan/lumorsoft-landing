import 'server-only'
import sanitizeHtml from 'sanitize-html'
import { supabase } from './supabase'
import { locales, localeInfo, type Locale } from './i18n/config'

// supabase/migrations/*_create_blog_posts.sql ile aynı yapı
type Translation = {
  slug: string
  title: string
  excerpt?: string
  content?: string
  seo_title?: string
  seo_description?: string
  cover_alt?: string
  category?: string
}

export type PostCard = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string | null
  coverImage: string | null
  coverAlt: string | null
  publishedAt: string
  updatedAt: string
}

export type Post = PostCard & {
  content: string
  seoTitle: string
  seoDescription: string
  /** Bu yazının çevirisi olan dillerdeki slug'lar (hreflang için) */
  slugs: Partial<Record<Locale, string>>
}

const TABLE = 'blog_posts'
// Slug biçimi migration'daki kontrolle aynı; PostgREST filtresine girmeden önce doğrulanır
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/
const isSlug = (s: string) => SLUG_RE.test(s) && s.length <= 200

export function formatDate(dateStr: string, locale: Locale) {
  return new Date(dateStr).toLocaleDateString(localeInfo[locale].intl, { year: 'numeric', month: 'long', day: 'numeric' })
}

/** Bir dildeki yayınlanmış yazılar (o dilde çevirisi olmayanlar listelenmez) */
export async function getPosts(locale: Locale, limit?: number): Promise<PostCard[]> {
  if (!supabase) return []
  const t = `translations->${locale}`
  const columns: string = `id, cover_image, published_at, updated_at, slug:${t}->>slug, title:${t}->>title, excerpt:${t}->>excerpt, category:${t}->>category, cover_alt:${t}->>cover_alt`
  let query = supabase
    .from(TABLE)
    .select(columns)
    .not(`${t}->>slug`, 'is', null)
    .order('published_at', { ascending: false })
  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error) {
    console.error('Blog listesi alınamadı:', error.message)
    return []
  }
  type ListRow = { id: string; cover_image: string | null; published_at: string; updated_at: string; slug: string; title: string; excerpt: string | null; category: string | null; cover_alt: string | null }
  return ((data ?? []) as unknown as ListRow[]).map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? '',
    category: r.category ?? null,
    coverImage: r.cover_image,
    coverAlt: r.cover_alt ?? null,
    publishedAt: r.published_at,
    updatedAt: r.updated_at,
  }))
}

type Row = { id: string; cover_image: string | null; published_at: string; updated_at: string; translations: Partial<Record<Locale, Translation>> }

function toPost(row: Row, locale: Locale): Post | null {
  const tr = row.translations[locale]
  if (!tr) return null
  const slugs: Partial<Record<Locale, string>> = {}
  for (const l of locales) if (row.translations[l]?.slug) slugs[l] = row.translations[l]!.slug
  const excerpt = tr.excerpt ?? ''
  return {
    id: row.id,
    slug: tr.slug,
    title: tr.title,
    excerpt,
    category: tr.category ?? null,
    coverImage: row.cover_image,
    coverAlt: tr.cover_alt ?? null,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    content: cleanHtml(tr.content ?? ''),
    seoTitle: tr.seo_title || tr.title,
    seoDescription: tr.seo_description || excerpt,
    slugs,
  }
}

/** Dildeki slug ile yazı */
export async function getPost(locale: Locale, slug: string): Promise<Post | null> {
  if (!supabase || !isSlug(slug)) return null
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, cover_image, published_at, updated_at, translations')
    .eq(`translations->${locale}->>slug`, slug)
    .maybeSingle()
  if (error) console.error('Blog yazısı alınamadı:', error.message)
  return data ? toPost(data as Row, locale) : null
}

/**
 * Slug başka bir dile aitse (ör. dil değiştiriciden /en/blog/<türkçe-slug>),
 * o yazının istenen dildeki slug'ını döndürür. Çevirisi yoksa null.
 */
export async function findTranslatedSlug(locale: Locale, slug: string): Promise<{ found: boolean; slug: string | null }> {
  if (!supabase || !isSlug(slug)) return { found: false, slug: null }
  const { data } = await supabase
    .from(TABLE)
    .select('translations')
    .or(locales.map((l) => `translations->${l}->>slug.eq.${slug}`).join(','))
    .limit(1)
    .maybeSingle()
  if (!data) return { found: false, slug: null }
  const t = (data as Pick<Row, 'translations'>).translations[locale]
  return { found: true, slug: t?.slug ?? null }
}

/** Sitemap için tüm yazıların dillere göre slug'ları */
export async function getPostSitemapEntries(): Promise<{ updatedAt: string; slugs: Partial<Record<Locale, string>> }[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from(TABLE)
    .select(`updated_at, ${locales.map((l) => `${l}:translations->${l}->>slug`).join(', ')}` as string)
  if (error) {
    console.error('Sitemap için yazılar alınamadı:', error.message)
    return []
  }
  return ((data ?? []) as unknown as Record<string, string | null>[]).map((r) => {
    const slugs: Partial<Record<Locale, string>> = {}
    for (const l of locales) if (r[l]) slugs[l] = r[l]!
    return { updatedAt: r.updated_at!, slugs }
  })
}

// Veritabanından gelen HTML'den script, olay öznitelikleri vb. temizlenir (XSS koruması)
function cleanHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'h1', 'h2'],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'width', 'height', 'loading'],
      '*': ['id'],
    },
    allowedSchemes: ['https', 'mailto', 'tel'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
      img: sanitizeHtml.simpleTransform('img', { loading: 'lazy' }),
    },
  })
}
