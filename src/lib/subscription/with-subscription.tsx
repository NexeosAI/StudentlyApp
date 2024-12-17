import { ComponentType } from 'react'
import { useSubscription } from './use-subscription'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { subscriptionTiers, toolAccessConfig } from './types'
import { Link } from 'react-router-dom'

export function withSubscription(toolId: string) {
  return function withSubscriptionHOC<P extends object>(WrappedComponent: ComponentType<P>) {
    return function WithSubscriptionComponent(props: P) {
      const { canAccessTool, tier, getRemainingUsage } = useSubscription()
      const hasAccess = canAccessTool(toolId)
      const remainingUsage = getRemainingUsage(toolId)
      const toolConfig = toolAccessConfig[toolId]
      const requiredTier = toolConfig?.minTier

      if (!hasAccess) {
        return (
          <Card className="p-6 max-w-2xl mx-auto mt-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Upgrade Required</h2>
              <p className="text-muted-foreground">
                This tool requires a {subscriptionTiers[requiredTier].name} subscription or higher.
              </p>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Features included in {subscriptionTiers[requiredTier].name}:</h3>
                <ul className="space-y-2">
                  {subscriptionTiers[requiredTier].features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Button asChild>
                  <Link to="/pricing">View Plans</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/dashboard">Back to Dashboard</Link>
                </Button>
              </div>
            </div>
          </Card>
        )
      }

      return (
        <div>
          {remainingUsage !== null && (
            <div className="mb-4 p-2 bg-muted rounded text-sm text-center">
              {remainingUsage} uses remaining today
            </div>
          )}
          <WrappedComponent {...props} />
        </div>
      )
    }
  }
}
