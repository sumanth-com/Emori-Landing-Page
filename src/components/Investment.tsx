import { motion, useReducedMotion } from 'framer-motion'
import { reveal } from '../lib/motion'

const breakdown = [
  { component: 'Inventory Security Deposit', amount: '₹1.50 Cr', icon: 'gem' },
  { component: 'Lease & Registration Deposit', amount: '₹15–20 Lakhs*', icon: 'location' },
  { component: 'Store Setup / CapEx', amount: '₹50 Lakhs', icon: 'store' },
  { component: 'Franchise Fee', amount: '₹10 Lakhs + GST*', icon: 'fee' },
]

const revenueSlabs = [
  { sales: 'Up to ₹30 Lakhs', share: '12%' },
  { sales: '₹30–50 Lakhs', share: '10%' },
  { sales: '₹50 Lakhs+', share: '8%' },
]

function RowIcon({ type }: { type: string }) {
  return (
    <span className={`invest__row-icon invest__row-icon--${type}`} aria-hidden="true">
      {type === 'gem' && (
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M8 2 L13 6 L8 14 L3 6 Z" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      )}
      {type === 'location' && (
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M8 2.5c2 0 3.5 1.6 3.5 3.5 0 2.6-3.5 7-3.5 7S4.5 8.6 4.5 6c0-1.9 1.5-3.5 3.5-3.5z" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="8" cy="6" r="1.2" stroke="currentColor" strokeWidth="1" />
        </svg>
      )}
      {type === 'store' && (
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M3 6.5h10v7H3zM5 6.5V4.5h6v2" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      )}
      {type === 'fee' && (
        <svg viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.1" />
          <path d="M8 5.5v5M6.5 7h2.5c.8 0 1.5.5 1.5 1.2s-.7 1.2-1.5 1.2H6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      )}
    </span>
  )
}

function HighlightIcon({ type }: { type: string }) {
  return (
    <span className={`invest__highlight-icon invest__highlight-icon--${type}`} aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none">
        {type === 'shield' && (
          <path d="M10 3.5l5.5 2v4.8c0 3.2-2.4 5.5-5.5 6.7-3.1-1.2-5.5-3.5-5.5-6.7V5.5L10 3.5z" stroke="currentColor" strokeWidth="1.2" />
        )}
      </svg>
    </span>
  )
}

export function Investment() {
  const reduced = useReducedMotion()

  return (
    <section id="investment" className="invest">
      <div className="invest__scene">
        <motion.header
          className="invest__intro"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div className="invest__pill" variants={reveal}>
            <span className="invest__pill-mark" aria-hidden="true" />
            INVESTMENT &amp; RETURNS
          </motion.div>
          <motion.h2 className="invest__heading" variants={reveal}>
            An Investment Built Around Inventory, Retail &amp; Brand
          </motion.h2>
          <p className="invest__subheading">
            A clear view of the investment structure and potential returns under the EMORI
            franchise model.
          </p>
        </motion.header>

        <motion.div
          className="invest__layout"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div className="invest__breakdown invest__panel" variants={reveal}>
            <h3 className="invest__panel-title">Investment Breakdown</h3>
            <p className="invest__panel-hero">₹2.25 Crores*</p>
            <div className="invest__panel-body">
              <div className="invest__table-wrap">
                <table className="invest__table">
                  <thead>
                    <tr>
                      <th scope="col">Component</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakdown.map((row) => (
                      <tr key={row.component}>
                        <td>
                          <span className="invest__table-component">
                            <RowIcon type={row.icon} />
                            {row.component}
                          </span>
                        </td>
                        <td>{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="invest__panel-note invest__panel-note--light">
              Indicative total investment per the current franchise deck. Lease deposit and
              franchise fee figures to be confirmed in the final Franchise Agreement.
            </p>
          </motion.div>

          <motion.div className="invest__returns invest__panel invest__panel--dark" variants={reveal}>
            <h3 className="invest__panel-title invest__panel-title--light">Returns Structure</h3>

            <div className="invest__panel-body">
              <div className="invest__mg-box">
                <HighlightIcon type="shield" />
                <p className="invest__mg-line">
                  <span className="invest__mg-label">Minimum Guarantee*</span>
                  <span className="invest__mg-value">15%</span>
                  <span className="invest__mg-period">Per Annum</span>
                </p>
              </div>

              <p className="invest__returns-divider">Or Revenue Share (Whichever Is Higher)</p>

              <div className="invest__table-wrap">
                <table className="invest__table invest__table--dark">
                  <thead>
                    <tr>
                      <th scope="col">Net Sales</th>
                      <th scope="col">Revenue Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueSlabs.map((row) => (
                      <tr key={row.sales}>
                        <td>{row.sales}</td>
                        <td>{row.share}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="invest__panel-note invest__panel-note--dark">
              Net Sales after deducting GST, returns, refunds, cancellations, discounts and rebates.
              Partner receives whichever is higher — minimum guarantee or revenue share — subject to
              the final Franchise Agreement.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
