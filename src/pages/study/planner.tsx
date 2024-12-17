import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAI } from '@/hooks/use-ai'
import { Card } from '@/components/ui/card'
import { Loader2, Plus, Download, Calendar } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'

interface StudySession {
  topic: string
  duration: number // in minutes
  priority: 'high' | 'medium' | 'low'
  activities: {
    type: string
    description: string
    duration: number
  }[]
  resources: string[]
}

interface StudyDay {
  date: string
  sessions: StudySession[]
  totalHours: number
}

interface StudyPlan {
  days: StudyDay[]
  goals: string[]
  recommendations: string[]
}

export default function StudyPlannerPage() {
  const [subjects, setSubjects] = useState('')
  const [goals, setGoals] = useState('')
  const [duration, setDuration] = useState('7') // days
  const [hoursPerDay, setHoursPerDay] = useState('4')
  const [plan, setPlan] = useState<StudyPlan | null>(null)

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      const planData = JSON.parse(response) as StudyPlan
      setPlan(planData)
    },
  })

  const handleGenerate = async () => {
    if (!subjects || !goals || isLoading) return

    const prompt = `
      Create a ${duration}-day study plan for the following subjects:
      ${subjects}

      Goals:
      ${goals}

      Available study time: ${hoursPerDay} hours per day

      Generate a study plan in this JSON format:
      {
        "days": [
          {
            "date": "YYYY-MM-DD",
            "sessions": [
              {
                "topic": "specific topic",
                "duration": minutes,
                "priority": "high|medium|low",
                "activities": [
                  {
                    "type": "activity type",
                    "description": "detailed description",
                    "duration": minutes
                  }
                ],
                "resources": ["recommended resources"]
              }
            ],
            "totalHours": total_hours
          }
        ],
        "goals": ["specific learning goals"],
        "recommendations": ["study tips and recommendations"]
      }

      Include varied study activities like reading, practice, review, etc.
      Ensure the plan is realistic and includes breaks.
      Prioritize topics based on importance and complexity.
    `

    await generateResponse(prompt, 'You are an expert study planner and educational consultant.')
  }

  const exportPlan = () => {
    if (!plan) return
    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'study-plan.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Study Planner"
        description="Generate a personalized study plan based on your goals"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subjects">Subjects/Topics</Label>
            <Textarea
              id="subjects"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              placeholder="List the subjects or topics you need to study..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Study Goals</Label>
            <Textarea
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="What are your learning objectives?"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Study Duration (Days)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Days</SelectItem>
                  <SelectItem value="7">1 Week</SelectItem>
                  <SelectItem value="14">2 Weeks</SelectItem>
                  <SelectItem value="30">1 Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Hours per Day</Label>
              <Select value={hoursPerDay} onValueChange={setHoursPerDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Hours</SelectItem>
                  <SelectItem value="4">4 Hours</SelectItem>
                  <SelectItem value="6">6 Hours</SelectItem>
                  <SelectItem value="8">8 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Calendar className="h-4 w-4 mr-2" />
              )}
              Generate Study Plan
            </Button>

            {plan && (
              <Button
                variant="outline"
                onClick={exportPlan}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>

          {plan && (
            <div className="space-y-6">
              <Card className="p-4">
                <h3 className="font-medium mb-2">Learning Goals</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {plan.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </Card>

              <ScrollArea className="h-[400px] pr-4">
                {plan.days.map((day, dayIndex) => (
                  <Card key={dayIndex} className="p-4 mb-4">
                    <h3 className="font-medium mb-4">
                      Day {dayIndex + 1} - {day.date}
                      <span className="ml-2 text-muted-foreground">
                        ({day.totalHours} hours)
                      </span>
                    </h3>

                    <div className="space-y-4">
                      {day.sessions.map((session, sessionIndex) => (
                        <Card key={sessionIndex} className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{session.topic}</h4>
                            <Badge className={getPriorityColor(session.priority)}>
                              {session.priority}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">
                            Duration: {session.duration} minutes
                          </p>

                          <div className="space-y-2">
                            <h5 className="text-sm font-medium">Activities:</h5>
                            <ul className="list-disc pl-4 space-y-1">
                              {session.activities.map((activity, actIndex) => (
                                <li key={actIndex} className="text-sm">
                                  {activity.type} ({activity.duration}min) - {activity.description}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {session.resources.length > 0 && (
                            <div className="mt-2">
                              <h5 className="text-sm font-medium">Resources:</h5>
                              <ul className="list-disc pl-4 space-y-1">
                                {session.resources.map((resource, resIndex) => (
                                  <li key={resIndex} className="text-sm">
                                    {resource}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </Card>
                ))}
              </ScrollArea>

              <Card className="p-4">
                <h3 className="font-medium mb-2">Recommendations</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {plan.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </Card>
            </div>
          )}
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
