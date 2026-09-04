import type {ProjectBySlugQueryResult} from '@/sanity.types'
import {
  translatePortableText,
  type ProjectDescriptionBlock,
} from './portableText'
import type {Locale} from './translations'

export type PreparedProject = NonNullable<ProjectBySlugQueryResult> & {
  descriptionDisplay: ProjectDescriptionBlock[]
  descriptionLocale: Locale
}

export async function prepareProject(
  project: ProjectBySlugQueryResult,
  locale: Locale,
): Promise<PreparedProject | null> {
  if (!project) return null

  const descriptionDisplay = await translatePortableText(
    project.description ?? [],
    locale,
  )

  return {
    ...project,
    descriptionDisplay,
    descriptionLocale: locale,
  }
}
