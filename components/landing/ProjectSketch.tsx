'use client'

import Image from 'next/image'
import {getSanityImageUrl} from '@/sanity/lib/image'
import type {Project} from '@/types/schema'

type ProjectSketchProps = {
  project: Project | null
}

export function ProjectSketch({project}: ProjectSketchProps) {
  const src = getSanityImageUrl(project?.sketchImage, {width: 1400})

  if (!src) {
    return <div className="flex flex-1 items-center justify-center" />
  }

  return (
    <div className="flex flex-1 items-center justify-center px-8 py-4 3xl:px-12 3xl:py-6">
      <div className="relative aspect-[4/3] w-full max-w-md 3xl:max-w-2xl">
        <Image
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
