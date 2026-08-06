import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { useMouseParallax } from '../hooks/useMouseParallax'
import { luxuryEase, reveal } from '../lib/motion'

type Step = {
  id: string
  title: string
  description: string
  visualLabel: string
  image: string
  icon: 'coin' | 'pin' | 'design' | 'gem' | 'ops' | 'returns'
}

const steps: Step[] = [
  {
    id: 'investment',
    title: 'Investment',
    description: 'You invest in your EMORI franchise.',
    visualLabel: 'Capital committed',
    image:
      'https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=1400&q=80',
    icon: 'coin',
  },
  {
    id: 'location',
    title: 'Location',
    description: 'Premium retail location selected.',
    visualLabel: 'Blueprint secured',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
    icon: 'pin',
  },
  {
    id: 'design',
    title: 'Store Design',
    description: 'Luxury interiors and branding completed.',
    visualLabel: 'Salon composed',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80',
    icon: 'design',
  },
  {
    id: 'inventory',
    title: 'Inventory',
    description: 'Premium jewellery supplied by EMORI.',
    visualLabel: 'Collection arrives',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=80',
    icon: 'gem',
  },
  {
    id: 'operations',
    title: 'Operations',
    description: 'Hiring, training, marketing and store management handled by EMORI.',
    visualLabel: 'House in motion',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80',
    icon: 'ops',
  },
  {
    id: 'returns',
    title: 'Returns',
    description: 'Business operates while you receive performance-based returns.',
    visualLabel: 'Partnership compounds',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=80',
    icon: 'returns',
  },
]

function StepIcon({ type }: { type: Step['icon'] }) {
  switch (type) {
    case 'coin':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="9.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="16" cy="16" r="6.5" stroke="currentColor" strokeWidth="1" opacity="0.55" />
          <path d="M16 11.5v9M13.5 13.8c.7-.7 1.6-1 2.5-1s1.9.4 2.5 1M13.5 18.2c.7.7 1.6 1 2.5 1s1.9-.4 2.5-1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )
    case 'pin':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 6.5c4 0 7.2 3.1 7.2 7 0 5.2-7.2 12-7.2 12S8.8 18.7 8.8 13.5c0-3.9 3.2-7 7.2-7z" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="16" cy="13.5" r="2.2" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      )
    case 'design':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="7" y="9" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M7 13h18M12 9v14" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      )
    case 'gem':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 6 L25 13 L16 26 L7 13 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M7 13h18M12 13 L16 6 L20 13" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      )
    case 'ops':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9 24c1.4-3.2 3.8-4.8 7-4.8s5.6 1.6 7 4.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="24" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
          <circle cx="8" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
        </svg>
      )
    case 'returns':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M8 22 V12 M14 22 V9 M20 22 V14 M26 22 V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M7 25h19" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />
        </svg>
      )
  }
}

