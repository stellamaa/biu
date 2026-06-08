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
}

/** Matches landing page header layout (landscape label + logo + about/toggle). */
export function PageTopBar({
  theme,
  currentPage,
  variant,
  showDesktopNav = true,
}: PageTopBarProps) {
  if (variant === 'mobile') {
    return <SiteHeader variant="mobile" theme={theme} currentPage={currentPage} />
  }

  return (
    <div className="relative shrink-0">
      <div className="flex items-start justify-between px-8 pt-8">
        <LandscapeArchitectureLabel variant="desktop" theme={theme} />
        <BiuLogo
          className={theme === 'about' ? 'text-about-accent' : undefined}
        />
      </div>
      {showDesktopNav ? (
        <SiteHeader variant="desktop" theme={theme} currentPage={currentPage} />
      ) : null}
    </div>
  )
}
