import { Suspense } from 'react';
import ExamPrepGuideComponent from '@/components/tools/exam-prep-guide';
import { generateExamPrepGuide, saveUserProgress } from '@/lib/services/exam-prep';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function ExamPrepPage() {
  // TODO: Get these from user preferences/query params
  const mockGuide = await generateExamPrepGuide('Mathematics', {
    difficulty: 'Intermediate',
    timeAvailable: '2 weeks'
  });

  const handleTopicComplete = async (topicName: string) => {
    // TODO: Get actual user ID
    await saveUserProgress('user123', 'Mathematics', [topicName]);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Exam Preparation Guide</h1>
          <p className="text-muted-foreground">
            Personalized study plan to help you ace your exams
          </p>
        </div>
        <Button variant="outline">Change Subject</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Study Progress</CardTitle>
            <CardDescription>Track your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: Add progress visualization */}
            <p>Coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Management</CardTitle>
            <CardDescription>Stay on schedule</CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: Add time tracking/planning features */}
            <p>Coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>Monitor your improvement</CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: Add performance metrics */}
            <p>Coming soon...</p>
          </CardContent>
        </Card>
      </div>

      <Suspense fallback={<div>Loading guide...</div>}>
        <ExamPrepGuideComponent 
          guide={mockGuide}
          onComplete={handleTopicComplete}
        />
      </Suspense>
    </div>
  );
}
