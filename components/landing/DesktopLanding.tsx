'use client'

import {useMemo, useState} from 'react'
import {
  desktopLeftColumnClass,
  desktopLeftIntroClass,
} from '@/lib/layout/desktopLeftColumn'
import {landingDesktopBodyTextClass} from '@/lib/layout/landingDesktopTypography'
import {PageTopBar} from '@/components/site/PageTopBar'
import {ProjectHeroImage} from './ProjectHeroImage'
import {ProjectListItem} from './ProjectListItem'
import {ProjectSketch} from './ProjectSketch'
import {SiteHeader} from './SiteHeader'
import type {LandingProject} from '@/types/schema'

type DesktopLandingProps = {
  projects: LandingProject[]
}

/** Default list row height at lg; 4K uses min-height from item class. */
const DESKTOP_LIST_ITEM_HEIGHT = 15

export function DesktopLanding({projects}: DesktopLandingProps) {
  const [activeId, setActiveId] = useState(projects[0]?._id ?? '')

  const activeProject = useMemo(
    () => projects.find((p) => p._id === activeId) ?? projects[0] ?? null,
    [activeId, projects],
  )

  return (
    <div className="hidden h-dvh lg:grid lg:grid-cols-[1.08fr_0.92fr]">
      <section className="relative h-dvh overflow-hidden bg-white">
        <PageTopBar
          theme="light"
          currentPage="home"
          variant="desktop"
          showDesktopNav={false}
          logoHref="/"
          alignWithContent
          landscapeLabelPosition="top-left"
        />

        <div className={`${desktopLeftColumnClass} pointer-events-none !pb-0`}>
          <div className={desktopLeftIntroClass}>
            <ProjectSketch project={activeProject} />
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="desktop-landing-scroll pointer-events-auto absolute inset-x-0 bottom-0 top-[46vh] overflow-y-auto overscroll-none px-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:px-6 3xl:top-[44vh] 3xl:px-8">
            <ul className="w-full space-y-0">
              {projects.map((project, index) => (
                <ProjectListItem
                  key={project._id}
                  project={project}
                  index={index}
                  isActive={project._id === activeId}
                  variant="desktop"
                  onActivate={() => setActiveId(project._id)}
                  style={{height: DESKTOP_LIST_ITEM_HEIGHT}}
                />
              ))}
            </ul>
          </div>
        ) : (
          <p
            className={`absolute inset-x-0 bottom-18 px-5 text-neutral-300 lg:px-6 3xl:px-8 ${landingDesktopBodyTextClass}`}
          >
            No projects published yet.
          </p>
        )}
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
