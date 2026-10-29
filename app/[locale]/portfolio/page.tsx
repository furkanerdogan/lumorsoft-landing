import Portfolio from '@/components/Portfolio'
import JsonLd from '@/components/JsonLd'
import { getDictionary, resolveLocale } from '@/lib/i18n'
import { path } from '@/lib/i18n/config'
import { breadcrumbLd, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale)
  return pageMetadata({ locale, pathFor: (l) => path(l, 'portfolio'), title: t.nav.portfolio, description: t.portfolio.pageDescription })
}

export default async function PortfolioPage({ params }: Props) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale)
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: t.nav.home, path: path(locale, 'home') },
          { name: t.nav.portfolio, path: path(locale, 'portfolio') },
        ])}
      />
      <Portfolio t={t.portfolio} asPage />
    </>
  )
}
