import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function BudgetPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Budget Management</CardTitle>
          <CardDescription>Monitor and control AI service costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Set budgets, track spending, and manage cost allocations for AI services.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
