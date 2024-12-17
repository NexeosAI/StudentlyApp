import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAI } from '@/hooks/use-ai'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
]

interface Translation {
  translatedText: string
  alternativeTranslations: string[]
  notes: string[]
}

export default function TranslationHelperPage() {
  const [text, setText] = useState('')
  const [fromLang, setFromLang] = useState('en')
  const [toLang, setToLang] = useState('es')
  const [translation, setTranslation] = useState<Translation | null>(null)
  
  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      const translationData = JSON.parse(response) as Translation
      setTranslation(translationData)
    },
  })

  const handleTranslate = async () => {
    if (!text.trim() || isLoading) return

    const prompt = `
      Translate the following text from ${fromLang} to ${toLang}:
      Text: "${text}"
      
      Provide the translation in JSON format:
      {
        "translatedText": "main translation",
        "alternativeTranslations": ["list of alternative translations"],
        "notes": ["any relevant translation notes or cultural context"]
      }
    `

    await generateResponse(prompt, 'You are an expert translator.')
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Translation Helper"
        description="Translate text between languages with context and alternatives"
      >
        <div className="space-y-4">
          <div className="flex gap-4">
            <Select value={fromLang} onValueChange={setFromLang}>
              <SelectTrigger>
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={toLang} onValueChange={setToLang}>
              <SelectTrigger>
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to translate..."
            className="min-h-[150px]"
          />
          
          <Button
            onClick={handleTranslate}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Translate
          </Button>

          {translation && (
            <div className="space-y-4 mt-6">
              <Card className="p-4">
                <h3 className="font-medium mb-2">Translation</h3>
                <p>{translation.translatedText}</p>
              </Card>

              {translation.alternativeTranslations.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Alternative Translations</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    {translation.alternativeTranslations.map((alt, index) => (
                      <li key={index}>{alt}</li>
                    ))}
                  </ul>
                </Card>
              )}

              {translation.notes.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Translation Notes</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    {translation.notes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          )}
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
