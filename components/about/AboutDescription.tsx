type AboutDescriptionProps = {
  text: string
  className?: string
  /** BIU body copy is slightly larger than BASI on desktop */
  size?: 'biu' | 'basi'
}

const sizeClasses = {
  biu: 'text-sm leading-snug lg:text-base',
  basi: 'text-sm leading-snug lg:text-[15px]',
} as const

export function AboutDescription({
  text,
  className = '',
  size = 'basi',
}: AboutDescriptionProps) {
  if (!text) return null

  return (
    <p
      className={`whitespace-pre-line text-about-accent ${sizeClasses[size]} ${className}`}
    >
      {text}
    </p>
  )
}
