import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StudyAnalysis } from '@/lib/types/study-analysis';

interface ResourceRecommendationsProps {
  recommendations: StudyAnalysis['recommendations'];
}

export const ResourceRecommendations: React.FC<ResourceRecommendationsProps> = ({
  recommendations
}) => {
  const renderResourceList = (
    resources: typeof recommendations.immediate,
    title: string
  ) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {resource.estimatedTime} minutes
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>{resource.type}</Badge>
                    <Badge variant="secondary">{resource.difficulty}</Badge>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {resource.prerequisites && resource.prerequisites.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-1">Prerequisites:</p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {resource.prerequisites.map((prereq, idx) => (
                          <li key={idx}>{prereq}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {renderResourceList(recommendations.immediate, 'Start Now')}
      {renderResourceList(recommendations.shortTerm, 'This Week')}
      {renderResourceList(recommendations.longTerm, 'Long-term Goals')}
    </div>
  );
};
