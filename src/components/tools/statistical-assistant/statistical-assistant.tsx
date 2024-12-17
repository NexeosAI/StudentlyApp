import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { ToolLayout } from '../shared/tool-layout'
import { statisticalAssistant, StatisticalAnalysisType } from '@/lib/services/ai/statistical-assistant'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import '@/lib/chart-config'

// Dynamically import Chart.js to avoid SSR issues
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Chart), {
  ssr: false,
})

const formSchema = z.object({
  data: z.string().min(1, 'Please enter some data to analyze'),
  analysisType: z.enum([
    'descriptive',
    'inferential',
    'regression',
    'correlation',
    'hypothesis',
    'anova',
    'time-series'
  ]),
  confidenceLevel: z.number().min(0.8).max(0.99),
  significanceLevel: z.number().min(0.01).max(0.1),
  includeVisualization: z.boolean(),
  detailedExplanation: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

export function StatisticalAssistant() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [suggestedAnalyses, setSuggestedAnalyses] = useState<StatisticalAnalysisType[]>([])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data: '',
      analysisType: 'descriptive',
      confidenceLevel: 0.95,
      significanceLevel: 0.05,
      includeVisualization: true,
      detailedExplanation: true,
    },
  })

  async function onSubmit(values: FormValues) {
    setIsAnalyzing(true)
    try {
      // Get analysis suggestions first
      const suggestions = await statisticalAssistant.suggestAnalysis(values.data)
      setSuggestedAnalyses(suggestions)

      // Perform statistical analysis
      const result = await statisticalAssistant.analyzeData({
        data: values.data,
        analysisType: values.analysisType,
        options: {
          confidenceLevel: values.confidenceLevel,
          significanceLevel: values.significanceLevel,
          includeVisualization: values.includeVisualization,
          detailedExplanation: values.detailedExplanation,
        },
      })
      setResult(result)
    } catch (error) {
      console.error('Error performing statistical analysis:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const sidebar = (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Analysis Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure your statistical analysis parameters.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="analysisType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Analysis Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select analysis type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="descriptive">Descriptive</SelectItem>
                    <SelectItem value="inferential">Inferential</SelectItem>
                    <SelectItem value="regression">Regression</SelectItem>
                    <SelectItem value="correlation">Correlation</SelectItem>
                    <SelectItem value="hypothesis">Hypothesis Testing</SelectItem>
                    <SelectItem value="anova">ANOVA</SelectItem>
                    <SelectItem value="time-series">Time Series</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confidenceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confidence Level: {field.value * 100}%</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value * 100]}
                    max={99}
                    min={80}
                    step={1}
                    onValueChange={([value]) => field.onChange(value / 100)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="significanceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Significance Level: {field.value * 100}%</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value * 100]}
                    max={10}
                    min={1}
                    step={1}
                    onValueChange={([value]) => field.onChange(value / 100)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="includeVisualization"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0">
                <FormLabel>Include Visualizations</FormLabel>
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
            name="detailedExplanation"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0">
                <FormLabel>Detailed Explanation</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Data'
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
          <h2 className="text-2xl font-bold">Statistical Assistant</h2>
          <p className="text-muted-foreground">
            Perform advanced statistical analysis on your data.
          </p>
        </div>

        <Form {...form}>
          <FormField
            control={form.control}
            name="data"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter your data here..."
                    className="min-h-[300px] font-mono"
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
              <h3 className="font-semibold mb-4">Summary Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.summary.map((stat: any, index: number) => (
                  <div key={index} className="space-y-1">
                    <div className="text-sm font-medium">{stat.key}</div>
                    <div className="text-2xl">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {stat.interpretation}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Analysis Results</h3>
              <div className="space-y-4">
                <div className="text-sm font-medium">Method: {result.analysis.method}</div>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{JSON.stringify(result.analysis.results, null, 2)}</code>
                </pre>
                <p className="text-sm text-muted-foreground">
                  {result.analysis.interpretation}
                </p>
              </div>
            </Card>

            {result.visualizations && result.visualizations.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Visualizations</h3>
                <div className="space-y-4">
                  {result.visualizations.map((viz: any, index: number) => (
                    <div key={index} className="aspect-video">
                      <Chart
                        type={viz.type}
                        data={viz.config.data}
                        options={viz.config.options}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {result.code && (
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Implementation Code</h3>
                <div className="space-y-4">
                  {Object.entries(result.code).map(([language, code]) => (
                    <div key={language}>
                      <h4 className="text-sm font-medium mb-2">
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                      </h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
