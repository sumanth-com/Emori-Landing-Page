/** Google Apps Script Web App URL (`.env`, `.env.production`, or hosting env vars) */
import { getMarketingAttributionFields } from './marketingAttribution'

export function getGoogleScriptUrl() {
  const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined
  return url?.trim() || ''
}

export function isFormConfigured() {
  return Boolean(getGoogleScriptUrl())
}

export function getThankYouRedirectUrl() {
  if (typeof window === 'undefined') return '/thank-you'
  return `${window.location.origin}/thank-you`
}

/**
 * Submit lead to Google Apps Script, then the app navigates to /thank-you.
 * Uses form-urlencoded POST (same payload as a normal form submit).
 * `no-cors` is required because Apps Script does not send browser CORS headers;
 * the script still receives and processes the request.
 */
export async function submitApplication(form: HTMLFormElement): Promise<void> {
  const scriptUrl = getGoogleScriptUrl()
  if (!scriptUrl) {
    throw new Error('Form endpoint is not configured.')
  }

  const params = new URLSearchParams()
  new FormData(form).forEach((value, key) => {
    if (key === 'redirect_url' || key === 'fake-address') return
    params.append(key, String(value))
  })

  const attribution = getMarketingAttributionFields()
  params.set('applicant_source', attribution.source)
  params.set('applicant_utm_parameters', attribution.utmParameters)

  await fetch(scriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString(),
  })
}
