import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { ThemeProvider } from './components/theme/theme-provider'
import { ErrorBoundary } from './components/error-boundary'
import { ProtectedRoute } from './components/auth/protected-route'
import { useAuth } from './lib/store/auth-store'
import { Toaster } from './components/ui/toaster'
import { MarketingLayout } from './layouts/marketing-layout'
import { AppLayout } from './layouts/app-layout'
import { Suspense, lazy } from 'react'
import './styles/katex.css'

// Lazy load pages
const HomePage = lazy(() => import('./pages/home'))
const FeaturesPage = lazy(() => import('./pages/features'))
const PricingPage = lazy(() => import('./pages/pricing'))
const AboutPage = lazy(() => import('./pages/about'))
const BlogPage = lazy(() => import('./pages/blog'))
const ResourcesPage = lazy(() => import('./pages/resources'))
const ContactPage = lazy(() => import('./pages/contact'))
const LoginPage = lazy(() => import('./pages/auth/login'))
const RegisterPage = lazy(() => import('./pages/auth/register'))
const DashboardPage = lazy(() => import('./pages/dashboard'))
const AdminDashboardPage = lazy(() => import('./pages/admin/dashboard'))

// AI Tools Pages
const MathSolverPage = lazy(() => import('./pages/tools/math-solver'))
const PlagiarismDetectorPage = lazy(() => import('./pages/tools/plagiarism-detector'))
const DataVisualizerPage = lazy(() => import('./pages/tools/data-visualizer'))
const StatisticalAssistantPage = lazy(() => import('./pages/tools/statistical-assistant'))
const DigitalLibraryPage = lazy(() => import('./pages/tools/digital-library'))
const DataCollectorPage = lazy(() => import('./pages/tools/data-collector'))

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
  </div>
)

function App() {
  const { isAuthenticated, isAdmin } = useAuth()

  return (
    <ThemeProvider defaultTheme="system" storageKey="studently-theme">
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Marketing routes */}
            <Route element={<MarketingLayout><Outlet /></MarketingLayout>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Auth routes */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />

            {/* Protected app routes */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route element={<AppLayout><Outlet /></AppLayout>}>
                <Route path="/dashboard" element={<DashboardPage />} />
                {/* AI Tools Routes */}
                <Route path="/tools">
                  <Route path="math-solver" element={<MathSolverPage />} />
                  <Route path="plagiarism-detector" element={<PlagiarismDetectorPage />} />
                  <Route path="data-visualizer" element={<DataVisualizerPage />} />
                  <Route path="statistical-assistant" element={<StatisticalAssistantPage />} />
                  <Route path="digital-library" element={<DigitalLibraryPage />} />
                  <Route path="data-collector" element={<DataCollectorPage />} />
                </Route>
              </Route>
            </Route>

            {/* Protected admin routes */}
            <Route 
              element={
                <ProtectedRoute 
                  isAuthenticated={isAuthenticated} 
                  isAuthorized={isAdmin} 
                  redirectTo="/dashboard"
                />
              }
            >
              <Route path="/admin/*" element={<AdminDashboardPage />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
