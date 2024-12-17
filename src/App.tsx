import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './components/theme/theme-provider'
import { ErrorBoundary } from './components/error-boundary'
import { Toaster } from './components/ui/toaster'
import { Suspense } from 'react'

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
  </div>
)

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="studently-theme">
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
        <Toaster />
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
