import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { luxuryEase } from '../../lib/motion'

const cardReveal = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: luxuryEase,
    },
  },
}

type TrustCardProps = {
  index: string
  title: string
  subtitle: string
  hoverNote?: string
  glow?: boolean
  className?: string
  icon: ReactNode
}

export function TrustCard({
  index,
  title,
  subtitle,
  hoverNote,
  glow = false,
  className = '',
  icon,
}: TrustCardProps) {
  const reduced = useReducedMotion()

  return (
    <motion.article
      className={`trust-card ${glow ? 'trust-card--glow' : ''} ${hoverNote ? 'trust-card--reveal' : ''} ${className}`}
      variants={reduced ? undefined : cardReveal}
      whileHover={
        reduced
          ? undefined
          : {
              y: -6,
              transition: { duration: 0.7, ease: luxuryEase },
            }
      }
    >
      <div className="trust-card__index">{index}</div>
      <div className="trust-card__icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="trust-card__title">{title}</h3>
      <p className="trust-card__subtitle">{subtitle}</p>
      {hoverNote ? (
        <p className="trust-card__note" aria-hidden="true">
          {hoverNote}
        </p>
      ) : null}
      <span className="trust-card__sheen" aria-hidden="true" />
    </motion.article>
  )
}
