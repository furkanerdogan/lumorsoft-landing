'use client'

import { useEffect, useState } from 'react'
import { grotesk, contact } from './siteData'
import type { Dictionary } from '@/lib/i18n/dictionaries/tr'

// Dikey yazı: döndürme yerine sideways-lr (daha keskin), desteklemeyen tarayıcıda eski yöntem
const vertical =
  '[writing-mode:vertical-rl] rotate-180 supports-[writing-mode:sideways-lr]:[writing-mode:sideways-lr] supports-[writing-mode:sideways-lr]:rotate-0'

// Sağ kenarda sabit duran tema düğmesi + "Takipte kalın" şeridi (masaüstünde görünür)
const INSTAGRAM_URL = contact.socials.find((s) => s.label === 'Instagram')!.href

type Theme = 'light' | 'dark'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-3.5 h-3.5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  )
}

export default function SocialRail({ t }: { t: Dictionary['rail'] }) {
  // Sunucuda tema bilinmez; sayfa açılınca <html> sınıfından okunur
  const [theme, setTheme] = useState<Theme | null>(null)

  // Şerit ilk bölüm (hero) geçilince görünür
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')

    function onScroll() {
      const first = document.querySelector('main > section') as HTMLElement | null
      const threshold = first ? first.offsetHeight - 120 : 300
      // Footer ekrana girince şerit gizlenir
      const footer = document.querySelector('footer')
      const footerInView = footer ? footer.getBoundingClientRect().top < window.innerHeight - 40 : false
      setVisible(window.scrollY > threshold && !footerInView)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  function choose(next: Theme) {
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem('theme', next)
    } catch {}
  }

  const option = (value: Theme, label: string, icon: React.ReactNode) => (
    <button
      type="button"
      onClick={() => choose(value)}
      aria-pressed={theme === value}
      className={`w-8 flex flex-col items-center gap-1.5 py-3 rounded-full text-xs font-bold leading-none transition-colors ${
        theme === value ? 'bg-[#0b57d6] text-[#fff]' : 'text-gray-500 hover:text-gray-900'
      }`}
    >
      {icon}
      <span className={vertical}>{label}</span>
    </button>
  )

  return (
    <aside
      aria-hidden={!visible}
      inert={!visible}
      className={`${grotesk.className} hidden md:flex fixed end-5 inset-y-0 my-auto h-fit z-40 flex-col items-center gap-5 text-gray-900 transition-all duration-500 ease-out ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-[200%] rtl:-translate-x-[200%] opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-1" role="group" aria-label={t.theme}>
        {option('light', t.light, <SunIcon />)}
        {option('dark', t.dark, <MoonIcon />)}
      </div>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.instagram}
        className="hover:text-[#0b57d6] transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <span className={`flex items-center gap-3 text-[13px] font-medium tracking-[0.18em] uppercase ${vertical}`}>
        {t.follow}
        <span className="w-px h-8 bg-current opacity-40" />
      </span>
    </aside>
  )
}
