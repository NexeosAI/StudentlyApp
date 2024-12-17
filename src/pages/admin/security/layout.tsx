import { Outlet } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { value: 'audit-logs', label: 'Audit Logs' },
  { value: 'permissions', label: 'Permissions' },
  { value: 'settings', label: 'Settings' }
]

export default function SecurityLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentTab = location.pathname.split('/').pop() || 'audit-logs'

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Security Management</h1>
        <Tabs value={currentTab} onValueChange={(value) => navigate(`/admin/security/${value}`)}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="space-y-4">
        <Outlet />
      </div>
    </div>
  )
}
