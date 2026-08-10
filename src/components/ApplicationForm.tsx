import { motion, useReducedMotion } from 'framer-motion'
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react'
import {
  filterCities,
  filterStates,
  getCityNamesForState,
  INDIAN_STATES,
} from '../data/indiaLocations'
import { fieldReveal } from '../lib/formMotion'
import { getGoogleScriptUrl, submitApplication } from '../lib/formSubmit'
import { PhoneField, usePhoneFieldState } from './PhoneField'
import { useNavigate } from 'react-router-dom'

const trust = [
  'Shark Tank Backed',
  '15% Guaranteed Return',
  'Company Operated',
  'Premium Brand',
]

const BUDGET_OPTIONS = [
  '₹50L – ₹1 Cr',
  '₹1 Cr – ₹2 Cr',
  '₹2 Cr – ₹3 Cr',
  '₹3 Cr+',
]

const LOCATION_OPTIONS = [
  'Metro / Tier-1',
  'Tier-2 City',
  'Mall Destination',
  'Open to Guidance',
]

type ApplicationFormProps = {
  variant?: 'modal' | 'inline'
  formId?: string
  onSubmitted?: () => void
  onDismiss?: () => void
  showDismiss?: boolean
}

export function ApplicationForm({
  variant = 'modal',
  formId: formIdProp,
  onSubmitted: _onSubmitted,
  onDismiss,
  showDismiss = false,
}: ApplicationFormProps) {
  const reduced = useReducedMotion()
  const generatedId = useId()
  const formId = formIdProp ?? generatedId
  const scriptUrl = getGoogleScriptUrl()
  const navigate = useNavigate()
  const [stateValue, setStateValue] = useState('')
  const [cityValue, setCityValue] = useState('')
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const phoneField = usePhoneFieldState()
  const isInline = variant === 'inline'

  const handleStateChange = (next: string) => {
    setStateValue(next)
    setCityValue('')
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)

    if (!scriptUrl) {
      setSubmitError(
        'Form is not connected yet. Set VITE_GOOGLE_SCRIPT_URL in .env or redeploy after updating .env.production.',
      )
      return
    }

    if (!phoneField.validate()) {
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)

    if (
      !String(data.get('applicant_full_name') ?? '').trim() ||
      !String(data.get('applicant_email') ?? '').trim() ||
      !stateValue ||
      !cityValue ||
      !String(data.get('applicant_budget') ?? '').trim() ||
      !String(data.get('applicant_location') ?? '').trim()
    ) {
      setSubmitError('Please complete all required fields.')
      return
    }

    setSubmitting(true)

    try {
      await submitApplication(form)
      navigate('/thank-you')
    } catch {
      setSubmitError('Unable to submit right now. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className={`app-form app-form--${variant}`}>
      <header className={`app-form__header${isInline ? ' app-form__header--card' : ''}`}>
        {isInline ? (
          <>
            <span className="app-form__card-icon" aria-hidden="true">
              <FormUserIcon />
            </span>
            <h2 id={`${formId}-title`} className="app-form__title">
              Check Your Franchise Eligibility
            </h2>
          </>
        ) : (
          <>
            <p className="app-form__label">Franchise Application</p>
            <h2 id={`${formId}-title`} className="app-form__title">
              Begin Your Journey <em>With EMORI</em>
            </h2>
            <ul className="app-form__trust-row" aria-label="Trust highlights">
              {trust.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </header>

      <motion.form
        className="app-form__body"
        onSubmit={onSubmit}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        initial={reduced ? false : 'hidden'}
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.03 } },
        }}
      >
        <input
          type="text"
          name="fake-address"
          autoComplete="street-address"
          tabIndex={-1}
          aria-hidden="true"
          className="app-form__autofill-trap"
        />

        <div className="app-form__grid">
          <Field
            label="Full Name"
            name="applicant_full_name"
            autoComplete="off"
            required
            cardMode={isInline}
            placeholder="Enter your full name"
            icon="user"
          />

          <PhoneField
            cardMode={isInline}
            dialCode={phoneField.dialCode}
            phone={phoneField.phone}
            error={phoneField.error}
            open={openMenu === 'phone-country'}
            onOpenChange={(open) => setOpenMenu(open ? 'phone-country' : null)}
            onDialCodeChange={phoneField.resetCountry}
            onPhoneChange={(next) => {
              phoneField.setPhone(next)
              phoneField.setError(null)
            }}
          />

          <Field
            label="Email Address"
            name="applicant_email"
            type="email"
            autoComplete="off"
            required
            cardMode={isInline}
            placeholder="Email address"
            icon="mail"
          />

          <div className="app-form__location-row">
            <SearchableField
              label="State"
              name="applicant_state"
              placeholder={isInline ? 'Select state' : 'Type or select state'}
              value={stateValue}
              required
              cardMode={isInline}
              options={INDIAN_STATES as unknown as string[]}
              filterOptions={filterStates}
              open={openMenu === 'state'}
              onOpenChange={(open) => setOpenMenu(open ? 'state' : null)}
              onChange={handleStateChange}
            />

            <SearchableField
              label="City / District"
              name="applicant_city"
              placeholder={
                stateValue ? (isInline ? 'Select city' : 'Type or select city') : isInline ? 'Select city' : 'Select state first'
              }
              value={cityValue}
              required
              disabled={!stateValue}
              cardMode={isInline}
              options={stateValue ? getCityNamesForState(stateValue) : []}
              filterOptions={(query) => (stateValue ? filterCities(stateValue, query) : [])}
              open={openMenu === 'city'}
              onOpenChange={(open) => setOpenMenu(open ? 'city' : null)}
              onChange={setCityValue}
            />
          </div>

          <div className="app-form__choice-row">
            <MenuField
              label="Investment Budget"
              name="applicant_budget"
              placeholder="Select budget"
              required
              cardMode={isInline}
              options={BUDGET_OPTIONS}
              open={openMenu === 'budget'}
              onOpenChange={(open) => setOpenMenu(open ? 'budget' : null)}
            />

            <MenuField
              label="Preferred Location"
              name="applicant_location"
              placeholder="Select preference"
              required
              cardMode={isInline}
              options={LOCATION_OPTIONS}
              open={openMenu === 'location'}
              onOpenChange={(open) => setOpenMenu(open ? 'location' : null)}
            />
          </div>
        </div>

        {submitError && (
          <p className="app-form__submit-error" role="alert">
            {submitError}
          </p>
        )}

        <div className={`app-form__footer${isInline ? ' app-form__footer--card' : ''}`}>
          <motion.div className="app-form__actions" variants={fieldReveal}>
            {showDismiss && onDismiss && (
              <button type="button" className="btn app-form__dismiss" onClick={onDismiss}>
                Close
              </button>
            )}
            <button type="submit" className="btn app-form__submit" disabled={submitting}>
              {submitting
                ? 'Submitting…'
                : isInline
                  ? 'Check Franchise Availability'
                  : 'Submit Application'}
            </button>
          </motion.div>
        </div>
      </motion.form>
    </div>
  )
}

function FormUserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 19.5c.9-3 3.4-4.5 6.5-4.5s5.6 1.5 6.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function FieldIcon({ type }: { type: string }) {
  return (
    <span className={`app-field__icon app-field__icon--${type}`} aria-hidden="true">
      {type === 'user' && <FormUserIcon />}
      {type === 'mail' && (
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M4 7.5l8 5.5 8-5.5M4 7.5h16v9H4v-9z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete = 'off',
  cardMode = false,
  placeholder,
  icon,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
  cardMode?: boolean
  placeholder?: string
  icon?: string
}) {
  return (
    <motion.label
      className={`app-field${cardMode ? ' app-field--card' : ''}`}
      variants={fieldReveal}
    >
      <span className="app-field__label">{label}</span>
      <span className="app-field__control">
        {cardMode && icon && <FieldIcon type={icon} />}
        <input
          name={name}
          type={type}
          required={required}
          placeholder={cardMode ? placeholder : ' '}
          aria-label={label}
          autoComplete={autoComplete}
          autoCorrect="off"
          spellCheck={false}
          data-lpignore="true"
          data-1p-ignore="true"
          data-form-type="other"
        />
      </span>
    </motion.label>
  )
}

function stopMenuWheel(e: ReactWheelEvent) {
  e.stopPropagation()
}

function SearchableField({
  label,
  name,
  value,
  placeholder,
  required,
  disabled,
  options,
  filterOptions,
  open,
  onOpenChange,
  onChange,
  cardMode = false,
}: {
  label: string
  name: string
  value: string
  placeholder: string
  required?: boolean
  disabled?: boolean
  options: string[]
  filterOptions: (query: string) => string[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onChange: (value: string) => void
  cardMode?: boolean
}) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const [query, setQuery] = useState(value)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setQuery(value)
  }, [value])

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

  const suggestions = useMemo(() => {
    const filtered = filterOptions(query)
    if (filtered.length) return filtered
    if (!query.trim() && options.length) return options
    return filtered
  }, [filterOptions, options, query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query, open])

  const pick = (next: string) => {
    onChange(next)
    setQuery(next)
    onOpenChange(false)
  }

  const commitTyped = () => {
    const q = query.trim().toLowerCase()
    if (!q) {
      onChange('')
      return
    }
    const exact = suggestions.find((item) => item.toLowerCase() === q)
    if (exact) {
      pick(exact)
      return
    }
    if (suggestions.length === 1) {
      pick(suggestions[0])
      return
    }
    if (value && value.toLowerCase() === q) return
    onChange('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      onOpenChange(true)
      setActiveIndex((i) => Math.min(i + 1, Math.max(suggestions.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && open && suggestions[activeIndex]) {
      e.preventDefault()
      pick(suggestions[activeIndex])
    } else if (e.key === 'Escape' && open) {
      e.preventDefault()
      e.stopPropagation()
      onOpenChange(false)
    }
  }

  return (
    <motion.div
      className={`app-field app-field--combo${disabled ? ' is-disabled' : ''}${
        open ? ' is-open' : ''
      }${cardMode ? ' app-field--card' : ''}`}
      variants={fieldReveal}
      ref={rootRef}
    >
      <span className="app-field__label">{label}</span>
      <div className="app-field__control">
        <div className={`app-combo${open ? ' is-open' : ''}`}>
          <input type="hidden" name={name} value={value} required={required} />
          <input
            value={query}
            disabled={disabled}
            placeholder={placeholder}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            data-lpignore="true"
            data-1p-ignore="true"
            data-form-type="other"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            onFocus={() => {
              if (!disabled) onOpenChange(true)
            }}
            onBlur={commitTyped}
            onChange={(e) => {
              setQuery(e.target.value)
              onChange('')
              onOpenChange(true)
            }}
            onKeyDown={onKeyDown}
          />
          <button
            type="button"
            className="app-combo__chevron"
            tabIndex={-1}
            aria-label={`Toggle ${label} list`}
            disabled={disabled}
            onClick={() => {
              if (!disabled) onOpenChange(!open)
            }}
          />
          {open && !disabled && (
            <ul
              id={listId}
              ref={menuRef}
              className="app-menu"
              role="listbox"
              onWheel={stopMenuWheel}
            >
              {suggestions.length ? (
                suggestions.map((item, index) => (
                  <li key={item} role="option" aria-selected={item === value}>
                    <button
                      type="button"
                      className={`app-menu__option${index === activeIndex ? ' is-active' : ''}${
                        item === value ? ' is-selected' : ''
                      }`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pick(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))
              ) : (
                <li className="app-menu__empty">No matches</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function MenuField({
  label,
  name,
  placeholder,
  options,
  required,
  open,
  onOpenChange,
  cardMode = false,
}: {
  label: string
  name: string
  placeholder: string
  options: string[]
  required?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  cardMode?: boolean
}) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const [value, setValue] = useState('')

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
      el.scrollTop += e.deltaY
      e.preventDefault()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [open])

  return (
    <motion.div
      className={`app-field app-field--combo${open ? ' is-open' : ''}${
        cardMode ? ' app-field--card' : ''
      }`}
      variants={fieldReveal}
      ref={rootRef}
    >
      <span className="app-field__label">{label}</span>
      <div className="app-field__control">
        <div className={`app-combo${open ? ' is-open' : ''}`}>
          <input type="hidden" name={name} value={value} required={required} />
          <button
            type="button"
            className={`app-combo__trigger${!value ? ' is-placeholder' : ''}`}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => onOpenChange(!open)}
          >
            {value || placeholder}
          </button>
          <span className="app-combo__chevron" aria-hidden="true" />
          {open && (
            <ul
              id={listId}
              ref={menuRef}
              className="app-menu"
              role="listbox"
              onWheel={stopMenuWheel}
            >
              {options.map((item) => (
                <li key={item} role="option" aria-selected={item === value}>
                  <button
                    type="button"
                    className={`app-menu__option${item === value ? ' is-selected' : ''}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setValue(item)
                      onOpenChange(false)
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}
