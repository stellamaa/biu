'use client'

import {PortableText, type PortableTextComponents} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import type {ProjectDescriptionBlock} from '@/lib/i18n/portableText'

type ProjectDescriptionProps = {
  value: ProjectDescriptionBlock[]
  className?: string
  paragraphClassName?: string
}

function createComponents(paragraphClassName: string): PortableTextComponents {
  return {
    block: {
      normal: ({children}) => (
        <p className={paragraphClassName}>{children}</p>
      ),
    },
  }
}

export function ProjectDescription({
  value,
  className = '',
  paragraphClassName = '',
}: ProjectDescriptionProps) {
  if (!value.length) return null

  return (
    <div className={className}>
      <PortableText
        value={value as unknown as PortableTextBlock[]}
        components={createComponents(paragraphClassName)}
      />
    </div>
  )
}
