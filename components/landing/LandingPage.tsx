import type {Locale} from '@/lib/i18n/translations'
import {LanguageProvider} from './LanguageProvider'
import {DesktopLanding} from './DesktopLanding'
import {MobileLanding} from './MobileLanding'
import type {LandingProject} from '@/types/schema'

type LandingPageProps = {
  projects: LandingProject[]
  initialLocale: Locale
}

export function LandingPage({projects, initialLocale}: LandingPageProps) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <main className="bg-white text-black">
        <DesktopLanding projects={projects} />
        <MobileLanding projects={projects} />
      </main>
    </LanguageProvider>
  )
}
