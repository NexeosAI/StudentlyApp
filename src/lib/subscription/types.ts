export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise'

export type ToolAccess = {
  minTier: SubscriptionTier
  maxUsagePerDay?: number // undefined means unlimited
}

export const subscriptionTiers: Record<SubscriptionTier, {
  name: string
  features: string[]
  price: number // monthly price in USD
}> = {
  free: {
    name: 'Free',
    features: [
      'Basic AI Chat',
      'Simple Math Solver',
      'Basic Note Taking',
    ],
    price: 0,
  },
  basic: {
    name: 'Basic',
    features: [
      'All Free Features',
      'AI Plagiarism Detector',
      'Digital Library Access',
      'Advanced Math Solver',
      'Study Planner',
    ],
    price: 9.99,
  },
  pro: {
    name: 'Pro',
    features: [
      'All Basic Features',
      'AI Data Visualizer',
      'AI Statistical Assistant',
      'Research Paper Generator',
      'Advanced AI Chat',
      'Data Collection Tools',
    ],
    price: 19.99,
  },
  enterprise: {
    name: 'Enterprise',
    features: [
      'All Pro Features',
      'Custom AI Models',
      'API Access',
      'Priority Support',
      'Team Collaboration',
    ],
    price: 49.99,
  },
}

export const toolAccessConfig: Record<string, ToolAccess> = {
  'math-solver': { minTier: 'free', maxUsagePerDay: 10 },
  'plagiarism-detector': { minTier: 'basic', maxUsagePerDay: 50 },
  'data-visualizer': { minTier: 'pro' },
  'statistical-assistant': { minTier: 'pro' },
  'digital-library': { minTier: 'basic' },
  'data-collection': { minTier: 'pro' },
  'research-helper': { minTier: 'basic' },
  'study-planner': { minTier: 'basic' },
  'note-taking': { minTier: 'free' },
  'ai-chat': { minTier: 'free', maxUsagePerDay: 20 },
}
