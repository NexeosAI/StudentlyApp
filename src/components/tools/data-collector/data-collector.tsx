import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { ToolLayout } from '../shared/tool-layout';
import { 
  dataCollector, 
  DataCollectionTemplate, 
  DataEntry 
} from '@/lib/services/ai/data-collector';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import '@/lib/chart-config';
import { Line, Bar, Pie } from 'react-chartjs-2';

const templateFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['survey', 'experiment', 'observation', 'interview', 'field-study']),
  requirements: z.array(z.string()).optional(),
});

type TemplateFormValues = z.infer<typeof templateFormSchema>;

interface FieldProps {
  field: {
    value: any;
    onChange: (value: any) => void;
  };
}

export function DataCollector() {
  const [activeTab, setActiveTab] = useState('create');
  const [isProcessing, setIsProcessing] = useState(false);
  const [template, setTemplate] = useState<DataCollectionTemplate | null>(null);
  const [entries, setEntries] = useState<DataEntry[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'survey',
      requirements: [],
    },
  });

  async function onSubmit(values: TemplateFormValues) {
    setIsProcessing(true);
    try {
      const template = await dataCollector.createTemplate(values);
      setTemplate(template);
      setActiveTab('collect');
    } catch (error) {
      console.error('Error creating template:', error);
    } finally {
      setIsProcessing(false);
    }
  }

  async function onAnalyze() {
    if (!template) return;

    setIsProcessing(true);
    try {
      const analysisResult = await dataCollector.analyzeData(template.id, entries);
      setAnalysis(analysisResult);
      setActiveTab('analyze');
    } catch (error) {
      console.error('Error analyzing data:', error);
    } finally {
      setIsProcessing(false);
    }
  }

  const renderField = ({ field }: FieldProps) => (
    <FormItem>
      <FormLabel>Collection Type</FormLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select collection type" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="survey">Survey</SelectItem>
          <SelectItem value="experiment">Experiment</SelectItem>
          <SelectItem value="observation">Observation</SelectItem>
          <SelectItem value="interview">Interview</SelectItem>
          <SelectItem value="field-study">Field Study</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );

  const renderRequirementField = ({ field }: FieldProps) => (
    <FormItem>
      <FormLabel>Requirements</FormLabel>
      <div className="space-y-2">
        {(field.value as string[] || []).map((req: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={req}
              onChange={(e) => {
                const newReqs = [...(field.value as string[] || [])];
                newReqs[index] = e.target.value;
                field.onChange(newReqs);
              }}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                const newReqs = [...(field.value as string[] || [])];
                newReqs.splice(index, 1);
                field.onChange(newReqs);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => field.onChange([...(field.value as string[] || []), ''])}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Requirement
        </Button>
      </div>
      <FormMessage />
    </FormItem>
  );

  const renderChart = (visualization: any) => {
    const ChartComponent = {
      line: Line,
      bar: Bar,
      pie: Pie
    }[visualization.type] || Line;

    return (
      <ChartComponent
        data={visualization.config.data}
        options={visualization.config.options}
      />
    );
  };

  const sidebar = (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Template Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure your data collection template.
        </p>
      </div>
      {activeTab === 'create' && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={renderField}
            />

            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Template...
                </>
              ) : (
                'Create Template'
              )}
            </Button>
          </form>
        </Form>
      )}

      {activeTab === 'collect' && template && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">{entries.length} Entries</div>
              <Button
                size="sm"
                variant="outline"
                onClick={onAnalyze}
                disabled={entries.length === 0}
              >
                Analyze Data
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Collection started {template.settings.startDate?.toLocaleDateString()}
            </div>
          </div>
          {template.settings.timeLimit && (
            <div className="text-sm text-muted-foreground">
              Time remaining: {template.settings.timeLimit} minutes
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout sidebar={sidebar}>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Data Collection Tool</h2>
          <p className="text-muted-foreground">
            Create templates and collect research data.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="create">Create Template</TabsTrigger>
            <TabsTrigger value="collect" disabled={!template}>
              Collect Data
            </TabsTrigger>
            <TabsTrigger value="analyze" disabled={!analysis}>
              Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <Form {...form}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }: FieldProps) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter template title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }: FieldProps) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your data collection purpose..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirements"
                  render={renderRequirementField}
                />
              </div>
            </Form>
          </TabsContent>

          <TabsContent value="collect" className="space-y-4">
            {template && (
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{template.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                </Card>

                <div className="grid gap-4">
                  {template.fields.map((field) => (
                    <Card key={field.id} className="p-4">
                      <FormItem>
                        <FormLabel>{field.label}</FormLabel>
                        <FormControl>
                          {field.type === 'text' && (
                            <Input type="text" placeholder={`Enter ${field.label.toLowerCase()}`} />
                          )}
                          {field.type === 'number' && (
                            <Input
                              type="number"
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              min={field.validation?.min}
                              max={field.validation?.max}
                            />
                          )}
                          {field.type === 'choice' && field.options && (
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </FormControl>
                        {field.validation?.message && (
                          <p className="text-sm text-muted-foreground">
                            {field.validation.message}
                          </p>
                        )}
                      </FormItem>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setActiveTab('create')}>
                    Back to Template
                  </Button>
                  <Button onClick={() => setActiveTab('analyze')} disabled={entries.length === 0}>
                    View Analysis
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analyze" className="space-y-4">
            {analysis && (
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Total Responses</div>
                      <div className="text-2xl font-bold">{analysis.summary.totalResponses}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Completion Rate</div>
                      <div className="text-2xl font-bold">
                        {(analysis.summary.completionRate * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Average Time</div>
                      <div className="text-2xl font-bold">
                        {Math.round(analysis.summary.averageTime)} min
                      </div>
                    </div>
                  </div>
                </Card>

                {analysis.results.map((result: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold">{result.fieldId}</h3>
                      {result.statistics && (
                        <div className="grid grid-cols-4 gap-4">
                          {Object.entries(result.statistics).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <div className="text-sm text-muted-foreground">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </div>
                              <div className="font-medium">{String(value)}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="aspect-video">
                        {analysis.visualizations[index] && renderChart(analysis.visualizations[index])}
                      </div>
                    </div>
                  </Card>
                ))}

                {analysis.insights.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-semibold mb-4">Key Insights</h3>
                    <ul className="space-y-2">
                      {analysis.insights.map((insight: string, index: number) => (
                        <li key={index} className="text-sm">
                          • {insight}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ToolLayout>
  );
}
