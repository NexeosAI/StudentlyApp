import OpenAI from 'openai'
import { env } from '@/lib/env'

export type DataSource = 'survey' | 'experiment' | 'observation' | 'interview' | 'field-study'

export type DataCollectionTemplate = {
  id: string
  title: string
  description: string
  type: DataSource
  fields: {
    id: string
    label: string
    type: 'text' | 'number' | 'choice' | 'scale' | 'date' | 'time' | 'file'
    required: boolean
    options?: string[] // For choice fields
    validation?: {
      min?: number
      max?: number
      pattern?: string
      message?: string
    }
  }[]
  settings: {
    anonymous: boolean
    multipleResponses: boolean
    timeLimit?: number
    startDate?: Date
    endDate?: Date
  }
}

export type DataEntry = {
  templateId: string
  responseId: string
  timestamp: Date
  data: Record<string, any>
  metadata: {
    source: string
    collector: string
    location?: {
      latitude: number
      longitude: number
    }
  }
}

export type DataAnalysis = {
  summary: {
    totalResponses: number
    completionRate: number
    averageTime: number
  }
  results: {
    fieldId: string
    responses: {
      value: any
      count: number
      percentage: number
    }[]
    statistics?: {
      mean?: number
      median?: number
      mode?: number
      standardDeviation?: number
    }
  }[]
  insights: string[]
  visualizations: {
    type: string
    config: any
  }[]
}

class DataCollectorService {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    })
  }

  private generateTemplatePrompt(request: {
    title: string
    description: string
    type: DataSource
    requirements?: string[]
  }): string {
    return `Create a data collection template for the following research:

Title: "${request.title}"
Description: "${request.description}"
Type: ${request.type}
${request.requirements ? `Requirements:\n${request.requirements.join('\n')}` : ''}

Please provide:
1. Appropriate fields for data collection
2. Validation rules
3. Collection settings
4. Best practices recommendations

Format the response as a JSON object matching the DataCollectionTemplate type.`
  }

  async createTemplate(request: {
    title: string
    description: string
    type: DataSource
    requirements?: string[]
  }): Promise<DataCollectionTemplate> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert research methodology system. Create data collection templates following best practices in research design.'
          },
          {
            role: 'user',
            content: this.generateTemplatePrompt(request)
          }
        ],
        temperature: 0.2,
        response_format: { type: 'json' },
      })

      const response = JSON.parse(completion.choices[0].message.content || '{}')
      return this.validateAndEnhanceTemplate(response)
    } catch (error) {
      console.error('Error creating template:', error)
      throw new Error('Failed to create data collection template')
    }
  }

  private validateAndEnhanceTemplate(template: any): DataCollectionTemplate {
    // Generate a unique ID if not present
    if (!template.id) {
      template.id = `template_${Date.now()}`
    }

    // Ensure all fields have IDs
    template.fields = (template.fields || []).map(field => ({
      ...field,
      id: field.id || `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }))

    // Add default settings if not present
    template.settings = {
      anonymous: true,
      multipleResponses: false,
      ...template.settings
    }

    return template as DataCollectionTemplate
  }

  async analyzeData(templateId: string, entries: DataEntry[]): Promise<DataAnalysis> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert data analysis system. Analyze research data and provide insights.'
          },
          {
            role: 'user',
            content: `Analyze the following research data:
            
            Template ID: ${templateId}
            Entries: ${JSON.stringify(entries, null, 2)}
            
            Provide:
            1. Summary statistics
            2. Results analysis
            3. Key insights
            4. Visualization suggestions`
          }
        ],
        temperature: 0.2,
        response_format: { type: 'json' },
      })

      const response = JSON.parse(completion.choices[0].message.content || '{}')
      return this.validateAndEnhanceAnalysis(response)
    } catch (error) {
      console.error('Error analyzing data:', error)
      throw new Error('Failed to analyze data')
    }
  }

  private validateAndEnhanceAnalysis(analysis: any): DataAnalysis {
    return {
      summary: {
        totalResponses: analysis.summary?.totalResponses || 0,
        completionRate: analysis.summary?.completionRate || 0,
        averageTime: analysis.summary?.averageTime || 0
      },
      results: analysis.results || [],
      insights: analysis.insights || [],
      visualizations: analysis.visualizations || []
    }
  }

  async validateEntry(template: DataCollectionTemplate, entry: Partial<DataEntry>): Promise<{
    valid: boolean
    errors: Record<string, string>
  }> {
    const errors: Record<string, string> = {}

    // Check required fields
    template.fields.forEach(field => {
      const value = entry.data?.[field.id]
      if (field.required && (value === undefined || value === null || value === '')) {
        errors[field.id] = `${field.label} is required`
      }

      // Check validation rules if present
      if (value !== undefined && value !== null && field.validation) {
        if (field.type === 'number') {
          const numValue = Number(value)
          if (field.validation.min !== undefined && numValue < field.validation.min) {
            errors[field.id] = `${field.label} must be at least ${field.validation.min}`
          }
          if (field.validation.max !== undefined && numValue > field.validation.max) {
            errors[field.id] = `${field.label} must be at most ${field.validation.max}`
          }
        }

        if (field.validation.pattern && typeof value === 'string') {
          const regex = new RegExp(field.validation.pattern)
          if (!regex.test(value)) {
            errors[field.id] = field.validation.message || `${field.label} is invalid`
          }
        }
      }
    })

    return {
      valid: Object.keys(errors).length === 0,
      errors
    }
  }
}

export const dataCollector = new DataCollectorService()
