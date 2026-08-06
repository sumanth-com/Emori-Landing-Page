import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { useApplicationModal } from '../context/ApplicationModalContext'
import { luxuryEase, reveal } from '../lib/motion'

const faqs = [
  {
    id: 'experience',
    question: 'Do I need jewellery business experience?',
    answer:
      'No. EMORI’s FICO model is designed for investors who want ownership without operating complexity. Our team manages hiring, training, inventory and daily retail excellence.',
  },
  {
    id: 'investment',
    question: 'How much is the investment?',
    answer:
      'The total investment is approximately ₹2.25 Crore, covering franchise rights, lease deposit, luxury store setup and premium jewellery inventory — with a clear path to returns.',
  },
  {
    id: 'support',
    question: 'What support will EMORI provide?',
    answer:
      'From salon architecture and branding to marketing, clientelling systems and continuous merchandising counsel — you receive full operational partnership, not a handbook.',
  },
  {
    id: 'why-emori',
    question: 'Why choose EMORI?',
    answer:
      'Shark Tank backed, certified lab-grown jewellery, company-operated stores and protected territories — a premium house built for long-horizon brand equity.',
  },
  {
    id: 'lab-grown',
    question: 'Why invest in lab-grown diamonds?',
    answer:
      'Lab-grown diamonds combine luxury brilliance with ethical clarity and accessible premium pricing — one of India’s fastest-growing jewellery categories with enduring demand.',
  },
]

export function Faq() {
  const reduced = useReducedMotion()
  const { openApplication } = useApplicationModal()
  const [openId, setOpenId] = useState<string | null>(faqs[0].id)

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section id="faq" className="faq">
      <div className="faq__atmosphere" aria-hidden="true">
        <span className="faq__radial faq__radial--a" />
        <span className="faq__radial faq__radial--b" />
        <span className="faq__grain" />
      </div>

      <div className="faq__scene">
        <motion.div
          className="faq__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.45 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p className="faq__label" variants={reveal}>
            Frequently Asked Questions
          </motion.p>
          <motion.h2 className="faq__heading" variants={reveal}>
            Everything You Need Before Becoming
            <br />
            <em>An EMORI Partner.</em>
          </motion.h2>
        </motion.div>

        <motion.div
          className="faq__accordion"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {faqs.map((item) => {
            const isOpen = openId === item.id
            return (
              <motion.article
                key={item.id}
                className={`faq__card${isOpen ? ' is-open' : ''}`}
                variants={
                  reduced
                    ? undefined
                    : {
                        hidden: { opacity: 0, y: 18 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.65, ease: luxuryEase },
                        },
                      }
                }
              >
                <button
                  type="button"
                  className="faq__card-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  id={`faq-trigger-${item.id}`}
                  onClick={() => toggle(item.id)}
                >
                  <span className="faq__card-question">{item.question}</span>
                  <span className="faq__card-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      className="faq__card-panel"
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: luxuryEase }}
                    >
                      <p className="faq__card-answer">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </motion.div>

        <div className="faq__footer">
          <p className="faq__prompt">
            Still have questions? <em>Let&apos;s discuss your investment.</em>
          </p>
          <button
            type="button"
            className="btn btn--gold-gradient faq__cta"
            onClick={openApplication}
          >
            Book a Private Consultation
          </button>
        </div>
      </div>

      <div className="faq__bridge" aria-hidden="true" />
    </section>
  )
}
