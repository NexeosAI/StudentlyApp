export interface ExamPrepGuide {
  subject: string;
  topics: ExamTopic[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedStudyTime: string;
  lastUpdated: Date;
}

export interface ExamTopic {
  name: string;
  description: string;
  keyPoints: string[];
  resources: StudyResource[];
  practiceQuestions: PracticeQuestion[];
}

export interface StudyResource {
  title: string;
  type: 'Video' | 'Article' | 'Book' | 'Exercise';
  url?: string;
  description: string;
  estimatedTime: string;
}

export interface PracticeQuestion {
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
