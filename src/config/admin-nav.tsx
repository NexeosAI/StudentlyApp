import {
  LayoutDashboard,
  Bot,
  Settings,
  Users,
  FileText,
  BarChart3,
  AlertCircle,
  History,
  Cpu,
  LineChart,
  DollarSign,
  FileSearch
} from 'lucide-react'

export const adminNavItems = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard
      }
    ]
  },
  {
    title: 'AI Management',
    items: [
      {
        title: 'Providers',
        href: '/admin/ai/providers',
        icon: Bot
      },
      {
        title: 'Models',
        href: '/admin/ai/models',
        icon: Cpu
      },
      {
        title: 'Usage Analytics',
        href: '/admin/ai/analytics',
        icon: LineChart
      },
      {
        title: 'Budget Alerts',
        href: '/admin/ai/budget',
        icon: DollarSign
      },
      {
        title: 'Audit Log',
        href: '/admin/ai/audit',
        icon: FileSearch
      }
    ]
  }
]
