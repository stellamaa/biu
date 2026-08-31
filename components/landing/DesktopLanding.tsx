'use client'

import {useMemo, useState} from 'react'
import {PageTopBar} from '@/components/site/PageTopBar'
import {ProjectHeroImage} from './ProjectHeroImage'
import {ProjectListItem} from './ProjectListItem'
import {ProjectSketch} from './ProjectSketch'
import {SiteHeader} from './SiteHeader'
import type {LandingProject} from '@/types/schema'

type DesktopLandingProps = {
  projects: LandingProject[]
}

export function DesktopLanding({projects}: DesktopLandingProps) {
  const [activeId, setActiveId] = useState(projects[0]?._id ?? '')

  const activeProject = useMemo(
    () => projects.find((p) => p._id === activeId) ?? projects[0] ?? null,
    [activeId, projects],
  )

  return (
    <div className="hidden h-dvh lg:grid lg:grid-cols-[1.08fr_0.92fr]">
      <section className="relative flex min-h-0 flex-col bg-white">
        <PageTopBar
          theme="light"
          currentPage="home"
          variant="desktop"
          showDesktopNav={false}
          logoHref="/"
          alignWithContent
        />

        <div className="flex min-h-0 flex-1 flex-col">
          <ProjectSketch project={activeProject} />

          <div className="flex min-h-0 flex-1 flex-col justify-end px-5 pb-[14vh] lg:px-6 3xl:px-8 3xl:pb-[16vh]">
            {projects.length > 0 ? (
              <ul className="w-full space-y-0">
                {projects.map((project, index) => (
                  <ProjectListItem
                    key={project._id}
                    project={project}
                    index={index}
                    isActive={project._id === activeId}
                    variant="desktop"
                    onActivate={() => setActiveId(project._id)}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-[12px] text-neutral-300 3xl:text-lg">
                No projects published yet.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="relative min-h-0">
        <SiteHeader variant="desktop" theme="light" currentPage="home" />
        <ProjectHeroImage
          project={activeProject}
          variant="desktop"
          priority
        />
      </section>
    </div>
  )
}
