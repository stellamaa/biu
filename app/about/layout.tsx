import type {Metadata, Viewport} from 'next'

export const metadata: Metadata = {
  title: 'About — BIÚ',
}

export const viewport: Viewport = {
  themeColor: '#575048',
}

export default function AboutLayout({children}: {children: React.ReactNode}) {
  return children
}
