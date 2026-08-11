/**
 * EMORI Franchise Application → Google Sheets + Resend lead email
 *
 * Setup:
 * 1. Create a new Google Sheet.
 * 2. Extensions → Apps Script → paste this file → Save.
 * 3. Run `setupSheet` once (authorize when prompted) — creates **Leads** tab.
 * 4. Run `setupConfigSheet` once — creates **Config** tab for Resend keys.
 * 5. Paste your Resend API key into Config → RESEND_API_KEY (no redeploy needed later).
 * 6. Run `testLeadEmail` once to verify email delivery.
 * 7. Deploy → Manage deployments → Edit → New version → Deploy (same URL).
 *
 * Resend keys live in the **Config** sheet or Script Properties — not in the website .env.
 */

var SHEET_NAME = 'Leads'
var CONFIG_SHEET_NAME = 'Config'
var TIMEZONE = 'Asia/Kolkata'

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
  'Source',
  'UTM Parameters',
  'Email Status',
]

/** Optional fallback if Config sheet is empty. Prefer the Config tab instead. */
var EMAIL_SETUP = {
  RESEND_API_KEY: '',
  RESEND_FROM_EMAIL: 'EMORI Franchise <contact@ifranchise.in>',
  LEAD_NOTIFICATION_EMAIL: 'contact@ifranchise.in',
  SITE_URL: '',
}

function getLeadsSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = spreadsheet.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME)
  }
  return sheet
}

function setupSheet() {
  var sheet = getLeadsSheet()
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
    return
  }

  ensureLeadHeaders(sheet)
}

function ensureLeadHeaders(sheet) {
  var lastColumn = Math.max(sheet.getLastColumn(), 1)
  var headerRow = sheet.getRange(1, 1, 1, lastColumn).getValues()[0]
  var headerMap = {}

  headerRow.forEach(function (header, index) {
    headerMap[String(header || '').trim()] = index + 1
  })

  HEADERS.forEach(function (header) {
    if (!headerMap[header]) {
      var nextColumn = sheet.getLastColumn() + 1
      sheet.getRange(1, nextColumn).setValue(header).setFontWeight('bold')
      headerMap[header] = nextColumn
    }
  })
}

function setupConfigSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = spreadsheet.getSheetByName(CONFIG_SHEET_NAME)
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG_SHEET_NAME)
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Key', 'Value'])
    sheet.appendRow(['RESEND_API_KEY', ''])
    sheet.appendRow(['RESEND_FROM_EMAIL', 'EMORI Franchise <contact@ifranchise.in>'])
    sheet.appendRow(['LEAD_NOTIFICATION_EMAIL', 'contact@ifranchise.in'])
    sheet.appendRow(['SITE_URL', ''])
    sheet.getRange(1, 1, 1, 2).setFontWeight('bold')
    sheet.setColumnWidth(1, 240)
    sheet.setColumnWidth(2, 420)
  }
}

function readConfigSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG_SHEET_NAME)
  if (!sheet || sheet.getLastRow() < 2) {
    return {}
  }

  var values = sheet.getRange(2, 1, sheet.getLastRow(), 2).getValues()
  var config = {}

  values.forEach(function (row) {
    var key = String(row[0] || '').trim()
    var value = String(row[1] || '').trim()
    if (!key) return

    if (key === 'RESEND_API_KEY') config.apiKey = value
    if (key === 'RESEND_FROM_EMAIL') config.from = value
    if (key === 'LEAD_NOTIFICATION_EMAIL') config.to = value
    if (key === 'SITE_URL') config.siteUrl = value
  })

  return config
}

function getEmailSettings() {
  var props = PropertiesService.getScriptProperties()
  var sheetConfig = readConfigSheet()

  return {
    apiKey: String(
      props.getProperty('RESEND_API_KEY') ||
        sheetConfig.apiKey ||
        EMAIL_SETUP.RESEND_API_KEY ||
        ''
    ).trim(),
    from: String(
      props.getProperty('RESEND_FROM_EMAIL') ||
        sheetConfig.from ||
        EMAIL_SETUP.RESEND_FROM_EMAIL ||
        'EMORI Franchise <contact@ifranchise.in>'
    ).trim(),
    to: String(
      props.getProperty('LEAD_NOTIFICATION_EMAIL') ||
        sheetConfig.to ||
        EMAIL_SETUP.LEAD_NOTIFICATION_EMAIL ||
        'contact@ifranchise.in'
    ).trim(),
    siteUrl: String(props.getProperty('SITE_URL') || sheetConfig.siteUrl || EMAIL_SETUP.SITE_URL || '')
      .trim()
      .replace(/\/$/, ''),
  }
}

