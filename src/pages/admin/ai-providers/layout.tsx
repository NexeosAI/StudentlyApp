import { Outlet } from 'react-router-dom'

export default function AIProviderLayout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Providers</h1>
          <p className="text-muted-foreground">Manage AI providers and their configurations</p>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
