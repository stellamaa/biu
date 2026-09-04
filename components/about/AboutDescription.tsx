'use client'

import {useCmsText} from '@/lib/i18n/useCmsText'
import type {Locale} from '@/lib/i18n/translations'

type AboutDescriptionProps = {
  sourceText: string | null | undefined
  initialDisplay?: string
  preparedLocale?: Locale
  className?: string
}

export function AboutDescription({
  sourceText,
  initialDisplay,
  preparedLocale,
  className = '',
}: AboutDescriptionProps) {
  const text = useCmsText(sourceText, {initialDisplay, preparedLocale})
  if (!text) return null

  return (
    <p
      className={`whitespace-pre-line text-sm leading-snug text-about-accent lg:text-sm text-sm lg:leading-tight 3xl:text-3xl 3xl:min-w-[2rem] 4xl:text-2xl 4xl:leading-tight ${className}`}
    >
      {text}
    </p>
  )
}
