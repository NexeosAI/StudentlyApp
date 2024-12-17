import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <AdminSidebar open={sidebarOpen} />
        
        <main className={cn(
          "flex-1 overflow-y-auto p-6 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-16"
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
