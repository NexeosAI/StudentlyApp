import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToolLayout } from '../shared/tool-layout'
import { digitalLibrary, ResourceType, SearchFilters, ResourceMetadata } from '@/lib/services/ai/digital-library'
import { Loader2, BookOpen, Download, Quote } from 'lucide-react'

const formSchema = z.object({
  query: z.string().min(1, 'Please enter a search query'),
  type: z.array(z.enum(['article', 'book', 'journal', 'paper', 'thesis', 'dataset'])).optional(),
  yearStart: z.string().optional(),
  yearEnd: z.string().optional(),
  language: z.array(z.string()).optional(),
  subject: z.array(z.string()).optional(),
  accessLevel: z.enum(['open', 'restricted', 'all']).optional(),
})

type FormValues = z.infer<typeof formSchema>

export function DigitalLibrary() {
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [selectedResource, setSelectedResource] = useState<ResourceMetadata | null>(null)
  const [citationStyle, setCitationStyle] = useState<'apa' | 'mla' | 'chicago'>('apa')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
      type: [],
      yearStart: '',
      yearEnd: '',
      language: [],
      subject: [],
      accessLevel: 'all',
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSearching(true)
    try {
      const filters: SearchFilters = {
        type: values.type as ResourceType[],
        year: {
          start: values.yearStart ? parseInt(values.yearStart) : undefined,
          end: values.yearEnd ? parseInt(values.yearEnd) : undefined,
        },
        language: values.language,
        subject: values.subject,
        accessLevel: values.accessLevel,
      }

      const result = await digitalLibrary.searchResources(values.query, filters)
      setResult(result)
    } catch (error) {
      console.error('Error searching resources:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const sidebar = (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Search Filters</h3>
        <p className="text-sm text-muted-foreground">
          Refine your search results.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resource Type</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange([...field.value || [], value])}
                  value={field.value?.[0]}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="journal">Journal</SelectItem>
                    <SelectItem value="paper">Paper</SelectItem>
                    <SelectItem value="thesis">Thesis</SelectItem>
                    <SelectItem value="dataset">Dataset</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="yearStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year From</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Start year" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year To</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="End year" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="accessLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">All Resources</SelectItem>
                    <SelectItem value="open">Open Access</SelectItem>
                    <SelectItem value="restricted">Restricted</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSearching}>
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              'Search'
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
          <h2 className="text-2xl font-bold">Digital Library</h2>
          <p className="text-muted-foreground">
            Search and access academic resources.
          </p>
        </div>

        <Form {...form}>
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search for articles, books, journals..."
                    className="text-lg"
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
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Found {result.totalResults} results
              </div>
              {result.relatedQueries.length > 0 && (
                <div className="flex gap-2">
                  {result.relatedQueries.map((query: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => form.setValue('query', query)}
                    >
                      {query}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-4">
              {result.resources.map((resource: ResourceMetadata) => (
                <Card
                  key={resource.id}
                  className="p-4 hover:bg-accent cursor-pointer"
                  onClick={() => setSelectedResource(resource)}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">{resource.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {resource.authors.join(', ')} • {resource.year}
                      </div>
                      {resource.abstract && (
                        <p className="text-sm line-clamp-2">{resource.abstract}</p>
                      )}
                      <div className="flex gap-2 mt-2">
                        <Badge>{resource.type}</Badge>
                        <Badge variant={resource.accessLevel === 'open' ? 'default' : 'secondary'}>
                          {resource.accessLevel}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {resource.url && (
                        <Button size="icon" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="icon" variant="ghost">
                        <Quote className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {selectedResource && (
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{selectedResource.title}</h3>
                    <Button size="icon" variant="ghost" onClick={() => setSelectedResource(null)}>
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </div>

                  <Tabs defaultValue="details">
                    <TabsList>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="citation">Citation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="space-y-4">
                      {selectedResource.abstract && (
                        <div>
                          <h4 className="font-medium mb-2">Abstract</h4>
                          <p className="text-sm">{selectedResource.abstract}</p>
                        </div>
                      )}
                      {selectedResource.keywords && (
                        <div>
                          <h4 className="font-medium mb-2">Keywords</h4>
                          <div className="flex gap-2">
                            {selectedResource.keywords.map((keyword, index) => (
                              <Badge key={index} variant="secondary">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="citation">
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Button
                            variant={citationStyle === 'apa' ? 'default' : 'outline'}
                            onClick={() => setCitationStyle('apa')}
                          >
                            APA
                          </Button>
                          <Button
                            variant={citationStyle === 'mla' ? 'default' : 'outline'}
                            onClick={() => setCitationStyle('mla')}
                          >
                            MLA
                          </Button>
                          <Button
                            variant={citationStyle === 'chicago' ? 'default' : 'outline'}
                            onClick={() => setCitationStyle('chicago')}
                          >
                            Chicago
                          </Button>
                        </div>
                        <pre className="bg-muted p-4 rounded-lg text-sm">
                          {selectedResource.citation[citationStyle]}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
