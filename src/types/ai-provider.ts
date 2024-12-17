export interface AIModel {
  id: string
  name: string
  description: string
  maxTokens: number
  costPer1kTokens: number
  isEnabled: boolean
}

export interface AIProvider {
  id: string
  name: string
  description: string
  apiKey: string
  baseUrl?: string
  status: 'active' | 'limited' | 'inactive'
  models: AIModel[]
  lastUsed?: Date
  createdAt: Date
  updatedAt: Date
}

export interface AIProviderFormData {
  name: string
  description: string
  apiKey: string
  baseUrl?: string
}
