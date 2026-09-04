import type {ProjectBySlugQueryResult} from '@/sanity.types'
import {translateText} from './translateContent'
import type {Locale} from './translations'

export type PreparedProject = NonNullable<ProjectBySlugQueryResult> & {
  descriptionDisplay: string
  descriptionLocale: Locale
}

export async function prepareProject(
  project: ProjectBySlugQueryResult,
  locale: Locale,
): Promise<PreparedProject | null> {
  if (!project) return null

  const descriptionDisplay = await translateText(project.description, locale)

  return {
    ...project,
    descriptionDisplay,
    descriptionLocale: locale,
  }
}
