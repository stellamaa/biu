'use client'

import Link from 'next/link'
import {BiuLogo} from '@/components/landing/BiuLogo'
import {LandscapeArchitectureLabel} from '@/components/landing/LandscapeArchitectureLabel'
import {LanguageToggle} from '@/components/landing/LanguageToggle'
import {useLanguage} from '@/components/landing/LanguageProvider'

export function AboutTopBar() {
  const {t} = useLanguage()

  return (
    <>
      <header className="grid shrink-0 grid-cols-3 items-center px-4 py-7 lg:hidden">
        <Link href="/" className="text-sm text-about-accent hover:opacity-70">
          {t('projects')}
        </Link>
        <div className="flex justify-center">
          <Link href="/" className="hover:opacity-80">
            <BiuLogo className="text-[1.6rem] text-about-accent" />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-3 text-sm text-about-accent">
          <span>{t('about')}</span>
          <LanguageToggle theme="about" />
        </div>
      </header>

      <header className="relative hidden shrink-0 lg:grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex items-start justify-between px-6 pt-8 3xl:px-8 3xl:pt-10">
          <LandscapeArchitectureLabel variant="desktop" theme="about" />
          <Link href="/" className="hover:opacity-80">
            <BiuLogo className="text-about-accent" />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute right-6 top-6 z-20 flex items-center gap-6 text-sm text-about-accent 3xl:right-8 3xl:top-8 3xl:gap-8 3xl:text-lg">
            <span>{t('about')}</span>
            <LanguageToggle theme="about" />
          </div>
        </div>
      </header>
    </>
  )
}
