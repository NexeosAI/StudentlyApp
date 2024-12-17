import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ToolLayout } from '../shared/tool-layout';
import { plagiarismDetector } from '@/lib/services/ai/plagiarism-detector';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  text: z.string().min(1, 'Please enter some text to check'),
  strictness: z.enum(['low', 'medium', 'high']),
  checkQuotes: z.boolean(),
  checkParaphrasing: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

export function PlagiarismDetector() {
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<any>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      strictness: 'medium',
      checkQuotes: true,
      checkParaphrasing: true,
    },
  })

  async function onSubmit(values: FormValues) {
    setIsChecking(true)
    try {
      const result = await plagiarismDetector.checkPlagiarism(values.text, {
        strictness: values.strictness,
        checkQuotes: values.checkQuotes,
        checkParaphrasing: values.checkParaphrasing,
        includeSourceLinks: true,
      })
      setResult(result)
    } catch (error) {
      console.error('Error checking plagiarism:', error)
    } finally {
      setIsChecking(false)
    }
  }

  const sidebar = (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure how the plagiarism check should be performed.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="strictness"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strictness Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select strictness level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkQuotes"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0">
                <FormLabel>Check Quotes</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkParaphrasing"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0">
                <FormLabel>Check Paraphrasing</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isChecking}>
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              'Check for Plagiarism'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )

  return (
    <ToolLayout sidebar={sidebar}>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Plagiarism Detector</h2>
          <p className="text-muted-foreground">
            Check your text for potential plagiarism and get detailed feedback.
          </p>
        </div>

        <Form {...form}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter your text here..."
                    className="min-h-[300px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>

        {result && (
          <div className="space-y-4 mt-8">
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Originality Score</h3>
                  <span className="text-sm font-medium">
                    {Math.round(result.originalityScore * 100)}%
                  </span>
                </div>
                <Progress value={result.originalityScore * 100} />
              </div>
            </Card>

            {result.matches.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Potential Matches</h3>
                <div className="space-y-4">
                  {result.matches.map((match: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">{match.text}</p>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(match.similarity * 100)}% similar
                        </span>
                      </div>
                      {match.source && (
                        <p className="text-sm text-muted-foreground">
                          Source: {match.source}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {result.suggestions.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Suggestions</h3>
                <ul className="list-disc list-inside space-y-2">
                  {result.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="text-sm">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
