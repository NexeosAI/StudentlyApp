import { createBrowserRouter } from 'react-router-dom'
import { adminRoutes } from './admin-routes'
import App from '@/App'
import { MarketingLayout } from '@/layouts/marketing-layout'
import HomePage from '@/pages/home'
import PricingPage from '@/pages/pricing'
import FeaturesPage from '@/pages/features'
import AboutPage from '@/pages/about'
import BlogPage from '@/pages/blog'
import ResourcesPage from '@/pages/resources'
import ContactPage from '@/pages/contact'
import LoginPage from '@/pages/auth/login'
import RegisterPage from '@/pages/auth/register'
import NotFoundPage from '@/pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <MarketingLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'features', element: <FeaturesPage /> },
          { path: 'pricing', element: <PricingPage /> },
          { path: 'about', element: <AboutPage /> },
          { path: 'blog', element: <BlogPage /> },
          { path: 'resources', element: <ResourcesPage /> },
          { path: 'contact', element: <ContactPage /> },
          { path: 'auth/login', element: <LoginPage /> },
          { path: 'auth/register', element: <RegisterPage /> },
        ],
      },
      adminRoutes[0]
    ]
  }
])

export default router
