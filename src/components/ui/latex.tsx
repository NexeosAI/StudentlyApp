import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { cn } from '@/lib/utils'

interface LatexProps {
  math: string
  inline?: boolean
  className?: string
}

export function Latex({ math, inline = false, className }: LatexProps) {
  try {
    // Check if the input is already properly formatted LaTeX
    if (math.includes('\\(') || math.includes('\\[')) {
      // Split the text into LaTeX and non-LaTeX parts
      const parts = math.split(/(\\[[(].*?\\[\])])/s)
      
      return (
        <span className={cn("text-foreground", className)}>
          {parts.map((part, index) => {
            if (part.startsWith('\\(') && part.endsWith('\\)')) {
              // Inline math
              return (
                <InlineMath
                  key={index}
                  math={part.slice(2, -2).trim()}
                />
              )
            } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
              // Display math
              return (
                <BlockMath
                  key={index}
                  math={part.slice(2, -2).trim()}
                />
              )
            } else {
              // Regular text
              return <span key={index}>{part}</span>
            }
          })}
        </span>
      )
    }

    // If no LaTeX delimiters found, treat the entire string as math
    const Component = inline ? InlineMath : BlockMath
    return (
      <Component
        math={math}
        className={cn("text-foreground", className)}
        renderError={(error: Error) => (
          <span className="text-destructive">{error.message}</span>
        )}
      />
    )
  } catch (error) {
    console.error('Error rendering LaTeX:', error)
    return <span className="text-destructive">{math}</span>
  }
}
