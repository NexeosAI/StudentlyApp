import { useAuth } from '@/lib/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Calculator, 
  Search, 
  BarChart, 
  LineChart, 
  Database, 
  BookOpen, 
  Brain, 
  Calendar, 
  Activity 
} from 'lucide-react'
import { Link } from 'react-router-dom'

const aiTools = [
  {
    title: "Math Solver",
    description: "Solve complex mathematical problems with AI assistance",
    icon: Calculator,
    href: "/tools/math-solver",
    color: "text-blue-500",
  },
  {
    title: "Plagiarism Detector",
    description: "Check your work for originality and citations",
    icon: Search,
    href: "/tools/plagiarism-detector",
    color: "text-red-500",
  },
  {
    title: "Data Visualizer",
    description: "Create beautiful visualizations from your data",
    icon: BarChart,
    href: "/tools/data-visualizer",
    color: "text-purple-500",
  },
  {
    title: "Statistical Assistant",
    description: "Get help with statistical analysis and interpretation",
    icon: LineChart,
    href: "/tools/statistical-assistant",
    color: "text-orange-500",
  },
  {
    title: "Digital Library",
    description: "Access and organize your academic resources",
    icon: BookOpen,
    href: "/tools/digital-library",
    color: "text-teal-500",
  },
  {
    title: "Data Collection",
    description: "Create surveys and collect research data",
    icon: Database,
    href: "/tools/data-collector",
    color: "text-indigo-500",
  },
]

export default function DashboardPage() {
  const user = useAuth((state) => state.user)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+2 from last term</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">+2.5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Essay due in 5 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-semibold">AI Tools</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {aiTools.map((tool) => (
            <Link key={tool.href} to={tool.href}>
              <Card className="p-6 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={tool.color}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold">{tool.title}</h4>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
