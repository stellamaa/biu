'use client'

import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {LandscapeArchitectureLabel} from './LandscapeArchitectureLabel'
import {ProjectHeroImage} from './ProjectHeroImage'
import {ProjectListItem} from './ProjectListItem'
import {SiteHeader} from './SiteHeader'
import type {LandingProject} from '@/types/schema'

type MobileLandingProps = {
  projects: LandingProject[]
}

const HOLD_MS = 3000
const PAUSE_AFTER_INTERACTION_MS = 5000
const HERO_FADE_MS = 350
const DEFAULT_ITEM_HEIGHT = 28
const SCROLL_END_DEBOUNCE_MS = 120

export function MobileLanding({projects}: MobileLandingProps) {
  const measureRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const pauseUntilRef = useRef(0)
  const activeProjectIdRef = useRef(projects[0]?._id ?? '')
  const trackIndexRef = useRef(0)
  const holdTimeoutRef = useRef<number | null>(null)
  const scrollEndTimeoutRef = useRef<number | null>(null)
  const isAutoScrollingRef = useRef(false)
  const userInteractingRef = useRef(false)

  const [trackIndex, setTrackIndex] = useState(0)
  const [itemHeight, setItemHeight] = useState(DEFAULT_ITEM_HEIGHT)
  const [heroProject, setHeroProject] = useState(projects[0] ?? null)
  const [heroVisible, setHeroVisible] = useState(true)

  trackIndexRef.current = trackIndex

  const loopProjects = useMemo(() => {
    if (projects.length === 0) return []
    return [...projects, ...projects]
  }, [projects])

  const activeProjectIndex =
    projects.length > 0 ? trackIndex % projects.length : 0
  const activeProject = projects[activeProjectIndex] ?? null
  const listViewportHeight = projects.length * itemHeight
  const cycleHeight = projects.length * itemHeight

  useLayoutEffect(() => {
    const node = measureRef.current
    if (!node) return

    const update = () => {
      setItemHeight(node.offsetHeight || DEFAULT_ITEM_HEIGHT)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [projects])

  useEffect(() => {
    if (!activeProject) return
    if (activeProject._id === activeProjectIdRef.current) return

    activeProjectIdRef.current = activeProject._id
    setHeroVisible(false)

    const timeout = window.setTimeout(() => {
      setHeroProject(activeProject)
      setHeroVisible(true)
    }, HERO_FADE_MS)

    return () => window.clearTimeout(timeout)
  }, [activeProject])

  const clearHold = useCallback(() => {
    if (holdTimeoutRef.current !== null) {
      window.clearTimeout(holdTimeoutRef.current)
      holdTimeoutRef.current = null
    }
  }, [])

  const clearScrollEndTimeout = useCallback(() => {
    if (scrollEndTimeoutRef.current !== null) {
      window.clearTimeout(scrollEndTimeoutRef.current)
      scrollEndTimeoutRef.current = null
    }
  }, [])

  const scrollToIndex = useCallback(
    (index: number, smooth: boolean) => {
      const el = scrollRef.current
      if (!el || itemHeight <= 0) return

      isAutoScrollingRef.current = smooth
      el.scrollTo({
        top: index * itemHeight,
        behavior: smooth ? 'smooth' : 'auto',
      })
    },
    [itemHeight],
  )

  const syncTrackIndexFromScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || itemHeight <= 0) return

    const index = Math.round(el.scrollTop / itemHeight)
    setTrackIndex(index)
  }, [itemHeight])

  const finishScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || itemHeight <= 0) return

    if (trackIndexRef.current >= projects.length) {
      el.scrollTop = 0
      setTrackIndex(0)
    }

    if (isAutoScrollingRef.current) {
      isAutoScrollingRef.current = false
    }
  }, [itemHeight, projects.length])

  const scheduleHold = useCallback(() => {
    clearHold()

    holdTimeoutRef.current = window.setTimeout(() => {
      holdTimeoutRef.current = null

      if (Date.now() < pauseUntilRef.current || userInteractingRef.current) {
        scheduleHold()
        return
      }

      if (projects.length <= 1) return

      const next = trackIndexRef.current + 1
      if (next > projects.length) return

      scrollToIndex(next, true)
    }, HOLD_MS)
  }, [clearHold, projects.length, scrollToIndex])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || itemHeight <= 0 || projects.length === 0) return

    if (el.scrollTop >= cycleHeight) {
      el.scrollTop -= cycleHeight
    }

    syncTrackIndexFromScroll()

    clearScrollEndTimeout()
    scrollEndTimeoutRef.current = window.setTimeout(() => {
      scrollEndTimeoutRef.current = null
      finishScroll()

      if (isAutoScrollingRef.current) {
        scheduleHold()
        return
      }

      if (userInteractingRef.current) {
        userInteractingRef.current = false

        const nearest = Math.round(el.scrollTop / itemHeight)
        const clamped = Math.max(0, Math.min(nearest, projects.length))

        if (Math.abs(el.scrollTop - clamped * itemHeight) > 1) {
          scrollToIndex(clamped, true)
          return
        }
      }

      scheduleHold()
    }, SCROLL_END_DEBOUNCE_MS)
  }, [
    clearScrollEndTimeout,
    cycleHeight,
    finishScroll,
    itemHeight,
    projects.length,
    scheduleHold,
    scrollToIndex,
    syncTrackIndexFromScroll,
  ])

  const handleTouchStart = useCallback(() => {
    userInteractingRef.current = true
    isAutoScrollingRef.current = false
    clearHold()
    clearScrollEndTimeout()
    pauseUntilRef.current = Date.now() + PAUSE_AFTER_INTERACTION_MS
  }, [clearHold, clearScrollEndTimeout])

  const handleTouchEnd = useCallback(() => {
    pauseUntilRef.current = Date.now() + PAUSE_AFTER_INTERACTION_MS
  }, [])

  useEffect(() => {
    if (projects.length <= 1) return
    scheduleHold()
    return clearHold
  }, [scheduleHold, clearHold, projects.length])

  useEffect(() => {
    return () => clearScrollEndTimeout()
  }, [clearScrollEndTimeout])

  const pauseAutoScroll = useCallback(() => {
    pauseUntilRef.current = Date.now() + PAUSE_AFTER_INTERACTION_MS
  }, [])

  return (
    <div className="flex h-dvh flex-col lg:hidden">
      <SiteHeader variant="mobile" theme="light" currentPage="home" />
      <div className="shrink-0 px-5 pt-1">
        <div
          className="transition-opacity duration-500 ease-in-out"
          style={{opacity: heroVisible ? 1 : 0}}
        >
          <ProjectHeroImage project={heroProject} variant="mobile" priority />
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden pt-4">
        {projects.length > 0 ? (
          <>
            <div
              ref={measureRef}
              className="pointer-events-none absolute left-0 top-0 -z-10 opacity-0"
              aria-hidden
            >
              <ProjectListItem
                project={projects[0]}
                index={0}
                isActive={false}
                variant="mobile"
                onActivate={() => {}}
              />
            </div>

            <div
              ref={scrollRef}
              className="mobile-landing-scroll overflow-y-auto overscroll-none"
              style={{
                height: listViewportHeight,
                scrollBehavior: 'auto',
              }}
              onScroll={handleScroll}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <ul>
                {loopProjects.map((project, index) => (
                  <ProjectListItem
                    key={`${project._id}-${index}`}
                    project={project}
                    index={index % projects.length}
                    isActive={index === trackIndex}
                    variant="mobile"
                    onActivate={pauseAutoScroll}
                    style={{height: itemHeight}}
                  />
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="px-5 py-8 text-sm text-neutral-400">
            No projects published yet.
          </p>
        )}

        <LandscapeArchitectureLabel variant="mobile" overlay />
      </div>
    </div>
  )
}
