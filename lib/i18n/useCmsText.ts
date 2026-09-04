'use client'

import {useEffect, useState} from 'react'
import {useLanguage} from '@/components/landing/LanguageProvider'
import type {Locale} from './translations'

const translationCache = new Map<string, string>()

function cacheKey(text: string, locale: Locale) {
  return `${locale}:${text}`
}

async function fetchTranslation(text: string, locale: Locale): Promise<string> {
  const key = cacheKey(text, locale)
  const cached = translationCache.get(key)
  if (cached) return cached

  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text, locale}),
    credentials: 'same-origin',
  })

  if (!response.ok) return text

  const data = (await response.json()) as {text?: string}
  const translated = data.text ?? text
  translationCache.set(key, translated)
  return translated
}

function resolveDisplay(
  source: string,
  locale: Locale,
  initialDisplay?: string,
  preparedLocale?: Locale,
): string {
  if (!source) return ''

  if (locale === 'es') return source

  const cached = translationCache.get(cacheKey(source, 'en'))
  if (cached) return cached

  if (preparedLocale === 'en' && initialDisplay) return initialDisplay

  return source
}

type UseCmsTextOptions = {
  initialDisplay?: string
  preparedLocale?: Locale
}

/** CMS copy is authored in Spanish; English is fetched on demand. */
export function useCmsText(
  sourceText: string | null | undefined,
  initialDisplayOrOptions?: string | UseCmsTextOptions,
  preparedLocaleLegacy?: Locale,
) {
  const options: UseCmsTextOptions =
    typeof initialDisplayOrOptions === 'string'
      ? {
          initialDisplay: initialDisplayOrOptions,
          preparedLocale: preparedLocaleLegacy,
        }
      : (initialDisplayOrOptions ?? {})

  const {initialDisplay, preparedLocale} = options
  const {locale} = useLanguage()
  const source = sourceText?.trim() ?? ''
  const [display, setDisplay] = useState(() =>
    resolveDisplay(source, locale, initialDisplay, preparedLocale),
  )

  useEffect(() => {
    if (!source) {
      setDisplay('')
      return
    }

    if (locale === 'es') {
      setDisplay(source)
      return
    }

    const key = cacheKey(source, 'en')
    const cached = translationCache.get(key)
    if (cached) {
      setDisplay(cached)
      return
    }

    if (preparedLocale === 'en' && initialDisplay) {
      translationCache.set(key, initialDisplay)
      setDisplay(initialDisplay)
      return
    }

    let cancelled = false
    void fetchTranslation(source, 'en').then((text) => {
      if (!cancelled) setDisplay(text)
    })

    return () => {
      cancelled = true
    }
  }, [source, locale, initialDisplay, preparedLocale])

  return display
}
