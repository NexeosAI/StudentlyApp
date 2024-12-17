import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      setAuth: (user: User, token: string) =>
        set({ 
          user, 
          token, 
          isAuthenticated: true,
          isAdmin: user.role === 'admin'
        }),
      clearAuth: () => 
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          isAdmin: false
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

// Mock login function for development
export function mockLogin(email: string, password: string) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (email.toLowerCase() === 'dave@studently.uk' && password === 'password123') {
        const user: User = {
          id: '1',
          email: email.toLowerCase(),
          name: 'Dave',
          role: 'admin' as const
        }
        const token = 'mock-jwt-token'
        useAuth.getState().setAuth(user, token)
        resolve()
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 1000)
  })
}
