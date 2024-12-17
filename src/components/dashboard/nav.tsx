import { Link, useLocation } from 'react-router-dom'
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
    icon: BookOpen,
  },
  {
    title: 'AI Chat',
    href: '/dashboard/tools/chat',
    icon: BrainCircuit,
  },
  {
    title: 'AI Tools',
    items: [
      {
        title: 'Math Solver',
        href: '/dashboard/tools/math-solver',
        icon: Calculator,
        color: 'text-blue-500',
        subscription: 'basic'
      },
      {
        title: 'Plagiarism Detector',
        href: '/dashboard/tools/plagiarism-detector',
        icon: Search,
        color: 'text-red-500',
        subscription: 'pro'
      },
      {
        title: 'Data Visualizer',
        href: '/dashboard/tools/data-visualizer',
        icon: BarChart,
        color: 'text-green-500',
        subscription: 'pro'
      },
      {
        title: 'Statistical Assistant',
        href: '/dashboard/tools/statistical-assistant',
        icon: LineChart,
        color: 'text-purple-500',
        subscription: 'pro'
      },
      {
        title: 'Digital Library',
        href: '/dashboard/tools/digital-library',
        icon: Library,
        color: 'text-orange-500',
        subscription: 'enterprise'
      },
      {
        title: 'Data Collection',
        href: '/dashboard/tools/data-collector',
        icon: ClipboardList,
        color: 'text-teal-500',
        subscription: 'enterprise'
      }
    ]
  },
]

const bottomNav = [
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    title: 'Help',
    href: '/dashboard/help',
    icon: HelpCircle,
  },
]

export function DashboardNav() {
  const location = useLocation()

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">StudentlyAI</span>
        </Link>
      </div>

      <div className="flex-1 space-y-4 px-2">
        {tools.map((tool) => (
          <div key={tool.title} className="space-y-1">
            <h2 className="px-4 text-lg font-semibold tracking-tight">{tool.title}</h2>
            {tool.items ? (
              <nav className="grid gap-1">
                {tool.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      location.pathname === item.href ? 'bg-accent' : 'transparent'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className={item.color}>{item.title}</span>
                    {item.subscription && (
                      <span className="text-xs text-gray-500"> ({item.subscription})</span>
                    )}
                  </Link>
                ))}
              </nav>
            ) : (
              <nav className="grid gap-1">
                <Link
                  to={tool.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    location.pathname === tool.href ? 'bg-accent' : 'transparent'
                  )}
                >
                  <tool.icon className="h-4 w-4" />
                  {tool.title}
                </Link>
              </nav>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto border-t">
        <nav className="grid gap-1 p-2">
          {bottomNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                location.pathname === item.href ? 'bg-accent' : 'transparent'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
