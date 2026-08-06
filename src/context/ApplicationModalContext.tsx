import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type ApplicationModalContextValue = {
  isOpen: boolean
  openApplication: () => void
  closeApplication: () => void
}

const ApplicationModalContext = createContext<ApplicationModalContextValue | null>(null)

export function ApplicationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openApplication = useCallback(() => setIsOpen(true), [])
  const closeApplication = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, openApplication, closeApplication }),
    [isOpen, openApplication, closeApplication]
  )

  return (
    <ApplicationModalContext.Provider value={value}>
      {children}
    </ApplicationModalContext.Provider>
  )
}

export function useApplicationModal() {
  const ctx = useContext(ApplicationModalContext)
  if (!ctx) {
    throw new Error('useApplicationModal must be used within ApplicationModalProvider')
  }
  return ctx
}
