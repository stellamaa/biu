'use client'

import Image from 'next/image'
import {useCallback, useRef, useState} from 'react'
import {SanityImage} from '@/components/SanityImage'
import {SiteHeader} from '@/components/landing/SiteHeader'
import {useLanguage} from '@/components/landing/LanguageProvider'
import {useCmsPortableText} from '@/lib/i18n/useCmsPortableText'
import {portableTextHasContent} from '@/lib/i18n/portableText'
import {getSanityImageUrl, sanityImageWidths} from '@/sanity/lib/image'
import {getProjectGalleryImages} from '@/lib/project/gallery'
import type {PreparedProject} from '@/lib/i18n/prepareProject'
import {ProjectDescription} from './ProjectDescription'

type ProjectDetailMobileProps = {
  project: PreparedProject
}

const MOBILE_GALLERY_IMAGE_QUALITY = 92
const mobileBlendClass = 'text-white mix-blend-difference'

export function ProjectDetailMobile({project}: ProjectDetailMobileProps) {
  const {t} = useLanguage()
  const description = useCmsPortableText(project.description, {
    initialDisplay: project.descriptionDisplay,
    preparedLocale: project.descriptionLocale,
  })
  const hasDescription = portableTextHasContent(description)
  const [infoOpen, setInfoOpen] = useState(false)
  const [activeInfoIndex, setActiveInfoIndex] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const images = getProjectGalleryImages(project)
  const isFinished = project.finalizado === true

  const getActiveImageIndex = useCallback(() => {
    const gallery = galleryRef.current
    if (!gallery || images.length === 0) return 0

    const galleryTop = gallery.scrollTop
    const galleryBottom = galleryTop + gallery.clientHeight

    let activeIndex = 0
    let maxVisible = 0

    images.forEach((_, index) => {
      const element = imageRefs.current.get(index)
      if (!element) return

      const top = element.offsetTop
      const bottom = top + element.offsetHeight
      const visibleTop = Math.max(top, galleryTop)
      const visibleBottom = Math.min(bottom, galleryBottom)
      const visible = Math.max(0, visibleBottom - visibleTop)

      if (visible > maxVisible) {
        maxVisible = visible
        activeIndex = index
      }
    })

    return activeIndex
  }, [images])

  const scrollToImage = useCallback((index: number) => {
    const gallery = galleryRef.current
    const element = imageRefs.current.get(index)
    if (!gallery || !element) return

    gallery.scrollTo({top: element.offsetTop, behavior: 'auto'})
  }, [])

  const handleToggleInfo = useCallback(() => {
    if (infoOpen) {
      setInfoOpen(false)
      return
    }

    const index = getActiveImageIndex()
    setActiveInfoIndex(index)
    scrollToImage(index)
    setInfoOpen(true)
  }, [getActiveImageIndex, infoOpen, scrollToImage])

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white">
      <SiteHeader
        variant="mobile"
        theme="light"
        currentPage="home"
        logoHref="/"
        showMobileAbout={false}
        mobileTopLeft={
          hasDescription ? (
            <button
              type="button"
              onClick={handleToggleInfo}
              className="max-w-[8.2rem] text-left text-[12px] mt-1 font-light leading-snug text-black"
            >
              {t('projectInfo')} {infoOpen ? '−' : '+'}
            </button>
          ) : null
        }
      />

      <div className="relative min-h-0 flex-1">
        <div
          ref={galleryRef}
          className={`absolute inset-0 overscroll-contain ${
            infoOpen ? 'overflow-hidden' : 'overflow-y-auto'
          }`}
        >
          {images.length === 0 ? (
            <div className="h-full w-full bg-neutral-100" />
          ) : (
            <>
              {images.map((image, index) => {
                const src = getSanityImageUrl(image, {
                  width: sanityImageWidths.mobileGallery,
                })
                if (!src) return null

                const isFirst = index === 0

                return (
                  <div
                    key={image._key ?? index}
                    ref={(node) => {
                      if (node) imageRefs.current.set(index, node)
                      else imageRefs.current.delete(index)
                    }}
                    className={`relative w-full ${
                      isFirst
                        ? 'h-full min-h-full shrink-0'
                        : 'mt-1 aspect-[3/4]'
                    }`}
                  >
                    <SanityImage
                      src={src}
                      alt={
                        image.alt ??
                        `${project.title ?? 'Project'} image ${index + 1}`
                      }
                      fill
                      className={`object-cover transition-opacity ${
                        infoOpen && activeInfoIndex === index
                          ? 'opacity-50'
                          : 'opacity-100'
                      }`}
                      sizes="100vw"
                      quality={MOBILE_GALLERY_IMAGE_QUALITY}
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                )
              })}
            </>
          )}
        </div>

        {infoOpen && hasDescription ? (
          <div className="absolute inset-0 z-20 flex flex-col overflow-hidden bg-white/40">
            <button
              type="button"
              onClick={() => setInfoOpen(false)}
              className="absolute right-4 top-4 z-30 shrink-0 p-1"
              aria-label="Close project info"
            >
              <Image
                src="/icons/close-thin.svg"
                alt=""
                width={28}
                height={28}
                aria-hidden
                className="h-7 w-7 object-contain"
              />
            </button>
            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 pb-8 pt-16 [-webkit-overflow-scrolling:touch] touch-pan-y"
              onTouchMove={(event) => event.stopPropagation()}
            >
              <ProjectDescription
                value={description}
                paragraphClassName="text-sm leading-relaxed tracking-[0.04em] text-black [&+&]:mt-4"
              />
            </div>
          </div>
        ) : null}

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-5 pb-4 ${mobileBlendClass}`}
        >
          <div className="min-w-0 text-sm">
            <h1 className="text-xs font-medium leading-snug">
              {project.title}
            </h1>

            <div className="mt-1 flex items-center gap-2">
              <span
                className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                  isFinished
                    ? 'bg-white'
                    : 'border border-white bg-transparent'
                }`}
                aria-hidden
              />
              <span className="text-xs">
                {isFinished ? t('finalizado') : t('inProgress')}
              </span>
            </div>
          </div>

          {(project.location || project.size) && (
            <div className="shrink-0 space-y-1 text-right text-xs">
              {project.location ? (
                <p className="leading-snug">{project.location}</p>
              ) : null}

              {project.size ? (
                <div className="flex items-center justify-end gap-1">
                  <span
                    className="inline-block h-2 w-2 shrink-0 border border-white"
                    aria-hidden
                  />
                  <span>{project.size}</span>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
