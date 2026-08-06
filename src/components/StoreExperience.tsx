import { motion, useReducedMotion } from 'framer-motion'
import { useApplicationModal } from '../context/ApplicationModalContext'
import { reveal } from '../lib/motion'

type Slide = {
  id: string
  image: string
  label: string
  detail: string
}

const slides: Slide[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
    label: 'Diamond Rings',
    detail: 'Lab-grown brilliance',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    label: 'Statement Necklaces',
    detail: 'Boutique vitrine',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=900&q=80',
    label: 'Gold Craft',
    detail: '14K & 18K finishes',
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80',
    label: 'Bridal Edit',
    detail: 'Engagement collection',
  },
  {
    id: '5',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
    label: 'Salon Interior',
    detail: 'AIPL Joy Street',
  },
  {
    id: '6',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    label: 'Client Experience',
    detail: 'Private consultation',
  },
  {
    id: '7',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
    label: 'Everyday Luxury',
    detail: 'Wearable elegance',
  },
  {
    id: '8',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    label: 'Flagship Space',
    detail: 'Premium retail design',
  },
]

const loopSlides = [...slides, ...slides]

export function StoreExperience() {
  const reduced = useReducedMotion()
  const { openApplication } = useApplicationModal()

  return (
    <section id="store" className="store">
      <div className="store__atmosphere" aria-hidden="true">
        <span className="store__radial store__radial--a" />
        <span className="store__radial store__radial--b" />
        <span className="store__grain" />
      </div>

      <div className="store__scene">
        <motion.div
          className="store__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p className="store__label" variants={reveal}>
            Store Experience
          </motion.p>
          <motion.h2 className="store__heading" variants={reveal}>
            Step Inside
            <br />
            <em>The EMORI Experience.</em>
          </motion.h2>
          <motion.p className="store__lede" variants={reveal}>
            Every EMORI boutique is designed to deliver a premium jewellery experience that
            reflects elegance, trust and modern luxury.
          </motion.p>
        </motion.div>

        <div className="store__marquee" aria-label="EMORI store and jewellery gallery">
          <div
            className={`store__marquee-track${reduced ? ' store__marquee-track--static' : ''}`}
          >
            {loopSlides.map((slide, index) => (
              <article
                key={`${slide.id}-${index}`}
                className="store__card"
                aria-hidden={index >= slides.length}
              >
                <div
                  className="store__card-media"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className="store__card-meta">
                  <p className="store__card-label">{slide.label}</p>
                  <p className="store__card-detail">{slide.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="store__footer">
          <p className="store__shimmer">
            The next flagship EMORI boutique could be in your city.
          </p>
          <button
            type="button"
            className="btn btn--gold-gradient store__cta"
            onClick={openApplication}
          >
            Request Franchise Details
          </button>
        </div>
      </div>

      <div className="store__bridge" aria-hidden="true" />
    </section>
  )
}
