'use client'

import {landingDesktopBodyTextClass} from '@/lib/layout/landingDesktopTypography'
import type {ReactNode} from 'react'
import Link from 'next/link'
import type {TranslationKey} from '@/lib/i18n/translations'
import {translations} from '@/lib/i18n/translations'
import {BiuLogo} from './BiuLogo'
import {LanguageToggle} from './LanguageToggle'
import {useOptionalLanguage} from './LanguageProvider'

type SiteHeaderProps = {
  variant: 'desktop' | 'mobile'
  theme?: 'light' | 'about'
  currentPage?: 'home' | 'about'
  logoHref?: string
  /** Mobile: optional top-left slot (e.g. project info toggle). */
  mobileTopLeft?: ReactNode
  /** Mobile: show About in the top-left instead of top-right. */
  mobileAboutOnLeft?: boolean
  /** Mobile: hide About link entirely. */
  showMobileAbout?: boolean
  labels?: Record<TranslationKey, string>
}

export function SiteHeader({
  variant,
  theme = 'light',
  currentPage = 'home',
  logoHref = '/',
  mobileTopLeft,
  mobileAboutOnLeft = false,
  showMobileAbout = true,
  labels,
}: SiteHeaderProps) {
  const language = useOptionalLanguage()
  const t = (key: TranslationKey) =>
    labels?.[key] ?? language?.t(key) ?? translations.en[key]
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
      <Link href="/about" className={`${textClass} ${hoverClass}`}>
        {t('about')}
      </Link>
    )
  }

  if (variant === 'desktop') {
    return (
      <div
        className={`pointer-events-auto absolute right-6 top-8 z-30 flex items-center gap-6 font-light leading-none 3xl:right-8 3xl:top-10 3xl:gap-8 4xl:top-14 ${landingDesktopBodyTextClass} ${textClass}`}
      >
        {renderAboutLabel()}
        <LanguageToggle theme={theme} />
      </div>
    )
  }

  return (
    <header className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center px-5 pt-8 pb-4">
      <div className="flex shrink-0 items-center justify-self-start text-[12px] font-light leading-none">
        {mobileTopLeft ??
          (mobileAboutOnLeft && showMobileAbout ? renderAboutLabel() : null)}
      </div>

      <div className="justify-self-center font-light">
        <BiuLogo
          href={logoHref}
          className={`text-2xl ${isAboutTheme ? 'text-about-accent' : ''}`}
        />
      </div>

      <div className="flex shrink-0 items-center justify-self-end gap-2 text-[12px] font-light leading-none">
        {showMobileAbout && !mobileAboutOnLeft ? renderAboutLabel() : null}
        <LanguageToggle theme={theme} />
      </div>
    </header>
  )
}
