import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudyPattern } from '@/lib/types/study-analysis';

interface PatternAnalysisProps {
  patterns: StudyPattern;
}

export const PatternAnalysis: React.FC<PatternAnalysisProps> = ({ patterns }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Study Times</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Preferred Times</h4>
              <ul className="list-disc list-inside">
                {patterns.preferredTimes.map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Peak Productivity</h4>
              <ul className="list-disc list-inside">
                {patterns.productivity.peakHours.map((hour, index) => (
                  <li key={index}>{hour}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Average Session</h4>
              <p>{patterns.averageSessionDuration} minutes</p>
            </div>
            <div>
              <h4 className="font-semibold">Break Pattern</h4>
              <p>{patterns.breakPatterns.frequency} breaks per hour</p>
              <p>{patterns.breakPatterns.averageDuration} minutes per break</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subject Focus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Most Studied Subjects</h4>
              <ul className="list-disc list-inside">
                {patterns.frequentSubjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Completion Rates</h4>
              {Object.entries(patterns.completionRates).map(([subject, rate]) => (
                <div key={subject} className="flex justify-between items-center">
                  <span>{subject}</span>
                  <span>{rate}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Areas for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Common Distractions</h4>
              <ul className="list-disc list-inside">
                {patterns.distractions.map((distraction, index) => (
                  <li key={index}>{distraction}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Low Energy Periods</h4>
              <ul className="list-disc list-inside">
                {patterns.productivity.lowEnergyPeriods.map((period, index) => (
                  <li key={index}>{period}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
