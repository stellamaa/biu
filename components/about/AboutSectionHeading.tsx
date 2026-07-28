'use client'

import {useLanguage} from '@/components/landing/LanguageProvider'

type AboutSectionHeadingProps = {
  title: string | null | undefined
  foundedYear: string | null | undefined
}

export function AboutSectionHeading({
  title,
  foundedYear,
}: AboutSectionHeadingProps) {
  const {t} = useLanguage()

  return (
    <div className="flex flex-wrap items-baseline gap-x-5 text-[11px] tracking-wide text-about-accent lg:gap-x-3 lg:text-xs 3xl:gap-x-4 3xl:text-base">
      <h2 className="m-0 text-inherit font-normal">{title}</h2>
      {foundedYear ? (
        <p className="m-0">
          {t('founded')} {foundedYear}
        </p>
      ) : null}
    </div>
  )
}
