export interface StudyPattern {
  preferredTimes: string[];
  averageSessionDuration: number; // in minutes
  frequentSubjects: string[];
  breakPatterns: {
    frequency: number; // breaks per hour
    averageDuration: number; // in minutes
  };
  productivity: {
    peakHours: string[];
    lowEnergyPeriods: string[];
  };
  distractions: string[];
  completionRates: {
    [subjectId: string]: number; // percentage
  };
}

export interface LearningStyle {
  primary: 'visual' | 'auditory' | 'reading/writing' | 'kinesthetic';
  secondary?: 'visual' | 'auditory' | 'reading/writing' | 'kinesthetic';
  strengths: string[];
  challenges: string[];
  recommendedStrategies: string[];
}

export interface KnowledgeGap {
  subject: string;
  topic: string;
  subtopics: string[];
  severity: 'minor' | 'moderate' | 'significant';
  relatedConcepts: string[];
  recommendedResources: ResourceRecommendation[];
}

export interface ResourceRecommendation {
  title: string;
  type: 'video' | 'article' | 'exercise' | 'book' | 'interactive';
  url: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  matchScore: number; // 0-100
  tags: string[];
  prerequisites?: string[];
}

export interface StudyAnalysis {
  userId: string;
  timestamp: Date;
  patterns: StudyPattern;
  learningStyle: LearningStyle;
  knowledgeGaps: KnowledgeGap[];
  overallProgress: {
    completedTopics: number;
    totalTopics: number;
    averageScore: number;
    timeInvested: number; // in hours
  };
  recommendations: {
    immediate: ResourceRecommendation[];
    shortTerm: ResourceRecommendation[];
    longTerm: ResourceRecommendation[];
  };
}
