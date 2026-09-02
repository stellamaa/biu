'use client'

import {useState} from 'react'
import {PageTopBar} from '@/components/site/PageTopBar'
import {SiteHeader} from '@/components/landing/SiteHeader'
import {useLanguage} from '@/components/landing/LanguageProvider'
import {useCmsText} from '@/lib/i18n/useCmsText'
import {desktopLeftColumnClass, desktopLeftMetaFixedClass} from '@/lib/layout/desktopLeftColumn'
import {getProjectGalleryImages} from '@/lib/project/gallery'
import {ProjectDetailGallery} from './ProjectDetailGallery'
import {ProjectDetailMeta} from './ProjectDetailMeta'
import {ProjectDetailMobile} from './ProjectDetailMobile'
import type {PreparedProject} from '@/lib/i18n/prepareProject'

type ProjectDetailContentProps = {
  project: PreparedProject
}

const desktopBlendClass = 'text-white mix-blend-difference'

export function ProjectDetailContent({project}: ProjectDetailContentProps) {
  const {t} = useLanguage()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const images = getProjectGalleryImages(project)
  const description = useCmsText(
    project.description,
    project.descriptionDisplay,
  )

  return (
    <>
      <div className="lg:hidden">
        <ProjectDetailMobile project={project} />
      </div>

      <div className="hidden min-h-dvh bg-white lg:grid lg:h-dvh lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative flex min-h-0 flex-col bg-white lg:min-h-dvh">
          <PageTopBar
            theme="light"
            currentPage="home"
            variant="desktop"
            showDesktopNav={false}
            logoHref="/"
            alignWithContent
            showLandscapeLabel={false}
            topLeft={
              <h1 className="text-base font-base leading-snug text-black 3xl:text-xl">
                {project.title}
              </h1>
            }
          />

          <div className={`${desktopLeftColumnClass} relative min-h-0 flex-1`}>
            <div className="relative z-10 min-h-0 overflow-y-auto">
              {description ? (
                <div className="mt-10 shrink-0">
                  <p className="max-w-[82%] whitespace-pre-line text-sm leading-snug text-black md:text-base 3xl:text-xl">
                    {description}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className={`${desktopLeftMetaFixedClass} pointer-events-none`}>
            <ProjectDetailMeta
              location={project.location}
              size={project.size}
              year={project.year}
              finalizado={project.finalizado}
            />
          </div>
        </section>

        <section className="relative min-h-0 lg:min-h-dvh">
          <SiteHeader variant="desktop" theme="light" currentPage="home" />
          <ProjectDetailGallery
            project={project}
            onActiveIndexChange={setActiveImageIndex}
          />
          {images.length > 0 ? (
            <p
              className={`pointer-events-none absolute bottom-17 right-6 z-20 hidden text-xs lg:block 3xl:bottom-10 3xl:right-8 3xl:text-base ${desktopBlendClass}`}
            >
              {activeImageIndex + 1}/{images.length} {t('images')}
            </p>
          ) : null}
        </section>
      </div>
    </>
  )
}
