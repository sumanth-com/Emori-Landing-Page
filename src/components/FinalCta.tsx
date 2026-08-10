import { motion, useReducedMotion } from 'framer-motion'
import { Footer } from './Footer'
import { luxuryEase, reveal } from '../lib/motion'
import { ApplicationForm } from './ApplicationForm'
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, CONTACT_WEBSITE_URL } from '../data/contact'

const trustHighlights = [
  'Shark Tank Backed',
  '15% Guaranteed Return',
  'Company Operated',
  'Premium Brand',
]

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
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
              <a href={`mailto:${CONTACT_EMAIL}`} className="finale__contact-primary">
                <MailIcon />
                Email Our Team
              </a>
              <a
                href={CONTACT_WEBSITE_URL}
                className="finale__contact-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit www.ifranchise.in"
                title="www.ifranchise.in"
              >
                <GlobeIcon />
              </a>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="finale__contact-icon"
                aria-label={`Call ${CONTACT_PHONE_DISPLAY}`}
                title={CONTACT_PHONE_DISPLAY}
              >
                <PhoneIcon />
              </a>
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
