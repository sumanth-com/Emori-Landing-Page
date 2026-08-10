import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pathToSectionId, scrollToSection } from '../lib/scrollToSection'

const PAGE_TITLES: Record<string, string> = {
  '/': 'EMORI — Franchise Partnership',
  '/thank-you': 'Thank You | EMORI Franchise',
}

export function ScrollManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = PAGE_TITLES[pathname] ?? 'EMORI — Franchise Partnership'
  }, [pathname])

  useEffect(() => {
    const sectionId = pathToSectionId(pathname)
    if (!sectionId) return

    if (sectionId === 'top') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const timer = window.setTimeout(() => {
      scrollToSection(sectionId)
    }, 80)

    return () => window.clearTimeout(timer)
  }, [pathname])

  return null
}
