import type {Metadata} from 'next'
import {cookies} from 'next/headers'
import {PageTransition} from '@/components/PageTransition'
import {abcFavorit} from '@/app/fonts'
import {DEFAULT_LOCALE, LOCALE_COOKIE} from '@/lib/i18n/constants'
import {SITE_URL} from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'BIÚ — Landscape Architecture',
  description: 'BIÚ landscape architecture studio',
  icons: {
    icon: [
      {url: '/favicon.ico'},
      {url: '/icon.png', type: 'image/png', sizes: '512x512'},
    ],
    apple: [{url: '/apple-icon.png', type: 'image/png', sizes: '512x512'}],
    shortcut: '/favicon.ico',
  },
  other: {
    google: 'notranslate',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value
  const locale =
    cookieLocale === 'en' || cookieLocale === 'es' ? cookieLocale : DEFAULT_LOCALE

  return (
    <html
      lang={locale}
      className={`${abcFavorit.variable} h-full antialiased`}
    >
      <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
      <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      <body className="min-h-full flex flex-col bg-white font-sans text-black">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
