import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    document.documentElement.classList.add('lenis')

    const syncModal = () => {
      if (document.documentElement.classList.contains('modal-open')) lenis.stop()
      else lenis.start()
    }
    syncModal()

    const observer = new MutationObserver(syncModal)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      lenis.destroy()
      document.documentElement.classList.remove('lenis')
    }
  }, [])
}
