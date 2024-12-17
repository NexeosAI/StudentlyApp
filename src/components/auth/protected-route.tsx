import { Navigate, useLocation, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  isAuthenticated: boolean
  isAuthorized?: boolean
  redirectTo?: string
}

export function ProtectedRoute({ 
  isAuthenticated, 
  isAuthorized = true, 
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  if (!isAuthorized) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
