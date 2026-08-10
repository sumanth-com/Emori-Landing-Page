/** Google Apps Script Web App URL (`.env`, `.env.production`, or hosting env vars) */
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

/** POST lead data to Google Apps Script, then navigate to /thank-you on the site. */
export async function submitApplication(form: HTMLFormElement): Promise<void> {
  const scriptUrl = getGoogleScriptUrl()
  if (!scriptUrl) {
    throw new Error('Form endpoint is not configured.')
  }

  const params = new URLSearchParams()
  new FormData(form).forEach((value, key) => {
    params.append(key, String(value))
  })

  // no-cors keeps the browser on your domain; Apps Script still receives the POST body.
  await fetch(scriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString(),
  })
}
