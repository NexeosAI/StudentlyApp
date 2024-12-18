import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AIProvider {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'error'
  apiKey?: string
  baseUrl?: string
  usageQuota?: {
    monthly: number
    used: number
    remaining: number
  }
  models: {
    id: string
    name: string
    maxTokens: number
    costPerToken: number
  }[]
  settings: {
    defaultModel: string
    temperature: number
    maxTokens: number
    topP: number
    frequencyPenalty: number
    presencePenalty: number
  }
  lastSync?: string
  error?: string
}

interface AuditLogEntry {
  id: string
  timestamp: Date
  action: string
  entityType: string
  entityId: string
  details?: string
}

interface AIProviderState {
  providers: AIProvider[]
  auditLog: AuditLogEntry[]
  addProvider: (provider: Omit<AIProvider, 'id'>) => void
  updateProvider: (id: string, updates: Partial<AIProvider>) => void
  removeProvider: (id: string) => void
  updateProviderStatus: (id: string, status: AIProvider['status'], error?: string) => void
  updateUsageQuota: (id: string, used: number) => void
  logAction: (action: string, entityType: string, entityId: string, details?: string) => void
}

const useAIProviderStore = create<AIProviderState>()(
  persist(
    (set) => ({
      providers: [
        {
          id: 'openai',
          name: 'OpenAI',
          description: 'GPT-3.5 and GPT-4 models for various AI tasks',
          status: 'active',
          usageQuota: {
            monthly: 100,
            used: 0,
            remaining: 100
          },
          models: [
            {
              id: 'gpt-4',
              name: 'GPT-4',
              maxTokens: 8192,
              costPerToken: 0.00003
            },
            {
              id: 'gpt-3.5-turbo',
              name: 'GPT-3.5 Turbo',
              maxTokens: 4096,
              costPerToken: 0.000002
            }
          ],
          settings: {
            defaultModel: 'gpt-3.5-turbo',
            temperature: 0.7,
            maxTokens: 2048,
            topP: 1,
            frequencyPenalty: 0,
            presencePenalty: 0
          }
        },
        {
          id: 'anthropic',
          name: 'Anthropic',
          description: 'Claude models for advanced reasoning and analysis',
          status: 'inactive',
          models: [
            {
              id: 'claude-2',
              name: 'Claude 2',
              maxTokens: 100000,
              costPerToken: 0.000008
            }
          ],
          settings: {
            defaultModel: 'claude-2',
            temperature: 0.7,
            maxTokens: 4096,
            topP: 1,
            frequencyPenalty: 0,
            presencePenalty: 0
          }
        }
      ],
      auditLog: [],
      addProvider: (provider) => 
        set((state) => ({
          providers: [...state.providers, { ...provider, id: crypto.randomUUID() }]
        })),
      updateProvider: (id, updates) =>
        set((state) => ({
          providers: state.providers.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          )
        })),
      removeProvider: (id) =>
        set((state) => ({
          providers: state.providers.filter((p) => p.id !== id)
        })),
      updateProviderStatus: (id, status, error) =>
        set((state) => ({
          providers: state.providers.map((p) =>
            p.id === id ? { ...p, status, error, lastSync: new Date().toISOString() } : p
          )
        })),
      updateUsageQuota: (id, used) =>
        set((state) => ({
          providers: state.providers.map((p) =>
            p.id === id && p.usageQuota
              ? {
                  ...p,
                  usageQuota: {
                    ...p.usageQuota,
                    used,
                    remaining: p.usageQuota.monthly - used
                  }
                }
              : p
          )
        })),
      logAction: (action, entityType, entityId, details) =>
        set((state) => ({
          auditLog: [
            {
              id: crypto.randomUUID(),
              timestamp: new Date(),
              action,
              entityType,
              entityId,
              details
            },
            ...state.auditLog
          ]
        }))
    }),
    {
      name: 'ai-provider-storage'
    }
  )
)

// Export both names for compatibility
export { useAIProviderStore }
export const useAIProvider = useAIProviderStore
