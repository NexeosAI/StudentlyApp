import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  CreditCard,
  Users,
  FolderOpen,
  FileText,
  MessageSquare,
  Mic,
  Edit,
  FileEdit,
  BookOpen,
  GraduationCap,
  ChevronLeft,
} from 'lucide-react'
import { useSidebar } from '@/lib/store/sidebar-store'

interface SidebarProps {
  className?: string
}

interface NavItem {
  title: string
  icon: React.ReactNode
  href: string
}

const navItems: NavItem[] = [
  { title: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
  { title: 'My Subscription', icon: <CreditCard size={20} />, href: '/subscription' },
  { title: 'Affiliate System', icon: <Users size={20} />, href: '/affiliate' },
  { title: 'Folders', icon: <FolderOpen size={20} />, href: '/folders' },
  { title: 'All Projects', icon: <FileText size={20} />, href: '/projects' },
  { title: 'AI Chat', icon: <MessageSquare size={20} />, href: '/chat' },
  { title: 'AI Audio Notes', icon: <Mic size={20} />, href: '/audio-notes' },
  { title: 'AI Editor', icon: <Edit size={20} />, href: '/editor' },
  { title: 'AI Writer', icon: <FileEdit size={20} />, href: '/writer' },
  { title: 'Assignment Generator', icon: <BookOpen size={20} />, href: '/assignments' },
  { title: 'Exam Prep', icon: <GraduationCap size={20} />, href: '/exam-prep' },
]

export function Sidebar({ className }: SidebarProps) {
  const { collapsed, toggle } = useSidebar()
  const location = useLocation()

  return (
    <aside className={cn(
      'h-full bg-background border-r shrink-0',
      collapsed ? 'w-16' : 'w-64',
      className
    )}>
      <button
        onClick={toggle}
        className="w-full h-12 flex items-center justify-end px-4 border-b hover:bg-accent/50"
      >
        <ChevronLeft
          size={20}
          className={cn(
            'transition-transform',
            collapsed && 'rotate-180'
          )}
        />
      </button>

      <nav>
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center gap-3 px-4 h-12',
              'hover:bg-accent/50',
              location.pathname === item.href && 'bg-accent'
            )}
          >
            {item.icon}
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
