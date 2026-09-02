'use client'

import Link from 'next/link'
import {SanityImage} from '@/components/SanityImage'
import {getProjectPath} from '@/lib/project/url'
import {getSanityImageUrl, sanityImageWidths} from '@/sanity/lib/image'
import type {LandingProject} from '@/types/schema'

type ProjectHeroImageProps = {
  project: LandingProject | null
  variant: 'desktop' | 'mobile'
  priority?: boolean
  /** Fill parent when stacked for crossfade overlays */
  fillParent?: boolean
}

export function ProjectHeroImage({
  project,
  variant,
  priority = false,
  fillParent = false,
}: ProjectHeroImageProps) {
  const src = getSanityImageUrl(project?.mainImage, {
    width:
      variant === 'desktop'
        ? sanityImageWidths.desktopHero
        : sanityImageWidths.mobileHero,
  })

  if (!src) {
    return (
      <div
        className={
          variant === 'desktop'
            ? 'h-full w-full bg-neutral-100'
            : fillParent
              ? 'h-full w-full bg-neutral-100'
              : 'aspect-[4/5] w-full bg-neutral-100'
        }
      />
    )
  }

  if (variant === 'desktop') {
    const image = (
      <SanityImage
        key={project?._id ?? 'empty'}
        src={src}
        alt={project?.mainImage?.alt ?? project?.title ?? 'Project image'}
        fill
        priority={priority}
        className="object-cover"
        sizes="50vw"
      />
    )

    return (
      <div className="relative h-full w-full">
        {project ? (
          <Link
            href={getProjectPath(project)}
            className="relative block h-full w-full"
            aria-label={project.title ?? 'View project'}
          >
            {image}
          </Link>
        ) : (
          image
        )}
      </div>
    )
  }

  return (
    <div
      className={
        fillParent
          ? 'relative h-full w-full'
          : 'relative aspect-[4/5] w-full shrink-0'
      }
    >
      <SanityImage
        key={project?._id ?? 'empty'}
        src={src}
        alt={project?.mainImage?.alt ?? project?.title ?? 'Project image'}
        fill
        priority={priority}
        className="object-cover"
        sizes="100vw"
      />
    </div>
  )
}
