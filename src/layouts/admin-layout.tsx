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
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className={cn(
        "min-h-[calc(100vh-4rem)] p-6 transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-16"
      )}>
        <Outlet />
      </main>
    </div>
  )
}
