import OpenAI from 'openai'
import { env } from '@/lib/env'

export type ResourceType = 'article' | 'book' | 'journal' | 'paper' | 'thesis' | 'dataset'

export type SearchFilters = {
  type?: ResourceType[]
  year?: {
    start?: number
    end?: number
  }
  language?: string[]
  subject?: string[]
  accessLevel?: 'open' | 'restricted' | 'all'
}

export type ResourceMetadata = {
  id: string
  title: string
  authors: string[]
  type: ResourceType
  year: number
  abstract?: string
  keywords?: string[]
  doi?: string
  url?: string
  citation: {
    apa: string
    mla: string
    chicago: string
  }
  accessLevel: 'open' | 'restricted'
  language: string
  subjects: string[]
}

export type SearchResult = {
  query: string
  filters: SearchFilters
  totalResults: number
  resources: ResourceMetadata[]
  relatedQueries: string[]
  recommendations: ResourceMetadata[]
}

class DigitalLibraryService {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    })
  }

  private generateSearchPrompt(query: string, filters: SearchFilters): string {
    return `Search for academic resources matching the following criteria:

Query: "${query}"

Filters:
${JSON.stringify(filters, null, 2)}

Please provide:
1. Relevant academic resources
2. Resource metadata
3. Citation information
4. Related search queries
5. Recommendations based on the search

Format the response as a JSON object with the following structure:
{
  "query": "original query",
  "filters": {},
  "totalResults": 0,
  "resources": [],
  "relatedQueries": [],
  "recommendations": []
}`
  }

  async searchResources(query: string, filters: SearchFilters = {}): Promise<SearchResult> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert digital library system. Search and recommend academic resources based on user queries.'
          },
          {
            role: 'user',
            content: this.generateSearchPrompt(query, filters)
          }
        ],
        temperature: 0.2,
        response_format: { type: 'json' },
      })

      const response = JSON.parse(completion.choices[0].message.content || '{}')
      return this.validateAndEnhanceResponse(response, query, filters)
    } catch (error) {
      console.error('Error searching resources:', error)
      throw new Error('Failed to search academic resources')
    }
  }

  private validateAndEnhanceResponse(response: any, query: string, filters: SearchFilters): SearchResult {
    // Ensure the response has all required fields
    const result: SearchResult = {
      query: response.query || query,
      filters: response.filters || filters,
      totalResults: response.totalResults || 0,
      resources: response.resources || [],
      relatedQueries: response.relatedQueries || [],
      recommendations: response.recommendations || []
    }

    // Validate and enhance each resource
    result.resources = result.resources.map(resource => ({
      ...resource,
      citation: resource.citation || {
        apa: this.generateCitation(resource, 'apa'),
        mla: this.generateCitation(resource, 'mla'),
        chicago: this.generateCitation(resource, 'chicago')
      }
    }))

    return result
  }

  private generateCitation(resource: ResourceMetadata, style: 'apa' | 'mla' | 'chicago'): string {
    // Basic citation generation logic
    const authors = resource.authors.join(', ')
    const year = resource.year.toString()
    const title = resource.title

    switch (style) {
      case 'apa':
        return `${authors} (${year}). ${title}.`
      case 'mla':
        return `${authors}. "${title}." ${year}.`
      case 'chicago':
        return `${authors}. ${title}. ${year}.`
      default:
        return `${authors} - ${title} (${year})`
    }
  }

  async getRecommendations(resourceId: string): Promise<ResourceMetadata[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert academic recommendation system. Suggest related academic resources.'
          },
          {
            role: 'user',
            content: `Find similar academic resources to resource ID: ${resourceId}`
          }
        ],
        temperature: 0.3,
        response_format: { type: 'json' },
      })

      const response = JSON.parse(completion.choices[0].message.content || '{}')
      return response.recommendations || []
    } catch (error) {
      console.error('Error getting recommendations:', error)
      return []
    }
  }

  async generateBibliography(resources: ResourceMetadata[], style: 'apa' | 'mla' | 'chicago'): Promise<string> {
    try {
      const citations = resources.map(resource => this.generateCitation(resource, style))
      return citations.join('\n\n')
    } catch (error) {
      console.error('Error generating bibliography:', error)
      throw new Error('Failed to generate bibliography')
    }
  }
}

export const digitalLibrary = new DigitalLibraryService()
