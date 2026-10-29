'use client'

import { useState } from 'react'
import { img, projects, projectCategories, manrope } from './siteData'
import type { Dictionary } from '@/lib/i18n/dictionaries/tr'

type Category = (typeof projectCategories)[number]

// Ana sayfada kısaltılmış (limit), /portfolyo sayfasında tam liste olarak kullanılır
export default function Portfolio({ t, limit, asPage = false }: { t: Dictionary['portfolio']; limit?: number; asPage?: boolean }) {
  const [active, setActive] = useState<Category>('all')
  const filtered = (active === 'all' ? projects : projects.filter((p) => p.category === active)).slice(0, limit)
  const Heading = asPage ? 'h1' : 'h2'

  return (
    <section id="portfolio" className={`${manrope.className} bg-gray-50 py-24 scroll-mt-16 ${asPage ? 'pt-32 min-h-screen' : ''}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <Heading className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{t.title}</Heading>
          <div className="inline-flex flex-wrap justify-center gap-2 bg-white rounded-full p-1.5 shadow-sm">
            {projectCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${active === c ? 'bg-[#111] text-[#fff] dark:bg-[#0b57d6]' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {t.categories[c]}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((p) => {
            const text = t.projects[p.key]
            return (
              <div key={p.key} className="group">
                <div className="rounded-xl bg-white shadow-lg shadow-gray-200 overflow-hidden group-hover:-translate-y-2 transition-transform">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100" aria-hidden>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
                    <span className="ms-3 flex-1 h-4 rounded bg-white" />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(p.photo, 700)} alt={text.title} loading="lazy" className="w-full aspect-video object-cover" />
                </div>
                <h3 className="font-extrabold text-gray-900 mt-5">{text.title}</h3>
                <p className="text-sm text-gray-500">
                  {t.categories[p.category]} · {text.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
