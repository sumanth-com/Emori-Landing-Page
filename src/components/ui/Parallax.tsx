import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type ParallaxProps = {
  children: ReactNode
  className?: string
  speed?: number
}

export function Parallax({ children, className, speed = 0.2 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const distance = speed * 100
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [-distance, distance]
  )

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y, willChange: 'transform' }}>{children}</motion.div>
    </div>
  )
}
