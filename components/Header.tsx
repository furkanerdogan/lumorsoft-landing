'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import type { Locale } from '@/lib/i18n/config'

type NavLink = { href: string; label: string }

export default function Header({
  locale,
  homeHref,
  links,
  cta,
  labels,
}: {
  locale: Locale
  homeHref: string
  links: NavLink[]
  cta: NavLink
  labels: { openMenu: string; closeMenu: string; language: string }
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href={homeHref} className="flex items-center gap-2.5 text-xl font-bold text-gray-900 tracking-tight">
          <Image src="/images/lumorsoftpng_icon_new.png" alt="" width={32} height={32} priority className="w-8 h-8" />
          Lumorsoft
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-gray-600 hover:text-[#127f84] transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher locale={locale} label={labels.language} />
          <Link
            href={cta.href}
            className="px-4 py-2 bg-[#127f84] text-white text-sm font-semibold rounded-lg hover:bg-[#0f6c70] transition-colors"
          >
            {cta.label}
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher locale={locale} label={labels.language} />
          <button
            type="button"
            className="p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-[#127f84] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 bg-[#127f84] text-white text-sm font-semibold rounded-lg text-center hover:bg-[#0f6c70] transition-colors"
          >
            {cta.label}
          </Link>
        </nav>
      )}
    </header>
  )
}
