import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminHeader } from './header'
import { AdminSidebar } from './sidebar'

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-background">
      <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex h-[calc(100vh-4rem)]">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-7xl p-4 pt-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
