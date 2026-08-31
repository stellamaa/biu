'use client'

import {PageTopBar} from '@/components/site/PageTopBar'
import {SiteHeader} from '@/components/landing/SiteHeader'
import {useCmsText} from '@/lib/i18n/useCmsText'
import {ProjectDetailGallery} from './ProjectDetailGallery'
import {ProjectDetailMap} from './ProjectDetailMap'
import {ProjectDetailMeta} from './ProjectDetailMeta'
import {ProjectDetailMobile} from './ProjectDetailMobile'
import type {PreparedProject} from '@/lib/i18n/prepareProject'

type ProjectDetailContentProps = {
  project: PreparedProject
}

export function ProjectDetailContent({project}: ProjectDetailContentProps) {
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
        <section className="flex min-h-0 flex-col lg:min-h-dvh">
          <PageTopBar
            theme="light"
            currentPage="home"
            variant="desktop"
            showDesktopNav={false}
            logoHref="/"
            alignWithContent
          />
          <div className="flex min-h-0 flex-1 flex-col px-5 pb-10 pt-0 lg:px-6 lg:pb-12 lg:pt-12 3xl:px-8 3xl:pb-16 3xl:pt-4">
            <h1 className="mt-10 text-base font-base text-black 3xl:mt-12 3xl:text-xl">
              {project.title}
            </h1>

            {description ? (
              <p className="mt-3 max-w-[85%] whitespace-pre-line text-sm md:text-base leading-snug text-black 3xl:mt-4 3xl:text-xl">
                {description}
              </p>
            ) : null}

            <div className="pt-30">
              <ProjectDetailMeta
                location={project.location}
                size={project.size}
                year={project.year}
                finalizado={project.finalizado}
              />
              <div className="mt-40 opacity-50">
                <ProjectDetailMap project={project} />
              </div>
            </div>
          </div>
        </section>

        <section className="relative min-h-0 lg:min-h-dvh">
          <SiteHeader variant="desktop" theme="light" currentPage="home" />
          <ProjectDetailGallery project={project} />
        </section>
      </div>
    </>
  )
}
