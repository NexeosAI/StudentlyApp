import { Outlet } from 'react-router-dom'

export default function SecurityLayout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Security</h1>
          <p className="text-muted-foreground">Manage security settings and audit logs</p>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
