'use client'

import type {Locale} from './translations'

/** Persist locale to the server cookie (client cookie is written synchronously elsewhere). */
export async function persistLocale(locale: Locale): Promise<boolean> {
  try {
    const response = await fetch('/api/locale', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({locale}),
      credentials: 'same-origin',
      keepalive: true,
    })

    return response.ok
  } catch {
    return false
  }
}
