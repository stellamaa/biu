'use client'

import {LanguageProvider} from '@/components/landing/LanguageProvider'
import type {Locale} from '@/lib/i18n/translations'
import type {PreparedProject} from '@/lib/i18n/prepareProject'
import {ProjectDetailContent} from './ProjectDetailContent'

type ProjectDetailViewProps = {
  project: PreparedProject
  initialLocale: Locale
}

export function ProjectDetailView({
  project,
  initialLocale,
}: ProjectDetailViewProps) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <main>
        <ProjectDetailContent project={project} />
      </main>
    </LanguageProvider>
  )
}
