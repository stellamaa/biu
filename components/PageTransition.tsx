'use client'

import {usePathname, useRouter} from 'next/navigation'
import {useEffect, useRef, useState} from 'react'
import {PAGE_TRANSITION_FADE_OUT_MS} from '@/lib/navigation/pageTransition'

type PageTransitionProps = {
  children: React.ReactNode
}

export function PageTransition({children}: PageTransitionProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const prevPathnameRef = useRef(pathname)
  const skipTransition = pathname.startsWith('/admin')

  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname
      setIsFadingOut(false)
      setIsReady(false)
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsReady(true))
      })
      return () => cancelAnimationFrame(frame)
    }

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsReady(true))
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  useEffect(() => {
    const handleTransitionNavigate = () => setIsFadingOut(true)
    const handleFadeIn = () => {
      setIsFadingOut(false)
      setIsReady(false)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsReady(true))
      })
    }

    window.addEventListener('page-transition-navigate', handleTransitionNavigate)
    window.addEventListener('page-transition-fade-in', handleFadeIn)
    return () => {
      window.removeEventListener(
        'page-transition-navigate',
        handleTransitionNavigate,
      )
      window.removeEventListener('page-transition-fade-in', handleFadeIn)
    }
  }, [])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const target = (event.target as Element).closest('a')
      if (!target?.href) return

      try {
        const url = new URL(target.href)
        if (url.origin !== window.location.origin) return
        if (target.target === '_blank' || target.hasAttribute('download')) {
          return
        }
        if (url.pathname === pathname) return

        event.preventDefault()
        setIsFadingOut(true)
        window.setTimeout(() => {
          router.push(url.pathname + url.search)
        }, PAGE_TRANSITION_FADE_OUT_MS)
      } catch {
        // Invalid URL, let default behavior handle it
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname, router])

  if (skipTransition) {
    return <div className="min-h-full flex-1">{children}</div>
  }

  const fadeOut = isFadingOut ? 'animate-page-fade-out' : ''
  const fadeIn = isReady && !isFadingOut ? 'animate-page-fade-in' : 'opacity-0'

  return (
    <div
      className={`flex min-h-full flex-1 flex-col bg-white ${fadeOut} ${fadeIn}`}
    >
      {children}
    </div>
  )
}
