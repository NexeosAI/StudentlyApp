import { Outlet } from 'react-router-dom'

export default function UsersLayout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
