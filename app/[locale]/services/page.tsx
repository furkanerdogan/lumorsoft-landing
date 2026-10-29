import Services from '@/components/Services'
import ContactForm from '@/components/ContactForm'
import JsonLd from '@/components/JsonLd'
import { getDictionary, resolveLocale } from '@/lib/i18n'
import { path, serviceKeys, servicePath } from '@/lib/i18n/config'
import { abs, breadcrumbLd, organizationId, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale).services
  return pageMetadata({ locale, pathFor: (l) => path(l, 'services'), title: t.pageTitle, description: t.pageDescription })
}

export default async function ServicesPage({ params }: Props) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale)

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: t.nav.home, path: path(locale, 'home') },
          { name: t.services.pageTitle, path: path(locale, 'services') },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: t.services.pageTitle,
          itemListElement: serviceKeys.map((k, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Service',
              name: t.serviceDetails[k].title,
              description: t.serviceDetails[k].lead,
              url: abs(servicePath(locale, k)),
              provider: { '@id': organizationId },
            },
          })),
        }}
      />
      <Services locale={locale} t={t} asPage />
      <ContactForm t={t.contact} privacyHref={path(locale, 'privacy')} />
    </>
  )
}
