'use client'

import {DEFAULT_LOCALE, LOCALE_COOKIE} from './constants'
import type {Locale} from './translations'

type Listener = () => void

let locale: Locale = DEFAULT_LOCALE
let initialized = false
const listeners = new Set<Listener>()

function isLocale(value: string | undefined | null): value is Locale {
  return value === 'en' || value === 'es'
}

export function readLocaleCookie(): Locale | null {
  if (typeof document === 'undefined') return null

  for (const entry of document.cookie.split(';')) {
    const [rawName, rawValue] = entry.trim().split('=')
    if (rawName === LOCALE_COOKIE && isLocale(rawValue)) {
      return rawValue
    }
  }

  return null
}

function writeLocaleCookie(next: Locale) {
  const maxAge = 60 * 60 * 24 * 365
  const secure =
    typeof window !== 'undefined' && window.location.protocol === 'https:'
      ? ';secure'
      : ''

  document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${maxAge};samesite=lax${secure}`
}

export function initLocaleClient(fallback: Locale = DEFAULT_LOCALE): Locale {
  if (typeof window === 'undefined') return fallback

  if (!initialized) {
    locale = readLocaleCookie() ?? fallback
    initialized = true
    document.documentElement.lang = locale
  }

  return locale
}

export function getLocaleSnapshot(): Locale {
  return locale
}

export function subscribeLocale(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function notifyLocaleListeners() {
  listeners.forEach((listener) => listener())
}

export function setLocaleClient(next: Locale): void {
  if (!isLocale(next) || locale === next) return

  locale = next

  if (typeof document !== 'undefined') {
    document.documentElement.lang = next
    writeLocaleCookie(next)
  }

  notifyLocaleListeners()
}
