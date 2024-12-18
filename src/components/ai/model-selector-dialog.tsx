import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Check } from 'lucide-react'
import { useAIModels, type AIModel, type AIToolType } from '@/lib/store/ai-models-store'
import { toast } from 'sonner'


interface OpenRouterModel {
  id: string
  name: string
  description: string
  context_length: number
  pricing: {
    prompt: string
    completion: string
  }
}

interface ModelSelectorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ModelSelectorDialog({ open, onOpenChange }: ModelSelectorDialogProps) {
  const [models, setModels] = useState<OpenRouterModel[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState<OpenRouterModel | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [capabilities, setCapabilities] = useState('')
  const [recommendedUses, setRecommendedUses] = useState('')
  const [toolAssignments, setToolAssignments] = useState<AIToolType[]>([])
  const addModel = useAIModels((state) => state.addModel)
  const assignModelToTool = useAIModels((state) => state.assignModelToTool)

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        console.log('API Key prefix:', import.meta.env.VITE_OPENROUTER_API_KEY?.substring(0, 8));
        
        const response = await fetch('https://openrouter.ai/api/v1/models', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'StudentlyAI',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        
        if (!data?.data) {
          throw new Error('Invalid API response format');
        }

        setModels(data.data);
        console.log('Models loaded:', data.data.length);
      } catch (err) {
        console.error('Fetch error:', err);
        toast.error(err instanceof Error ? err.message : 'Failed to fetch models');
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchModels();
    }
  }, [open]);

  const handleModelSelect = (model: OpenRouterModel) => {
    console.log('Model selected:', model);
    setSelectedModel(model);
    setSearchQuery(model.name);
    
    const defaultCapabilities = ['Text Generation', 'Completion'];
    setCapabilities(defaultCapabilities.join(', '));
    
    const defaultUses = ['Essays', 'Research', 'Notes'];
    setRecommendedUses(defaultUses.join(', '));
  };

  const filteredModels = searchQuery === '' 
    ? models 
    : models.filter(model =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.id.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSubmit = () => {
    if (!selectedModel) return

    const newModel: AIModel = {
      id: selectedModel.id,
      name: selectedModel.name || selectedModel.id,
      provider: 'OpenRouter',
      capabilities: capabilities.split(',').map(s => s.trim()),
      maxTokens: selectedModel.context_length,
      costPerToken: parseFloat(selectedModel.pricing.completion),
      recommendedUses: recommendedUses.split(',').map(s => s.trim())
    }

    addModel(newModel)
    
    // Assign the model to selected tools
    toolAssignments.forEach(tool => {
      assignModelToTool(newModel.id, tool)
    })

    toast.success('Model added successfully')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add AI Model</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Provider</Label>
            <Input value="OpenRouter" disabled />
          </div>

          <div className="grid gap-2">
            <Label>Model</Label>
            <Command shouldFilter={false} className="rounded-lg border shadow-md">
              <CommandInput
                placeholder={loading ? "Loading models..." : "Type to search models..."}
                value={searchQuery}
                onValueChange={setSearchQuery}
                disabled={loading}
                className="border-none focus:ring-0"
              />
              <CommandList>
                <CommandEmpty>
                  {loading ? (
                    <div className="p-4 text-center">
                      <div className="animate-spin h-4 w-4 border-2 border-primary mx-auto" />
                    </div>
                  ) : (
                    "No models found"
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {filteredModels.map((model) => (
                    <CommandItem
                      key={model.id}
                      onSelect={() => handleModelSelect(model)}
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-accent"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{model.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {model.context_length.toLocaleString()} tokens, ${parseFloat(model.pricing.completion).toFixed(6)}/token
                        </div>
                      </div>
                      {selectedModel?.id === model.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          {selectedModel && (
            <div className="text-sm text-muted-foreground">
              <p>{selectedModel.description}</p>
            </div>
          )}

          <div className="grid gap-2">
            <Label>Capabilities</Label>
            <Input
              value={capabilities}
              onChange={(e) => setCapabilities(e.target.value)}
              placeholder="Enter capabilities, separated by commas"
            />
          </div>

          <div className="grid gap-2">
            <Label>Recommended Uses</Label>
            <Input
              value={recommendedUses}
              onChange={(e) => setRecommendedUses(e.target.value)}
              placeholder="Enter recommended uses, separated by commas"
            />
          </div>

          <div className="grid gap-2">
            <Label>Assign to Tools</Label>
            <div className="flex flex-wrap gap-2">
              {(['essay', 'research', 'notes', 'report', 'summary'] as AIToolType[]).map((tool) => (
                <Button
                  key={tool}
                  variant={toolAssignments.includes(tool) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setToolAssignments(prev =>
                      prev.includes(tool)
                        ? prev.filter(t => t !== tool)
                        : [...prev, tool]
                    )
                  }}
                >
                  {tool.charAt(0).toUpperCase() + tool.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedModel || loading}>
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
            ) : (
              "Add Model"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
