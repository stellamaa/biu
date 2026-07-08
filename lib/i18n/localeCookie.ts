import type {Locale} from './translations'
import {LOCALE_COOKIE} from './constants'

export function readLocaleCookie(): Locale | null {
  if (typeof document === 'undefined') return null

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=(en|es)(?:;|$)`),
  )

  return match?.[1] === 'en' ? 'en' : match?.[1] === 'es' ? 'es' : null
}

export function writeLocaleCookie(locale: Locale) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax${secure}`
}
