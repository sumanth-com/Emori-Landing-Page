import { motion } from 'framer-motion'
import { useEffect, useId, useRef, useState, type WheelEvent as ReactWheelEvent } from 'react'
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRIES,
  getPhoneCountry,
  sanitizePhoneDigits,
  validatePhoneNumber,
  type PhoneCountry,
} from '../data/phoneCountries'
import { fieldReveal } from '../lib/formMotion'

type PhoneFieldProps = {
  cardMode?: boolean
  dialCode: string
  phone: string
  error?: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onDialCodeChange: (dialCode: string) => void
  onPhoneChange: (phone: string) => void
}

function stopMenuWheel(e: ReactWheelEvent) {
  e.stopPropagation()
}

export function PhoneField({
  cardMode = false,
  dialCode,
  phone,
  error,
  open,
  onOpenChange,
  onDialCodeChange,
  onPhoneChange,
}: PhoneFieldProps) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const country = getPhoneCountry(dialCode)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) onOpenChange(false)
    }
    document.addEventListener('mousedown', onPointer)
    return () => document.removeEventListener('mousedown', onPointer)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!open || !menuRef.current) return
    const el = menuRef.current
    const onWheel = (e: WheelEvent) => {
      e.stopPropagation()
      e.preventDefault()
      el.scrollTop += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [open])

  const pickCountry = (next: PhoneCountry) => {
    onDialCodeChange(next.dialCode)
    onPhoneChange(sanitizePhoneDigits(phone).slice(0, next.digits))
    onOpenChange(false)
  }

  return (
    <motion.div
      className={`app-field app-field--phone${cardMode ? ' app-field--card' : ''}${
        open ? ' is-open' : ''
      }${error ? ' has-error' : ''}`}
      variants={fieldReveal}
      ref={rootRef}
    >
      <span className="app-field__label">Phone Number</span>
      <div className="app-field__control">
        <div className="phone-field">
          <input type="hidden" name="applicant_country_code" value={country.dialCode} />
          <input type="hidden" name="applicant_country_iso" value={country.iso} />
          <input
            type="hidden"
            name="applicant_phone"
            value={sanitizePhoneDigits(phone)}
          />

          <div className={`phone-field__code app-combo${open ? ' is-open' : ''}`}>
            <button
              type="button"
              className="phone-field__code-trigger"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls={listId}
              onClick={() => onOpenChange(!open)}
            >
              <span className="phone-field__iso">{country.iso}</span>
              <span className="phone-field__dial">+{country.dialCode}</span>
            </button>
            <span className="app-combo__chevron" aria-hidden="true" />
            {open && (
              <ul
                id={listId}
                ref={menuRef}
                className="app-menu phone-field__menu"
                role="listbox"
                onWheel={stopMenuWheel}
              >
                {PHONE_COUNTRIES.map((item) => (
                  <li key={item.iso} role="option" aria-selected={item.dialCode === dialCode}>
                    <button
                      type="button"
                      className={`app-menu__option${
                        item.dialCode === dialCode ? ' is-selected' : ''
                      }`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pickCountry(item)}
                    >
                      <span>{item.iso}</span>
                      <span>{item.name}</span>
                      <span>+{item.dialCode}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            className="phone-field__number"
            type="tel"
            inputMode="numeric"
            value={phone}
            placeholder={cardMode ? country.placeholder : ' '}
            aria-label="Phone number"
            aria-invalid={Boolean(error)}
            maxLength={country.digits}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            data-lpignore="true"
            data-1p-ignore="true"
            data-form-type="other"
            onChange={(e) => {
              const next = sanitizePhoneDigits(e.target.value).slice(0, country.digits)
              onPhoneChange(next)
            }}
          />
        </div>
      </div>
      {error && (
        <p className="app-field__error" role="alert">
          {error}
        </p>
      )}
    </motion.div>
  )
}

export function usePhoneFieldState(initialDialCode = DEFAULT_PHONE_COUNTRY.dialCode) {
  const [dialCode, setDialCode] = useState(initialDialCode)
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)

  const validate = () => {
    const message = validatePhoneNumber(dialCode, phone)
    setError(message)
    return !message
  }

  const resetCountry = (nextDialCode: string) => {
    setDialCode(nextDialCode)
    const nextCountry = getPhoneCountry(nextDialCode)
    setPhone((current) => sanitizePhoneDigits(current).slice(0, nextCountry.digits))
    setError(null)
  }

  return {
    dialCode,
    phone,
    error,
    setPhone,
    setError,
    validate,
    resetCountry,
  }
}
