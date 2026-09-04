import {landingDesktopBodyTextClass} from '@/lib/layout/landingDesktopTypography'

/** Matches DesktopLanding list wrapper spacing. */
export const desktopProjectListClass = 'pt-10'

/** Line box for inactive desktop list rows. */
export const desktopProjectListItemClass = `block w-full min-h-[15px] py-0 text-left 3xl:min-h-5 ${landingDesktopBodyTextClass}`

/** Row height — slightly taller at 3xl for breathing room. */
export const desktopProjectListRowClass =
  'h-[15px] 3xl:h-[18px] 4xl:h-[15px]'

/** Shared grid — number + title + location + size + year, aligned across all rows. */
export const desktopProjectListGridClass =
  'grid grid-cols-[2.25rem_minmax(0,0.95fr)_minmax(0,1.05fr)_minmax(3.25rem,0.55fr)_minmax(4.5rem,0.6fr)] items-center gap-x-3 gap-y-0 3xl:grid-cols-[3rem_minmax(0,0.95fr)_minmax(0,1.05fr)_minmax(3.75rem,0.55fr)_minmax(5rem,0.6fr)] 3xl:gap-x-4'

export function getProjectListIndex(
  projects: Array<{_id: string; slug?: {current?: string | null} | null}>,
  projectId: string,
  slug?: string,
): number {
  const index = projects.findIndex(
    (entry) =>
      entry._id === projectId ||
      (slug != null && entry.slug?.current === slug),
  )
  return index >= 0 ? index : 0
}

export function projectHasSketch(
  project: {sketchImage?: {asset?: {url?: string | null} | null} | null},
): boolean {
  return Boolean(project.sketchImage?.asset?.url)
}
