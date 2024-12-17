import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { useAI } from '@/hooks/use-ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, FileText, Download } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ReportSection {
  title: string
  content: string
  subsections?: {
    title: string
    content: string
  }[]
}

interface ReportStructure {
  title: string
  executiveSummary: string
  sections: ReportSection[]
  conclusions: string[]
  recommendations: string[]
}

interface ReportDraft {
  title: string
  content: string
  feedback: {
    strengths: string[]
    improvements: string[]
    suggestions: string[]
  }
}

export default function ReportGeneratorPage() {
  const [topic, setTopic] = useState('')
  const [type, setType] = useState('business')
  const [length, setLength] = useState('standard')
  const [requirements, setRequirements] = useState('')
  const [structure, setStructure] = useState<ReportStructure | null>(null)
  const [draft, setDraft] = useState<ReportDraft | null>(null)

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      try {
        if (!structure) {
          const structureData = JSON.parse(response) as ReportStructure
          setStructure(structureData)
        } else {
          const draftData = JSON.parse(response) as ReportDraft
          setDraft(draftData)
        }
      } catch (error) {
        console.error('Failed to parse AI response:', error)
      }
    },
  })

  const handleGenerateStructure = async () => {
    if (!topic || isLoading) return

    const prompt = `
      Create a report structure for the following:
      Topic: ${topic}
      Type: ${type}
      Length: ${length}
      Requirements: ${requirements}

      Generate a structure in this JSON format:
      {
        "title": "report title",
        "executiveSummary": "brief summary",
        "sections": [
          {
            "title": "section title",
            "content": "section overview",
            "subsections": [
              {
                "title": "subsection title",
                "content": "subsection content"
              }
            ]
          }
        ],
        "conclusions": ["main conclusions"],
        "recommendations": ["specific recommendations"]
      }

      Ensure the structure:
      1. Is appropriate for the report type
      2. Includes all necessary sections
      3. Has clear organization
      4. Follows professional standards
    `

    await generateResponse(prompt, 'You are an expert report writer with extensive experience in professional and academic documentation.')
  }

  const handleGenerateDraft = async () => {
    if (!structure || isLoading) return

    const prompt = `
      Generate a complete report based on this structure:
      ${JSON.stringify(structure, null, 2)}

      Type: ${type}
      Length: ${length}
      Requirements: ${requirements}

      Return the report in this JSON format:
      {
        "title": "report title",
        "content": "complete report text",
        "feedback": {
          "strengths": ["strong points"],
          "improvements": ["areas for improvement"],
          "suggestions": ["specific suggestions"]
        }
      }

      Ensure the report:
      1. Follows professional formatting
      2. Uses appropriate language
      3. Includes data presentation
      4. Maintains consistent tone
    `

    await generateResponse(prompt, 'You are an expert report writer with deep knowledge of professional documentation standards.')
  }

  const handleDownload = () => {
    if (!draft) return

    const content = `
${draft.title}

${draft.content}

---
Feedback:

Strengths:
${draft.feedback.strengths.map(s => `- ${s}`).join('\n')}

Areas for Improvement:
${draft.feedback.improvements.map(i => `- ${i}`).join('\n')}

Suggestions:
${draft.feedback.suggestions.map(s => `- ${s}`).join('\n')}
`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${draft.title.toLowerCase().replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Report Generator"
        description="Generate professional reports and documentation"
      >
        <div className="space-y-6">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="topic">Report Topic</Label>
                <Textarea
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your report topic or objective..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Report Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business Report</SelectItem>
                      <SelectItem value="technical">Technical Report</SelectItem>
                      <SelectItem value="research">Research Report</SelectItem>
                      <SelectItem value="analysis">Analysis Report</SelectItem>
                      <SelectItem value="proposal">Proposal Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Report Length</Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brief">Brief (2-3 pages)</SelectItem>
                      <SelectItem value="standard">Standard (5-7 pages)</SelectItem>
                      <SelectItem value="detailed">Detailed (10-15 pages)</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive (20+ pages)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="requirements">Additional Requirements</Label>
                <Textarea
                  id="requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Enter any specific requirements or guidelines..."
                  className="min-h-[100px]"
                />
              </div>

              <Button
                onClick={handleGenerateStructure}
                disabled={isLoading || !topic}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <FileText className="h-4 w-4 mr-2" />
                )}
                Generate Structure
              </Button>
            </div>
          </Card>

          {structure && (
            <Card className="p-6">
              <Tabs defaultValue="structure">
                <TabsList className="mb-4">
                  <TabsTrigger value="structure">Structure</TabsTrigger>
                  {draft && <TabsTrigger value="draft">Draft</TabsTrigger>}
                </TabsList>

                <TabsContent value="structure">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">{structure.title}</h3>
                      <p className="mt-2 text-muted-foreground">
                        {structure.executiveSummary}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {structure.sections.map((section, index) => (
                        <Card key={index} className="p-4">
                          <h4 className="font-medium">{section.title}</h4>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {section.content}
                          </p>
                          {section.subsections && (
                            <div className="mt-4 pl-4 space-y-2">
                              {section.subsections.map((subsection, subIndex) => (
                                <div key={subIndex}>
                                  <h5 className="text-sm font-medium">
                                    {subsection.title}
                                  </h5>
                                  <p className="text-sm text-muted-foreground">
                                    {subsection.content}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </Card>
                      ))}

                      <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4">
                          <h4 className="font-medium">Conclusions</h4>
                          <ul className="mt-2 list-disc pl-5 space-y-1">
                            {structure.conclusions.map((conclusion, index) => (
                              <li key={index}>{conclusion}</li>
                            ))}
                          </ul>
                        </Card>

                        <Card className="p-4">
                          <h4 className="font-medium">Recommendations</h4>
                          <ul className="mt-2 list-disc pl-5 space-y-1">
                            {structure.recommendations.map((recommendation, index) => (
                              <li key={index}>{recommendation}</li>
                            ))}
                          </ul>
                        </Card>
                      </div>
                    </div>

                    <Button
                      onClick={handleGenerateDraft}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <FileText className="h-4 w-4 mr-2" />
                      )}
                      Generate Draft
                    </Button>
                  </div>
                </TabsContent>

                {draft && (
                  <TabsContent value="draft">
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">{draft.title}</h3>
                          <Button variant="outline" onClick={handleDownload}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        <div className="mt-4 whitespace-pre-wrap">
                          {draft.content}
                        </div>
                      </div>

                      <Card className="p-4">
                        <h4 className="font-medium mb-4">Feedback</h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium text-green-500">Strengths</h5>
                            <ul className="mt-2 list-disc pl-5 space-y-1">
                              {draft.feedback.strengths.map((strength, index) => (
                                <li key={index}>{strength}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-yellow-500">
                              Areas for Improvement
                            </h5>
                            <ul className="mt-2 list-disc pl-5 space-y-1">
                              {draft.feedback.improvements.map((improvement, index) => (
                                <li key={index}>{improvement}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-blue-500">Suggestions</h5>
                            <ul className="mt-2 list-disc pl-5 space-y-1">
                              {draft.feedback.suggestions.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </Card>
          )}
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
