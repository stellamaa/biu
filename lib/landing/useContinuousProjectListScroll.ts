'use client'

import {useCallback, useEffect, useRef} from 'react'

type UseContinuousProjectListScrollOptions = {
  itemHeight: number
  enabled?: boolean
}

export function useContinuousProjectListScroll(
  projectCount: number,
  {itemHeight, enabled = true}: UseContinuousProjectListScrollOptions,
) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const cycleHeight = projectCount * itemHeight

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || !enabled || projectCount === 0) return

    if (el.scrollTop >= cycleHeight) {
      el.scrollTop -= cycleHeight
    }
  }, [cycleHeight, enabled, projectCount])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || !enabled || projectCount === 0) return

    el.scrollTop = 0
  }, [cycleHeight, enabled, projectCount])

  return {
    scrollRef,
    cycleHeight,
    handleScroll,
  }
}
