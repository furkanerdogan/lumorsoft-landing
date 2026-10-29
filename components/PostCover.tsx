import { DocumentIcon } from './Icons'

// Blog kapak görseli; görsel yoksa marka renginde yer tutucu
export default function PostCover({ src, alt, className = '', priority = false }: { src: string | null; alt: string; className?: string; priority?: boolean }) {
  if (!src) {
    return (
      <div className={`${className} bg-gradient-to-br from-[#e8f0fc] to-[#d5eeee] flex items-center justify-center text-[#127f84]`} aria-hidden>
        <div className="w-14 h-14">{DocumentIcon}</div>
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} className={`${className} object-cover`} />
  )
}
