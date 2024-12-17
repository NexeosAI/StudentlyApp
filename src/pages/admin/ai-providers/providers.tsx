import { useState } from 'react'
import { useAIProviderStore } from '@/lib/store/ai-provider-store'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import type { AIProvider } from '@/lib/types/ai-provider'

export default function ProvidersPage() {
  const { providers, addProvider, updateProvider, removeProvider } = useAIProviderStore()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProvider, setEditingProvider] = useState<AIProvider | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    description: '',
    website: '',
    status: 'active' as const
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProvider) {
      updateProvider(editingProvider.id, formData)
    } else {
      addProvider(formData)
    }
    handleCloseDialog()
  }

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false)
    setEditingProvider(null)
    setFormData({
      name: '',
      logo: '',
      description: '',
      website: '',
      status: 'active'
    })
  }

  const handleEdit = (provider: AIProvider) => {
    setEditingProvider(provider)
    setFormData({
      name: provider.name,
      logo: provider.logo,
      description: provider.description,
      website: provider.website,
      status: provider.status
    })
    setIsAddDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Providers</h2>
          <p className="text-muted-foreground">
            Manage your AI service providers and their configurations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Provider
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProvider ? 'Edit Provider' : 'Add New Provider'}
              </DialogTitle>
              <DialogDescription>
                Configure the AI provider's details and settings
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Provider Name</Label>
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
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={(e) =>
                      setFormData({ ...formData, logo: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
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
                        status: checked ? 'active' : 'inactive'
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
                  {editingProvider ? 'Update' : 'Add'} Provider
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {providers.map((provider) => (
          <Card key={provider.id}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <CardTitle>{provider.name}</CardTitle>
                  <CardDescription>{provider.website}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {provider.description}
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    provider.status === 'active'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                />
                <span className="text-sm font-medium">
                  {provider.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleEdit(provider)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeProvider(provider.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
