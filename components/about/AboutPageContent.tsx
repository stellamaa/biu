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
        <div className="flex flex-1 flex-col gap-8 px-4 pb-10 pt-2 lg:grid lg:grid-cols-2 lg:gap-12 lg:pb-24 lg:pl-5 lg:pr-10 lg:pt-4">
          <div className="flex min-w-0 w-full flex-col justify-between gap-12 lg:min-h-0 lg:pr-6">
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
            <AboutContact
              email={about.email}
              telephone1={about.telephone1}
              telephone2={about.telephone2}
              className="lg:pb-6"
            />
          </div>
          <div className="hidden lg:flex lg:items-end lg:justify-end lg:pb-16 lg:pr-6 lg:pt-3">
            <AboutImage
              image={about.aboutImage}
              className="max-w-[min(46vw,540px)]"
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
