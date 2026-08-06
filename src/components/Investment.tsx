import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useRef } from 'react'
import { CountUp } from './ui/CountUp'
import { useMouseParallax } from '../hooks/useMouseParallax'
import { luxuryEase, reveal } from '../lib/motion'

type BreakdownCard = {
  id: string
  title: string
  value: number
  decimals?: number
  suffix: string
  prefix: string
  detail: string
  className: string
  depth: number
  angle: number
}

const breakdown: BreakdownCard[] = [
  {
    id: '01',
    title: 'Franchise Fee',
    value: 5,
    suffix: ' Lakh',
    prefix: '₹',
    detail: 'One-time franchise rights.',
    className: 'invest__card--a',
    depth: 1,
    angle: Math.PI / 4,
  },
  {
    id: '02',
    title: 'Lease Deposit',
    value: 20,
    suffix: ' Lakh',
    prefix: '₹',
    detail: 'Premium retail location.',
    className: 'invest__card--b',
    depth: 0.7,
    angle: (3 * Math.PI) / 4,
  },
  {
    id: '03',
    title: 'Store Setup',
    value: 50,
    suffix: ' Lakh',
    prefix: '₹',
    detail: 'Luxury interiors and branding.',
    className: 'invest__card--c',
    depth: 0.85,
    angle: (5 * Math.PI) / 4,
  },
  {
    id: '04',
    title: 'Inventory Deposit',
    value: 1.5,
    decimals: 2,
    suffix: ' Crore',
    prefix: '₹',
    detail: 'Premium jewellery inventory.',
    className: 'invest__card--d',
    depth: 0.6,
    angle: (7 * Math.PI) / 4,
  },
]

const chips = [
  '5 Year Agreement',
  '2 Year Lock-in',
  '15% Guaranteed Return',
  '500–1000 sq.ft Premium Location',
]

const cardReveal = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.96,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: luxuryEase },
  },
}

const chipReveal = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: luxuryEase },
  },
}

function InvestCard({
  card,
  orbit,
  mouse,
  reduced,
}: {
  card: BreakdownCard
  orbit: MotionValue<number>
  mouse: { x: number; y: number }
  reduced: boolean
}) {
  const orbitX = useTransform(orbit, (v) => Math.cos(card.angle + v * 0.35) * 4)
  const orbitY = useTransform(orbit, (v) => Math.sin(card.angle + v * 0.35) * 4)

  return (
    <motion.article
      className={`invest__card ${card.className}`}
      variants={reduced ? undefined : cardReveal}
      style={
        reduced
          ? undefined
          : {
              x: orbitX,
              y: orbitY,
            }
      }
      whileHover={
        reduced
          ? undefined
          : {
              y: -6,
              rotate: 2,
              transition: { duration: 0.7, ease: luxuryEase },
            }
      }
    >
      <motion.div
        className="invest__card-inner"
        style={
          reduced
            ? undefined
            : {
                x: mouse.x * card.depth * 0.4,
                y: mouse.y * card.depth * 0.4,
              }
        }
      >
        <span className="invest__card-index">{card.id}</span>
        <h3 className="invest__card-title">{card.title}</h3>
        <p className="invest__card-value">
          <CountUp
            value={card.value}
            decimals={card.decimals}
            prefix={card.prefix}
            suffix={card.suffix}
          />
        </p>
        <p className="invest__card-detail">{card.detail}</p>
        <span className="invest__card-glow" aria-hidden="true" />
      </motion.div>
    </motion.article>
  )
}

export function Investment() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const mouse = useMouseParallax(8)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const orbRotate = useTransform(scrollYProgress, [0, 1], [-6, 8])
  const orbit = useTransform(scrollYProgress, [0, 1], [0, 1])
  const dissolve = useTransform(scrollYProgress, [0.72, 0.98], [0, 1])

  return (
    <section id="investment" ref={sectionRef} className="invest">
      <div className="invest__inflow" aria-hidden="true">
        <span className="invest__inflow-glow" />
      </div>

      <div className="invest__atmosphere" aria-hidden="true">
        <span className="invest__radial invest__radial--a" />
        <span className="invest__radial invest__radial--b" />
        <span className="invest__diamond invest__diamond--1" />
        <span className="invest__diamond invest__diamond--2" />
        <span className="invest__grain" />
      </div>

      <div className="invest__scene">
        <motion.div
          className="invest__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p className="invest__label" variants={reveal}>
            Investment Overview
          </motion.p>
          <motion.h2 className="invest__heading" variants={reveal}>
            A Premium Investment,
            <br />
            <em>Designed for Long-Term Growth.</em>
          </motion.h2>
          <motion.p className="invest__lede" variants={reveal}>
            Everything required to launch your EMORI luxury jewellery business with complete
            operational support.
          </motion.p>
        </motion.div>

        <div className="invest__constellation">
          <svg className="invest__lines" viewBox="0 0 800 420" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="investLineGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#d4af37" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            {[
              'M 400 210 L 140 90',
              'M 400 210 L 660 90',
              'M 400 210 L 140 330',
              'M 400 210 L 660 330',
            ].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                stroke="url(#investLineGold)"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 1.15,
                  ease: luxuryEase,
                  delay: 0.25 + i * 0.12,
                }}
              />
            ))}
          </svg>

          <motion.div
            className="invest__orb"
            style={reduced ? undefined : { rotate: orbRotate }}
            initial={reduced ? false : { opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
            whileInView={
              reduced ? undefined : { opacity: 1, scale: 1, filter: 'blur(0px)' }
            }
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.15, ease: luxuryEase }}
          >
            <motion.div
              className="invest__orb-core"
              animate={
                reduced
                  ? undefined
                  : { scale: [1, 1.035, 1], opacity: [0.92, 1, 0.92] }
              }
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="invest__orb-sheen" aria-hidden="true" />
              <span className="invest__orb-ring" aria-hidden="true" />
              <p className="invest__orb-value">
                ₹<CountUp value={2.25} decimals={2} /> Cr
              </p>
              <p className="invest__orb-label">Total Investment</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="invest__cards"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
            }}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.25 }}
          >
            {breakdown.map((card) => (
              <InvestCard
                key={card.id}
                card={card}
                orbit={orbit}
                mouse={mouse}
                reduced={!!reduced}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          className="invest__chips"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.4 }}
        >
          {chips.map((chip) => (
            <motion.span key={chip} className="invest__chip" variants={chipReveal}>
              {chip}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div className="invest__dissolve" style={{ opacity: dissolve }} aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="invest__particle"
            style={{
              left: `${18 + ((i * 13) % 64)}%`,
              top: `${30 + ((i * 17) % 40)}%`,
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </motion.div>

      <div className="invest__bridge" aria-hidden="true" />
    </section>
  )
}
