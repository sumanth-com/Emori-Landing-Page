import { SoftDivider } from './ui/SoftDivider'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'
import { revealSoft } from '../lib/motion'

const support = [
  {
    title: 'Salon Architecture',
    text: 'Spatial concepts, lighting plans, and material palettes that translate EMORI’s quiet luxury into physical presence.',
  },
  {
    title: 'Collection Access',
    text: 'Priority allocation across signature lines — engagement, occasion, and everlasting — with seasonal exclusives for franchise partners.',
  },
  {
    title: 'Clientelling Academy',
    text: 'Training in the art of private selling: narrative, fit, aftercare, and the rituals that turn visitors into patrons.',
  },
  {
    title: 'Growth Partnership',
    text: 'National campaigns, local amplification, and continuous merchandising counsel — so your salon never stands alone.',
  },
]

export function Partnership() {
  return (
    <section id="partnership" className="chapter chapter--warm partnership">
      <div className="chapter__rail">
        <RevealGroup className="partnership__header">
          <RevealItem variants={revealSoft}>
            <p className="chapter__label">Partnership</p>
            <h2 className="chapter__title">
              Everything required.
              <br />
              Nothing excessive.
            </h2>
          </RevealItem>
        </RevealGroup>

        <div className="partnership__list">
          {support.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="partnership__row">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
              {i < support.length - 1 && <SoftDivider />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
