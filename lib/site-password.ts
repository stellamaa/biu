export const SITE_UNLOCK_COOKIE = 'biu_site_unlock'

const UNLOCK_PREFIX = 'biu-unlock:'

export function isSitePasswordEnabled(): boolean {
  return Boolean(process.env.SITE_PASSWORD)
}

export async function getUnlockToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`${UNLOCK_PREFIX}${password}`)
  const hash = await crypto.subtle.digest('SHA-256', data)

  return [...new Uint8Array(hash)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export function verifyUnlockToken(
  token: string | undefined,
  expected: string,
): boolean {
  if (!token || token.length !== expected.length) return false

  let result = 0
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expected.charCodeAt(i)
  }

  return result === 0
}

export async function verifyUnlockPassword(
  token: string | undefined,
  password: string,
): Promise<boolean> {
  const expected = await getUnlockToken(password)
  return verifyUnlockToken(token, expected)
}
