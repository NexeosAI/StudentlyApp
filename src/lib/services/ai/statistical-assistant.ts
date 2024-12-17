import OpenAI from 'openai'
import { env } from '@/lib/env'

export type StatisticalAnalysisType =
  | 'descriptive'
  | 'inferential'
  | 'regression'
  | 'correlation'
  | 'hypothesis'
  | 'anova'
  | 'time-series'

export type StatisticalRequest = {
  data: string | object
  analysisType: StatisticalAnalysisType
  options?: {
    confidenceLevel?: number
    significanceLevel?: number
    includeVisualization?: boolean
    detailedExplanation?: boolean
  }
}

export type StatisticalResult = {
  summary: {
    key: string
    value: number | string
    interpretation: string
  }[]
  analysis: {
    method: string
    results: any
    interpretation: string
  }
  visualizations?: {
    type: string
    config: any
  }[]
  recommendations: string[]
  code: {
    python?: string
    r?: string
  }
}

class StatisticalAssistantService {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    })
  }

  private generatePrompt(request: StatisticalRequest): string {
    return `Perform a ${request.analysisType} statistical analysis on the following data:

Data:
"""
${typeof request.data === 'string' ? request.data : JSON.stringify(request.data, null, 2)}
"""

Analysis Requirements:
- Type: ${request.analysisType}
- Confidence Level: ${request.options?.confidenceLevel || 0.95}
- Significance Level: ${request.options?.significanceLevel || 0.05}
${request.options?.includeVisualization ? '- Include appropriate visualizations' : ''}
${request.options?.detailedExplanation ? '- Provide detailed explanations' : ''}

Please provide:
1. Summary statistics
2. Detailed analysis
3. Statistical interpretations
4. ${request.options?.includeVisualization ? 'Visualization configurations' : ''}
5. Code implementation
6. Recommendations

Format the response as a JSON object with the following structure:
{
  "summary": [
    {
      "key": "statistic name",
      "value": "numeric value",
      "interpretation": "explanation"
    }
  ],
  "analysis": {
    "method": "statistical method used",
    "results": {},
    "interpretation": "detailed interpretation"
  },
  "visualizations": [],
  "recommendations": [],
  "code": {
    "python": "code here",
    "r": "code here"
  }
}`
  }

  async analyzeData(request: StatisticalRequest): Promise<StatisticalResult> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert statistical analysis system. Analyze data using appropriate statistical methods and provide detailed interpretations.'
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
      console.error('Error performing statistical analysis:', error)
      throw new Error('Failed to perform statistical analysis')
    }
  }

  private validateAndEnhanceResponse(response: any): StatisticalResult {
    // Ensure the response has all required fields
    const result: StatisticalResult = {
      summary: response.summary || [],
      analysis: response.analysis || {
        method: 'Not specified',
        results: {},
        interpretation: 'No interpretation provided'
      },
      visualizations: response.visualizations || [],
      recommendations: response.recommendations || [],
      code: response.code || {
        python: '',
        r: ''
      }
    }

    // Add default visualization options if needed
    if (result.visualizations?.length) {
      result.visualizations = result.visualizations.map(viz => ({
        ...viz,
        config: {
          ...viz.config,
          responsive: true,
          maintainAspectRatio: true
        }
      }))
    }

    return result
  }

  async suggestAnalysis(data: string | object): Promise<StatisticalAnalysisType[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in statistical analysis. Suggest appropriate statistical methods for the given data.'
          },
          {
            role: 'user',
            content: `Analyze this data and suggest appropriate statistical analysis methods:
            
            ${typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
            
            Return only an array of analysis types from these options: descriptive, inferential, regression, correlation, hypothesis, anova, time-series`
          }
        ],
        temperature: 0.2,
      })

      const suggestions = completion.choices[0].message.content
        ?.replace(/[\[\]]/g, '')
        .split(',')
        .map(type => type.trim() as StatisticalAnalysisType)
        .filter(type => [
          'descriptive',
          'inferential',
          'regression',
          'correlation',
          'hypothesis',
          'anova',
          'time-series'
        ].includes(type))

      return suggestions || ['descriptive']
    } catch (error) {
      console.error('Error suggesting analysis methods:', error)
      return ['descriptive'] // Default suggestion
    }
  }
}

export const statisticalAssistant = new StatisticalAssistantService()
