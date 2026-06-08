import {AboutView} from '@/components/about/AboutView'
import {getServerLocale} from '@/lib/i18n/getServerLocale'
import {prepareAboutPage} from '@/lib/i18n/prepareAboutPage'
import {sanityClient} from '@/sanity/lib/client'
import {aboutPageQuery} from '@/sanity/lib/queries'

export default async function AboutPage() {
  const locale = await getServerLocale()
  const about = await sanityClient.fetch(aboutPageQuery)
  const prepared = await prepareAboutPage(about, locale)

  return <AboutView about={prepared} initialLocale={locale} />
}
