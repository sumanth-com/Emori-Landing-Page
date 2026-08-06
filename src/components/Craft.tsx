import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'
import { Parallax } from './ui/Parallax'
import { DiamondSparkle } from './ui/DiamondSparkle'

export function Craft() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const glow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.2, 0.55, 0.25])

  return (
    <section id="craft" ref={ref} className="chapter chapter--charcoal craft">
      <motion.div className="craft__ambient" style={{ opacity: glow }} aria-hidden="true" />
      <DiamondSparkle className="craft__sparkles" />

      <div className="chapter__rail craft__rail">
        <RevealGroup>
          <RevealItem>
            <p className="chapter__label chapter__label--gold">The Craft</p>
            <h2 className="chapter__title chapter__title--light">
              Precision as
              <br />
              poetry.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="chapter__body chapter__body--muted craft__lede">
              Every stone is grown under controlled brilliance. Every setting is composed with
              the patience of haute jewellery — for partners who sell more than adornment.
            </p>
          </RevealItem>
        </RevealGroup>

        <div className="craft__gallery">
          <Parallax className="craft__frame craft__frame--tall" speed={0.18}>
            <div className="craft__image craft__image--a" />
          </Parallax>
          <div className="craft__aside">
            <Parallax className="craft__frame" speed={0.12}>
              <div className="craft__image craft__image--b" />
            </Parallax>
            <Reveal>
              <blockquote className="craft__quote">
                “Luxury is not louder. It is clearer.”
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="craft__bridge" aria-hidden="true" />
    </section>
  )
}
