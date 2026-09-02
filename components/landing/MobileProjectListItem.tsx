import Link from 'next/link'
import type {CSSProperties} from 'react'
import {getProjectPath} from '@/lib/project/url'
import type {LandingProject} from '@/types/schema'

type MobileLandingProject = Pick<
  LandingProject,
  '_id' | 'title' | 'slug' | 'finalizado' | 'mainImage'
>

type MobileProjectListItemProps = {
  project: MobileLandingProject
  index: number
  isActive: boolean
  inProgressLabel: string
  onActivate?: () => void
  style?: CSSProperties
}

export function MobileProjectListItem({
  project,
  index,
  isActive,
  inProgressLabel,
  onActivate,
  style,
}: MobileProjectListItemProps) {
  const title = project.title ?? 'Untitled'
  const inProgress =
    project.finalizado === false ? ` (${inProgressLabel})` : ''
  const number = String(index + 1).padStart(3, '0')

  return (
    <li
      data-project-id={project._id}
      className="flex h-7 items-center"
      style={style}
    >
      <Link
        href={getProjectPath(project)}
        onClick={onActivate}
        className={`flex w-full items-baseline gap-2 px-5 py-1 text-left text-sm transition-colors duration-200 ${
          isActive ? 'font-medium text-black' : 'text-neutral-400'
        }`}
      >
        <span className="tabular-nums">{number}</span>
        <span>
          {title}
          {inProgress}
        </span>
      </Link>
    </li>
  )
}
