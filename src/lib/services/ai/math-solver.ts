import OpenAI from 'openai'
import { AnthropicStream, StreamingTextResponse } from 'ai'
import { env } from '@/lib/env'

export type MathProblem = {
  type: 'algebra' | 'calculus' | 'statistics' | 'geometry' | 'other'
  question: string
  context?: string
  requireSteps: boolean
}

export type MathSolution = {
  answer: string
  steps?: string[]
  explanation?: string
  visualAid?: string // LaTeX or ASCII diagram
  relatedConcepts?: string[]
}

class MathSolverService {
  private openai: OpenAI
  
  constructor() {
    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    })
  }

  private generatePrompt(problem: MathProblem): string {
    const basePrompt = `Solve the following ${problem.type} problem:\n${problem.question}\n`
    const contextPrompt = problem.context ? `Context: ${problem.context}\n` : ''
    const stepsPrompt = problem.requireSteps ? 'Please provide detailed step-by-step solution.' : ''
    
    return `${basePrompt}${contextPrompt}${stepsPrompt}

    Please provide a detailed solution following this exact format:

    Answer:
    [Write a clear, complete sentence stating the final answer]

    Solution Steps:
    1. [First step with explanation in plain text]
       [If needed, include formula: \\( mathematical expression \\)]
    2. [Second step with explanation]
       [Formula if needed: \\( mathematical expression \\)]
    3. [Continue with remaining steps...]

    Verification:
    To verify: \\( \\text{Area} = \\text{width} \\times \\text{length} = 5 \\times 8 = 40 \\text{ square meters} \\checkmark \\)

    Example of desired format:
    Answer:
    The garden dimensions are 5 meters wide by 8 meters long.

    Solution Steps:
    1. Let's define our variables:
       Width = w
       Length = w + 3 (since length is 3 meters more than width)
    
    2. Using the area formula:
       \\( w(w + 3) = 40 \\) (Area = length × width)
    
    3. Expand the equation:
       \\( w^2 + 3w - 40 = 0 \\)
    
    4. Solve using quadratic formula:
       \\[ w = \\frac{-3 \\pm \\sqrt{9 + 160}}{2} = \\frac{-3 \\pm 13}{2} = 5 \\text{ or } -8 \\]
    
    5. Since width must be positive:
       Width = 5 meters
       Length = 8 meters (5 + 3)

    Verification:
    To verify: \\( \\text{Area} = \\text{width} \\times \\text{length} = 5 \\times 8 = 40 \\text{ square meters} \\checkmark \\)`
  }

  async solveProblem(problem: MathProblem): Promise<MathSolution> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert mathematics tutor. Provide clear, accurate, and educational solutions to mathematical problems. Use LaTeX notation for mathematical expressions where appropriate.'
          },
          {
            role: 'user',
            content: this.generatePrompt(problem)
          }
        ],
        temperature: 0.2, // Lower temperature for more precise mathematical answers
      })

      const response = completion.choices[0].message.content
      return this.parseSolution(response || '')
    } catch (error) {
      console.error('Error solving math problem:', error)
      throw new Error('Failed to solve math problem')
    }
  }

  async streamSolution(problem: MathProblem) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: this.generatePrompt(problem)
          }],
          model: 'claude-3-opus-20240229',
          stream: true,
          max_tokens: 4000,
          temperature: 0.2
        })
      })

      const stream = AnthropicStream(response)
      return new StreamingTextResponse(stream)
    } catch (error) {
      console.error('Error streaming math solution:', error)
      throw new Error('Failed to stream math solution')
    }
  }

  private parseSolution(response: string): MathSolution {
    try {
      // Extract sections using regex
      const answerMatch = response.match(/Answer:\s*([\s\S]*?)(?=\s*(?:Solution Steps:|$))/i)
      const stepsMatch = response.match(/Solution Steps:\s*([\s\S]*?)(?=\s*(?:Verification:|$))/i)
      const verificationMatch = response.match(/Verification:\s*([\s\S]*?)$/i)

      const steps = stepsMatch?.[1]?.split(/\n\s*\d+\.\s+/)
        .filter(step => step.trim())
        .map(step => step.trim()) ?? []

      return {
        answer: answerMatch?.[1]?.trim() ?? 'No answer provided',
        steps: steps,
        explanation: verificationMatch?.[1]?.trim() ?? '',
        visualAid: '',
        relatedConcepts: []
      }
    } catch (error) {
      console.error('Error parsing solution:', error)
      return {
        answer: 'Error parsing solution',
        steps: [],
        explanation: '',
        visualAid: '',
        relatedConcepts: []
      }
    }
  }
}

export const mathSolver = new MathSolverService()
