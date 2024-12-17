import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { logger } from '../utils/logger'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  mockLogin: (email: string) => Promise<{ user: User; token: string }>
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      setAuth: (user: User, token: string) => {
        logger.info('Setting auth state', { user: { ...user, password: undefined }, token: '***' })
        set({ 
          user, 
          token, 
          isAuthenticated: true,
          isAdmin: user.role === 'admin'
        })
      },
      clearAuth: () => {
        logger.info('Clearing auth state')
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          isAdmin: false
        })
      },
      mockLogin: async (email: string) => {
        // For development only - mock a successful login
        const mockUser: User = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'admin'
        }
        const mockToken = 'mock-jwt-token'
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Set the auth state
        set({
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
          isAdmin: true
        })
        
        return { user: mockUser, token: mockToken }
      }
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => {
        logger.info('Rehydrating auth state')
      }
    }
  )
)
