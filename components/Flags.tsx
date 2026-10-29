import type { Locale } from '@/lib/i18n/config'

// Küçük bayraklar (SVG; bayrak emojileri Windows'ta görünmez).
// Arapça için BAE: sitenin hedeflediği Körfez pazarı.
const flags: Record<Locale, React.ReactNode> = {
  tr: (
    <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice">
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="10" cy="10" r="5" fill="#fff" />
      <circle cx="11.25" cy="10" r="4" fill="#E30A17" />
      <polygon
        fill="#fff"
        points="13.20,10.00 14.89,9.41 14.93,7.62 16.01,9.05 17.72,8.53 16.70,10.00 17.72,11.47 16.01,10.95 14.93,12.38 14.89,10.59"
      />
    </svg>
  ),
  en: (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  ),
  de: (
    <svg viewBox="0 0 5 3" preserveAspectRatio="none">
      <rect width="5" height="1" fill="#000" />
      <rect y="1" width="5" height="1" fill="#DD0000" />
      <rect y="2" width="5" height="1" fill="#FFCE00" />
    </svg>
  ),
  ar: (
    <svg viewBox="0 0 12 6" preserveAspectRatio="none">
      <rect width="12" height="2" fill="#00732F" />
      <rect y="2" width="12" height="2" fill="#fff" />
      <rect y="4" width="12" height="2" fill="#000" />
      <rect width="3" height="6" fill="#FF0000" />
    </svg>
  ),
}

export default function Flag({ locale, className = '' }: { locale: Locale; className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block w-5 h-3.5 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10 [&>svg]:w-full [&>svg]:h-full ${className}`}
    >
      {flags[locale]}
    </span>
  )
}
