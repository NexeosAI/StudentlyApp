import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user: User, token: string) =>
        set({ user, token, isAuthenticated: true }),
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

// Mock login function for development
export const mockLogin = async (email: string, password: string) => {
  if (email.toLowerCase() === 'dave@studently.uk' && password === 'studently') {
    const user = {
      id: '1',
      email: 'dave@studently.uk',
      name: 'Dave',
    }
    const token = 'mock-jwt-token'
    useAuth.getState().setAuth(user, token)
    return { user, token }
  }
  throw new Error('Invalid credentials')
}
