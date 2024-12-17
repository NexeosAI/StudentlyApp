import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { useAI } from '@/hooks/use-ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, ExternalLink, Info } from 'lucide-react'

interface SourceEvaluation {
  url: string
  title: string
  evaluation: {
    credibility: {
      score: number
      reasons: string[]
    }
    reliability: {
      score: number
      reasons: string[]
    }
    bias: {
      level: string
      indicators: string[]
    }
    currency: {
      isRecent: boolean
      lastUpdated?: string
      relevance: string
    }
  }
  recommendations: string[]
}

export default function SourceEvaluatorPage() {
  const [url, setUrl] = useState('')
  const [sourceContent, setSourceContent] = useState('')
  const [evaluation, setEvaluation] = useState<SourceEvaluation | null>(null)

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      const data = JSON.parse(response) as SourceEvaluation
      setEvaluation(data)
    },
  })

  const handleEvaluate = async () => {
    if (!url || !sourceContent || isLoading) return

    const prompt = `
      Evaluate the following source:
      URL: ${url}
      Content:
      ${sourceContent}

      Generate an evaluation in this JSON format:
      {
        "url": "source URL",
        "title": "source title",
        "evaluation": {
          "credibility": {
            "score": 1-10,
            "reasons": ["reasons for credibility score"]
          },
          "reliability": {
            "score": 1-10,
            "reasons": ["reasons for reliability score"]
          },
          "bias": {
            "level": "none/low/medium/high",
            "indicators": ["bias indicators found"]
          },
          "currency": {
            "isRecent": true/false,
            "lastUpdated": "date if available",
            "relevance": "explanation of temporal relevance"
          }
        },
        "recommendations": ["recommendations for using this source"]
      }

      Focus on:
      1. Academic credibility and authority
      2. Source reliability and accuracy
      3. Potential biases and limitations
      4. Currency and relevance
    `

    await generateResponse(prompt, 'You are an expert in source evaluation and academic research with deep knowledge of credibility assessment.')
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-500'
    if (score >= 6) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getBiasColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'none':
      case 'low':
        return 'text-green-500'
      case 'medium':
        return 'text-yellow-500'
      case 'high':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Source Evaluator"
        description="Evaluate the credibility and reliability of research sources"
      >
        <div className="space-y-6">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="url">Source URL</Label>
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter the URL of the source"
                />
              </div>

              <div>
                <Label htmlFor="content">Source Content</Label>
                <Textarea
                  id="content"
                  value={sourceContent}
                  onChange={(e) => setSourceContent(e.target.value)}
                  placeholder="Paste the relevant content from the source..."
                  className="min-h-[200px]"
                />
              </div>

              <Button
                onClick={handleEvaluate}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Info className="h-4 w-4 mr-2" />
                )}
                Evaluate Source
              </Button>
            </div>
          </Card>

          {evaluation && (
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    {evaluation.title}
                    <a
                      href={evaluation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Credibility</h4>
                    <p className={`text-2xl font-bold ${getScoreColor(evaluation.evaluation.credibility.score)}`}>
                      {evaluation.evaluation.credibility.score}/10
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      {evaluation.evaluation.credibility.reasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Reliability</h4>
                    <p className={`text-2xl font-bold ${getScoreColor(evaluation.evaluation.reliability.score)}`}>
                      {evaluation.evaluation.reliability.score}/10
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      {evaluation.evaluation.reliability.reasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  </Card>
                </div>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Bias Assessment</h4>
                  <p className={`text-lg font-medium ${getBiasColor(evaluation.evaluation.bias.level)}`}>
                    {evaluation.evaluation.bias.level.toUpperCase()} BIAS
                  </p>
                  <ul className="mt-2 space-y-1">
                    {evaluation.evaluation.bias.indicators.map((indicator, index) => (
                      <li key={index}>{indicator}</li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Currency</h4>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Last Updated:</span>{' '}
                      {evaluation.evaluation.currency.lastUpdated || 'Not specified'}
                    </p>
                    <p>
                      <span className="font-medium">Recent:</span>{' '}
                      {evaluation.evaluation.currency.isRecent ? 'Yes' : 'No'}
                    </p>
                    <p>{evaluation.evaluation.currency.relevance}</p>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="space-y-2">
                    {evaluation.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-blue-500">•</span>
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </Card>
          )}
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
