export const PAGE_TRANSITION_FADE_OUT_MS = 400

type RouterPush = {
  push: (href: string) => void
}

export function navigateWithTransition(router: RouterPush, href: string) {
  if (typeof window === 'undefined') {
    router.push(href)
    return
  }

  window.dispatchEvent(new CustomEvent('page-transition-navigate'))
  window.setTimeout(() => {
    router.push(href)
  }, PAGE_TRANSITION_FADE_OUT_MS)
}
