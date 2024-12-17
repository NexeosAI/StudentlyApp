import { DigitalLibrary } from '@/components/tools/digital-library/digital-library'
import { withAuth } from '@/components/auth/with-auth'
import { withSubscription } from '@/lib/subscription/with-subscription'

const ProtectedDigitalLibrary = withSubscription('digital-library')(DigitalLibrary)
export default withAuth(ProtectedDigitalLibrary)
