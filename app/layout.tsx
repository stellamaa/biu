import type {Metadata} from 'next'
import localFont from 'next/font/local'
import {cookies} from 'next/headers'
import {LOCALE_COOKIE} from '@/lib/i18n/constants'
import './globals.css'

const abcFavorit = localFont({
  src: './fonts/ABCFavorit-Regular-Trial.otf',
  variable: '--font-abc-favorit',
  display: 'swap',
  weight: '400',
  style: 'normal',
})

export const metadata: Metadata = {
  title: 'BIÚ — Landscape Architecture',
  description: 'BIÚ landscape architecture studio',
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
  const locale = cookieStore.get(LOCALE_COOKIE)?.value === 'en' ? 'en' : 'es'

  return (
    <html
      lang={locale}
      className={`${abcFavorit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-black">
        {children}
      </body>
    </html>
  )
}
