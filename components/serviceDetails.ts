// Hizmet detay sayfalarının dilden bağımsız verileri (/hizmetler/[slug]).
// Metinler: lib/i18n/dictionaries/* -> serviceDetails
import { photos, type ProjectCategory } from './siteData'
import type { ServiceKey } from '@/lib/i18n/config'

type ToolKey = 'vectorDb' | 'selfHosted'

export const serviceDetails: Record<ServiceKey, { photo: string; tools: (string | { t: ToolKey })[]; projectCategories: ProjectCategory[] }> = {
  web: {
    photo: photos.code,
    tools: ['Next.js', 'React', 'WordPress', 'Tailwind CSS', 'Vercel'],
    projectCategories: ['web'],
  },
  mobile: {
    photo: photos.phone,
    tools: ['React Native', 'Expo', 'Flutter', 'Firebase', 'Supabase'],
    projectCategories: ['mobile'],
  },
  marketing: {
    photo: photos.analytics,
    tools: ['Google Ads', 'Meta Ads', 'Google Analytics 4', 'Search Console', 'Looker Studio'],
    projectCategories: ['web', 'design'],
  },
  social: {
    photo: photos.meeting2,
    tools: ['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'Meta Business Suite'],
    projectCategories: ['design'],
  },
  ai: {
    photo: photos.tech,
    tools: ['Claude', 'OpenAI', 'n8n', { t: 'vectorDb' }, { t: 'selfHosted' }],
    projectCategories: ['web'],
  },
}
