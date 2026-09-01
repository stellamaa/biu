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
    <div className="flex min-h-dvh flex-col bg-about-bg text-about-accent lg:h-dvh lg:overflow-hidden">
      <AboutTopBar />
      {about ? (
        <>
          <div className="flex flex-1 flex-col px-4 pb-8 pt-2 lg:hidden">
            <div className="space-y-0">
              <AboutSectionHeading
                title={about.aboutBiuTitle}
                foundedYear={about.biuFoundedYear}
              />
              <AboutImage image={about.aboutImage} className="mx-auto max-w-lg" />
              <AboutDescription
                sourceText={about.biuDescription}
                initialDisplay={about.biuDescriptionDisplay}
              />
            </div>
            <AboutContact
              email={about.email}
              telephone1={about.telephone1}
              telephone2={about.telephone2}
              className="mt-8 mb-6"
            />
          </div>

          <div className="hidden min-h-0 flex-1 overflow-hidden lg:flex lg:flex-col lg:px-6 lg:pb-8 lg:pt-18 3xl:px-10 3xl:pb-10 3xl:pt-24 4xl:px-14 4xl:pb-12 4xl:pt-28">
            <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_0.85fr] gap-x-12 overflow-hidden 3xl:gap-x-16 4xl:gap-x-20">
              <div className="flex min-h-0 flex-col pr-20 3xl:pr-28 4xl:pr-36">
                <div className="flex min-h-0 flex-1 flex-col space-y-5 overflow-hidden 3xl:space-y-7 4xl:space-y-9">
                  <AboutSectionHeading
                    title={about.aboutBiuTitle}
                    foundedYear={about.biuFoundedYear}
                  />
                  <AboutDescription
                    sourceText={about.biuDescription}
                    initialDisplay={about.biuDescriptionDisplay}
                    className="min-h-0 flex-1 overflow-hidden"
                  />
                </div>
                <AboutContact
                  email={about.email}
                  telephone1={about.telephone1}
                  telephone2={about.telephone2}
                  className="mb-6 shrink-0 pt-6 3xl:pt-8 4xl:pt-10"
                />
              </div>
              <div className="flex min-h-0 justify-end pl-4 lg:pr-12 3xl:pl-6 3xl:pr-20 4xl:pl-8 4xl:pr-24">
                <AboutImage
                  image={about.aboutImage}
                  fitHeight
                  className="ml-auto max-w-[min(100%,580px)] 2xl:max-h-75%] 2xl:max-w-[min(100%,640px)] 2xl:self-start 3xl:max-h-full 3xl:max-w-[min(100%,1000px)] 4xl:max-w-[min(100%,1320px)]"
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
