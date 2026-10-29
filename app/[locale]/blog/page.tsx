import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import PostCover from '@/components/PostCover'
import { getDictionary, resolveLocale } from '@/lib/i18n'
import { localeInfo, path } from '@/lib/i18n/config'
import { getPosts, formatDate } from '@/lib/posts'
import { abs, breadcrumbLd, organizationId, pageMetadata } from '@/lib/seo'

// Yeni yazılar deploy beklemeden 60 sn içinde görünür
export const revalidate = 60

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale).blog
  return pageMetadata({ locale, pathFor: (l) => path(l, 'blog'), title: t.pageTitle, description: t.description })
}

export default async function BlogPage({ params }: Props) {
  const locale = await resolveLocale(params)
  const dict = getDictionary(locale)
  const t = dict.blog
  const posts = await getPosts(locale)

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: t.pageTitle,
          description: t.description,
          url: abs(path(locale, 'blog')),
          inLanguage: localeInfo[locale].intl,
          publisher: { '@id': organizationId },
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: abs(path(locale, 'blog', p.slug)),
            datePublished: p.publishedAt,
            dateModified: p.updatedAt,
            ...(p.coverImage && { image: p.coverImage }),
          })),
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: path(locale, 'home') },
          { name: t.title, path: path(locale, 'blog') },
        ])}
      />
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#138a8f] uppercase tracking-wider">{t.label}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">{t.h1}</h1>
          <p className="text-gray-500 max-w-xl mx-auto">{t.intro}</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-16">{t.empty}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post, i) => (
              <Link
                key={post.id}
                href={path(locale, 'blog', post.slug)}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-[#e6f4f4] transition-all duration-300"
              >
                <PostCover src={post.coverImage} alt={post.coverAlt ?? ''} className="w-full h-48" priority={i < 3} />
                <article className="p-6">
                  <div className="flex justify-between text-xs mb-3">
                    <span className="font-bold text-[#138a8f]">{post.category ?? t.defaultCategory}</span>
                    <time dateTime={post.publishedAt} className="text-gray-400">
                      {formatDate(post.publishedAt, locale)}
                    </time>
                  </div>
                  <h2 className="font-bold text-gray-900 mb-3 group-hover:text-[#127f84] transition-colors leading-snug">{post.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <p className="mt-4 text-sm font-semibold text-[#138a8f] group-hover:text-[#0f6c70] transition-colors">
                    {t.readMore} <span aria-hidden className="inline-block rtl:rotate-180">→</span>
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
