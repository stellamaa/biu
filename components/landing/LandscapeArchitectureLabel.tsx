'use client'

import {
  landingDesktopHeaderLabelTextClass,
  landingDesktopLabelTextClass,
} from '@/lib/layout/landingDesktopTypography'
import {translations} from '@/lib/i18n/translations'
import {useOptionalLanguage} from './LanguageProvider'

type LandscapeArchitectureLabelProps = {
  variant: 'desktop' | 'mobile'
  theme?: 'light' | 'about'
  overlay?: boolean
  text?: string
  matchAboutHeaderAt3xl?: boolean
}

export function LandscapeArchitectureLabel({
  variant,
  theme = 'light',
  overlay = false,
  text,
  matchAboutHeaderAt3xl = false,
}: LandscapeArchitectureLabelProps) {
  const language = useOptionalLanguage()
  const label =
    text ??
    language?.t('landscapeArchitecture') ??
    translations.en.landscapeArchitecture
  const colorClass =
    theme === 'about' ? 'text-about-accent' : 'text-black'

  if (variant === 'desktop') {
    return (
      <p
        className={`${
          theme === 'about'
            ? 'text-base leading-none tracking-wide 3xl:text-3xl 4xl:text-4xl'
            : matchAboutHeaderAt3xl
              ? landingDesktopHeaderLabelTextClass
              : landingDesktopLabelTextClass
        } ${colorClass}`}
      >
        {label}
      </p>
    )
  }

  return (
    <footer
      className={`text-center ${
        overlay
          ? 'pointer-events-none absolute inset-x-0 bottom-0 bg-transparent pb-5 pt-10'
          : `shrink-0 py-5 ${theme === 'about' ? '' : 'border-t border-black/5'}`
      }`}
    >
      <p className={`text-sm tracking-wide ${colorClass}`}>{label}</p>
    </footer>
  )
}
