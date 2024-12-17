import { RouteObject } from 'react-router-dom'
import { AdminLayout } from '@/layouts/admin-layout'
import AdminDashboard from '@/pages/admin/dashboard'
import AdminErrorPage from '@/pages/admin/error-page'
import UsersLayout from '@/pages/admin/users/layout'
import SecurityLayout from '@/pages/admin/security/layout'
import SettingsLayout from '@/pages/admin/settings/layout'
import AIProviderLayout from '@/pages/admin/ai-providers/layout'
import ProvidersPage from '@/pages/admin/ai-providers/providers'
import ModelsPage from '@/pages/admin/ai-providers/models'
import AnalyticsPage from '@/pages/admin/ai-providers/analytics'
import BudgetPage from '@/pages/admin/ai-providers/budget'
import AuditLogPage from '@/pages/admin/ai-providers/audit-log'

export const adminRoutes: RouteObject[] = [
  {
    element: <AdminLayout />,
    errorElement: <AdminErrorPage />,
    children: [
      {
        path: '/admin',
        element: <AdminDashboard />
      },
      {
        path: '/admin/analytics',
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
        path: '/admin/users',
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
        path: '/admin/content',
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
        path: '/admin/products',
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
        path: '/admin/learning',
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
        path: '/admin/billing',
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
        path: '/admin/ai-providers',
        element: <AIProviderLayout />,
        children: [
          {
            path: 'overview',
            element: <AnalyticsPage />
          },
          {
            path: 'providers',
            element: <ProvidersPage />
          },
          {
            path: 'models',
            element: <ModelsPage />
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
            path: 'audit-log',
            element: <AuditLogPage />
          }
        ]
      },
      {
        path: '/admin/security',
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
        path: '/admin/settings',
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
