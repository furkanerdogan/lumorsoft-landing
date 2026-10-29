'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { parsePath, path, type Locale } from '@/lib/i18n/config'

// 404 içeriği; dil adresten okunur.
// Metinler küçük olduğu için burada tutulur (sözlüklerin tamamı tarayıcıya gönderilmesin).
const text: Record<Locale, { title: string; text: string; home: string }> = {
  tr: { title: 'Sayfa bulunamadı', text: 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.', home: 'Anasayfaya dön' },
  en: { title: 'Page not found', text: 'The page you are looking for may have moved or never existed.', home: 'Back to home' },
  de: { title: 'Seite nicht gefunden', text: 'Die gesuchte Seite wurde verschoben oder existiert nicht.', home: 'Zur Startseite' },
  ar: { title: 'الصفحة غير موجودة', text: 'ربما نُقلت الصفحة التي تبحثون عنها أو لم تكن موجودة أصلاً.', home: 'العودة إلى الرئيسية' },
}

export default function NotFoundContent() {
  const { locale } = parsePath(usePathname() ?? '/', true)
  const t = text[locale]

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pt-24 pb-20">
      <div className="text-center max-w-md">
        <p className="text-6xl font-extrabold text-[#0b57d6] mb-4">404</p>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-3">{t.title}</h1>
        <p className="text-gray-500 mb-8">{t.text}</p>
        <Link href={path(locale, 'home')} className="inline-block px-6 py-3 bg-[#0b57d6] text-white font-bold rounded-xl">
          {t.home}
        </Link>
      </div>
    </div>
  )
}
