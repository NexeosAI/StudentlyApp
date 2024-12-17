import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const usageData = [
  { name: "Mon", tokens: 4000, cost: 120 },
  { name: "Tue", tokens: 3000, cost: 90 },
  { name: "Wed", tokens: 5000, cost: 150 },
  { name: "Thu", tokens: 2780, cost: 83 },
  { name: "Fri", tokens: 1890, cost: 57 },
  { name: "Sat", tokens: 2390, cost: 72 },
  { name: "Sun", tokens: 3490, cost: 105 },
]

export default function AIAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Usage Analytics</h2>
        <p className="text-muted-foreground">Monitor AI usage and costs</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Usage</CardTitle>
            <CardDescription>Past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22,550 tokens</div>
            <p className="text-xs text-muted-foreground">+15.8% from last week</p>
            <div className="h-[200px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tokens" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Cost</CardTitle>
            <CardDescription>Past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$677.00</div>
            <p className="text-xs text-muted-foreground">+12.3% from last week</p>
            <div className="h-[200px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cost" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Distribution</CardTitle>
            <CardDescription>Usage by model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>GPT-4</div>
                <div className="font-medium">45%</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Claude 2</div>
                <div className="font-medium">35%</div>
              </div>
              <div className="flex items-center justify-between">
                <div>GPT-3.5</div>
                <div className="font-medium">20%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
