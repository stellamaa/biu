'use client'

import {useLanguage} from './LanguageProvider'

type LandscapeArchitectureLabelProps = {
  variant: 'desktop' | 'mobile'
  theme?: 'light' | 'about'
  overlay?: boolean
}

export function LandscapeArchitectureLabel({
  variant,
  theme = 'light',
  overlay = false,
}: LandscapeArchitectureLabelProps) {
  const {t} = useLanguage()
  const colorClass =
    theme === 'about' ? 'text-about-accent' : 'text-black'

  if (variant === 'desktop') {
    return (
      <p className={`text-xs tracking-wide lg:text-sm 3xl:text-base ${colorClass}`}>
        {t('landscapeArchitecture')}
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
      <p className={`text-sm tracking-wide ${colorClass}`}>
        {t('landscapeArchitecture')}
      </p>
    </footer>
  )
}
