import 'server-only'
import { notFound } from 'next/navigation'
import { defaultLocale, isLocale, type Locale } from './config'
import tr, { type Dictionary } from './dictionaries/tr'
import en from './dictionaries/en'
import de from './dictionaries/de'
import ar from './dictionaries/ar'

const dictionaries: Record<Locale, Dictionary> = { tr, en, de, ar }

export const getDictionary = (locale: Locale) => dictionaries[locale]

/** Sayfa parametresindeki dili doğrular; geçersizse 404 */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return locale
}

export type { Dictionary }

/**
 * Layout için: 404 sayfası çizilirken layout dil parametresi olmadan çağrılabilir.
 * Burada notFound() atılırsa 404 sayfası da çizilemez; bu yüzden varsayılan dile düşülür.
 */
export async function layoutLocale(params: Promise<{ locale?: string }>): Promise<Locale> {
  const { locale } = await params
  return isLocale(locale) ? locale : defaultLocale
}
