'use client'

import { useLayoutEffect } from 'react'

const applyTheme = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`

/**
 * Temayı sayfa boyanmadan uygular (beyaz yanıp sönmesin).
 * - Script sunucu HTML'inde çalışır. Tarayıcıda React yeniden oluşturursa (dil değişimi)
 *   'text/plain' olarak oluşturulur: çalışmaz ve "Encountered a script tag" uyarısı çıkmaz.
 *   Hydration'da mevcut etiket aynen kullanılır (type farkı suppressHydrationWarning ile yok sayılır).
 * - Dil değişince <html> class'ı yeniden yazılır; 'dark' sınıfını geri koyar.
 */
export default function ThemeScript({ locale }: { locale: string }) {
  useLayoutEffect(() => {
    try {
      const t = localStorage.getItem('theme')
      const dark = t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.classList.toggle('dark', dark)
    } catch {}
  }, [locale])

  return (
    <script
      suppressHydrationWarning
      type={typeof window === 'undefined' ? undefined : 'text/plain'}
      dangerouslySetInnerHTML={{ __html: applyTheme }}
    />
  )
}
