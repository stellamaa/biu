'use client'

import type {Locale} from '@/lib/i18n/translations'
import type {PreparedAboutPage} from '@/lib/i18n/prepareAboutPage'
import {AboutPageContent} from './AboutPageContent'

type AboutViewProps = {
  about: PreparedAboutPage | null
}

export function AboutView({about}: AboutViewProps) {
  return (
    <main className="flex min-h-0 flex-1 flex-col bg-about-bg">
      <AboutPageContent about={about} />
    </main>
  )
}
