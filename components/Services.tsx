import Link from 'next/link'
import { services, grotesk } from './siteData'
import { serviceHref } from '@/lib/nav'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/tr'

// Ana sayfada h2, /hizmetler sayfasında h1 başlıkla kullanılır
export default function Services({ locale, t, asPage = false }: { locale: Locale; t: Dictionary; asPage?: boolean }) {
  const [web, integ, ...rest] = services
  const items = t.services.items
  const Heading = asPage ? 'h1' : 'h2'
  return (
    <section id="services" className={`${grotesk.className} bg-white py-24 scroll-mt-16 ${asPage ? 'pt-32' : ''}`}>
      <div className="max-w-6xl mx-auto px-4">
        <Heading className="text-4xl md:text-6xl font-bold tracking-tight mb-12">
          {t.services.titleA}
          <br />
          <span className="text-[#0b57d6]">{t.services.titleB}</span>
        </Heading>
        {asPage && <p className="text-lg text-gray-500 max-w-2xl -mt-6 mb-12">{t.services.pageDescription}</p>}
        <div className="grid md:grid-cols-3 gap-4">
          <Link href={serviceHref(locale, integ.key)} className="md:col-span-2 md:row-span-2 rounded-3xl bg-[#0b57d6] text-white p-10 flex flex-col justify-between min-h-[340px]">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
              <div className="w-7 h-7">{integ.icon}</div>
            </div>
            <div>
              <span className="text-sm uppercase tracking-widest text-white/70">{t.services.featuredLabel}</span>
              <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-3">{items[integ.key].title}</h3>
              <p className="text-white/80 max-w-md">{items[integ.key].desc}</p>
            </div>
          </Link>
          {[web, ...rest].map((s, i) => (
            <Link
              key={s.key}
              href={serviceHref(locale, s.key)}
              className={`rounded-3xl p-7 flex flex-col gap-4 ${i % 2 ? 'bg-[#ffd84d] text-[#111]' : 'bg-gray-100 text-gray-900'} hover:-translate-y-1 transition-transform`}
            >
              <div className="w-6 h-6">{s.icon}</div>
              <h3 className="text-lg font-bold">{items[s.key].title}</h3>
              <p className="text-sm opacity-75">{items[s.key].desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
