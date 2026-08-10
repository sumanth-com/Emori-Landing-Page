import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import noidaBack from '../assets/NOIDA - Back facade.jpeg'
import noida1 from '../assets/NOIDA 1.jpeg'
import noidaFrontFacade from '../assets/NOIDA Front Facade.jpeg'
import noida2 from '../assets/Noida 2.jpeg'
import noida3 from '../assets/Noida 3.jpeg'
import noida4 from '../assets/Noida 4.jpeg'
import noida5 from '../assets/Noida 5.jpeg'
import noidaFront from '../assets/Noida front.jpeg'
import { luxuryEase, reveal } from '../lib/motion'
import { scrollToSection } from '../lib/scrollToSection'

const dwarkaModules = import.meta.glob<string>('../assets/dwarka (*).jpeg', {
  eager: true,
  import: 'default',
})

const ggnModules = import.meta.glob<string>('../assets/GGN*.jpeg', {
  eager: true,
  import: 'default',
})

function sortDwarkaImages(paths: Record<string, string>) {
  return Object.entries(paths)
    .sort(([a], [b]) => {
      const num = (path: string) => Number(path.match(/\((\d+)\)/)?.[1] ?? 0)
      return num(a) - num(b)
    })
    .map(([, url]) => url)
}

function sortGgnImages(paths: Record<string, string>) {
  return Object.entries(paths)
    .sort(([a], [b]) => {
      const num = (path: string) => {
        const match = path.match(/GGN (\d+)/)
        return match ? Number(match[1]) : 999
      }
      const diff = num(a) - num(b)
      if (diff !== 0) return diff
      return a.localeCompare(b)
    })
    .map(([, url]) => url)
}

const noidaImages = [
  noidaBack,
  noida1,
  noidaFrontFacade,
  noida2,
  noida3,
  noida4,
  noida5,
  noidaFront,
]

const locations = [
  {
    id: 'gurugram',
    filterLabel: 'Gurugram',
    name: 'AIPL Joystreet',
    city: 'Gurugram',
    images: sortGgnImages(ggnModules),
  },
  {
    id: 'noida',
    filterLabel: 'Noida',
    name: 'Wave One Mall',
    city: 'Noida',
    images: noidaImages,
  },
  {
    id: 'dwarka',
    filterLabel: 'Dwarka',
    name: 'Dwarka Sector 11',
    city: 'Dwarka',
    images: sortDwarkaImages(dwarkaModules),
  },
] as const

const AUTO_PLAY_MS = 2800

const storeSpecs = [{ label: 'Store Size', value: '500–1,000 square feet' }]

function slideOffset(index: number, active: number, total: number) {
  let diff = index - active
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  return diff
}

