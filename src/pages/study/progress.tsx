import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Subject {
  id: string
  name: string
  target: number
  progress: number
  history: {
    date: string
    value: number
  }[]
  activities: {
    date: string
    type: string
    description: string
    duration: number
  }[]
}

export default function ProgressTrackerPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [newSubject, setNewSubject] = useState('')
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  const addSubject = () => {
    if (!newSubject.trim()) return
    const subject: Subject = {
      id: Date.now().toString(),
      name: newSubject,
      target: 100,
      progress: 0,
      history: [],
      activities: [],
    }
    setSubjects([...subjects, subject])
    setNewSubject('')
  }

  const updateProgress = (subjectId: string, progress: number) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === subjectId) {
        const newHistory = [
          ...subject.history,
          { date: new Date().toISOString().split('T')[0], value: progress }
        ]
        return { ...subject, progress, history: newHistory }
      }
      return subject
    }))
  }

  const addActivity = (subjectId: string, activity: { type: string, description: string, duration: number }) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === subjectId) {
        const newActivities = [
          ...subject.activities,
          { ...activity, date: new Date().toISOString() }
        ]
        return { ...subject, activities: newActivities }
      }
      return subject
    }))
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Progress Tracker"
        description="Track your study progress and activities"
      >
        <div className="space-y-6">
          <Card className="p-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="newSubject">Add Subject</Label>
                <Input
                  id="newSubject"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Enter subject name"
                />
              </div>
              <Button
                onClick={addSubject}
                className="self-end"
              >
                Add Subject
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {subjects.map(subject => (
              <Card
                key={subject.id}
                className="p-4 cursor-pointer hover:bg-accent"
                onClick={() => setSelectedSubject(subject)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{subject.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    {subject.progress}%
                  </span>
                </div>
                <Progress
                  value={subject.progress}
                  className={getProgressColor(subject.progress)}
                />
              </Card>
            ))}
          </div>

          {selectedSubject && (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{selectedSubject.name}</h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedSubject(null)}
                >
                  Close
                </Button>
              </div>

              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-4">
                    <Card className="p-4">
                      <Label>Current Progress</Label>
                      <div className="flex items-center gap-4">
                        <Progress
                          value={selectedSubject.progress}
                          className={`flex-1 ${getProgressColor(selectedSubject.progress)}`}
                        />
                        <Input
                          type="number"
                          value={selectedSubject.progress}
                          onChange={(e) => updateProgress(selectedSubject.id, Number(e.target.value))}
                          className="w-20"
                          min="0"
                          max="100"
                        />
                      </div>
                    </Card>

                    <Card className="p-4">
                      <Label>Recent Activities</Label>
                      <ScrollArea className="h-[200px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Activity</TableHead>
                              <TableHead>Duration</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedSubject.activities.slice(-5).map((activity, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {new Date(activity.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{activity.description}</TableCell>
                                <TableCell>{activity.duration}min</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="progress">
                  <Card className="p-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={selectedSubject.history}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#8884d8"
                          name="Progress"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </TabsContent>

                <TabsContent value="activities">
                  <Card className="p-4">
                    <ScrollArea className="h-[400px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Duration</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedSubject.activities.map((activity, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {new Date(activity.date).toLocaleDateString()}
                              </TableCell>
                              <TableCell>{activity.type}</TableCell>
                              <TableCell>{activity.description}</TableCell>
                              <TableCell>{activity.duration}min</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </Card>
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
