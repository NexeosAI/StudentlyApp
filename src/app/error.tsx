'use client'

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

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center space-y-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Oops, something went wrong!</h1>
        <p className="text-lg text-muted-foreground mt-2">
          {error.message || "An unexpected error occurred"}
        </p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={reset}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Try again
        </button>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
