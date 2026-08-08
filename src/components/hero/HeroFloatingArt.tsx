import { motion, useReducedMotion } from 'framer-motion'
import heroVisual from '../../assets/Hero (2).png'
import { useMouseParallax } from '../../hooks/useMouseParallax'

const luxuryEase = [0.22, 1, 0.36, 1] as const

type HeroFloatingArtProps = {
  parallaxY?: import('framer-motion').MotionValue<number>
}

export function HeroFloatingArt({ parallaxY }: HeroFloatingArtProps) {
  const reduced = useReducedMotion()
  const mouse = useMouseParallax(14)

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
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.06, 1],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: mouse.x * 0.45, y: mouse.y * 0.45 }}
      />

      <motion.div
        className="hero-art__bloom hero-art__bloom--gold"
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.28, 0.5, 0.28],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        style={{ x: mouse.x * -0.3, y: mouse.y * -0.25 }}
      />

      <motion.div
        className="hero-art__frame"
        style={{ x: mouse.x * 0.55, y: mouse.y * 0.4 }}
        initial={{ opacity: 0, y: 36, scale: 0.97 }}
        animate={
          reduced
            ? { opacity: 1, y: 0, scale: 1 }
            : {
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
              }
        }
        transition={{
          opacity: { duration: 1.35, ease: luxuryEase },
          scale: { duration: 1.35, ease: luxuryEase },
          y: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.35 },
        }}
      >
        <img
          className="hero-art__image"
          src={heroVisual}
          alt=""
          draggable={false}
        />
        <span className="hero-art__sheen" />
        <span className="hero-art__rim" />
      </motion.div>

      <div className="hero-art__particles">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            className={`hero-art__particle hero-art__particle--${i % 5}`}
            style={{
              left: `${10 + ((i * 19) % 80)}%`,
              top: `${8 + ((i * 27) % 84)}%`,
            }}
            animate={
              reduced
                ? undefined
                : {
                    opacity: [0.12, 0.8, 0.12],
                    y: [0, -14 - (i % 3) * 4, 0],
                    scale: [0.75, 1.15, 0.75],
                  }
            }
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
