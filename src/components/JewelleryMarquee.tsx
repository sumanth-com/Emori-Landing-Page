import { motion, useReducedMotion } from 'framer-motion'
import { luxuryEase, reveal } from '../lib/motion'
import womenRings from '../assets/Women Rings.webp'
import earrings from '../assets/Earrings.webp'
import mensRings from "../assets/Men's Rings.webp"
import mangalsutras from '../assets/Mangalsutras.webp'
import pendants from '../assets/Pendants.webp'
import bracelets from '../assets/Bracelets.webp'
import necklaces from '../assets/Necklaces.webp'

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

export function JewelleryMarquee() {
  const reduced = useReducedMotion()
  const loopSlides = [...gallery, ...gallery, ...gallery]

  return (
    <div className="jewellery-gallery">
      <motion.header
        className="jewellery-gallery__intro"
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p className="section-eyebrow" variants={reveal}>
          Collections
        </motion.p>
        <motion.h2
          id="jewellery-gallery-heading"
          className="jewellery-gallery__heading"
          variants={reveal}
        >
          Jewellery for Every Occasion
        </motion.h2>
        <motion.p className="jewellery-gallery__lede" variants={reveal}>
          Explore lab-grown diamond designs across rings, earrings, necklaces, pendants,
          bracelets, and mangalsutras — crafted for everyday elegance and celebration.
        </motion.p>
      </motion.header>

      <motion.div
        className="trust-proven__marquee team__marquee"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: luxuryEase }}
        aria-labelledby="jewellery-gallery-heading"
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
  )
}
