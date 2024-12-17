import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { KnowledgeGap } from '@/lib/types/study-analysis';

interface KnowledgeGapListProps {
  gaps: KnowledgeGap[];
}

export const KnowledgeGapList: React.FC<KnowledgeGapListProps> = ({ gaps }) => {
  return (
    <div className="space-y-6">
      {gaps.map((gap, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{gap.subject}: {gap.topic}</CardTitle>
                <Badge
                  variant={
                    gap.severity === 'significant' ? 'destructive' :
                    gap.severity === 'moderate' ? 'secondary' :
                    'default'
                  }
                  className="mt-2"
                >
                  {gap.severity} gap
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Subtopics to Review</h4>
                <ul className="list-disc list-inside">
                  {gap.subtopics.map((subtopic, idx) => (
                    <li key={idx}>{subtopic}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Related Concepts</h4>
                <div className="flex flex-wrap gap-2">
                  {gap.relatedConcepts.map((concept, idx) => (
                    <Badge key={idx} variant="outline">
                      {concept}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Recommended Resources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gap.recommendedResources.map((resource, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-semibold">{resource.title}</h5>
                            <p className="text-sm text-muted-foreground">
                              {resource.estimatedTime} minutes
                            </p>
                          </div>
                          <Badge>{resource.type}</Badge>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <Badge variant="secondary">
                            Match: {resource.matchScore}%
                          </Badge>
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Start Learning
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
