import type {Project} from '@/types/schema'

type SanityImageSource = {
  asset?: {url?: string | null} | null
} | null | undefined

export function getSanityImageUrl(
  image: SanityImageSource,
  options?: {width?: number; height?: number},
): string | null {
  const baseUrl = image?.asset?.url
  if (!baseUrl) return null

  const url = new URL(baseUrl)
  url.searchParams.set('auto', 'format')
  if (options?.width) url.searchParams.set('w', String(options.width))
  if (options?.height) url.searchParams.set('h', String(options.height))
  return url.toString()
}
