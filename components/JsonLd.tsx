// Yapısal veri (schema.org). `<` kaçışlanır; veritabanından gelen metin script etiketini kapatamaz.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
