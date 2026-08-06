import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { reveal, staggerSlow, luxuryEase } from '../lib/motion'
import { HeroFloatingArt } from './hero/HeroFloatingArt'
import { useApplicationModal } from '../context/ApplicationModalContext'

const badges = [
  'Company Operated',
  '15% Guaranteed Returns',
  'Shark Tank Backed',
  'Premium Jewellery Brand',
]

const badgeReveal = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.95,
      ease: luxuryEase,
    },
  },
}

const badgeStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.55,
    },
  },
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { openApplication } = useApplicationModal()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const heroFade = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const artY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const textScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.94])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const buttonsY = useTransform(scrollYProgress, [0, 1], [0, -36])
  const reflectionX = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const reflectionXAlt = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

  return (
    <section id="top" ref={ref} className="hero">
      <motion.div className="hero__stage" style={{ opacity: heroFade }}>
        {/* Cinematic luminous background */}
        <motion.div className="hero__atmosphere" style={{ y: bgY }} aria-hidden="true">
          <div className="hero__lumen" />
          <div className="hero__lumen hero__lumen--warm" />
          <div className="hero__lumen hero__lumen--cool" />
          <motion.div className="hero__reflection" style={{ x: reflectionX }} />
          <motion.div
            className="hero__reflection hero__reflection--secondary"
            style={{ x: reflectionXAlt }}
          />
          <div className="hero__blur-diamond hero__blur-diamond--1" />
          <div className="hero__blur-diamond hero__blur-diamond--2" />
          <div className="hero__blur-diamond hero__blur-diamond--3" />
          <div className="hero__grain" />
          <div className="hero__veil" />
        </motion.div>

        <div className="hero__layout">
          <motion.div
            className="hero__copy"
            style={{ y: textY, scale: textScale, transformOrigin: 'left center' }}
          >
            <motion.div
              variants={staggerSlow}
              initial="hidden"
              animate="visible"
              className="hero__copy-inner"
            >
              <motion.div className="hero__badge" variants={reveal}>
                <span className="hero__badge-mark" aria-hidden="true" />
                Lab Grown Diamond Franchise
              </motion.div>

              <motion.p className="hero__brand-whisper" variants={reveal}>
                EMORI
              </motion.p>

              <motion.h1 className="hero__heading" variants={reveal}>
                Own India&apos;s Next Premium
                <br />
                <em>Diamond Business.</em>
              </motion.h1>

              <motion.p className="hero__lede" variants={reveal}>
                A selectively awarded partnership into a company-operated luxury jewellery house —
                engineered for enduring brilliance, protected territories, and investor-grade
                returns.
              </motion.p>

              <motion.ul
                className="hero__proof"
                variants={badgeStagger}
                initial="hidden"
                animate="visible"
              >
                {badges.map((label) => (
                  <motion.li key={label} className="hero__proof-item" variants={badgeReveal}>
                    <span className="hero__proof-check" aria-hidden="true">
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
                    {label}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={reveal}>
                <motion.div className="hero__actions" style={{ y: buttonsY }}>
                  <button
                    type="button"
                    className="btn btn--gold-gradient"
                    onClick={openApplication}
                  >
                    Request Franchise Kit
                  </button>
                  <a href="#opportunity" className="btn btn--ghost-light">
                    Book Consultation
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="hero__art-slot">
            <HeroFloatingArt parallaxY={artY} />
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>Discover</span>
          <div className="hero__scroll-line" />
        </div>
      </motion.div>

      <div className="hero__bridge" aria-hidden="true" />
    </section>
  )
}
