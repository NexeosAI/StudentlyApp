import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface UseAIOptions {
  onSuccess?: (response: string) => void
  onError?: (error: Error) => void
}

export function useAI({ onSuccess, onError }: UseAIOptions = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const generateResponse = async (prompt: string, systemPrompt?: string) => {
    try {
      setIsLoading(true)
      
      // TODO: Replace with actual API call to your AI service
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemPrompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate response')
      }

      const data = await response.json()
      onSuccess?.(data.response)
      return data.response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      onError?.(error as Error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    generateResponse,
    isLoading,
  }
}
