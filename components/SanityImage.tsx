import Image, {type ImageProps} from 'next/image'

/** Delivery quality for next/image (AVIF/WebP output). */
export const NEXT_IMAGE_QUALITY = 82

export function SanityImage({
  quality = NEXT_IMAGE_QUALITY,
  priority,
  ...props
}: ImageProps) {
  return (
    <Image
      quality={quality}
      priority={priority}
      fetchPriority={priority ? 'high' : undefined}
      {...props}
    />
  )
}
