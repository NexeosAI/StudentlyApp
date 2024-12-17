export interface Presentation {
  title: string;
  topic: string;
  slides: Slide[];
  style: PresentationStyle;
  metadata: {
    author: string;
    createdAt: Date;
    lastModified: Date;
    estimatedDuration: number; // in minutes
  };
}

export interface Slide {
  id: string;
  type: 'title' | 'content' | 'image' | 'quote' | 'chart' | 'conclusion';
  content: {
    title?: string;
    points?: string[];
    text?: string;
    imageUrl?: string;
    chartData?: any; // Will be defined based on chart library
    quote?: {
      text: string;
      author: string;
      source?: string;
    };
  };
  notes?: string;
  transition?: 'fade' | 'slide' | 'zoom';
}

export interface PresentationStyle {
  theme: 'professional' | 'academic' | 'creative' | 'minimal';
  colorScheme: string[];
  font: {
    heading: string;
    body: string;
  };
}

export interface Diagram {
  id: string;
  type: DiagramType;
  title: string;
  description: string;
  elements: DiagramElement[];
  relationships: DiagramRelationship[];
  style: DiagramStyle;
  metadata: {
    author: string;
    createdAt: Date;
    lastModified: Date;
    subject: string;
  };
}

export type DiagramType =
  | 'flowchart'
  | 'mindmap'
  | 'sequence'
  | 'class'
  | 'entity-relationship'
  | 'process'
  | 'network'
  | 'hierarchy';

export interface DiagramElement {
  id: string;
  type: 'node' | 'group' | 'text';
  content: {
    text: string;
    description?: string;
    icon?: string;
  };
  position: {
    x: number;
    y: number;
  };
  style?: {
    color?: string;
    shape?: string;
    size?: number;
  };
}

export interface DiagramRelationship {
  id: string;
  from: string;
  to: string;
  type: string;
  label?: string;
  style?: {
    lineStyle?: 'solid' | 'dashed' | 'dotted';
    arrowStyle?: 'none' | 'single' | 'double';
    color?: string;
  };
}

export interface DiagramStyle {
  layout: 'auto' | 'horizontal' | 'vertical' | 'circular';
  theme: 'light' | 'dark' | 'colorful';
  spacing: number;
  lineStyle: 'orthogonal' | 'curved' | 'straight';
}

// Lab Report Types
export interface LabReport {
  id: string;
  title: string;
  course: string;
  date: string;
  sections: LabReportSection[];
}

export interface LabReportSection {
  id: string;
  type: 'introduction' | 'methods' | 'results' | 'discussion' | 'conclusion';
  content: {
    title: string;
    text: string;
    figures?: Figure[];
    tables?: Table[];
    equations?: Equation[];
  };
}

export interface Figure {
  id: string;
  title: string;
  caption: string;
  imageUrl?: string;
  data?: any; // For generated charts/plots
}

export interface Table {
  id: string;
  title: string;
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface Equation {
  id: string;
  latex: string;
  description?: string;
}

// Case Study Types
export interface CaseStudy {
  id: string;
  title: string;
  subject: string;
  metadata: {
    tags: string[];
    industry?: string;
    timeframe?: string;
  };
  overview: {
    background: string;
    objectives: string[];
    keyIssues: string[];
  };
  sections: CaseStudySection[];
  analysis: {
    findings: string[];
    recommendations: string[];
    lessons: string[];
  };
}

export interface CaseStudySection {
  id: string;
  type: 'background' | 'analysis' | 'solution' | 'outcome';
  title: string;
  content: string;
  evidence?: {
    quotes?: string[];
    references?: Reference[];
  };
  questions?: DiscussionQuestion[];
}

export interface Reference {
  id: string;
  authors: string[];
  year: number;
  title: string;
  source: string;
  url?: string;
}

export interface DiscussionQuestion {
  id: string;
  type: 'critical-thinking' | 'analysis' | 'application' | 'reflection';
  text: string;
  suggestedAnswer?: string;
}
