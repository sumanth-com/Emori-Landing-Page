import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { luxuryEase, reveal } from '../lib/motion'
import {
  IconChannel,
  IconGem,
  IconGold,
  IconSeal,
  IconShark,
  IconStore,
} from './trust/TrustIcons'

const cards: {
  title: string
  subtitle: string
  icon: ReactNode
}[] = [
  {
    title: 'Shark Tank India',
    subtitle: 'Backed by ₹3 Crore investment',
    icon: <IconShark />,
  },
  {
    title: 'IGI Certified',
    subtitle: 'International Gemological Institute',
    icon: <IconGem />,
  },
  {
    title: 'SGL Certified',
    subtitle: 'Premium Diamond Certification',
    icon: <IconSeal />,
  },
  {
    title: '14K & 18K Gold',
    subtitle: 'Luxury craftsmanship',
    icon: <IconGold />,
  },
  {
    title: 'Omnichannel Brand',
    subtitle: 'Online + Offline Presence',
    icon: <IconChannel />,
  },
  {
    title: 'Premium Stores',
    subtitle: 'Growing retail network',
    icon: <IconStore />,
  },
]

const cardReveal = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: luxuryEase,
    },
  },
}

const cardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

export function TrustProven() {
  const reduced = useReducedMotion()

  return (
    <section id="trust-proven" className="trust-proven">
      <div className="trust-proven__rail">
        <motion.div
          className="trust-proven__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p className="trust-proven__label" variants={reveal}>
            Trusted. Proven. Growing.
          </motion.p>
          <motion.h2 className="trust-proven__heading" variants={reveal}>
            A Brand Built on Trust, Crafted for Growth.
          </motion.h2>
          <motion.p className="trust-proven__lede" variants={reveal}>
            India&apos;s most trusted lab grown diamond jewellery brand, now inviting partners to
            grow with us.
          </motion.p>
        </motion.div>

        <motion.div
          className="trust-proven__cards"
          variants={reduced ? undefined : cardStagger}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card) => (
            <motion.article
              key={card.title}
              className="trust-card"
              variants={reduced ? undefined : cardReveal}
            >
              <div className="trust-card__copy">
                <h3 className="trust-card__title">{card.title}</h3>
                <p className="trust-card__subtitle">{card.subtitle}</p>
              </div>

              <div className="trust-card__art" aria-hidden="true">
                <span className="trust-card__bloom" />
                <span className="trust-card__ring" />
                <div className="trust-card__icon">{card.icon}</div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
