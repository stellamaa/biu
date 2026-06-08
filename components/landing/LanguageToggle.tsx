'use client'

import {useLanguage} from './LanguageProvider'
import type {Locale} from '@/lib/i18n/translations'

type LanguageToggleProps = {
  theme?: 'light' | 'about'
}

export function LanguageToggle({theme = 'light'}: LanguageToggleProps) {
  const {locale, setLocale} = useLanguage()
  const isAbout = theme === 'about'

  return (
    <div
      className={`inline-flex items-center rounded-full border p-0.5 text-xs tracking-wide ${
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
          onClick={() => setLocale(code as Locale)}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
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
          {code}
        </button>
      ))}
    </div>
  )
}
