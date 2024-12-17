import { Card } from '@/components/ui/card'
import { useAIProviderStore } from '@/lib/store/ai-provider-store'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export default function AnalyticsPage() {
  const { providers, models, usageMetrics } = useAIProviderStore()
  const [timeRange, setTimeRange] = useState('7d')

  const totalCost = usageMetrics.reduce((sum, m) => sum + m.cost, 0)
  const totalTokens = usageMetrics.reduce((sum, m) => sum + m.tokens, 0)

  const costByProvider = providers.map((provider) => ({
    name: provider.name,
    value: usageMetrics
      .filter((m) => m.providerId === provider.id)
      .reduce((sum, m) => sum + m.cost, 0),
  }))

  const dailyUsage = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const metrics = usageMetrics.filter(
      (m) => new Date(m.timestamp).toDateString() === date.toDateString()
    )
    return {
      date: date.toLocaleDateString(),
      tokens: metrics.reduce((sum, m) => sum + m.tokens, 0),
      cost: metrics.reduce((sum, m) => sum + m.cost, 0),
    }
  }).reverse()

  const handleExport = () => {
    const csv = [
      ['Date', 'Provider', 'Model', 'Tokens', 'Cost'],
      ...usageMetrics.map((m) => [
        new Date(m.timestamp).toLocaleDateString(),
        providers.find((p) => p.id === m.providerId)?.name,
        models.find((model) => model.id === m.modelId)?.name,
        m.tokens,
        m.cost.toFixed(6),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-usage-metrics.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Usage Analytics</h1>
          <p className="text-muted-foreground">
            Monitor AI usage and costs across providers
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="font-semibold">Total Cost</h3>
          <div className="mt-2 text-2xl font-bold">
            ${totalCost.toFixed(2)}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">Total Tokens</h3>
          <div className="mt-2 text-2xl font-bold">
            {totalTokens.toLocaleString()}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">Active Providers</h3>
          <div className="mt-2 text-2xl font-bold">
            {providers.length}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Daily Usage</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="tokens"
                  stroke="#8884d8"
                  name="Tokens"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cost"
                  stroke="#82ca9d"
                  name="Cost ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Cost by Provider</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costByProvider}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {costByProvider.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