function getEmailConfigReport() {
  var settings = getEmailSettings()

  return {
    configured: Boolean(settings.apiKey),
    from: settings.from,
    to: settings.to,
    siteUrl: settings.siteUrl || null,
    apiKeyPresent: Boolean(settings.apiKey),
    apiKeyPreview: settings.apiKey ? settings.apiKey.slice(0, 8) + '…' : null,
    configSheetFound: Boolean(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG_SHEET_NAME)),
  }
}

/**
 * Run once after filling EMAIL_SETUP, or use the Config sheet instead.
 */
function setupEmailConfig() {
  setupConfigSheet()

  var props = PropertiesService.getScriptProperties()
  var next = {}

  if (EMAIL_SETUP.RESEND_API_KEY) next.RESEND_API_KEY = String(EMAIL_SETUP.RESEND_API_KEY).trim()
  if (EMAIL_SETUP.RESEND_FROM_EMAIL) next.RESEND_FROM_EMAIL = String(EMAIL_SETUP.RESEND_FROM_EMAIL).trim()
  if (EMAIL_SETUP.LEAD_NOTIFICATION_EMAIL) {
    next.LEAD_NOTIFICATION_EMAIL = String(EMAIL_SETUP.LEAD_NOTIFICATION_EMAIL).trim()
  }
  if (EMAIL_SETUP.SITE_URL) next.SITE_URL = String(EMAIL_SETUP.SITE_URL).replace(/\/$/, '')

  if (Object.keys(next).length) {
    props.setProperties(next)
  }

  Logger.log('Email config report: ' + JSON.stringify(getEmailConfigReport()))
}

/** Run from Apps Script editor to verify Resend is working. */
function testLeadEmail() {
  var result = sendLeadNotificationEmail({
    submittedAt: formatLeadDateTime(new Date()),
    fullName: 'Test Lead',
    countryIso: 'IN',
    countryCode: '91',
    phone: '9129130303',
    email: 'test@example.com',
    state: 'Delhi',
    city: 'New Delhi',
    budget: '₹1 Cr – ₹2 Cr',
    location: 'Metro / Tier-1',
  })

  var message = result.ok
    ? 'Test email sent to ' + getEmailSettings().to
    : 'Email failed: ' + result.message

  Logger.log(message)

  try {
    SpreadsheetApp.getUi().alert(message)
  } catch (error) {
    Logger.log('UI alert unavailable: ' + error)
  }
}

function doGet(e) {
  var params = (e && e.parameter) || {}

  if (params.check === 'email') {
    return jsonResponse(getEmailConfigReport())
  }

  // Visiting /exec in a browser should show this — if you see 404, redeploy the Web App.
  return HtmlService.createHtmlOutput(
    '<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;padding:24px;color:#111;">' +
      '<h2 style="margin:0 0 8px;">EMORI form endpoint is live</h2>' +
      '<p style="margin:0;color:#555;">You can submit franchise leads to this URL.</p>' +
      '</body></html>',
  )
}

function doPost(e) {
  try {
    var sheet = getLeadsSheet()
    setupSheet()

    var data = readPayload(e)
    var emailResult = sendLeadNotificationEmail(data)

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
      data.source,
      data.utmParameters,
      emailResult.ok ? 'Sent' : emailResult.skipped ? '' : emailResult.message,
    ])

    var redirectUrl = getSafeRedirectUrl(e)
    if (redirectUrl) {
      return redirectHtml(redirectUrl)
    }

    return jsonResponse({
      success: true,
      message: 'Application received',
      email: emailResult,
    })
  } catch (error) {
    return jsonResponse({ success: false, error: String(error) })
  }
}

