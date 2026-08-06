import { motion, useReducedMotion } from 'framer-motion'
import { CountUp } from './ui/CountUp'
import { TrustCard } from './trust/TrustCard'
import {
  IconChannel,
  IconGem,
  IconGold,
  IconSeal,
  IconShark,
  IconStore,
} from './trust/TrustIcons'
import { luxuryEase, reveal } from '../lib/motion'

const cards = [
  {
    index: '01',
    title: 'Shark Tank India',
    subtitle: 'Backed by ₹3 Crore investment',
    glow: true,
    className: 'trust-card--a',
    icon: <IconShark />,
  },
  {
    index: '02',
    title: 'IGI Certified',
    subtitle: 'International Gemological Institute',
    hoverNote: 'Globally trusted certification',
    className: 'trust-card--b',
    icon: <IconGem />,
  },
  {
    index: '03',
    title: 'SGL Certified',
    subtitle: 'Premium Diamond Certification',
    className: 'trust-card--c',
    icon: <IconSeal />,
  },
  {
    index: '04',
    title: '14K & 18K Gold',
    subtitle: 'Luxury craftsmanship',
    className: 'trust-card--d',
    icon: <IconGold />,
  },
  {
    index: '05',
    title: 'Omnichannel Brand',
    subtitle: 'Online + Offline Presence',
    className: 'trust-card--e',
    icon: <IconChannel />,
  },
  {
    index: '06',
    title: '3 Premium Stores',
    subtitle: 'Growing retail network',
    className: 'trust-card--f',
    icon: <IconStore />,
  },
]

const metrics = [
  {
    label: 'Funding Raised',
    prefix: '₹',
    value: 3,
    suffix: ' Cr+',
    decimals: 0,
  },
  {
    label: 'Guaranteed Return',
    value: 15,
    suffix: '%',
    decimals: 0,
  },
  {
    label: 'Offline Revenue',
    prefix: '₹',
    value: 8.1,
    suffix: ' Cr',
    decimals: 1,
  },
  {
    label: 'Average Payback',
    value: 24,
    suffix: ' Months',
    decimals: 0,
  },
  {
    label: 'Store EBITDA',
    value: 20,
    suffix: '%',
    decimals: 0,
  },
  {
    label: 'Community',
    value: 15,
    suffix: 'K+',
    decimals: 0,
  },
]

const cardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
}

const metricReveal = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: luxuryEase,
    },
  },
}

const metricStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

export function TrustProven() {
  const reduced = useReducedMotion()

  return (
    <section id="trust-proven" className="trust-proven">
      <div className="trust-proven__atmosphere" aria-hidden="true">
        <span className="trust-proven__radial trust-proven__radial--a" />
        <span className="trust-proven__radial trust-proven__radial--b" />
        <span className="trust-proven__radial trust-proven__radial--c" />
        <span className="trust-proven__diamond trust-proven__diamond--1" />
        <span className="trust-proven__diamond trust-proven__diamond--2" />
        <span className="trust-proven__diamond trust-proven__diamond--3" />
        <span className="trust-proven__grain" />
      </div>

      <div className="trust-proven__rail">
        <motion.div
          className="trust-proven__intro"
          variants={reduced ? undefined : cardStagger}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.p className="trust-proven__label" variants={reduced ? undefined : reveal}>
            Trusted. Proven. Growing.
          </motion.p>
          <motion.h2 className="trust-proven__heading" variants={reduced ? undefined : reveal}>
            A Brand Built on Trust,
            <br />
            <em>Crafted for Growth.</em>
          </motion.h2>
          <motion.p className="trust-proven__lede" variants={reduced ? undefined : reveal}>
            Every EMORI store is backed by certified products, a proven business model, national
            brand recognition, and an experienced operations team.
          </motion.p>
        </motion.div>

        <motion.div
          className="trust-proven__cards"
          variants={reduced ? undefined : cardStagger}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.15 }}
        >
          {cards.map((card) => (
            <TrustCard key={card.index} {...card} />
          ))}
        </motion.div>

        <motion.div
          className="trust-proven__metrics"
          variants={reduced ? undefined : metricStagger}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.35 }}
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              className="trust-metric"
              variants={reduced ? undefined : metricReveal}
            >
              <p className="trust-metric__value">
                <CountUp
                  value={metric.value}
                  decimals={metric.decimals}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </p>
              <p className="trust-metric__label">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="trust-proven__bridge" aria-hidden="true" />
    </section>
  )
}
