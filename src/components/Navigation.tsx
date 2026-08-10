import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useApplicationModal } from '../context/ApplicationModalContext'

const links = [
  { href: '#investment', label: 'Investment' },
  { href: '#faq', label: 'FAQ' },
  { href: '#store', label: 'Partners' },
  { href: '#invitation', label: 'Begin' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const { openApplication } = useApplicationModal()
  const { scrollY } = useScroll()
  const backdrop = useTransform(
    scrollY,
    [0, 140],
    ['rgba(248,248,246,0)', 'rgba(248,248,246,0.82)']
  )

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 40))
    return () => unsub()
  }, [scrollY])

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      style={{ backgroundColor: backdrop }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <a href="#top" className="nav__brand" aria-label="EMORI home">
        EMORI
      </a>
      <nav className="nav__links" aria-label="Primary">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="nav__link">
            {link.label}
          </a>
        ))}
      </nav>
      <button type="button" className="nav__cta" onClick={openApplication}>
        Private Inquiry
      </button>
    </motion.header>
  )
}
