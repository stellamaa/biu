import {unstable_cache} from 'next/cache'
import {sanityClient} from '@/sanity/lib/client'
import {landingProjectsQuery} from '@/sanity/lib/queries'
import type {LandingProject} from '@/types/schema'

export const getLandingProjects = unstable_cache(
  async (): Promise<LandingProject[]> => {
    const projects = await sanityClient.fetch(landingProjectsQuery)
    return projects ?? []
  },
  ['landing-projects'],
  {revalidate: 120},
)
