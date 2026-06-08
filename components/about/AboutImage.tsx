'use client'

import Image from 'next/image'
import {getSanityImageUrl} from '@/sanity/lib/image'
import type {AboutPageQueryResult} from '@/sanity.types'

type AboutPageData = NonNullable<AboutPageQueryResult>

type AboutImageProps = {
  image: AboutPageData['aboutImage']
  className?: string
}

export function AboutImage({image, className = ''}: AboutImageProps) {
  const src = getSanityImageUrl(image, {width: 1200})

  if (!src) {
    return (
      <div
        className={`aspect-[3/4] w-full bg-about-accent/10 lg:aspect-[4/5] ${className}`}
      />
    )
  }

  return (
    <div
      className={`relative aspect-[3/4] w-full lg:aspect-[4/5] ${className}`}
    >
      <Image
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
