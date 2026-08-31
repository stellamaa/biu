export const dynamic = 'force-dynamic'

import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {ProjectDetailView} from '@/components/project/ProjectDetailView'
import {getServerLocale} from '@/lib/i18n/getServerLocale'
import {prepareProject} from '@/lib/i18n/prepareProject'
import {sanityClient} from '@/sanity/lib/client'
import {projectBySlugQuery} from '@/sanity/lib/queries'

type ProjectPageProps = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const {slug} = await params
  const project = await sanityClient.fetch(projectBySlugQuery, {slug})

  if (!project) {
    return {title: 'Project — BIÚ'}
  }

  const title = `${project.title} — BIÚ`
  const description =
    project.location && project.year
      ? `${project.title}, ${project.location}, ${project.year}`
      : project.title

  return {
    title,
    description,
  }
}

export default async function ProjectPage({params}: ProjectPageProps) {
  const {slug} = await params
  const locale = await getServerLocale()
  const project = await sanityClient.fetch(projectBySlugQuery, {slug})
  const prepared = await prepareProject(project, locale)

  if (!prepared) notFound()

  return <ProjectDetailView project={prepared} initialLocale={locale} />
}
