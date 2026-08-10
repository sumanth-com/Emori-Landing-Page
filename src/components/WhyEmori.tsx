import { motion, useReducedMotion } from 'framer-motion'
import { luxuryEase, reveal } from '../lib/motion'

const cards = [
  {
    num: '01',
    title: 'Proven Market Recognition',
    text: (
      <>
        <span className="why-emori__card-text-line">
          Featured on Shark Tank India and backed with
        </span>
        <span className="why-emori__card-text-line">₹3 Cr in funding from four Sharks.</span>
      </>
    ),
  },
  {
    num: '02',
    title: '2,000+ Jewellery Designs',
    text: 'A broad in-house design portfolio spanning everyday jewellery, occasion wear and custom requirements.',
  },
  {
    num: '03',
    title: 'Lab-Grown Diamond Advantage',
    text: 'Certified lab-grown diamonds offer exceptional quality and value while aligning with the future of modern jewellery.',
  },
  {
    num: '04',
    title: 'Integrated Operations',
    text: 'Manufacturing, quality control and key business operations are managed in-house for greater consistency.',
  },
  {
    num: '05',
    title: 'Omnichannel Demand',
    text: 'Online discovery and offline retail work together to create stronger customer reach and store-level demand.',
  },
  {
    num: '06',
    title: 'Technology-Driven Growth',
    text: 'Digital marketing, CRM, ERP and data-led operations support a more efficient and scalable retail network.',
  },
]

const cardReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: luxuryEase },
  },
}

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

export function WhyEmori() {
  const reduced = useReducedMotion()

  return (
    <section id="why-emori" className="why-emori" aria-labelledby="why-emori-heading">
      <div className="why-emori__rail">
        <motion.header
          className="why-emori__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.45 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div className="why-emori__pill" variants={reveal}>
            <span className="why-emori__pill-mark" aria-hidden="true" />
            Why EMORI
          </motion.div>
          <motion.h2 id="why-emori-heading" className="why-emori__heading" variants={reveal}>
            Built for a Jewellery Business Ready to Scale
          </motion.h2>
          <p className="why-emori__subheading">
            <span className="why-emori__subheading-line">
              A lab-grown diamond jewellery franchise with in-house design, manufacturing and retail operations.
            </span>
            <span className="why-emori__subheading-line">
              EMORI helps franchise partners scale with stronger demand, smoother operations and long-term growth.
            </span>
          </p>
        </motion.header>

        <motion.div
          className="why-emori__grid"
          variants={reduced ? undefined : cardStagger}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.15 }}
        >
          {cards.map((card) => (
            <motion.article
              key={card.num}
              className="why-emori__card"
              variants={reduced ? undefined : cardReveal}
            >
              <span className="why-emori__card-num">{card.num}</span>
              <h3 className="why-emori__card-title">{card.title}</h3>
              <p className="why-emori__card-text">{card.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
