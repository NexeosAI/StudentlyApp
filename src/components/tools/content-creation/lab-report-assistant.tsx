import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LabReport, LabReportSection } from '@/lib/types/content-creation';
import { generateLabReport } from '@/lib/services/content-creation';

interface LabReportAssistantProps {
  onReportGenerated?: (report: LabReport) => void;
}

export const LabReportAssistant: React.FC<LabReportAssistantProps> = ({
  onReportGenerated
}) => {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [objective, setObjective] = useState('');
  const [hypothesis, setHypothesis] = useState('');
  const [materials, setMaterials] = useState('');
  const [procedure, setProcedure] = useState('');
  const [results, setResults] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentReport, setCurrentReport] = useState<LabReport | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const report = await generateLabReport({
        title,
        course,
        objective,
        hypothesis,
        materials: materials.split('\n').filter(m => m.trim()),
        procedure: procedure.split('\n').filter(p => p.trim()),
        results: results // This will be parsed based on the format
      });

      setCurrentReport(report);
      onReportGenerated?.(report);
    } catch (error) {
      console.error('Error generating lab report:', error);
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Lab Report Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Experiment Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter experiment title"
                />
              </div>

              <div>
                <Label htmlFor="course">Course</Label>
                <Input
                  id="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="Enter course name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="objective">Objective</Label>
              <Textarea
                id="objective"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="What is the purpose of this experiment?"
              />
            </div>

            <div>
              <Label htmlFor="hypothesis">Hypothesis</Label>
              <Textarea
                id="hypothesis"
                value={hypothesis}
                onChange={(e) => setHypothesis(e.target.value)}
                placeholder="What do you expect to happen?"
              />
            </div>

            <div>
              <Label htmlFor="materials">Materials (one per line)</Label>
              <Textarea
                id="materials"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                placeholder="List all materials used"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="procedure">Procedure (steps, one per line)</Label>
              <Textarea
                id="procedure"
                value={procedure}
                onChange={(e) => setProcedure(e.target.value)}
                placeholder="List the steps of your experiment"
                rows={6}
              />
            </div>

            <div>
              <Label htmlFor="results">Results</Label>
              <Textarea
                id="results"
                value={results}
                onChange={(e) => setResults(e.target.value)}
                placeholder="Enter your experimental results"
                rows={6}
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!title || !objective || isGenerating}
              className="w-full"
            >
              {isGenerating ? 'Generating...' : 'Generate Lab Report'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {currentReport && (
        <Card>
          <CardHeader>
            <CardTitle>{currentReport.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="report">
              <TabsList>
                <TabsTrigger value="report">Full Report</TabsTrigger>
                <TabsTrigger value="sections">By Section</TabsTrigger>
                <TabsTrigger value="figures">Figures & Tables</TabsTrigger>
              </TabsList>

              <TabsContent value="report">
                <div className="space-y-6">
                  {currentReport.sections.map((section) => (
                    <ReportSection key={section.id} section={section} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sections">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentReport.sections.map((section) => (
                    <Card key={section.id}>
                      <CardHeader>
                        <CardTitle>{section.content.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{section.content.text.substring(0, 200)}...</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="figures">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentReport.sections.flatMap(section =>
                    (section.content.figures || []).map(figure => (
                      <Card key={figure.id}>
                        <CardContent className="p-4">
                          <div className="aspect-video bg-secondary rounded-lg mb-2" />
                          <h4 className="font-semibold">{figure.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {figure.caption}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const ReportSection: React.FC<{ section: LabReportSection }> = ({ section }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{section.content.title}</h3>
      <div className="prose prose-sm max-w-none">
        <p>{section.content.text}</p>

        {section.content.tables && section.content.tables.length > 0 && (
          <div className="my-4">
            {section.content.tables.map(table => (
              <div key={table.id} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">{table.title}</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        {table.headers.map((header, i) => (
                          <th key={i} className="px-4 py-2 text-left">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j} className="px-4 py-2">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {table.caption && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {table.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {section.content.equations && section.content.equations.length > 0 && (
          <div className="my-4 space-y-2">
            {section.content.equations.map(equation => (
              <div key={equation.id} className="bg-secondary p-4 rounded-lg">
                <code>{equation.latex}</code>
                {equation.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {equation.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
