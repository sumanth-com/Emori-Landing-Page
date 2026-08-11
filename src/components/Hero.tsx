import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import banner from '../assets/Banner.png'
import mobileHero from '../assets/MobileHero.png'
import { reveal, staggerSlow } from '../lib/motion'
import { scrollToSection, sectionPath } from '../lib/scrollToSection'

const stats = [
  { label: 'Investment', value: '2.3 Crores', detail: 'Total Investment' },
  { label: 'Minimum Guarantee*', value: '15% Per Annum', detail: 'On Eligible Investment' },
  { label: 'Franchise Fee', value: '₹10L + GST', detail: 'One Time' },
  { label: 'Outlets', value: '3 Stores', detail: 'Across NCR' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const goToSection = (event: MouseEvent<HTMLButtonElement>, sectionId: string) => {
    event.preventDefault()
    const path = sectionPath(sectionId)

    if (location.pathname === path) {
      scrollToSection(sectionId)
      return
    }

    navigate(path)
  }
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
          <div className="hero__banner hero__banner--desktop" style={{ backgroundImage: `url(${banner})` }} />
          <div className="hero__banner hero__banner--mobile" style={{ backgroundImage: `url(${mobileHero})` }} />
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
                  Franchise Investment Opportunity
                </div>

                <h1 className="hero__heading">
                  EMORI Lab-Grown Diamond Franchise in India
                </h1>
              </motion.div>

              <motion.p className="hero__lede hero__lede--full" variants={reveal}>
                Partner with India&apos;s Shark Tank-backed lab-grown diamond brand. Company-operated
                boutiques, protected territories, and 15% guaranteed returns per annum — a premium
                franchise opportunity for discerning investors.
              </motion.p>

              <motion.p className="hero__lede hero__lede--short" variants={reveal}>
                Shark Tank-backed brand · company-operated stores · 15% guaranteed returns.
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
                  className="btn btn--gold-gradient"
                  onClick={(event) => goToSection(event, 'investment')}
                >
                  <span className="hero__cta-full">Explore Franchise Opportunity</span>
                  <span className="hero__cta-short">Explore Franchise</span>
                </button>
                <button
                  type="button"
                  className="btn btn--ghost-light"
                  onClick={(event) => goToSection(event, 'contact')}
                >
                  <span className="hero__cta-full">Talk to Our Team</span>
                  <span className="hero__cta-short">Talk to Team</span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
