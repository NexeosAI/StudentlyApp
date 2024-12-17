import { Outlet } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { value: 'list', label: 'Users List' },
  { value: 'roles', label: 'Roles' },
  { value: 'permissions', label: 'Permissions' }
]

export default function UsersLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentTab = location.pathname.split('/').pop() || 'list'

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
        <Tabs value={currentTab} onValueChange={(value) => navigate(`/admin/users/${value}`)}>
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
