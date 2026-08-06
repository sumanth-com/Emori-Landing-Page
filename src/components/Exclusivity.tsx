import { RevealGroup, RevealItem } from './ui/Reveal'
import { AmbientOrbs } from './ui/AmbientOrbs'
import { SoftDivider } from './ui/SoftDivider'
import { revealSoft } from '../lib/motion'

export function Exclusivity() {
  return (
    <section id="exclusivity" className="chapter chapter--charcoal exclusivity">
      <AmbientOrbs variant="dark" />
      <div className="chapter__rail exclusivity__rail">
        <RevealGroup className="exclusivity__layout">
          <RevealItem className="exclusivity__copy" variants={revealSoft}>
            <p className="chapter__label chapter__label--gold">Exclusivity</p>
            <h2 className="chapter__title chapter__title--light">
              Territory is
              <br />
              a privilege.
            </h2>
            <p className="chapter__body chapter__body--muted">
              EMORI protects brand density. Each franchise is granted meaningful geographic
              exclusivity — so your investment compounds without dilution.
            </p>
          </RevealItem>

          <RevealItem className="exclusivity__panel" variants={revealSoft}>
            <div className="glass-panel">
              <p className="glass-panel__kicker">Selective award</p>
              <p className="glass-panel__figure">Limited</p>
              <p className="glass-panel__caption">
                Partnerships per metropolitan corridor — by design, never by accident.
              </p>
              <SoftDivider light />
              <ul className="glass-panel__points">
                <li>Protected trade areas</li>
                <li>Discerning partner profiles</li>
                <li>Long-horizon brand covenants</li>
              </ul>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
      <div className="exclusivity__bridge" aria-hidden="true" />
    </section>
  )
}
