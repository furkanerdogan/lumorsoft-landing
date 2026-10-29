import type { MetadataRoute } from 'next'
import { defaultLocale, locales, path, serviceKeys, servicePath, type Locale, type RouteKey } from '@/lib/i18n/config'
import { getPostSitemapEntries } from '@/lib/posts'
import { abs } from '@/lib/seo'

// Yeni blog yazıları saatte bir sitemap'e eklenir
export const revalidate = 3600

type Entry = MetadataRoute.Sitemap[number]

// Her dil için ayrı URL, hepsi birbirine hreflang ile bağlı
function entries(pathFor: (l: Locale) => string, available: readonly Locale[], opts: Partial<Entry>): MetadataRoute.Sitemap {
  const languages: Record<string, string> = Object.fromEntries(available.map((l) => [l, abs(pathFor(l))]))
  const xDefault = available.includes(defaultLocale) ? defaultLocale : available[0]
  languages['x-default'] = abs(pathFor(xDefault))
  return available.map((l) => ({ url: abs(pathFor(l)), alternates: { languages }, ...opts }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const staticPages: { key: RouteKey; priority: number; changeFrequency: Entry['changeFrequency'] }[] = [
    { key: 'home', priority: 1, changeFrequency: 'weekly' },
    { key: 'services', priority: 0.9, changeFrequency: 'monthly' },
    { key: 'integrations', priority: 0.9, changeFrequency: 'monthly' },
    { key: 'about', priority: 0.7, changeFrequency: 'monthly' },
    { key: 'portfolio', priority: 0.7, changeFrequency: 'monthly' },
    { key: 'blog', priority: 0.8, changeFrequency: 'daily' },
    { key: 'privacy', priority: 0.2, changeFrequency: 'yearly' },
  ]

  const posts = await getPostSitemapEntries()

  return [
    ...staticPages.flatMap((p) =>
      entries((l) => path(l, p.key), locales, { lastModified: now, priority: p.priority, changeFrequency: p.changeFrequency }),
    ),
    ...serviceKeys.flatMap((k) => entries((l) => servicePath(l, k), locales, { lastModified: now, priority: 0.9, changeFrequency: 'monthly' })),
    ...posts.flatMap((p) => {
      const available = locales.filter((l) => p.slugs[l])
      return entries((l) => path(l, 'blog', p.slugs[l]), available, { lastModified: new Date(p.updatedAt), priority: 0.6, changeFrequency: 'weekly' })
    }),
  ]
}
