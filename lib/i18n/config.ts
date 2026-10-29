// Dil ayarları ve URL eşlemeleri (sunucu + tarayıcı tarafında kullanılır)

export const SITE_URL = 'https://lumorsoft.com'

export const locales = ['tr', 'en', 'de', 'ar'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'tr'

// Kullanıcının dil tercihi (dil değiştirici veya otomatik algılama yazar)
export const LOCALE_COOKIE = 'NEXT_LOCALE'

export const isLocale =(v: string | undefined): v is Locale => !!v && (locales as readonly string[]).includes(v)

export const localeInfo: Record<Locale, { name: string; short: string; dir: 'ltr' | 'rtl'; og: string; intl: string }> = {
  tr: { name: 'Türkçe', short: 'TR', dir: 'ltr', og: 'tr_TR', intl: 'tr-TR' },
  en: { name: 'English', short: 'EN', dir: 'ltr', og: 'en_US', intl: 'en-US' },
  de: { name: 'Deutsch', short: 'DE', dir: 'ltr', og: 'de_DE', intl: 'de-DE' },
  ar: { name: 'العربية', short: 'AR', dir: 'rtl', og: 'ar_AE', intl: 'ar-AE' },
}

// Sayfa anahtarı -> app/[locale]/ altındaki klasör adı
export const routeFolders = {
  home: '',
  about: 'about',
  services: 'services',
  integrations: 'integrations',
  portfolio: 'portfolio',
  blog: 'blog',
  privacy: 'privacy',
} as const
export type RouteKey = keyof typeof routeFolders

// Her dilde görünen URL parçası (SEO için dile özgü adresler)
export const routeSlugs: Record<Exclude<RouteKey, 'home'>, Record<Locale, string>> = {
  about: { tr: 'hakkimizda', en: 'about', de: 'ueber-uns', ar: 'about' },
  services: { tr: 'hizmetler', en: 'services', de: 'leistungen', ar: 'services' },
  integrations: { tr: 'entegrasyonlar', en: 'integrations', de: 'integrationen', ar: 'integrations' },
  portfolio: { tr: 'portfolyo', en: 'portfolio', de: 'portfolio', ar: 'portfolio' },
  blog: { tr: 'blog', en: 'blog', de: 'blog', ar: 'blog' },
  privacy: { tr: 'gizlilik', en: 'privacy', de: 'datenschutz', ar: 'privacy' },
}

// Hizmet detay sayfalarının dile özgü adresleri
export const serviceKeys = ['web', 'mobile', 'marketing', 'social', 'ai'] as const
export type ServiceKey = (typeof serviceKeys)[number]
export const serviceSlugs: Record<ServiceKey, Record<Locale, string>> = {
  web: { tr: 'web-tasarim', en: 'web-design', de: 'webdesign', ar: 'web-design' },
  mobile: { tr: 'mobil-uygulama', en: 'mobile-app-development', de: 'app-entwicklung', ar: 'mobile-app-development' },
  marketing: { tr: 'pazarlama-danismanlik', en: 'digital-marketing', de: 'online-marketing', ar: 'digital-marketing' },
  social: { tr: 'sosyal-medya', en: 'social-media-management', de: 'social-media-management', ar: 'social-media-management' },
  ai: { tr: 'yapay-zeka', en: 'ai-solutions', de: 'ki-loesungen', ar: 'ai-solutions' },
}

export const serviceKeyFromSlug = (locale: Locale, slug: string) =>
  serviceKeys.find((k) => serviceSlugs[k][locale] === slug)

const prefix = (locale: Locale) => (locale === defaultLocale ? '' : `/${locale}`)

/** Bir sayfanın o dildeki adresi: path('en','about') -> '/en/about', path('tr','about') -> '/hakkimizda' */
export function path(locale: Locale, key: RouteKey, sub?: string): string {
  if (key === 'home') return prefix(locale) || '/'
  return `${prefix(locale)}/${routeSlugs[key][locale]}${sub ? `/${sub}` : ''}`
}

export const servicePath = (locale: Locale, key: ServiceKey) => path(locale, 'services', serviceSlugs[key][locale])

/** Ana sayfadaki bölüm bağlantısı: '/#contact', '/en#contact' */
export const sectionPath = (locale: Locale, id: string) => `${prefix(locale) || '/'}#${id}`

/**
 * Adresi çözer: hangi dil, hangi sayfa, alt parça ne.
 * allowInternal: statik üretim sırasında bileşenler iç adresi (/de/services/…) görür; dil değiştirici bunu da tanır.
 * Proxy bunu KULLANMAZ — yoksa /de/about gibi adresler kopya içerik olarak açılırdı.
 */
export function parsePath(pathname: string, allowInternal = false): { locale: Locale; key: RouteKey | null; rest: string[] } {
  const segs = pathname.split('/').filter(Boolean)
  let locale: Locale = defaultLocale
  let prefixed = false
  if (isLocale(segs[0]) && (segs[0] !== defaultLocale || allowInternal)) {
    locale = segs.shift() as Locale
    prefixed = true
  }
  if (segs.length === 0) return { locale, key: 'home', rest: [] }
  const keys = Object.keys(routeSlugs) as (keyof typeof routeSlugs)[]
  let key: RouteKey | null = keys.find((k) => routeSlugs[k][locale] === segs[0]) ?? null
  if (!key && allowInternal && prefixed) key = keys.find((k) => routeFolders[k] === segs[0]) ?? null
  return { locale, key, rest: segs.slice(1) }
}

/** Dil değiştiricide: aynı sayfanın başka dildeki adresi */
export function switchLocalePath(pathname: string, target: Locale): string {
  const { locale, key, rest } = parsePath(pathname, true)
  if (!key) return path(target, 'home')
  if (key === 'services' && rest[0]) {
    const sk = serviceKeyFromSlug(locale, rest[0])
    return sk ? servicePath(target, sk) : path(target, 'services')
  }
  // Blog yazısı: slug aynen taşınır, hedef sayfa doğru dildeki adrese yönlendirir
  return path(target, key, rest.join('/') || undefined)
}
