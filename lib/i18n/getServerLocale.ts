import {cookies} from 'next/headers'
import {LOCALE_COOKIE} from './constants'
import type {Locale} from './translations'

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get(LOCALE_COOKIE)?.value
  return value === 'en' ? 'en' : 'es'
}
