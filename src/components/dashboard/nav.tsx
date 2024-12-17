import { Link } from '@/components/ui/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Calculator,
  GraduationCap,
  BookOpen,
  PenTool,
  BrainCircuit,
  Settings,
  HelpCircle,
  Search,
  BarChart,
  LineChart,
  Library,
  ClipboardList,
} from 'lucide-react'

const tools = [
  {
    title: 'Study Planner',
    href: '/dashboard/tools/study-planner',
    icon: GraduationCap,
  },
  {
    title: 'Note Taking',
    href: '/dashboard/tools/notes',
    icon: PenTool,
  },
  {
    title: 'Research Helper',
    href: '/dashboard/tools/research',
    icon: Search,
  },
  {
    title: 'Calculator',
    href: '/dashboard/tools/calculator',
    icon: Calculator,
  },
]

const analysis = [
  {
    title: 'Study Analysis',
    href: '/dashboard/analysis/study',
    icon: BarChart,
  },
  {
    title: 'Progress Tracking',
    href: '/dashboard/analysis/progress',
    icon: LineChart,
  },
]

const resources = [
  {
    title: 'Library',
    href: '/dashboard/resources/library',
    icon: Library,
  },
  {
    title: 'Study Materials',
    href: '/dashboard/resources/materials',
    icon: BookOpen,
  },
  {
    title: 'Exam Prep',
    href: '/dashboard/resources/exam-prep',
    icon: ClipboardList,
  },
]

const support = [
  {
    title: 'AI Assistant',
    href: '/dashboard/support/ai',
    icon: BrainCircuit,
  },
  {
    title: 'Help Center',
    href: '/dashboard/support/help',
    icon: HelpCircle,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

interface DashboardNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardNav({ className, ...props }: DashboardNavProps) {
  return (
    <nav
      className={cn("flex flex-col space-y-6 p-6", className)}
      {...props}
    >
      <div className="space-y-1">
        <h4 className="px-2 py-1 text-sm font-semibold">Tools</h4>
        {tools.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-2 py-1 text-sm hover:bg-accent"
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
      <div className="space-y-1">
        <h4 className="px-2 py-1 text-sm font-semibold">Analysis</h4>
        {analysis.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-2 py-1 text-sm hover:bg-accent"
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
      <div className="space-y-1">
        <h4 className="px-2 py-1 text-sm font-semibold">Resources</h4>
        {resources.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-2 py-1 text-sm hover:bg-accent"
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
      <div className="space-y-1">
        <h4 className="px-2 py-1 text-sm font-semibold">Support</h4>
        {support.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-2 py-1 text-sm hover:bg-accent"
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}
