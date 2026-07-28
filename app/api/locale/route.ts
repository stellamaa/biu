import {NextResponse} from 'next/server'
import {LOCALE_COOKIE} from '@/lib/i18n/constants'
import type {Locale} from '@/lib/i18n/translations'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let locale: unknown

  try {
    const body = (await request.json()) as {locale?: unknown}
    locale = body.locale
  } catch {
    return NextResponse.json({error: 'Invalid body'}, {status: 400})
  }

  if (locale !== 'en' && locale !== 'es') {
    return NextResponse.json({error: 'Invalid locale'}, {status: 400})
  }

  const response = NextResponse.json({ok: true, locale: locale as Locale})
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
