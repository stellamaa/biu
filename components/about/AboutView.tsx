'use client'

import {LanguageProvider} from '@/components/landing/LanguageProvider'
import type {Locale} from '@/lib/i18n/translations'
import type {PreparedAboutPage} from '@/lib/i18n/prepareAboutPage'
import {AboutPageContent} from './AboutPageContent'

type AboutViewProps = {
  about: PreparedAboutPage | null
  initialLocale: Locale
}

export function AboutView({about, initialLocale}: AboutViewProps) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <main>
        <AboutPageContent about={about} />
      </main>
    </LanguageProvider>
  )
}
