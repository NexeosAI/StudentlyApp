import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Usage Analytics</CardTitle>
          <CardDescription>Monitor AI service usage and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Track usage metrics, costs, and performance analytics for your AI services.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
