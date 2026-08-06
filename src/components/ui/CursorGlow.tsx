import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CursorGlow() {
  const reduced = useReducedMotion()
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <motion.div
      className="cursor-glow"
      aria-hidden="true"
      animate={{
        x: pos.x - 140,
        y: pos.y - 140,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 28, mass: 0.4 }}
    />
  )
}
