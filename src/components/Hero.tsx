import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import banner from '../assets/Banner.png'
import { useApplicationModal } from '../context/ApplicationModalContext'
import { luxuryEase, reveal, staggerSlow } from '../lib/motion'

const highlights = [
  { label: 'Investment', value: '₹2.25 Crores' },
  { label: 'Franchise Fee', value: '₹10 Lakhs + GST' },
  { label: 'Model', value: 'FICO' },
  { label: 'Outlets', value: '3 Outlets' },
]

const cardReveal = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: luxuryEase,
    },
  },
}

const cardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
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

  const heroFade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 48])

  return (
    <section id="top" ref={ref} className="hero">
      <motion.div className="hero__stage" style={{ opacity: heroFade }}>
        <motion.div className="hero__atmosphere" style={{ y: bgY }} aria-hidden="true">
          <div
            className="hero__banner"
            style={{ backgroundImage: `url(${banner})` }}
          />
          <div className="hero__veil" />
        </motion.div>

        <div className="hero__layout">
          <motion.div className="hero__copy" style={{ y: textY }}>
            <motion.div
              variants={staggerSlow}
              initial="hidden"
              animate="visible"
              className="hero__copy-inner"
            >
              <motion.div className="hero__badge" variants={reveal}>
                <span className="hero__badge-mark" aria-hidden="true" />
                Lab Grown Diamond Jewellery
              </motion.div>

              <motion.h1 className="hero__heading" variants={reveal}>
                Own Brilliance.
                <br />
                Build With EMORI.
              </motion.h1>

              <motion.p className="hero__lede" variants={reveal}>
                Partner with EMORI — a Shark Tank–backed house of certified lab-grown diamonds.
                Company-operated boutiques, protected territories, and enduring returns, composed
                for discerning investors.
              </motion.p>

              <motion.ul
                className="hero__metrics"
                variants={cardStagger}
                initial="hidden"
                animate="visible"
              >
                {highlights.map((item) => (
                  <motion.li key={item.label} className="hero__metric" variants={cardReveal}>
                    <span className="hero__metric-label">{item.label}</span>
                    <span className="hero__metric-value">{item.value}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div className="hero__actions" variants={reveal}>
                <button
                  type="button"
                  className="btn btn--gold-gradient btn--compact"
                  onClick={openApplication}
                >
                  Private Kit
                </button>
                <a href="#opportunity" className="btn btn--ghost-light btn--compact">
                  Consultation
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
