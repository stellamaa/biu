'use client'

import {PageTopBar} from '@/components/site/PageTopBar'
import {SiteHeader} from '@/components/landing/SiteHeader'
import {useCmsText} from '@/lib/i18n/useCmsText'
import {desktopLeftColumnClass, desktopLeftMetaFixedClass} from '@/lib/layout/desktopLeftColumn'
import {ProjectDetailGallery} from './ProjectDetailGallery'
import {ProjectDetailMeta} from './ProjectDetailMeta'
import {ProjectDetailMobile} from './ProjectDetailMobile'
import type {PreparedProject} from '@/lib/i18n/prepareProject'

type ProjectDetailContentProps = {
  project: PreparedProject
}

export function ProjectDetailContent({project}: ProjectDetailContentProps) {
  const description = useCmsText(project.description, {
    initialDisplay: project.descriptionDisplay,
    preparedLocale: project.descriptionLocale,
  })

  return (
    <>
      <div className="lg:hidden">
        <ProjectDetailMobile project={project} />
      </div>

      <div className="relative hidden h-dvh overflow-hidden bg-white lg:block">
        <ProjectDetailGallery project={project} />

        <div className="pointer-events-none absolute inset-0 z-10 grid h-dvh grid-cols-[1.08fr_0.92fr]">
          <section className="relative flex min-h-0 flex-col bg-white">
            <PageTopBar
              theme="light"
              currentPage="home"
              variant="desktop"
              showDesktopNav={false}
              logoHref="/"
              alignWithContent
              showLandscapeLabel={false}
              topLeft={
                <h1 className="pointer-events-none text-base font-base leading-snug text-black 3xl:text-xl">
                  {project.title}
                </h1>
              }
            />

            <div
              className={`${desktopLeftColumnClass} pointer-events-none relative min-h-0 flex-1 overflow-hidden`}
            >
              {description ? (
                <div className="mt-10 shrink-0">
                  <p className="pointer-events-none max-w-[82%] whitespace-pre-line text-[12px] leading-tight text-black 3xl:text-lg">
                    {description}
                  </p>
                </div>
              ) : null}
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

          <section className="relative">
            <div className="pointer-events-auto">
              <SiteHeader variant="desktop" theme="light" currentPage="home" />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
