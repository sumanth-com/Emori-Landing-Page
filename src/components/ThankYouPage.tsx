import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { luxuryEase } from '../lib/motion'

function CheckIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <motion.path
        d="M14 24.5l7 7 13-14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, ease: luxuryEase, delay: 0.35 }}
      />
    </svg>
  )
}

export function ThankYouPage() {
  const reduced = useReducedMotion()

  return (
    <div className="thank-you">
      <motion.div
        className="thank-you__card"
        initial={reduced ? false : { opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: luxuryEase }}
      >
        <motion.span
          className="thank-you__ring"
          initial={reduced ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: luxuryEase, delay: 0.1 }}
        >
          <CheckIcon />
        </motion.span>

        <motion.p
          className="thank-you__eyebrow"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: luxuryEase, delay: 0.2 }}
        >
          Application Received
        </motion.p>

        <motion.h1
          className="thank-you__heading"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: luxuryEase, delay: 0.28 }}
        >
          Thank You for Reaching Out to EMORI
        </motion.h1>

        <motion.p
          className="thank-you__body"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: luxuryEase, delay: 0.36 }}
        >
          Our partnerships team has received your details and will connect with you shortly
          to discuss the franchise opportunity.
        </motion.p>

        <motion.div
          className="thank-you__actions"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: luxuryEase, delay: 0.48 }}
        >
          <Link to="/" className="thank-you__cta">
            Back to EMORI
          </Link>
          <a href="mailto:partnerships@emori.com" className="thank-you__link">
            partnerships@emori.com
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}
