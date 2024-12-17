import { Outlet } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'providers', label: 'Providers' },
  { value: 'models', label: 'Models' },
  { value: 'mappings', label: 'Tool Mappings' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'budget', label: 'Budget' },
  { value: 'audit-log', label: 'Audit Log' }
]

export default function AIProviderLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentTab = location.pathname.split('/').pop() || 'overview'

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">AI Provider Management</h1>
        <Tabs value={currentTab} onValueChange={(value) => navigate(`/admin/ai-providers/${value}`)}>
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
