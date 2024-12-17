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
import { Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react'
import type { BudgetAlert } from '@/lib/types/ai-provider'

export default function BudgetPage() {
  const {
    providers,
    models,
    budgetAlerts,
    addBudgetAlert,
    updateBudgetAlert,
    removeBudgetAlert,
  } = useAIProviderStore()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAlert, setEditingAlert] = useState<BudgetAlert | null>(null)
  const [formData, setFormData] = useState({
    providerId: '',
    modelId: '',
    toolId: '',
    threshold: 0,
    period: 'monthly' as const,
    status: 'active' as const,
    notificationEmail: [''],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingAlert) {
      updateBudgetAlert(editingAlert.id, formData)
    } else {
      addBudgetAlert(formData)
    }
    handleCloseDialog()
  }

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false)
    setEditingAlert(null)
    setFormData({
      providerId: '',
      modelId: '',
      toolId: '',
      threshold: 0,
      period: 'monthly',
      status: 'active',
      notificationEmail: [''],
    })
  }

  const handleEdit = (alert: BudgetAlert) => {
    setEditingAlert(alert)
    setFormData({
      providerId: alert.providerId,
      modelId: alert.modelId || '',
      toolId: alert.toolId || '',
      threshold: alert.threshold,
      period: alert.period,
      status: alert.status,
      notificationEmail: alert.notificationEmail,
    })
    setIsAddDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Budget Management</h2>
          <p className="text-muted-foreground">
            Set and manage budget alerts for AI usage
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Alert
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAlert ? 'Edit Alert' : 'Add New Alert'}
              </DialogTitle>
              <DialogDescription>
                Configure budget alert settings and thresholds
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
                  <Label htmlFor="modelId">Model (Optional)</Label>
                  <select
                    id="modelId"
                    value={formData.modelId}
                    onChange={(e) =>
                      setFormData({ ...formData, modelId: e.target.value })
                    }
                    className="w-full rounded-md border p-2"
                  >
                    <option value="">All Models</option>
                    {models
                      .filter((m) => m.providerId === formData.providerId)
                      .map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="threshold">Budget Threshold ($)</Label>
                  <Input
                    id="threshold"
                    type="number"
                    step="0.01"
                    value={formData.threshold}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        threshold: parseFloat(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Alert Period</Label>
                  <select
                    id="period"
                    value={formData.period}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        period: e.target.value as 'daily' | 'weekly' | 'monthly',
                      })
                    }
                    className="w-full rounded-md border p-2"
                    required
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Notification Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.notificationEmail[0]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notificationEmail: [e.target.value],
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
                  {editingAlert ? 'Update' : 'Add'} Alert
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgetAlerts.map((alert) => {
          const provider = providers.find((p) => p.id === alert.providerId)
          const model = alert.modelId
            ? models.find((m) => m.id === alert.modelId)
            : null

          return (
            <Card key={alert.id}>
              <CardHeader>
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <CardTitle>{provider?.name}</CardTitle>
                    <CardDescription>
                      {model ? model.name : 'All Models'}
                    </CardDescription>
                  </div>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      alert.status === 'active'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">
                      ${alert.threshold.toFixed(2)} / {alert.period}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Notifications sent to: {alert.notificationEmail.join(', ')}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(alert)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeBudgetAlert(alert.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
