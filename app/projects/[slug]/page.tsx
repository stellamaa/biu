export const dynamic = 'force-dynamic'

import {notFound} from 'next/navigation'
import {ProjectDetailView} from '@/components/project/ProjectDetailView'
import {getServerLocale} from '@/lib/i18n/getServerLocale'
import {prepareProject} from '@/lib/i18n/prepareProject'
import {sanityClient} from '@/sanity/lib/client'
import {projectBySlugQuery} from '@/sanity/lib/queries'

type ProjectPageProps = {
  params: Promise<{slug: string}>
}

export default async function ProjectPage({params}: ProjectPageProps) {
  const {slug} = await params
  const locale = await getServerLocale()
  const project = await sanityClient.fetch(projectBySlugQuery, {slug})
  const prepared = await prepareProject(project, locale)

  if (!prepared) notFound()

  return <ProjectDetailView project={prepared} initialLocale={locale} />
}
