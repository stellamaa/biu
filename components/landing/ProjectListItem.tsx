'use client'

import Link from 'next/link'
import {forwardRef} from 'react'
import {useRouter} from 'next/navigation'
import {useLanguage} from './LanguageProvider'
import type {Project} from '@/types/schema'

type ProjectListItemProps = {
  project: Project
  index: number
  isActive: boolean
  variant: 'desktop' | 'mobile'
  onActivate: () => void
}

export const ProjectListItem = forwardRef<HTMLLIElement, ProjectListItemProps>(
  function ProjectListItem(
    {project, index, isActive, variant, onActivate},
    ref,
  ) {
    const router = useRouter()
    const {t} = useLanguage()
    const title = project.title ?? 'Untitled'
    const inProgress =
      project.finalizado === false
        ? ` (${t('inProgress')})`
        : ''
    const projectHref = `/projects/${encodeURIComponent(project._id)}`

    const goToProject = () => {
      router.push(projectHref)
    }

    if (variant === 'desktop') {
      const colorClass = isActive
        ? 'font-medium text-black'
        : 'text-neutral-300 hover:text-neutral-500'

      return (
        <li ref={ref}>
          <Link
            href={projectHref}
            onMouseEnter={onActivate}
            onFocus={onActivate}
            className={`block w-full py-1 text-left text-xs transition-colors lg:text-sm ${colorClass} ${
              isActive ? 'grid grid-cols-4 gap-x-8 gap-y-1' : 'block'
            }`}
          >
            <span className={isActive ? 'font-medium' : undefined}>{title}</span>
            {isActive ? (
              <>
                <span>{project.location}</span>
                <span>{project.size}</span>
                <span>{project.year}</span>
              </>
            ) : null}
          </Link>
        </li>
      )
    }

    const number = String(index + 1).padStart(3, '0')

    return (
      <li ref={ref} data-project-id={project._id} className="scroll-mt-4">
        <button
          type="button"
          onClick={goToProject}
          className={`flex w-full items-baseline gap-3 px-5 py-2 text-left text-sm transition-colors ${
            isActive ? 'font-medium text-black' : 'text-neutral-300'
          }`}
        >
          <span className="tabular-nums">{number}</span>
          <span>
            {title}
            {inProgress}
          </span>
        </button>
      </li>
    )
  },
)
