import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { useAI } from '@/hooks/use-ai'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, Search, BookOpen } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ResearchSuggestion {
  topic: string
  description: string
  keywords: string[]
  sources: {
    title: string
    type: string
    relevance: string
    description: string
  }[]
  researchQuestions: string[]
}

export default function ResearchHelperPage() {
  const [topic, setTopic] = useState('')
  const [researchType, setResearchType] = useState('academic')
  const [suggestions, setSuggestions] = useState<ResearchSuggestion | null>(null)

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      const data = JSON.parse(response) as ResearchSuggestion
      setSuggestions(data)
    },
  })

  const handleGenerateSuggestions = async () => {
    if (!topic || isLoading) return

    const prompt = `
      Help me research the following topic:
      ${topic}

      Research type: ${researchType}

      Generate research suggestions in this JSON format:
      {
        "topic": "refined topic",
        "description": "detailed description",
        "keywords": ["relevant keywords"],
        "sources": [
          {
            "title": "source title",
            "type": "book/article/journal/website",
            "relevance": "high/medium/low",
            "description": "why this source is relevant"
          }
        ],
        "researchQuestions": ["potential research questions"]
      }

      Focus on providing:
      1. A refined and focused research topic
      2. Key areas to explore
      3. Relevant academic sources
      4. Potential research questions
    `

    await generateResponse(prompt, 'You are an expert research advisor with extensive knowledge of academic methodologies and sources.')
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Research Helper"
        description="Get suggestions and guidance for your research"
      >
        <div className="space-y-6">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="topic">Research Topic</Label>
                <Textarea
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your research topic or area of interest..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label>Research Type</Label>
                <Select value={researchType} onValueChange={setResearchType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select research type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic Paper</SelectItem>
                    <SelectItem value="thesis">Thesis</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerateSuggestions}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Generate Research Suggestions
              </Button>
            </div>
          </Card>

          {suggestions && (
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Refined Topic</h3>
                  <p>{suggestions.topic}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {suggestions.description}
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-2">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary rounded-md text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-4">Recommended Sources</h3>
                  <div className="space-y-4">
                    {suggestions.sources.map((source, index) => (
                      <Card key={index} className="p-3">
                        <div className="flex items-start gap-3">
                          <BookOpen className="h-5 w-5 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">{source.title}</h4>
                            <div className="flex gap-2 mt-1">
                              <span className="text-xs bg-secondary px-2 py-0.5 rounded">
                                {source.type}
                              </span>
                              <span className="text-xs bg-secondary px-2 py-0.5 rounded">
                                {source.relevance} relevance
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              {source.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-2">Research Questions</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    {suggestions.researchQuestions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </ScrollArea>
          )}
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
