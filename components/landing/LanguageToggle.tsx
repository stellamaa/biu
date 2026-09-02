'use client'

import {useContext} from 'react'
import {
  landingDesktopBodyTextClass,
  landingDesktopToggleSizeClass,
} from '@/lib/layout/landingDesktopTypography'
import {LanguageContext} from './LanguageProvider'
import type {Locale} from '@/lib/i18n/translations'

type LanguageToggleProps = {
  theme?: 'light' | 'about'
  locale?: Locale
  onLocaleChange?: (locale: Locale) => void
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

export function LanguageToggle({
  theme = 'light',
  locale: controlledLocale,
  onLocaleChange,
}: LanguageToggleProps) {
  const context = useContext(LanguageContext)
  const locale = controlledLocale ?? context?.locale ?? 'en'
  const setLocale = onLocaleChange ?? context?.setLocale
  const isAbout = theme === 'about'
  const activeIndex = LOCALE_ORDER.indexOf(locale)
  const trackClass = isAbout ? 'bg-white' : 'bg-[#EBEBEB]'

  const trackSizeClass = isAbout
    ? '3xl:h-8 3xl:w-[6rem] 3xl:text-base'
    : landingDesktopToggleSizeClass

  return (
    <div
      translate="no"
      className={`notranslate isolate relative inline-grid h-[1.5rem] w-[4.25rem] shrink-0 grid-cols-2 overflow-hidden rounded-full font-light leading-none ${isAbout ? 'text-[12px]' : landingDesktopBodyTextClass} ${trackSizeClass} ${trackClass}`}
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
          onClick={() => setLocale?.(code)}
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
