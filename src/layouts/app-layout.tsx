import React from 'react';
import { ThemeSwitcher } from '@/components/theme/theme-switcher';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/store/auth-store';
import { LocaleSwitcher } from '@/components/locale/locale-switcher';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSidebar } from '@/lib/store/sidebar-store';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const clearAuth = useAuth((state) => state.clearAuth);
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 h-16 bg-background border-b">
        <div className="flex h-full items-center justify-between px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">StudentlyAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <ThemeSwitcher />
            <Button variant="ghost" onClick={clearAuth}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar className={cn("h-[calc(100vh-4rem)] border-r", collapsed ? "w-[80px]" : "w-64")} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
