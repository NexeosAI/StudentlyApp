import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ModelsManagement } from './models-management'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AIProviders() {
  const [apiKey, setApiKey] = useState('')

  const handleSave = () => {
    // Here you would save the configuration
    console.log('Saving configuration:', {
      apiKey
    })
  }

  return (
    <div className="space-y-6">
      <ModelsManagement />
      
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Configure your API keys for various AI providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="apiKey">OpenRouter API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your OpenRouter API key"
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
