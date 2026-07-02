import type {PreparedProject} from '@/lib/i18n/prepareProject'
import type {Project} from '@/types/schema'

type GalleryImage = NonNullable<Project['imageGallery']>[number]

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
