import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Presentation, Slide } from '@/lib/types/content-creation';
import { generatePresentation } from '@/lib/services/content-creation';

interface PresentationBuilderProps {
  onPresentationGenerated?: (presentation: Presentation) => void;
}

export const PresentationBuilder: React.FC<PresentationBuilderProps> = ({
  onPresentationGenerated
}) => {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState<'professional' | 'academic' | 'creative' | 'minimal'>('professional');
  const [duration, setDuration] = useState(15);
  const [complexity, setComplexity] = useState<'basic' | 'intermediate' | 'advanced'>('intermediate');
  const [includeNotes, setIncludeNotes] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPresentation, setCurrentPresentation] = useState<Presentation | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const presentation = await generatePresentation(topic, {
        style,
        duration,
        complexity,
        includeNotes
      });
      setCurrentPresentation(presentation);
      onPresentationGenerated?.(presentation);
    } catch (error) {
      console.error('Error generating presentation:', error);
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Presentation Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="topic">Presentation Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your presentation topic"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Presentation Style</Label>
                <Select value={style} onValueChange={(value: any) => setStyle(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Complexity Level</Label>
                <Select value={complexity} onValueChange={(value: any) => setComplexity(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Duration (minutes): {duration}</Label>
              <Slider
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
                min={5}
                max={60}
                step={5}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={includeNotes}
                onCheckedChange={setIncludeNotes}
              />
              <Label>Include Speaker Notes</Label>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!topic || isGenerating}
              className="w-full"
            >
              {isGenerating ? 'Generating...' : 'Generate Presentation'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {currentPresentation && (
        <Card>
          <CardHeader>
            <CardTitle>{currentPresentation.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="slides">
              <TabsList>
                <TabsTrigger value="slides">Slides</TabsTrigger>
                <TabsTrigger value="outline">Outline</TabsTrigger>
                {includeNotes && <TabsTrigger value="notes">Speaker Notes</TabsTrigger>}
              </TabsList>

              <TabsContent value="slides">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentPresentation.slides.map((slide, index) => (
                    <SlidePreview key={slide.id} slide={slide} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="outline">
                <div className="space-y-4">
                  {currentPresentation.slides.map((slide, index) => (
                    <div key={slide.id} className="p-4 border rounded">
                      <h3 className="font-semibold">Slide {index + 1}</h3>
                      {slide.content.title && <p>{slide.content.title}</p>}
                      {slide.content.points && (
                        <ul className="list-disc list-inside">
                          {slide.content.points.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              {includeNotes && (
                <TabsContent value="notes">
                  <div className="space-y-4">
                    {currentPresentation.slides.map((slide, index) => (
                      <div key={slide.id} className="p-4 border rounded">
                        <h3 className="font-semibold">Slide {index + 1} Notes</h3>
                        <p className="text-muted-foreground">{slide.notes}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const SlidePreview: React.FC<{ slide: Slide; index: number }> = ({ slide, index }) => {
  return (
    <div className="aspect-video border rounded-lg p-4 bg-card">
      <div className="h-full flex flex-col">
        <div className="text-sm text-muted-foreground mb-2">Slide {index + 1}</div>
        {slide.content.title && (
          <h3 className="font-semibold mb-2">{slide.content.title}</h3>
        )}
        {slide.content.points && (
          <ul className="text-sm list-disc list-inside">
            {slide.content.points.slice(0, 3).map((point, i) => (
              <li key={i} className="truncate">{point}</li>
            ))}
            {slide.content.points.length > 3 && (
              <li className="text-muted-foreground">...</li>
            )}
          </ul>
        )}
        {slide.content.imageUrl && (
          <div className="mt-auto">
            <div className="text-xs text-muted-foreground">[Image Placeholder]</div>
          </div>
        )}
      </div>
    </div>
  );
};
