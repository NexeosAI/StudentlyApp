import { Outlet } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { value: 'general', label: 'General' },
  { value: 'appearance', label: 'Appearance' },
  { value: 'integrations', label: 'Integrations' },
  { value: 'notifications', label: 'Notifications' }
]

export default function SettingsLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentTab = location.pathname.split('/').pop() || 'general'

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <Tabs value={currentTab} onValueChange={(value) => navigate(`/admin/settings/${value}`)}>
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
