'use client'

import {useRouter} from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {readLocaleCookie, writeLocaleCookie} from '@/lib/i18n/localeCookie'
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
  const router = useRouter()
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  useEffect(() => {
    const cookieLocale = readLocaleCookie()
    if (cookieLocale) {
      setLocaleState(cookieLocale)
    }
  }, [])

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next)
      writeLocaleCookie(next)
      router.refresh()
    },
    [router],
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
