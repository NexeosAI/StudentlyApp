import { Link } from '@/components/ui/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold inline-block">StudentlyAI</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/features"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link
              href="/auth/login"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
