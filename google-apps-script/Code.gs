/**
 * EMORI Franchise Application → Google Sheets + Resend lead email
 *
 * Setup:
 * 1. Create a new Google Sheet.
 * 2. Extensions → Apps Script → paste this file → Save.
 * 3. Run `setupSheet` once (authorize when prompted).
 * 4. Run `setupEmailConfig` once and paste your Resend + site values (see below).
 * 5. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL into `.env` as VITE_GOOGLE_SCRIPT_URL
 *
 * Email logo: host `public/brand/emori-logo.png` on your live site, then set SITE_URL.
 * Resend keys live in Script Properties (never in the frontend .env).
 */

var HEADERS = [
  'Submitted At',
  'Full Name',
  'Country ISO',
  'Country Code',
  'Phone',
  'Email',
  'State',
  'City',
  'Investment Budget',
  'Preferred Location',
  'Consent',
]

/** Paste values from your local `.env`, then run setupEmailConfig() once. */
var EMAIL_SETUP = {
  RESEND_API_KEY: '',
  RESEND_FROM_EMAIL: 'EMORI Franchise <contact@ifranchise.in>',
  LEAD_NOTIFICATION_EMAIL: 'contact@ifranchise.in',
  SITE_URL: '',
}

function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
}

/**
 * Run once after filling EMAIL_SETUP above (or edit Script Properties manually).
 * Project Settings → Script properties:
 *   RESEND_API_KEY, RESEND_FROM_EMAIL, LEAD_NOTIFICATION_EMAIL, SITE_URL
 */
function setupEmailConfig() {
  var props = PropertiesService.getScriptProperties()
  var next = {}

  if (EMAIL_SETUP.RESEND_API_KEY) next.RESEND_API_KEY = String(EMAIL_SETUP.RESEND_API_KEY).trim()
  if (EMAIL_SETUP.RESEND_FROM_EMAIL) next.RESEND_FROM_EMAIL = String(EMAIL_SETUP.RESEND_FROM_EMAIL).trim()
  if (EMAIL_SETUP.LEAD_NOTIFICATION_EMAIL) {
    next.LEAD_NOTIFICATION_EMAIL = String(EMAIL_SETUP.LEAD_NOTIFICATION_EMAIL).trim()
  }
  if (EMAIL_SETUP.SITE_URL) next.SITE_URL = String(EMAIL_SETUP.SITE_URL).replace(/\/$/, '')

  props.setProperties(next)
  Logger.log('Email config saved: ' + JSON.stringify(next))
}

function doGet() {
  return jsonResponse({ success: true, status: 'EMORI form endpoint ready' })
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    setupSheet()

    var data = readPayload(e)

    sheet.appendRow([
      data.submittedAt,
      data.fullName,
      data.countryIso,
      data.countryCode,
      data.phone,
      data.email,
      data.state,
      data.city,
      data.budget,
      data.location,
      data.consent,
    ])

    try {
      sendLeadNotificationEmail(data)
    } catch (mailError) {
      Logger.log('Lead email failed (row saved): ' + mailError)
    }

    return redirectResponse(safeRedirectUrl(data.redirectUrl))
  } catch (error) {
    return htmlErrorResponse(String(error))
  }
}

function sendLeadNotificationEmail(data) {
  var props = PropertiesService.getScriptProperties()
  var apiKey = props.getProperty('RESEND_API_KEY')

  if (!apiKey) {
    Logger.log('RESEND_API_KEY not set — skipping lead email.')
    return
  }

  var from = props.getProperty('RESEND_FROM_EMAIL') || 'EMORI Franchise <contact@ifranchise.in>'
  var to = props.getProperty('LEAD_NOTIFICATION_EMAIL') || 'contact@ifranchise.in'
  var logoAttachment = getLogoAttachment()
  var html = buildLeadEmailHtml(data, Boolean(logoAttachment))
  var payload = {
    from: from,
    to: [to],
    subject: 'New EMORI Franchise Lead — ' + (data.fullName || 'Unknown'),
    html: html,
  }

  if (logoAttachment) {
    payload.attachments = [logoAttachment]
  }

  var response = UrlFetchApp.fetch('https://api.resend.com/emails', {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + apiKey,
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  })

  var code = response.getResponseCode()
  if (code >= 300) {
    throw new Error('Resend API ' + code + ': ' + response.getContentText())
  }
}

function getLogoAttachment() {
  var props = PropertiesService.getScriptProperties()
  var siteUrl = (props.getProperty('SITE_URL') || '').replace(/\/$/, '')
  var logoUrl = siteUrl ? siteUrl + '/brand/emori-logo.png' : ''

  if (!logoUrl) {
    return null
  }

  try {
    var response = UrlFetchApp.fetch(logoUrl, { muteHttpExceptions: true })
    if (response.getResponseCode() >= 300) {
      Logger.log('Logo fetch failed: ' + logoUrl)
      return null
    }

    return {
      filename: 'emori-logo.png',
      content: Utilities.base64Encode(response.getBlob().getBytes()),
      content_id: 'emori-logo',
    }
  } catch (error) {
    Logger.log('Logo fetch error: ' + error)
    return null
  }
}

