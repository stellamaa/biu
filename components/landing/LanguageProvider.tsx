'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import {DEFAULT_LOCALE} from '@/lib/i18n/constants'
import {
  getLocaleSnapshot,
  initLocaleClient,
  setLocaleClient,
  subscribeLocale,
} from '@/lib/i18n/localeClient'
import {persistLocale} from '@/lib/i18n/persistLocale'
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

export const LanguageContext = createContext<LanguageContextValue | null>(null)

type LanguageProviderProps = {
  children: ReactNode
  initialLocale?: Locale
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: LanguageProviderProps) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    () => {
      initLocaleClient(initialLocale)
      return getLocaleSnapshot()
    },
    () => initialLocale,
  )

  useEffect(() => {
    initLocaleClient(initialLocale)
  }, [initialLocale])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleClient(next)
    void persistLocale(next)
  }, [])

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

export function useOptionalLanguage() {
  return useContext(LanguageContext)
}
