import Link from 'next/link'
import { integrations, manrope, Arrow } from './siteData'
import { path, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/tr'

export default function Integrations({ locale, t }: { locale: Locale; t: Dictionary['integrations'] }) {
  const radius = 42
  return (
    <section id="integrations" className={`${manrope.className} bg-gray-50 py-24 scroll-mt-16`}>
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="text-sm font-bold text-[#0b57d6]">{t.label}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-5">{t.title}</h2>
          <p className="text-gray-500 mb-8">{t.text}</p>
          <Link href={path(locale, 'integrations')} className="inline-flex items-center gap-2 px-6 py-3 bg-[#0b57d6] text-white rounded-xl font-bold">
            {t.cta} <Arrow />
          </Link>
        </div>
        <div className="relative aspect-square max-w-md mx-auto w-full" dir="ltr">
          <div className="absolute inset-[8%] rounded-full border-2 border-dashed border-[#c9daf7]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#0b57d6] text-white font-extrabold flex items-center justify-center shadow-xl shadow-[#c9daf7]">
            Lumorsoft
          </div>
          {integrations.map((it, i) => {
            const a = (i / integrations.length) * Math.PI * 2 - Math.PI / 2
            return (
              <div
                key={it.key}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-24 text-center"
                style={{ left: `${(50 + radius * Math.cos(a)).toFixed(2)}%`, top: `${(50 + radius * Math.sin(a)).toFixed(2)}%` }}
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white shadow-md text-[#0b57d6] flex items-center justify-center">
                  <div className="w-7 h-7">{it.icon}</div>
                </div>
                <p className="text-xs font-bold text-gray-700 mt-2 leading-tight">{t.items[it.key]}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
