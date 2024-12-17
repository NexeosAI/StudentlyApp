import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAI } from '@/hooks/use-ai'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

interface Feedback {
  content: string
  suggestions: string[]
  grammar: string[]
  style: string[]
}

export default function WritingCoachPage() {
  const [text, setText] = useState('')
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      // Parse the AI response into structured feedback
      const feedbackData = JSON.parse(response) as Feedback
      setFeedback(feedbackData)
    },
  })

  const handleAnalyze = async () => {
    if (!text.trim() || isLoading) return

    const prompt = `
      Analyze the following text and provide detailed writing feedback in JSON format:
      Text: "${text}"
      
      Provide feedback in the following structure:
      {
        "content": "Overall feedback summary",
        "suggestions": ["List of improvement suggestions"],
        "grammar": ["List of grammar issues"],
        "style": ["List of style recommendations"]
      }
    `

    await generateResponse(prompt, 'You are an expert writing coach.')
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="AI Writing Coach"
        description="Get expert feedback on your writing"
      >
        <div className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here for analysis..."
            className="min-h-[200px]"
          />
          
          <Button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Analyze Writing
          </Button>

          {feedback && (
            <Tabs defaultValue="overview" className="mt-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="grammar">Grammar</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="p-4">{feedback.content}</Card>
              </TabsContent>

              <TabsContent value="suggestions">
                <Card className="p-4">
                  <ul className="list-disc pl-4 space-y-2">
                    {feedback.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="grammar">
                <Card className="p-4">
                  <ul className="list-disc pl-4 space-y-2">
                    {feedback.grammar.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="style">
                <Card className="p-4">
                  <ul className="list-disc pl-4 space-y-2">
                    {feedback.style.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
