import Link from 'next/link'
import { notFound } from 'next/navigation'
import { img, projects, manrope, Arrow } from '@/components/siteData'
import CtaBox from '@/components/CtaBox'
import JsonLd from '@/components/JsonLd'
import { serviceDetails } from '@/components/serviceDetails'
import { getDictionary, resolveLocale } from '@/lib/i18n'
import { isLocale, locales, path, sectionPath, serviceKeyFromSlug, serviceKeys, servicePath, serviceSlugs } from '@/lib/i18n/config'
import { abs, breadcrumbLd, organizationId, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string; slug: string }> }

// Her dil için o dilin slug'ları derlenir (/hizmetler/web-tasarim, /en/services/web-design …)
export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : locales[0]
  return serviceKeys.map((k) => ({ slug: serviceSlugs[k][locale] }))
}

async function resolve(params: Props['params']) {
  const locale = await resolveLocale(params)
  const { slug } = await params
  const key = serviceKeyFromSlug(locale, slug)
  if (!key) notFound()
  return { locale, key }
}

export async function generateMetadata({ params }: Props) {
  const { locale, key } = await resolve(params)
  const s = getDictionary(locale).serviceDetails[key]
  return pageMetadata({
    locale,
    pathFor: (l) => servicePath(l, key),
    title: s.title,
    description: s.lead,
    image: { url: img(serviceDetails[key].photo, 1200), alt: s.title },
  })
}

export default async function ServicePage({ params }: Props) {
  const { locale, key } = await resolve(params)
  const dict = getDictionary(locale)
  const t = dict.servicePage
  const s = dict.serviceDetails[key]
  const data = serviceDetails[key]

  const related = projects.filter((p) => data.projectCategories.includes(p.category)).slice(0, 3)
  const others = serviceKeys.filter((k) => k !== key)
  const tools = data.tools.map((tool) => (typeof tool === 'string' ? tool : dict.tools[tool.t]))

  return (
    <div className={`${manrope.className} pt-16`}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.title,
          serviceType: s.short,
          description: s.lead,
          url: abs(servicePath(locale, key)),
          image: img(data.photo, 1200),
          provider: { '@id': organizationId },
          areaServed: ['TR', 'DE', 'AE', 'SA', 'Worldwide'],
          inLanguage: locale,
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: s.title,
            itemListElement: s.offerings.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o.title, description: o.desc } })),
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: path(locale, 'home') },
          { name: dict.nav.services, path: path(locale, 'services') },
          { name: s.title, path: servicePath(locale, key) },
        ])}
      />

      {/* Giriş */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link href={path(locale, 'services')} className="text-sm font-bold text-[#0b57d6] hover:underline">
              <span aria-hidden className="inline-block rtl:rotate-180">←</span> {t.back}
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-5 leading-tight">{s.title}</h1>
            <p className="text-lg text-gray-500 mb-8">{s.lead}</p>
            <Link href={sectionPath(locale, 'contact')} className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0b57d6] text-white font-bold rounded-xl hover:bg-[#0a47b0] transition-colors">
              {t.cta} <Arrow />
            </Link>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(data.photo, 1000)} alt={s.title} fetchPriority="high" className="w-full aspect-[4/3] object-cover rounded-lg" />
        </div>
      </section>

      {/* Neler yapıyoruz */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">{t.offeringsTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {s.offerings.map((o) => (
              <div key={o.title} className="bg-white rounded-lg p-6 border border-gray-100">
                <span className="block w-8 h-1 bg-[#138a8f] rounded-full mb-5" />
                <h3 className="font-extrabold text-gray-900 mb-2">{o.title}</h3>
                <p className="text-sm text-gray-500">{o.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            <span className="text-sm text-gray-500 me-2 self-center">{t.toolsLabel}</span>
            {tools.map((tool) => (
              <span key={tool} className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-700">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Süreç */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">{t.processTitle}</h2>
          <ol className="grid md:grid-cols-4 gap-6">
            {t.process.map((p, i) => (
              <li key={p.t} className="border-t-2 border-[#0b57d6] pt-5">
                <span className="text-sm font-extrabold text-[#0b57d6]">0{i + 1}</span>
                <h3 className="font-extrabold text-gray-900 mt-1 mb-1">{p.t}</h3>
                <p className="text-sm text-gray-500">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Örnek işler */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t.examplesTitle}</h2>
              <Link href={path(locale, 'portfolio')} className="inline-flex items-center gap-2 font-bold text-[#0b57d6]">
                {t.allProjects} <Arrow />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => {
                const pt = dict.portfolio.projects[p.key]
                return (
                  <div key={p.key}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(p.photo, 700)} alt={pt.title} loading="lazy" className="w-full aspect-video object-cover rounded-lg mb-4" />
                    <h3 className="font-extrabold text-gray-900">{pt.title}</h3>
                    <p className="text-sm text-gray-500">{pt.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* SSS */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">{t.faqTitle}</h2>
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {s.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex justify-between items-center cursor-pointer font-bold text-gray-900 list-none">
                  {f.q}
                  <span className="text-[#0b57d6] text-xl transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="text-gray-500 mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Diğer hizmetler + CTA */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <CtaBox locale={locale} t={dict.cta} title={t.ctaTitle} />
          </div>
          <p className="text-sm font-bold text-gray-500 mb-4">{t.others}</p>
          <div className="flex flex-wrap gap-3">
            {others.map((k) => (
              <Link
                key={k}
                href={servicePath(locale, k)}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:border-[#0b57d6] transition-colors"
              >
                {dict.serviceDetails[k].short}
              </Link>
            ))}
            <Link
              href={path(locale, 'integrations')}
              className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:border-[#0b57d6] transition-colors"
            >
              {t.integrationShort}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
