import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/lib/store/auth-store'
import { logger } from '@/lib/utils/logger'

interface ProtectedRouteProps {
  children: React.ReactElement
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  logger.debug('Protected route check', { isAuthenticated, pathname: location.pathname })

  if (!isAuthenticated) {
    logger.info('Unauthorized access attempt', { pathname: location.pathname })
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return children
}
