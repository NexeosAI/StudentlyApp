import { useState } from 'react'
import { useAIProviderStore } from '@/lib/store/ai-provider-store'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react'
import type { AIModel, ToolMapping } from '@/lib/types/ai-provider'

const AVAILABLE_TOOLS = [
  { id: 'tool1', name: 'Text Generation' },
  { id: 'tool2', name: 'Code Completion' },
  { id: 'tool3', name: 'Image Generation' },
  { id: 'tool4', name: 'Audio Processing' },
]

export default function ModelsPage() {
  const {
    models,
    providers,
    toolMappings,
    addModel,
    updateModel,
    removeModel,
    addToolMapping,
    updateToolMapping,
    removeToolMapping,
  } = useAIProviderStore()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingModel, setEditingModel] = useState<AIModel | null>(null)
  const [draggedTool, setDraggedTool] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    providerId: '',
    name: '',
    capabilities: [] as string[],
    maxTokens: 0,
    costPerToken: 0,
    recommendedUses: [] as string[],
    status: 'active' as const,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingModel) {
      updateModel(editingModel.id, formData)
    } else {
      addModel(formData)
    }
    handleCloseDialog()
  }

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false)
    setEditingModel(null)
    setFormData({
      providerId: '',
      name: '',
      capabilities: [],
      maxTokens: 0,
      costPerToken: 0,
      recommendedUses: [],
      status: 'active',
    })
  }

  const handleDragStart = (toolId: string) => {
    setDraggedTool(toolId)
  }

  const handleDragOver = (e: React.DragEvent, modelId: string) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, modelId: string) => {
    e.preventDefault()
    if (!draggedTool) return

    const existingMapping = toolMappings.find(
      (m) => m.toolId === draggedTool && m.modelId === modelId
    )

    if (!existingMapping) {
      const tool = AVAILABLE_TOOLS.find((t) => t.id === draggedTool)
      if (tool) {
        addToolMapping({
          toolId: tool.id,
          toolName: tool.name,
          modelId,
          priority: 1,
          status: 'active',
        })
      }
    }

    setDraggedTool(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Models</h1>
          <p className="text-muted-foreground">
            Manage AI models and their tool mappings
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Model
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 space-y-4">
          <div className="p-6">
            <h2 className="text-lg font-bold tracking-tight">Available Tools</h2>
            <p className="text-muted-foreground">
              Drag tools to models to create mappings
            </p>
            <div className="space-y-2">
              {AVAILABLE_TOOLS.map((tool) => (
                <div
                  key={tool.id}
                  draggable
                  onDragStart={() => handleDragStart(tool.id)}
                  className="flex items-center p-2 bg-secondary rounded-md cursor-move"
                >
                  <GripVertical className="h-4 w-4 mr-2" />
                  {tool.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2">
          {models.map((model) => {
            const provider = providers.find((p) => p.id === model.providerId)
            const modelMappings = toolMappings.filter(
              (m) => m.modelId === model.id
            )

            return (
              <div
                key={model.id}
                onDragOver={(e) => handleDragOver(e, model.id)}
                onDrop={(e) => handleDrop(e, model.id)}
                className="p-6"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">{model.name}</h2>
                    <p className="text-muted-foreground">{provider?.name}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingModel(model)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeModel(model.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Max Tokens:</span>{' '}
                    {model.maxTokens.toLocaleString()}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Cost per Token:</span> $
                    {model.costPerToken.toFixed(6)}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">
                      Mapped Tools ({modelMappings.length})
                    </h3>
                    <div className="space-y-2">
                      {modelMappings.map((mapping) => (
                        <div
                          key={mapping.id}
                          className="flex items-center justify-between p-2 bg-secondary rounded-md"
                        >
                          <span>{mapping.toolName}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeToolMapping(mapping.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Model
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingModel ? 'Edit Model' : 'Add New Model'}
            </DialogTitle>
            <DialogDescription>
              Configure the AI model's details and capabilities
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="providerId">Provider</Label>
                <select
                  id="providerId"
                  value={formData.providerId}
                  onChange={(e) =>
                    setFormData({ ...formData, providerId: e.target.value })
                  }
                  className="w-full rounded-md border p-2"
                  required
                >
                  <option value="">Select Provider</option>
                  {providers.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Model Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxTokens">Max Tokens</Label>
                <Input
                  id="maxTokens"
                  type="number"
                  value={formData.maxTokens}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxTokens: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="costPerToken">Cost per Token (USD)</Label>
                <Input
                  id="costPerToken"
                  type="number"
                  step="0.000001"
                  value={formData.costPerToken}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      costPerToken: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.status === 'active'}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      status: checked ? 'active' : 'inactive',
                    })
                  }
                />
                <Label htmlFor="status">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingModel ? 'Update' : 'Add'} Model
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
