import { motion } from 'framer-motion'
import { luxuryEase } from '../lib/motion'

export function Footer() {
  return (
    <motion.footer
      className="footer footer--finale"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.2, ease: luxuryEase }}
    >
      <div className="footer__rail">
        <a href="#top" className="footer__brand">
          EMORI
        </a>
        <p className="footer__tagline">Luxury lab-grown diamond jewellery</p>
        <div className="footer__meta">
          <a href="mailto:partnerships@emori.com">partnerships@emori.com</a>
          <span className="footer__dot" aria-hidden="true" />
          <span>© {new Date().getFullYear()} EMORI</span>
        </div>
      </div>
    </motion.footer>
  )
}
