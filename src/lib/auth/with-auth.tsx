import { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './use-auth'

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { user, loading } = useAuth()

    if (loading) {
      return <div>Loading...</div> // Replace with your loading component
    }

    if (!user) {
      return <Navigate to="/auth/signin" replace />
    }

    return <WrappedComponent {...props} />
  }
}
