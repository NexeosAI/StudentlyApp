import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme/theme-provider'
import { ProtectedRoute } from './components/auth/protected-route'
import { useAuth } from './lib/store/auth-store'
import { Toaster } from 'sonner'
import { MarketingLayout } from './layouts/marketing-layout'
import { AppLayout } from './layouts/app-layout'
import { Suspense, lazy } from 'react'

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
const AITools = lazy(() => import('./pages/ai'))

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
  </div>
)

function App() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated)

  return (
    <ThemeProvider defaultTheme="system" storageKey="studently-theme">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Marketing/Public Routes */}
          <Route path="/" element={<MarketingLayout><HomePage /></MarketingLayout>} />
          <Route path="/features" element={<MarketingLayout><FeaturesPage /></MarketingLayout>} />
          <Route path="/pricing" element={<MarketingLayout><PricingPage /></MarketingLayout>} />
          <Route path="/about" element={<MarketingLayout><AboutPage /></MarketingLayout>} />
          <Route path="/blog" element={<MarketingLayout><BlogPage /></MarketingLayout>} />
          <Route path="/resources" element={<MarketingLayout><ResourcesPage /></MarketingLayout>} />
          <Route path="/contact" element={<MarketingLayout><ContactPage /></MarketingLayout>} />

          {/* Auth Routes */}
          <Route
            path="/auth/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <MarketingLayout>
                  <LoginPage />
                </MarketingLayout>
              )
            }
          />
          <Route
            path="/auth/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <MarketingLayout>
                  <RegisterPage />
                </MarketingLayout>
              )
            }
          />

          {/* Protected App Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai/*"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AITools />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}

export default App
