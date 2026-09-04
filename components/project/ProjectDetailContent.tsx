'use client'

import {PageTopBar} from '@/components/site/PageTopBar'
import {SiteHeader} from '@/components/landing/SiteHeader'
import {useCmsPortableText} from '@/lib/i18n/useCmsPortableText'
import {portableTextHasContent} from '@/lib/i18n/portableText'
import {desktopLeftColumnClass, desktopLeftMetaFixedClass} from '@/lib/layout/desktopLeftColumn'
import {ProjectDescription} from './ProjectDescription'
import {ProjectDetailGallery} from './ProjectDetailGallery'
import {ProjectDetailMeta} from './ProjectDetailMeta'
import {ProjectDetailMobile} from './ProjectDetailMobile'
import type {PreparedProject} from '@/lib/i18n/prepareProject'

type ProjectDetailContentProps = {
  project: PreparedProject
}

const desktopDescriptionParagraphClass =
  'pointer-events-none text-[12px] leading-tight text-black md:text-sm 3xl:pl-5 3xl:text-2xl 3xl:leading-tight 4xl:pl-0 4xl:text-lg [&+&]:mt-4 3xl:[&+&]:mt-5'

export function ProjectDetailContent({project}: ProjectDetailContentProps) {
  const description = useCmsPortableText(project.description, {
    initialDisplay: project.descriptionDisplay,
    preparedLocale: project.descriptionLocale,
  })
  const hasDescription = portableTextHasContent(description)

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
              matchAboutHeaderAt3xl
              showLandscapeLabel={false}
              topLeft={
                <h1 className="pointer-events-none text-base font-base leading-snug text-black 3xl:text-3xl 4xl:text-xl">
                  {project.title}
                </h1>
              }
            />

            <div
              className={`${desktopLeftColumnClass} pointer-events-none relative min-h-0 flex-1 overflow-hidden`}
            >
              {hasDescription ? (
                <div className="mt-10 shrink-0 3xl:pt-35 4xl:pt-0">
                  <ProjectDescription
                    value={description}
                    className="pointer-events-none max-w-[82%]"
                    paragraphClassName={desktopDescriptionParagraphClass}
                  />
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
              <SiteHeader
                variant="desktop"
                theme="light"
                currentPage="home"
                matchAboutHeaderAt3xl
              />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
