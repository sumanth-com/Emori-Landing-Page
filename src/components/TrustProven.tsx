import { Handshake } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { luxuryEase, reveal } from '../lib/motion'
import arushiJain from '../assets/Arushi Jain.png'
import sharkPhoto from '../assets/Shark.png'
import { Team } from './Team'

const dealInvestors = [
  { name: 'Anupam Mittal', role: 'Founder & CEO of Shaadi.com' },
  { name: 'Ritesh Agarwal', role: 'Founder & CEO of OYO' },
  { name: 'Namita Thapar', role: 'Executive Director of Emcure Pharma' },
  { name: 'Amit Jain', role: 'Co-Founder & CEO of CarDekho' },
]

function SharkTankBadge() {
  return (
    <div className="trust-proven__badge" aria-hidden="true">
      <span className="trust-proven__badge-kicker">As Seen On</span>
      <span className="trust-proven__badge-brand">Shark Tank India</span>
      <span className="trust-proven__badge-season">Season 5</span>
    </div>
  )
}

function DealTerms() {
  return (
    <p className="trust-proven__deal-value">
      <Handshake className="trust-proven__deal-icon" aria-hidden="true" strokeWidth={1.75} />
      <span>₹3 crores for 6% equity</span>
    </p>
  )
}

export function TrustProven() {
  const reduced = useReducedMotion()
  const founderRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const founder = founderRef.current
    const photo = photoRef.current
    if (!founder || !photo) return

    const desktop = window.matchMedia('(min-width: 900px)')

    const syncPhotoHeight = () => {
      if (!desktop.matches) {
        photo.style.removeProperty('height')
        return
      }

      photo.style.height = `${founder.offsetHeight}px`
    }

    syncPhotoHeight()

    const observer = new ResizeObserver(syncPhotoHeight)
    observer.observe(founder)

    desktop.addEventListener('change', syncPhotoHeight)
    window.addEventListener('resize', syncPhotoHeight)

    return () => {
      observer.disconnect()
      desktop.removeEventListener('change', syncPhotoHeight)
      window.removeEventListener('resize', syncPhotoHeight)
      photo.style.removeProperty('height')
    }
  }, [])

  return (
    <section id="trust-proven" className="trust-proven trust-proven--with-team" aria-label="Investors and leadership team">
      <div className="trust-proven__rail">
        <motion.header
          className="trust-proven__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2 className="trust-proven__title" variants={reveal}>
            Visionary Investors. Dedicated Leadership.
          </motion.h2>
          <p className="trust-proven__lede">
            EMORI secured ₹3 crore on Shark Tank India from Anupam Mittal, Ritesh Agarwal, Namita
            Thapar and Amit Jain — and is led by a focused leadership team building the brand every day.
          </p>
        </motion.header>

        <motion.div
          className="trust-proven__showcase"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: luxuryEase }}
        >
          <figure ref={founderRef} className="trust-proven__founder">
            <div className="trust-proven__founder-top">
              <div className="trust-proven__founder-photo">
                <img
                  src={arushiJain}
                  alt="Arushi Jain, Founder and CEO of EMORI"
                  loading="lazy"
                />
              </div>
              <figcaption className="trust-proven__founder-copy">
                <h3 className="trust-proven__founder-name">Arushi Jain</h3>
                <p className="trust-proven__founder-role">Founder &amp; CEO</p>
              </figcaption>
            </div>

            <div className="trust-proven__deal-panel">
              <div className="trust-proven__deal-block">
                <p className="trust-proven__deal-title">Deal Secured</p>
                <DealTerms />
                <ul className="trust-proven__investors">
                  {dealInvestors.map((investor) => (
                    <li key={investor.name} className="trust-proven__investor">
                      <strong>{investor.name}</strong>
                      <span>{investor.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </figure>

          <figure ref={photoRef} className="trust-proven__photo">
            <img
              className="trust-proven__photo-img"
              src={sharkPhoto}
              alt="EMORI founders with Shark Tank India investors after securing funding"
              loading="lazy"
            />
            <SharkTankBadge />
          </figure>
        </motion.div>

        <Team inline />
      </div>
    </section>
  )
}
