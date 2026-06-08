'use client'

import Image from 'next/image'
import {getSanityImageUrl} from '@/sanity/lib/image'
import type {Project} from '@/types/schema'

type ProjectSketchProps = {
  project: Project | null
}

export function ProjectSketch({project}: ProjectSketchProps) {
  const src = getSanityImageUrl(project?.sketchImage, {width: 900})

  if (!src) {
    return <div className="flex flex-1 items-center justify-center" />
  }

  return (
    <div className="flex flex-1 items-center justify-center px-8 py-4">
      <div className="relative aspect-[4/3] w-full max-w-md">
        <Image
          key={project?._id ?? 'empty'}
          src={src}
          alt={project?.sketchImage?.alt ?? `${project?.title ?? 'Project'} sketch`}
          fill
          className="object-contain transition-opacity duration-500"
          sizes="45vw"
          priority
        />
      </div>
    </div>
  )
}
