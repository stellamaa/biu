'use client'

import {useLanguage} from './LanguageProvider'

type LandscapeArchitectureLabelProps = {
  variant: 'desktop' | 'mobile'
  theme?: 'light' | 'about'
}

export function LandscapeArchitectureLabel({
  variant,
  theme = 'light',
}: LandscapeArchitectureLabelProps) {
  const {t} = useLanguage()
  const colorClass =
    theme === 'about' ? 'text-about-accent' : 'text-black'

  if (variant === 'desktop') {
    return (
      <p className={`text-xs tracking-wide lg:text-sm ${colorClass}`}>
        {t('landscapeArchitecture')}
      </p>
    )
  }

  return (
    <footer
      className={`shrink-0 py-5 text-center ${
        theme === 'about' ? '' : 'border-t border-black/5'
      }`}
    >
      <p className={`text-sm tracking-wide ${colorClass}`}>
        {t('landscapeArchitecture')}
      </p>
    </footer>
  )
}
