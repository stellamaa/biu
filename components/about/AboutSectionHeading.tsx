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
    <div className="flex flex-wrap items-baseline gap-x-5 text-[11px] tracking-wide text-about-accent lg:gap-x-3 lg:text-sm 2xl:text-base 3xl:text-2xl 4xl:text-4xl">
      <h2 className="m-0 text-inherit font-normal">{title}</h2>
      {foundedYear ? (
        <p className="m-0">
          {t('founded')} {foundedYear}
        </p>
      ) : null}
    </div>
  )
}
