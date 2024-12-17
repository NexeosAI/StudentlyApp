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

interface EssayOutline {
  title: string
  thesis: string
  sections: {
    title: string
    points: string[]
    evidence: string[]
  }[]
  conclusion: string[]
}

interface EssayDraft {
  title: string
  content: string
  feedback: {
    strengths: string[]
    improvements: string[]
    suggestions: string[]
  }
}

export default function EssayWriterPage() {
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState('argumentative')
  const [wordCount, setWordCount] = useState('1000')
  const [requirements, setRequirements] = useState('')
  const [outline, setOutline] = useState<EssayOutline | null>(null)
  const [draft, setDraft] = useState<EssayDraft | null>(null)

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      try {
        if (!outline) {
          const outlineData = JSON.parse(response) as EssayOutline
          setOutline(outlineData)
        } else {
          const draftData = JSON.parse(response) as EssayDraft
          setDraft(draftData)
        }
      } catch (error) {
        console.error('Failed to parse AI response:', error)
      }
    },
  })

  const handleGenerateOutline = async () => {
    if (!topic || isLoading) return

    const prompt = `
      Create an essay outline for the following:
      Topic: ${topic}
      Style: ${style}
      Word Count: ${wordCount} words
      Requirements: ${requirements}

      Generate an outline in this JSON format:
      {
        "title": "essay title",
        "thesis": "thesis statement",
        "sections": [
          {
            "title": "section title",
            "points": ["main points"],
            "evidence": ["supporting evidence"]
          }
        ],
        "conclusion": ["concluding points"]
      }

      Ensure the outline:
      1. Has a clear thesis statement
      2. Includes well-structured sections
      3. Provides specific evidence points
      4. Follows academic writing standards
    `

    await generateResponse(prompt, 'You are an expert essay writer and academic writing coach.')
  }

  const handleGenerateDraft = async () => {
    if (!outline || isLoading) return

    const prompt = `
      Generate a complete essay draft based on this outline:
      ${JSON.stringify(outline, null, 2)}

      Style: ${style}
      Target Word Count: ${wordCount} words
      Requirements: ${requirements}

      Return the essay in this JSON format:
      {
        "title": "essay title",
        "content": "complete essay text",
        "feedback": {
          "strengths": ["strong points"],
          "improvements": ["areas for improvement"],
          "suggestions": ["specific suggestions"]
        }
      }

      Ensure the essay:
      1. Follows academic writing standards
      2. Uses proper transitions
      3. Maintains consistent argumentation
      4. Meets the word count requirement
    `

    await generateResponse(prompt, 'You are an expert essay writer with deep knowledge of academic writing standards.')
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
        title="Essay Writer"
        description="Generate well-structured academic essays"
      >
        <div className="space-y-6">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="topic">Essay Topic</Label>
                <Textarea
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your essay topic or prompt..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Essay Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="argumentative">Argumentative</SelectItem>
                      <SelectItem value="expository">Expository</SelectItem>
                      <SelectItem value="analytical">Analytical</SelectItem>
                      <SelectItem value="narrative">Narrative</SelectItem>
                      <SelectItem value="descriptive">Descriptive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Word Count</Label>
                  <Select value={wordCount} onValueChange={setWordCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500">500 words</SelectItem>
                      <SelectItem value="1000">1,000 words</SelectItem>
                      <SelectItem value="1500">1,500 words</SelectItem>
                      <SelectItem value="2000">2,000 words</SelectItem>
                      <SelectItem value="2500">2,500 words</SelectItem>
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
                onClick={handleGenerateOutline}
                disabled={isLoading || !topic}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <FileText className="h-4 w-4 mr-2" />
                )}
                Generate Outline
              </Button>
            </div>
          </Card>

          {outline && (
            <Card className="p-6">
              <Tabs defaultValue="outline">
                <TabsList className="mb-4">
                  <TabsTrigger value="outline">Outline</TabsTrigger>
                  {draft && <TabsTrigger value="draft">Draft</TabsTrigger>}
                </TabsList>

                <TabsContent value="outline">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">{outline.title}</h3>
                      <p className="mt-2 text-muted-foreground">{outline.thesis}</p>
                    </div>

                    <div className="space-y-4">
                      {outline.sections.map((section, index) => (
                        <Card key={index} className="p-4">
                          <h4 className="font-medium">{section.title}</h4>
                          <ul className="mt-2 list-disc pl-5 space-y-1">
                            {section.points.map((point, pointIndex) => (
                              <li key={pointIndex}>
                                {point}
                                <ul className="list-circle pl-5 mt-1">
                                  {section.evidence[pointIndex] && (
                                    <li className="text-sm text-muted-foreground">
                                      {section.evidence[pointIndex]}
                                    </li>
                                  )}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      ))}

                      <Card className="p-4">
                        <h4 className="font-medium">Conclusion</h4>
                        <ul className="mt-2 list-disc pl-5 space-y-1">
                          {outline.conclusion.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </Card>
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
