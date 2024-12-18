import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AIProvidersModelsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Provider Models</CardTitle>
          <CardDescription>Configure and manage AI models from providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Configure and manage AI models available from your service providers.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
