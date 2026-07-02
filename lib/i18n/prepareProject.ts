import type {ProjectByIdQueryResult} from '@/sanity.types'
import {translateText} from './translateContent'
import type {Locale} from './translations'

export type PreparedProject = NonNullable<ProjectByIdQueryResult> & {
  descriptionDisplay: string
}

export async function prepareProject(
  project: ProjectByIdQueryResult,
  locale: Locale,
): Promise<PreparedProject | null> {
  if (!project) return null

  const descriptionDisplay = await translateText(project.description, locale)

  return {
    ...project,
    descriptionDisplay,
  }
}
