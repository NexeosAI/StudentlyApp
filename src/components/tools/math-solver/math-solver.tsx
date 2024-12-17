import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MathProblem, MathSolution, mathSolver } from '@/lib/services/ai/math-solver'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Latex } from '@/components/ui/latex'

const formSchema = z.object({
  type: z.enum(['algebra', 'calculus', 'statistics', 'geometry', 'other']),
  question: z.string().min(1, 'Please enter your math problem'),
  context: z.string().optional(),
  requireSteps: z.boolean().default(true),
})

export function MathSolver() {
  const [solution, setSolution] = useState<MathSolution | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'algebra',
      question: '',
      context: '',
      requireSteps: true,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      setSolution(null)
      
      const problem: MathProblem = {
        type: values.type,
        question: values.question,
        context: values.context,
        requireSteps: values.requireSteps,
      }

      const result = await mathSolver.solveProblem(problem)
      setSolution(result)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to solve the math problem. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">AI Maths Solver</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Form */}
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a problem type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="algebra">Algebra</SelectItem>
                        <SelectItem value="calculus">Calculus</SelectItem>
                        <SelectItem value="statistics">Statistics</SelectItem>
                        <SelectItem value="geometry">Geometry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your math problem here..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Be as specific as possible with your question
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="context"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Context (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Any additional context or constraints..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requireSteps"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Show Solution Steps
                      </FormLabel>
                      <FormDescription>
                        Display detailed step-by-step solution
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Solve Problem
              </Button>
            </form>
          </Form>
        </Card>

        {/* Solution Display */}
        <Card className={cn('p-6', { 'animate-in fade-in': solution })}>
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : solution ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Answer</h3>
                  <div className="rounded-lg bg-card p-4 shadow-sm">
                    <p className="text-card-foreground">
                      {solution.answer}
                    </p>
                  </div>
                </div>

                {solution.steps && solution.steps.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Solution Steps</h3>
                    <div className="rounded-lg bg-card p-4 shadow-sm">
                      <ol className="space-y-4">
                        {solution.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <Latex 
                                math={step} 
                                className="text-card-foreground"
                              />
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}

                {solution.explanation && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Verification</h3>
                    <div className="rounded-lg bg-card p-4 shadow-sm overflow-hidden">
                      <div className="break-words">
                        <Latex 
                          math={solution.explanation} 
                          className="text-card-foreground max-w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Enter a math problem to see the solution here
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
