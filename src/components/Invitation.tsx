import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'
import { AmbientOrbs } from './ui/AmbientOrbs'
import { DiamondSparkle } from './ui/DiamondSparkle'
import { revealSoft } from '../lib/motion'

export function Invitation() {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="invitation" className="chapter chapter--charcoal invitation">
      <AmbientOrbs variant="dark" />
      <DiamondSparkle className="invitation__sparkles" />

      <div className="chapter__rail invitation__rail">
        <RevealGroup className="invitation__intro">
          <RevealItem variants={revealSoft}>
            <p className="chapter__label chapter__label--gold">Private Inquiry</p>
            <h2 className="chapter__title chapter__title--light">
              Begin where
              <br />
              brilliance begins.
            </h2>
          </RevealItem>
          <RevealItem variants={revealSoft}>
            <p className="chapter__body chapter__body--muted invitation__lede">
              Share a brief introduction. Our partnerships office responds personally —
              never by automated sequence.
            </p>
          </RevealItem>
        </RevealGroup>

        <Reveal className="invitation__form-wrap">
          {submitted ? (
            <motion.div
              className="invitation__thanks"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="invitation__thanks-title">Received with care.</p>
              <p className="invitation__thanks-body">
                A member of the EMORI partnerships office will be in touch shortly.
              </p>
            </motion.div>
          ) : (
            <form className="inquiry" onSubmit={onSubmit}>
              <div className="inquiry__row">
                <label className="inquiry__field">
                  <span>Full name</span>
                  <input name="name" type="text" required autoComplete="name" />
                </label>
                <label className="inquiry__field">
                  <span>Email</span>
                  <input name="email" type="email" required autoComplete="email" />
                </label>
              </div>
              <div className="inquiry__row">
                <label className="inquiry__field">
                  <span>City of interest</span>
                  <input name="city" type="text" required autoComplete="address-level2" />
                </label>
                <label className="inquiry__field">
                  <span>Investment range</span>
                  <select name="investment" required defaultValue="">
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="25-50">₹25L – ₹50L</option>
                    <option value="50-100">₹50L – ₹1Cr</option>
                    <option value="100+">₹1Cr+</option>
                  </select>
                </label>
              </div>
              <label className="inquiry__field inquiry__field--full">
                <span>A note about your interest</span>
                <textarea name="note" rows={4} required />
              </label>
              <button type="submit" className="btn btn--gold inquiry__submit">
                Submit Private Inquiry
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
