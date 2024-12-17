import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Check } from 'lucide-react'
import { useAIModels, type AIModel, type AIToolType } from '@/lib/store/ai-models-store'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

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
        console.log('Fetching models...'); // Debug log
        
        const response = await fetch('https://openrouter.ai/api/v1/models', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://studentlyai.com',
            'X-Title': 'StudentlyAI'
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`Failed to fetch models: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        
        if (data?.data && Array.isArray(data.data)) {
          const formattedModels = data.data.map((model: any) => ({
            id: model.id,
            name: model.name || model.id,
            description: model.description || '',
            context_length: model.context_length || 0,
            pricing: {
              prompt: model.pricing?.prompt || '0',
              completion: model.pricing?.completion || '0'
            }
          }));
          
          console.log('Formatted models:', formattedModels); // Debug log
          setModels(formattedModels);
        } else {
          console.error('Invalid API response format:', data);
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching models:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to fetch models');
        setModels([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchModels();
    }
  }, [open]);

  const handleModelSelect = (model: OpenRouterModel) => {
    console.log('handleModelSelect called with:', model); // Debug log
    if (!model?.id) {
      console.error('Invalid model object:', model);
      return;
    }
    
    setSelectedModel(model);
    setSearchQuery(model.name || model.id);
    
    // Update capabilities and recommended uses
    const defaultCapabilities = ['Text Generation', 'Completion'];
    setCapabilities(defaultCapabilities.join(', '));
    
    const defaultUses = ['Essays', 'Research', 'Notes'];
    setRecommendedUses(defaultUses.join(', '));
    
    console.log('Model selected:', { model, capabilities, recommendedUses }); // Debug log
  };

  const filteredModels = searchQuery === '' 
    ? models 
    : models.filter(model =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
  console.log('Filtered models:', filteredModels.length); // Debug log

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
                placeholder="Type to search models..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="border-none focus:ring-0"
              />
              <CommandList>
                <CommandEmpty>No models found</CommandEmpty>
                <CommandGroup>
                  {loading ? (
                    <div className="p-6 text-center">
                      <Skeleton className="h-4 w-[200px] mx-auto" />
                    </div>
                  ) : filteredModels.map((model) => (
                    <CommandItem
                      key={model.id}
                      onSelect={() => {
                        console.log('Model selected:', model); // Debug log
                        handleModelSelect(model);
                      }}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {selectedModel?.id === model.id && <Check className="h-4 w-4" />}
                        <div className="flex flex-col">
                          <span>{model.name || model.id}</span>
                          <span className="text-xs text-muted-foreground">
                            {model.context_length.toLocaleString()} tokens, ${parseFloat(model.pricing.completion).toFixed(6)}/token
                          </span>
                        </div>
                      </div>
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
