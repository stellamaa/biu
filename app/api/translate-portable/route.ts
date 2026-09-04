import {NextResponse} from 'next/server'
import {translatePortableText} from '@/lib/i18n/portableText'
import type {ProjectDescriptionBlock} from '@/lib/i18n/portableText'
import type {Locale} from '@/lib/i18n/translations'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let blocks: unknown
  let locale: unknown

  try {
    const body = (await request.json()) as {
      blocks?: unknown
      locale?: unknown
    }
    blocks = body.blocks
    locale = body.locale
  } catch {
    return NextResponse.json({error: 'Invalid body'}, {status: 400})
  }

  if (!Array.isArray(blocks)) {
    return NextResponse.json({error: 'Invalid blocks'}, {status: 400})
  }

  if (locale !== 'en' && locale !== 'es') {
    return NextResponse.json({error: 'Invalid locale'}, {status: 400})
  }

  const translated = await translatePortableText(
    blocks as ProjectDescriptionBlock[],
    locale as Locale,
  )

  return NextResponse.json({blocks: translated})
}
