'use client'

import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {LandscapeArchitectureLabel} from './LandscapeArchitectureLabel'
import {ProjectHeroImage} from './ProjectHeroImage'
import {ProjectListItem} from './ProjectListItem'
import {SiteHeader} from './SiteHeader'
import type {Project} from '@/types/schema'

type MobileLandingProps = {
  projects: Project[]
}

export function MobileLanding({projects}: MobileLandingProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map())
  const [activeId, setActiveId] = useState(projects[0]?._id ?? '')

  const activeProject = useMemo(
    () => projects.find((p) => p._id === activeId) ?? projects[0] ?? null,
    [activeId, projects],
  )

  const updateActiveFromScroll = useCallback(() => {
    const list = listRef.current
    if (!list) return

    const listTop = list.getBoundingClientRect().top
    let closestId = projects[0]?._id ?? ''
    let closestDistance = Number.POSITIVE_INFINITY

    for (const project of projects) {
      const element = itemRefs.current.get(project._id)
      if (!element) continue

      const distance = Math.abs(element.getBoundingClientRect().top - listTop)
      if (distance < closestDistance) {
        closestDistance = distance
        closestId = project._id
      }
    }

    setActiveId(closestId)
  }, [projects])

  useEffect(() => {
    const list = listRef.current
    if (!list || projects.length === 0) return

    updateActiveFromScroll()

    list.addEventListener('scroll', updateActiveFromScroll, {passive: true})
    window.addEventListener('resize', updateActiveFromScroll)

    return () => {
      list.removeEventListener('scroll', updateActiveFromScroll)
      window.removeEventListener('resize', updateActiveFromScroll)
    }
  }, [projects, updateActiveFromScroll])

  return (
    <div className="flex h-dvh flex-col lg:hidden">
      <SiteHeader variant="mobile" theme="light" currentPage="home" />
      <ProjectHeroImage project={activeProject} variant="mobile" priority />
      <ul
        ref={listRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectListItem
              key={project._id}
              project={project}
              index={index}
              isActive={project._id === activeId}
              variant="mobile"
              onActivate={() => {
                setActiveId(project._id)
                itemRefs.current.get(project._id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }}
              ref={(node) => {
                if (node) itemRefs.current.set(project._id, node)
                else itemRefs.current.delete(project._id)
              }}
            />
          ))
        ) : (
          <li className="px-5 py-8">
            <p className="text-sm text-neutral-300">No projects published yet.</p>
          </li>
        )}
      </ul>
      <LandscapeArchitectureLabel variant="mobile" />
    </div>
  )
}
