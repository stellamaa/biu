'use client'

import {LanguageProvider} from '@/components/landing/LanguageProvider'
import type {Locale} from '@/lib/i18n/translations'
import type {ReactNode} from 'react'

type LocaleShellProps = {
  children: ReactNode
  initialLocale: Locale
}

export function LocaleShell({children, initialLocale}: LocaleShellProps) {
  return (
    <LanguageProvider initialLocale={initialLocale}>{children}</LanguageProvider>
  )
}
