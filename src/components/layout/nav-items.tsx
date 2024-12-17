import {
  LayoutDashboard,
  Calculator,
  Search,
  BarChart,
  Database,
  BookOpen,
  MessageSquare,
  PenTool,
  Brain,
  Clock,
  FileText,
  BookMarked,
  FlaskConical,
  ScrollText,
  ListTodo,
} from 'lucide-react'

interface NavItem {
  title: string
  icon: React.ReactNode
  href: string
  submenu?: {
    title: string
    icon: React.ReactNode
    href: string
  }[]
}

export const navItems: NavItem[] = [
  { 
    title: 'Dashboard', 
    icon: <LayoutDashboard size={20} />, 
    href: '/dashboard' 
  },
  {
    title: 'AI Chat & Writing',
    icon: <MessageSquare size={20} />,
    href: '/dashboard/chat',
    submenu: [
      { title: 'AI Chat Assistant', icon: <MessageSquare size={20} />, href: '/dashboard/chat/assistant' },
      { title: 'Writing Coach', icon: <PenTool size={20} />, href: '/dashboard/chat/writing-coach' },
      { title: 'Grammar Checker', icon: <ScrollText size={20} />, href: '/dashboard/chat/grammar' },
      { title: 'Translation Helper', icon: <BookMarked size={20} />, href: '/dashboard/chat/translation' },
    ],
  },
  {
    title: 'Study Tools',
    icon: <Brain size={20} />,
    href: '/dashboard/study',
    submenu: [
      { title: 'Flashcard Generator', icon: <BookOpen size={20} />, href: '/dashboard/study/flashcards' },
      { title: 'Quiz Creator', icon: <ListTodo size={20} />, href: '/dashboard/study/quiz' },
      { title: 'Mind Map Creator', icon: <Brain size={20} />, href: '/dashboard/study/mindmap' },
      { title: 'Practice Problems', icon: <Calculator size={20} />, href: '/dashboard/study/practice' },
      { title: 'Study Planner', icon: <Clock size={20} />, href: '/dashboard/study/planner' },
      { title: 'Progress Tracker', icon: <BarChart size={20} />, href: '/dashboard/study/progress' },
    ],
  },
  {
    title: 'Research Tools',
    icon: <FlaskConical size={20} />,
    href: '/dashboard/research',
    submenu: [
      { title: 'Research Helper', icon: <Search size={20} />, href: '/dashboard/research/helper' },
      { title: 'Paper Analyzer', icon: <FileText size={20} />, href: '/dashboard/research/analyzer' },
      { title: 'Citation Manager', icon: <BookMarked size={20} />, href: '/dashboard/research/citations' },
      { title: 'Source Evaluator', icon: <Database size={20} />, href: '/dashboard/research/sources' },
    ],
  },
  {
    title: 'Content Creation',
    icon: <PenTool size={20} />,
    href: '/dashboard/content',
    submenu: [
      { title: 'Essay Writer', icon: <PenTool size={20} />, href: '/dashboard/content/essay' },
      { title: 'Report Generator', icon: <FileText size={20} />, href: '/dashboard/content/report' },
      { title: 'Research Proposal', icon: <ScrollText size={20} />, href: '/dashboard/content/proposal' },
      { title: 'Abstract Generator', icon: <ScrollText size={20} />, href: '/dashboard/content/abstract' },
    ],
  },
]

export default navItems
