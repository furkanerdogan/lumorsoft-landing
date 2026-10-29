import type { Metadata, Viewport } from 'next'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import SocialRail from '@/components/SocialRail'
import JsonLd from '@/components/JsonLd'
import ThemeScript from '@/components/ThemeScript'
import { arabic } from '@/components/siteData'
import { getDictionary, layoutLocale } from '@/lib/i18n'
import { SITE_URL, localeInfo, locales, path, sectionPath } from '@/lib/i18n/config'
import { navLinks } from '@/lib/nav'
import { organizationLd } from '@/lib/seo'

// Tanımlı diller derleme sırasında üretilir; geçersiz dil resolveLocale ile 404 olur
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await layoutLocale(params)
  const t = getDictionary(locale)
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: '%s | Lumorsoft' },
    description: t.meta.description,
    keywords: t.meta.keywords,
    applicationName: 'Lumorsoft',
    authors: [{ name: 'Lumorsoft', url: SITE_URL }],
    creator: 'Lumorsoft',
    publisher: 'Lumorsoft',
    formatDetection: { telephone: false, email: false, address: false },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1116' },
  ],
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await layoutLocale(params)
  const t = getDictionary(locale)

  return (
    <html lang={locale} dir={localeInfo[locale].dir} data-scroll-behavior="smooth" className={locale === 'ar' ? arabic.variable : undefined} suppressHydrationWarning>
      <head>
        <ThemeScript locale={locale} />
        <JsonLd data={organizationLd(locale, t.meta.description)} />
      </head>
      <body className="antialiased transition-colors">
        <ScrollProgress />
        <Header
          locale={locale}
          homeHref={path(locale, 'home')}
          links={navLinks(locale, t)}
          cta={{ href: sectionPath(locale, 'contact'), label: t.nav.cta }}
          labels={{ openMenu: t.nav.openMenu, closeMenu: t.nav.closeMenu, language: t.nav.language }}
        />
        <main>{children}</main>
        <SocialRail t={t.rail} />
        <Footer locale={locale} t={t} />
      </body>
    </html>
  )
}
