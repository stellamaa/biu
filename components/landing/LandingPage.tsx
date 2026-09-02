import type {Locale} from '@/lib/i18n/translations'
import {DesktopLandingLazy} from './DesktopLandingLazy'
import {MobileLanding} from './MobileLanding'
import {MobileLandingHeroImages} from './MobileLandingHeroImages'
import type {LandingProject} from '@/types/schema'

type LandingPageProps = {
  projects: LandingProject[]
  initialLocale: Locale
}

/** Slim project shape for mobile — avoids serializing sketch/metadata to the client. */
function toMobileProjects(projects: LandingProject[]) {
  return projects.map((project) => ({
    _id: project._id,
    title: project.title,
    slug: project.slug,
    finalizado: project.finalizado,
    mainImage: project.mainImage,
  }))
}

export function LandingPage({projects, initialLocale}: LandingPageProps) {
  const mobileProjects = toMobileProjects(projects)

  return (
    <main className="bg-white text-black">
      <DesktopLandingLazy projects={projects} initialLocale={initialLocale} />
      <MobileLanding
        projects={mobileProjects}
        initialLocale={initialLocale}
        heroImages={<MobileLandingHeroImages projects={mobileProjects} />}
      />
    </main>
  )
}
