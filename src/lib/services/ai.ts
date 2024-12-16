import OpenAI from 'openai'
import type { AIConfig, Message, GenerationOptions } from '../types/ai'
import { defaultConfig, SYSTEM_PROMPT } from '../config/ai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env?.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true,
})

export class AIService {
  private config: AIConfig

  constructor(config: Partial<AIConfig> = {}) {
    this.config = { ...defaultConfig, ...config }
  }

  async chat(messages: Message[]) {
    try {
      const response = await openai.chat.completions.create({
        model: this.config.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        ],
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
        top_p: this.config.topP,
        frequency_penalty: this.config.frequencyPenalty,
        presence_penalty: this.config.presencePenalty,
        stream: true,
      })

      return response
    } catch (error) {
      console.error('Error in AI chat:', error)
      throw error
    }
  }

  async generateContent(options: GenerationOptions) {
    const prompt = this.buildPrompt(options)
    try {
      const response = await openai.chat.completions.create({
        model: this.config.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
        top_p: this.config.topP,
        frequency_penalty: this.config.frequencyPenalty,
        presence_penalty: this.config.presencePenalty,
      })

      return response.choices[0].message.content
    } catch (error) {
      console.error('Error in content generation:', error)
      throw error
    }
  }

  private buildPrompt(options: GenerationOptions): string {
    const { type, topic, length, style, format, language, additionalInstructions } = options
    
    let prompt = `Generate ${type === 'research' ? 'a research paper' : 
      type === 'essay' ? 'an essay' :
      type === 'notes' ? 'study notes' :
      type === 'flashcards' ? 'flashcards' :
      type === 'quiz' ? 'a quiz' :
      'a mind map'} about ${topic}.`

    if (length) {
      prompt += ` The length should be approximately ${length} ${
        type === 'flashcards' ? 'cards' : 
        type === 'quiz' ? 'questions' : 
        'words'
      }.`
    }

    if (style) {
      prompt += ` The style should be ${style}.`
    }

    if (format) {
      prompt += ` Use the following format: ${format}.`
    }

    if (language) {
      prompt += ` Write in ${language}.`
    }

    if (additionalInstructions) {
      prompt += ` Additional instructions: ${additionalInstructions}`
    }

    return prompt
  }
}
