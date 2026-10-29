import Link from 'next/link'
import { img, photos, services, grotesk, Arrow } from './siteData'
import { sectionPath, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/tr'

export default function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const h = t.hero
  return (
    <section className={`${grotesk.className} bg-[#0b57d6] text-white overflow-hidden pt-16`}>
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-8">
            {h.line1}
            <br />
            {h.line2}
            <br />
            <span className="bg-[#fff] px-3 box-decoration-clone md:whitespace-nowrap" style={{ color: '#0b57d6' }}>
              {h.highlight}
            </span>
          </h1>
          <p className="text-lg text-white/85 max-w-md mb-8">{h.text}</p>
          <Link href={sectionPath(locale, 'contact')} className="inline-flex items-center gap-3 px-7 py-4 bg-[#111] rounded-full font-bold hover:bg-black transition-colors">
            {h.cta} <Arrow />
          </Link>
        </div>
        <div className="relative h-[460px] hidden lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(photos.code, 600)} alt={h.imgCode} fetchPriority="high" className="absolute top-0 right-8 w-64 h-80 object-cover rounded-2xl rotate-6 shadow-2xl border-4 border-white" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(photos.team, 600)} alt={h.imgTeam} className="absolute bottom-0 left-4 w-72 h-60 object-cover rounded-2xl -rotate-6 shadow-2xl border-4 border-white" />
          <div className="absolute top-24 left-16 bg-[#ffd84d] text-[#111] rounded-2xl p-5 -rotate-3 shadow-xl">
            <p className="text-4xl font-bold">{h.badgeValue}</p>
            <p className="text-sm">{h.badgeText}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/25 py-5 overflow-hidden whitespace-nowrap" aria-hidden>
        <div className="inline-flex gap-10 animate-[marquee_30s_linear_infinite] text-xl font-medium">
          {[...services, ...services].map((s, i) => (
            <span key={i} className="flex items-center gap-10">
              {t.services.items[s.key].title} <span className="text-white/50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
