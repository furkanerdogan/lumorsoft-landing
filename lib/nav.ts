import { path, sectionPath, servicePath, type Locale } from './i18n/config'
import type { Dictionary } from './i18n/dictionaries/tr'
import type { services } from '@/components/siteData'

// Header ve Footer'da ortak menü
export function navLinks(locale: Locale, t: Dictionary) {
  return [
    { href: path(locale, 'about'), label: t.nav.about },
    { href: path(locale, 'services'), label: t.nav.services },
    { href: path(locale, 'integrations'), label: t.nav.integrations },
    { href: path(locale, 'portfolio'), label: t.nav.portfolio },
    { href: path(locale, 'blog'), label: t.nav.blog },
    { href: sectionPath(locale, 'contact'), label: t.nav.contact },
  ]
}

export const serviceHref = (locale: Locale, key: (typeof services)[number]['key']) =>
  key === 'integration' ? path(locale, 'integrations') : servicePath(locale, key)