function CarouselArrow({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {direction === 'prev' ? (
        <path
          d="M15 6l-6 6 6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

export function StoreExperience() {
  const reduced = useReducedMotion()
  const [locationIndex, setLocationIndex] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)

  const current = locations[locationIndex]

  useEffect(() => {
    setSlideIndex(0)
  }, [locationIndex])

  useEffect(() => {
    if (reduced) return

    const timer = window.setInterval(() => {
      setSlideIndex((index) => (index + 1) % current.images.length)
    }, AUTO_PLAY_MS)

    return () => window.clearInterval(timer)
  }, [locationIndex, current.images.length, reduced])

  const goPrev = useCallback(() => {
    setSlideIndex((index) => (index - 1 + current.images.length) % current.images.length)
  }, [current.images.length])

  const goNext = useCallback(() => {
    setSlideIndex((index) => (index + 1) % current.images.length)
  }, [current.images.length])

  return (
    <section id="store" className="store">
      <div className="store__scene">
        <motion.header
          className="store__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p className="section-eyebrow" variants={reveal}>
            Our Stores
          </motion.p>
          <motion.h2 className="store__heading" variants={reveal}>
            A Growing Retail Presence Across NCR
          </motion.h2>
          <p className="store__subheading">
            Explore EMORI&apos;s existing stores and the retail experience already established
            across key NCR locations.
          </p>
        </motion.header>

        <motion.div
          className="store__filter-bar"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: luxuryEase }}
        >
          <div className="store__filters" role="tablist" aria-label="Store locations">
            {locations.map((location, index) => {
              const isActive = locationIndex === index
              return (
                <div
                  key={location.id}
                  className={`store__filter-group${isActive ? ' is-active' : ''}`}
                >
                  <button
                    type="button"
                    role="tab"
                    className={`store__filter${isActive ? ' is-active is-combined' : ''}`}
                    aria-selected={isActive}
                    onClick={() => setLocationIndex(index)}
                  >
                    {isActive ? (
                      <>
                        <span className="store__filter-part store__filter-part--city">
                          {location.filterLabel}
                        </span>
                        <span className="store__filter-sep store__filter-sep--arrow" aria-hidden="true">
                          {'\u00b7-->'}
                        </span>
                        <span className="store__filter-part store__filter-part--store">
                          {location.name}
                        </span>
                        <span className="store__filter-sep" aria-hidden="true">
                          ·
                        </span>
                        <span
                          className="store__filter-part store__filter-part--photo"
                          aria-live="polite"
                        >
                          Photo {slideIndex + 1} of {location.images.length}
                        </span>
                      </>
                    ) : (
                      location.filterLabel
                    )}
                  </button>
                </div>
              )
            })}

            <span className="store__filter-bar-divider" aria-hidden="true" />

            {storeSpecs.map((spec) => (
              <span key={spec.label} className="store__filter-spec">
                <span className="store__filter-spec-kicker">{spec.label}</span>
                <span className="store__filter-spec-text">{spec.value}</span>
              </span>
            ))}
          </div>
        </motion.div>

        <div className="store__showcase-wrap">
        <motion.div
          key={current.id}
          className="store__showcase"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: luxuryEase }}
        >
          <button
            type="button"
            className="store__showcase-nav store__showcase-nav--prev"
            onClick={goPrev}
            aria-label="Previous store photo"
          >
            <CarouselArrow direction="prev" />
          </button>

          <div className="store__showcase-stage" aria-live="polite">
            <ul className="store__showcase-track">
              {current.images.map((image, index) => {
                const offset = slideOffset(index, slideIndex, current.images.length)
                const distance = Math.abs(offset)
                const isActive = offset === 0
                const isVisible = distance <= 2

                return (
                  <motion.li
                    key={`${current.id}-${index}`}
                    className={`store__showcase-slide${isActive ? ' is-active' : ''}`}
                    aria-hidden={!isActive}
                    initial={false}
                    animate={
                      reduced
                        ? {
                            x: 0,
                            scale: isActive ? 1 : 0,
                            opacity: isActive ? 1 : 0,
                            filter: 'blur(0px)',
                            zIndex: isActive ? 5 : 1,
                          }
                        : {
                            x: offset * 210,
                            scale: 1 - Math.min(distance, 2) * 0.11,
                            opacity: isVisible ? (isActive ? 1 : 0.72 - distance * 0.18) : 0,
                            filter: isActive ? 'blur(0px)' : `blur(${Math.min(distance, 2) * 2.5}px)`,
                            zIndex: 5 - distance,
                          }
                    }
                    transition={{ duration: 0.85, ease: luxuryEase }}
                  >
                    <figure className="store__showcase-card">
                      <img
                        src={image}
                        alt={
                          isActive
                            ? `EMORI ${current.filterLabel} store — ${current.name}`
                            : ''
                        }
                        loading={distance <= 1 ? 'eager' : 'lazy'}
                        decoding="async"
                        draggable={false}
                      />
                    </figure>
                  </motion.li>
                )
              })}
            </ul>
          </div>

          <button
            type="button"
            className="store__showcase-nav store__showcase-nav--next"
            onClick={goNext}
            aria-label="Next store photo"
          >
            <CarouselArrow direction="next" />
          </button>
        </motion.div>
        </div>

        <motion.div
          className="store__footer-cta"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: luxuryEase }}
        >
          <p className="store__footer-text">The next EMORI store could be in your city.</p>
          <span className="store__footer-arrow" aria-hidden="true">
            →
          </span>
          <button
            type="button"
            className="store__footer-link"
            onClick={() => scrollToSection('contact')}
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  )
}
