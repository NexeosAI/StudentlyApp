import { Suspense } from 'react';
import { StudyAnalysisDashboard } from '@/components/tools/study-analysis/dashboard';
import { generateStudyAnalysis } from '@/lib/services/study-analysis';

export default async function StudyAnalysisPage() {
  // TODO: Get actual user ID from session
  const analysis = await generateStudyAnalysis('user123');

  return (
    <div className="container mx-auto py-6">
      <Suspense fallback={<div>Loading analysis...</div>}>
        <StudyAnalysisDashboard
          analysis={analysis}
          onRefreshAnalysis={() => {
            // This will be handled by client component
          }}
        />
      </Suspense>
    </div>
  );
}
