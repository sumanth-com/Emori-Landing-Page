import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'
import { useMouseParallax } from '../hooks/useMouseParallax'
import { useApplicationModal } from '../context/ApplicationModalContext'
import { luxuryEase, reveal } from '../lib/motion'

const badges = [
  'Shark Tank Backed',
  'Company Operated',
  'Premium Jewellery Brand',
  '15% Guaranteed Return',
]

function FinaleDiamond() {
  const reduced = useReducedMotion()
  const mouse = useMouseParallax(8)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const finalGlow = useTransform(scrollYProgress, [0.55, 0.95], [0.35, 1])

  return (
    <motion.div
      ref={ref}
      className="finale__diamond"
      style={{
        x: reduced ? 0 : mouse.x * 0.55,
        y: reduced ? 0 : mouse.y * 0.45,
      }}
      aria-hidden="true"
    >
      <motion.div className="finale__diamond-glow" style={{ opacity: finalGlow }} />
      <motion.div
        className="finale__diamond-core"
        animate={
          reduced
            ? undefined
            : {
                y: [0, -12, 0],
                rotateY: [-8, 8, -8],
                rotateZ: [-2, 2, -2],
              }
        }
        transition={{
          y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
          rotateZ: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg className="finale__diamond-svg" viewBox="0 0 240 280" fill="none">
          <defs>
            <linearGradient id="finaleFace" x1="20%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#f3ebe0" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="finaleEdge" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#fff8e8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0.65" />
            </linearGradient>
            <linearGradient id="finaleShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <filter id="finaleGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#finaleGlow)">
            <path
              d="M120 18 L210 95 L120 262 L30 95 Z"
              fill="url(#finaleFace)"
              stroke="url(#finaleEdge)"
              strokeWidth="1.4"
            />
            <path d="M120 18 L165 95 L120 262 L75 95 Z" fill="rgba(255,255,255,0.28)" />
            <path d="M30 95 H210 L120 128 Z" fill="rgba(255,255,255,0.42)" />
            <path
              d="M75 95 L120 128 L165 95"
              stroke="rgba(212,175,55,0.45)"
              strokeWidth="1"
            />
            <path d="M120 18 L120 262" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
          </g>
          <motion.rect
            x="40"
            y="40"
            width="160"
            height="200"
            fill="url(#finaleShine)"
            opacity="0.35"
            style={{ mixBlendMode: 'screen' }}
            animate={reduced ? undefined : { x: [-40, 60, -40], opacity: [0.1, 0.45, 0.1] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export function FinalCta() {
  const reduced = useReducedMotion()
  const mouse = useMouseParallax(8)
  const { openApplication } = useApplicationModal()

  return (
    <section id="invitation" className="finale">
      <div className="finale__atmosphere" aria-hidden="true">
        <span className="finale__beam finale__beam--a" />
        <span className="finale__beam finale__beam--b" />
        <span className="finale__volume" />
        <span className="finale__volume finale__volume--gold" />
        <div className="finale__particles">
          {Array.from({ length: 22 }).map((_, i) => (
            <motion.span
              key={i}
              className={`finale__particle finale__particle--${i % 4}`}
              style={{
                left: `${6 + ((i * 17) % 88)}%`,
                top: `${8 + ((i * 23) % 84)}%`,
              }}
              animate={
                reduced
                  ? undefined
                  : {
                      opacity: [0.08, 0.7, 0.08],
                      y: [0, -16 - (i % 5) * 3, 0],
                    }
              }
              transition={{
                duration: 7 + (i % 5),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.28,
              }}
            />
          ))}
        </div>
        <span className="finale__grain" />
      </div>

      <div
        className="finale__scene"
        style={
          reduced
            ? undefined
            : {
                // slight overall depth from mouse on copy layer only via children
              }
        }
      >
        <FinaleDiamond />

        <motion.div
          className="finale__copy"
          style={
            reduced
              ? undefined
              : { x: mouse.x * 0.25, y: mouse.y * 0.2 }
          }
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
          }}
        >
          <motion.p className="finale__label" variants={reveal}>
            Your Journey Starts Here
          </motion.p>
          <motion.h2 className="finale__heading" variants={reveal}>
            Own More Than
            <br />
            A Jewellery Store.
            <br />
            <em>Own A Legacy.</em>
          </motion.h2>
          <motion.p className="finale__lede" variants={reveal}>
            Partner with EMORI and become part of India&apos;s fastest growing premium lab-grown
            diamond brand. Own a business backed by operational excellence, proven performance and
            long-term vision.
          </motion.p>

          <motion.ul
            className="finale__badges"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {badges.map((badge) => (
              <motion.li
                key={badge}
                className="finale__badge"
                variants={{
                  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.85, ease: luxuryEase },
                  },
                }}
              >
                <span className="finale__badge-check" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3.5 8.2 L6.4 11.1 L12.5 4.8"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {badge}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="finale__actions"
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 28 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.95, ease: luxuryEase },
              },
            }}
          >
            <button
              type="button"
              className="btn btn--gold-gradient finale__cta-primary"
              onClick={openApplication}
            >
              <span>Request Franchise Details</span>
              <span className="finale__cta-shine" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn finale__cta-secondary"
              onClick={openApplication}
            >
              Schedule a Private Consultation
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
