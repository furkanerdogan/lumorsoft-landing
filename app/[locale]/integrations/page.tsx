import Link from 'next/link'
import { ReceiptIcon, GearIcon, ChatIcon, MarketingIcon, ServerIcon, AntennaIcon, PlugIcon, WrenchIcon } from '@/components/Icons'
import JsonLd from '@/components/JsonLd'
import { getDictionary, resolveLocale } from '@/lib/i18n'
import { path, sectionPath } from '@/lib/i18n/config'
import { abs, breadcrumbLd, organizationId, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale).integrationsPage
  return pageMetadata({ locale, pathFor: (l) => path(l, 'integrations'), title: t.title, description: t.description })
}

const groupIcons = { erp: ReceiptIcon, automation: GearIcon, crm: ChatIcon, bi: MarketingIcon, cloud: ServerIcon, field: AntennaIcon } as const

export default async function IntegrationsPage({ params }: Props) {
  const locale = await resolveLocale(params)
  const dict = getDictionary(locale)
  const t = dict.integrationsPage

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: dict.services.items.integration.title,
          description: t.description,
          url: abs(path(locale, 'integrations')),
          provider: { '@id': organizationId },
          inLanguage: locale,
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: path(locale, 'home') },
          { name: t.title, path: path(locale, 'integrations') },
        ])}
      />
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#138a8f] uppercase tracking-wider">{t.title}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">{t.h1}</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">{t.intro}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          {(Object.keys(groupIcons) as (keyof typeof groupIcons)[]).map((k) => {
            const g = t.groups[k]
            return (
              <div key={k} className="bg-white rounded-2xl p-7 border border-gray-100 h-full">
                <div className="w-9 h-9 text-[#127f84] mb-4">{groupIcons[k]}</div>
                <h2 className="font-bold text-gray-900 mb-2">{g.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{g.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span key={item} className="text-xs font-semibold text-[#127f84] bg-[#e6f4f4] px-3 py-1.5 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {[
            { icon: PlugIcon, title: t.integrateTitle, text: t.integrateText },
            { icon: WrenchIcon, title: t.buildTitle, text: t.buildText },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl p-7 bg-white border border-gray-100">
              <div className="w-8 h-8 text-[#127f84] mb-3">{c.icon}</div>
              <h2 className="font-bold text-gray-900 mb-2">{c.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={sectionPath(locale, 'contact')}
            className="inline-block px-8 py-3.5 bg-[#127f84] text-white font-semibold rounded-xl hover:bg-[#0f6c70] transition-colors text-sm"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </div>
  )
}
