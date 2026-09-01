'use client'

import {useCallback, useLayoutEffect, useRef, useState} from 'react'
import {SanityImage} from '@/components/SanityImage'
import {SiteHeader} from '@/components/landing/SiteHeader'
import {useLanguage} from '@/components/landing/LanguageProvider'
import {useCmsText} from '@/lib/i18n/useCmsText'
import {getSanityImageUrl, sanityImageWidths} from '@/sanity/lib/image'
import {getProjectGalleryImages} from '@/lib/project/gallery'
import {ProjectDetailMap} from './ProjectDetailMap'
import type {PreparedProject} from '@/lib/i18n/prepareProject'

type ProjectDetailMobileProps = {
  project: PreparedProject
}

const MOBILE_GALLERY_IMAGE_QUALITY = 92

function InfoCloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="text-black"
    >
      <line
        x1="4"
        y1="16"
        x2="16"
        y2="4"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  )
}

export function ProjectDetailMobile({project}: ProjectDetailMobileProps) {
  const {t} = useLanguage()
  const description = useCmsText(
    project.description,
    project.descriptionDisplay,
  )
  const [infoOpen, setInfoOpen] = useState(false)
  const [activeInfoIndex, setActiveInfoIndex] = useState(0)
  const metaRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const [metaHeight, setMetaHeight] = useState(0)
  const images = getProjectGalleryImages(project)
  const isFinished = project.finalizado === true

  useLayoutEffect(() => {
    const node = metaRef.current
    if (!node) return

    const update = () => {
      setMetaHeight(node.getBoundingClientRect().height)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [
    project.title,
    project.location,
    project.size,
    project.finalizado,
    t,
  ])

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
    <div className="grid h-dvh grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-white">
      <div className="bg-white">
        <SiteHeader
          variant="mobile"
          theme="light"
          currentPage="home"
          logoHref="/"
        />

        <div className="flex min-h-[38dvh] flex-col px-5 pb-3 pt-2">
          <div className="flex items-start gap-3">
            <div ref={metaRef} className="min-w-0 flex-1 text-sm">
              <h1 className="text-xs font-medium leading-snug text-black">
                {project.title}
              </h1>

              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                    isFinished ? 'bg-black' : 'border border-black bg-transparent'
                  }`}
                  aria-hidden
                />
                <span className="text-xs text-black">
                  {isFinished ? t('finalizado') : t('inProgress')}
                </span>
              </div>

              {(project.location || project.size) && (
                <div className="mt-8 space-y-1 text-xs">
                  {project.location ? (
                    <p className="leading-snug text-black">{project.location}</p>
                  ) : null}

                  {project.size ? (
                    <div className="flex items-center gap-1 text-xs text-black">
                      <span
                        className="inline-block h-2 w-2 shrink-0 border border-black text-xs"
                        aria-hidden
                      />
                      <span>{project.size}</span>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <ProjectDetailMap
              project={project}
              variant="compact"
              matchHeight={metaHeight}
            />
          </div>

          {description ? (
            <button
              type="button"
              onClick={handleToggleInfo}
              className="mt-auto pt-14 text-left text-xs text-black"
            >
              {t('projectInfo')} {infoOpen ? '−' : '+'}
            </button>
          ) : (
            <div className="mt-auto" aria-hidden />
          )}
        </div>
      </div>

      <div
        ref={galleryRef}
        className={`relative h-full min-h-0 overscroll-contain ${
          infoOpen ? 'overflow-hidden' : 'overflow-y-auto'
        }`}
      >
        {images.length === 0 ? (
          <div className="h-full w-full bg-neutral-100" />
        ) : (
          <>
            <div className="flex flex-col gap-1">
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
                      isFirst ? 'min-h-full flex-1 shrink-0' : 'aspect-[2/3]'
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
                      priority={index < 3}
                      loading="eager"
                    />

                    {infoOpen && activeInfoIndex === index ? (
                      <div className="absolute inset-0 z-20 flex flex-col bg-white/40">
                        <button
                          type="button"
                          onClick={() => setInfoOpen(false)}
                          className="absolute right-4 top-4 z-10 p-1"
                          aria-label="Close project info"
                        >
                          <InfoCloseIcon />
                        </button>
                        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-12">
                          <p className="whitespace-pre-line text-sm leading-snug text-black">
                            {description}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
