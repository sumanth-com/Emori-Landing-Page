import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { luxuryEase, reveal } from '../lib/motion'

type Partner = {
  id: string
  name: string
  location: string
  quote: string
  portrait: string
  thumb: string
}

const partners: Partner[] = [
  {
    id: 'ananya',
    name: 'Ananya Mehra',
    location: 'AIPL Joy Street, Gurgaon',
    quote:
      'EMORI gave us a house of jewellery that feels as considered as the brand itself — operational excellence with the quiet confidence of true luxury.',
    portrait:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=70',
  },
  {
    id: 'vikram',
    name: 'Vikram Shah',
    location: 'Wave One Mall, Noida',
    quote:
      'We invested for permanence. The FICO model lets us own the opportunity while EMORI builds the experience customers return for.',
    portrait:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=240&q=70',
  },
  {
    id: 'isha',
    name: 'Isha Kapoor',
    location: 'Dwarka Sector-11',
    quote:
      'From salon design to certified inventory, every detail compounds trust. Our boutique feels like a destination — not a storefront.',
    portrait:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=70',
  },
]

const INTERVAL_MS = 8000

export function Testimonials() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [progressKey, setProgressKey] = useState(0)
  const partner = partners[active]

  const goTo = useCallback((index: number) => {
    setActive(index)
    setProgressKey((k) => k + 1)
  }, [])

  useEffect(() => {
    if (reduced) return
    const timer = window.setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % partners.length
        return next
      })
      setProgressKey((k) => k + 1)
    }, INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [reduced, active])

  // Reset interval when user manually selects — handled by resetting active dependency
  // Actually the effect restarts when active changes which resets the 8s timer - good for click

  return (
    <section id="partners" className="partners">
      <div className="partners__atmosphere" aria-hidden="true">
        <span className="partners__radial partners__radial--a" />
        <span className="partners__radial partners__radial--b" />
        <span className="partners__diamond partners__diamond--1" />
        <span className="partners__diamond partners__diamond--2" />
        <span className="partners__grain" />
      </div>

      <div className="partners__scene">
        <motion.div
          className="partners__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p className="partners__label" variants={reveal}>
            Our Franchise Partners
          </motion.p>
          <motion.h2 className="partners__heading" variants={reveal}>
            Trusted by Visionaries,
            <br />
            <em>Built for Long-Term Success.</em>
          </motion.h2>
          <motion.p className="partners__lede" variants={reveal}>
            Hear from franchise partners who chose EMORI and became part of India&apos;s premium
            jewellery journey.
          </motion.p>
        </motion.div>

        <div className="partners__stage">
          <div className="partners__portrait-wrap">
            <AnimatePresence mode="sync">
              <motion.div
                key={partner.id}
                className="partners__portrait"
                style={{ backgroundImage: `url(${partner.portrait})` }}
                initial={
                  reduced
                    ? false
                    : { opacity: 0, scale: 1.03, filter: 'blur(8px)' }
                }
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={
                  reduced
                    ? undefined
                    : { opacity: 0, scale: 1.01, filter: 'blur(6px)' }
                }
                transition={{ duration: 1.05, ease: luxuryEase }}
              />
            </AnimatePresence>
            <div className="partners__portrait-veil" aria-hidden="true" />
          </div>

          <div className="partners__story">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={`${partner.id}-quote`}
                className="partners__quote"
                initial={
                  reduced
                    ? false
                    : { opacity: 0, y: 24, filter: 'blur(12px)' }
                }
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={
                  reduced
                    ? undefined
                    : { opacity: 0, y: -12, filter: 'blur(8px)' }
                }
                transition={{ duration: 0.95, ease: luxuryEase }}
              >
                {partner.quote}
              </motion.blockquote>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${partner.id}-meta`}
                className="partners__meta"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
              >
                <p className="partners__name">{partner.name}</p>
                <p className="partners__location">{partner.location}</p>
                <p className="partners__role">Franchise Partner</p>
              </motion.div>
            </AnimatePresence>

            <div className="partners__progress" aria-hidden="true">
              <motion.span
                key={progressKey}
                className="partners__progress-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: reduced ? 1 : 1 }}
                transition={
                  reduced
                    ? { duration: 0.3 }
                    : { duration: INTERVAL_MS / 1000, ease: 'linear' }
                }
              />
            </div>
          </div>
        </div>

        <div className="partners__thumbs" role="tablist" aria-label="Franchise partners">
          {partners.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`View testimonial from ${item.name}`}
              className={`partners__thumb ${index === active ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
            >
              <span
                className="partners__thumb-img"
                style={{ backgroundImage: `url(${item.thumb})` }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="partners__bridge" aria-hidden="true" />
    </section>
  )
}
