'use server'

import { headers } from 'next/headers'

export type ContactInput = {
  name: string
  email: string
  subject: string
  message: string
  consent: boolean
  website: string // bot tuzağı: gerçek kullanıcı bu alanı görmez, boş bırakır
}

export type ContactError = 'required' | 'email' | 'tooLong' | 'consent' | 'rateLimit' | 'failed'
export type ContactResult = { ok: true } | { ok: false; error: ContactError }

const LIMITS = { name: 100, email: 200, subject: 200, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Basit istek sınırı: aynı IP'den 10 dakikada en fazla 5 mesaj.
// Not: sunucu örneği başına tutulur; çok sunuculu ortamda Upstash/Redis gibi ortak bir depo daha sağlamdır.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

const FAIL = 'failed' as const

export async function sendContact(input: ContactInput): Promise<ContactResult> {
  // Bot tuzağı doluysa sessizce başarılı gibi davran
  if (typeof input?.website !== 'string' || input.website !== '') return { ok: true }

  const name = String(input.name ?? '').trim()
  const email = String(input.email ?? '').trim()
  const subject = String(input.subject ?? '').replace(/[\r\n]+/g, ' ').trim()
  const message = String(input.message ?? '').trim()

  if (!name || !email || !subject || !message) return { ok: false, error: 'required' }
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'email' }
  if (name.length > LIMITS.name || email.length > LIMITS.email || subject.length > LIMITS.subject || message.length > LIMITS.message) {
    return { ok: false, error: 'tooLong' }
  }
  if (input.consent !== true) return { ok: false, error: 'consent' }

  const h = await headers()
  // Cloudflare gerçek ziyaretçi IP'sini cf-connecting-ip ile verir. x-forwarded-for'un ilk değeri
  // ziyaretçi tarafından uydurulabilir; sadece yedek olarak kullanılır.
  const ip = h.get('cf-connecting-ip') || h.get('x-real-ip') || h.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) return { ok: false, error: 'rateLimit' }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !from || !to) {
    console.error('İletişim formu: RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL ayarlı değil')
    return { ok: false, error: FAIL }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Site] ${subject}`,
        // Düz metin: kullanıcı girdisi HTML olarak yorumlanmaz
        text: `Ad Soyad: ${name}\nE-posta: ${email}\nKonu: ${subject}\n\n${message}`,
      }),
    })
    if (!res.ok) {
      console.error('İletişim formu: Resend hatası', res.status, await res.text())
      return { ok: false, error: FAIL }
    }
    return { ok: true }
  } catch (err) {
    console.error('İletişim formu: gönderim hatası', err)
    return { ok: false, error: FAIL }
  }
}
