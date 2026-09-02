import {preload} from 'react-dom'
import {LandingPage} from '@/components/landing/LandingPage'
import {getServerLocale} from '@/lib/i18n/getServerLocale'
import {getLandingProjects} from '@/lib/sanity/getLandingProjects'
import {
  getMobileHeroImageSources,
  getMobileHeroImageUrl,
} from '@/sanity/lib/image'

export const revalidate = 120

export default async function Home() {
  const [locale, projects] = await Promise.all([
    getServerLocale(),
    getLandingProjects(),
  ])

  projects.forEach((project, index) => {
    const sources = getMobileHeroImageSources(project.mainImage)
    if (!sources) return

    preload(sources.src, {
      as: 'image',
      fetchPriority: index === 0 ? 'high' : 'auto',
      ...(index === 0
        ? {imageSrcSet: sources.srcSet, imageSizes: '100vw'}
        : {}),
    })
  })

  return (
    <>
      {projects.map((project, index) => {
        const href = getMobileHeroImageUrl(project.mainImage)
        if (!href) return null

        return (
          <link
            key={project._id}
            rel="preload"
            as="image"
            href={href}
            fetchPriority={index === 0 ? 'high' : 'low'}
          />
        )
      })}
      <LandingPage projects={projects} initialLocale={locale} />
    </>
  )
}
