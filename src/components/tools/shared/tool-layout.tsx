import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ToolLayoutProps {
  children: React.ReactNode
  className?: string
  sidebar?: React.ReactNode
}

export function ToolLayout({ children, className, sidebar }: ToolLayoutProps) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      {sidebar && (
        <Card className="md:w-72 p-4">
          {sidebar}
        </Card>
      )}
      <Card className={cn('flex-1 p-4', className)}>
        {children}
      </Card>
    </div>
  )
}
