import type {LandingProject} from '@/types/schema'
import {DesktopLandingLazy} from './DesktopLandingLazy'
import {MobileLanding} from './MobileLanding'
import {MobileLandingHeroImages} from './MobileLandingHeroImages'

type LandingPageProps = {
  projects: LandingProject[]
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

export function LandingPage({projects}: LandingPageProps) {
  const mobileProjects = toMobileProjects(projects)

  return (
    <main className="bg-white text-black">
      <DesktopLandingLazy projects={projects} />
      <MobileLanding
        projects={mobileProjects}
        heroImages={<MobileLandingHeroImages projects={mobileProjects} />}
      />
    </main>
  )
}
