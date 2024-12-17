import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LearningStyle } from '@/lib/types/study-analysis';

interface LearningStyleCardProps {
  learningStyle: LearningStyle;
}

export const LearningStyleCard: React.FC<LearningStyleCardProps> = ({ learningStyle }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Learning Style Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Primary Style</h4>
              <Badge variant="default" className="text-lg">
                {learningStyle.primary}
              </Badge>
            </div>
            {learningStyle.secondary && (
              <div>
                <h4 className="font-semibold mb-2">Secondary Style</h4>
                <Badge variant="secondary" className="text-lg">
                  {learningStyle.secondary}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strengths & Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Key Strengths</h4>
              <ul className="list-disc list-inside">
                {learningStyle.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Areas for Growth</h4>
              <ul className="list-disc list-inside">
                {learningStyle.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recommended Study Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningStyle.recommendedStrategies.map((strategy, index) => (
              <div
                key={index}
                className="p-4 bg-secondary rounded-lg"
              >
                <p>{strategy}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
