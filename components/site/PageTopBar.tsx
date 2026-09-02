'use client'

import type {ReactNode} from 'react'
import {BiuLogo} from '@/components/landing/BiuLogo'
import {LandscapeArchitectureLabel} from '@/components/landing/LandscapeArchitectureLabel'
import {desktopLandscapeLabelFixedClass} from '@/lib/layout/desktopLandscapeLabel'
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
    ? 'px-5 lg:px-6 3xl:px-8'
    : 'px-8 3xl:px-10'

  const bottomLeftClass = alignWithContent
    ? 'left-5 lg:left-6 3xl:left-8'
    : 'left-8 3xl:left-10'

  const topLeftClass = alignWithContent
    ? 'left-5 lg:left-6 3xl:left-8'
    : 'left-8 3xl:left-10'

  const logoClass =
    theme === 'about' ? 'text-about-accent 3xl:text-4xl 4xl:text-5xl' : undefined

  const landscapePositionClass =
    landscapeLabelPosition === 'top-left'
      ? desktopLandscapeLabelFixedClass
      : `pointer-events-none fixed bottom-8 z-20 hidden lg:block 3xl:bottom-10 4xl:bottom-14 ${bottomLeftClass}`

  return (
    <div className="relative shrink-0">
      <div className="fixed left-1/2 top-8 z-30 hidden -translate-x-1/2 lg:block 3xl:top-10 4xl:top-14">
        <BiuLogo href={logoHref} className={logoClass} />
      </div>

      {topLeft ? (
        <div
          className={`fixed top-8 z-30 hidden max-w-[min(40vw,24rem)] pr-6 lg:block 3xl:top-10 4xl:top-14 ${topLeftClass}`}
        >
          {topLeft}
        </div>
      ) : null}

      <div
        className={`shrink-0 pt-8 3xl:pt-10 4xl:pt-14 ${paddingClass}`}
        aria-hidden
      />

      {showLandscapeLabel ? (
        <div className={landscapePositionClass}>
          <LandscapeArchitectureLabel variant="desktop" theme={theme} />
        </div>
      ) : null}

      {showDesktopNav ? (
        <SiteHeader variant="desktop" theme={theme} currentPage={currentPage} />
      ) : null}
    </div>
  )
}
