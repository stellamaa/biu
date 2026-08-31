import Link from 'next/link'

type BiuLogoProps = {
  className?: string
  href?: string
}

export function BiuLogo({className = '', href}: BiuLogoProps) {
  const logo = (
    <span
      className={`text-2xl font-light tracking-tight lg:text-[25px] lg:leading-none 3xl:text-4xl ${className}`}
    >
      BI&Uacute;
    </span>
  )

  if (href) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-60">
        {logo}
      </Link>
    )
  }

  return logo
}
