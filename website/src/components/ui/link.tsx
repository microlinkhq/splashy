import { cn } from '@/lib/utils'
import {
  AnchorHTMLAttributes,
  ClassAttributes,
  JSX,
  createElement
} from 'react'
import { ExternalLinkIcon } from 'lucide-react'
import NextLink from 'next/link'

export const Link = ({
  children,
  href,
  className,
  ...props
}: JSX.IntrinsicAttributes &
  ClassAttributes<HTMLAnchorElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isExternal = href && href.startsWith('http')
  const linkHref = href?.toString() || ''

  return createElement(
    isExternal ? 'a' : NextLink,
    {
      target: isExternal ? '_blank' : undefined,
      rel: isExternal ? 'noreferrer noopener' : undefined,
      ...props,
      href: linkHref,
      className: cn(
        className,
        'underline hover:text-black inline-flex items-center'
      )
    },
    children,
    isExternal &&
      createElement(
        'span',
        { className: 'ml-2', 'aria-hidden': 'true' },
        createElement(ExternalLinkIcon, { className: 'w-4' })
      )
  )
}
