import { NextResponse, type NextRequest } from 'next/server'
import { LOCALE_COOKIE, defaultLocale, isLocale, parsePath, routeFolders, switchLocalePath, type Locale } from '@/lib/i18n/config'
import { detectLocale, isBot } from '@/lib/i18n/detect'

// Görünen adresi (dile özgü) app/[locale]/ altındaki klasöre çevirir:
//   /hakkimizda        -> /tr/about
//   /de/ueber-uns      -> /de/about
//   /en/blog/my-post   -> /en/blog/my-post
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segs = pathname.split('/').filter(Boolean)

  // /tr/... -> /... (Türkçe öneksiz tek adres; yinelenen içerik olmasın)
  if (segs[0] === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = '/' + segs.slice(1).join('/')
    return NextResponse.redirect(url, 308)
  }

  const { locale, key, rest } = parsePath(pathname)

  // Dil tercihi / algılama (sadece Türkçe adreslerde; /en/... gibi açık bir dil adresine dokunulmaz)
  if (key && locale === defaultLocale) {
    const target = autoLocale(request)
    if (target) {
      const url = request.nextUrl.clone()
      url.pathname = switchLocalePath(pathname, target)
      const res = NextResponse.redirect(url, 307)
      res.cookies.set(LOCALE_COOKIE, target, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
      return res
    }
  }

  const internal = key
    ? [routeFolders[key], ...rest].filter(Boolean).join('/')
    : '__not-found' // dile ait olmayan adres (ör. /about Türkçe'de yok) -> 404

  return rewrite(request, locale, internal)
}

/**
 * Yönlendirilecek dil, ya da null. Yönlendirme YAPILMAYAN durumlar:
 * - arama motoru botları (Google her dili kendi adresinden taramalı; hreflang ile bağlı)
 * - sayfa gezinmesi dışındaki istekler (prefetch, form gönderimi, RSC)
 */
function autoLocale(request: NextRequest): Locale | null {
  const h = request.headers
  if (request.method !== 'GET') return null
  if (isBot(h.get('user-agent'))) return null
  // Sadece tarayıcıda adres çubuğundan/linkten tam sayfa açılışı (modern tarayıcıların hepsi gönderir).
  // Next'in RSC/prefetch istekleri 'empty' gelir, yönlendirilmez.
  if (h.get('sec-fetch-dest') !== 'document' || h.get('sec-fetch-mode') !== 'navigate') return null
  if (h.has('next-router-prefetch') || h.get('purpose') === 'prefetch' || request.nextUrl.searchParams.has('_rsc')) return null

  // Daha önce seçilmiş dil her zaman önce gelir (dil değiştiricide TR seçilirse çerez 'tr' olur)
  const saved = request.cookies.get(LOCALE_COOKIE)?.value
  const target = isLocale(saved) ? saved : detectLocale(h)
  return target && target !== defaultLocale ? target : null
}

function rewrite(request: NextRequest, locale: Locale, internal: string) {
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${internal ? `/${internal}` : ''}`
  return NextResponse.rewrite(url)
}

export const config = {
  // _next, api, uzantılı dosyalar (görseller, sitemap.xml, robots.txt…) ve meta görselleri hariç
  matcher: ['/((?!_next|api|opengraph-image|twitter-image|icon|apple-icon|.*\\..*).*)'],
}
