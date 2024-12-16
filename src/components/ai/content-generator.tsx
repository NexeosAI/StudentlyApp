import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ReactMarkdown from 'react-markdown'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CodeBlock } from '@/components/ui/code-block'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AIService } from '@/lib/services/ai'
import type { GenerationOptions } from '@/lib/types/ai'

const formSchema = z.object({
  type: z.enum(['essay', 'research', 'notes', 'flashcards', 'quiz', 'mindmap']),
  topic: z.string().min(1, 'Topic is required'),
  length: z.string().optional(),
  style: z.string().optional(),
  format: z.string().optional(),
  language: z.string().optional(),
  additionalInstructions: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const aiService = new AIService()

export function ContentGenerator() {
  const [generatedContent, setGeneratedContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'essay',
      language: 'English',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      const options: GenerationOptions = {
        ...data,
        length: data.length ? parseInt(data.length) : undefined,
      }
      const content = await aiService.generateContent(options)
      setGeneratedContent(content || '')
    } catch (error) {
      console.error('Error generating content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Content Type
            </label>
            <Select
              onValueChange={value => setValue('type', value as FormData['type'])}
              defaultValue="essay"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="essay">Essay</SelectItem>
                <SelectItem value="research">Research Paper</SelectItem>
                <SelectItem value="notes">Study Notes</SelectItem>
                <SelectItem value="flashcards">Flashcards</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="mindmap">Mind Map</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="length" className="text-sm font-medium">
              Length
            </label>
            <Input
              {...register('length')}
              type="number"
              placeholder="e.g., 500 words"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="topic" className="text-sm font-medium">
            Topic
          </label>
          <Input
            {...register('topic')}
            placeholder="Enter the topic or subject"
          />
          {errors.topic && (
            <p className="text-sm text-destructive">{errors.topic.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="style" className="text-sm font-medium">
              Style
            </label>
            <Input
              {...register('style')}
              placeholder="e.g., Academic, Casual"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="language" className="text-sm font-medium">
              Language
            </label>
            <Input
              {...register('language')}
              placeholder="e.g., English, Spanish"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="format" className="text-sm font-medium">
            Format
          </label>
          <Input
            {...register('format')}
            placeholder="e.g., APA, MLA, or custom format"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="additionalInstructions" className="text-sm font-medium">
            Additional Instructions
          </label>
          <Textarea
            {...register('additionalInstructions')}
            placeholder="Any specific requirements or instructions"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Content'
          )}
        </Button>
      </form>

      {generatedContent && (
        <div className="rounded-lg border bg-card p-4">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
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
            {generatedContent}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}