function buildLeadEmailHtml(data, hasLogo) {
  var submitted = formatLeadDate(data.submittedAt)
  var logoBlock = hasLogo
    ? '<img src="cid:emori-logo" alt="EMORI" width="168" style="display:block;width:168px;max-width:168px;height:auto;border:0;margin:0 auto;" />'
    : '<p style="margin:0;font-family:Georgia,\'Times New Roman\',serif;font-size:28px;letter-spacing:0.22em;color:#f7f2ee;">EMORI</p>' +
      '<p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:#d4af37;">Lab Grown Diamonds</p>'

  var rows = [
    ['Full Name', data.fullName],
    ['Phone', data.phone],
    ['Email', data.email],
    ['State', data.state],
    ['City / District', data.city],
    ['Investment Budget', data.budget],
    ['Preferred Location', data.location],
    ['Country', data.countryIso + (data.countryCode ? ' (+' + data.countryCode + ')' : '')],
    ['Consent', data.consent],
    ['Submitted', submitted],
  ]

  var tableRows = rows
    .map(function (row) {
      return (
        '<tr>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #ece7e2;color:#6b6560;font-family:Arial,Helvetica,sans-serif;font-size:13px;width:38%;vertical-align:top;">' +
        escapeHtml(row[0]) +
        '</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #ece7e2;color:#111111;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;vertical-align:top;">' +
        escapeHtml(row[1] || '—') +
        '</td>' +
        '</tr>'
      )
    })
    .join('')

  return (
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
    '<body style="margin:0;padding:0;background:#f7f2ee;">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f2ee;padding:32px 16px;">' +
    '<tr><td align="center">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #ece7e2;box-shadow:0 12px 32px rgba(17,17,17,0.08);">' +
    '<tr><td style="background:#111111;padding:28px 32px 24px;text-align:center;">' +
    logoBlock +
    '</td></tr>' +
    '<tr><td style="padding:32px 32px 12px;">' +
    '<p style="margin:0 0 8px;font-family:Georgia,\'Times New Roman\',serif;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#9a8024;">New Lead</p>' +
    '<h1 style="margin:0 0 10px;font-family:Georgia,\'Times New Roman\',serif;font-size:28px;line-height:1.2;font-weight:500;color:#111111;">Franchise Inquiry Received</h1>' +
    '<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#5c5752;">A new franchise eligibility form was submitted on the EMORI website.</p>' +
    '</td></tr>' +
    '<tr><td style="padding:8px 32px 28px;">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #ece7e2;border-radius:12px;overflow:hidden;background:#faf8f6;">' +
    tableRows +
    '</table>' +
    '</td></tr>' +
    '<tr><td style="padding:0 32px 28px;">' +
    '<table role="presentation" cellspacing="0" cellpadding="0"><tr>' +
    '<td style="border-radius:999px;background:#111111;">' +
    '<a href="mailto:' +
    escapeHtml(data.email || '') +
    '" style="display:inline-block;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ffffff;text-decoration:none;">Reply to Lead</a>' +
    '</td></tr></table>' +
    '</td></tr>' +
    '<tr><td style="padding:18px 32px 24px;border-top:1px solid #ece7e2;background:#faf8f6;">' +
    '<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#8a847d;">This notification was sent automatically from the EMORI franchise website. The lead was also saved to your Google Sheet.</p>' +
    '</td></tr>' +
    '</table></td></tr></table></body></html>'
  )
}

function formatLeadDate(value) {
  try {
    return Utilities.formatDate(new Date(value), Session.getScriptTimeZone(), 'dd MMM yyyy, hh:mm a')
  } catch (error) {
    return String(value || '')
  }
}

function readPayload(e) {
  if (e.postData && e.postData.type === 'application/json') {
    var json = JSON.parse(e.postData.contents)
    return normalizePayload(json)
  }

  var p = e.parameter || {}
  return normalizePayload({
    submittedAt: p.submittedAt,
    fullName: p.applicant_full_name,
    countryIso: p.applicant_country_iso,
    countryCode: p.applicant_country_code,
    phone: p.applicant_phone,
    email: p.applicant_email,
    state: p.applicant_state,
    city: p.applicant_city,
    budget: p.applicant_budget,
    location: p.applicant_location,
    consent: p.consent,
    redirectUrl: p.redirectUrl,
  })
}

function normalizePayload(raw) {
  return {
    submittedAt: raw.submittedAt || new Date().toISOString(),
    fullName: String(raw.fullName || ''),
    countryIso: String(raw.countryIso || ''),
    countryCode: String(raw.countryCode || ''),
    phone: String(raw.phone || ''),
    email: String(raw.email || ''),
    state: String(raw.state || ''),
    city: String(raw.city || ''),
    budget: String(raw.budget || ''),
    location: String(raw.location || ''),
    consent: raw.consent === true || raw.consent === 'Yes' || raw.consent === 'on' ? 'Yes' : 'No',
    redirectUrl: String(raw.redirectUrl || ''),
  }
}

function safeRedirectUrl(url) {
  if (!url) return ''

  var trimmed = String(url).trim()
  if (/^https?:\/\/(localhost|127\.0\.0\.1|[a-z0-9.-]+)(:\d+)?\/thank-you\/?$/i.test(trimmed)) {
    return trimmed
  }

  return ''
}

function redirectResponse(url) {
  if (!url) {
    return htmlErrorResponse('Invalid redirect URL. Form saved, but could not redirect.')
  }

  var html =
    '<!DOCTYPE html><html><head>' +
    '<meta charset="utf-8">' +
    '<meta http-equiv="refresh" content="0;url=' +
    escapeHtml(url) +
    '">' +
    '<script>window.location.replace("' +
    escapeJs(url) +
    '");</script>' +
    '</head><body><p>Application received. Redirecting…</p></body></html>'

  return HtmlService.createHtmlOutput(html).setTitle('EMORI')
}

function htmlErrorResponse(message) {
  var html =
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' +
    '<p>Unable to submit your application.</p><p>' +
    escapeHtml(message) +
    '</p></body></html>'

  return HtmlService.createHtmlOutput(html).setTitle('EMORI')
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeJs(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  )
}
