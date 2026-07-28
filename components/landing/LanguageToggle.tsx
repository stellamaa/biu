'use client'

import {useLanguage} from './LanguageProvider'
import type {Locale} from '@/lib/i18n/translations'

type LanguageToggleProps = {
  theme?: 'light' | 'about'
}

const LOCALE_LABELS: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
}

const labelStyle = {
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  letterSpacing: '0.04em',
} as const

export function LanguageToggle({theme = 'light'}: LanguageToggleProps) {
  const {locale, setLocale} = useLanguage()
  const isAbout = theme === 'about'

  return (
    <div
      className={`isolate inline-flex items-center rounded-full border p-0.5 text-xs 3xl:p-1.5 3xl:text-lg 4xl:p-2 4xl:text-2xl ${
        isAbout
          ? 'border-about-accent/40 bg-about-bg'
          : 'border-black/10 bg-white'
      }`}
      role="group"
      aria-label="Language"
    >
      {(['es', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          style={labelStyle}
          className={`rounded-full px-2.5 py-1 transition-colors 3xl:px-3.5 3xl:py-1.5 4xl:px-5 4xl:py-2 ${
            locale === code
              ? isAbout
                ? 'bg-about-accent text-about-bg'
                : 'bg-neutral-800 text-white'
              : isAbout
                ? 'text-about-accent hover:opacity-80'
                : 'text-black hover:text-neutral-600'
          }`}
          aria-pressed={locale === code}
        >
          {LOCALE_LABELS[code]}
        </button>
      ))}
    </div>
  )
}
