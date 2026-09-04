'use client'

import type {PreparedProject} from '@/lib/i18n/prepareProject'
import {ProjectDetailContent} from './ProjectDetailContent'

type ProjectDetailViewProps = {
  project: PreparedProject
}

export function ProjectDetailView({project}: ProjectDetailViewProps) {
  return (
    <main>
      <ProjectDetailContent project={project} />
    </main>
  )
}
