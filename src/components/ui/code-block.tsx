import { type ComponentProps } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps extends Omit<ComponentProps<typeof SyntaxHighlighter>, 'style'> {
  children: string
  language?: string
}

export function CodeBlock({ children, language = 'text', ...props }: CodeBlockProps) {
  return (
    <SyntaxHighlighter
      {...props}
      style={oneDark}
      language={language}
      customStyle={{ margin: 0, background: 'transparent' }}
      wrapLongLines
    >
      {children}
    </SyntaxHighlighter>
  )
}
