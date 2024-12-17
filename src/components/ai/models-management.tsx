import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ModelSelectorDialog } from './model-selector-dialog'
import { useAIModels, type AIToolType } from '@/lib/store/ai-models-store'
import { Badge } from '@/components/ui/badge'
import { Trash2 } from 'lucide-react'

export function ModelsManagement() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { models, removeModel, toolAssignments, unassignModelFromTool } = useAIModels()

  const handleRemoveModel = (modelId: string) => {
    // Unassign from all tools first
    Object.keys(toolAssignments).forEach((tool) => {
      unassignModelFromTool(modelId, tool as AIToolType)
    })
    // Then remove the model
    removeModel(modelId)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI Models</CardTitle>
              <CardDescription>
                Configure and manage AI models for your application
              </CardDescription>
            </div>
            <Button onClick={() => setDialogOpen(true)}>Add Model</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {models.map((model) => (
              <Card key={model.id}>
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      <CardDescription>{model.provider}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleRemoveModel(model.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid gap-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Capabilities</h4>
                      <div className="flex flex-wrap gap-2">
                        {model.capabilities.map((capability) => (
                          <Badge key={capability} variant="secondary">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Assigned Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(toolAssignments).map(([tool, modelIds]) => (
                          modelIds.includes(model.id) && (
                            <Badge key={tool}>
                              {tool.charAt(0).toUpperCase() + tool.slice(1)}
                            </Badge>
                          )
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium">Max Tokens</h4>
                        <p className="text-sm text-muted-foreground">
                          {model.maxTokens.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Cost per Token</h4>
                        <p className="text-sm text-muted-foreground">
                          ${model.costPerToken.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {models.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No models configured. Click "Add Model" to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ModelSelectorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
