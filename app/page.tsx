export const dynamic = 'force-dynamic'

import {LandingPage} from '@/components/landing/LandingPage'
import {getServerLocale} from '@/lib/i18n/getServerLocale'
import {sanityClient} from '@/sanity/lib/client'
import {projectsQuery} from '@/sanity/lib/queries'

export default async function Home() {
  const locale = await getServerLocale()
  const projects = await sanityClient.fetch(projectsQuery)

  return (
    <LandingPage projects={projects ?? []} initialLocale={locale} />
  )
}
