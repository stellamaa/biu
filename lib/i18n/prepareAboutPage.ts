import type {AboutPageQueryResult} from '@/sanity.types'
import {translateText} from './translateContent'
import type {Locale} from './translations'

export type PreparedAboutPage = NonNullable<AboutPageQueryResult> & {
  biuDescriptionDisplay: string
  basiDescriptionDisplay: string
}

export async function prepareAboutPage(
  about: AboutPageQueryResult,
  locale: Locale,
): Promise<PreparedAboutPage | null> {
  if (!about) return null

  const [biuDescriptionDisplay, basiDescriptionDisplay] = await Promise.all([
    translateText(about.biuDescription, locale),
    translateText(about.basiDescription, locale),
  ])

  return {
    ...about,
    biuDescriptionDisplay,
    basiDescriptionDisplay,
  }
}
