import Link from 'next/link'
import Image from 'next/image'
import { services, contact } from './siteData'
import { navLinks, serviceHref } from '@/lib/nav'
import { path, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/tr'

export default function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer>
      {/* Tam genişlik koyu zemin; içerik diğer bölümlerle aynı hizada */}
      <div className="bg-gray-900 text-gray-300 px-4 pt-20 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div>
              <p className="flex items-center gap-2.5 text-white font-bold text-xl mb-3">
                <Image src="/images/lumorsoftpng_icon_new.png" alt="" width={32} height={32} className="w-8 h-8" />
                Lumorsoft
              </p>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">{t.footer.tagline}</p>
              <div className="flex gap-4">
                {contact.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Menu */}
            <div>
              <p className="text-white font-semibold text-sm uppercase tracking-wider mb-5">{t.footer.menu}</p>
              <ul className="space-y-3">
                {navLinks(locale, t).map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <p className="text-white font-semibold text-sm uppercase tracking-wider mb-5">{t.footer.solutions}</p>
              <ul className="space-y-3">
                {services.map((s) => (
                  <li key={s.key}>
                    <Link href={serviceHref(locale, s.key)} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {t.services.items[s.key].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} {t.footer.powered}
            </p>
            <div className="flex gap-4">
              <Link href={path(locale, 'privacy')} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {t.footer.privacy}
              </Link>
              <a href={`mailto:${contact.email}`} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
