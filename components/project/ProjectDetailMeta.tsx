'use client'

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
    <div className="grid w-full grid-cols-4 items-center gap-x-6 gap-y-0 text-[12px] leading-tight text-black 3xl:text-lg">
      <div className="flex items-center gap-2 3xl:gap-2.5">
        <span
          className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full 3xl:h-3 3xl:w-3 ${
            isFinished ? 'bg-black' : 'border border-black bg-transparent'
          }`}
          aria-hidden
        />
        <span>{isFinished ? t('finalizado') : t('inProgress')}</span>
      </div>

      <span>{location}</span>

      <div className="flex items-center gap-1.5 3xl:gap-2">
        <span
          className="inline-block h-2 w-2 shrink-0 border border-black 3xl:h-2.5 3xl:w-2.5"
          aria-hidden
        />
        <span>{size}</span>
      </div>

      <span>{year}</span>
    </div>
  )
}
