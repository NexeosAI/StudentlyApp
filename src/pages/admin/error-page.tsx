import { useRouteError } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminErrorPage() {
  const error = useRouteError() as Error

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="max-w-md w-full mx-4">
        <CardHeader>
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription>An error occurred while loading this page</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {error?.message || 'Unknown error occurred'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
