'use client'

type AboutContactProps = {
  email: string | null | undefined
  telephone1: string | null | undefined
  telephone2: string | null | undefined
  className?: string
}

export function AboutContact({
  email,
  telephone1,
  telephone2,
  className = '',
}: AboutContactProps) {
  const items = [email, telephone1, telephone2].filter(Boolean) as string[]

  if (items.length === 0) return null

  return (
    <div
      className={`space-y-1 text-sm leading-snug text-about-accent lg:text-[15px] ${className}`}
    >
      {email ? (
        <a href={`mailto:${email}`} className="block hover:opacity-70">
          {email}
        </a>
      ) : null}
      {telephone1 ? (
        <a href={`tel:${telephone1.replace(/\s/g, '')}`} className="block hover:opacity-70">
          {telephone1}
        </a>
      ) : null}
      {telephone2 ? (
        <a href={`tel:${telephone2.replace(/\s/g, '')}`} className="block hover:opacity-70">
          {telephone2}
        </a>
      ) : null}
    </div>
  )
}
