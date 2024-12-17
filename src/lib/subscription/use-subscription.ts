import { create } from 'zustand'
import { SubscriptionTier, toolAccessConfig } from './types'

interface SubscriptionStore {
  tier: SubscriptionTier
  toolUsage: Record<string, number> // tracks daily tool usage
  setTier: (tier: SubscriptionTier) => void
  incrementToolUsage: (toolId: string) => void
  resetDailyUsage: () => void
  canAccessTool: (toolId: string) => boolean
  getRemainingUsage: (toolId: string) => number | null // null means unlimited
}

export const useSubscription = create<SubscriptionStore>((set, get) => ({
  tier: 'free',
  toolUsage: {},
  
  setTier: (tier) => set({ tier }),
  
  incrementToolUsage: (toolId) => {
    set((state) => ({
      toolUsage: {
        ...state.toolUsage,
        [toolId]: (state.toolUsage[toolId] || 0) + 1,
      },
    }))
  },
  
  resetDailyUsage: () => set({ toolUsage: {} }),
  
  canAccessTool: (toolId) => {
    const state = get()
    const toolConfig = toolAccessConfig[toolId]
    if (!toolConfig) return false

    const tierLevels: SubscriptionTier[] = ['free', 'basic', 'pro', 'enterprise']
    const userTierLevel = tierLevels.indexOf(state.tier)
    const requiredTierLevel = tierLevels.indexOf(toolConfig.minTier)

    if (userTierLevel < requiredTierLevel) return false

    if (toolConfig.maxUsagePerDay !== undefined) {
      const currentUsage = state.toolUsage[toolId] || 0
      if (currentUsage >= toolConfig.maxUsagePerDay) return false
    }

    return true
  },
  
  getRemainingUsage: (toolId) => {
    const state = get()
    const toolConfig = toolAccessConfig[toolId]
    if (!toolConfig || toolConfig.maxUsagePerDay === undefined) return null

    const currentUsage = state.toolUsage[toolId] || 0
    return Math.max(0, toolConfig.maxUsagePerDay - currentUsage)
  },
}))

// Reset usage at midnight
const resetAtMidnight = () => {
  const now = new Date()
  const night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0, 0, 0
  )
  const msToMidnight = night.getTime() - now.getTime()

  setTimeout(() => {
    useSubscription.getState().resetDailyUsage()
    resetAtMidnight() // Schedule next reset
  }, msToMidnight)
}

resetAtMidnight()
