import { motion, useReducedMotion } from 'framer-motion'
import { luxuryEase, reveal } from '../lib/motion'
import womenRings from '../assets/Women Rings.jpg'
import earrings from '../assets/Earrings.jfif'
import mensRings from "../assets/Men's Rings.jfif"
import mangalsutras from '../assets/Mangalsutras.jfif'
import pendants from '../assets/Pendants.jfif'
import bracelets from '../assets/Bracelets.jfif'
import necklaces from '../assets/Necklaces.jfif'

const gallery = [
  {
    label: 'Women Rings',
    alt: 'Premium lab-grown diamond ring for women',
    src: womenRings,
  },
  {
    label: 'Earrings',
    alt: 'Woman wearing diamond stud earrings',
    src: earrings,
  },
  {
    label: "Men's Rings",
    alt: 'Men’s diamond band ring',
    src: mensRings,
  },
  {
    label: 'Mangalsutras',
    alt: 'Diamond mangalsutra necklace',
    src: mangalsutras,
  },
  {
    label: 'Pendants',
    alt: 'Heart-shaped diamond pendant',
    src: pendants,
  },
  {
    label: 'Bracelets',
    alt: 'Diamond bracelet on wrist',
    src: bracelets,
  },
  {
    label: 'Necklaces',
    alt: 'Diamond necklace',
    src: necklaces,
  },
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

function GalleryCard({ item }: { item: (typeof gallery)[number] }) {
  return (
    <figure className="trust-proven__card">
      <div className="trust-proven__tile">
        <img className="trust-proven__tile-img" src={item.src} alt={item.alt} loading="lazy" />
        <SharkTankBadge />
      </div>
      <figcaption className="trust-proven__tile-label">{item.label}</figcaption>
    </figure>
  )
}

export function TrustProven() {
  const reduced = useReducedMotion()
  const loopSlides = [...gallery, ...gallery, ...gallery]

  return (
    <section id="trust-proven" className="trust-proven" aria-label="Trust and credibility">
      <div className="trust-proven__rail">
        <motion.header
          className="trust-proven__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2 className="trust-proven__title" variants={reveal}>
            A Brand Backed by Visionary Investors.
          </motion.h2>
          <p className="trust-proven__lede">
            EMORI was featured on Shark Tank India and secured ₹3 crore in funding from four leading
            investors — Anupam Mittal, Ritesh Agarwal, Namita Thapar and Amit Jain.
          </p>
        </motion.header>

        <motion.div
          className="trust-proven__marquee"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: luxuryEase }}
          aria-label="EMORI jewellery categories"
        >
          <div
            className={`trust-proven__marquee-track${reduced ? ' trust-proven__marquee-track--static' : ''}`}
          >
            {loopSlides.map((item, index) => (
              <GalleryCard key={`${item.label}-${index}`} item={item} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
