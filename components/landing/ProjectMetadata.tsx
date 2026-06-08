'use client'

import type {Project} from '@/types/schema'

type ProjectMetadataProps = {
  project: Project | null
  variant?: 'desktop' | 'mobile'
}

export function ProjectMetadata({
  project,
  variant = 'mobile',
}: ProjectMetadataProps) {
  if (!project) return null

  if (variant === 'desktop') {
    return (
      <div className="grid w-full grid-cols-4 gap-4 text-sm lg:text-base">
        <span className="font-medium text-black">{project.title}</span>
        <span className="text-black">{project.location}</span>
        <span className="text-black">{project.size}</span>
        <span className="text-black">{project.year}</span>
      </div>
    )
  }

  const items = [
    project.title,
    project.location,
    project.size,
    project.year,
  ].filter(Boolean)

  return (
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 text-sm lg:text-base">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={index === 0 ? 'font-medium text-black' : 'text-black'}
        >
          {item}
        </span>
      ))}
    </div>
  )
}
