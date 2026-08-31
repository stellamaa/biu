type SanityImageSource = {
  asset?: {url?: string | null} | null
} | null | undefined

/** High-quality source from Sanity CDN; Next.js handles final delivery size/format. */
const SANITY_SOURCE_QUALITY = 90
const MAX_IMAGE_WIDTH = 3200

export const sanityImageWidths = {
  mobileHero: 1200,
  desktopHero: 2400,
  mobileGallery: 1600,
  desktopGallery: 2400,
  sketch: 1000,
  map: 1200,
  about: 1800,
} as const

export function getSanityImageUrl(
  image: SanityImageSource,
  options?: {width?: number; height?: number; quality?: number},
): string | null {
  const baseUrl = image?.asset?.url
  if (!baseUrl) return null

  const url = new URL(baseUrl)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
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

export type {SanityImageSource}
