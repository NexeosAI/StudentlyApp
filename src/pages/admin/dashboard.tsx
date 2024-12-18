import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAIProvider } from '@/lib/store/ai-provider-store'
import { useAIModels } from '@/lib/store/ai-models-store'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, CheckCircle, DollarSign, Settings, TrendingUp, Users, XCircle } from 'lucide-react'

// Mock data for demonstration
const mockMetrics = {
  totalRequests: 125000,
  activeUsers: 1250,
  avgResponseTime: 1.8,
  errorRate: 0.5,
  monthlySpend: 450,
  monthlyBudget: 1000,
  recentEvents: [
    { id: 1, type: 'error', message: 'API rate limit exceeded for OpenAI', time: '5 minutes ago' },
    { id: 2, type: 'success', message: 'New model GPT-4 Turbo added', time: '1 hour ago' },
    { id: 3, type: 'warning', message: 'Claude API usage approaching limit', time: '2 hours ago' }
  ]
}

const getStatusIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case 'error':
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return null
  }
}

export default function AdminDashboard() {
  const { providers } = useAIProvider()
  const { models } = useAIModels()

  const activeProviders = providers.filter(p => p.status === 'active')
  const totalModels = models.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">AI service overview and metrics</p>
        </div>
        <Link to="/admin/ai/providers">
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Manage Providers
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Spend
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockMetrics.monthlySpend}</div>
            <div className="mt-2 h-2 rounded-full bg-secondary">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${(mockMetrics.monthlySpend / mockMetrics.monthlyBudget) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              ${mockMetrics.monthlyBudget - mockMetrics.monthlySpend} remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +5% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Error Rate
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.errorRate}%</div>
            <p className="text-xs text-muted-foreground">
              -0.2% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>AI Providers</CardTitle>
            <CardDescription>Active providers and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {providers.map((provider) => (
                <div key={provider.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <div className="font-medium">{provider.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {provider.models.length} models available
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`rounded-full px-2 py-1 text-xs font-medium ${
                      provider.status === 'active' ? 'bg-green-50 text-green-700' :
                      provider.status === 'error' ? 'bg-red-50 text-red-700' :
                      'bg-yellow-50 text-yellow-700'
                    }`}>
                      {provider.status}
                    </div>
                    <Link to={`/admin/ai/providers`}>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Latest system events and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMetrics.recentEvents.map((event) => (
                <div key={event.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(event.type)}
                      <span className="font-medium">{event.message}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
              <Link to="/admin/ai/audit">
                <Button variant="outline" className="w-full">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Overall system health and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Providers</span>
                <span className="font-medium">{activeProviders.length} / {providers.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Available Models</span>
                <span className="font-medium">{totalModels}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Response Time</span>
                <span className="font-medium">{mockMetrics.avgResponseTime}s</span>
              </div>
              <Link to="/admin/ai/analytics">
                <Button variant="outline" className="w-full">
                  View Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
            <CardDescription>Monthly spending and budget status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Monthly Budget</span>
                  <span className="font-medium">${mockMetrics.monthlyBudget}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${(mockMetrics.monthlySpend / mockMetrics.monthlyBudget) * 100}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  ${mockMetrics.monthlySpend} spent ({((mockMetrics.monthlySpend / mockMetrics.monthlyBudget) * 100).toFixed(1)}%)
                </div>
              </div>
              <Link to="/admin/ai/budget">
                <Button variant="outline" className="w-full">
                  Manage Budget
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link to="/admin/ai/models/add">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Add New Model
                </Button>
              </Link>
              <Link to="/admin/ai/providers">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure Provider
                </Button>
              </Link>
              <Link to="/admin/ai/budget">
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Update Budget
                </Button>
              </Link>
              <Link to="/admin/ai/audit">
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  View Audit Log
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
