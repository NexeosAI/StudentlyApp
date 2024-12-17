import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DiagramType, Diagram } from '@/lib/types/content-creation';
import { generateDiagram } from '@/lib/services/content-creation';

interface DiagramGeneratorProps {
  onDiagramGenerated?: (diagram: Diagram) => void;
}

export const DiagramGenerator: React.FC<DiagramGeneratorProps> = ({
  onDiagramGenerated
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<DiagramType>('flowchart');
  const [elements, setElements] = useState('');
  const [relationships, setRelationships] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDiagram, setCurrentDiagram] = useState<Diagram | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const elementsList = elements.split('\n').filter(e => e.trim());
      const relationshipsList = relationships.split('\n')
        .filter(r => r.trim())
        .map(r => {
          const [from, to, label] = r.split(',').map(s => s.trim());
          return { from, to, label };
        });

      const diagram = await generateDiagram(type, {
        title,
        description,
        elements: elementsList,
        relationships: relationshipsList
      });

      setCurrentDiagram(diagram);
      onDiagramGenerated?.(diagram);
    } catch (error) {
      console.error('Error generating diagram:', error);
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Diagram Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="title">Diagram Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter diagram title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what the diagram should represent"
              />
            </div>

            <div>
              <Label>Diagram Type</Label>
              <Select value={type} onValueChange={(value: DiagramType) => setType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flowchart">Flowchart</SelectItem>
                  <SelectItem value="mindmap">Mind Map</SelectItem>
                  <SelectItem value="sequence">Sequence Diagram</SelectItem>
                  <SelectItem value="class">Class Diagram</SelectItem>
                  <SelectItem value="entity-relationship">ER Diagram</SelectItem>
                  <SelectItem value="process">Process Flow</SelectItem>
                  <SelectItem value="network">Network Diagram</SelectItem>
                  <SelectItem value="hierarchy">Hierarchy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="elements">Elements (one per line)</Label>
              <Textarea
                id="elements"
                value={elements}
                onChange={(e) => setElements(e.target.value)}
                placeholder="Enter diagram elements (one per line)"
                rows={5}
              />
            </div>

            <div>
              <Label htmlFor="relationships">
                Relationships (format: from, to, label - one per line)
              </Label>
              <Textarea
                id="relationships"
                value={relationships}
                onChange={(e) => setRelationships(e.target.value)}
                placeholder="Start, End, Relationship Label"
                rows={5}
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!title || !elements || isGenerating}
              className="w-full"
            >
              {isGenerating ? 'Generating...' : 'Generate Diagram'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {currentDiagram && (
        <Card>
          <CardHeader>
            <CardTitle>{currentDiagram.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video border rounded-lg p-4">
              {/* TODO: Implement diagram rendering using a library like mermaid.js or react-flow */}
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Diagram Preview
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Elements</h3>
              <ul className="list-disc list-inside">
                {currentDiagram.elements.map((element) => (
                  <li key={element.id}>{element.content.text}</li>
                ))}
              </ul>

              <h3 className="font-semibold mt-4">Relationships</h3>
              <ul className="list-disc list-inside">
                {currentDiagram.relationships.map((rel) => (
                  <li key={rel.id}>
                    {rel.from} → {rel.to} {rel.label && `(${rel.label})`}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
