import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { MathSolver } from '@/components/tools/math-solver/math-solver'
import { withAuth } from '@/lib/auth/with-auth'

function MathSolverPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <MathSolver />
      </div>
    </DashboardLayout>
  )
}

export default withAuth(MathSolverPage)
