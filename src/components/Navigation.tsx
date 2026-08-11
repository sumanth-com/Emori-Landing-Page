import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import elogo from '../assets/Elogo.webp'
import { scrollToSection, sectionPath } from '../lib/scrollToSection'

const links = [
  { id: 'investment', label: 'Investment' },
  { id: 'store', label: 'Our Stores' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

type NavigationProps = {
  variant?: 'default' | 'solid'
}

export function Navigation({ variant = 'default' }: NavigationProps) {
  const [scrolled, setScrolled] = useState(variant === 'solid')
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()
  const navigate = useNavigate()
  const backdrop = useTransform(
    scrollY,
    [0, 140],
    ['rgba(248,248,246,0)', 'rgba(248,248,246,0.82)'],
  )

  useEffect(() => {
    if (variant === 'solid') {
      setScrolled(true)
      return
    }

    const unsub = scrollY.on('change', (v) => setScrolled(v > 40))
    return () => unsub()
  }, [scrollY, variant])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) {
      document.body.classList.remove('nav-menu-open')
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('nav-menu-open')

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.classList.remove('nav-menu-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (location.pathname === '/') {
      scrollToSection('top')
      return
    }

    navigate('/')
  }

  const goToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()
    setMenuOpen(false)
    const path = sectionPath(sectionId)

    if (location.pathname === path) {
      scrollToSection(sectionId)
      return
    }

    navigate(path)
  }

  const navClassName = [
    'nav',
    scrolled || variant === 'solid' ? 'nav--scrolled' : '',
    variant === 'solid' ? 'nav--solid' : '',
    menuOpen ? 'nav--menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.header
      className={navClassName}
      style={variant === 'solid' ? undefined : { backgroundColor: backdrop }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <a href="/" className="nav__brand" aria-label="EMORI home" onClick={goHome}>
        <img src={elogo} alt="EMORI" className="nav__brand-logo" />
      </a>
      <nav className="nav__links" aria-label="Primary">
        {links.map((link) => (
          <a
            key={link.id}
            href={sectionPath(link.id)}
            className="nav__link"
            onClick={(event) => goToSection(event, link.id)}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className="nav__toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="nav-mobile-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="nav__toggle-bar" aria-hidden="true" />
        <span className="nav__toggle-bar" aria-hidden="true" />
        <span className="nav__toggle-bar" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="nav__mobile-backdrop"
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />
      <nav
        id="nav-mobile-menu"
        className="nav__mobile-menu"
        aria-label="Mobile primary"
        aria-hidden={!menuOpen}
      >
        <div className="nav__mobile-panel">
          <p className="nav__mobile-label">Menu</p>
          <div className="nav__mobile-links">
            {links.map((link) => (
              <a
                key={link.id}
                href={sectionPath(link.id)}
                className="nav__mobile-link"
                onClick={(event) => goToSection(event, link.id)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={sectionPath('contact')}
            className="nav__cta nav__cta--book nav__mobile-cta"
            onClick={(event) => goToSection(event, 'contact')}
          >
            Request Consultation
          </a>
        </div>
      </nav>
      <a
        href={sectionPath('contact')}
        className="nav__cta nav__cta--book nav__cta--desktop"
        onClick={(event) => goToSection(event, 'contact')}
      >
        Request Consultation
      </a>
    </motion.header>
  )
}
