'use client'

import {AboutDescription} from './AboutDescription'
import {AboutSectionHeading} from './AboutSectionHeading'

type AboutSectionProps = {
  title: string | null | undefined
  foundedYear: string | null | undefined
  description: string
}

export function AboutSection({
  title,
  foundedYear,
  description,
}: AboutSectionProps) {
  return (
    <section className="space-y-3">
      <AboutSectionHeading title={title} foundedYear={foundedYear} />
      <AboutDescription text={description} size="basi" />
    </section>
  )
}
