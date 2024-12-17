import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { WritingStyleForm } from '../onboarding/writing-style-form'
import type { WritingStyle } from '@/lib/types/user-preferences'

type WritingStyleCardProps = {
  currentStyle: WritingStyle
  onUpdate: (style: WritingStyle) => void
}

export function WritingStyleCard({ currentStyle, onUpdate }: WritingStyleCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Writing Style & Tone</CardTitle>
        <CardDescription>Customize how your content is written</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium">Current Tone</span>
              <p className="text-sm text-muted-foreground capitalize">{currentStyle.tone}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Academic Level</span>
              <p className="text-sm text-muted-foreground capitalize">
                {currentStyle.academicLevel.replace('_', ' ')}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium">Citation Style</span>
              <p className="text-sm text-muted-foreground">{currentStyle.preferredCitationStyle}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Language</span>
              <p className="text-sm text-muted-foreground">
                {currentStyle.languagePreferences.useAmericanEnglish ? 'American' : 'British'} English
              </p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Update Preferences
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <WritingStyleForm onSubmit={onUpdate} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
