import {type NextRequest, NextResponse} from 'next/server'
import {
  SITE_UNLOCK_COOKIE,
  isSitePasswordEnabled,
  verifyUnlockPassword,
} from '@/lib/site-password'

export async function middleware(request: NextRequest) {
  const sitePassword = process.env.SITE_PASSWORD

  if (!isSitePasswordEnabled() || !sitePassword) {
    return NextResponse.next()
  }

  const {pathname} = request.nextUrl
  const isMetadataPath =
    pathname === '/favicon.ico' ||
    pathname === '/icon.png' ||
    pathname === '/apple-icon.png' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/icon' ||
    pathname.startsWith('/icon?') ||
    pathname === '/apple-icon' ||
    pathname.startsWith('/apple-icon?')

  const isPublicPath =
    pathname === '/coming-soon' ||
    pathname.startsWith('/api/site-unlock') ||
    pathname === '/api/locale' ||
    pathname === '/api/translate' ||
    isMetadataPath

  const token = request.cookies.get(SITE_UNLOCK_COOKIE)?.value
  const isUnlocked = await verifyUnlockPassword(token, sitePassword)

  if (isUnlocked) {
    if (pathname === '/coming-soon') {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  if (isPublicPath) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/coming-soon', request.url))
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
