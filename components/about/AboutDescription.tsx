type AboutDescriptionProps = {
  text: string
  className?: string
}

export function AboutDescription({text, className = ''}: AboutDescriptionProps) {
  if (!text) return null

  return (
    <p
      className={`whitespace-pre-line text-sm leading-snug text-about-accent lg:text-sm 2xl:text-lg 3xl:text-3xl 4xl:text-5xl ${className}`}
    >
      {text}
    </p>
  )
}
