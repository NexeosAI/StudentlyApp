import { createBrowserRouter } from 'react-router-dom'
import { adminRoutes } from './admin-routes'
import App from '@/App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Your existing routes go here
    ]
  },
  ...adminRoutes
])

export default router
