import Link from 'next/link'
import { TargetIcon, UsersIcon, RocketIcon, CheckCircleIcon, WebIcon } from '@/components/Icons'
import { img, photos, manrope } from '@/components/siteData'
import CtaBox from '@/components/CtaBox'
import JsonLd from '@/components/JsonLd'
import { getDictionary, resolveLocale } from '@/lib/i18n'
import { path } from '@/lib/i18n/config'
import { breadcrumbLd, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale).about
  return pageMetadata({ locale, pathFor: (l) => path(l, 'about'), title: t.title, description: t.description })
}

const valueIcons = [TargetIcon, UsersIcon, RocketIcon, CheckCircleIcon]

export default async function AboutPage({ params }: Props) {
  const locale = await resolveLocale(params)
  const dict = getDictionary(locale)
  const t = dict.about

  return (
    <div className={`${manrope.className} pt-16`}>
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: path(locale, 'home') },
          { name: t.title, path: path(locale, 'about') },
        ])}
      />

      {/* Giriş */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href={path(locale, 'home')} className="hover:text-[#0b57d6] transition-colors">
                {dict.nav.home}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-gray-600" aria-current="page">
                {t.title}
              </span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{t.h1}</h1>
            <p className="text-lg text-gray-500 mb-6">{t.lead}</p>
            <p className="text-gray-600 leading-relaxed">{t.body}</p>
          </div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(photos.team, 1000)} alt={t.imgAlt} fetchPriority="high" className="w-full aspect-[4/3] object-cover rounded-lg" />
            <div className="absolute -bottom-6 start-6 bg-[#0b57d6] text-white rounded-lg px-6 py-4 shadow-xl">
              <p className="text-3xl font-extrabold">{t.expValue}</p>
              <p className="text-sm text-[#c9daf7]">{t.expLabel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rakamlar */}
      <section className="bg-white pb-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.stats.map((s) => (
            <div key={s.label} className="border-t-2 border-[#0b57d6] pt-5">
              <p className="text-4xl font-extrabold text-gray-900">{s.val}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Misyon & vizyon */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          {[
            { icon: TargetIcon, title: t.missionTitle, text: t.missionText },
            { icon: WebIcon, title: t.visionTitle, text: t.visionText },
          ].map((m) => (
            <div key={m.title} className="bg-white rounded-lg p-8 border border-gray-100">
              <div className="w-11 h-11 rounded-lg bg-[#e8f0fc] text-[#0b57d6] flex items-center justify-center mb-5">
                <div className="w-6 h-6">{m.icon}</div>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{m.title}</h2>
              <p className="text-gray-500 leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Değerler */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <span className="text-sm font-bold text-[#0b57d6]">{t.valuesLabel}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-10">{t.valuesTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.values.map((v, i) => (
              <div key={v.title} className="rounded-lg p-6 bg-gray-50 border border-gray-100">
                <div className="w-6 h-6 text-[#138a8f] mb-5">{valueIcons[i]}</div>
                <h3 className="font-extrabold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kapanış */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <CtaBox locale={locale} t={dict.cta} title={t.ctaTitle}>
            <Link href={path(locale, 'services')} className="inline-flex items-center px-6 py-3.5 border border-white/40 font-bold rounded-xl hover:bg-white/10 transition-colors">
              {t.servicesButton}
            </Link>
          </CtaBox>
        </div>
      </section>
    </div>
  )
}
