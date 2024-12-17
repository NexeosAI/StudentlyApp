import { StatisticalAssistant } from '@/components/tools/statistical-assistant/statistical-assistant'
import { withAuth } from '@/components/auth/with-auth'
import { withSubscription } from '@/lib/subscription/with-subscription'

const ProtectedStatisticalAssistant = withSubscription('statistical-assistant')(StatisticalAssistant)
export default withAuth(ProtectedStatisticalAssistant)
