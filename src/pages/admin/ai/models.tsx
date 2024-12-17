import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ModelSelectorDialog } from "@/components/ai/model-selector-dialog"
import { useAIProviderStore } from "@/lib/store/ai-provider-store"
import { PlusCircle } from "lucide-react"

export default function AIModelsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const { providers, models, updateModel, removeModel } = useAIProviderStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Models</h2>
          <p className="text-muted-foreground">Configure and manage AI models</p>
        </div>
        <Button onClick={() => setIsOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Model
        </Button>
      </div>

      <ModelSelectorDialog open={isOpen} onOpenChange={setIsOpen} />

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
                  <TableHead>Status</TableHead>
                  <TableHead>Cost/1K tokens</TableHead>
                  <TableHead>Max Tokens</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((model) => {
                  const provider = providers.find(p => p.id === model.providerId)
                  return (
                    <TableRow key={model.id}>
                      <TableCell className="font-medium">{model.name}</TableCell>
                      <TableCell>{provider?.name || 'Unknown'}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          model.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {model.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>${(model.costPerToken * 1000).toFixed(4)}</TableCell>
                      <TableCell>{model.maxTokens.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateModel(model.id, {
                              status: model.status === 'active' ? 'inactive' : 'active'
                            })}
                          >
                            {model.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
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
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
