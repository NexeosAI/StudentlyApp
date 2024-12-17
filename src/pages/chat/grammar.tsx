import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAI } from '@/hooks/use-ai'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Correction {
  original: string
  corrected: string
  explanation: string
  type: 'grammar' | 'spelling' | 'punctuation' | 'style'
}

export default function GrammarCheckerPage() {
  const [text, setText] = useState('')
  const [corrections, setCorrections] = useState<Correction[]>([])
  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      const correctionData = JSON.parse(response) as Correction[]
      setCorrections(correctionData)
    },
  })

  const handleCheck = async () => {
    if (!text.trim() || isLoading) return

    const prompt = `
      Check the following text for grammar, spelling, punctuation, and style issues.
      Provide corrections in JSON format:
      Text: "${text}"
      
      Return an array of corrections in this format:
      [
        {
          "original": "incorrect text",
          "corrected": "corrected text",
          "explanation": "explanation of the correction",
          "type": "grammar|spelling|punctuation|style"
        }
      ]
    `

    await generateResponse(prompt, 'You are an expert grammar checker.')
  }

  const getTypeColor = (type: Correction['type']) => {
    switch (type) {
      case 'grammar':
        return 'bg-red-500'
      case 'spelling':
        return 'bg-yellow-500'
      case 'punctuation':
        return 'bg-blue-500'
      case 'style':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Grammar Checker"
        description="Check your text for grammar, spelling, and style issues"
      >
        <div className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text to check for grammar issues..."
            className="min-h-[200px]"
          />
          
          <Button
            onClick={handleCheck}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Check Grammar
          </Button>

          {corrections.length > 0 && (
            <div className="space-y-4 mt-6">
              {corrections.map((correction, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className={getTypeColor(correction.type)}>
                      {correction.type}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="line-through text-muted-foreground">
                      {correction.original}
                    </p>
                    <p className="font-medium mt-1">{correction.corrected}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {correction.explanation}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
