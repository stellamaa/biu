'use client'

import Image from 'next/image'
import {getSanityImageUrl} from '@/sanity/lib/image'
import type {Project} from '@/types/schema'

type ProjectHeroImageProps = {
  project: Project | null
  variant: 'desktop' | 'mobile'
  priority?: boolean
}

export function ProjectHeroImage({
  project,
  variant,
  priority = false,
}: ProjectHeroImageProps) {
  const src = getSanityImageUrl(project?.mainImage, {
    width: variant === 'desktop' ? 2000 : 1200,
  })

  if (!src) {
    return (
      <div
        className={
          variant === 'desktop'
            ? 'h-full w-full bg-neutral-100'
            : 'aspect-[4/5] w-full bg-neutral-100'
        }
      />
    )
  }

  if (variant === 'desktop') {
    return (
      <div className="relative h-full w-full">
        <Image
          key={project?._id ?? 'empty'}
          src={src}
          alt={project?.mainImage?.alt ?? project?.title ?? 'Project image'}
          fill
          priority={priority}
          className="object-cover transition-opacity duration-500"
          sizes="50vw"
        />
      </div>
    )
  }

  return (
    <div className="relative aspect-[4/5] w-full shrink-0">
      <Image
        key={project?._id ?? 'empty'}
        src={src}
        alt={project?.mainImage?.alt ?? project?.title ?? 'Project image'}
        fill
        priority={priority}
        className="object-cover transition-opacity duration-500"
        sizes="100vw"
      />
    </div>
  )
}
