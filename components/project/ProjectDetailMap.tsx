'use client'

import {SanityImage} from '@/components/SanityImage'
import {getSanityImageUrl, sanityImageWidths} from '@/sanity/lib/image'
import type {PreparedProject} from '@/lib/i18n/prepareProject'

type ProjectDetailMapProps = {
  project: PreparedProject
  variant?: 'default' | 'compact'
  matchHeight?: number
}

export function ProjectDetailMap({
  project,
  variant = 'default',
  matchHeight,
}: ProjectDetailMapProps) {
  const mapSrc = getSanityImageUrl(project.mapImage, {
    width: sanityImageWidths.map,
  })
  const sketchSrc = getSanityImageUrl(project.sketchImage, {
    width: sanityImageWidths.map,
  })
  const src = mapSrc ?? (variant === 'compact' ? sketchSrc : null)
  const alt =
    project.mapImage?.alt ??
    project.sketchImage?.alt ??
    `${project.title ?? 'Project'} map`

  if (!src) return null

  if (variant === 'compact') {
    if (!matchHeight) {
      return (
        <div className="relative mt-8 mr-4 aspect-[3/4] w-[46%] max-w-[175px] shrink-0">
          <SanityImage
            src={src}
            alt={alt}
            fill
            className="object-contain object-top"
            sizes="46vw"
          />
        </div>
      )
    }

    return (
      <div className="mt-4 mr-4 flex w-[54%] max-w-[210px] shrink-0 justify-end self-start">
        <SanityImage
          src={src}
          alt={alt}
          width={sanityImageWidths.map}
          height={sanityImageWidths.map}
          className="block w-auto max-w-full object-contain object-top"
          style={{height: Math.round(matchHeight * 1.25), width: 'auto'}}
          sizes="54vw"
        />
      </div>
    )
  }

  return (
    <div className="relative mt-4 aspect-[16/10] w-full max-w-md 3xl:mt-8 3xl:max-w-2xl">
      <SanityImage
        src={src}
        alt={project.mapImage?.alt ?? `${project.title ?? 'Project'} map`}
        fill
        className="object-contain object-left"
        sizes="(min-width: 2000px) 672px, (min-width: 1024px) 40vw, 80vw"
      />
    </div>
  )
}
