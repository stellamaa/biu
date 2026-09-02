import {getMobileHeroImageSources} from '@/sanity/lib/image'
import type {LandingProject} from '@/types/schema'

type MobileLandingHeroProject = Pick<
  LandingProject,
  '_id' | 'title' | 'mainImage'
>

type MobileLandingHeroImagesProps = {
  projects: MobileLandingHeroProject[]
}

export function MobileLandingHeroImages({
  projects,
}: MobileLandingHeroImagesProps) {
  return (
    <>
      {projects.map((project, index) => {
        const sources = getMobileHeroImageSources(project.mainImage)
        if (!sources) return null

        return (
          <img
            key={project._id}
            data-hero-index={index}
            src={sources.src}
            srcSet={sources.srcSet}
            sizes="100vw"
            alt={project.mainImage?.alt ?? project.title ?? 'Project image'}
            loading="eager"
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding={index === 0 ? 'sync' : 'async'}
            className="mobile-hero-layer absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ease-in-out"
            style={{opacity: index === 0 ? 1 : 0}}
          />
        )
      })}
    </>
  )
}
