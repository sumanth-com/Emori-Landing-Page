import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '../lib/scrollToSection'

const PAGE_TITLES: Record<string, string> = {
  '/': 'EMORI — Franchise Partnership',
  '/thank-you': 'Thank You | EMORI Franchise',
}

export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = PAGE_TITLES[pathname] ?? 'EMORI — Franchise Partnership'
  }, [pathname])

  useEffect(() => {
    if (pathname !== '/') return

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const sectionId = hash.replace(/^#/, '')
    const timer = window.setTimeout(() => {
      scrollToSection(sectionId)
    }, 80)

    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}
