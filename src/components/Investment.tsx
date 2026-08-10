import { Gem, MapPin, Receipt, Store, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { reveal } from '../lib/motion'

const breakdownIcons = {
  gem: Gem,
  location: MapPin,
  store: Store,
  fee: Receipt,
} as const satisfies Record<string, LucideIcon>

type BreakdownIcon = keyof typeof breakdownIcons

const breakdown: {
  component: string
  amount: string
  icon: BreakdownIcon
}[] = [
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

function RowIcon({ type }: { type: BreakdownIcon }) {
  const Icon = breakdownIcons[type]

  return (
    <span className="invest__row-icon" aria-hidden="true">
      <Icon strokeWidth={1.75} />
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
          <motion.p className="section-eyebrow" variants={reveal}>
            Investment &amp; Returns
          </motion.p>
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
            <div className="invest__panel-head">
              <p className="invest__panel-hero">2.3 Crores*</p>
            </div>
            <div className="invest__panel-body">
              <div className="invest__table-wrap invest__breakdown-table">
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
              <ul className="invest__breakdown-cards" aria-label="Investment breakdown">
                {breakdown.map((row) => (
                  <li key={row.component} className="invest__breakdown-card">
                    <RowIcon type={row.icon} />
                    <span className="invest__breakdown-card-label">{row.component}</span>
                    <span className="invest__breakdown-card-amount">{row.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="invest__panel-note invest__panel-note--light">
              Indicative total investment per the current franchise deck. Lease deposit and
              franchise fee figures to be confirmed in the final Franchise Agreement.
            </p>
          </motion.div>

          <motion.div className="invest__returns invest__panel" variants={reveal}>
            <h3 className="invest__panel-title">Returns Structure</h3>
            <div className="invest__panel-head invest__returns-hero">
              <p className="invest__panel-hero">15%*</p>
              <p className="invest__returns-summary">
                <span className="invest__returns-summary-line">
                  Minimum Guarantee Per Annum ·
                </span>
                <span className="invest__returns-summary-line">
                  Or Revenue Share (Whichever Is Higher)
                </span>
              </p>
            </div>

            <div className="invest__panel-body">
              <div className="invest__table-wrap invest__returns-table">
                <table className="invest__table">
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
              <ul className="invest__returns-cards" aria-label="Revenue share by net sales">
                {revenueSlabs.map((row) => (
                  <li key={row.sales} className="invest__returns-card">
                    <span className="invest__returns-card-label">{row.sales}</span>
                    <span className="invest__returns-card-value">{row.share}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="invest__panel-note invest__panel-note--light">
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
