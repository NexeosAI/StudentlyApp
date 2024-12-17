import OpenAI from 'openai'
import { env } from '@/lib/env'

export type DataFormat = 'csv' | 'json' | 'array' | 'text'
export type ChartType = 'bar' | 'line' | 'scatter' | 'pie' | 'heatmap' | 'box' | 'histogram'

export type DataVisualizationRequest = {
  data: string | object // Raw data or structured object
  dataFormat: DataFormat
  preferredChartType?: ChartType
  title?: string
  description?: string
  customizations?: {
    colors?: string[]
    dimensions?: {
      width: number
      height: number
    }
    theme?: 'light' | 'dark'
    annotations?: boolean
  }
}

export type DataVisualizationResult = {
  chartConfig: {
    type: ChartType
    data: any
    options: any
  }
  insights: string[]
  recommendations: string[]
  code: {
    javascript: string
    python?: string
    r?: string
  }
}

class DataVisualizerService {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    })
  }

  private generatePrompt(request: DataVisualizationRequest): string {
    return `Analyze the following data and create a visualization configuration:

Data (${request.dataFormat} format):
"""
${typeof request.data === 'string' ? request.data : JSON.stringify(request.data, null, 2)}
"""

Requirements:
- Chart Type: ${request.preferredChartType || 'auto-select best type'}
- Title: ${request.title || 'auto-generate appropriate title'}
- Description: ${request.description || 'auto-generate description'}
${request.customizations ? `- Customizations: ${JSON.stringify(request.customizations, null, 2)}` : ''}

Please provide:
1. Chart.js configuration
2. Key insights from the data
3. Recommendations for alternative visualizations
4. Code snippets for implementation

Response Format:
{
  "chartConfig": {
    "type": "chart type",
    "data": {},
    "options": {}
  },
  "insights": [],
  "recommendations": [],
  "code": {
    "javascript": "code here",
    "python": "code here",
    "r": "code here"
  }
}`
  }

  async createVisualization(request: DataVisualizationRequest): Promise<DataVisualizationResult> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert data visualization system. Analyze data and create optimal visualizations using Chart.js. Provide detailed configurations and insights.'
          },
          {
            role: 'user',
            content: this.generatePrompt(request)
          }
        ],
        temperature: 0.2,
        response_format: { type: 'json' },
      })

      const response = JSON.parse(completion.choices[0].message.content || '{}')
      return this.validateAndEnhanceResponse(response)
    } catch (error) {
      console.error('Error creating visualization:', error)
      throw new Error('Failed to create visualization')
    }
  }

  private validateAndEnhanceResponse(response: any): DataVisualizationResult {
    // Ensure the response has all required fields
    const result: DataVisualizationResult = {
      chartConfig: response.chartConfig || {
        type: 'bar',
        data: {},
        options: {}
      },
      insights: response.insights || [],
      recommendations: response.recommendations || [],
      code: response.code || {
        javascript: '',
        python: '',
        r: ''
      }
    }

    // Add default Chart.js options if not present
    if (!result.chartConfig.options.responsive) {
      result.chartConfig.options.responsive = true
    }

    if (!result.chartConfig.options.plugins) {
      result.chartConfig.options.plugins = {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Data Visualization'
        }
      }
    }

    return result
  }

  async suggestVisualizations(data: string | object, dataFormat: DataFormat): Promise<ChartType[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in data visualization. Suggest appropriate chart types for the given data.'
          },
          {
            role: 'user',
            content: `Analyze this ${dataFormat} data and suggest appropriate chart types:
            
            ${typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
            
            Return only an array of chart types from these options: bar, line, scatter, pie, heatmap, box, histogram`
          }
        ],
        temperature: 0.2,
      })

      const suggestions = completion.choices[0].message.content
        ?.replace(/[\[\]]/g, '')
        .split(',')
        .map(type => type.trim() as ChartType)
        .filter(type => ['bar', 'line', 'scatter', 'pie', 'heatmap', 'box', 'histogram'].includes(type))

      return suggestions || ['bar']
    } catch (error) {
      console.error('Error suggesting visualizations:', error)
      return ['bar', 'line'] // Default suggestions
    }
  }
}

export const dataVisualizer = new DataVisualizerService()
