import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import {ComingSoonForm} from '@/components/coming-soon/ComingSoonForm'
import {
  SITE_UNLOCK_COOKIE,
  isSitePasswordEnabled,
  verifyUnlockPassword,
} from '@/lib/site-password'

export default async function ComingSoonPage() {
  const sitePassword = process.env.SITE_PASSWORD

  if (!isSitePasswordEnabled() || !sitePassword) {
    redirect('/')
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(SITE_UNLOCK_COOKIE)?.value

  if (await verifyUnlockPassword(token, sitePassword)) {
    redirect('/')
  }

  return <ComingSoonForm />
}
