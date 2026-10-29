'use client'

import { useEffect, useRef } from 'react'

// Sayfanın üstündeki okuma ilerleme çubuğu
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={bar}
      style={{ transform: 'scaleX(0)' }}
      aria-hidden
      className="fixed top-0 left-0 right-0 h-1 bg-[#138a8f] origin-left z-50 transition-transform duration-150 ease-out motion-reduce:transition-none"
    />
  )
}
