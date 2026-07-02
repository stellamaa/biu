'use client'

import Link from 'next/link'
import {useLanguage} from '@/components/landing/LanguageProvider'

type ProjectDetailMetaProps = {
  location: string | null | undefined
  size: string | null | undefined
  year: string | null | undefined
  finalizado: boolean | null | undefined
}

export function ProjectDetailMeta({
  location,
  size,
  year,
  finalizado,
}: ProjectDetailMetaProps) {
  const {t} = useLanguage()
  const isFinished = finalizado === true

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs lg:text-sm">
      <Link href="/" className="text-neutral-300 hover:text-neutral-500">
        {t('projects')}
      </Link>

      <div className="flex items-center gap-2">
        <span
          className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${
            isFinished ? 'bg-black' : 'border border-black bg-transparent'
          }`}
          aria-hidden
        />
        <span className="text-black">
          {isFinished ? t('finalizado') : t('inProgress')}
        </span>
      </div>

      <span className="text-black">{location}</span>

      <div className="flex items-center gap-1.5 text-black">
        <span
          className="inline-block h-2 w-2 shrink-0 border border-black"
          aria-hidden
        />
        <span>{size}</span>
      </div>

      <span className="text-black">{year}</span>
    </div>
  )
}
