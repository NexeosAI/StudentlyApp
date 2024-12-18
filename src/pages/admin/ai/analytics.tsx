import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAIProvider } from "@/lib/store/ai-provider-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ModelUsageData {
  tokens: number
  cost: number
  avgResponseTime: number
}

interface PerformanceData {
  avgResponseTime: number
  successRate: number
  errorRate: number
  concurrentRequests: number
}

interface UsageData {
  daily: Array<{
    date: string
    tokens: number
    cost: number
  }>
  modelUsage: Record<string, ModelUsageData>
  performance: PerformanceData
}

// Mock data for demonstration
const mockUsageData: UsageData = {
  daily: [
    { date: '2024-01-01', tokens: 125000, cost: 0.25 },
    { date: '2024-01-02', tokens: 150000, cost: 0.30 },
    { date: '2024-01-03', tokens: 175000, cost: 0.35 },
    { date: '2024-01-04', tokens: 200000, cost: 0.40 },
    { date: '2024-01-05', tokens: 225000, cost: 0.45 },
  ],
  modelUsage: {
    'gpt-4': { tokens: 500000, cost: 15.00, avgResponseTime: 2.3 },
    'gpt-3.5-turbo': { tokens: 1500000, cost: 3.00, avgResponseTime: 1.1 },
    'claude-2': { tokens: 750000, cost: 6.00, avgResponseTime: 1.8 },
  },
  performance: {
    avgResponseTime: 1.7,
    successRate: 99.2,
    errorRate: 0.8,
    concurrentRequests: 45,
  }
}

export default function AnalyticsPage() {
  const { providers } = useAIProvider()

  const totalCost = Object.values(mockUsageData.modelUsage)
    .reduce((sum, { cost }) => sum + cost, 0)
  
  const totalTokens = Object.values(mockUsageData.modelUsage)
    .reduce((sum, { tokens }) => sum + tokens, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Monitor AI service usage and performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Cost (30d)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Tokens (30d)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalTokens / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsageData.performance.successRate}%</div>
            <p className="text-xs text-muted-foreground">
              +0.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsageData.performance.avgResponseTime}s</div>
            <p className="text-xs text-muted-foreground">
              -0.2s from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Usage by Model</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Usage</CardTitle>
              <CardDescription>Token usage and costs by model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(mockUsageData.modelUsage).map(([model, data]) => (
                  <div key={model} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="font-medium">{model}</div>
                      <div className="text-sm text-muted-foreground">
                        {(data.tokens / 1000).toLocaleString()}k tokens
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${data.cost.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        {data.avgResponseTime}s avg
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>Response times and error rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Success Rate</div>
                    <div className="text-2xl">{mockUsageData.performance.successRate}%</div>
                    <div className="text-sm text-muted-foreground">
                      {mockUsageData.performance.errorRate}% error rate
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Response Time</div>
                    <div className="text-2xl">{mockUsageData.performance.avgResponseTime}s</div>
                    <div className="text-sm text-muted-foreground">
                      Average response time
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis</CardTitle>
              <CardDescription>Cost breakdown by provider and model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {providers.map((provider) => (
                  <div key={provider.id} className="space-y-2">
                    <div className="font-medium">{provider.name}</div>
                    {provider.models.map((model) => (
                      <div key={model.id} className="flex items-center justify-between text-sm">
                        <span>{model.name}</span>
                        <span>${(model.costPerToken * 1000).toFixed(4)}/1K tokens</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
