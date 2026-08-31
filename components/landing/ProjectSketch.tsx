'use client'

import {SanityImage} from '@/components/SanityImage'
import {getSanityImageUrl, sanityImageWidths} from '@/sanity/lib/image'
import type {LandingProject} from '@/types/schema'

type ProjectSketchProps = {
  project: LandingProject | null
}

export function ProjectSketch({project}: ProjectSketchProps) {
  const src = getSanityImageUrl(project?.sketchImage, {
    width: sanityImageWidths.sketch,
  })

  if (!src) {
    return <div className="shrink-0" aria-hidden />
  }

  return (
    <div className="flex shrink-0 justify-center px-5 pt-6 lg:px-6 lg:pt-10 3xl:px-8 3xl:pt-12">
      <div className="relative aspect-[4/3] w-full max-w-[min(100%,360px)] 3xl:max-w-2xl">
        <SanityImage
          key={project?._id ?? 'empty'}
          src={src}
          alt={project?.sketchImage?.alt ?? `${project?.title ?? 'Project'} sketch`}
          fill
          className="object-contain transition-opacity duration-500"
          sizes="(min-width: 2000px) 560px, 45vw"
          priority
        />
      </div>
    </div>
  )
}
