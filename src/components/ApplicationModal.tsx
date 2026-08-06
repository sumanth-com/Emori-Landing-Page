import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion'
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { useApplicationModal } from '../context/ApplicationModalContext'
import {
  filterCities,
  filterStates,
  INDIAN_STATES,
} from '../data/indiaLocations'
import { luxuryEase } from '../lib/motion'

const fieldReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: luxuryEase },
  },
}

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

export function ApplicationModal() {
  const { isOpen, closeApplication } = useApplicationModal()
  const reduced = useReducedMotion()
  const formId = useId()
  const [submitted, setSubmitted] = useState(false)
  const [stateValue, setStateValue] = useState('')
  const [cityValue, setCityValue] = useState('')
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false)
      setStateValue('')
      setCityValue('')
      setOpenMenu(null)
      return
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.classList.add('modal-open')

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (openMenu) {
        setOpenMenu(null)
        return
      }
      closeApplication()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      document.documentElement.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeApplication, openMenu])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleStateChange = (next: string) => {
    setStateValue(next)
    setCityValue('')
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="app-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${formId}-title`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: luxuryEase }}
        >
          <button
            type="button"
            className="app-modal__backdrop"
            aria-label="Close application"
            onClick={closeApplication}
          />

          <motion.div
            className="app-modal__panel"
            initial={reduced ? false : { opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.4, ease: luxuryEase }}
          >
            <header className="app-modal__header">
              <div className="app-modal__brand-row">
                <div className="app-modal__brand-copy">
                  <span className="app-modal__logo">EMORI</span>
                  <p className="app-modal__label">Franchise Application</p>
                </div>
                <button
                  type="button"
                  className="app-modal__close-x"
                  aria-label="Close"
                  onClick={closeApplication}
                >
                  ×
                </button>
              </div>
              <h2 id={`${formId}-title`} className="app-modal__title">
                Begin Your Journey <em>With EMORI</em>
              </h2>
              <ul className="app-modal__trust-row" aria-label="Trust highlights">
                {trust.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </header>

            {submitted ? (
              <motion.div
                className="app-modal__thanks"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: luxuryEase }}
              >
                <p className="app-modal__thanks-title">Application received.</p>
                <p className="app-modal__thanks-body">
                  Our partnerships team will connect with you shortly.
                </p>
                <button
                  type="button"
                  className="btn btn--gold-gradient"
                  onClick={closeApplication}
                >
                  Return to EMORI
                </button>
              </motion.div>
            ) : (
              <motion.form
                className="app-modal__form"
                onSubmit={onSubmit}
                initial={reduced ? false : 'hidden'}
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.03 } },
                }}
              >
                <div className="app-modal__grid">
                  <Field label="Full Name" name="name" required />
                  <Field label="Phone Number" name="phone" type="tel" required />
                  <Field label="Email Address" name="email" type="email" required />

                  <SearchableField
                    label="State"
                    name="state"
                    placeholder="Type or select state"
                    value={stateValue}
                    required
                    options={INDIAN_STATES as unknown as string[]}
                    filterOptions={filterStates}
                    open={openMenu === 'state'}
                    onOpenChange={(open) => setOpenMenu(open ? 'state' : null)}
                    onChange={handleStateChange}
                  />

                  <SearchableField
                    label="City"
                    name="city"
                    placeholder={stateValue ? 'Type or select city' : 'Select state first'}
                    value={cityValue}
                    required
                    disabled={!stateValue}
                    options={[]}
                    filterOptions={(query) =>
                      stateValue ? filterCities(stateValue, query) : []
                    }
                    open={openMenu === 'city'}
                    onOpenChange={(open) => setOpenMenu(open ? 'city' : null)}
                    onChange={setCityValue}
                  />

                  <MenuField
                    label="Investment Budget"
                    name="budget"
                    placeholder="Select range"
                    required
                    options={BUDGET_OPTIONS}
                    open={openMenu === 'budget'}
                    onOpenChange={(open) => setOpenMenu(open ? 'budget' : null)}
                  />

                  <MenuField
                    label="Preferred Location"
                    name="location"
                    placeholder="Select preference"
                    required
                    options={LOCATION_OPTIONS}
                    open={openMenu === 'location'}
                    onOpenChange={(open) => setOpenMenu(open ? 'location' : null)}
                  />

                  <Field label="Occupation" name="occupation" required />
                </div>

                <div className="app-modal__footer">
                  <motion.label className="app-modal__consent" variants={fieldReveal}>
                    <input type="checkbox" name="consent" required />
                    <span>I agree to be contacted by EMORI.</span>
                  </motion.label>

                  <motion.div className="app-modal__actions" variants={fieldReveal}>
                    <button type="button" className="btn app-modal__dismiss" onClick={closeApplication}>
                      Close
                    </button>
                    <button type="submit" className="btn btn--gold-gradient app-modal__submit">
                      Submit Application
                    </button>
                  </motion.div>
                </div>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <motion.label className="app-field" variants={fieldReveal}>
      <span>{label}</span>
      <input name={name} type={type} required={required} placeholder=" " autoComplete="on" />
    </motion.label>
  )
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
}) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
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
      }`}
      variants={fieldReveal}
      ref={rootRef}
    >
      <span>{label}</span>
      <div className={`app-combo${open ? ' is-open' : ''}`}>
        <input type="hidden" name={name} value={value} required={required} />
        <input
          value={query}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
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
          <ul id={listId} className="app-menu" role="listbox">
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
}: {
  label: string
  name: string
  placeholder: string
  options: string[]
  required?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) onOpenChange(false)
    }
    document.addEventListener('mousedown', onPointer)
    return () => document.removeEventListener('mousedown', onPointer)
  }, [open, onOpenChange])

  return (
    <motion.div className="app-field app-field--combo" variants={fieldReveal} ref={rootRef}>
      <span>{label}</span>
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
          <ul id={listId} className="app-menu" role="listbox">
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
    </motion.div>
  )
}
