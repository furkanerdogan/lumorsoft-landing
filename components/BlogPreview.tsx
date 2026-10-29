import Link from 'next/link'
import { getPosts, formatDate } from '@/lib/posts'
import { path, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/tr'
import { manrope } from './siteData'
import PostCover from './PostCover'

export default async function BlogPreview({ locale, t }: { locale: Locale; t: Dictionary['blog'] }) {
  const posts = await getPosts(locale, 3)
  // Bu dilde yazı yoksa bölüm hiç gösterilmez (boş içerik SEO'ya zarar)
  if (posts.length === 0) return null

  return (
    <section id="blog" className={`${manrope.className} bg-gray-50 py-24 scroll-mt-16`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">{t.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-7">
          {posts.map((p) => (
            <Link key={p.id} href={path(locale, 'blog', p.slug)} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
              <PostCover src={p.coverImage} alt={p.coverAlt ?? ''} className="w-full aspect-[16/10]" />
              <div className="p-6">
                <div className="flex justify-between text-xs mb-3">
                  <span className="font-bold text-[#0b57d6]">{p.category ?? t.defaultCategory}</span>
                  <time dateTime={p.publishedAt} className="text-gray-400">
                    {formatDate(p.publishedAt, locale)}
                  </time>
                </div>
                <h3 className="font-extrabold text-gray-900 mb-2 leading-snug group-hover:text-[#0b57d6] transition-colors">{p.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href={path(locale, 'blog')}
            className="inline-block px-7 py-3 rounded-xl border-2 border-[#111] font-bold text-[#111] hover:bg-[#111] hover:text-[#fff] dark:border-[#e6e9ee] dark:text-[#e6e9ee] dark:hover:bg-[#e6e9ee] dark:hover:text-[#0e1116] transition-colors"
          >
            {t.seeAll}
          </Link>
        </div>
      </div>
    </section>
  )
}
