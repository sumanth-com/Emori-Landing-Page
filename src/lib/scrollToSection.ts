export const NAV_SCROLL_OFFSET = 68

export const SECTION_SLUGS = [
  'investment',
  'store',
  'faq',
  'contact',
  'trust-proven',
] as const

const PATH_TO_SECTION: Record<string, string> = {
  '/': 'top',
  '/investment': 'investment',
  '/store': 'store',
  '/faq': 'faq',
  '/contact': 'contact',
  '/trust-proven': 'trust-proven',
}

export function sectionPath(sectionId: string) {
  const id = sectionId.replace(/^#/, '')
  if (id === 'top') return '/'
  if (id === 'invitation') return '/contact'
  return `/${id}`
}

export function pathToSectionId(pathname: string) {
  if (pathname === '/invitation') return 'contact'
  return PATH_TO_SECTION[pathname] ?? null
}

export function scrollToSection(sectionId: string, behavior: ScrollBehavior = 'smooth') {
  const id = sectionId.replace(/^#/, '') === 'invitation' ? 'contact' : sectionId.replace(/^#/, '')
  const target = document.getElementById(id)
  if (!target) return false

  const top = target.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior })
  return true
}
