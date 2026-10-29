'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { LOCALE_COOKIE, locales, localeInfo, switchLocalePath, type Locale } from '@/lib/i18n/config'
import Flag from './Flags'

// Seçim hatırlanır; otomatik dil algılama bir daha devreye girmez
function rememberLocale(l: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`
}

// Kompakt dil seçici: 🌐 TR ˅ -> açılır liste.
// Linkler kapalıyken de sayfada durur (arama motorları diğer dilleri bulabilsin).
export default function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    // Açılınca seçili dile odaklan
    root.current?.querySelector<HTMLAnchorElement>('[aria-current="true"]')?.focus()
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${label}: ${localeInfo[locale].name}`}
        className="flex items-center gap-1.5 h-9 ps-2.5 pe-2 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:border-gray-300 hover:text-gray-900 dark:hover:border-[#3a414c] transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
        </svg>
        {localeInfo[locale].short}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <nav
        id={menuId}
        aria-label={label}
        inert={!open}
        className={`absolute end-0 top-full mt-2 w-44 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg shadow-gray-200 origin-top transition duration-150 ease-out motion-reduce:transition-none ${
          open ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
      >
        <ul>
          {locales.map((l) => {
            const current = l === locale
            return (
              <li key={l}>
                <Link
                  href={switchLocalePath(pathname, l)}
                  hrefLang={l}
                  lang={l}
                  aria-current={current ? 'true' : undefined}
                  onClick={() => {
                    rememberLocale(l)
                    setOpen(false)
                  }}
                  className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors outline-none hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-[#1d232c] dark:focus-visible:bg-[#1d232c] ${
                    current ? 'font-bold text-gray-900' : 'text-gray-600'
                  }`}
                >
                  <span>{localeInfo[l].name}</span>
                  <span className="flex items-center gap-2">
                    {current && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#127f84]" aria-hidden>
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                    )}
                    <Flag locale={l} />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
