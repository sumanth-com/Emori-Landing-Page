export type PhoneCountry = {
  iso: string
  name: string
  dialCode: string
  digits: number
  placeholder: string
  pattern: RegExp
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  {
    iso: 'IN',
    name: 'India',
    dialCode: '91',
    digits: 10,
    placeholder: '10-digit number',
    pattern: /^[6-9]\d{9}$/,
  },
  {
    iso: 'US',
    name: 'United States',
    dialCode: '1',
    digits: 10,
    placeholder: '10-digit number',
    pattern: /^\d{10}$/,
  },
  {
    iso: 'AE',
    name: 'United Arab Emirates',
    dialCode: '971',
    digits: 9,
    placeholder: '9-digit number',
    pattern: /^\d{9}$/,
  },
  {
    iso: 'GB',
    name: 'United Kingdom',
    dialCode: '44',
    digits: 10,
    placeholder: '10-digit number',
    pattern: /^\d{10}$/,
  },
  {
    iso: 'SG',
    name: 'Singapore',
    dialCode: '65',
    digits: 8,
    placeholder: '8-digit number',
    pattern: /^\d{8}$/,
  },
  {
    iso: 'AU',
    name: 'Australia',
    dialCode: '61',
    digits: 9,
    placeholder: '9-digit number',
    pattern: /^\d{9}$/,
  },
  {
    iso: 'CA',
    name: 'Canada',
    dialCode: '1',
    digits: 10,
    placeholder: '10-digit number',
    pattern: /^\d{10}$/,
  },
]

export const DEFAULT_PHONE_COUNTRY = PHONE_COUNTRIES[0]

export function getPhoneCountry(dialCode: string) {
  return PHONE_COUNTRIES.find((country) => country.dialCode === dialCode) ?? DEFAULT_PHONE_COUNTRY
}

export function sanitizePhoneDigits(value: string) {
  return value.replace(/\D/g, '')
}

export function validatePhoneNumber(dialCode: string, digits: string) {
  const country = getPhoneCountry(dialCode)
  const cleaned = sanitizePhoneDigits(digits)

  if (!cleaned) {
    return `Enter your ${country.digits}-digit phone number.`
  }

  if (cleaned.length !== country.digits) {
    return `${country.name} numbers must be exactly ${country.digits} digits.`
  }

  if (!country.pattern.test(cleaned)) {
    return `Enter a valid ${country.name} phone number.`
  }

  return null
}

export function formatFullPhone(dialCode: string, digits: string) {
  return `+${dialCode}${sanitizePhoneDigits(digits)}`
}
