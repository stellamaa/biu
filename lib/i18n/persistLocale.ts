'use client'

import type {Locale} from './translations'

export async function persistLocale(locale: Locale) {
  document.documentElement.lang = locale
  await fetch('/api/locale', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({locale}),
    credentials: 'same-origin',
  })
}
