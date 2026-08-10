import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { luxuryEase, reveal } from '../lib/motion'

const faqs = [
  {
    id: '01',
    question: 'Do I need prior jewelry business experience?',
    answer:
      'No. EMORI operates on a FICO (Franchise Invested, Company Operated) model. So you just have to invest in the business, while our experienced team manages the day-to-day operations.',
  },
  {
    id: '02',
    question: 'How much do I need to invest?',
    answer:
      'The total investment is ₹2.25 crore, covering the franchise fee, lease deposit, store setup, and inventory required to open your store.',
  },
  {
    id: '03',
    question: 'What support will I receive after investing?',
    answer:
      'EMORI supports you with store operations, marketing, brand guidelines, inventory management, and everything needed to run your franchise smoothly.',
  },
  {
    id: '04',
    question: 'Why choose EMORI over other jewelry franchise opportunities?',
    answer:
      'EMORI follows an omnichannel strategy that combines online and offline retail. This helps drive customer demand and creates more opportunities for your store to grow.',
  },
  {
    id: '05',
    question: 'Why is now the right time to invest in lab-grown diamonds?',
    answer:
      'Consumer awareness around sustainability is changing how people shop for jewelry. This shift in consumer demand is creating new opportunities in the lab-grown diamond market.',
  },
]

export function Faq() {
  const reduced = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(faqs[0].id)

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section id="faq" className="faq">
      <div className="faq__scene">
        <motion.header
          className="faq__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.45 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p className="faq__label" variants={reveal}>
            FAQs
          </motion.p>
          <motion.h2 className="faq__heading" variants={reveal}>
            Your Questions, Answered
          </motion.h2>
        </motion.header>

        <motion.div
          className="faq__accordion"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
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
                  <span className="faq__card-num">{item.id}</span>
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
      </div>
    </section>
  )
}
