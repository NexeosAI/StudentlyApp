import { ReactNode } from 'react'
import { DashboardNav as Sidebar } from '@/components/dashboard/nav'
import { DashboardHeader } from '@/components/dashboard/header'

interface DashboardLayoutProps {
  children: ReactNode
  heading?: string
}

export function DashboardLayout({ children, heading = "Dashboard" }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="hidden lg:block w-64 shrink-0" />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader heading={heading} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
