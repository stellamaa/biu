import {NextResponse} from 'next/server'
import {
  SITE_UNLOCK_COOKIE,
  getUnlockToken,
  isSitePasswordEnabled,
} from '@/lib/site-password'

export async function POST(request: Request) {
  const sitePassword = process.env.SITE_PASSWORD

  if (!isSitePasswordEnabled() || !sitePassword) {
    return NextResponse.json({ok: true})
  }

  let password = ''

  try {
    const body = (await request.json()) as {password?: string}
    password = body.password ?? ''
  } catch {
    return NextResponse.json({ok: false}, {status: 400})
  }

  if (password !== sitePassword) {
    return NextResponse.json({ok: false}, {status: 401})
  }

  const response = NextResponse.json({ok: true})
  response.cookies.set(
    SITE_UNLOCK_COOKIE,
    await getUnlockToken(sitePassword),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    },
  )

  return response
}
