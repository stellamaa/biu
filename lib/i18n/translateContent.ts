import {createHash} from 'crypto'
import {unstable_cache} from 'next/cache'
import type {Locale} from './translations'

async function translateEsToEn(text: string): Promise<string> {
  const {translate} = await import('google-translate-api-x')
  const result = await translate(text, {from: 'es', to: 'en'})
  return result.text
}

function cacheKey(text: string): string {
  return createHash('sha256').update(text).digest('hex')
}

const getCachedEnglish = (text: string) =>
  unstable_cache(() => translateEsToEn(text), ['translate-en', cacheKey(text)], {
    revalidate: 60 * 60 * 24 * 7,
  })()

/** CMS copy is authored in Spanish; English is generated when needed. */
export async function translateText(
  text: string | null | undefined,
  locale: Locale,
): Promise<string> {
  if (!text?.trim()) return ''
  if (locale === 'es') return text

  try {
    return await getCachedEnglish(text)
  } catch {
    return text
  }
}
