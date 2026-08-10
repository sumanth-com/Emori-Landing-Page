import { motion, useReducedMotion } from 'framer-motion'
import { CountUp } from './ui/CountUp'
import { luxuryEase, reveal } from '../lib/motion'

const metrics = [
  { value: 8.1, decimals: 1, prefix: '₹', suffix: ' Cr', label: 'Offline Revenue' },
  { value: 5.8, decimals: 1, prefix: '₹', suffix: ' Cr', label: 'Online Revenue' },
  { value: 20, decimals: 0, suffix: '%', label: 'Store-Level EBITDA' },
  { value: 24, decimals: 0, suffix: ' Months', label: 'Store Payback' },
  { value: 14, decimals: 0, suffix: '%', label: '12-Month Repeat Rate' },
  { value: 15, decimals: 0, suffix: 'K+', label: 'Social Following' },
]

const panelReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: luxuryEase } },
}

export function Performance() {
  const reduced = useReducedMotion()

  return (
    <section id="performance" className="performance">
      <div className="performance__rail">
        <motion.header
          className="performance__copy"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.35 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div className="performance__pill" variants={reveal}>
            <span className="performance__pill-mark" aria-hidden="true" />
            Proven Performance
          </motion.div>
          <motion.h2 className="performance__heading" variants={reveal}>
            Performance That Speaks for Itself
          </motion.h2>
          <p className="performance__subheading">
            A snapshot of EMORI&apos;s reported retail and digital performance.
          </p>
        </motion.header>

        <motion.div
          className="performance__panels"
          variants={reduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
        >
          {metrics.map((metric) => (
            <motion.article
              key={metric.label}
              className="performance__panel"
              variants={reduced ? undefined : panelReveal}
            >
              <p className="performance__panel-value">
                <CountUp
                  value={metric.value}
                  decimals={metric.decimals}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </p>
              <p className="performance__panel-label">{metric.label}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
