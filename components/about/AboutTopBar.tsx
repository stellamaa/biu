'use client'

import Link from 'next/link'
import {BiuLogo} from '@/components/landing/BiuLogo'
import {LandscapeArchitectureLabel} from '@/components/landing/LandscapeArchitectureLabel'
import {LanguageToggle} from '@/components/landing/LanguageToggle'
import {useLanguage} from '@/components/landing/LanguageProvider'

export function AboutTopBar() {
  const {t} = useLanguage()

  return (
    <header className="grid shrink-0 grid-cols-3 items-center px-3 py-7 lg:py-8 lg:pl-5 lg:pr-10 3xl:py-10 3xl:pl-8 3xl:pr-12">
      <div className="lg:hidden">
        <Link href="/" className="text-sm text-about-accent hover:opacity-70 3xl:text-lg">
          {t('projects')}
        </Link>
      </div>
      <div className="hidden lg:block">
        <LandscapeArchitectureLabel variant="desktop" theme="about" />
      </div>
      <div className="flex justify-center">
        <Link href="/" className="hover:opacity-80">
          <BiuLogo className="text-[1.6rem] text-about-accent lg:text-[1.75rem] 3xl:text-3xl" />
        </Link>
      </div>
      <div className="flex items-center justify-end gap-3 text-sm text-about-accent lg:gap-6 3xl:gap-8 3xl:text-lg">
        <span>{t('about')}</span>
        <LanguageToggle theme="about" />
      </div>
    </header>
  )
}
