import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  AIProvider,
  AIModel,
  ToolMapping,
  UsageMetrics,
  BudgetAlert,
  AuditLogEntry
} from '@/lib/types/ai-provider'

interface AIProviderStore {
  providers: AIProvider[]
  models: AIModel[]
  toolMappings: ToolMapping[]
  usageMetrics: UsageMetrics[]
  budgetAlerts: BudgetAlert[]
  auditLog: AuditLogEntry[]
  
  // Provider Management
  addProvider: (provider: Omit<AIProvider, 'id'>) => void
  updateProvider: (id: string, updates: Partial<AIProvider>) => void
  removeProvider: (id: string) => void
  
  // Model Management
  addModel: (model: Omit<AIModel, 'id'>) => void
  updateModel: (id: string, updates: Partial<AIModel>) => void
  removeModel: (id: string) => void
  
  // Tool Mapping
  addToolMapping: (mapping: Omit<ToolMapping, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateToolMapping: (id: string, updates: Partial<ToolMapping>) => void
  removeToolMapping: (id: string) => void
  
  // Usage Tracking
  recordUsage: (usage: Omit<UsageMetrics, 'id'>) => void
  getUsageByProvider: (providerId: string, period: 'day' | 'week' | 'month' | 'year') => UsageMetrics[]
  getUsageByModel: (modelId: string, period: 'day' | 'week' | 'month' | 'year') => UsageMetrics[]
  
  // Budget Management
  addBudgetAlert: (alert: Omit<BudgetAlert, 'id'>) => void
  updateBudgetAlert: (id: string, updates: Partial<BudgetAlert>) => void
  removeBudgetAlert: (id: string) => void
  
  // Audit Logging
  addAuditLog: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void
}

export const useAIProviderStore = create<AIProviderStore>()(
  persist(
    (set, get) => ({
      providers: [],
      models: [],
      toolMappings: [],
      usageMetrics: [],
      budgetAlerts: [],
      auditLog: [],

      // Provider Management
      addProvider: (provider) => {
        const newProvider = { ...provider, id: crypto.randomUUID() }
        set((state) => ({
          providers: [...state.providers, newProvider]
        }))
        get().addAuditLog({
          action: 'create',
          entityType: 'provider',
          entityId: newProvider.id,
          changes: newProvider,
          userId: 'current-user' // Replace with actual user ID
        })
      },

      updateProvider: (id, updates) => {
        set((state) => ({
          providers: state.providers.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          )
        }))
        get().addAuditLog({
          action: 'update',
          entityType: 'provider',
          entityId: id,
          changes: updates,
          userId: 'current-user'
        })
      },

      removeProvider: (id) => {
        set((state) => ({
          providers: state.providers.filter((p) => p.id !== id)
        }))
        get().addAuditLog({
          action: 'delete',
          entityType: 'provider',
          entityId: id,
          changes: {},
          userId: 'current-user'
        })
      },

      // Model Management
      addModel: (model) => {
        const newModel = { ...model, id: crypto.randomUUID() }
        set((state) => ({
          models: [...state.models, newModel]
        }))
        get().addAuditLog({
          action: 'create',
          entityType: 'model',
          entityId: newModel.id,
          changes: newModel,
          userId: 'current-user'
        })
      },

      updateModel: (id, updates) => {
        set((state) => ({
          models: state.models.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          )
        }))
        get().addAuditLog({
          action: 'update',
          entityType: 'model',
          entityId: id,
          changes: updates,
          userId: 'current-user'
        })
      },

      removeModel: (id) => {
        set((state) => ({
          models: state.models.filter((m) => m.id !== id)
        }))
        get().addAuditLog({
          action: 'delete',
          entityType: 'model',
          entityId: id,
          changes: {},
          userId: 'current-user'
        })
      },

      // Tool Mapping
      addToolMapping: (mapping) => {
        const newMapping = {
          ...mapping,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
        set((state) => ({
          toolMappings: [...state.toolMappings, newMapping]
        }))
        get().addAuditLog({
          action: 'create',
          entityType: 'mapping',
          entityId: newMapping.id,
          changes: newMapping,
          userId: 'current-user'
        })
      },

      updateToolMapping: (id, updates) => {
        set((state) => ({
          toolMappings: state.toolMappings.map((m) =>
            m.id === id ? { ...m, ...updates, updatedAt: new Date() } : m
          )
        }))
        get().addAuditLog({
          action: 'update',
          entityType: 'mapping',
          entityId: id,
          changes: updates,
          userId: 'current-user'
        })
      },

      removeToolMapping: (id) => {
        set((state) => ({
          toolMappings: state.toolMappings.filter((m) => m.id !== id)
        }))
        get().addAuditLog({
          action: 'delete',
          entityType: 'mapping',
          entityId: id,
          changes: {},
          userId: 'current-user'
        })
      },

      // Usage Tracking
      recordUsage: (usage) => {
        const newUsage = { ...usage, id: crypto.randomUUID() }
        set((state) => ({
          usageMetrics: [...state.usageMetrics, newUsage]
        }))
      },

      getUsageByProvider: (providerId, period) => {
        const metrics = get().usageMetrics
        const now = new Date()
        const periodStart = new Date()

        switch (period) {
          case 'day':
            periodStart.setDate(now.getDate() - 1)
            break
          case 'week':
            periodStart.setDate(now.getDate() - 7)
            break
          case 'month':
            periodStart.setMonth(now.getMonth() - 1)
            break
          case 'year':
            periodStart.setFullYear(now.getFullYear() - 1)
            break
        }

        return metrics.filter(
          (m) => m.providerId === providerId && m.timestamp >= periodStart
        )
      },

      getUsageByModel: (modelId, period) => {
        const metrics = get().usageMetrics
        const now = new Date()
        const periodStart = new Date()

        switch (period) {
          case 'day':
            periodStart.setDate(now.getDate() - 1)
            break
          case 'week':
            periodStart.setDate(now.getDate() - 7)
            break
          case 'month':
            periodStart.setMonth(now.getMonth() - 1)
            break
          case 'year':
            periodStart.setFullYear(now.getFullYear() - 1)
            break
        }

        return metrics.filter(
          (m) => m.modelId === modelId && m.timestamp >= periodStart
        )
      },

      // Budget Management
      addBudgetAlert: (alert) => {
        const newAlert = { ...alert, id: crypto.randomUUID() }
        set((state) => ({
          budgetAlerts: [...state.budgetAlerts, newAlert]
        }))
        get().addAuditLog({
          action: 'create',
          entityType: 'budget',
          entityId: newAlert.id,
          changes: newAlert,
          userId: 'current-user'
        })
      },

      updateBudgetAlert: (id, updates) => {
        set((state) => ({
          budgetAlerts: state.budgetAlerts.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          )
        }))
        get().addAuditLog({
          action: 'update',
          entityType: 'budget',
          entityId: id,
          changes: updates,
          userId: 'current-user'
        })
      },

      removeBudgetAlert: (id) => {
        set((state) => ({
          budgetAlerts: state.budgetAlerts.filter((a) => a.id !== id)
        }))
        get().addAuditLog({
          action: 'delete',
          entityType: 'budget',
          entityId: id,
          changes: {},
          userId: 'current-user'
        })
      },

      // Audit Logging
      addAuditLog: (entry) => {
        const newEntry = {
          ...entry,
          id: crypto.randomUUID(),
          timestamp: new Date()
        }
        set((state) => ({
          auditLog: [...state.auditLog, newEntry]
        }))
      }
    }),
    {
      name: 'ai-provider-store'
    }
  )
)
