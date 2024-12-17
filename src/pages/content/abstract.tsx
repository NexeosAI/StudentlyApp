import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { useAI } from '@/hooks/use-ai'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, FileText, Copy } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AbstractStructure {
  purpose: string
  methodology: string
  results: string
  conclusions: string
  keywords: string[]
}

interface AbstractDraft {
  content: string
  wordCount: number
  feedback: {
    clarity: string
    completeness: string
    suggestions: string[]
  }
}

export default function AbstractGeneratorPage() {
  const [paperContent, setPaperContent] = useState('')
  const [abstractType, setAbstractType] = useState('research')
  const [wordLimit, setWordLimit] = useState('250')
  const [structure, setStructure] = useState<AbstractStructure | null>(null)
  const [draft, setDraft] = useState<AbstractDraft | null>(null)

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      try {
        if (!structure) {
          const structureData = JSON.parse(response) as AbstractStructure
          setStructure(structureData)
        } else {
          const draftData = JSON.parse(response) as AbstractDraft
          setDraft(draftData)
        }
      } catch (error) {
        console.error('Failed to parse AI response:', error)
      }
    },
  })

  const handleGenerateStructure = async () => {
    if (!paperContent || isLoading) return

    const prompt = `
      Create an abstract structure for:
      Content: ${paperContent}
      Type: ${abstractType}
      Word Limit: ${wordLimit}

      Generate a structure in this JSON format:
      {
        "purpose": "research purpose and objectives",
        "methodology": "methods used",
        "results": "key findings",
        "conclusions": "main conclusions",
        "keywords": ["relevant", "keywords"]
      }

      Ensure the structure:
      1. Captures the main points of the research
      2. Is concise and clear
      3. Follows academic writing standards
      4. Includes relevant keywords
    `

    await generateResponse(prompt, 'You are an expert academic writer specializing in creating clear and concise research abstracts.')
  }

  const handleGenerateDraft = async () => {
    if (!structure || isLoading) return

    const prompt = `
      Generate a complete abstract based on this structure:
      ${JSON.stringify(structure, null, 2)}

      Type: ${abstractType}
      Word Limit: ${wordLimit}

      Return the abstract in this JSON format:
      {
        "content": "complete abstract text",
        "wordCount": number of words,
        "feedback": {
          "clarity": "feedback on clarity",
          "completeness": "feedback on completeness",
          "suggestions": ["improvement suggestions"]
        }
      }

      Ensure the abstract:
      1. Stays within the word limit
      2. Is clear and concise
      3. Follows academic writing standards
      4. Includes all key components
    `

    await generateResponse(prompt, 'You are an expert academic writer with extensive experience in writing research abstracts.')
  }

  const handleCopyToClipboard = () => {
    if (draft) {
      navigator.clipboard.writeText(draft.content)
    }
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Abstract Generator"
        description="Generate academic abstracts for your research papers"
      >
        <div className="space-y-6">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="paperContent">Paper Content</Label>
                <Textarea
                  id="paperContent"
                  value={paperContent}
                  onChange={(e) => setPaperContent(e.target.value)}
                  placeholder="Enter your paper content or main points..."
                  className="min-h-[200px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Abstract Type</Label>
                  <Select value={abstractType} onValueChange={setAbstractType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research">Research Paper</SelectItem>
                      <SelectItem value="thesis">Thesis</SelectItem>
                      <SelectItem value="conference">Conference Paper</SelectItem>
                      <SelectItem value="journal">Journal Article</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Word Limit</Label>
                  <Select value={wordLimit} onValueChange={setWordLimit}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select word limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="150">150 words</SelectItem>
                      <SelectItem value="250">250 words</SelectItem>
                      <SelectItem value="300">300 words</SelectItem>
                      <SelectItem value="500">500 words</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleGenerateStructure}
                disabled={isLoading || !paperContent}
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
            <Card className="p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Research Purpose</h4>
                  <p className="mt-1">{structure.purpose}</p>
                </div>

                <div>
                  <h4 className="font-medium">Methodology</h4>
                  <p className="mt-1">{structure.methodology}</p>
                </div>

                <div>
                  <h4 className="font-medium">Results</h4>
                  <p className="mt-1">{structure.results}</p>
                </div>

                <div>
                  <h4 className="font-medium">Conclusions</h4>
                  <p className="mt-1">{structure.conclusions}</p>
                </div>

                <div>
                  <h4 className="font-medium">Keywords</h4>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {structure.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary rounded-md text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
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
                  Generate Abstract
                </Button>
              </div>
            </Card>
          )}

          {draft && (
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Generated Abstract</h4>
                    <p className="text-sm text-muted-foreground">
                      Word count: {draft.wordCount}
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleCopyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="p-4 bg-muted rounded-md">
                  <p className="whitespace-pre-wrap">{draft.content}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Feedback</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium">Clarity</h5>
                      <p className="text-sm mt-1">{draft.feedback.clarity}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Completeness</h5>
                      <p className="text-sm mt-1">{draft.feedback.completeness}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Suggestions</h5>
                      <ul className="mt-1 list-disc pl-5 space-y-1">
                        {draft.feedback.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm">
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
