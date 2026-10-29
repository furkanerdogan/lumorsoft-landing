import { notFound } from 'next/navigation'

// Eşleşmeyen tüm adresler dilin 404 sayfasına düşer
export default function CatchAll() {
  notFound()
}
