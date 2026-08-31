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

/** CMS copy is authored in Spanish; English is fetched on demand. */
export function useCmsText(
  sourceText: string | null | undefined,
  initialDisplay?: string,
) {
  const {locale} = useLanguage()
  const source = sourceText?.trim() ?? ''
  const [display, setDisplay] = useState(
    () => initialDisplay ?? sourceText ?? '',
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

    const key = cacheKey(source, locale)
    const cached = translationCache.get(key)
    if (cached) {
      setDisplay(cached)
      return
    }

    if (initialDisplay) {
      translationCache.set(cacheKey(source, 'en'), initialDisplay)
      setDisplay(initialDisplay)
    }

    let cancelled = false
    void fetchTranslation(source, locale).then((text) => {
      if (!cancelled) setDisplay(text)
    })

    return () => {
      cancelled = true
    }
  }, [source, locale, initialDisplay, sourceText])

  return display
}
