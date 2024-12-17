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
import { Card } from '@/components/ui/card';
import { ToolLayout } from '../shared/tool-layout';
import { 
  dataVisualizer, 
  ChartType, 
  DataFormat 
} from '@/lib/services/ai/data-visualizer';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import '@/lib/chart-config'

// Dynamically import Chart.js to avoid SSR issues
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Chart), {
  ssr: false,
})

const formSchema = z.object({
  data: z.string().min(1, 'Please enter some data to visualize'),
  dataFormat: z.enum(['csv', 'json', 'array', 'text']),
  preferredChartType: z.enum(['bar', 'line', 'scatter', 'pie', 'heatmap', 'box', 'histogram']).optional(),
})

type FormValues = z.infer<typeof formSchema>

export function DataVisualizer() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [suggestedCharts, setSuggestedCharts] = useState<ChartType[]>([])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data: '',
      dataFormat: 'csv',
    },
  })

  async function onSubmit(values: FormValues) {
    setIsProcessing(true)
    try {
      // Get chart suggestions first
      const suggestions = await dataVisualizer.suggestVisualizations(
        values.data,
        values.dataFormat as DataFormat
      )
      setSuggestedCharts(suggestions)

      // Create visualization
      const result = await dataVisualizer.createVisualization({
        data: values.data,
        dataFormat: values.dataFormat as DataFormat,
        preferredChartType: values.preferredChartType,
      })
      setResult(result)
    } catch (error) {
      console.error('Error creating visualization:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const sidebar = (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure how your data should be visualized.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="dataFormat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Format</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data format" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="array">Array</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {suggestedCharts.length > 0 && (
            <FormField
              control={form.control}
              name="preferredChartType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chart Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select chart type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {suggestedCharts.map(type => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Visualize Data'
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
          <h2 className="text-2xl font-bold">Data Visualizer</h2>
          <p className="text-muted-foreground">
            Transform your data into insightful visualizations.
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
              <div className="aspect-video">
                <Chart
                  type={result.chartConfig.type}
                  data={result.chartConfig.data}
                  options={result.chartConfig.options}
                />
              </div>
            </Card>

            {result.insights.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Key Insights</h3>
                <ul className="list-disc list-inside space-y-2">
                  {result.insights.map((insight: string, index: number) => (
                    <li key={index} className="text-sm">
                      {insight}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {result.recommendations.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Recommendations</h3>
                <ul className="list-disc list-inside space-y-2">
                  {result.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="text-sm">
                      {recommendation}
                    </li>
                  ))}
                </ul>
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
