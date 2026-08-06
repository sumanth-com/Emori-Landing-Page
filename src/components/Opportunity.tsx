import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useRef, useState } from 'react'
import { CountUp } from './ui/CountUp'
import { useMouseParallax } from '../hooks/useMouseParallax'
import { luxuryEase, reveal } from '../lib/motion'

const insights = [
  {
    id: '01',
    title: 'Growing Consumer Demand',
    text: 'Luxury buyers increasingly prefer lab-grown diamonds.',
    className: 'market__insight--a',
  },
  {
    id: '02',
    title: 'Sustainable Luxury',
    text: 'Modern consumers value ethical sourcing.',
    className: 'market__insight--b',
  },
  {
    id: '03',
    title: 'Affordable Premium',
    text: 'Higher accessibility without compromising beauty.',
    className: 'market__insight--c',
  },
  {
    id: '04',
    title: 'Expanding Category',
    text: "One of India's fastest-growing jewellery segments.",
    className: 'market__insight--d',
  },
]

const years = [
  { label: '2026', x: 28 },
  { label: '2028', x: 48 },
  { label: '2030', x: 68 },
  { label: '2032', x: 88 },
]

const PATH_D =
  'M 40 168 C 120 168, 160 150, 220 130 C 300 95, 340 88, 420 78 C 520 64, 580 58, 680 48 C 760 40, 820 36, 900 32'

