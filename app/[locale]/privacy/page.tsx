import { contact } from '@/components/siteData'
import { getDictionary, resolveLocale } from '@/lib/i18n'
import { path } from '@/lib/i18n/config'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale).privacy
  return pageMetadata({ locale, pathFor: (l) => path(l, 'privacy'), title: t.title, description: t.description })
}

export default async function PrivacyPage({ params }: Props) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale).privacy

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">{t.title}</h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>{t.intro}</p>
          <h2>{t.collectedTitle}</h2>
          <p>{t.collectedText}</p>
          <h2>{t.sharingTitle}</h2>
          <p>{t.sharingText}</p>
          <h2>{t.contactTitle}</h2>
          <p>
            {t.contactText}{' '}
            <a href={`mailto:${contact.email}`} className="text-[#138a8f]">
              {contact.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
