'use client'

import {useCmsText} from '@/lib/i18n/useCmsText'

type AboutDescriptionProps = {
  sourceText: string | null | undefined
  initialDisplay?: string
  className?: string
}

export function AboutDescription({
  sourceText,
  initialDisplay,
  className = '',
}: AboutDescriptionProps) {
  const text = useCmsText(sourceText, initialDisplay)
  if (!text) return null

  return (
    <p
      className={`whitespace-pre-line text-sm leading-snug text-about-accent lg:text-sm 2xl:text-lg 3xl:text-3xl 4xl:text-5xl ${className}`}
    >
      {text}
    </p>
  )
}
