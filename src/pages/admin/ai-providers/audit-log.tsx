import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Audit Log</CardTitle>
          <CardDescription>Track AI service usage and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            View detailed logs of AI service usage, configuration changes, and system events.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
