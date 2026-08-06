import { motion, useReducedMotion } from 'framer-motion'
import { CountUp } from './ui/CountUp'
import { useMouseParallax } from '../hooks/useMouseParallax'
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
    className: 'performance__panel--a',
    depth: 1,
  },
  {
    id: '02',
    value: 20,
    decimals: 0,
    suffix: '%',
    label: 'Store-Level EBITDA',
    detail: 'Healthy store profitability.',
    className: 'performance__panel--b',
    depth: 0.65,
  },
  {
    id: '03',
    value: 24,
    decimals: 0,
    suffix: ' Months',
    label: 'Store Payback',
    detail: 'Designed for faster capital recovery.',
    className: 'performance__panel--c',
    depth: 0.85,
  },
  {
    id: '04',
    value: 14,
    decimals: 0,
    suffix: '%',
    label: 'Repeat Customers',
    detail: 'Growing customer loyalty.',
    className: 'performance__panel--d',
    depth: 0.5,
  },
  {
    id: '05',
    value: 5.8,
    decimals: 1,
    prefix: '₹',
    suffix: ' Cr+',
    label: 'Online Revenue',
    detail: 'Strong omnichannel demand.',
    className: 'performance__panel--e',
    depth: 0.75,
  },
  {
    id: '06',
    value: 15,
    decimals: 0,
    suffix: 'K+',
    label: 'Community',
    detail: 'Growing premium audience.',
    className: 'performance__panel--f',
    depth: 0.55,
  },
]

const panelReveal = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: luxuryEase },
  },
}

const panelStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

export function Performance() {
  const reduced = useReducedMotion()
  const mouse = useMouseParallax(6)

  return (
    <section id="performance" className="performance">
      <div className="performance__atmosphere" aria-hidden="true">
        <span className="performance__radial performance__radial--a" />
        <span className="performance__radial performance__radial--b" />
        <span className="performance__radial performance__radial--c" />
        <span className="performance__reflection performance__reflection--1" />
        <span className="performance__reflection performance__reflection--2" />
        <span className="performance__grain" />
      </div>

      <div className="performance__scene">
        <motion.div
          className="performance__copy"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.45 }}
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
            <em>Proven by Performance.</em>
          </motion.h2>
          <motion.p className="performance__lede" variants={reveal}>
            EMORI isn&apos;t an idea. It&apos;s an operating business with profitable stores, growing
            demand and measurable performance.
          </motion.p>

          <motion.div className="performance__hero-metrics" variants={reveal}>
            <div className="performance__hero-metric">
              <p className="performance__hero-value">
                ₹<CountUp value={8.1} decimals={1} /> Cr+
              </p>
              <p className="performance__hero-caption">Offline Revenue</p>
            </div>
            <div className="performance__hero-metric">
              <p className="performance__hero-value">
                <CountUp value={20} />%
              </p>
              <p className="performance__hero-caption">Store EBITDA</p>
            </div>
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
              className={`performance__panel ${metric.className}`}
              variants={reduced ? undefined : panelReveal}
              style={
                reduced
                  ? undefined
                  : {
                      x: mouse.x * metric.depth,
                      y: mouse.y * metric.depth,
                    }
              }
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
              <span className="performance__panel-glow" aria-hidden="true" />
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="performance__bridge" aria-hidden="true" />
    </section>
  )
}
