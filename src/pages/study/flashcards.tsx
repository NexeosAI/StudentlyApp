import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAI } from '@/hooks/use-ai'
import { Card } from '@/components/ui/card'
import { Loader2, ChevronLeft, ChevronRight, Plus, Download } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Flashcard {
  front: string
  back: string
}

export default function FlashcardGeneratorPage() {
  const [topic, setTopic] = useState('')
  const [content, setContent] = useState('')
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isStudyMode, setIsStudyMode] = useState(false)

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      const cards = JSON.parse(response) as Flashcard[]
      setFlashcards(cards)
    },
  })

  const handleGenerate = async () => {
    if (!content.trim() || isLoading) return

    const prompt = `
      Create flashcards for studying ${topic}. Use this content:
      "${content}"
      
      Generate flashcards in this JSON format:
      [
        {
          "front": "question or concept",
          "back": "answer or explanation"
        }
      ]
      Make the cards concise but comprehensive. Generate at least 10 cards.
    `

    await generateResponse(prompt, 'You are an expert educator.')
  }

  const nextCard = () => {
    setIsFlipped(false)
    setCurrentCard((prev) => (prev + 1) % flashcards.length)
  }

  const prevCard = () => {
    setIsFlipped(false)
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
  }

  const exportFlashcards = () => {
    const csv = flashcards
      .map(({ front, back }) => `"${front}","${back}"`)
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${topic.replace(/\s+/g, '-')}-flashcards.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Flashcard Generator"
        description="Create AI-powered flashcards from your study material"
      >
        {!isStudyMode ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter the topic (e.g., Biology Chapter 5)"
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
                Generate Flashcards
              </Button>

              {flashcards.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsStudyMode(true)}
                  >
                    Study Cards
                  </Button>
                  <Button
                    variant="outline"
                    onClick={exportFlashcards}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {flashcards.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-6">
                {flashcards.map((card, index) => (
                  <Card key={index} className="p-4 space-y-2">
                    <p className="font-medium">Front:</p>
                    <p className="text-muted-foreground">{card.front}</p>
                    <p className="font-medium mt-2">Back:</p>
                    <p className="text-muted-foreground">{card.back}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <p className="text-center text-muted-foreground">
                Card {currentCard + 1} of {flashcards.length}
              </p>
            </div>

            <Card
              className="w-full max-w-2xl h-64 p-6 cursor-pointer relative"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <p className="text-lg text-center">
                  {isFlipped ? flashcards[currentCard].back : flashcards[currentCard].front}
                </p>
              </div>
            </Card>

            <div className="flex gap-4 mt-6">
              <Button variant="outline" onClick={prevCard}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => setIsStudyMode(false)}>
                Exit Study Mode
              </Button>
              <Button variant="outline" onClick={nextCard}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
