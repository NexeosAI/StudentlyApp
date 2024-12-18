import { Outlet } from 'react-router-dom'

export default function SettingsLayout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage application settings and configurations</p>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
