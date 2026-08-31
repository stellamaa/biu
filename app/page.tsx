export const dynamic = 'force-dynamic'

import {preload} from 'react-dom'
import {LandingPage} from '@/components/landing/LandingPage'
import {getServerLocale} from '@/lib/i18n/getServerLocale'
import {sanityClient} from '@/sanity/lib/client'
import {getSanityImageUrl, sanityImageWidths} from '@/sanity/lib/image'
import {landingProjectsQuery} from '@/sanity/lib/queries'

export default async function Home() {
  const locale = await getServerLocale()
  const projects = await sanityClient.fetch(landingProjectsQuery)
  const firstProject = projects?.[0] ?? null
  const lcpImageUrl = getSanityImageUrl(firstProject?.mainImage, {
    width: sanityImageWidths.mobileHero,
  })

  if (lcpImageUrl) {
    preload(lcpImageUrl, {
      as: 'image',
      fetchPriority: 'high',
    })
  }

  return (
    <LandingPage projects={projects ?? []} initialLocale={locale} />
  )
}
