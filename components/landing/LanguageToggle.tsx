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
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
  letterSpacing: '0.04em',
} as const

const LOCALE_ORDER: Locale[] = ['en', 'es']

export function LanguageToggle({theme = 'light'}: LanguageToggleProps) {
  const {locale, setLocale} = useLanguage()
  const isAbout = theme === 'about'
  const activeIndex = LOCALE_ORDER.indexOf(locale)

  return (
    <div
      translate="no"
      className="notranslate isolate relative inline-grid h-[1.5rem] w-[4.25rem] shrink-0 grid-cols-2 overflow-hidden rounded-full bg-white text-[12px] font-light leading-none 3xl:h-[1.875rem] 3xl:w-[5.25rem] 3xl:text-lg 4xl:h-[2.25rem] 4xl:w-[6.5rem] 4xl:text-2xl"
      role="group"
      aria-label="Language"
    >
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1/2 rounded-full transition-transform duration-200 ease-out ${
          isAbout ? 'bg-[#D7FF66]' : 'bg-[#707070]'
        }`}
        style={{transform: `translateX(${activeIndex * 100}%)`}}
      />
      {LOCALE_ORDER.map((code) => (
        <button
          key={code}
          type="button"
          translate="no"
          onClick={() => setLocale(code)}
          style={labelStyle}
          className={`notranslate relative z-10 flex items-center justify-center transition-colors ${
            locale === code
              ? isAbout
                ? 'text-[#4D4D4D]'
                : 'text-white'
              : isAbout
                ? 'text-[#B3B3B3] hover:opacity-80'
                : 'text-[#707070]'
          }`}
          aria-pressed={locale === code}
          aria-label={code === 'es' ? 'Spanish' : 'English'}
        >
          {LOCALE_LABELS[code]}
        </button>
      ))}
    </div>
  )
}
