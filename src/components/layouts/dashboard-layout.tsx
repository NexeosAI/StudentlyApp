import { ReactNode } from 'react'
import { DashboardNav } from '@/components/dashboard/nav'
import { DashboardHeader } from '@/components/dashboard/header'
import { ScrollArea } from '@/components/ui/scroll-area'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block lg:w-64">
        <div className="flex h-full flex-col">
          <DashboardNav />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <ScrollArea className="flex-1">
          <main>{children}</main>
        </ScrollArea>
      </div>
    </div>
  )
}
