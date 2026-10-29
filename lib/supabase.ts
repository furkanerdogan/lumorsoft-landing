import 'server-only'
import { createClient } from '@supabase/supabase-js'

// Sadece sunucuda kullanılır; anahtar tarayıcıya gönderilmez.
// Ortam değişkenleri yoksa null döner ve blog boş görünür.
const url = process.env.SUPABASE_URL
const anonKey = process.env.SUPABASE_ANON_KEY

export const supabase = url && anonKey ? createClient(url, anonKey, { auth: { persistSession: false } }) : null