const cardReveal = {
  hidden: {
    opacity: 0,
    y: 48,
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

const cardStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
}

function GrowthPathway({ progress }: { progress: number }) {
  const reduced = useReducedMotion()
  const pathLength = Math.max(0.001, Math.min(1, progress))

  return (
    <div className="market__pathway" aria-hidden="true">
      <svg className="market__pathway-svg" viewBox="0 0 940 200" fill="none">
        <defs>
          <linearGradient id="marketPathGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8d48b" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#d4af37" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f5e7b2" stopOpacity="0.85" />
          </linearGradient>
          <filter id="marketGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={PATH_D}
          stroke="rgba(17,17,17,0.08)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <motion.path
          d={PATH_D}
          stroke="url(#marketPathGlow)"
          strokeWidth="2.2"
          strokeLinecap="round"
          filter="url(#marketGlow)"
          style={{ pathLength: reduced ? 1 : pathLength }}
        />

        {!reduced &&
          [0, 1, 2, 3].map((i) => (
            <circle key={i} r="3.2" fill="#fff" filter="url(#marketGlow)">
              <animateMotion
                dur={`${5.5 + i * 1.1}s`}
                repeatCount="indefinite"
                begin={`${i * 1.2}s`}
                path={PATH_D}
              />
              <animate
                attributeName="opacity"
                values="0;0.9;0.9;0"
                keyTimes="0;0.12;0.85;1"
                dur={`${5.5 + i * 1.1}s`}
                begin={`${i * 1.2}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
      </svg>

      <div className="market__path-start">
        <p className="market__path-value">
          ₹<CountUp value={2700} /> Cr
        </p>
        <p className="market__path-caption">Market Today</p>
      </div>

      <div className="market__path-years">
        {years.map((year, i) => (
          <motion.span
            key={year.label}
            className="market__path-year"
            style={{ left: `${year.x}%` }}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: pathLength > i * 0.22 + 0.12 ? 1 : 0.25, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEase }}
          >
            {year.label}
          </motion.span>
        ))}
      </div>

      <div className="market__path-end">
        <p className="market__path-value market__path-value--gold">
          ₹<CountUp value={7000} suffix="+" /> Cr
        </p>
        <p className="market__path-caption">Projected 2032</p>
      </div>
    </div>
  )
}

function PathwayWithProgress({
  drawProgress,
  reduced,
}: {
  drawProgress: MotionValue<number>
  reduced: boolean
}) {
  const [progress, setProgress] = useState(() => (reduced ? 1 : drawProgress.get()))

  useMotionValueEvent(drawProgress, 'change', (latest) => {
    if (!reduced) setProgress(latest)
  })

  return <GrowthPathway progress={reduced ? 1 : progress} />
}

function JewelleryComposition() {
  const mouse = useMouseParallax(16)
  const reduced = useReducedMotion()

  return (
    <div className="market__jewel" aria-hidden="true">
      <motion.div
        className="market__jewel-bloom"
        style={{ x: mouse.x * 0.5, y: mouse.y * 0.5 }}
        animate={reduced ? undefined : { opacity: [0.45, 0.75, 0.45], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="market__jewel-bloom market__jewel-bloom--gold"
        style={{ x: mouse.x * -0.35, y: mouse.y * -0.3 }}
        animate={reduced ? undefined : { opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        className="market__jewel-orb market__jewel-orb--blur"
        style={{ x: mouse.x * 0.25, y: mouse.y * 0.2 }}
        animate={reduced ? undefined : { y: [0, -12, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="market__jewel-focus"
        style={{ x: mouse.x * 0.7, y: mouse.y * 0.55 }}
        animate={
          reduced ? undefined : { y: [0, -10, 0], rotate: [-1.2, 1.2, -1.2] }
        }
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="market__jewel-img" />
        <div className="market__jewel-glass" />
        <div className="market__jewel-rim" />
      </motion.div>

      <div className="market__jewel-sparks">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className={`market__jewel-spark market__jewel-spark--${i % 3}`}
            style={{
              left: `${18 + ((i * 21) % 64)}%`,
              top: `${16 + ((i * 29) % 62)}%`,
            }}
            animate={
              reduced
                ? undefined
                : { opacity: [0.15, 0.85, 0.15], scale: [0.8, 1.15, 0.8] }
            }
            transition={{
              duration: 4.2 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.45,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function Opportunity() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const drawProgress = useTransform(scrollYProgress, [0.18, 0.52], [0, 1])
  const parallaxY = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <section id="opportunity" ref={sectionRef} className="market">
      <div className="market__atmosphere" aria-hidden="true">
        <span className="market__radial market__radial--a" />
        <span className="market__radial market__radial--b" />
        <span className="market__radial market__radial--c" />
        <span className="market__refraction market__refraction--1" />
        <span className="market__refraction market__refraction--2" />
        <div className="market__particles">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.span
              key={i}
              className="market__particle"
              style={{
                left: `${10 + ((i * 17) % 80)}%`,
                top: `${14 + ((i * 23) % 72)}%`,
              }}
              animate={
                reduced
                  ? undefined
                  : { opacity: [0.08, 0.45, 0.08], y: [0, -10, 0] }
              }
              transition={{
                duration: 6 + (i % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.35,
              }}
            />
          ))}
        </div>
        <span className="market__grain" />
      </div>

      <div className="market__scene">
        <motion.div
          className="market__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.55 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p className="market__label" variants={reveal}>
            The Opportunity
          </motion.p>
          <motion.h2 className="market__heading" variants={reveal}>
            The Future of Luxury
            <br />
            <em>is Being Reimagined.</em>
          </motion.h2>
          <motion.p className="market__lede" variants={reveal}>
            Lab-grown diamonds are transforming the jewellery industry by combining luxury,
            sustainability and accessibility, creating one of India&apos;s fastest-growing premium
            retail categories.
          </motion.p>
        </motion.div>

        <div className="market__stage">
          <div className="market__main">
            <motion.div style={{ y: reduced ? 0 : parallaxY }}>
              <PathwayWithProgress drawProgress={drawProgress} reduced={!!reduced} />
            </motion.div>

            <motion.div
              className="market__insights"
              variants={reduced ? undefined : cardStagger}
              initial={reduced ? undefined : 'hidden'}
              whileInView={reduced ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.25 }}
            >
              {insights.map((card) => (
                <motion.article
                  key={card.id}
                  className={`market__insight ${card.className}`}
                  variants={reduced ? undefined : cardReveal}
                  whileHover={
                    reduced
                      ? undefined
                      : { y: -5, transition: { duration: 0.7, ease: luxuryEase } }
                  }
                >
                  <span className="market__insight-index">{card.id}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>

          <JewelleryComposition />
        </div>
      </div>

      <div className="market__bridge" aria-hidden="true" />
    </section>
  )
}
