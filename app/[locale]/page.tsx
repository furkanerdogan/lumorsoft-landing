import Hero from '@/components/Hero'
import Services from '@/components/Services'
import WhyUs from '@/components/WhyUs'
import Integrations from '@/components/Integrations'
import Portfolio from '@/components/Portfolio'
import BlogPreview from '@/components/BlogPreview'
import ContactForm from '@/components/ContactForm'
import { getDictionary, resolveLocale } from '@/lib/i18n'
import { path } from '@/lib/i18n/config'
import { pageMetadata } from '@/lib/seo'

// Blog bölümü 60 sn'de bir yenilenir
export const revalidate = 60

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale)
  return pageMetadata({
    locale,
    pathFor: (l) => path(l, 'home'),
    title: t.meta.title,
    description: t.meta.description,
    absoluteTitle: true,
  })
}

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale)
  return (
    <>
      <Hero locale={locale} t={t} />
      <Services locale={locale} t={t} />
      <WhyUs t={t.whyUs} />
      <Integrations locale={locale} t={t.integrations} />
      <Portfolio t={t.portfolio} limit={6} />
      <BlogPreview locale={locale} t={t.blog} />
      <ContactForm t={t.contact} privacyHref={path(locale, 'privacy')} />
    </>
  )
}
