import { isLocale, type Locale } from './config'

// Ülke kodu -> dil
const countryLocale: Record<string, Locale> = {
  TR: 'tr', CY: 'tr',
  DE: 'de', AT: 'de', CH: 'de', LI: 'de', LU: 'de',
  AE: 'ar', SA: 'ar', QA: 'ar', KW: 'ar', BH: 'ar', OM: 'ar', EG: 'ar', JO: 'ar', LB: 'ar',
  IQ: 'ar', SY: 'ar', PS: 'ar', YE: 'ar', LY: 'ar', SD: 'ar', TN: 'ar', DZ: 'ar', MA: 'ar',
}

// Hosting'in eklediği ülke başlıkları (Vercel, Cloudflare, AWS CloudFront, diğer)
const COUNTRY_HEADERS = ['x-vercel-ip-country', 'cf-ipcountry', 'cloudfront-viewer-country', 'x-country-code']

const BOT_RE = /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|embedly|quora link preview|whatsapp|telegram|preview|lighthouse|headless|pagespeed|semrush|ahrefs/i

export const isBot = (ua: string | null) => !ua || BOT_RE.test(ua)

/** Tarayıcının en çok tercih ettiği desteklenen dil (Accept-Language) */
function fromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null
  const langs = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { lang: tag.toLowerCase().split('-')[0], q: q ? Number(q) : 1 }
    })
    .filter((l) => l.lang && l.lang !== '*' && !Number.isNaN(l.q))
    .sort((a, b) => b.q - a.q)
  // Sadece en üstteki dil dikkate alınır; ör. "fr, en" -> desteklenmiyor, konuma bakılır
  const top = langs[0]?.lang
  return isLocale(top) ? top : null
}

function fromCountry(headers: Headers): Locale | null {
  for (const h of COUNTRY_HEADERS) {
    const code = headers.get(h)?.toUpperCase()
    if (code && code.length === 2) return countryLocale[code] ?? 'en'
  }
  return null
}

/**
 * Önce tarayıcı dili (Almanya'daki Türkçe tarayıcı kullanan biri Türkçe görsün),
 * sonra konum; ikisi de yoksa varsayılan (Türkçe) kalır.
 */
export function detectLocale(headers: Headers): Locale | null {
  return fromAcceptLanguage(headers.get('accept-language')) ?? fromCountry(headers)
}
