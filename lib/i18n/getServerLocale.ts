import {cookies} from 'next/headers'
import {DEFAULT_LOCALE, LOCALE_COOKIE} from './constants'
import type {Locale} from './translations'

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get(LOCALE_COOKIE)?.value
  if (value === 'en' || value === 'es') return value
  return DEFAULT_LOCALE
}
