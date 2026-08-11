import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { captureMarketingAttribution } from '../lib/marketingAttribution'
import { pathToSectionId, scrollToSection } from '../lib/scrollToSection'

const PAGE_TITLES: Record<string, string> = {
  '/': 'EMORI — Franchise Partnership',
  '/thank-you': 'Thank You | EMORI Franchise',
  '/privacy-policy': 'Privacy Policy | EMORI',
  '/terms-and-conditions': 'Terms & Conditions | EMORI',
}

const TOP_ONLY_PATHS = new Set(['/thank-you', '/privacy-policy', '/terms-and-conditions'])

export function ScrollManager() {
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    captureMarketingAttribution(location.search)
  }, [location.search])

  useEffect(() => {
    document.title = PAGE_TITLES[pathname] ?? 'EMORI — Franchise Partnership'
  }, [pathname])

  useEffect(() => {
    if (TOP_ONLY_PATHS.has(pathname)) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const sectionId = pathToSectionId(pathname)
    if (!sectionId || sectionId === 'top') {
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