function BoutiqueIllustration({
  step,
  active,
}: {
  step: Step
  active: number
}) {
  const mouse = useMouseParallax(10)
  const reduced = useReducedMotion()
  const complete = active === steps.length - 1

  return (
    <div className={`fico__visual ${complete ? 'fico__visual--complete' : ''}`}>
      <motion.div
        className="fico__visual-bloom"
        style={{ x: mouse.x * 0.4, y: mouse.y * 0.35 }}
        animate={reduced ? undefined : { opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="fico__visual-frame">
        <AnimatePresence mode="sync">
          <motion.div
            key={step.id}
            className="fico__visual-image"
            style={{ backgroundImage: `url(${step.image})` }}
            initial={reduced ? false : { opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
            transition={{ duration: 1, ease: luxuryEase }}
          />
        </AnimatePresence>

        <svg className="fico__visual-lines" viewBox="0 0 320 400" fill="none" aria-hidden="true">
          <motion.rect
            x="28"
            y="36"
            width="264"
            height="328"
            rx="2"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1"
            initial={false}
            animate={{ pathLength: 1, opacity: 0.55 + active * 0.06 }}
          />
          <motion.path
            d="M28 100 H292 M90 36 V364"
            stroke="rgba(212,175,55,0.45)"
            strokeWidth="1"
            initial={false}
            animate={{ opacity: active >= 1 ? 0.7 : 0.2 }}
            transition={{ duration: 0.8, ease: luxuryEase }}
          />
          <motion.circle
            cx="210"
            cy="210"
            r="48"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1"
            initial={false}
            animate={{ opacity: active >= 3 ? 0.75 : 0.15, scale: active >= 3 ? 1 : 0.92 }}
            transition={{ duration: 0.85, ease: luxuryEase }}
          />
          <motion.path
            d="M60 300 H140 M160 280 H250"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
            strokeLinecap="round"
            initial={false}
            animate={{ opacity: active >= 4 ? 0.7 : 0.12 }}
            transition={{ duration: 0.85, ease: luxuryEase }}
          />
        </svg>

        <div className="fico__visual-veil" />
        <motion.p
          key={`${step.id}-label`}
          className="fico__visual-caption"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: luxuryEase, delay: 0.12 }}
        >
          {step.visualLabel}
        </motion.p>
      </div>

      <AnimatePresence>
        {complete && (
          <motion.div
            className="fico__finale-glow"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: luxuryEase }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export function FicoModel() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [lineProgress, setLineProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.7', 'end 0.35'],
  })

  const progressMV = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(progressMV, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(1, latest))
    setLineProgress(clamped)
    const idx = Math.min(
      steps.length - 1,
      Math.floor(clamped * steps.length + 0.001)
    )
    setActive(idx)
  })

  const goTo = useCallback((index: number) => {
    setActive(Math.max(0, Math.min(steps.length - 1, index)))
    setLineProgress(index / Math.max(1, steps.length - 1))
  }, [])

  const current = steps[active]
  const drawn = reduced ? 1 : Math.max(lineProgress, active / Math.max(1, steps.length - 1))

  return (
    <section id="fico" ref={sectionRef} className="fico">
      <div className="fico__continuum" aria-hidden="true">
        <span className="fico__continuum-line" />
      </div>

      <div className="fico__atmosphere" aria-hidden="true">
        <span className="fico__radial fico__radial--a" />
        <span className="fico__radial fico__radial--b" />
        <span className="fico__diamond fico__diamond--1" />
        <span className="fico__diamond fico__diamond--2" />
        <span className="fico__grain" />
      </div>

      <div className="fico__scene">
        <motion.div
          className="fico__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p className="fico__label" variants={reveal}>
            The FICO Model
          </motion.p>
          <motion.h2 className="fico__heading" variants={reveal}>
            You Invest.
            <br />
            We Build.
            <br />
            <em>Together We Grow.</em>
          </motion.h2>
          <motion.p className="fico__lede" variants={reveal}>
            With EMORI&apos;s Franchise Invested Company Operated model, you focus on ownership while
            our experienced team manages the complete retail operation.
          </motion.p>
        </motion.div>

        <div className="fico__body">
          <div className="fico__journey">
            <div className="fico__track" aria-hidden="true">
              <div className="fico__track-base" />
              <motion.div
                className="fico__track-progress"
                style={{ transformOrigin: 'left center' }}
                animate={{ scaleX: drawn }}
                transition={{ duration: 0.85, ease: luxuryEase }}
              />
            </div>

            <div className="fico__steps" role="tablist" aria-label="FICO journey steps">
              {steps.map((step, index) => {
                const state =
                  index === active
                    ? 'is-active'
                    : index < active
                      ? 'is-past'
                      : 'is-next'
                return (
                  <motion.button
                    key={step.id}
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    className={`fico__step ${state}`}
                    onClick={() => goTo(index)}
                    initial={reduced ? false : { opacity: 0, y: 40, filter: 'blur(10px)' }}
                    whileInView={
                      reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.9,
                      ease: luxuryEase,
                      delay: index * 0.07,
                    }}
                  >
                    <span className="fico__circle">
                      <span className="fico__circle-glow" aria-hidden="true" />
                      <StepIcon type={step.icon} />
                    </span>
                    <span className="fico__step-index">0{index + 1}</span>
                    <span className="fico__step-title">{step.title}</span>
                    <span className="fico__step-desc">{step.description}</span>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <BoutiqueIllustration step={current} active={active} />
        </div>
      </div>

      <div className={`fico__bridge ${active === steps.length - 1 ? 'fico__bridge--lit' : ''}`} aria-hidden="true" />
    </section>
  )
}
