import * as React from 'react'
import { type LinkProps } from 'next/link'
import { default as NextLink } from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Link = React.forwardRef<HTMLAnchorElement, LinkProps & { children: React.ReactNode }>(
  ({ children, ...props }, ref) => (
    <NextLink {...props} ref={ref}>
      {children}
    </NextLink>
  )
)
Link.displayName = 'Link'

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center space-y-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold mt-2">Page not found</h2>
        <p className="text-lg text-muted-foreground mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "default" }))}
      >
        Go back home
      </Link>
    </div>
  )
}
