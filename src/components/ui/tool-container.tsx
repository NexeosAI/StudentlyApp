import { ReactNode } from 'react'
import { Card } from './card'
import { cn } from '@/lib/utils'

interface ToolContainerProps {
  children: ReactNode
  className?: string
  title: string
  description?: string
}

export function ToolContainer({ children, className, title, description }: ToolContainerProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </div>
      <Card className={cn("p-6", className)}>
        {children}
      </Card>
    </div>
  )
}
