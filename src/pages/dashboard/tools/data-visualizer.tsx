import { DataVisualizer } from '@/components/tools/data-visualizer/data-visualizer'
import { withAuth } from '@/components/auth/with-auth'
import { withSubscription } from '@/lib/subscription/with-subscription'

const ProtectedDataVisualizer = withSubscription('data-visualizer')(DataVisualizer)
export default withAuth(ProtectedDataVisualizer)
