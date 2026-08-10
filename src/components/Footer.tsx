import { motion } from 'framer-motion'
import { type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import elogo from '../assets/Elogo.png'
import { luxuryEase } from '../lib/motion'
import { scrollToSection } from '../lib/scrollToSection'

export function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (window.location.pathname === '/') {
      scrollToSection('top')
      return
    }

    navigate('/')
  }

  return (
    <motion.footer
      className="footer footer--finale"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8, ease: luxuryEase }}
    >
      <div className="footer__rail">
        <a href="/" className="footer__brand" aria-label="EMORI home" onClick={goHome}>
          <img src={elogo} alt="EMORI" className="footer__brand-logo" />
        </a>
        <p className="footer__copyright">© {year} EMORI. All rights reserved.</p>
        <div className="footer__meta">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span className="footer__dot" aria-hidden="true" />
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
        </div>
      </div>
    </motion.footer>
  )
}
