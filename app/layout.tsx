import type {Metadata} from 'next'
import localFont from 'next/font/local'
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${abcFavorit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-black">
        {children}
      </body>
    </html>
  )
}
