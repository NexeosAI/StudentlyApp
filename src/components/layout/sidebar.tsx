import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useSidebar } from '@/lib/store/sidebar-store'
import styles from './sidebar.module.css'
import { navItems } from './nav-items'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation()
  const { collapsed, toggle } = useSidebar()

  return (
    <aside className={cn(styles.sidebar, className)}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 h-8 w-8 rounded-full border bg-background"
        onClick={toggle}
      >
        <ChevronLeft className={cn("h-4 w-4", collapsed && "rotate-180")} />
      </Button>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
                         (item.submenu && item.submenu.some(sub => location.pathname === sub.href))

          return (
            <div key={item.href}>
              <Link
                to={item.href}
                className={cn(styles.item, isActive && styles.itemActive)}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </Link>
              
              {!collapsed && item.submenu && (
                <div className={styles.subItems}>
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.href}
                      to={subItem.href}
                      className={cn(
                        styles.item,
                        location.pathname === subItem.href && styles.itemActive
                      )}
                    >
                      {subItem.icon}
                      <span>{subItem.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
