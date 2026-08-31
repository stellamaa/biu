import {NextResponse} from 'next/server'
import {translateText} from '@/lib/i18n/translateContent'
import type {Locale} from '@/lib/i18n/translations'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let text: unknown
  let locale: unknown

  try {
    const body = (await request.json()) as {text?: unknown; locale?: unknown}
    text = body.text
    locale = body.locale
  } catch {
    return NextResponse.json({error: 'Invalid body'}, {status: 400})
  }

  if (typeof text !== 'string') {
    return NextResponse.json({error: 'Invalid text'}, {status: 400})
  }

  if (locale !== 'en' && locale !== 'es') {
    return NextResponse.json({error: 'Invalid locale'}, {status: 400})
  }

  const translated = await translateText(text, locale as Locale)
  return NextResponse.json({text: translated})
}
