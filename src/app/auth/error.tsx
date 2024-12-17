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

export default function AuthError({
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
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Authentication Error
          </h1>
          <p className="text-sm text-muted-foreground">
            {error.message || "An error occurred during authentication"}
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
    </div>
  )
}
