import { create } from 'zustand'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async (email: string, password: string) => {
    try {
      // Implement your sign-in logic here
      set({ isLoading: true })
      // Mock user data for now
      const user = {
        id: '1',
        email,
        name: 'User',
      }
      set({ user, isAuthenticated: true })
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  },
  signOut: async () => {
    try {
      // Implement your sign-out logic here
      set({ isLoading: true })
      set({ user: null, isAuthenticated: false })
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  },
}))
