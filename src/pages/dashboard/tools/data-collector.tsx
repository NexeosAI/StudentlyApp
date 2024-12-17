import { DataCollector } from '@/components/tools/data-collector/data-collector'
import { withAuth } from '@/components/auth/with-auth'
import { withSubscription } from '@/lib/subscription/with-subscription'

const ProtectedDataCollector = withSubscription('data-collector')(DataCollector)
export default withAuth(ProtectedDataCollector)
