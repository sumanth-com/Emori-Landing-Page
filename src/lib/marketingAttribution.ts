const STORAGE_KEY = 'emori_marketing_attribution'

export const UTM_PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

export type UtmParamKey = (typeof UTM_PARAM_KEYS)[number]

type StoredAttribution = {
  utms: Partial<Record<UtmParamKey, string>>
  source: string
  utmParameters: string
}

export function parseUtmsFromSearch(search: string): Partial<Record<UtmParamKey, string>> {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  const utms: Partial<Record<UtmParamKey, string>> = {}

  for (const key of UTM_PARAM_KEYS) {
    const value = params.get(key)?.trim()
    if (value) {
      utms[key] = value
    }
  }

  return utms
}

export function formatUtmQueryString(utms: Partial<Record<UtmParamKey, string>>): string {
  return UTM_PARAM_KEYS.filter((key) => utms[key])
    .map((key) => `${key}=${utms[key]}`)
    .join('&')
}

export function detectTrafficSource(
  utms: Partial<Record<UtmParamKey, string>>,
  referrer: string,
): string {
  if (utms.utm_source) {
    return utms.utm_source
  }

  const trimmedReferrer = referrer.trim()
  if (!trimmedReferrer) {
    return 'direct'
  }

  try {
    const hostname = new URL(trimmedReferrer).hostname.toLowerCase().replace(/^www\./, '')

    if (hostname.includes('google.')) return 'google'
    if (hostname.includes('facebook.') || hostname === 'fb.com' || hostname.endsWith('.fb.com')) {
      return 'facebook'
    }
    if (hostname.includes('instagram.')) return 'instagram'
    if (hostname.includes('linkedin.')) return 'linkedin'
    if (hostname.includes('twitter.') || hostname === 't.co' || hostname === 'x.com') {
      return 'twitter'
    }
    if (hostname.includes('bing.')) return 'bing'
    if (hostname.includes('youtube.')) return 'youtube'
    if (hostname.includes('yahoo.')) return 'yahoo'

    return hostname
  } catch {
    return 'referral'
  }
}

function readStoredAttribution(): StoredAttribution | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as StoredAttribution
    if (!parsed || typeof parsed !== 'object') return null

    return {
      utms: parsed.utms ?? {},
      source: String(parsed.source ?? ''),
      utmParameters: String(parsed.utmParameters ?? ''),
    }
  } catch {
    return null
  }
}

function writeStoredAttribution(attribution: StoredAttribution) {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
}

/**
 * Capture first-touch / campaign attribution for the current browser session.
 * Persists across SPA route changes until the tab is closed.
 */
export function captureMarketingAttribution(
  search = typeof window !== 'undefined' ? window.location.search : '',
  referrer = typeof document !== 'undefined' ? document.referrer : '',
) {
  if (typeof window === 'undefined') return

  const urlUtms = parseUtmsFromSearch(search)
  const hasUrlUtms = UTM_PARAM_KEYS.some((key) => Boolean(urlUtms[key]))
  const stored = readStoredAttribution()

  if (stored && !hasUrlUtms) {
    return
  }

  const utms = hasUrlUtms ? urlUtms : (stored?.utms ?? {})
  const source = detectTrafficSource(utms, referrer)
  const utmParameters = formatUtmQueryString(utms)

  writeStoredAttribution({ utms, source, utmParameters })
}

export function getMarketingAttributionFields(): { source: string; utmParameters: string } {
  if (typeof window !== 'undefined' && !readStoredAttribution()) {
    captureMarketingAttribution()
  }

  const stored = readStoredAttribution()
  return {
    source: stored?.source ?? 'direct',
    utmParameters: stored?.utmParameters ?? '',
  }
}
