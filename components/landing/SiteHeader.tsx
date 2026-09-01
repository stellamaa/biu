'use client'

import Link from 'next/link'
import {BiuLogo} from './BiuLogo'
import {LanguageToggle} from './LanguageToggle'
import {useLanguage} from './LanguageProvider'

type SiteHeaderProps = {
  variant: 'desktop' | 'mobile'
  theme?: 'light' | 'about'
  currentPage?: 'home' | 'about'
  logoHref?: string
}

export function SiteHeader({
  variant,
  theme = 'light',
  currentPage = 'home',
  logoHref,
}: SiteHeaderProps) {
  const {t} = useLanguage()
  const isAboutTheme = theme === 'about'
  const textClass = isAboutTheme ? 'text-about-accent' : 'text-black'
  const hoverClass = isAboutTheme ? 'hover:opacity-70' : 'hover:opacity-60'

  const renderAboutLabel = () => {
    if (currentPage === 'about') {
      return <span className={textClass}>{t('about')}</span>
    }

    if (variant === 'desktop') {
      return (
        <Link
          href="/about"
          className={`text-white mix-blend-difference ${hoverClass}`}
        >
          {t('about')}
        </Link>
      )
    }

    return (
      <Link
        href="/about"
        className={`text-[#707070] ${hoverClass}`}
      >
        {t('about')}
      </Link>
    )
  }

  if (variant === 'desktop') {
    return (
      <div
        className={`absolute right-6 top-8 z-20 flex items-center gap-6 text-[12px] font-light leading-none 3xl:text-lg 3xl:right-8 3xl:top-10 3xl:gap-8 4xl:top-14 ${textClass}`}
      >
        {renderAboutLabel()}
        <LanguageToggle theme={theme} />
      </div>
    )
  }

  return (
    <header className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center px-5 pt-8 pb-4">
      <Link
        href="/"
        className={`justify-self-start text-xs md:text-sm ${textClass} ${hoverClass}`}
      >
        {t('projects')}
      </Link>

      <div className="justify-self-center">
        <BiuLogo
          href={logoHref}
          className={`text-2xl ${isAboutTheme ? 'text-about-accent' : ''}`}
        />
      </div>

      <div className="flex shrink-0 items-center justify-self-end gap-2 text-[12px] font-light leading-none">
        {renderAboutLabel()}
        <LanguageToggle theme={theme} />
      </div>
    </header>
  )
}
