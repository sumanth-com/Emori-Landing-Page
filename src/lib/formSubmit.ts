/** Google Apps Script Web App URL (`.env`, `.env.production`, or hosting env vars) */
export function getGoogleScriptUrl() {
  const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined
  return url?.trim() || ''
}

export function isFormConfigured() {
  return Boolean(getGoogleScriptUrl())
}

/** Absolute thank-you URL used as a hidden redirect field for native form POST. */
export function getThankYouRedirectUrl() {
  if (typeof window === 'undefined') return '/thank-you'
  return `${window.location.origin}/thank-you`
}
