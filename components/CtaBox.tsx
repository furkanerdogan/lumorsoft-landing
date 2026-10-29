import Link from 'next/link'
import { Arrow } from './siteData'
import { sectionPath, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/tr'

// Sayfa sonlarındaki mavi "iletişime geçin" kutusu
export default function CtaBox({ locale, t, title, children }: { locale: Locale; t: Dictionary['cta']; title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-[#0b57d6] text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h2 className="text-3xl font-extrabold mb-2">{title}</h2>
        <p className="text-white/80">{t.text}</p>
      </div>
      <div className="flex flex-wrap gap-3 shrink-0">
        <Link href={sectionPath(locale, 'contact')} className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#fff] font-bold rounded-xl" style={{ color: '#0b57d6' }}>
          {t.button} <Arrow />
        </Link>
        {children}
      </div>
    </div>
  )
}
