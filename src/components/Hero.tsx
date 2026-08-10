import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import banner from '../assets/Banner.png'
import { useApplicationModal } from '../context/ApplicationModalContext'
import { reveal, staggerSlow } from '../lib/motion'

const stats = [
  { label: 'Investment', value: '₹2.25 Cr', detail: 'Total Investment' },
  { label: 'Minimum Guarantee*', value: '15% p.a.', detail: 'On Eligible Investment' },
  { label: 'Franchise Fee', value: '₹10L + GST', detail: 'One Time' },
  { label: 'Outlets', value: '3 Stores', detail: 'Across NCR' },
]

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
          <div className="hero__banner" style={{ backgroundImage: `url(${banner})` }} />
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
              <motion.div className="hero__copy-head" variants={reveal}>
                <div className="hero__badge">
                  <span className="hero__badge-mark" aria-hidden="true" />
                  Lab Grown Diamond Jewellery
                </div>

                <h1 className="hero__heading">
                  Own Brilliance.
                  <br />
                  Build With EMORI.
                </h1>
              </motion.div>

              <motion.p className="hero__lede" variants={reveal}>
                Partner with EMORI — a Shark Tank-backed house of certified lab-grown diamonds.
                Company-operated boutiques, protected territories, and enduring returns, composed
                for discerning investors.
              </motion.p>

              <motion.ul className="hero__stats" variants={reveal}>
                {stats.map((item) => (
                  <li key={item.label} className="hero__stat">
                    <span className="hero__stat-label">{item.label}</span>
                    <span className="hero__stat-value">{item.value}</span>
                    <span className="hero__stat-detail">{item.detail}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div className="hero__actions" variants={reveal}>
                <button
                  type="button"
                  className="btn btn--gold-gradient btn--compact"
                  onClick={() => document.getElementById('investment')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Franchise Opportunity
                </button>
                <button
                  type="button"
                  className="btn btn--ghost-light btn--compact"
                  onClick={openApplication}
                >
                  Talk to Our Team
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <a href="#trust-proven" className="hero__scroll-hint" aria-label="Scroll to explore">
          <span className="hero__scroll-mouse" aria-hidden="true">
            <span className="hero__scroll-wheel" />
          </span>
          <span className="hero__scroll-label">Scroll to Explore</span>
        </a>
      </motion.div>
    </section>
  )
}
