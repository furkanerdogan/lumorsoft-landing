import type { Metadata } from 'next'
import { SITE_URL, defaultLocale, localeInfo, locales, type Locale } from './i18n/config'
import { contact } from '@/components/siteData'

export const abs = (p: string) => `${SITE_URL}${p === '/' ? '' : p}`

type PageSeo = {
  locale: Locale
  /** Sayfanın her dildeki adresi; sadece içeriği olan dilleri döndürün */
  pathFor: (l: Locale) => string
  /** Sayfanın mevcut olduğu diller (varsayılan: hepsi) */
  available?: readonly Locale[]
  title: string
  description: string
  /** true ise layout'taki "%s | Lumorsoft" şablonu uygulanmaz */
  absoluteTitle?: boolean
  image?: { url: string; alt?: string }
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
}

/** canonical + hreflang (x-default dahil) + Open Graph + Twitter */
export function pageMetadata(o: PageSeo): Metadata {
  const available = o.available ?? locales
  const languages: Record<string, string> = {}
  for (const l of available) languages[l] = abs(o.pathFor(l))
  const xDefault = available.includes(defaultLocale) ? defaultLocale : available[0]
  if (xDefault) languages['x-default'] = abs(o.pathFor(xDefault))

  const url = abs(o.pathFor(o.locale))
  // Sayfanın kendi görseli yoksa app/opengraph-image.tsx ile üretilen marka görseli
  const image = o.image ?? { url: abs('/opengraph-image'), alt: 'Lumorsoft' }
  const images = [{ url: image.url, alt: image.alt ?? o.title, ...(o.image ? {} : { width: 1200, height: 630 }) }]

  return {
    title: o.absoluteTitle ? { absolute: o.title } : o.title,
    description: o.description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: o.type ?? 'website',
      url,
      siteName: 'Lumorsoft',
      title: o.title,
      description: o.description,
      locale: localeInfo[o.locale].og,
      alternateLocale: available.filter((l) => l !== o.locale).map((l) => localeInfo[l].og),
      images,
      ...(o.type === 'article' && { publishedTime: o.publishedTime, modifiedTime: o.modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: o.title,
      description: o.description,
      images: images.map((i) => i.url),
    },
    ...(o.noindex && { robots: { index: false, follow: true } }),
  }
}

// ---- JSON-LD (schema.org) ----

export const organizationId = `${SITE_URL}/#organization`

export function organizationLd(locale: Locale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Lumorsoft',
        url: SITE_URL,
        logo: `${SITE_URL}/images/lumorsoftpng_icon_new.png`,
        email: contact.email,
        description,
        sameAs: contact.socials.map((s) => s.href),
        knowsLanguage: [...locales],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: contact.email,
          availableLanguage: ['Turkish', 'English', 'German', 'Arabic'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Lumorsoft',
        inLanguage: localeInfo[locale].intl,
        publisher: { '@id': organizationId },
      },
    ],
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  }
}
