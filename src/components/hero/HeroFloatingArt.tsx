import { motion, useReducedMotion } from 'framer-motion'
import { useId } from 'react'
import { useMouseParallax } from '../../hooks/useMouseParallax'

const luxuryEase = [0.22, 1, 0.36, 1] as const

function DiamondFacet({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '')
  const face = `diaFace-${uid}`
  const edge = `diaEdge-${uid}`
  const glow = `diaGlow-${uid}`

  return (
    <svg className={className} viewBox="0 0 120 140" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={face} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#f0ebe3" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={edge} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.45" />
        </linearGradient>
        <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${glow})`}>
        <path
          d="M60 8 L108 48 L60 132 L12 48 Z"
          fill={`url(#${face})`}
          stroke={`url(#${edge})`}
          strokeWidth="1.2"
        />
        <path d="M60 8 L84 48 L60 132 L36 48 Z" fill="rgba(255,255,255,0.35)" />
        <path d="M12 48 H108 L60 68 Z" fill="rgba(255,255,255,0.45)" />
        <path d="M36 48 L60 68 L84 48" stroke="rgba(212,175,55,0.35)" strokeWidth="0.8" />
        <path d="M60 8 L60 132" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" />
      </g>
    </svg>
  )
}

type HeroFloatingArtProps = {
  parallaxY?: import('framer-motion').MotionValue<number>
}

export function HeroFloatingArt({ parallaxY }: HeroFloatingArtProps) {
  const reduced = useReducedMotion()
  const mouse = useMouseParallax(20)

  return (
    <motion.div
      className="hero-art"
      style={parallaxY ? { y: parallaxY } : undefined}
      aria-hidden="true"
    >
      <motion.div
        className="hero-art__bloom"
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.45, 0.75, 0.45],
                scale: [1, 1.08, 1],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: mouse.x * 0.6, y: mouse.y * 0.6 }}
      />

      <motion.div
        className="hero-art__bloom hero-art__bloom--gold"
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.3, 0.55, 0.3],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{ x: mouse.x * -0.4, y: mouse.y * -0.35 }}
      />

      {/* Soft blurred jewellery backplane */}
      <motion.div
        className="hero-art__blur-jewel hero-art__blur-jewel--a"
        style={{ x: mouse.x * 0.35, y: mouse.y * 0.25 }}
        animate={reduced ? undefined : { y: [0, -18, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-art__blur-jewel hero-art__blur-jewel--b"
        style={{ x: mouse.x * -0.25, y: mouse.y * 0.4 }}
        animate={reduced ? undefined : { y: [0, 22, 0], rotate: [3, -1, 3] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Glass disc reflection */}
      <motion.div
        className="hero-art__glass"
        style={{ x: mouse.x * 0.5, y: mouse.y * 0.3 }}
        animate={reduced ? undefined : { rotate: [0, 8, 0], y: [0, -12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Primary floating diamond */}
      <motion.div
        className="hero-art__diamond hero-art__diamond--primary"
        style={{ x: mouse.x * 0.9, y: mouse.y * 0.7 }}
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={
          reduced
            ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
            : {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                y: [0, -22, 0],
                rotate: [-4, 5, -4],
              }
        }
        transition={{
          opacity: { duration: 1.4, ease: luxuryEase },
          scale: { duration: 1.4, ease: luxuryEase },
          filter: { duration: 1.4, ease: luxuryEase },
          y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <DiamondFacet className="hero-art__facet" />
        <span className="hero-art__diamond-shine" />
      </motion.div>

      {/* Secondary smaller diamonds */}
      <motion.div
        className="hero-art__diamond hero-art__diamond--secondary"
        style={{ x: mouse.x * -0.55, y: mouse.y * 0.45 }}
        animate={reduced ? undefined : { y: [0, 16, 0], rotate: [6, -4, 6] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <DiamondFacet className="hero-art__facet" />
      </motion.div>

      <motion.div
        className="hero-art__diamond hero-art__diamond--tertiary"
        style={{ x: mouse.x * 0.4, y: mouse.y * -0.5 }}
        animate={reduced ? undefined : { y: [0, -14, 0], rotate: [-8, 3, -8] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
      >
        <DiamondFacet className="hero-art__facet" />
      </motion.div>

      {/* Foreground jewellery focal */}
      <motion.div
        className="hero-art__jewel"
        style={{ x: mouse.x * 0.7, y: mouse.y * 0.55 }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={
          reduced
            ? { opacity: 1, y: 0, scale: 1 }
            : {
                opacity: 1,
                scale: 1,
                y: [0, -14, 0],
                rotate: [-1.5, 1.5, -1.5],
              }
        }
        transition={{
          opacity: { duration: 1.5, ease: luxuryEase, delay: 0.25 },
          scale: { duration: 1.5, ease: luxuryEase, delay: 0.25 },
          y: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
          rotate: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="hero-art__jewel-img" />
        <div className="hero-art__jewel-glass" />
        <div className="hero-art__jewel-rim" />
      </motion.div>

      {/* Floating light particles */}
      <div className="hero-art__particles">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className={`hero-art__particle hero-art__particle--${i % 5}`}
            style={{
              left: `${12 + ((i * 17) % 76)}%`,
              top: `${10 + ((i * 23) % 78)}%`,
            }}
            animate={
              reduced
                ? undefined
                : {
                    opacity: [0.1, 0.85, 0.1],
                    y: [0, -18 - (i % 4) * 4, 0],
                    scale: [0.7, 1.2, 0.7],
                  }
            }
            transition={{
              duration: 5 + (i % 5),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.35,
            }}
          />
        ))}
      </div>

      {/* Soft moving light streak */}
      <motion.div
        className="hero-art__caustic"
        animate={
          reduced
            ? undefined
            : {
                x: ['-8%', '12%', '-8%'],
                opacity: [0.2, 0.45, 0.2],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
