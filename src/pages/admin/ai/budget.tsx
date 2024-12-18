import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAIProvider } from '@/lib/store/ai-provider-store'
import { AlertTriangle, DollarSign, TrendingUp, Bell } from 'lucide-react'
import { useState } from 'react'

// Mock data for demonstration
const mockBudgetData = {
  totalBudget: 1000,
  spent: 450,
  remaining: 550,
  forecast: 850,
  alerts: [
    { id: 1, type: 'warning', message: 'OpenAI spending at 80% of monthly budget' },
    { id: 2, type: 'info', message: 'Claude usage trending 15% higher than last month' }
  ],
  history: [
    { month: 'January', spent: 450, budget: 1000 },
    { month: 'December', spent: 380, budget: 1000 },
    { month: 'November', spent: 420, budget: 1000 }
  ]
}

interface BudgetAlert {
  providerId: string
  threshold: number
  type: 'amount' | 'percentage'
  notifyEmail: string
}

export default function BudgetPage() {
  const { providers } = useAIProvider()
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [alerts] = useState<BudgetAlert[]>([
    { providerId: 'openai', threshold: 800, type: 'amount', notifyEmail: 'admin@example.com' },
    { providerId: 'anthropic', threshold: 90, type: 'percentage', notifyEmail: 'admin@example.com' }
  ])

  const progress = (mockBudgetData.spent / mockBudgetData.totalBudget) * 100
  const forecastProgress = (mockBudgetData.forecast / mockBudgetData.totalBudget) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Budget Management</h1>
          <p className="text-muted-foreground">Monitor and control AI service costs</p>
        </div>
        <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
          <DialogTrigger asChild>
            <Button>
              <Bell className="mr-2 h-4 w-4" />
              Add Alert
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Budget Alert</DialogTitle>
              <DialogDescription>
                Set up alerts for budget thresholds
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <select
                  id="provider"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  {providers.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="threshold">Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  placeholder="Enter threshold value"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Alert Type</Label>
                <select
                  id="type"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="amount">Fixed Amount</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Notification Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                />
              </div>
              <Button type="submit" className="w-full">
                Create Alert
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Budget
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockBudgetData.totalBudget}</div>
            <div className="mt-4 h-2 rounded-full bg-secondary">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              ${mockBudgetData.spent} spent of ${mockBudgetData.totalBudget}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Remaining Budget
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockBudgetData.remaining}</div>
            <p className="text-xs text-muted-foreground">
              {((mockBudgetData.remaining / mockBudgetData.totalBudget) * 100).toFixed(1)}% remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Forecasted Spend
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockBudgetData.forecast}</div>
            <div className="mt-4 h-2 rounded-full bg-secondary">
              <div
                className="h-2 rounded-full bg-yellow-500"
                style={{ width: `${forecastProgress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Projected end of month spend
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">
              Budget monitoring alerts
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Provider Budgets</CardTitle>
            <CardDescription>Budget allocation by provider</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {providers.map((provider) => (
                <div key={provider.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="font-medium">{provider.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Monthly Limit: ${provider.usageQuota?.monthly || 0}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ${provider.usageQuota?.used || 0} spent
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${provider.usageQuota?.remaining || 0} remaining
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Alerts</CardTitle>
            <CardDescription>Active budget monitoring alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => {
                const provider = providers.find(p => p.id === alert.providerId)
                return (
                  <div key={alert.providerId} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">{provider?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Alert at {alert.threshold}{alert.type === 'percentage' ? '%' : '$'}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget History</CardTitle>
          <CardDescription>Monthly budget and spending history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBudgetData.history.map((month) => (
              <div key={month.month} className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="font-medium">{month.month}</div>
                  <div className="text-sm text-muted-foreground">
                    Budget: ${month.budget}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ${month.spent} spent
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {((month.spent / month.budget) * 100).toFixed(1)}% utilized
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
