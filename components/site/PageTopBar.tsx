'use client'

import {BiuLogo} from '@/components/landing/BiuLogo'
import {LandscapeArchitectureLabel} from '@/components/landing/LandscapeArchitectureLabel'
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
}

/** Matches landing page header layout (landscape label + logo + about/toggle). */
export function PageTopBar({
  theme,
  currentPage,
  variant,
  showDesktopNav = true,
  logoHref,
  alignWithContent = false,
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

  return (
    <div className="relative shrink-0">
      <div className={`flex items-start justify-between pt-8 3xl:pt-10 ${paddingClass}`}>
        <LandscapeArchitectureLabel variant="desktop" theme={theme} />
        <BiuLogo
          href={logoHref}
          className={theme === 'about' ? 'text-about-accent' : undefined}
        />
      </div>
      {showDesktopNav ? (
        <SiteHeader variant="desktop" theme={theme} currentPage={currentPage} />
      ) : null}
    </div>
  )
}
