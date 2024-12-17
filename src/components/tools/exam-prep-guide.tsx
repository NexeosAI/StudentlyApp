import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ExamPrepGuide, ExamTopic } from '@/lib/types/exam-prep';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ExamPrepGuideProps {
  guide: ExamPrepGuide;
  onComplete?: (topicName: string) => void;
}

export const ExamPrepGuideComponent: React.FC<ExamPrepGuideProps> = ({ guide, onComplete }) => {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const handleTopicComplete = (topicName: string) => {
    const newCompletedTopics = new Set(completedTopics);
    newCompletedTopics.add(topicName);
    setCompletedTopics(newCompletedTopics);
    onComplete?.(topicName);
  };

  const progress = Math.round((completedTopics.size / guide.topics.length) * 100);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{guide.subject}</CardTitle>
            <CardDescription>
              Estimated study time: {guide.estimatedStudyTime}
            </CardDescription>
          </div>
          <Badge variant={guide.difficulty === 'Advanced' ? 'destructive' : 
                        guide.difficulty === 'Intermediate' ? 'secondary' : 'default'}>
            {guide.difficulty}
          </Badge>
        </div>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground mt-2">
          {completedTopics.size} of {guide.topics.length} topics completed ({progress}%)
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <TopicOverview 
              topics={guide.topics} 
              completedTopics={completedTopics}
              onTopicSelect={setActiveTopicIndex}
              activeTopicIndex={activeTopicIndex}
            />
          </TabsContent>

          <TabsContent value="resources">
            <ResourcesList 
              topic={guide.topics[activeTopicIndex]}
              onComplete={() => handleTopicComplete(guide.topics[activeTopicIndex].name)}
            />
          </TabsContent>

          <TabsContent value="practice">
            <PracticeQuestions 
              topic={guide.topics[activeTopicIndex]}
              onComplete={() => handleTopicComplete(guide.topics[activeTopicIndex].name)}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const TopicOverview: React.FC<{
  topics: ExamTopic[];
  completedTopics: Set<string>;
  onTopicSelect: (index: number) => void;
  activeTopicIndex: number;
}> = ({ topics, completedTopics, onTopicSelect, activeTopicIndex }) => {
  return (
    <ScrollArea className="h-[400px] pr-4">
      {topics.map((topic, index) => (
        <div
          key={topic.name}
          className={`p-4 mb-4 rounded-lg border cursor-pointer transition-colors
            ${index === activeTopicIndex ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
          onClick={() => onTopicSelect(index)}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{topic.name}</h3>
            {completedTopics.has(topic.name) && (
              <Badge variant="secondary">Completed</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{topic.description}</p>
        </div>
      ))}
    </ScrollArea>
  );
};

const ResourcesList: React.FC<{
  topic: ExamTopic;
  onComplete: () => void;
}> = ({ topic, onComplete }) => {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {topic.resources.map((resource, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
                <Badge>{resource.type}</Badge>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-muted-foreground">
                  Estimated time: {resource.estimatedTime}
                </span>
                {resource.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      Open Resource
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        <Button onClick={onComplete} className="w-full">
          Mark Resources as Completed
        </Button>
      </div>
    </ScrollArea>
  );
};

const PracticeQuestions: React.FC<{
  topic: ExamTopic;
  onComplete: () => void;
}> = ({ topic, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const question = topic.practiceQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === topic.practiceQuestions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentQuestion(prev => prev + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg">
        <div className="flex justify-between mb-4">
          <Badge variant={
            question.difficulty === 'Hard' ? 'destructive' :
            question.difficulty === 'Medium' ? 'secondary' : 'default'
          }>
            {question.difficulty}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {topic.practiceQuestions.length}
          </span>
        </div>
        
        <h3 className="font-semibold mb-4">{question.question}</h3>
        
        {question.options ? (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "secondary" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">This is an open-ended question.</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {showAnswer && (
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Correct Answer</h4>
              <p>{question.correctAnswer}</p>
              <h4 className="font-semibold mt-4 mb-2">Explanation</h4>
              <p>{question.explanation}</p>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setShowAnswer(true)}
            disabled={showAnswer}
          >
            Show Answer
          </Button>
          <Button onClick={handleNext}>
            {isLastQuestion ? 'Complete Practice' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamPrepGuideComponent;
