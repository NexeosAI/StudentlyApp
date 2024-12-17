import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-4">
      <div className="space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404 - Page Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-[600px] mx-auto">
            Oops! The page you're looking for seems to have gone on a study break. Let's get you back on track.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <img
          src="/images/404-illustration.svg"
          alt="404 Illustration"
          className="max-w-[400px] mx-auto"
        />
      </div>
    </div>
  )
}
