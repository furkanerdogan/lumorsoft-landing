import { cache } from 'react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import PostCover from '@/components/PostCover'
import { getDictionary, resolveLocale } from '@/lib/i18n'
import { localeInfo, path, type Locale } from '@/lib/i18n/config'
import { findTranslatedSlug, formatDate, getPost } from '@/lib/posts'
import { abs, breadcrumbLd, organizationId, pageMetadata } from '@/lib/seo'

// Yazılar ilk ziyarette üretilir, 60 sn'de bir yenilenir (ISR)
export const revalidate = 60
export function generateStaticParams() {
  return []
}

type Props = { params: Promise<{ locale: string; slug: string }> }

// generateMetadata ve sayfa aynı sorguyu paylaşır
const loadPost = cache((locale: Locale, slug: string) => getPost(locale, slug))

async function resolve(params: Props['params']) {
  const locale = await resolveLocale(params)
  const raw = (await params).slug
  let slug: string
  try {
    slug = decodeURIComponent(raw)
  } catch {
    notFound()
  }
  const post = await loadPost(locale, slug)
  if (post) return { locale, post }

  // Slug başka dile aitse (dil değiştiriciden gelindi) bu dildeki adrese git
  const other = await findTranslatedSlug(locale, slug)
  if (other.slug) redirect(path(locale, 'blog', other.slug))
  if (other.found) redirect(path(locale, 'blog')) // bu dilde çevirisi yok
  notFound()
}

export async function generateMetadata({ params }: Props) {
  const { locale, post } = await resolve(params)
  const available = Object.keys(post.slugs) as Locale[]
  return pageMetadata({
    locale,
    available,
    pathFor: (l) => path(l, 'blog', post.slugs[l]),
    title: post.seoTitle,
    description: post.seoDescription,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    image: post.coverImage ? { url: post.coverImage, alt: post.coverAlt ?? post.title } : undefined,
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, post } = await resolve(params)
  const dict = getDictionary(locale)
  const t = dict.blog
  const url = abs(path(locale, 'blog', post.slug))

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.seoDescription,
          url,
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          inLanguage: localeInfo[locale].intl,
          ...(post.coverImage && { image: [post.coverImage] }),
          ...(post.category && { articleSection: post.category }),
          author: { '@id': organizationId },
          publisher: { '@id': organizationId },
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: path(locale, 'home') },
          { name: t.title, path: path(locale, 'blog') },
          { name: post.title, path: path(locale, 'blog', post.slug) },
        ])}
      />
      <article className="max-w-3xl mx-auto px-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href={path(locale, 'home')} className="hover:text-[#138a8f] transition-colors">
            {dict.nav.home}
          </Link>
          <span aria-hidden>/</span>
          <Link href={path(locale, 'blog')} className="hover:text-[#138a8f] transition-colors">
            {t.title}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-gray-600 truncate max-w-[200px]" aria-current="page">
            {post.title}
          </span>
        </nav>

        <header className="mb-10">
          <p className="text-sm text-[#138a8f] font-semibold mb-3">
            {post.category && <span>{post.category} · </span>}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">{post.title}</h1>
          {post.excerpt && <p className="text-xl text-gray-500 leading-relaxed border-s-4 border-[#bfe3e3] ps-5">{post.excerpt}</p>}
        </header>

        <PostCover src={post.coverImage} alt={post.coverAlt ?? post.title} priority className="w-full aspect-[16/9] rounded-2xl mb-10" />

        {/* İçerik: lib/posts.ts içinde temizleniyor (XSS koruması) */}
        <div
          className="prose prose-lg prose-gray dark:prose-invert max-w-none prose-headings:font-extrabold prose-a:text-[#138a8f] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-14 pt-8 border-t border-gray-100">
          <Link href={path(locale, 'blog')} className="inline-flex items-center gap-2 text-[#127f84] font-semibold hover:text-[#0c575a] transition-colors">
            <span aria-hidden className="inline-block rtl:rotate-180">←</span> {t.back}
          </Link>
        </div>
      </article>
    </div>
  )
}
