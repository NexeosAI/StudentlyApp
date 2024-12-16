export type AIProvider = 'openai' | 'anthropic' | 'groq' | 'openrouter'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: Date
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface AIConfig {
  provider: AIProvider
  model: string
  temperature: number
  maxTokens: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
}

export interface GenerationOptions {
  type: 'essay' | 'research' | 'notes' | 'flashcards' | 'quiz' | 'mindmap'
  topic: string
  length?: number
  style?: string
  format?: string
  language?: string
  additionalInstructions?: string
}

export interface StudyMaterial {
  id: string
  type: GenerationOptions['type']
  title: string
  content: string
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
}
