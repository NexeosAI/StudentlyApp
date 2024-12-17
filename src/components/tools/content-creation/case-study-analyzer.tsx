import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CaseStudy, CaseStudySection } from '@/lib/types/content-creation';
import { analyzeCaseStudy } from '@/lib/services/content-creation';

interface CaseStudyAnalyzerProps {
  onAnalysisComplete?: (analysis: CaseStudy) => void;
}

export const CaseStudyAnalyzer: React.FC<CaseStudyAnalyzerProps> = ({
  onAnalysisComplete
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [context, setContext] = useState('');
  const [problem, setProblem] = useState('');
  const [data, setData] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<CaseStudy | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeCaseStudy({
        title,
        subject,
        context,
        problem,
        data: data ? JSON.parse(data) : undefined
      });

      setCurrentAnalysis(analysis);
      onAnalysisComplete?.(analysis);
    } catch (error) {
      console.error('Error analyzing case study:', error);
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Case Study Analyzer</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Case Study Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter case study title"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject Area</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject area"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="context">Background Context</Label>
              <Textarea
                id="context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Provide background information and context"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="problem">Problem Statement</Label>
              <Textarea
                id="problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Describe the main problem or challenge"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="data">Supporting Data (JSON format)</Label>
              <Textarea
                id="data"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter any supporting data in JSON format"
                rows={4}
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={!title || !context || !problem || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Case Study'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {currentAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle>{currentAnalysis.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentAnalysis.metadata.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="questions">Discussion Questions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Background</h3>
                        <p>{currentAnalysis.overview.background}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Objectives</h3>
                        <ul className="list-disc list-inside">
                          {currentAnalysis.overview.objectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Key Issues</h3>
                        <ul className="list-disc list-inside">
                          {currentAnalysis.overview.keyIssues.map((issue, index) => (
                            <li key={index}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis">
                <div className="space-y-6">
                  {currentAnalysis.sections
                    .filter(section => section.type === 'analysis')
                    .map((section) => (
                      <AnalysisSection key={section.id} section={section} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Key Findings</h3>
                        <ul className="list-disc list-inside">
                          {currentAnalysis.analysis.findings.map((finding, index) => (
                            <li key={index}>{finding}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Recommendations</h3>
                        <ul className="list-disc list-inside">
                          {currentAnalysis.analysis.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Key Lessons</h3>
                        <ul className="list-disc list-inside">
                          {currentAnalysis.analysis.lessons.map((lesson, index) => (
                            <li key={index}>{lesson}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="questions">
                <div className="space-y-4">
                  {currentAnalysis.sections
                    .flatMap(section => section.questions || [])
                    .map((question, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <p className="font-medium">{question.text}</p>
                            <Badge>{question.type}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const AnalysisSection: React.FC<{ section: CaseStudySection }> = ({ section }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>{section.content}</p>

          {section.evidence && (
            <div className="mt-4">
              {section.evidence.quotes && section.evidence.quotes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Supporting Evidence</h4>
                  {section.evidence.quotes.map((quote, index) => (
                    <blockquote
                      key={index}
                      className="border-l-4 pl-4 italic text-muted-foreground"
                    >
                      {quote}
                    </blockquote>
                  ))}
                </div>
              )}

              {section.evidence.references && section.evidence.references.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">References</h4>
                  <ul className="list-disc list-inside">
                    {section.evidence.references.map((ref, index) => (
                      <li key={index}>
                        {ref.authors.join(', ')} ({ref.year}). {ref.title}.{' '}
                        {ref.source}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
