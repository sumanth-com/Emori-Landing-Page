import { motion, useReducedMotion } from 'framer-motion'
import { Footer } from './Footer'
import { luxuryEase, reveal } from '../lib/motion'
import { ApplicationForm } from './ApplicationForm'

const trustHighlights = [
  'Shark Tank Backed',
  '15% Guaranteed Return',
  'Company Operated',
  'Premium Brand',
]

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7.5l8 5.5 8-5.5M4 7.5h16v9H4v-9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.5 5.5h2l1.2 3-1.8 1.2a11 11 0 005.6 5.6L16.5 14l3 1.2v2a2 2 0 01-2 2C10.5 19.2 4.8 13.5 4.8 7.5a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FinalCta() {
  const reduced = useReducedMotion()

  return (
    <section id="invitation" className="finale finale--screen">
      <div className="finale__scene finale__scene--conversion">
        <div className="finale__layout">
          <motion.div
            className="finale__copy finale__copy--split"
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.35 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span className="finale__pill" variants={reveal}>
              Contact
            </motion.span>
            <motion.h2 className="finale__heading" variants={reveal}>
              Get in Touch With Our Team
            </motion.h2>
            <motion.span className="finale__rule" variants={reveal} aria-hidden="true" />
            <motion.p className="finale__lede" variants={reveal}>
              The next EMORI store could be in your city. Share your details and our
              partnerships team will guide you through the franchise opportunity.
            </motion.p>
            <motion.ul className="finale__trust" variants={reveal} aria-label="Trust highlights">
              {trustHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </motion.ul>
            <motion.div className="finale__contact-actions" variants={reveal}>
              <a href="mailto:partnerships@emori.com" className="finale__contact-primary">
                <MailIcon />
                Email Our Team
              </a>
              <div className="finale__contact-icons">
                <a href="mailto:partnerships@emori.com" className="finale__contact-icon" aria-label="Email">
                  <MailIcon />
                </a>
                <a href="tel:+911234567890" className="finale__contact-icon" aria-label="Phone">
                  <PhoneIcon />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="finale__form-shell"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: luxuryEase }}
          >
            <div className="finale__form-card">
              <ApplicationForm variant="inline" />
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </section>
  )
}
