import { img, photos, manrope } from './siteData'
import type { Dictionary } from '@/lib/i18n/dictionaries/tr'

export default function WhyUs({ t }: { t: Dictionary['whyUs'] }) {
  return (
    <section id="why-us" className={`${manrope.className} bg-white py-24 scroll-mt-16`}>
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(photos.meeting2, 900)} alt={t.imgAlt} loading="lazy" className="w-full aspect-[4/5] object-cover rounded-3xl" />
          <div className="absolute -bottom-6 -end-4 md:end-8 bg-[#0b57d6] text-white rounded-2xl p-6 shadow-xl">
            <p className="text-4xl font-extrabold">{t.badgeValue}</p>
            <p className="text-sm text-[#c9daf7]">{t.badgeText}</p>
          </div>
        </div>
        <div>
          <span className="text-sm font-bold text-[#0b57d6]">{t.label}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-10 leading-tight">{t.title}</h2>
          <div className="space-y-8">
            {t.reasons.map((r, i) => (
              <div key={r.title} className="flex gap-5">
                <span className="shrink-0 w-10 h-10 rounded-full border-2 border-[#0b57d6] text-[#0b57d6] font-extrabold flex items-center justify-center">{i + 1}</span>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg">{r.title}</h3>
                  <p className="text-gray-500">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
