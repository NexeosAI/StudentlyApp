import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAIProvider, type AIProvider } from '@/lib/store/ai-provider-store'
import { PlusCircle, Settings, AlertTriangle, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react'

export default function ProvidersPage() {
  const { providers, addProvider, updateProvider, removeProvider } = useAIProvider()
  const [editingProvider, setEditingProvider] = useState<AIProvider | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const handleAddProvider = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newProvider = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      status: 'inactive' as const,
      apiKey: formData.get('apiKey') as string,
      baseUrl: formData.get('baseUrl') as string,
      models: [],
      settings: {
        defaultModel: '',
        temperature: 0.7,
        maxTokens: 2048,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0
      }
    }
    addProvider(newProvider)
    setShowAddDialog(false)
  }

  const handleUpdateProvider = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingProvider) return

    const formData = new FormData(e.currentTarget)
    const updates = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      apiKey: formData.get('apiKey') as string,
      baseUrl: formData.get('baseUrl') as string,
    }
    updateProvider(editingProvider.id, updates)
    setEditingProvider(null)
  }

  const getStatusIcon = (status: AIProvider['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'inactive':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const ProviderForm = ({ provider }: { provider?: AIProvider }) => (
    <form onSubmit={provider ? handleUpdateProvider : handleAddProvider} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Provider Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={provider?.name}
          placeholder="e.g., OpenAI"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          defaultValue={provider?.description}
          placeholder="Brief description of the provider"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="apiKey">API Key</Label>
        <Input
          id="apiKey"
          name="apiKey"
          type="password"
          defaultValue={provider?.apiKey}
          placeholder="Enter API key"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="baseUrl">Base URL (Optional)</Label>
        <Input
          id="baseUrl"
          name="baseUrl"
          defaultValue={provider?.baseUrl}
          placeholder="e.g., https://api.openai.com/v1"
        />
      </div>
      <Button type="submit" className="w-full">
        {provider ? 'Update Provider' : 'Add Provider'}
      </Button>
    </form>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Providers</h1>
          <p className="text-muted-foreground">Configure and manage AI service providers</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Provider
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add AI Provider</DialogTitle>
              <DialogDescription>
                Configure a new AI service provider
              </DialogDescription>
            </DialogHeader>
            <ProviderForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {providers.map((provider) => (
          <Card key={provider.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  {provider.name}
                  {getStatusIcon(provider.status)}
                </CardTitle>
                <CardDescription>{provider.description}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditingProvider(provider)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeProvider(provider.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">API Status</span>
                    <span className={`font-medium ${
                      provider.status === 'active' ? 'text-green-500' :
                      provider.status === 'error' ? 'text-red-500' :
                      'text-yellow-500'
                    }`}>
                      {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                    </span>
                  </div>
                  {provider.usageQuota && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Usage</span>
                      <span className="font-medium">
                        {provider.usageQuota.used.toLocaleString()} / {provider.usageQuota.monthly.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Models Available</span>
                    <span className="font-medium">{provider.models.length}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => setEditingProvider(provider)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!editingProvider} onOpenChange={(open) => !open && setEditingProvider(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Provider</DialogTitle>
            <DialogDescription>
              Update provider configuration
            </DialogDescription>
          </DialogHeader>
          {editingProvider && <ProviderForm provider={editingProvider} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
