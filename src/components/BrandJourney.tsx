import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type WheelEvent } from 'react'
import { luxuryEase, reveal } from '../lib/motion'

type Milestone = {
  id: string
  year: string
  title: string
  image: string
  caption: string
}

const milestones: Milestone[] = [
  {
    id: 'founded',
    year: '2023',
    title: 'EMORI Founded',
    caption: 'A house of light begins.',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'online',
    year: '2023',
    title: 'Online First Brand',
    caption: 'Brilliance, delivered privately.',
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'store',
    year: '2024',
    title: 'First Premium Store',
    caption: 'The salon experience opens.',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'expand',
    year: '2024',
    title: 'Expanded to 3 Locations',
    caption: 'A growing retail presence.',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'shark',
    year: '2025',
    title: '₹3 Crore Shark Tank Investment',
    caption: 'National conviction, secured.',
    image:
      'https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'franchise',
    year: '2025',
    title: 'National Franchise Expansion',
    caption: 'Partnerships across India.',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80',
  },
]

export function BrandJourney() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const progress = milestones.length <= 1 ? 1 : active / (milestones.length - 1)
  const current = milestones[active]

  const goTo = useCallback(
    (index: number) => {
      setActive(Math.max(0, Math.min(milestones.length - 1, index)))
    },
    []
  )

  const wheelLock = useRef(false)

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -400) goTo(active + 1)
    else if (info.offset.x > 50 || info.velocity.x > 400) goTo(active - 1)
  }

  const onWheel = (e: WheelEvent) => {
    const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
    if (!horizontal && Math.abs(e.deltaY) < 40) return
    if (!horizontal) return
    if (wheelLock.current) return
    const delta = e.deltaX
    if (Math.abs(delta) < 12) return
    wheelLock.current = true
    if (delta > 0) goTo(active + 1)
    else goTo(active - 1)
    window.setTimeout(() => {
      wheelLock.current = false
    }, 520)
  }

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
      <div className="journey__atmosphere" aria-hidden="true">
        <span className="journey__radial journey__radial--a" />
        <span className="journey__radial journey__radial--b" />
        <span className="journey__diamond journey__diamond--1" />
        <span className="journey__diamond journey__diamond--2" />
        <div className="journey__particles">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              className={`journey__particle journey__particle--${i % 4}`}
              style={{
                left: `${8 + ((i * 19) % 84)}%`,
                top: `${12 + ((i * 27) % 70)}%`,
              }}
              animate={
                reduced
                  ? undefined
                  : {
                      opacity: [0.12, 0.7, 0.12],
                      y: [0, -14, 0],
                    }
              }
              transition={{
                duration: 5.5 + (i % 4),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
        <span className="journey__grain" />
      </div>

      <div className="journey__scene">
        <motion.div
          className="journey__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p className="journey__label" variants={reveal}>
            Our Journey
          </motion.p>
          <motion.h2 className="journey__heading" variants={reveal}>
            Building India&apos;s Next Luxury
            <br />
            <em>Diamond Brand</em>
          </motion.h2>
          <motion.p className="journey__lede" variants={reveal}>
            From a digital atelier to a nationally recognised house — each chapter composed with
            intention.
          </motion.p>
        </motion.div>

        <div className="journey__body">
          <div className="journey__timeline-wrap">
            <motion.div
              className="journey__timeline"
              drag={reduced ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={onDragEnd}
              onWheel={onWheel}
            >
              <div className="journey__track" aria-hidden="true">
                <div className="journey__track-base" />
                <motion.div
                  className="journey__track-progress"
                  animate={{ scaleX: progress }}
                  transition={{ duration: 0.9, ease: luxuryEase }}
                  style={{ transformOrigin: 'left center' }}
                />
              </div>

              <div className="journey__nodes" role="tablist" aria-label="Brand journey milestones">
                {milestones.map((item, index) => {
                  const state =
                    index === active ? 'is-active' : index < active ? 'is-past' : 'is-next'
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={index === active}
                      className={`journey__node ${state}`}
                      onClick={() => goTo(index)}
                      initial={reduced ? false : { opacity: 0, y: 40, filter: 'blur(8px)' }}
                      whileInView={
                        reduced
                          ? undefined
                          : { opacity: 1, y: 0, filter: 'blur(0px)' }
                      }
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.9,
                        ease: luxuryEase,
                        delay: index * 0.08,
                      }}
                      whileHover={
                        reduced
                          ? undefined
                          : { y: -4, transition: { duration: 0.65, ease: luxuryEase } }
                      }
                    >
                      <span className="journey__dot" aria-hidden="true" />
                      <span className="journey__card">
                        <span className="journey__year">{item.year}</span>
                        <span className="journey__title">{item.title}</span>
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            <div className="journey__controls">
              <button
                type="button"
                className="journey__nav"
                aria-label="Previous milestone"
                disabled={active === 0}
                onClick={() => goTo(active - 1)}
              >
                ←
              </button>
              <span className="journey__pager">
                {String(active + 1).padStart(2, '0')} — {String(milestones.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="journey__nav"
                aria-label="Next milestone"
                disabled={active === milestones.length - 1}
                onClick={() => goTo(active + 1)}
              >
                →
              </button>
            </div>
          </div>

          <div className="journey__visual">
            <div className="journey__visual-frame">
              <AnimatePresence mode="sync">
                <motion.div
                  key={current.id}
                  className="journey__visual-image"
                  style={{ backgroundImage: `url(${current.image})` }}
                  initial={
                    reduced
                      ? false
                      : { opacity: 0, scale: 1.04, filter: 'blur(10px)' }
                  }
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={
                    reduced
                      ? undefined
                      : { opacity: 0, scale: 0.98, filter: 'blur(8px)' }
                  }
                  transition={{ duration: 1.05, ease: luxuryEase }}
                />
              </AnimatePresence>
              <div className="journey__visual-veil" aria-hidden="true" />
              <motion.p
                key={`${current.id}-caption`}
                className="journey__visual-caption"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: luxuryEase, delay: 0.15 }}
              >
                {current.caption}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="journey__bridge" aria-hidden="true" />
    </section>
  )
}
