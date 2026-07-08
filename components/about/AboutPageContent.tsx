'use client'

import {AboutContact} from './AboutContact'
import {AboutDescription} from './AboutDescription'
import {AboutImage} from './AboutImage'
import {AboutSectionHeading} from './AboutSectionHeading'
import {AboutTopBar} from './AboutTopBar'
import type {PreparedAboutPage} from '@/lib/i18n/prepareAboutPage'

type AboutPageContentProps = {
  about: PreparedAboutPage | null
}

export function AboutPageContent({about}: AboutPageContentProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-about-bg text-about-accent">
      <AboutTopBar />
      {about ? (
        <div className="flex min-h-0 flex-1 flex-col gap-8 px-4 pb-10 pt-2 lg:grid lg:grid-cols-2 lg:gap-12 lg:pb-16 lg:pl-5 lg:pr-10 lg:pt-4 3xl:gap-16 3xl:pb-20 3xl:pl-8 3xl:pr-12 3xl:pt-6">
          <div className="flex min-h-0 w-full min-w-0 flex-col gap-8 lg:h-full lg:gap-0 lg:pr-6">
            <div className="space-y-10 lg:space-y-12">
              <div className="space-y-2">
                <AboutSectionHeading
                  title={about.aboutBiuTitle}
                  foundedYear={about.biuFoundedYear}
                />
                <div className="pt-0 lg:hidden">
                  <AboutImage
                    image={about.aboutImage}
                    className="mx-auto max-w-lg"
                  />
                </div>
                <AboutDescription
                  text={about.biuDescriptionDisplay}
                  className="mt-4 lg:mt-4"
                />
              </div>
            </div>
            <div className="hidden min-h-40 flex-1 lg:block" aria-hidden />
            <AboutContact
              email={about.email}
              telephone1={about.telephone1}
              telephone2={about.telephone2}
            />
          </div>
          <div className="hidden lg:flex lg:items-end lg:justify-end lg:pb-16 lg:pr-6 lg:pt-3 3xl:pb-20 3xl:pr-8 3xl:pt-4">
            <AboutImage
              image={about.aboutImage}
              className="max-w-[min(46vw,540px)] 3xl:max-w-[min(46vw,680px)]"
            />
          </div>
        </div>
      ) : (
        <p className="px-6 py-16 text-sm text-about-accent/60 lg:pl-5 lg:pr-10">
          Add content in Sanity Studio → About page.
        </p>
      )}
    </div>
  )
}
