'use client'

import {useEffect, useMemo, useState} from 'react'
import {useLanguage} from '@/components/landing/LanguageProvider'
import {
  clonePortableText,
  type ProjectDescriptionBlock,
} from './portableText'
import type {Locale} from './translations'

const translationCache = new Map<string, ProjectDescriptionBlock[]>()

function cacheKey(blocks: ProjectDescriptionBlock[], locale: Locale) {
  return `${locale}:${JSON.stringify(blocks)}`
}

async function fetchPortableTranslation(
  blocks: ProjectDescriptionBlock[],
  locale: Locale,
): Promise<ProjectDescriptionBlock[]> {
  const key = cacheKey(blocks, locale)
  const cached = translationCache.get(key)
  if (cached) return cached

  const response = await fetch('/api/translate-portable', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({blocks, locale}),
    credentials: 'same-origin',
  })

  if (!response.ok) return blocks

  const data = (await response.json()) as {blocks?: ProjectDescriptionBlock[]}
  const translated = data.blocks ?? blocks
  translationCache.set(key, translated)
  return translated
}

function resolveDisplay(
  source: ProjectDescriptionBlock[],
  locale: Locale,
  initialDisplay?: ProjectDescriptionBlock[],
  preparedLocale?: Locale,
): ProjectDescriptionBlock[] {
  if (!source.length) return []

  if (locale === 'es') return source

  const cached = translationCache.get(cacheKey(source, 'en'))
  if (cached) return cached

  if (preparedLocale === 'en' && initialDisplay?.length) {
    return initialDisplay
  }

  return source
}

type UseCmsPortableTextOptions = {
  initialDisplay?: ProjectDescriptionBlock[]
  preparedLocale?: Locale
}

/** CMS portable text is authored in Spanish; English is fetched on demand. */
export function useCmsPortableText(
  sourceBlocks: ProjectDescriptionBlock[] | null | undefined,
  options: UseCmsPortableTextOptions = {},
) {
  const {initialDisplay, preparedLocale} = options
  const {locale} = useLanguage()
  const source = useMemo(
    () => clonePortableText(sourceBlocks ?? []),
    [sourceBlocks],
  )
  const [display, setDisplay] = useState(() =>
    resolveDisplay(source, locale, initialDisplay, preparedLocale),
  )

  useEffect(() => {
    if (!source.length) {
      setDisplay([])
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

    if (preparedLocale === 'en' && initialDisplay?.length) {
      translationCache.set(key, initialDisplay)
      setDisplay(initialDisplay)
      return
    }

    let cancelled = false
    void fetchPortableTranslation(source, 'en').then((blocks) => {
      if (!cancelled) setDisplay(blocks)
    })

    return () => {
      cancelled = true
    }
  }, [source, locale, initialDisplay, preparedLocale])

  return display
}
