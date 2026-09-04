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
    <div
      data-page="about"
      className="relative flex h-dvh flex-col overflow-y-auto overscroll-y-contain bg-about-bg text-about-accent [-webkit-overflow-scrolling:touch] lg:h-dvh lg:overflow-hidden lg:overscroll-none"
    >
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-about-bg" />
      <AboutTopBar />
      {about ? (
        <>
          <div className="flex flex-1 flex-col px-4 pb-8 pt-2 lg:hidden">
            <div className="space-y-0">
              <AboutSectionHeading foundedYear={about.biuFoundedYear} />
              <AboutImage image={about.aboutImage} className="mx-auto max-w-lg" />
              <AboutDescription
                sourceText={about.biuDescription}
                initialDisplay={about.biuDescriptionDisplay}
                preparedLocale={about.biuDescriptionLocale}
              />
            </div>
            <AboutContact
              email={about.email}
              telephone1={about.telephone1}
              telephone2={about.telephone2}
              className="mt-8 mb-6"
            />
          </div>

          <div className="hidden min-h-0 flex-1 overflow-hidden lg:flex lg:flex-col lg:px-6 lg:pb-8 lg:pt-18 3xl:px-14 3xl:pb-12 3xl:pt-20 4xl:px-14 4xl:pb-12 4xl:pt-28">
            <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_0.85fr] gap-x-12 overflow-hidden 3xl:grid-cols-[1.22fr_0.78fr] 3xl:gap-x-16 4xl:gap-x-20">
              <div className="flex h-full min-h-0 flex-col pr-20 3xl:pr-28 4xl:pr-36">
                <div className="flex min-h-0 flex-1 flex-col space-y-5 overflow-hidden 3xl:space-y-7 4xl:space-y-9">
                  <AboutSectionHeading foundedYear={about.biuFoundedYear} />
                  <AboutDescription
                    sourceText={about.biuDescription}
                    initialDisplay={about.biuDescriptionDisplay}
                    preparedLocale={about.biuDescriptionLocale}
                    className="min-h-0 flex-1 overflow-hidden"
                  />
                </div>
                <AboutContact
                  email={about.email}
                  telephone1={about.telephone1}
                  telephone2={about.telephone2}
                  className="shrink-0 pt-6 3xl:pt-10 4xl:pt-10"
                />
              </div>
              <div className="flex h-full min-h-0 items-end justify-end pl-4 lg:pr-12 3xl:pl-6 3xl:pr-16 4xl:pl-8 4xl:pr-24">
                <AboutImage
                  image={about.aboutImage}
                  fitHeight
                  className="ml-auto max-h-full max-w-[min(100%,580px)] 2xl:max-w-[min(100%,640px)] 3xl:max-w-[min(100%,920px)] 4xl:max-w-[min(100%,1320px)]"
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
