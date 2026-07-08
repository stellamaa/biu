'use client'

import Image from 'next/image'
import {getSanityImageUrl} from '@/sanity/lib/image'
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
  const mapSrc = getSanityImageUrl(project.mapImage, {width: 1200})
  const sketchSrc = getSanityImageUrl(project.sketchImage, {width: 1200})
  const src = mapSrc ?? (variant === 'compact' ? sketchSrc : null)
  const alt =
    project.mapImage?.alt ??
    project.sketchImage?.alt ??
    `${project.title ?? 'Project'} map`

  if (!src) return null

  if (variant === 'compact') {
    if (!matchHeight) {
      return (
        <div className="relative aspect-[3/4] w-[42%] max-w-[160px] shrink-0">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain object-top"
            sizes="42vw"
          />
        </div>
      )
    }

    return (
      <div className="flex w-[42%] max-w-[160px] shrink-0 justify-end">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={800}
          className="block w-auto max-w-full object-contain object-top"
          style={{height: matchHeight, width: 'auto'}}
          sizes="42vw"
        />
      </div>
    )
  }

  return (
    <div className="relative mt-8 aspect-[16/10] w-full max-w-md 3xl:mt-12 3xl:max-w-2xl">
      <Image
        src={src}
        alt={project.mapImage?.alt ?? `${project.title ?? 'Project'} map`}
        fill
        className="object-contain object-left"
        sizes="(min-width: 2000px) 672px, (min-width: 1024px) 40vw, 80vw"
      />
    </div>
  )
}
