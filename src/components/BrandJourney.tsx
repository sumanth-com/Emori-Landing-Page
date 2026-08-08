import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { luxuryEase, reveal } from '../lib/motion'

type Milestone = {
  id: string
  year: string
  title: string
}

const milestones: Milestone[] = [
  { id: 'founded', year: '2023', title: 'EMORI Founded' },
  { id: 'online', year: '2023', title: 'Online First Brand' },
  { id: 'store', year: '2024', title: 'First Premium Store' },
  { id: 'expand', year: '2024', title: 'Expanded to 3 Locations' },
  { id: 'shark', year: '2025', title: '3 Crore Shark Tank Investment' },
]

export function BrandJourney() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const railRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback((index: number) => {
    setActive(Math.max(0, Math.min(milestones.length - 1, index)))
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    if (rail.scrollWidth <= rail.clientWidth + 8) return
    const card = rail.querySelector<HTMLElement>(`[data-index="${active}"]`)
    if (!card) return
    card.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [active, reduced])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(active + 1)
      if (e.key === 'ArrowLeft') goTo(active - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, goTo])

  return (
    <section id="journey" className="journey">
      <div className="journey__bg" aria-hidden="true" />
      <div className="journey__veil" aria-hidden="true" />
      <div className="journey__glow" aria-hidden="true" />

      <div className="journey__scene">
        <motion.header
          className="journey__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p className="journey__label" variants={reveal}>
            Our Journey
          </motion.p>
          <motion.h2 className="journey__heading" variants={reveal}>
            Building India&apos;s next
            <br />
            <em>Diamond Brand</em>
          </motion.h2>
        </motion.header>

        <div
          className="journey__rail"
          ref={railRef}
          role="tablist"
          aria-label="Brand journey milestones"
        >
          {milestones.map((item, index) => {
            const isActive = index === active
            return (
              <motion.button
                key={item.id}
                type="button"
                role="tab"
                data-index={index}
                aria-selected={isActive}
                className={`journey__card${isActive ? ' is-active' : ''}`}
                onClick={() => goTo(index)}
                initial={reduced ? false : { opacity: 0, y: 40 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.85,
                  ease: luxuryEase,
                  delay: index * 0.07,
                }}
                whileHover={
                  reduced
                    ? undefined
                    : { y: -8, transition: { duration: 0.45, ease: luxuryEase } }
                }
              >
                <span className="journey__year">{item.year}</span>
                <span className="journey__title">{item.title}</span>
              </motion.button>
            )
          })}
        </div>

        <div className="journey__controls">
          <button
            type="button"
            className="journey__nav"
            aria-label="Previous milestone"
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="journey__nav"
            aria-label="Next milestone"
            disabled={active === milestones.length - 1}
            onClick={() => goTo(active + 1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
