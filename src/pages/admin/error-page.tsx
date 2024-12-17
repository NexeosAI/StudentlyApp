import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

export default function AdminErrorPage() {
  const error = useRouteError()
  
  let errorMessage = 'An unexpected error occurred'
  let statusText = 'Error'
  let status = 500

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText
    statusText = error.statusText
    status = error.status
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <AlertCircle className="h-16 w-16 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold">{status} - {statusText}</h1>
        <p className="text-muted-foreground">{errorMessage}</p>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You can try:
          </p>
          <ul className="text-sm space-y-2">
            <li>
              <Link 
                to="/admin" 
                className="text-primary hover:underline"
              >
                Going back to the dashboard
              </Link>
            </li>
            <li>
              <button 
                onClick={() => window.location.reload()} 
                className="text-primary hover:underline"
              >
                Refreshing the page
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
