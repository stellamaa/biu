type SanityImageSource = {
  asset?: {url?: string | null} | null
} | null | undefined

/** High-quality source from Sanity CDN; Next.js handles final delivery size/format. */
const SANITY_SOURCE_QUALITY = 90
const MAX_IMAGE_WIDTH = 3200

export const sanityImageWidths = {
  mobileHero: 750,
  desktopHero: 2400,
  mobileGallery: 2400,
  desktopGallery: 2400,
  sketch: 1000,
  map: 1200,
  about: 1800,
} as const

export const sanityImageQualities = {
  mobileHero: 75,
  default: 82,
} as const

const MOBILE_HERO_SRC_WIDTHS = [400, 600, 750] as const

type SanityImageOptions = {
  width?: number
  height?: number
  quality?: number
  fit?: 'max' | 'crop' | 'min'
}

export function getSanityImageUrl(
  image: SanityImageSource,
  options?: SanityImageOptions,
): string | null {
  const baseUrl = image?.asset?.url
  if (!baseUrl) return null

  const url = new URL(baseUrl)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', options?.fit ?? 'max')
  url.searchParams.set('q', String(options?.quality ?? SANITY_SOURCE_QUALITY))

  if (options?.width) {
    url.searchParams.set(
      'w',
      String(Math.min(Math.round(options.width), MAX_IMAGE_WIDTH)),
    )
  }

  if (options?.height) {
    url.searchParams.set('h', String(Math.round(options.height)))
  }

  return url.toString()
}

export function getMobileHeroImageUrl(image: SanityImageSource): string | null {
  return getSanityImageUrl(image, {
    width: sanityImageWidths.mobileHero,
    height: Math.round(sanityImageWidths.mobileHero * (5 / 4)),
    quality: sanityImageQualities.mobileHero,
    fit: 'crop',
  })
}

export function getMobileHeroImageSources(image: SanityImageSource): {
  src: string
  srcSet: string
} | null {
  const srcSet = MOBILE_HERO_SRC_WIDTHS.map((width) => {
    const url = getSanityImageUrl(image, {
      width,
      height: Math.round(width * (5 / 4)),
      quality: sanityImageQualities.mobileHero,
      fit: 'crop',
    })
    return url ? `${url} ${width}w` : null
  })
    .filter(Boolean)
    .join(', ')

  const src = getMobileHeroImageUrl(image)
  if (!src || !srcSet) return null

  return {src, srcSet}
}

export type {SanityImageSource}
