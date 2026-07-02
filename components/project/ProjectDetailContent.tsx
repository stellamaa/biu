'use client'

import {PageTopBar} from '@/components/site/PageTopBar'
import {SiteHeader} from '@/components/landing/SiteHeader'
import {ProjectDetailGallery} from './ProjectDetailGallery'
import {ProjectDetailMap} from './ProjectDetailMap'
import {ProjectDetailMeta} from './ProjectDetailMeta'
import {ProjectDetailMobile} from './ProjectDetailMobile'
import type {PreparedProject} from '@/lib/i18n/prepareProject'

type ProjectDetailContentProps = {
  project: PreparedProject
}

export function ProjectDetailContent({project}: ProjectDetailContentProps) {
  return (
    <>
      <div className="lg:hidden">
        <ProjectDetailMobile project={project} />
      </div>

      <div className="hidden min-h-dvh bg-white lg:grid lg:h-dvh lg:grid-cols-[1.15fr_0.85fr]">
        <section className="flex min-h-0 flex-col lg:min-h-dvh">
          <PageTopBar
            theme="light"
            currentPage="home"
            variant="desktop"
            showDesktopNav={false}
            logoHref="/"
            alignWithContent
          />
          <div className="flex min-h-0 flex-1 flex-col px-5 pb-10 pt-0 lg:px-6 lg:pb-12 lg:pt-2">
            <h1 className="mt-10 text-base font-medium text-black">
              {project.title}
            </h1>

            {project.descriptionDisplay ? (
              <p className="mt-3 max-w-[85%] whitespace-pre-line text-base leading-snug text-black">
                {project.descriptionDisplay}
              </p>
            ) : null}

            <div className="pt-26">
              <ProjectDetailMeta
                location={project.location}
                size={project.size}
                year={project.year}
                finalizado={project.finalizado}
              />
              <div className="mt-30">
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
