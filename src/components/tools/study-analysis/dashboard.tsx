import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StudyAnalysis } from '@/lib/types/study-analysis';
import { PatternAnalysis } from './pattern-analysis';
import { LearningStyleCard } from './learning-style-card';
import { KnowledgeGapList } from './knowledge-gap-list';
import { ResourceRecommendations } from './resource-recommendations';

interface StudyAnalysisDashboardProps {
  analysis: StudyAnalysis;
  onRefreshAnalysis: () => void;
}

export const StudyAnalysisDashboard: React.FC<StudyAnalysisDashboardProps> = ({
  analysis,
  onRefreshAnalysis
}) => {
  const progressPercentage = Math.round(
    (analysis.overallProgress.completedTopics / analysis.overallProgress.totalTopics) * 100
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Study Analysis Dashboard</h2>
          <p className="text-muted-foreground">
            Last updated: {analysis.timestamp.toLocaleDateString()}
          </p>
        </div>
        <Button onClick={onRefreshAnalysis}>Refresh Analysis</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="mb-2" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Topics Completed</p>
                <p className="text-2xl font-bold">
                  {analysis.overallProgress.completedTopics}/{analysis.overallProgress.totalTopics}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">
                  {analysis.overallProgress.averageScore}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Investment</CardTitle>
            <CardDescription>Study hours tracked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold">{analysis.overallProgress.timeInvested}</p>
              <p className="text-sm text-muted-foreground">Total Hours</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Style</CardTitle>
            <CardDescription>Your preferred way of learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-semibold">Primary: {analysis.learningStyle.primary}</p>
              {analysis.learningStyle.secondary && (
                <p className="font-semibold">Secondary: {analysis.learningStyle.secondary}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="patterns" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="patterns">Study Patterns</TabsTrigger>
          <TabsTrigger value="style">Learning Style</TabsTrigger>
          <TabsTrigger value="gaps">Knowledge Gaps</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns">
          <PatternAnalysis patterns={analysis.patterns} />
        </TabsContent>

        <TabsContent value="style">
          <LearningStyleCard learningStyle={analysis.learningStyle} />
        </TabsContent>

        <TabsContent value="gaps">
          <KnowledgeGapList gaps={analysis.knowledgeGaps} />
        </TabsContent>

        <TabsContent value="recommendations">
          <ResourceRecommendations recommendations={analysis.recommendations} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
