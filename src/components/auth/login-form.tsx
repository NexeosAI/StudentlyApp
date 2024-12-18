import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/store/auth-store'
import { logger } from '@/lib/utils/logger'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginInput = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser, setToken } = useAuth()

  const from = location.state?.from?.pathname || '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: import.meta.env.DEV ? 'admin@example.com' : '',
      password: import.meta.env.DEV ? 'admin123' : '',
    }
  })

  const onSubmit = async (data: LoginInput) => {
    try {
      setIsLoading(true)
      logger.info('Attempting login', { email: data.email })
      
      // In development, simulate login with admin or user role
      if (import.meta.env.DEV) {
        const isAdmin = data.email.includes('admin')
        const user = {
          id: '1',
          email: data.email,
          name: isAdmin ? 'Admin User' : 'Regular User',
          role: isAdmin ? 'admin' as const : 'user' as const
        }
        setUser(user)
        setToken('mock-token')
        
        logger.info('Login successful, redirecting', { from })
        toast.success('Logged in successfully')
        navigate(from, { replace: true })
        return
      }
      
      // In production, implement actual login logic here
      toast.error('Login not implemented in production yet')
      
    } catch (error) {
      logger.error('Login failed', { error })
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          {...register('email')}
        />
        {errors?.email && (
          <p className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Input
          id="password"
          placeholder="••••••••"
          type="password"
          autoComplete="current-password"
          disabled={isLoading}
          {...register('password')}
        />
        {errors?.password && (
          <p className="text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
        )}
        Sign In
      </Button>
      {import.meta.env.DEV && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          Development mode: Use admin@example.com for admin access
        </p>
      )}
    </form>
  )
}
