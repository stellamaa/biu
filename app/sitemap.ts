import type {MetadataRoute} from 'next'
import {SITE_URL} from '@/lib/site'
import {sanityClient} from '@/sanity/lib/client'

type ProjectSlug = {
  slug: string
  _updatedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await sanityClient.fetch<ProjectSlug[]>(
    `*[_type == "project" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }`,
  )

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: project._updatedAt
      ? new Date(project._updatedAt)
      : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectEntries,
  ]
}
