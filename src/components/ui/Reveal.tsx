import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { reveal, stagger } from '../../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
}

export function Reveal({
  children,
  className,
  variants = reveal,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  variants = reveal,
}: RevealProps) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
