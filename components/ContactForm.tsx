'use client'

import { useState } from 'react'
import Link from 'next/link'
import { img, photos, contact, manrope } from './siteData'
import { sendContact, type ContactError } from '@/app/actions/contact'
import type { Dictionary } from '@/lib/i18n/dictionaries/tr'

const emptyForm = { name: '', email: '', subject: '', message: '' }
const input =
  'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0b57d6] focus:outline-none focus:ring-2 focus:ring-[#dce7fa] text-sm'

export default function ContactForm({ t, privacyHref }: { t: Dictionary['contact']; privacyHref: string }) {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<ContactError | null>(null)
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('') // bot tuzağı

  const bind = (k: keyof typeof emptyForm) => ({
    name: k,
    value: form[k],
    required: true,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value })),
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const result = await sendContact({ ...form, consent, website }).catch(() => null)
    if (result?.ok) {
      setStatus('sent')
      setForm(emptyForm)
      setConsent(false)
    } else {
      setStatus('idle')
      setError(result?.error ?? 'failed')
    }
  }

  return (
    <section id="contact" className={`${manrope.className} py-24 scroll-mt-16`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative rounded-lg overflow-hidden px-6 py-12 md:p-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(photos.office, 1600)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0b1a3a]/75" />
          <div className="relative grid lg:grid-cols-2 gap-14 items-center">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-5">{t.title}</h2>
              <p className="text-white/80 mb-8">{t.text}</p>
              <p className="text-sm text-white/60">{t.emailLabel}</p>
              <a href={`mailto:${contact.email}`} className="text-xl font-bold hover:underline">
                {contact.email}
              </a>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-2xl">
              {status === 'sent' ? (
                <div className="text-center py-10" role="status">
                  <p className="text-2xl font-extrabold text-gray-900 mb-2">{t.sentTitle}</p>
                  <p className="text-gray-500 mb-4">{t.sentText}</p>
                  <button type="button" onClick={() => setStatus('idle')} className="font-bold text-[#0b57d6] hover:underline">
                    {t.newMessage}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input {...bind('name')} maxLength={100} autoComplete="name" placeholder={t.name} aria-label={t.nameLabel} className={input} />
                    <input {...bind('email')} type="email" dir="ltr" maxLength={200} autoComplete="email" placeholder={t.email} aria-label={t.emailFieldLabel} className={`${input} rtl:text-right`} />
                  </div>
                  <input {...bind('subject')} maxLength={200} placeholder={t.subject} aria-label={t.subjectLabel} className={input} />
                  <textarea {...bind('message')} rows={4} maxLength={5000} placeholder={t.message} aria-label={t.messageLabel} className={`${input} resize-none`} />
                  {/* Bot tuzağı: ekranda ve ekran okuyucuda görünmez */}
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute -left-[9999px] w-px h-px opacity-0"
                  />
                  <label className="flex items-start gap-2.5 text-xs text-gray-500">
                    <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#0b57d6]" />
                    <span>
                      {t.consentBefore}
                      <Link href={privacyHref} className="font-bold text-[#0b57d6] hover:underline">
                        {t.consentLink}
                      </Link>
                      {t.consentAfter}
                    </span>
                  </label>
                  {error && (
                    <p role="alert" className="text-sm font-semibold text-red-600">
                      {t.errors[error]}
                    </p>
                  )}
                  <button disabled={status === 'sending'} className="w-full py-3.5 bg-[#0b57d6] text-white font-bold rounded-xl hover:bg-[#0a47b0] transition-colors disabled:opacity-60">
                    {status === 'sending' ? t.sending : t.send}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
