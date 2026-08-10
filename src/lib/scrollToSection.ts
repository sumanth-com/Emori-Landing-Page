export const NAV_SCROLL_OFFSET = 92

export function sectionPath(sectionId: string) {
  return `/#${sectionId.replace(/^#/, '')}`
}

export function scrollToSection(sectionId: string, behavior: ScrollBehavior = 'smooth') {
  const id = sectionId.replace(/^#/, '')
  const target = document.getElementById(id)
  if (!target) return false

  const top = target.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior })
  return true
}

export function updateSectionHash(sectionId: string) {
  const next = sectionPath(sectionId)
  if (window.location.pathname + window.location.hash === next) return
  window.history.pushState(null, '', next)
}
