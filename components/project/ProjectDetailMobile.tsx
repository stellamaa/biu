'use client'

import {useLayoutEffect, useRef, useState} from 'react'
import Image from 'next/image'
import {SiteHeader} from '@/components/landing/SiteHeader'
import {useLanguage} from '@/components/landing/LanguageProvider'
import {getSanityImageUrl} from '@/sanity/lib/image'
import {getProjectGalleryImages} from '@/lib/project/gallery'
import {ProjectDetailMap} from './ProjectDetailMap'
import type {PreparedProject} from '@/lib/i18n/prepareProject'

type ProjectDetailMobileProps = {
  project: PreparedProject
}

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
  const [infoOpen, setInfoOpen] = useState(false)
  const metaRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [metaHeight, setMetaHeight] = useState(0)
  const [galleryHeight, setGalleryHeight] = useState(0)
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

  useLayoutEffect(() => {
    const node = galleryRef.current
    if (!node) return

    const update = () => {
      setGalleryHeight(node.clientHeight)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white">
      <div className="shrink-0 bg-white">
        <SiteHeader
          variant="mobile"
          theme="light"
          currentPage="home"
          logoHref="/"
        />

        <div className="px-5 pt-1">
          <div className="flex items-start gap-4">
            <div ref={metaRef} className="min-w-0 flex-1 text-sm">
              <h1 className="text-base font-medium leading-snug text-black">
                {project.title}
              </h1>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                    isFinished ? 'bg-black' : 'border border-black bg-transparent'
                  }`}
                  aria-hidden
                />
                <span className="text-black">
                  {isFinished ? t('finalizado') : t('inProgress')}
                </span>
              </div>

              {(project.location || project.size) && (
                <div className="mt-5 space-y-2">
                  {project.location ? (
                    <p className="leading-snug text-black">{project.location}</p>
                  ) : null}

                  {project.size ? (
                    <div className="flex items-center gap-1.5 text-black">
                      <span
                        className="inline-block h-2 w-2 shrink-0 border border-black"
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

          {project.descriptionDisplay ? (
            <button
              type="button"
              onClick={() => setInfoOpen((open) => !open)}
              className="mt-6 mb-4 text-sm text-black"
            >
              {t('projectInfo')} {infoOpen ? '−' : '+'}
            </button>
          ) : (
            <div className="mb-4" />
          )}
        </div>
      </div>

      <div
        ref={galleryRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        {images.length === 0 ? (
          <div className="h-full w-full bg-neutral-100" />
        ) : (
          images.map((image, index) => {
            const src = getSanityImageUrl(image, {width: 1200})
            if (!src) return null

            const showInfoOverlay = index === 0 && infoOpen
            const isFirst = index === 0

            const firstImageHeight =
              galleryHeight > 0 ? Math.round(galleryHeight * 0.88) : undefined

            return (
              <div key={image._key ?? index} className="relative w-full">
                <div
                  className={`relative w-full ${
                    isFirst ? '' : 'aspect-[2/3]'
                  }`}
                  style={
                    isFirst && firstImageHeight
                      ? {height: firstImageHeight}
                      : undefined
                  }
                >
                  <Image
                    src={src}
                    alt={
                      image.alt ??
                      `${project.title ?? 'Project'} image ${index + 1}`
                    }
                    fill
                    className={`object-cover transition-opacity ${
                      showInfoOverlay ? 'opacity-50' : 'opacity-100'
                    }`}
                    sizes="100vw"
                    priority={index === 0}
                  />

                  {showInfoOverlay ? (
                    <>
                      <div className="absolute inset-0 bg-white/40" />
                      <button
                        type="button"
                        onClick={() => setInfoOpen(false)}
                        className="absolute right-4 top-4 z-10 p-1"
                        aria-label="Close project info"
                      >
                        <InfoCloseIcon />
                      </button>
                      <div className="absolute inset-0 z-[1] overflow-y-auto p-5 pt-12">
                        <p className="whitespace-pre-line text-sm leading-snug text-black">
                          {project.descriptionDisplay}
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
