import type {PreparedProject} from '@/lib/i18n/prepareProject'
import type {Project} from '@/types/schema'

type GalleryImage = NonNullable<Project['imageGallery']>[number]

export function getGalleryImageAspectRatio(image: GalleryImage): number {
  const dimensions = image.asset?.metadata?.dimensions
  if (dimensions?.aspectRatio) return dimensions.aspectRatio
  if (dimensions?.width && dimensions?.height) {
    return dimensions.width / dimensions.height
  }
  return 4 / 5
}

export function getProjectGalleryImages(
  project: PreparedProject,
): GalleryImage[] {
  const gallery = project.imageGallery?.filter((image) => image.asset?.url) ?? []

  if (gallery.length > 0) return gallery

  if (project.mainImage?.asset?.url) {
    return [project.mainImage as GalleryImage]
  }

  return []
}
