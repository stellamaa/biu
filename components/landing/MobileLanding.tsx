'use client'

import type {ReactNode} from 'react'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {getLabels} from '@/lib/i18n/getLabels'
import {persistLocale} from '@/lib/i18n/persistLocale'
import type {Locale} from '@/lib/i18n/translations'
import {LandscapeArchitectureLabel} from './LandscapeArchitectureLabel'
import {MobileLandingHeroFrame} from './MobileLandingHeroFrame'
import {MobileProjectListItem} from './MobileProjectListItem'
import {SiteHeader} from './SiteHeader'
import type {LandingProject} from '@/types/schema'

type MobileLandingProject = Pick<
  LandingProject,
  '_id' | 'title' | 'slug' | 'finalizado' | 'mainImage'
>

type MobileLandingProps = {
  projects: MobileLandingProject[]
  initialLocale: Locale
  heroImages: ReactNode
}

const HOLD_MS = 3000
const PAUSE_AFTER_INTERACTION_MS = 5000
const ITEM_HEIGHT = 28
const SCROLL_END_DEBOUNCE_MS = 120
const AUTO_SCROLL_START_DELAY_MS = 6000

export function MobileLanding({
  projects,
  initialLocale,
  heroImages,
}: MobileLandingProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const pauseUntilRef = useRef(0)
  const trackIndexRef = useRef(0)
  const holdTimeoutRef = useRef<number | null>(null)
  const scrollEndTimeoutRef = useRef<number | null>(null)
  const isAutoScrollingRef = useRef(false)
  const userInteractingRef = useRef(false)

  const [locale, setLocaleState] = useState(initialLocale)
  const [trackIndex, setTrackIndex] = useState(0)

  const labels = getLabels(locale)
  trackIndexRef.current = trackIndex

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    void persistLocale(next)
  }, [])

  const loopProjects = useMemo(() => {
    if (projects.length === 0) return []
    return [...projects, ...projects]
  }, [projects])

  const activeProjectIndex =
    projects.length > 0 ? trackIndex % projects.length : 0
  const activeLqip =
    projects[activeProjectIndex]?.mainImage?.asset?.metadata?.lqip ?? null
  const listViewportHeight = projects.length * ITEM_HEIGHT
  const cycleHeight = projects.length * ITEM_HEIGHT

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

  const scrollToIndex = useCallback((index: number, smooth: boolean) => {
    const el = scrollRef.current
    if (!el) return

    isAutoScrollingRef.current = smooth
    el.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: smooth ? 'smooth' : 'auto',
    })
  }, [])

  const syncTrackIndexFromScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    setTrackIndex(Math.round(el.scrollTop / ITEM_HEIGHT))
  }, [])

  const finishScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    if (trackIndexRef.current >= projects.length) {
      el.scrollTop = 0
      setTrackIndex(0)
    }

    if (isAutoScrollingRef.current) {
      isAutoScrollingRef.current = false
    }
  }, [projects.length])

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
    if (!el || projects.length === 0) return

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

        const nearest = Math.round(el.scrollTop / ITEM_HEIGHT)
        const clamped = Math.max(0, Math.min(nearest, projects.length))

        if (Math.abs(el.scrollTop - clamped * ITEM_HEIGHT) > 1) {
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

    let cancelled = false
    let idleId: number | null = null

    const startAutoScroll = () => {
      if (!cancelled) scheduleHold()
    }

    const delayId = window.setTimeout(() => {
      if ('requestIdleCallback' in window) {
        idleId = requestIdleCallback(startAutoScroll, {timeout: 3000})
      } else {
        startAutoScroll()
      }
    }, AUTO_SCROLL_START_DELAY_MS)

    return () => {
      cancelled = true
      window.clearTimeout(delayId)
      if (idleId !== null && 'cancelIdleCallback' in window) {
        cancelIdleCallback(idleId)
      }
      clearHold()
    }
  }, [scheduleHold, clearHold, projects.length])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearHold()
        clearScrollEndTimeout()
        return
      }

      pauseUntilRef.current = Date.now() + PAUSE_AFTER_INTERACTION_MS
      if (projects.length > 1) scheduleHold()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [clearHold, clearScrollEndTimeout, projects.length, scheduleHold])

  useEffect(() => () => clearScrollEndTimeout(), [clearScrollEndTimeout])

  const pauseAutoScroll = useCallback(() => {
    pauseUntilRef.current = Date.now() + PAUSE_AFTER_INTERACTION_MS
  }, [])

  return (
    <div className="flex h-dvh flex-col lg:hidden">
      <SiteHeader
        variant="mobile"
        theme="light"
        currentPage="home"
        labels={labels}
        locale={locale}
        onLocaleChange={setLocale}
      />
      <div className="shrink-0 px-5 pt-1">
        <MobileLandingHeroFrame
          activeIndex={activeProjectIndex}
          projectCount={projects.length}
          lqip={activeLqip}
        >
          {heroImages}
        </MobileLandingHeroFrame>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden pt-4">
        {projects.length > 0 ? (
          <div
            ref={scrollRef}
            className="mobile-landing-scroll overflow-y-auto overscroll-none"
            style={{height: listViewportHeight, scrollBehavior: 'auto'}}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <ul>
              {loopProjects.map((project, index) => (
                <MobileProjectListItem
                  key={`${project._id}-${index}`}
                  project={project}
                  index={index % projects.length}
                  isActive={index === trackIndex}
                  inProgressLabel={labels.inProgress}
                  onActivate={pauseAutoScroll}
                  style={{height: ITEM_HEIGHT}}
                />
              ))}
            </ul>
          </div>
        ) : (
          <p className="px-5 py-8 text-sm text-neutral-400">
            No projects published yet.
          </p>
        )}

        <LandscapeArchitectureLabel
          variant="mobile"
          overlay
          text={labels.landscapeArchitecture}
        />
      </div>
    </div>
  )
}
