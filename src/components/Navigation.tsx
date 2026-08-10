import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BOOK_A_CALL_URL } from '../data/contact'
import { scrollToSection, sectionPath, updateSectionHash } from '../lib/scrollToSection'

const links = [
  { id: 'investment', label: 'Investment' },
  { id: 'store', label: 'Our Stores' },
  { id: 'faq', label: 'FAQ' },
  { id: 'invitation', label: 'Begin' },
]

type NavigationProps = {
  variant?: 'default' | 'solid'
}

export function Navigation({ variant = 'default' }: NavigationProps) {
  const [scrolled, setScrolled] = useState(variant === 'solid')
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

  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (location.pathname === '/') {
      scrollToSection('top')
      updateSectionHash('top')
      return
    }

    navigate('/')
  }

  const goToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()

    if (location.pathname === '/') {
      scrollToSection(sectionId)
      updateSectionHash(sectionId)
      return
    }

    navigate({ pathname: '/', hash: sectionId })
  }

  const navClassName = [
    'nav',
    scrolled || variant === 'solid' ? 'nav--scrolled' : '',
    variant === 'solid' ? 'nav--solid' : '',
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
      <a href="/#top" className="nav__brand" aria-label="EMORI home" onClick={goHome}>
        EMORI
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
      <a
        href={BOOK_A_CALL_URL}
        className="nav__cta nav__cta--book"
        target="_blank"
        rel="noopener noreferrer"
      >
        Book a Call
      </a>
    </motion.header>
  )
}
