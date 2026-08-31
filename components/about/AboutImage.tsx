'use client'

import {SanityImage} from '@/components/SanityImage'
import {getSanityImageUrl, sanityImageWidths} from '@/sanity/lib/image'
import type {AboutPageQueryResult} from '@/sanity.types'

type AboutPageData = NonNullable<AboutPageQueryResult>

type AboutImageProps = {
  image: AboutPageData['aboutImage']
  className?: string
  /** Size from available height (desktop viewport layout). */
  fitHeight?: boolean
}

export function AboutImage({
  image,
  className = '',
  fitHeight = false,
}: AboutImageProps) {
  const src = getSanityImageUrl(image, {width: sanityImageWidths.about})

  const frameClass = fitHeight
    ? 'relative h-full max-h-full w-auto aspect-[4/5]'
    : 'relative aspect-[3/4] w-full lg:aspect-[4/5]'

  if (!src) {
    return (
      <div className={`bg-about-accent/10 ${frameClass} ${className}`} />
    )
  }

  return (
    <div className={`${frameClass} ${className}`}>
      <SanityImage
        src={src}
        alt={image?.alt ?? 'About'}
        fill
        className="object-contain"
        sizes="(min-width: 1024px) 45vw, 90vw"
        priority
      />
    </div>
  )
}
