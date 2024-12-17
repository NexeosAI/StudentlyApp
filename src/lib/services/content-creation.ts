import { OpenAI } from 'openai';
import { 
  Presentation, 
  Diagram, 
  LabReport, 
  CaseStudy,
  DiagramType
} from '../types/content-creation';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GeneratePresentationParams {
  topic: string;
  style?: string;
  duration?: number;
  sections?: string[];
}

export async function generatePresentation(params: GeneratePresentationParams): Promise<Presentation> {
  const prompt = `Create a presentation about:
    Topic: ${params.topic}
    Style: ${params.style || 'professional'}
    Duration: ${params.duration || 15} minutes
    Sections: ${params.sections?.join(', ') || 'standard sections'}
    
    Include:
    1. Title slide
    2. Agenda
    3. Main content sections
    4. Summary
    5. Call to action`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an AI presentation designer. Create engaging and well-structured presentations."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" }
  });

  if (!response.choices[0].message.content) {
    throw new Error('Failed to generate presentation');
  }

  return JSON.parse(response.choices[0].message.content);
}

export interface GenerateDiagramParams {
  type: DiagramType;
  elements: string[];
  relationships?: string[];
  style?: {
    theme?: string;
    layout?: string;
  };
}

export async function generateDiagram(params: GenerateDiagramParams): Promise<Diagram> {
  const prompt = `Create a ${params.type} diagram with:
    Elements: ${params.elements.join(', ')}
    Relationships: ${params.relationships?.join(', ') || 'standard relationships'}
    Theme: ${params.style?.theme || 'modern'}
    Layout: ${params.style?.layout || 'hierarchical'}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an AI diagram designer. Create clear and informative diagrams."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" }
  });

  if (!response.choices[0].message.content) {
    throw new Error('Failed to generate diagram');
  }

  return JSON.parse(response.choices[0].message.content);
}

export interface GenerateLabReportParams {
  title: string;
  course: string;
  objective: string;
  hypothesis: string;
  materials: string[];
  procedure: string[];
  results: string;
}

export async function generateLabReport(params: GenerateLabReportParams): Promise<LabReport> {
  const prompt = `Generate a detailed lab report for the following experiment:
Title: ${params.title}
Course: ${params.course}
Objective: ${params.objective}
Hypothesis: ${params.hypothesis}
Materials: ${params.materials.join('\n')}
Procedure: ${params.procedure.join('\n')}
Results: ${params.results}

Please provide a comprehensive lab report with introduction, methods, results, discussion, and conclusion sections.
Include appropriate data tables, figures, and equations where relevant.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a scientific writing assistant specializing in lab report generation.' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: "json_object" }
  });

  if (!response.choices[0].message.content) {
    throw new Error('Failed to generate lab report');
  }

  const report = JSON.parse(response.choices[0].message.content) as LabReport;
  report.id = generateId();
  report.date = new Date().toISOString().split('T')[0];

  return report;
}

export interface AnalyzeCaseStudyParams {
  title: string;
  subject: string;
  context: string;
  problem: string;
  data?: Record<string, unknown>;
}

export async function analyzeCaseStudy(params: AnalyzeCaseStudyParams): Promise<CaseStudy> {
  const prompt = `Analyze the following case study:
Title: ${params.title}
Subject: ${params.subject}
Context: ${params.context}
Problem Statement: ${params.problem}
${params.data ? `Supporting Data: ${JSON.stringify(params.data, null, 2)}` : ''}

Please provide a comprehensive analysis including:
1. Overview with background, objectives, and key issues
2. Detailed analysis of the situation
3. Key findings and recommendations
4. Discussion questions for further exploration`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a case study analysis expert specializing in providing comprehensive insights and recommendations.' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: "json_object" }
  });

  if (!response.choices[0].message.content) {
    throw new Error('Failed to analyze case study');
  }

  const analysis = JSON.parse(response.choices[0].message.content) as CaseStudy;
  analysis.id = generateId();

  return analysis;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
