import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { adminNavItems } from '@/config/admin-nav'

interface AdminSidebarProps {
  open?: boolean
  onClose: () => void
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <nav className={cn(
        "fixed top-16 left-0 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300",
        open ? "w-64" : "w-16"
      )}>
        <ScrollArea className="h-full px-3 py-2">
          <div className="space-y-4">
            {adminNavItems.map((section) => (
              <div key={section.title}>
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  {section.title}
                </h2>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                          isActive
                            ? 'bg-accent text-accent-foreground'
                            : 'transparent'
                        )
                      }
                    >
                      {item.icon && (
                        <item.icon className="mr-2 h-4 w-4" />
                      )}
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </nav>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />
        
        {/* Sidebar */}
        <nav className={cn(
          "fixed inset-y-0 left-0 w-[240px] border-r bg-background px-3 py-2",
          "transform transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex h-11 items-center justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="space-y-4">
              {adminNavItems.map((section) => (
                <div key={section.title}>
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    {section.title}
                  </h2>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        onClick={onClose}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                            isActive
                              ? 'bg-accent text-accent-foreground'
                              : 'transparent'
                          )
                        }
                      >
                        {item.icon && (
                          <item.icon className="mr-2 h-4 w-4" />
                        )}
                        {item.title}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </nav>
      </div>
    </>
  )
}
