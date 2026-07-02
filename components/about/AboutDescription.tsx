type AboutDescriptionProps = {
  text: string
  className?: string
}

export function AboutDescription({text, className = ''}: AboutDescriptionProps) {
  if (!text) return null

  return (
    <p
      className={`whitespace-pre-line text-sm leading-snug text-about-accent lg:text-base ${className}`}
    >
      {text}
    </p>
  )
}
