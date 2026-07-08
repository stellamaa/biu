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
    <div className="flex flex-wrap items-baseline gap-x-3 text-[11px] tracking-wide text-about-accent lg:text-xs 3xl:text-base 3xl:gap-x-4">
      <h2>{title}</h2>
      {foundedYear ? (
        <p>
          {t('founded')} {foundedYear}
        </p>
      ) : null}
    </div>
  )
}
