import type {AboutPageQueryResult} from '@/sanity.types'
import {translateText} from './translateContent'
import type {Locale} from './translations'

export type PreparedAboutPage = NonNullable<AboutPageQueryResult> & {
  biuDescriptionDisplay: string
}

export async function prepareAboutPage(
  about: AboutPageQueryResult,
  locale: Locale,
): Promise<PreparedAboutPage | null> {
  if (!about) return null

  const biuDescriptionDisplay = await translateText(about.biuDescription, locale)

  return {
    ...about,
    biuDescriptionDisplay,
  }
}
