import * as React from 'react'
import { type LinkProps as NextLinkProps } from 'next/link'
import { default as NextLink } from 'next/link'

export type LinkProps = NextLinkProps & {
  children: React.ReactNode
  className?: string
  [key: string]: any
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, ...props }, ref) => (
    <NextLink {...props} className={className} ref={ref}>
      {children}
    </NextLink>
  )
)
Link.displayName = 'Link'

export { Link }
