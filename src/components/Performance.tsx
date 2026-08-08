import { motion, useReducedMotion } from 'framer-motion'
import { CountUp } from './ui/CountUp'
import { luxuryEase, reveal } from '../lib/motion'

const metrics = [
  {
    id: '01',
    value: 8.1,
    decimals: 1,
    prefix: '₹',
    suffix: ' Cr+',
    label: 'Offline Revenue',
    detail: 'Strong performance from physical retail stores.',
  },
  {
    id: '02',
    value: 20,
    decimals: 0,
    suffix: '%',
    label: 'Store-Level EBITDA',
    detail: 'Healthy store profitability.',
  },
  {
    id: '03',
    value: 24,
    decimals: 0,
    suffix: ' Months',
    label: 'Store Payback',
    detail: 'Designed for faster capital recovery.',
  },
  {
    id: '04',
    value: 14,
    decimals: 0,
    suffix: '%',
    label: 'Repeat Customers',
    detail: 'Growing customer loyalty.',
  },
  {
    id: '05',
    value: 5.8,
    decimals: 1,
    prefix: '₹',
    suffix: ' Cr+',
    label: 'Online Revenue',
    detail: 'Strong omnichannel demand.',
  },
  {
    id: '06',
    value: 15,
    decimals: 0,
    suffix: 'K+',
    label: 'Community',
    detail: 'Growing premium audience.',
  },
]

const panelReveal = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: luxuryEase },
  },
}

const panelStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export function Performance() {
  const reduced = useReducedMotion()

  return (
    <section id="performance" className="performance">
      <div className="performance__rail">
        <motion.div
          className="performance__copy"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p className="performance__label" variants={reveal}>
            Proven Performance
          </motion.p>
          <motion.h2 className="performance__heading" variants={reveal}>
            Built for Luxury.
            <br />
            Proven by Performance.
          </motion.h2>
          <motion.p className="performance__lede" variants={reveal}>
            EMORI isn&apos;t an idea. It&apos;s an operating business with profitable stores, growing
            demand and measurable performance.
          </motion.p>

          <motion.div className="performance__hero-metrics" variants={reveal}>
            <p className="performance__hero-value">
              ₹<CountUp value={8.1} decimals={1} /> Cr+
            </p>
            <p className="performance__hero-value">
              <CountUp value={20} />%
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="performance__panels"
          variants={reduced ? undefined : panelStagger}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
        >
          {metrics.map((metric) => (
            <motion.article
              key={metric.id}
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
              <p className="performance__panel-detail">{metric.detail}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
