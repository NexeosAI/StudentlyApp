import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import type { WritingStyle, WritingTone } from '@/lib/types/user-preferences'

export function WritingStyleForm({ onSubmit }: { onSubmit: (style: WritingStyle) => void }) {
  const [tone, setTone] = useState<WritingTone>('professional')
  const [academicLevel, setAcademicLevel] = useState('undergraduate')
  const [citationStyle, setCitationStyle] = useState('APA')
  const [useAmericanEnglish, setUseAmericanEnglish] = useState(true)
  const [simplifyLanguage, setSimplifyLanguage] = useState(false)
  const [technicalTerminology, setTechnicalTerminology] = useState(false)

  const handleSubmit = () => {
    const style: WritingStyle = {
      tone,
      academicLevel: academicLevel as WritingStyle['academicLevel'],
      preferredCitationStyle: citationStyle as WritingStyle['preferredCitationStyle'],
      languagePreferences: {
        useAmericanEnglish,
        simplifyLanguage,
        technicalTerminology,
      },
      customPreferences: {
        wordCount: {
          preferredMinimum: 500,
          preferredMaximum: 2000,
        },
        avoidWords: [],
        preferredWords: [],
      },
    }
    onSubmit(style)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your Writing Style</CardTitle>
        <CardDescription>
          Help us understand your preferred writing style and tone. You can always update these later.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Preferred Writing Tone</Label>
          <div className="grid grid-cols-2 gap-4">
            {(['formal', 'casual', 'academic', 'professional', 'friendly', 'technical'] as const).map((t) => (
              <div key={t} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={t}
                  name="tone"
                  value={t}
                  checked={tone === t}
                  onChange={(e) => setTone(e.target.value as WritingTone)}
                  className="h-4 w-4"
                />
                <Label htmlFor={t} className="capitalize">
                  {t}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Academic Level</Label>
          <Select value={academicLevel} onValueChange={setAcademicLevel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high_school">High School</SelectItem>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Preferred Citation Style</Label>
          <Select value={citationStyle} onValueChange={setCitationStyle}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="APA">APA</SelectItem>
              <SelectItem value="MLA">MLA</SelectItem>
              <SelectItem value="Chicago">Chicago</SelectItem>
              <SelectItem value="Harvard">Harvard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Language Preferences</Label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="american-english">Use American English</Label>
              <Switch
                id="american-english"
                checked={useAmericanEnglish}
                onCheckedChange={setUseAmericanEnglish}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="simplify">Simplify Language</Label>
              <Switch
                id="simplify"
                checked={simplifyLanguage}
                onCheckedChange={setSimplifyLanguage}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="technical">Use Technical Terminology</Label>
              <Switch
                id="technical"
                checked={technicalTerminology}
                onCheckedChange={setTechnicalTerminology}
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  )
}
