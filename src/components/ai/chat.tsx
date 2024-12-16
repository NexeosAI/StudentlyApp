import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ReactMarkdown from 'react-markdown'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CodeBlock } from '@/components/ui/code-block'
import { AIService } from '@/lib/services/ai'
import type { Message } from '@/lib/types/ai'

const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
})

type FormData = z.infer<typeof messageSchema>

const aiService = new AIService()

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(messageSchema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      const newMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: data.content,
        createdAt: new Date(),
      }
      setMessages(prev => [...prev, newMessage])
      reset()

      const response = await aiService.chat([...messages, newMessage])
      const reader = response.toReadableStream().getReader()
      let assistantMessage = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = new TextDecoder().decode(value)
        const parsed = JSON.parse(chunk)
        assistantMessage += parsed.choices[0].delta.content || ''
        
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1]
          if (lastMessage.role === 'assistant') {
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, content: assistantMessage },
            ]
          }
          return [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: 'assistant',
              content: assistantMessage,
              createdAt: new Date(),
            },
          ]
        })
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }: {
                    node: any;
                    inline?: boolean;
                    className?: string;
                    children: React.ReactNode;
                  }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <CodeBlock language={match[1]} {...props}>
                        {String(children).replace(/\n$/, '')}
                      </CodeBlock>
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-t bg-background p-4"
      >
        <div className="flex space-x-2">
          <Textarea
            {...register('content')}
            placeholder="Type your message..."
            className="min-h-[60px]"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {errors.content && (
          <p className="mt-1 text-sm text-destructive">
            {errors.content.message}
          </p>
        )}
      </form>
    </div>
  )
}
