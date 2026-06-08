'use client'

import Link from 'next/link'
import {BiuLogo} from './BiuLogo'
import {LanguageToggle} from './LanguageToggle'
import {useLanguage} from './LanguageProvider'

type SiteHeaderProps = {
  variant: 'desktop' | 'mobile'
  theme?: 'light' | 'about'
  currentPage?: 'home' | 'about'
}

export function SiteHeader({
  variant,
  theme = 'light',
  currentPage = 'home',
}: SiteHeaderProps) {
  const {t} = useLanguage()
  const isAboutTheme = theme === 'about'
  const textClass = isAboutTheme ? 'text-about-accent' : 'text-black'
  const hoverClass = isAboutTheme ? 'hover:opacity-70' : 'hover:opacity-60'

  const aboutLabel =
    currentPage === 'about' ? (
      <span className={textClass}>{t('about')}</span>
    ) : (
      <Link href="/about" className={`${textClass} ${hoverClass}`}>
        {t('about')}
      </Link>
    )

  if (variant === 'desktop') {
    return (
      <div
        className={`absolute right-6 top-6 z-20 flex items-center gap-6 text-sm ${textClass}`}
      >
        {aboutLabel}
        <LanguageToggle theme={theme} />
      </div>
    )
  }

  return (
    <header className="grid shrink-0 grid-cols-3 items-center px-5 py-4">
      <Link href="/" className={`text-sm ${textClass} ${hoverClass}`}>
        {t('projects')}
      </Link>
      <div className="flex justify-center">
        <BiuLogo
          className={`text-3xl ${isAboutTheme ? 'text-about-accent' : ''}`}
        />
      </div>
      <div className={`flex items-center justify-end gap-3 text-sm ${textClass}`}>
        {aboutLabel}
        <LanguageToggle theme={theme} />
      </div>
    </header>
  )
}
