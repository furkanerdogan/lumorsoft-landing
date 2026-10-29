// Dilden bağımsız site verileri (görseller, ikonlar, anahtarlar).
// Metinler lib/i18n/dictionaries/* içindedir.
import { Space_Grotesk, Manrope, IBM_Plex_Sans_Arabic } from 'next/font/google'
import {
  WebIcon,
  IntegrationIcon,
  MobileIcon,
  MarketingIcon,
  SocialIcon,
  AiIcon,
  ReceiptIcon,
  GearIcon,
  ChatIcon,
  ServerIcon,
  AntennaIcon,
} from './Icons'
import type { ServiceKey } from '@/lib/i18n/config'

export const grotesk = Space_Grotesk({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '700'] })
export const manrope = Manrope({ subsets: ['latin', 'latin-ext'], weight: ['400', '600', '800'] })
// Arapça sayfalarda tüm yazılar bu fonta geçer (globals.css)
export const arabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], weight: ['400', '600', '700'], variable: '--font-arabic' })

// Unsplash görselleri
export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const photos = {
  team: '1522071820081-009f0129c71c',
  teamScreens: '1551434678-e076c223a692',
  office: '1497366216548-37526070297c',
  meeting: '1600880292203-757bb62b4baf',
  meeting2: '1556761175-5973dc0f32e7',
  analytics: '1460925895917-afdab827c52f',
  code: '1498050108023-c5249f4df085',
  code2: '1555066931-4365d14bab8c',
  laptop: '1517694712202-14dd9538aa97',
  typing: '1486312338219-ce68d2c6f44d',
  desk: '1504384308090-c894fdcc538d',
  server: '1558494949-ef010cbdcc31',
  phone: '1512941937669-90a1b58e7e9c',
  tech: '1531297484001-80022131f5a1',
  portrait: '1519085360753-af0119f7cbe7',
}

// Ana sayfadaki hizmet kartları. 'integration' kendi sayfasına (/entegrasyonlar) gider.
export const services: { key: ServiceKey | 'integration'; icon: React.ReactNode }[] = [
  { key: 'web', icon: WebIcon },
  { key: 'integration', icon: IntegrationIcon },
  { key: 'mobile', icon: MobileIcon },
  { key: 'marketing', icon: MarketingIcon },
  { key: 'social', icon: SocialIcon },
  { key: 'ai', icon: AiIcon },
]

export const integrations = [
  { key: 'erp', icon: ReceiptIcon },
  { key: 'n8n', icon: GearIcon },
  { key: 'chat', icon: ChatIcon },
  { key: 'bi', icon: MarketingIcon },
  { key: 'server', icon: ServerIcon },
  { key: 'iot', icon: AntennaIcon },
  { key: 'ai', icon: AiIcon },
] as const

export type ProjectCategory = 'web' | 'mobile' | 'design'
export const projectCategories = ['all', 'web', 'mobile', 'design'] as const

export const projects = [
  { key: 'corporate', category: 'web', photo: photos.office },
  { key: 'ecommerce', category: 'web', photo: photos.laptop },
  { key: 'fitness', category: 'mobile', photo: photos.phone },
  { key: 'restaurant', category: 'mobile', photo: photos.desk },
  { key: 'brand', category: 'design', photo: photos.meeting },
  { key: 'saas', category: 'web', photo: photos.analytics },
  { key: 'print', category: 'design', photo: photos.teamScreens },
  { key: 'realEstate', category: 'web', photo: photos.code2 },
  { key: 'health', category: 'mobile', photo: photos.portrait },
] as const satisfies readonly { key: string; category: ProjectCategory; photo: string }[]

export const contact = {
  email: 'info@lumorsoft.com',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/lumorsoft' },
    { label: 'TikTok', href: 'https://tiktok.com/@lumorsoft' },
    { label: 'YouTube', href: 'https://youtube.com/@lumorsoft' },
  ],
}

export function Arrow({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={`${className} rtl:-scale-x-100`} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
