import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth/use-auth'

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function WithAuthComponent(props: T) {
    const navigate = useNavigate()
    const { isAuthenticated, isLoading } = useAuth()

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate('/login')
      }
    }, [isLoading, isAuthenticated, navigate])

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (!isAuthenticated) {
      return null
    }

    return <Component {...props} />
  }
}
