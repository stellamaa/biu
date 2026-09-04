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
      <header className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center px-5 py-8 lg:hidden">
        <Link
          href="/"
          className="justify-self-start text-sm text-about-accent hover:opacity-70"
        >
          {t('projects')}
        </Link>
        <Link href="/" className="justify-self-center hover:opacity-80">
          <BiuLogo className="text-[1.6rem] text-about-accent" />
        </Link>
        <div className="flex shrink-0 items-center justify-self-end gap-2 text-[12px] font-light leading-none text-about-accent">
          <span>{t('about')}</span>
          <LanguageToggle theme="about" />
        </div>
      </header>

      <header className="relative hidden shrink-0 lg:grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative px-6 pt-8 3xl:px-14 3xl:pt-20 4xl:px-14 4xl:pt-16">
          <LandscapeArchitectureLabel variant="desktop" theme="about" />
          <div className="fixed left-1/2 top-8 z-30 hidden -translate-x-1/2 lg:block 3xl:top-14 4xl:top-16">
            <Link href="/" className="hover:opacity-80">
              <BiuLogo className="text-about-accent 3xl:text-6xl 4xl:text-5xl" />
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute right-6 top-6 z-20 flex items-center gap-6 text-sm text-about-accent 2xl:text-sm 3xl:right-14 3xl:top-19 3xl:gap-10 3xl:text-3xl 4xl:right-14 4xl:top-14 4xl:gap-10 4xl:text-3xl">
            <span>{t('about')}</span>
            <LanguageToggle theme="about" />
          </div>
        </div>
      </header>
    </>
  )
}
