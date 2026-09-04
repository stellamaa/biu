'use client'

import type {ReactNode} from 'react'
import {BiuLogo} from '@/components/landing/BiuLogo'
import {LandscapeArchitectureLabel} from '@/components/landing/LandscapeArchitectureLabel'
import {
  desktopLandscapeLabelFixedClass,
  landingAboutMatchLandscapeLabelFixedClass,
} from '@/lib/layout/desktopLandscapeLabel'
import {landingDesktopHeaderLogoTextClass} from '@/lib/layout/landingDesktopTypography'
import {SiteHeader} from '@/components/landing/SiteHeader'

type PageTopBarProps = {
  theme: 'light' | 'about'
  currentPage: 'home' | 'about'
  variant: 'desktop' | 'mobile'
  /** On landing desktop, About + toggle sit on the image column instead. */
  showDesktopNav?: boolean
  logoHref?: string
  /** Match horizontal padding with main content (px-5 lg:px-6). */
  alignWithContent?: boolean
  /** At 3xl only, match about page header sizes and placement. */
  matchAboutHeaderAt3xl?: boolean
  /** Optional fixed top-left content (e.g. project title). */
  topLeft?: ReactNode
  showLandscapeLabel?: boolean
  landscapeLabelPosition?: 'top-left' | 'bottom-left'
}

/** Desktop: BIÚ centered; Landscape Architecture top- or bottom-left. Mobile: SiteHeader. */
export function PageTopBar({
  theme,
  currentPage,
  variant,
  showDesktopNav = true,
  logoHref = '/',
  alignWithContent = false,
  matchAboutHeaderAt3xl = false,
  topLeft,
  showLandscapeLabel = true,
  landscapeLabelPosition = 'top-left',
}: PageTopBarProps) {
  if (variant === 'mobile') {
    return (
      <SiteHeader
        variant="mobile"
        theme={theme}
        currentPage={currentPage}
        logoHref={logoHref}
      />
    )
  }

  const paddingClass = alignWithContent
    ? matchAboutHeaderAt3xl
      ? 'px-5 lg:px-6 3xl:px-14 4xl:px-8'
      : 'px-5 lg:px-6 3xl:px-8'
    : 'px-8 3xl:px-10'

  const bottomLeftClass = alignWithContent
    ? 'left-5 lg:left-6 3xl:left-8'
    : 'left-8 3xl:left-10'

  const topLeftClass = alignWithContent
    ? 'left-5 lg:left-6 3xl:left-8'
    : 'left-8 3xl:left-10'

  const logoClass =
    theme === 'about'
      ? 'text-about-accent 3xl:text-4xl 4xl:text-5xl'
      : matchAboutHeaderAt3xl
        ? landingDesktopHeaderLogoTextClass
        : undefined

  const landscapeFixedClass = matchAboutHeaderAt3xl
    ? landingAboutMatchLandscapeLabelFixedClass
    : desktopLandscapeLabelFixedClass

  const landscapePositionClass =
    landscapeLabelPosition === 'top-left'
      ? landscapeFixedClass
      : `pointer-events-none fixed bottom-8 z-20 hidden lg:block 3xl:bottom-10 4xl:bottom-14 ${bottomLeftClass}`

  return (
    <div className="relative shrink-0 pointer-events-none">
      <div
        className={`pointer-events-auto fixed left-1/2 top-8 z-30 hidden -translate-x-1/2 lg:block 4xl:top-14 ${matchAboutHeaderAt3xl ? '3xl:top-14' : '3xl:top-10'}`}
      >
        <BiuLogo href={logoHref} className={logoClass} />
      </div>

      {topLeft ? (
        <div
          className={`pointer-events-none fixed top-8 z-30 hidden max-w-[min(40vw,24rem)] pr-6 lg:block 4xl:top-14 ${
            matchAboutHeaderAt3xl
              ? 'left-5 lg:left-6 3xl:left-14 3xl:top-20 4xl:left-8'
              : `3xl:top-10 ${topLeftClass}`
          }`}
        >
          {topLeft}
        </div>
      ) : null}

      <div
        className={`shrink-0 pt-8 4xl:pt-14 ${matchAboutHeaderAt3xl ? '3xl:pt-20' : '3xl:pt-10'} ${paddingClass}`}
        aria-hidden
      />

      {showLandscapeLabel ? (
        <div className={landscapePositionClass}>
          <LandscapeArchitectureLabel
            variant="desktop"
            theme={theme}
            matchAboutHeaderAt3xl={matchAboutHeaderAt3xl}
          />
        </div>
      ) : null}

      {showDesktopNav ? (
        <div className="pointer-events-auto">
          <SiteHeader
            variant="desktop"
            theme={theme}
            currentPage={currentPage}
            matchAboutHeaderAt3xl={matchAboutHeaderAt3xl}
          />
        </div>
      ) : null}
    </div>
  )
}
