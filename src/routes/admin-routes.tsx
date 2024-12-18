import { RouteObject } from 'react-router-dom'
import { AdminLayout } from '../layouts/admin-layout'
import { ProtectedRoute } from '../components/auth/protected-route'
import AdminDashboard from '../pages/admin/dashboard'
import AdminErrorPage from '../pages/admin/error-page'
import UsersLayout from '../pages/admin/users/layout'
import SecurityLayout from '../pages/admin/security/layout'
import SettingsLayout from '../pages/admin/settings/layout'
import ProvidersPage from '../pages/admin/ai/providers'
import AIModelsPage from '../pages/admin/ai/models'
import AnalyticsPage from '../pages/admin/ai/analytics'
import BudgetPage from '../pages/admin/ai/budget'
import AuditLogPage from '../pages/admin/ai/audit'
import AddModelPage from '../pages/admin/ai/add-model'

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    errorElement: <AdminErrorPage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: 'analytics',
        element: <div>Analytics</div>,
        children: [
          {
            path: 'overview',
            element: <div>Analytics Overview</div>
          },
          {
            path: 'reports',
            element: <div>Analytics Reports</div>
          }
        ]
      },
      {
        path: 'users',
        element: <UsersLayout />,
        children: [
          {
            path: 'list',
            element: <div>Users List</div>
          },
          {
            path: 'roles',
            element: <div>User Roles</div>
          },
          {
            path: 'permissions',
            element: <div>User Permissions</div>
          }
        ]
      },
      {
        path: 'content',
        element: <div>Content</div>,
        children: [
          {
            path: 'pages',
            element: <div>Content Pages</div>
          },
          {
            path: 'media',
            element: <div>Media Library</div>
          }
        ]
      },
      {
        path: 'products',
        element: <div>Products</div>,
        children: [
          {
            path: 'list',
            element: <div>Products List</div>
          },
          {
            path: 'categories',
            element: <div>Product Categories</div>
          }
        ]
      },
      {
        path: 'learning',
        element: <div>Learning</div>,
        children: [
          {
            path: 'courses',
            element: <div>Courses</div>
          },
          {
            path: 'lessons',
            element: <div>Lessons</div>
          }
        ]
      },
      {
        path: 'billing',
        element: <div>Billing</div>,
        children: [
          {
            path: 'invoices',
            element: <div>Invoices</div>
          },
          {
            path: 'subscriptions',
            element: <div>Subscriptions</div>
          }
        ]
      },
      {
        path: 'ai',
        children: [
          {
            path: 'models',
            element: <AIModelsPage />
          },
          {
            path: 'models/add',
            element: <AddModelPage />
          },
          {
            path: 'providers',
            element: <ProvidersPage />
          },
          {
            path: 'analytics',
            element: <AnalyticsPage />
          },
          {
            path: 'budget',
            element: <BudgetPage />
          },
          {
            path: 'audit',
            element: <AuditLogPage />
          }
        ]
      },
      {
        path: 'security',
        element: <SecurityLayout />,
        children: [
          {
            path: 'audit-logs',
            element: <div>Audit Logs</div>
          },
          {
            path: 'permissions',
            element: <div>Security Permissions</div>
          },
          {
            path: 'settings',
            element: <div>Security Settings</div>
          }
        ]
      },
      {
        path: 'settings',
        element: <SettingsLayout />,
        children: [
          {
            path: 'general',
            element: <div>General Settings</div>
          },
          {
            path: 'appearance',
            element: <div>Appearance Settings</div>
          },
          {
            path: 'integrations',
            element: <div>Platform Integrations</div>
          },
          {
            path: 'notifications',
            element: <div>Notification Settings</div>
          }
        ]
      }
    ]
  }
]
