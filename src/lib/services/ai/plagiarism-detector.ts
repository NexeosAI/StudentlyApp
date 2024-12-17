import OpenAI from 'openai'
import { env } from '@/lib/env'

export type PlagiarismCheckResult = {
  originalityScore: number // 0-1, where 1 is completely original
  matches: Array<{
    text: string
    similarity: number
    source?: string
  }>
  summary: string
  suggestions: string[]
}

export type PlagiarismCheckOptions = {
  strictness: 'low' | 'medium' | 'high'
  checkQuotes: boolean
  checkParaphrasing: boolean
  includeSourceLinks: boolean
}

class PlagiarismDetectorService {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    })
  }

  private generatePrompt(text: string, options: PlagiarismCheckOptions): string {
    return `Analyze the following text for potential plagiarism with ${options.strictness} strictness:

Text to analyze:
"""
${text}
"""

Please provide a detailed analysis including:
1. An originality score (0-1)
2. Identified matches or similar content
3. Analysis of writing style consistency
4. ${options.checkQuotes ? 'Check for proper citation of quotes' : 'Skip quote analysis'}
5. ${options.checkParaphrasing ? 'Check for potential paraphrasing issues' : 'Skip paraphrase analysis'}
6. Specific suggestions for improvement

Format the response as follows:
- Originality Score: [0-1]
- Matches:
  * [matched text] - [similarity score]
  * ...
- Summary: [analysis summary]
- Suggestions:
  * [suggestion 1]
  * ...`
  }

  async checkPlagiarism(
    text: string,
    options: PlagiarismCheckOptions = {
      strictness: 'medium',
      checkQuotes: true,
      checkParaphrasing: true,
      includeSourceLinks: true,
    }
  ): Promise<PlagiarismCheckResult> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert plagiarism detection system. Analyze text for potential plagiarism, considering both exact matches and paraphrased content. Provide detailed, actionable feedback.'
          },
          {
            role: 'user',
            content: this.generatePrompt(text, options)
          }
        ],
        temperature: 0.3,
      })

      const response = completion.choices[0].message.content
      return this.parseResponse(response || '')
    } catch (error) {
      console.error('Error checking plagiarism:', error)
      throw new Error('Failed to check for plagiarism')
    }
  }

  private parseResponse(response: string): PlagiarismCheckResult {
    const result: PlagiarismCheckResult = {
      originalityScore: 1,
      matches: [],
      summary: '',
      suggestions: [],
    }

    const lines = response.split('\n')
    let currentSection = ''

    for (const line of lines) {
      if (line.startsWith('Originality Score:')) {
        result.originalityScore = parseFloat(line.split(':')[1].trim())
      } else if (line.startsWith('Matches:')) {
        currentSection = 'matches'
      } else if (line.startsWith('Summary:')) {
        currentSection = 'summary'
        result.summary = line.replace('Summary:', '').trim()
      } else if (line.startsWith('Suggestions:')) {
        currentSection = 'suggestions'
      } else if (line.trim().startsWith('*') && currentSection === 'matches') {
        const match = line.trim().substring(1).trim()
        const [text, similarity] = match.split('-').map(s => s.trim())
        result.matches.push({
          text,
          similarity: parseFloat(similarity) || 0,
        })
      } else if (line.trim().startsWith('*') && currentSection === 'suggestions') {
        result.suggestions.push(line.trim().substring(1).trim())
      } else if (line.trim() && currentSection === 'summary') {
        result.summary += ' ' + line.trim()
      }
    }

    return result
  }

  async checkAgainstSources(text: string, sources: string[]): Promise<PlagiarismCheckResult> {
    // Implementation for checking against specific sources
    // This would involve comparing the text against each source
    // and identifying potential matches
    throw new Error('Not implemented')
  }
}

export const plagiarismDetector = new PlagiarismDetectorService()
