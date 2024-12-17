import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAI } from '@/hooks/use-ai'
import { Card } from '@/components/ui/card'
import { Loader2, Plus, Download, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizResults {
  score: number
  incorrectQuestions: number[]
}

export default function QuizCreatorPage() {
  const [topic, setTopic] = useState('')
  const [content, setContent] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [isQuizMode, setIsQuizMode] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [results, setResults] = useState<QuizResults | null>(null)

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      const quizData = JSON.parse(response) as Question[]
      setQuestions(quizData)
    },
  })

  const handleGenerate = async () => {
    if (!content.trim() || isLoading) return

    const prompt = `
      Create a quiz about ${topic}. Use this content:
      "${content}"
      
      Generate questions in this JSON format:
      [
        {
          "question": "question text",
          "options": ["option 1", "option 2", "option 3", "option 4"],
          "correctAnswer": 0,
          "explanation": "explanation of the correct answer"
        }
      ]
      Generate at least 10 questions. Make them challenging but fair.
      Ensure the options array has exactly 4 items.
      The correctAnswer should be the index (0-3) of the correct option.
    `

    await generateResponse(prompt, 'You are an expert quiz creator.')
  }

  const handleAnswer = (value: string) => {
    const answer = parseInt(value)
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answer
    setSelectedAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    const incorrect = selectedAnswers.reduce((acc, answer, index) => {
      if (answer !== questions[index].correctAnswer) {
        acc.push(index)
      }
      return acc
    }, [] as number[])

    setResults({
      score: ((questions.length - incorrect.length) / questions.length) * 100,
      incorrectQuestions: incorrect,
    })
  }

  const exportQuiz = () => {
    const quiz = questions.map(q => ({
      ...q,
      yourAnswer: selectedAnswers[questions.indexOf(q)],
    }))
    const blob = new Blob([JSON.stringify(quiz, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${topic.replace(/\s+/g, '-')}-quiz.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetQuiz = () => {
    setSelectedAnswers([])
    setCurrentQuestion(0)
    setResults(null)
    setIsQuizMode(false)
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Quiz Creator"
        description="Generate AI-powered quizzes from your study material"
      >
        {!isQuizMode ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter the quiz topic"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Study Material</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your study material or notes here..."
                className="min-h-[200px]"
              />
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
                Generate Quiz
              </Button>

              {questions.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsQuizMode(true)}
                  >
                    Take Quiz
                  </Button>
                  <Button
                    variant="outline"
                    onClick={exportQuiz}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {questions.length > 0 && (
              <div className="space-y-4 mt-6">
                {questions.map((q, index) => (
                  <Card key={index} className="p-4">
                    <p className="font-medium mb-2">Question {index + 1}:</p>
                    <p className="text-muted-foreground mb-4">{q.question}</p>
                    <div className="space-y-2 pl-4">
                      {q.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          {optIndex === q.correctAnswer && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {!results ? (
              <>
                <Progress
                  value={(currentQuestion / questions.length) * 100}
                  className="w-full"
                />
                <Card className="p-6">
                  <p className="text-lg mb-4">
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                  <p className="text-lg font-medium mb-6">
                    {questions[currentQuestion].question}
                  </p>
                  <RadioGroup
                    value={selectedAnswers[currentQuestion]?.toString()}
                    onValueChange={handleAnswer}
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`q${currentQuestion}-${index}`} />
                        <Label htmlFor={`q${currentQuestion}-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button
                    className="mt-6"
                    onClick={nextQuestion}
                    disabled={selectedAnswers[currentQuestion] === undefined}
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Card>
              </>
            ) : (
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4">Quiz Results</h3>
                <p className="text-lg mb-4">
                  Your score: {results.score.toFixed(1)}%
                </p>
                <div className="space-y-4">
                  {results.incorrectQuestions.map((qIndex) => (
                    <div key={qIndex} className="p-4 bg-muted rounded-lg">
                      <p className="font-medium">Question {qIndex + 1}:</p>
                      <p className="mt-2">{questions[qIndex].question}</p>
                      <p className="mt-2 text-red-500">
                        Your answer: {questions[qIndex].options[selectedAnswers[qIndex]]}
                      </p>
                      <p className="mt-2 text-green-500">
                        Correct answer: {questions[qIndex].options[questions[qIndex].correctAnswer]}
                      </p>
                      <p className="mt-2 text-muted-foreground">
                        {questions[qIndex].explanation}
                      </p>
                    </div>
                  ))}
                </div>
                <Button className="mt-6" onClick={resetQuiz}>
                  Start Over
                </Button>
              </Card>
            )}
          </div>
        )}
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
