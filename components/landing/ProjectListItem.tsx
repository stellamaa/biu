'use client'

import {forwardRef} from 'react'
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
    const {t} = useLanguage()
    const title = project.title ?? 'Untitled'
    const inProgress =
      project.finalizado === false
        ? ` (${t('inProgress')})`
        : ''

    if (variant === 'desktop') {
      const colorClass = isActive
        ? 'font-medium text-black'
        : 'text-neutral-300 hover:text-neutral-500'

      return (
        <li ref={ref}>
          <button
            type="button"
            onMouseEnter={onActivate}
            onFocus={onActivate}
            className={`w-full text-left text-sm transition-colors lg:text-base ${colorClass} ${
              isActive ? 'grid grid-cols-4 gap-4' : 'block'
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
          </button>
        </li>
      )
    }

    const number = String(index + 1).padStart(3, '0')

    return (
      <li
        ref={ref}
        data-project-id={project._id}
        className="scroll-mt-4 border-b border-black/5 last:border-b-0"
      >
        <button
          type="button"
          onClick={onActivate}
          className={`flex w-full items-baseline gap-4 px-5 py-4 text-left text-base transition-colors ${
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
