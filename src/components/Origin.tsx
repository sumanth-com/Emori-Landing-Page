import { SoftDivider } from './ui/SoftDivider'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'
import { AmbientOrbs } from './ui/AmbientOrbs'
import { revealSoft } from '../lib/motion'

export function Origin() {
  return (
    <section id="origin" className="chapter chapter--warm origin">
      <AmbientOrbs variant="warm" />
      <div className="chapter__rail">
        <RevealGroup className="origin__grid">
          <RevealItem className="origin__copy" variants={revealSoft}>
            <p className="chapter__label">The House</p>
            <h2 className="chapter__title">
              Born from light.
              <br />
              <em>Defined by restraint.</em>
            </h2>
            <p className="chapter__body">
              EMORI creates lab-grown diamond jewellery for a generation that expects brilliance
              without compromise — ethical provenance, architectural design, and the quiet
              confidence of true luxury.
            </p>
          </RevealItem>

          <RevealItem className="origin__portrait" variants={revealSoft}>
            <div className="portrait">
              <div className="portrait__image portrait__image--origin" />
              <div className="portrait__veil" />
            </div>
          </RevealItem>
        </RevealGroup>

        <SoftDivider />

        <Reveal className="origin__statement">
          <p>
            We do not chase trends. We shape atmospheres — boutiques that feel like private
            salons, collections that reward a second glance, and partnerships built for decades,
            not seasons.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
