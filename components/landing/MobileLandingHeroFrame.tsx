'use client'

import {useEffect, type ReactNode} from 'react'

type MobileLandingHeroFrameProps = {
  activeIndex: number
  projectCount: number
  lqip?: string | null
  children: ReactNode
}

export function MobileLandingHeroFrame({
  activeIndex,
  projectCount,
  lqip,
  children,
}: MobileLandingHeroFrameProps) {
  useEffect(() => {
    if (projectCount === 0) return

    const active = activeIndex % projectCount
    const layers = document.querySelectorAll<HTMLElement>('.mobile-hero-layer')

    layers.forEach((layer) => {
      const index = Number(layer.dataset.heroIndex)
      layer.style.opacity = index === active ? '1' : '0'
    })
  }, [activeIndex, projectCount])

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 bg-cover bg-center"
      style={lqip ? {backgroundImage: `url(${lqip})`} : undefined}
    >
      {children}
    </div>
  )
}
