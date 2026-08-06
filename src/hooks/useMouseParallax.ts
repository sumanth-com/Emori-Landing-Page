import { useEffect, useState } from 'react'

export function useMouseParallax(strength = 18) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let frame = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * strength
        const y = (e.clientY / window.innerHeight - 0.5) * strength
        setOffset({ x, y })
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
    }
  }, [strength])

  return offset
}
