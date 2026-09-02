import Link from 'next/link'
import {abcFavoritLight} from '@/app/fonts'
import {landingDesktopLogoTextClass} from '@/lib/layout/landingDesktopTypography'

type BiuLogoProps = {
  className?: string
  href?: string
}

export function BiuLogo({className = '', href}: BiuLogoProps) {
  const logo = (
    <span
      className={`${abcFavoritLight.className} text-2xl tracking-tight lg:text-[25px] lg:leading-none ${landingDesktopLogoTextClass} ${className}`}
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
