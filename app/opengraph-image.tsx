import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Paylaşımlarda görünen varsayılan görsel (dilden bağımsız; sayfa kendi görselini verirse o kullanılır)
export const alt = 'Lumorsoft — Web · Mobile · Integrations · AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/images/lumorsoftpng_icon_new.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 80, background: '#0b57d6', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={logoSrc} width={88} height={88} style={{ borderRadius: 20, background: '#fff' }} />
          <span style={{ fontSize: 56, fontWeight: 700 }}>Lumorsoft</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Digital Craft for Your Business</span>
          <span style={{ fontSize: 34, opacity: 0.85 }}>Web · Mobile · Integrations · AI</span>
        </div>
        <div style={{ display: 'flex', fontSize: 28, opacity: 0.7 }}>lumorsoft.com</div>
      </div>
    ),
    size,
  )
}
