import { SoftDivider } from './ui/SoftDivider'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'
import { revealSoft } from '../lib/motion'

const assurances = [
  {
    title: 'Ethical brilliance',
    text: 'Lab-grown diamonds with transparent provenance — luxury that aligns with modern conscience and regulatory clarity.',
  },
  {
    title: 'Design integrity',
    text: 'Collections developed in-house with enduring silhouettes. No mass-market noise. No disposable fashion cycles.',
  },
  {
    title: 'Investment posture',
    text: 'A franchise model engineered for capital discipline: controlled rollout, brand protection, and measurable salon economics.',
  },
]

export function Trust() {
  return (
    <section id="trust" className="chapter chapter--ivory trust">
      <div className="chapter__rail">
        <RevealGroup>
          <RevealItem variants={revealSoft}>
            <p className="chapter__label">Confidence</p>
            <h2 className="chapter__title">
              Trust, composed
              <br />
              <em>quietly.</em>
            </h2>
          </RevealItem>
          <RevealItem variants={revealSoft}>
            <p className="chapter__body trust__lede">
              Luxury franchise decisions are made with patience. EMORI is structured for partners
              who evaluate brand equity as carefully as they evaluate gemstones.
            </p>
          </RevealItem>
        </RevealGroup>

        <SoftDivider />

        <div className="trust__assurances">
          {assurances.map((item, i) => (
            <Reveal key={item.title} className="assurance" delay={i * 0.1}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
