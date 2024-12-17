import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAI } from '@/hooks/use-ai'
import { Card } from '@/components/ui/card'
import { Loader2, Plus, Download, Eye } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Problem {
  question: string
  difficulty: 'easy' | 'medium' | 'hard'
  solution: string
  explanation: string
  hints: string[]
}

export default function PracticeProblemPage() {
  const [subject, setSubject] = useState('')
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [count, setCount] = useState('5')
  const [problems, setProblems] = useState<Problem[]>([])
  const [currentProblem, setCurrentProblem] = useState(0)
  const [showingSolution, setShowingSolution] = useState(false)
  const [showingHint, setShowingHint] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      const problemData = JSON.parse(response) as Problem[]
      setProblems(problemData)
    },
  })

  const handleGenerate = async () => {
    if (!subject || !topic || isLoading) return

    const prompt = `
      Generate ${count} ${difficulty} practice problems for ${subject} about ${topic}.
      
      Return the problems in this JSON format:
      [
        {
          "question": "detailed problem statement",
          "difficulty": "${difficulty}",
          "solution": "step-by-step solution",
          "explanation": "detailed explanation of the concept and solution",
          "hints": ["progressive hints to help solve the problem"]
        }
      ]
      
      Make the problems challenging but solvable.
      Include at least 3 progressive hints for each problem.
      Provide detailed step-by-step solutions.
      Ensure explanations cover the underlying concepts.
    `

    await generateResponse(prompt, 'You are an expert educator.')
  }

  const nextProblem = () => {
    setCurrentProblem((prev) => (prev + 1) % problems.length)
    setShowingSolution(false)
    setShowingHint(false)
    setCurrentHint(0)
  }

  const prevProblem = () => {
    setCurrentProblem((prev) => (prev - 1 + problems.length) % problems.length)
    setShowingSolution(false)
    setShowingHint(false)
    setCurrentHint(0)
  }

  const nextHint = () => {
    if (currentHint < problems[currentProblem].hints.length - 1) {
      setCurrentHint(prev => prev + 1)
    }
  }

  const exportProblems = () => {
    const data = {
      subject,
      topic,
      difficulty,
      problems,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${subject}-${topic}-practice.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Practice Problems"
        description="Generate custom practice problems with step-by-step solutions"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics, Physics"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Calculus, Mechanics"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select value={difficulty} onValueChange={(v) => setDifficulty(v as 'easy' | 'medium' | 'hard')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Number of Problems</Label>
              <Select value={count} onValueChange={setCount}>
                <SelectTrigger>
                  <SelectValue placeholder="Select count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Problems</SelectItem>
                  <SelectItem value="5">5 Problems</SelectItem>
                  <SelectItem value="10">10 Problems</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Generate Problems
            </Button>

            {problems.length > 0 && (
              <Button
                variant="outline"
                onClick={exportProblems}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>

          {problems.length > 0 && (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  Problem {currentProblem + 1} of {problems.length}
                </h3>
                <Badge variant="secondary">
                  {problems[currentProblem].difficulty}
                </Badge>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Question:</Label>
                  <Card className="p-4 bg-muted">
                    {problems[currentProblem].question}
                  </Card>
                </div>

                {showingHint && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Hint {currentHint + 1}:</Label>
                      {currentHint < problems[currentProblem].hints.length - 1 && (
                        <Button variant="ghost" size="sm" onClick={nextHint}>
                          Next Hint
                        </Button>
                      )}
                    </div>
                    <Card className="p-4 bg-muted">
                      {problems[currentProblem].hints[currentHint]}
                    </Card>
                  </div>
                )}

                {showingSolution && (
                  <Tabs defaultValue="solution">
                    <TabsList>
                      <TabsTrigger value="solution">Solution</TabsTrigger>
                      <TabsTrigger value="explanation">Explanation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="solution">
                      <Card className="p-4 bg-muted">
                        {problems[currentProblem].solution}
                      </Card>
                    </TabsContent>
                    <TabsContent value="explanation">
                      <Card className="p-4 bg-muted">
                        {problems[currentProblem].explanation}
                      </Card>
                    </TabsContent>
                  </Tabs>
                )}

                <div className="flex justify-between">
                  <div className="space-x-2">
                    <Button variant="outline" onClick={prevProblem}>
                      Previous
                    </Button>
                    <Button variant="outline" onClick={nextProblem}>
                      Next
                    </Button>
                  </div>
                  <div className="space-x-2">
                    {!showingHint && (
                      <Button
                        variant="outline"
                        onClick={() => setShowingHint(true)}
                      >
                        Show Hint
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => setShowingSolution(!showingSolution)}
                    >
                      {showingSolution ? 'Hide Solution' : 'Show Solution'}
                    </Button>
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
