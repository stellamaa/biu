'use client'

import Link from 'next/link'
import {forwardRef, type CSSProperties} from 'react'
import {getProjectPath} from '@/lib/project/url'
import {desktopProjectListGridClass, desktopProjectListItemClass} from '@/lib/layout/desktopProjectListLayout'
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
    const {t} = useLanguage()
    const title = project.title ?? 'Untitled'
    const inProgress =
      project.finalizado === false
        ? ` (${t('inProgress')})`
        : ''
    const projectHref = getProjectPath(project)

    if (variant === 'desktop') {
      const colorClass = isActive
        ? 'font-medium text-black'
        : 'text-neutral-300 hover:text-neutral-500'
      const number = String(index + 1).padStart(3, '0')

      return (
        <li ref={ref} style={style}>
          <Link
            href={projectHref}
            onMouseEnter={onActivate}
            onFocus={onActivate}
            className={`${desktopProjectListItemClass} ${desktopProjectListGridClass} transition-colors ${colorClass}`}
          >
            <span className="tabular-nums">{number}</span>
            <span
              className={`min-w-0 truncate ${isActive ? 'font-medium' : 'col-span-4'}`}
            >
              {title}
              {inProgress}
            </span>
            {isActive ? (
              <>
                <span className="whitespace-nowrap">{project.location}</span>
                <span className="whitespace-nowrap">{project.size}</span>
                <span className="whitespace-nowrap tabular-nums">{project.year}</span>
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
        <Link
          href={projectHref}
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
  },
)
