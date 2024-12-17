import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAI } from '@/hooks/use-ai'
import { Card } from '@/components/ui/card'
import { Loader2, Send } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    await generateResponse(input, 'You are a helpful AI study assistant.')
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="AI Study Assistant"
        description="Your personal AI tutor to help with any academic questions"
      >
        <div className="flex flex-col h-[600px]">
          <ScrollArea className="flex-1 pr-4">
            {messages.map((message, index) => (
              <Card
                key={index}
                className={`p-4 mb-4 ${
                  message.role === 'assistant'
                    ? 'bg-secondary'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {message.content}
              </Card>
            ))}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your studies..."
                className="min-h-[80px]"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
