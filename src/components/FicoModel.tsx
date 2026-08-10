import { motion, useReducedMotion } from 'framer-motion'
import { luxuryEase, reveal } from '../lib/motion'

const steps = [
  {
    num: '01',
    title: 'You Invest',
    text: 'Invest in an EMORI store and become a franchise partner.',
  },
  {
    num: '02',
    title: 'iFranchise Operates',
    text: 'Our team manages store operations, people, systems and execution on your behalf.',
  },
  {
    num: '03',
    title: 'You Earn',
    text: 'Receive agreed returns based on the commercial terms of the franchise model.',
  },
]

function StepArrow() {
  return (
    <span className="fico__step-arrow" aria-hidden="true">
      <span className="fico__step-arrow-track">
        <span className="fico__step-arrow-flow" />
      </span>
      <svg className="fico__step-arrow-head" viewBox="0 0 12 12" fill="none">
        <path d="M2 2l7 4-7 4V2z" fill="currentColor" />
      </svg>
    </span>
  )
}

const stepReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: luxuryEase } },
}

export function FicoModel() {
  const reduced = useReducedMotion()

  return (
    <section id="fico" className="fico">
      <div className="fico__scene">
        <motion.header
          className="fico__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div className="fico__pill" variants={reveal}>
            <span className="fico__pill-mark" aria-hidden="true" />
            The EMORI Model
          </motion.div>
          <motion.h2 className="fico__heading" variants={reveal}>
            You Invest. We Operate. EMORI Grows With You.
          </motion.h2>
          <p className="fico__subheading">
            <span className="fico__subheading-line">
              EMORI follows the FICO model — Franchise Invested, Company Operated.
            </span>
            <span className="fico__subheading-line">
              You invest. iFranchise manages operations, systems, people and growth of your store.
            </span>
          </p>
        </motion.header>

        <motion.div
          className="fico__steps"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {steps.map((step, index) => (
            <motion.div key={step.num} className="fico__step-group" variants={stepReveal}>
              <article className="fico__step">
                <span className="fico__step-num">{step.num}</span>
                <h3 className="fico__step-title">{step.title}</h3>
                <p className="fico__step-text">{step.text}</p>
              </article>
              {index < steps.length - 1 && <StepArrow />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
