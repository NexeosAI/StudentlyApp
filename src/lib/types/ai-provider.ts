export type AIProvider = {
  id: string
  name: string
  logo: string
  description: string
  website: string
  status: 'active' | 'inactive'
}

export type AIModel = {
  id: string
  providerId: string
  name: string
  capabilities: string[]
  maxTokens: number
  costPerToken: number
  recommendedUses: string[]
  status: 'active' | 'inactive'
}

export type ToolMapping = {
  id: string
  toolId: string
  toolName: string
  modelId: string
  priority: number
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export type UsageMetrics = {
  id: string
  providerId: string
  modelId: string
  toolId: string
  tokens: number
  cost: number
  timestamp: Date
}

export type BudgetAlert = {
  id: string
  providerId: string
  modelId?: string
  toolId?: string
  threshold: number
  period: 'daily' | 'weekly' | 'monthly'
  status: 'active' | 'inactive'
  notificationEmail: string[]
}

export type AuditLogEntry = {
  id: string
  action: 'create' | 'update' | 'delete'
  entityType: 'provider' | 'model' | 'mapping' | 'budget'
  entityId: string
  changes: Record<string, any>
  userId: string
  timestamp: Date
}
