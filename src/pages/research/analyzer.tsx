import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { useAI } from '@/hooks/use-ai'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, FileText, Upload } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PaperAnalysis {
  summary: {
    title: string
    authors: string[]
    mainFindings: string[]
    methodology: string
    conclusions: string
  }
  analysis: {
    strengths: string[]
    limitations: string[]
    implications: string[]
    futureWork: string[]
  }
  keyPoints: {
    category: string
    points: string[]
  }[]
  references: {
    title: string
    relevance: string
    connection: string
  }[]
}

export default function PaperAnalyzerPage() {
  const [paperContent, setPaperContent] = useState('')
  const [analysis, setAnalysis] = useState<PaperAnalysis | null>(null)

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      const data = JSON.parse(response) as PaperAnalysis
      setAnalysis(data)
    },
  })

  const handleAnalyze = async () => {
    if (!paperContent || isLoading) return

    const prompt = `
      Analyze the following research paper:
      ${paperContent}

      Generate a comprehensive analysis in this JSON format:
      {
        "summary": {
          "title": "paper title",
          "authors": ["author names"],
          "mainFindings": ["key findings"],
          "methodology": "research methodology",
          "conclusions": "main conclusions"
        },
        "analysis": {
          "strengths": ["paper strengths"],
          "limitations": ["paper limitations"],
          "implications": ["research implications"],
          "futureWork": ["suggested future work"]
        },
        "keyPoints": [
          {
            "category": "category name",
            "points": ["relevant points"]
          }
        ],
        "references": [
          {
            "title": "reference title",
            "relevance": "relevance to paper",
            "connection": "how it connects to the research"
          }
        ]
      }

      Focus on:
      1. Clear and concise summary
      2. Critical analysis of methodology and findings
      3. Identification of key contributions
      4. Evaluation of limitations and future work
    `

    await generateResponse(prompt, 'You are an expert research analyst with deep knowledge of academic paper analysis and critical evaluation.')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setPaperContent(content)
    }
    reader.readAsText(file)
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Paper Analyzer"
        description="Analyze and understand research papers"
      >
        <div className="space-y-6">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="paper">Paper Content</Label>
                <div className="flex gap-2 mb-2">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Paper
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".txt,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <Textarea
                  id="paper"
                  value={paperContent}
                  onChange={(e) => setPaperContent(e.target.value)}
                  placeholder="Paste your paper content here or upload a file..."
                  className="min-h-[200px]"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <FileText className="h-4 w-4 mr-2" />
                )}
                Analyze Paper
              </Button>
            </div>
          </Card>

          {analysis && (
            <Card className="p-6">
              <Tabs defaultValue="summary">
                <TabsList>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="keypoints">Key Points</TabsTrigger>
                  <TabsTrigger value="references">References</TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[500px] mt-4">
                  <TabsContent value="summary">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Title</h3>
                        <p>{analysis.summary.title}</p>
                      </div>

                      <div>
                        <h3 className="font-medium">Authors</h3>
                        <p>{analysis.summary.authors.join(', ')}</p>
                      </div>

                      <div>
                        <h3 className="font-medium">Main Findings</h3>
                        <ul className="list-disc pl-4 space-y-2">
                          {analysis.summary.mainFindings.map((finding, index) => (
                            <li key={index}>{finding}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium">Methodology</h3>
                        <p>{analysis.summary.methodology}</p>
                      </div>

                      <div>
                        <h3 className="font-medium">Conclusions</h3>
                        <p>{analysis.summary.conclusions}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="analysis">
                    <div className="space-y-6">
                      <Card className="p-4">
                        <h3 className="font-medium mb-2">Strengths</h3>
                        <ul className="list-disc pl-4 space-y-2">
                          {analysis.analysis.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                          ))}
                        </ul>
                      </Card>

                      <Card className="p-4">
                        <h3 className="font-medium mb-2">Limitations</h3>
                        <ul className="list-disc pl-4 space-y-2">
                          {analysis.analysis.limitations.map((limitation, index) => (
                            <li key={index}>{limitation}</li>
                          ))}
                        </ul>
                      </Card>

                      <Card className="p-4">
                        <h3 className="font-medium mb-2">Implications</h3>
                        <ul className="list-disc pl-4 space-y-2">
                          {analysis.analysis.implications.map((implication, index) => (
                            <li key={index}>{implication}</li>
                          ))}
                        </ul>
                      </Card>

                      <Card className="p-4">
                        <h3 className="font-medium mb-2">Future Work</h3>
                        <ul className="list-disc pl-4 space-y-2">
                          {analysis.analysis.futureWork.map((work, index) => (
                            <li key={index}>{work}</li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="keypoints">
                    <div className="space-y-6">
                      {analysis.keyPoints.map((category, index) => (
                        <Card key={index} className="p-4">
                          <h3 className="font-medium mb-2">{category.category}</h3>
                          <ul className="list-disc pl-4 space-y-2">
                            {category.points.map((point, pointIndex) => (
                              <li key={pointIndex}>{point}</li>
                            ))}
                          </ul>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="references">
                    <div className="space-y-4">
                      {analysis.references.map((reference, index) => (
                        <Card key={index} className="p-4">
                          <h3 className="font-medium">{reference.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Relevance: {reference.relevance}
                          </p>
                          <p className="mt-2">{reference.connection}</p>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </Card>
          )}
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
