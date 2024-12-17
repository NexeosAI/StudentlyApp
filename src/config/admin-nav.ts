import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Shield,
  BookOpen,
  Box,
  CreditCard,
  BarChart3,
  Bot,
  LineChart,
  AlertTriangle,
  History,
  type LucideIcon
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

interface NavSection {
  title: string
  items: NavItem[]
}

export const adminNavItems: NavSection[] = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard
      },
      {
        title: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3
      }
    ]
  },
  {
    title: 'AI Management',
    items: [
      {
        title: 'Providers',
        href: '/admin/ai-providers',
        icon: Bot
      },
      {
        title: 'Models',
        href: '/admin/ai-providers/models',
        icon: Box
      },
      {
        title: 'Usage Analytics',
        href: '/admin/ai-providers/analytics',
        icon: LineChart
      },
      {
        title: 'Budget Alerts',
        href: '/admin/ai-providers/budget',
        icon: AlertTriangle
      },
      {
        title: 'Audit Log',
        href: '/admin/ai-providers/audit-log',
        icon: History
      }
    ]
  },
  {
    title: 'Management',
    items: [
      {
        title: 'Users',
        href: '/admin/users',
        icon: Users
      },
      {
        title: 'Content',
        href: '/admin/content',
        icon: FileText
      },
      {
        title: 'Learning',
        href: '/admin/learning',
        icon: BookOpen
      },
      {
        title: 'Billing',
        href: '/admin/billing',
        icon: CreditCard
      }
    ]
  },
  {
    title: 'System',
    items: [
      {
        title: 'Security',
        href: '/admin/security',
        icon: Shield
      },
      {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings
      }
    ]
  }
]
