'use client'

import Link from 'next/link'
import {forwardRef, type CSSProperties} from 'react'
import {useRouter} from 'next/navigation'
import {getProjectPath} from '@/lib/project/url'
import {navigateWithTransition} from '@/lib/navigation/pageTransition'
import {useLanguage} from './LanguageProvider'
import type {LandingProject} from '@/types/schema'

type ProjectListItemProps = {
  project: LandingProject
  index: number
  isActive: boolean
  variant: 'desktop' | 'mobile'
  onActivate: () => void
  style?: CSSProperties
}

export const ProjectListItem = forwardRef<HTMLLIElement, ProjectListItemProps>(
  function ProjectListItem(
    {project, index, isActive, variant, onActivate, style},
    ref,
  ) {
    const router = useRouter()
    const {t} = useLanguage()
    const title = project.title ?? 'Untitled'
    const inProgress =
      project.finalizado === false
        ? ` (${t('inProgress')})`
        : ''
    const projectHref = getProjectPath(project)

    const goToProject = () => {
      navigateWithTransition(router, projectHref)
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
            className={`block w-full py-0 text-left text-[12px] leading-tight transition-colors 3xl:text-lg ${colorClass} ${
              isActive ? 'grid grid-cols-4 gap-x-6 gap-y-0' : 'block'
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
      <li
        ref={ref}
        data-project-id={project._id}
        className="flex items-center"
        style={style}
      >
        <button
          type="button"
          onClick={goToProject}
          className={`flex w-full items-baseline gap-2 px-5 py-1 text-left text-sm transition-colors duration-200 ${
            isActive ? 'font-medium text-black' : 'text-neutral-400'
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
