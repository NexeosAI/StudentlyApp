import { Metadata } from 'next'
import { Link } from '@/components/ui/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'StudentlyAI - Your AI-Powered Study Assistant',
  description: 'Enhance your learning with AI-powered study tools',
}

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center py-12">
      <div className="container flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to StudentlyAI
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Your AI-powered study assistant. Create content, study smarter, and achieve more.
        </p>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Get Started
          </Link>
          <Link
            href="/features"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
