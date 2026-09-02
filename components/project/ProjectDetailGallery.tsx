'use client'

import {useCallback, useEffect, useRef, useState} from 'react'
import {SanityImage} from '@/components/SanityImage'
import {getSanityImageUrl, sanityImageWidths} from '@/sanity/lib/image'
import {
  getGalleryImageAspectRatio,
  getProjectGalleryImages,
} from '@/lib/project/gallery'
import type {PreparedProject} from '@/lib/i18n/prepareProject'

type ProjectDetailGalleryProps = {
  project: PreparedProject
  onActiveIndexChange?: (index: number) => void
}

function getActiveGalleryIndex(
  container: HTMLElement,
  itemCount: number,
  itemRefs: Map<number, HTMLDivElement>,
): number {
  if (itemCount === 0) return 0

  const {scrollTop, clientHeight, scrollHeight} = container
  const maxScroll = scrollHeight - clientHeight

  if (scrollTop <= 1) return 0
  if (maxScroll <= 1 || scrollTop >= maxScroll - 1) return itemCount - 1

  const viewTop = scrollTop
  const viewBottom = scrollTop + clientHeight

  let bestIndex = 0
  let bestVisible = 0

  for (let index = 0; index < itemCount; index++) {
    const element = itemRefs.get(index)
    if (!element) continue

    const top = element.offsetTop
    const bottom = top + element.offsetHeight
    const visibleTop = Math.max(top, viewTop)
    const visibleBottom = Math.min(bottom, viewBottom)
    const visible = Math.max(0, visibleBottom - visibleTop)

    if (visible > bestVisible) {
      bestVisible = visible
      bestIndex = index
    }
  }

  return bestIndex
}

export function ProjectDetailGallery({
  project,
  onActiveIndexChange,
}: ProjectDetailGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const [activeIndex, setActiveIndex] = useState(0)

  const images = getProjectGalleryImages(project)

  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current
    if (!container || images.length === 0) return

    const nextIndex = getActiveGalleryIndex(
      container,
      images.length,
      itemRefs.current,
    )

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex))
  }, [images.length])

  useEffect(() => {
    const container = scrollRef.current
    if (!container || images.length === 0) return

    updateActiveIndex()

    container.addEventListener('scroll', updateActiveIndex, {passive: true})
    window.addEventListener('resize', updateActiveIndex)

    const observer = new ResizeObserver(updateActiveIndex)
    observer.observe(container)
    itemRefs.current.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      container.removeEventListener('scroll', updateActiveIndex)
      window.removeEventListener('resize', updateActiveIndex)
    }
  }, [images, updateActiveIndex])

  useEffect(() => {
    onActiveIndexChange?.(activeIndex)
  }, [activeIndex, onActiveIndexChange])

  if (images.length === 0) {
    return <div className="h-full w-full bg-neutral-100" />
  }

  return (
    <div className="relative h-full min-h-0 lg:absolute lg:inset-0">
      <div
        ref={scrollRef}
        className="h-full snap-y snap-proximity overflow-y-auto overscroll-contain scroll-smooth"
      >
        {images.map((image, index) => {
          const aspectRatio = getGalleryImageAspectRatio(image)
          const displayWidth = sanityImageWidths.desktopGallery
          const displayHeight = Math.round(displayWidth / aspectRatio)
          const src = getSanityImageUrl(image, {
            width: displayWidth,
          })
          if (!src) return null

          return (
            <div
              key={image._key ?? index}
              data-index={index}
              ref={(node) => {
                if (node) itemRefs.current.set(index, node)
                else itemRefs.current.delete(index)
              }}
              className="relative w-full shrink-0 snap-start bg-white"
            >
              <SanityImage
                src={src}
                alt={image.alt ?? `${project.title ?? 'Project'} image ${index + 1}`}
                width={displayWidth}
                height={displayHeight}
                className="h-auto w-full pb-1"
                sizes="45vw"
                priority={index === 0}
                onLoad={updateActiveIndex}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
