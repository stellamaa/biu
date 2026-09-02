'use client'

import {useSyncExternalStore} from 'react'
import dynamic from 'next/dynamic'
import type {Locale} from '@/lib/i18n/translations'
import {LanguageProvider} from './LanguageProvider'
import type {LandingProject} from '@/types/schema'

const DesktopLanding = dynamic(
  () =>
    import('./DesktopLanding').then((module) => module.DesktopLanding),
  {ssr: false},
)

type DesktopLandingLazyProps = {
  projects: LandingProject[]
  initialLocale: Locale
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia('(min-width: 1024px)')
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function getDesktopSnapshot() {
  return window.matchMedia('(min-width: 1024px)').matches
}

function getServerSnapshot() {
  return false
}

export function DesktopLandingLazy({
  projects,
  initialLocale,
}: DesktopLandingLazyProps) {
  const isDesktop = useSyncExternalStore(
    subscribe,
    getDesktopSnapshot,
    getServerSnapshot,
  )

  if (!isDesktop) return null

  return (
    <LanguageProvider initialLocale={initialLocale}>
      <DesktopLanding projects={projects} />
    </LanguageProvider>
  )
}