function getSafeRedirectUrl(e) {
  var params = (e && e.parameter) || {}
  var redirectUrl = String(params.redirect_url || '').trim()
  if (!redirectUrl) return ''
  if (redirectUrl.indexOf('/thank-you') === -1) return ''
  if (!/^https?:\/\//i.test(redirectUrl)) return ''
  return redirectUrl
}

function redirectHtml(url) {
  var safeUrl = String(url).replace(/"/g, '')
  return HtmlService.createHtmlOutput(
    '<!DOCTYPE html><html><head><meta charset="utf-8">' +
      '<meta http-equiv="refresh" content="0;url=' +
      escapeHtml(safeUrl) +
      '">' +
      '<script>window.top.location.replace(' +
      JSON.stringify(safeUrl) +
      ');</script>' +
      '</head><body style="font-family:Arial,sans-serif;padding:24px;color:#111;">Redirecting…</body></html>',
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function sendLeadNotificationEmail(data) {
  var settings = getEmailSettings()

  if (!settings.apiKey) {
    return {
      ok: false,
      message: '',
      skipped: true,
    }
  }

  var payload = {
    from: settings.from,
    to: [settings.to],
    reply_to: data.email || settings.to,
    subject: 'New EMORI Franchise Lead — ' + (data.fullName || 'Unknown'),
    html: buildLeadEmailHtml(data, false),
  }

  var withLogo = tryBuildLogoAttachment(settings.siteUrl)
  if (withLogo) {
    payload.html = buildLeadEmailHtml(data, true)
    payload.attachments = [withLogo]
  }

  var response = UrlFetchApp.fetch('https://api.resend.com/emails', {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + settings.apiKey,
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  })

  var code = response.getResponseCode()
  var body = response.getContentText()

  if (code < 300) {
    return { ok: true, message: 'Sent' }
  }

  if (withLogo) {
    delete payload.attachments
    payload.html = buildLeadEmailHtml(data, false)

    var retry = UrlFetchApp.fetch('https://api.resend.com/emails', {
      method: 'post',
      contentType: 'application/json',
      headers: {
        Authorization: 'Bearer ' + settings.apiKey,
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    })

    if (retry.getResponseCode() < 300) {
      return { ok: true, message: 'Sent (no logo)' }
    }

    body = retry.getContentText()
    code = retry.getResponseCode()
  }

  return {
    ok: false,
    message: 'Failed (' + code + '): ' + parseResendError(body),
  }
}

function parseResendError(body) {
  try {
    var json = JSON.parse(body)
    if (json.message) return json.message
  } catch (error) {
    // ignore parse errors
  }

  return body || 'Unknown Resend error'
}

function tryBuildLogoAttachment(siteUrl) {
  if (!siteUrl) {
    return null
  }

  var logoUrl = siteUrl + '/brand/emori-logo.webp'

  try {
    var response = UrlFetchApp.fetch(logoUrl, { muteHttpExceptions: true })
    if (response.getResponseCode() >= 300) {
      Logger.log('Logo fetch failed: ' + logoUrl)
      return null
    }

    return {
      filename: 'emori-logo.webp',
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
    ['Source', data.source],
    ['UTM Parameters', data.utmParameters],
    ['Country', data.countryIso + (data.countryCode ? ' (+' + data.countryCode + ')' : '')],
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
    '<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#8a847d;">This notification was sent automatically from the EMORI franchise website. The lead was also saved to the Leads sheet.</p>' +
    '</td></tr>' +
    '</table></td></tr></table></body></html>'
  )
}

function formatLeadDateTime(value) {
  var date = value ? new Date(value) : new Date()
  if (isNaN(date.getTime())) {
    date = new Date()
  }
  return Utilities.formatDate(date, TIMEZONE, 'dd/MM/yyyy hh:mm a')
}

function formatLeadDate(value) {
  return formatLeadDateTime(value)
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
    source: p.applicant_source,
    utmParameters: p.applicant_utm_parameters,
  })
}

function normalizePayload(raw) {
  return {
    submittedAt: formatLeadDateTime(raw.submittedAt),
    fullName: String(raw.fullName || ''),
    countryIso: String(raw.countryIso || ''),
    countryCode: String(raw.countryCode || ''),
    phone: String(raw.phone || ''),
    email: String(raw.email || ''),
    state: String(raw.state || ''),
    city: String(raw.city || ''),
    budget: String(raw.budget || ''),
    location: String(raw.location || ''),
    source: String(raw.source || ''),
    utmParameters: String(raw.utmParameters || ''),
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  )
}
