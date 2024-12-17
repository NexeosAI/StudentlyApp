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

interface ProposalSection {
  title: string
  content: string
  subsections?: {
    title: string
    content: string
  }[]
}

interface ProposalStructure {
  title: string
  abstract: string
  background: string
  objectives: string[]
  methodology: {
    approach: string
    methods: string[]
    timeline: {
      phase: string
      duration: string
      activities: string[]
    }[]
  }
  resources: {
    type: string
    items: string[]
  }[]
  budget: {
    category: string
    items: {
      description: string
      cost: string
    }[]
  }[]
  outcomes: string[]
  sections: ProposalSection[]
}

interface ProposalDraft {
  title: string
  content: string
  feedback: {
    strengths: string[]
    improvements: string[]
    suggestions: string[]
  }
}

export default function ResearchProposalPage() {
  const [topic, setTopic] = useState('')
  const [type, setType] = useState('research')
  const [duration, setDuration] = useState('6months')
  const [requirements, setRequirements] = useState('')
  const [structure, setStructure] = useState<ProposalStructure | null>(null)
  const [draft, setDraft] = useState<ProposalDraft | null>(null)

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      try {
        if (!structure) {
          const structureData = JSON.parse(response) as ProposalStructure
          setStructure(structureData)
        } else {
          const draftData = JSON.parse(response) as ProposalDraft
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
      Create a research proposal structure for:
      Topic: ${topic}
      Type: ${type}
      Duration: ${duration}
      Requirements: ${requirements}

      Generate a structure in this JSON format:
      {
        "title": "proposal title",
        "abstract": "brief abstract",
        "background": "research background",
        "objectives": ["research objectives"],
        "methodology": {
          "approach": "research approach",
          "methods": ["research methods"],
          "timeline": [
            {
              "phase": "phase name",
              "duration": "time period",
              "activities": ["planned activities"]
            }
          ]
        },
        "resources": [
          {
            "type": "resource category",
            "items": ["required resources"]
          }
        ],
        "budget": [
          {
            "category": "budget category",
            "items": [
              {
                "description": "item description",
                "cost": "estimated cost"
              }
            ]
          }
        ],
        "outcomes": ["expected outcomes"],
        "sections": [
          {
            "title": "section title",
            "content": "section content",
            "subsections": [
              {
                "title": "subsection title",
                "content": "subsection content"
              }
            ]
          }
        ]
      }

      Ensure the structure:
      1. Follows academic proposal standards
      2. Includes clear research objectives
      3. Has detailed methodology
      4. Provides realistic timeline and budget
    `

    await generateResponse(prompt, 'You are an expert research proposal writer with extensive experience in academic grant writing.')
  }

  const handleGenerateDraft = async () => {
    if (!structure || isLoading) return

    const prompt = `
      Generate a complete research proposal based on this structure:
      ${JSON.stringify(structure, null, 2)}

      Type: ${type}
      Duration: ${duration}
      Requirements: ${requirements}

      Return the proposal in this JSON format:
      {
        "title": "proposal title",
        "content": "complete proposal text",
        "feedback": {
          "strengths": ["strong points"],
          "improvements": ["areas for improvement"],
          "suggestions": ["specific suggestions"]
        }
      }

      Ensure the proposal:
      1. Follows academic writing standards
      2. Is well-structured and clear
      3. Includes all necessary components
      4. Is persuasive and well-justified
    `

    await generateResponse(prompt, 'You are an expert research proposal writer with deep knowledge of academic grant writing standards.')
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
        title="Research Proposal Generator"
        description="Generate academic research proposals"
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
                  placeholder="Enter your research topic or objective..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Proposal Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research">Academic Research</SelectItem>
                      <SelectItem value="grant">Grant Proposal</SelectItem>
                      <SelectItem value="thesis">Thesis Proposal</SelectItem>
                      <SelectItem value="project">Project Proposal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Project Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 Months</SelectItem>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="2years">2 Years</SelectItem>
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
                        {structure.abstract}
                      </p>
                    </div>

                    <Card className="p-4">
                      <h4 className="font-medium">Background</h4>
                      <p className="mt-2">{structure.background}</p>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-medium">Research Objectives</h4>
                      <ul className="mt-2 list-disc pl-5 space-y-1">
                        {structure.objectives.map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))}
                      </ul>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-medium">Methodology</h4>
                      <p className="mt-2">{structure.methodology.approach}</p>
                      <div className="mt-4">
                        <h5 className="font-medium">Methods</h5>
                        <ul className="mt-2 list-disc pl-5 space-y-1">
                          {structure.methodology.methods.map((method, index) => (
                            <li key={index}>{method}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4">
                        <h5 className="font-medium">Timeline</h5>
                        <div className="mt-2 space-y-4">
                          {structure.methodology.timeline.map((phase, index) => (
                            <Card key={index} className="p-3">
                              <div className="flex justify-between">
                                <span className="font-medium">{phase.phase}</span>
                                <span>{phase.duration}</span>
                              </div>
                              <ul className="mt-2 list-disc pl-5 space-y-1">
                                {phase.activities.map((activity, actIndex) => (
                                  <li key={actIndex}>{activity}</li>
                                ))}
                              </ul>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4">
                        <h4 className="font-medium">Resources</h4>
                        <div className="mt-2 space-y-4">
                          {structure.resources.map((resource, index) => (
                            <div key={index}>
                              <h5 className="font-medium">{resource.type}</h5>
                              <ul className="mt-1 list-disc pl-5 space-y-1">
                                {resource.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h4 className="font-medium">Budget</h4>
                        <div className="mt-2 space-y-4">
                          {structure.budget.map((category, index) => (
                            <div key={index}>
                              <h5 className="font-medium">{category.category}</h5>
                              <ul className="mt-1 list-disc pl-5 space-y-1">
                                {category.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    {item.description}: {item.cost}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>

                    <Card className="p-4">
                      <h4 className="font-medium">Expected Outcomes</h4>
                      <ul className="mt-2 list-disc pl-5 space-y-1">
                        {structure.outcomes.map((outcome, index) => (
                          <li key={index}>{outcome}</li>
                        ))}
                      </ul>
                    </Card>

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
