import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { useApplicationModal } from '../context/ApplicationModalContext'
import { luxuryEase } from '../lib/motion'
import { ApplicationForm } from './ApplicationForm'

export function ApplicationModal() {
  const { isOpen, closeApplication } = useApplicationModal()
  const reduced = useReducedMotion()
  const formId = useId()

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.classList.add('modal-open')

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') closeApplication()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      document.documentElement.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeApplication])

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
            <div className="app-modal__brand-row">
              <span className="app-modal__logo">EMORI</span>
              <button
                type="button"
                className="app-modal__close-x"
                aria-label="Close"
                onClick={closeApplication}
              >
                ×
              </button>
            </div>

            <ApplicationForm
              variant="modal"
              formId={formId}
              showDismiss
              onDismiss={closeApplication}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
