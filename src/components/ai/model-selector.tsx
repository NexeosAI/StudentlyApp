import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'

interface Model {
  id: string
  name: string
  description: string
  pricing: {
    prompt: string
    completion: string
  }
  context_length: number
  architecture?: string
}

interface ModelSelectorProps {
  onModelSelect: (model: Model) => void
  className?: string
}

export function ModelSelector({ onModelSelect, className }: ModelSelectorProps) {
  const [open, setOpen] = useState(false)
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/models', {
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch models')
        }
        
        const data = await response.json()
        setModels(data.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch models')
      } finally {
        setLoading(false)
      }
    }

    fetchModels()
  }, [])

  const handleSelect = (model: Model) => {
    setSelectedModel(model)
    onModelSelect(model)
    setOpen(false)
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading models: {error}
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
          disabled={loading}
        >
          {loading ? (
            <Skeleton className="h-4 w-[150px]" />
          ) : (
            selectedModel?.name || "Select a model..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search models..." />
          <CommandEmpty>No models found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {models.map((model) => (
              <CommandItem
                key={model.id}
                value={model.name}
                onSelect={() => handleSelect(model)}
                className="flex flex-col items-start py-2"
              >
                <div className="flex items-center w-full">
                  <span>{model.name}</span>
                  {selectedModel?.id === model.id && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {model.description}
                </span>
                <div className="text-xs text-muted-foreground mt-1">
                  <span>Context: {model.context_length.toLocaleString()} tokens</span>
                  <span className="mx-2">•</span>
                  <span>
                    Price: ${model.pricing.prompt}/1K prompt, ${model.pricing.completion}/1K completion
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
