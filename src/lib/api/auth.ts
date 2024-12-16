import { api } from './client'
import type { AuthResponse, LoginInput, RegisterInput } from '../types/auth'

export const authApi = {
  login: async (data: LoginInput) => {
    const response = await api.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterInput) => {
    const response = await api.post<AuthResponse>('/auth/register', data)
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get<AuthResponse>('/auth/me')
    return response.data
  },

  logout: async () => {
    await api.post('/auth/logout')
  },
}
