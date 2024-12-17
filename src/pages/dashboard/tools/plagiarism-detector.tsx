import { PlagiarismDetector } from '@/components/tools/plagiarism-detector/plagiarism-detector'
import { withAuth } from '@/components/auth/with-auth'
import { withSubscription } from '@/lib/subscription/with-subscription'

const ProtectedPlagiarismDetector = withSubscription('plagiarism-detector')(PlagiarismDetector)
export default withAuth(ProtectedPlagiarismDetector)
