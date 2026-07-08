'use client'

import {useCallback, useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import {useLanguage} from '@/components/landing/LanguageProvider'
import {getSanityImageUrl} from '@/sanity/lib/image'
import {getProjectGalleryImages} from '@/lib/project/gallery'
import type {PreparedProject} from '@/lib/i18n/prepareProject'

type ProjectDetailGalleryProps = {
  project: PreparedProject
}

export function ProjectDetailGallery({project}: ProjectDetailGalleryProps) {
  const {t} = useLanguage()
  const scrollRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const [activeIndex, setActiveIndex] = useState(0)

  const images = getProjectGalleryImages(project)

  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current
    if (!container || images.length === 0) return

    const containerTop = container.getBoundingClientRect().top
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    images.forEach((_, index) => {
      const element = itemRefs.current.get(index)
      if (!element) return

      const distance = Math.abs(element.getBoundingClientRect().top - containerTop)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }, [images])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    updateActiveIndex()
    container.addEventListener('scroll', updateActiveIndex, {passive: true})
    window.addEventListener('resize', updateActiveIndex)

    return () => {
      container.removeEventListener('scroll', updateActiveIndex)
      window.removeEventListener('resize', updateActiveIndex)
    }
  }, [updateActiveIndex])

  if (images.length === 0) {
    return <div className="h-full w-full bg-neutral-100" />
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white lg:absolute lg:inset-0">
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 snap-y snap-proximity overflow-y-auto overscroll-contain scroll-smooth"
      >
        {images.map((image, index) => {
          const src = getSanityImageUrl(image, {width: 1600})
          if (!src) return null

          return (
            <div
              key={image._key ?? index}
              ref={(node) => {
                if (node) itemRefs.current.set(index, node)
                else itemRefs.current.delete(index)
              }}
              className="relative min-h-full shrink-0 snap-start lg:h-[80vh] lg:min-h-[80vh]"
            >
              <Image
                src={src}
                alt={image.alt ?? `${project.title ?? 'Project'} image ${index + 1}`}
                fill
                className="object-cover"
                sizes="45vw"
                priority={index === 0}
              />
            </div>
          )
        })}
      </div>

      <div className="flex shrink-0 items-center justify-end bg-white px-6 pb-2 pt-3 3xl:px-8 3xl:pb-4 3xl:pt-4">
        <p className="text-xs text-neutral-400 lg:text-sm 3xl:text-base">
          {activeIndex + 1}/{images.length} {t('images')}
        </p>
      </div>
    </div>
  )
}
