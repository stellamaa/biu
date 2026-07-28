'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  translations,
  type Locale,
  type TranslationKey,
} from '@/lib/i18n/translations'

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

type LanguageProviderProps = {
  children: ReactNode
  initialLocale?: Locale
}

export function LanguageProvider({
  children,
  initialLocale = 'es',
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  useEffect(() => {
    setLocaleState(initialLocale)
  }, [initialLocale])

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return

      setLocaleState(next)

      void (async () => {
        const response = await fetch('/api/locale', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({locale: next}),
          credentials: 'same-origin',
        })

        if (!response.ok) return

        window.location.reload()
      })()
    },
    [locale],
  )

  const t = useCallback(
    (key: TranslationKey) => translations[locale][key],
    [locale],
  )

  const value = useMemo(
    () => ({locale, setLocale, t}),
    [locale, setLocale, t],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
