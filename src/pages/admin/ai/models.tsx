import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useAIModels, type AIToolType } from '@/lib/store/ai-models-store'
import { PlusCircle } from 'lucide-react'

export default function AIModelsPage() {
  const models = useAIModels((state) => state.models)
  const removeModel = useAIModels((state) => state.removeModel)
  const toolAssignments = useAIModels((state) => state.toolAssignments)

  const getToolsForModel = (modelId: string): AIToolType[] => {
    return Object.entries(toolAssignments)
      .filter(([_, modelIds]) => modelIds.includes(modelId))
      .map(([tool]) => tool as AIToolType)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">AI Models</h1>
          <p className="text-muted-foreground">Configure and manage AI models</p>
        </div>
        <Link to="/admin/ai/models/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Model
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Models</CardTitle>
            <CardDescription>List of configured AI models and their settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Cost/1K tokens</TableHead>
                  <TableHead>Max Tokens</TableHead>
                  <TableHead>Capabilities</TableHead>
                  <TableHead>Assigned Tools</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((model) => {
                  const assignedTools = getToolsForModel(model.id)
                  return (
                    <TableRow key={model.id}>
                      <TableCell className="font-medium">{model.name}</TableCell>
                      <TableCell>{model.provider}</TableCell>
                      <TableCell>${(model.costPerToken * 1000).toFixed(6)}</TableCell>
                      <TableCell>{model.maxTokens.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {model.capabilities.map((capability, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {capability}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {assignedTools.map((tool) => (
                            <span
                              key={tool}
                              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800"
                            >
                              {tool.charAt(0).toUpperCase() + tool.slice(1)}
                            </span>
                          ))}
                          {assignedTools.length === 0 && (
                            <span className="text-sm text-muted-foreground">
                              No tools assigned
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeModel(model.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {models.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No models configured yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
