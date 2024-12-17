import type { UserPreferences, WritingStyle } from '../types/user-preferences'

const DEFAULT_WRITING_STYLE: WritingStyle = {
  tone: 'professional',
  academicLevel: 'undergraduate',
  preferredCitationStyle: 'APA',
  languagePreferences: {
    useAmericanEnglish: true,
    simplifyLanguage: false,
    technicalTerminology: false,
  },
  customPreferences: {
    wordCount: {
      preferredMinimum: 500,
      preferredMaximum: 2000,
    },
    avoidWords: [],
    preferredWords: [],
  },
}

export async function getUserPreferences(userId: string): Promise<UserPreferences> {
  try {
    const response = await fetch(`/api/users/${userId}/preferences`)
    if (!response.ok) {
      throw new Error('Failed to fetch user preferences')
    }
    return await response.json()
  } catch (error) {
    // Return default preferences if none exist
    return {
      writingStyle: DEFAULT_WRITING_STYLE,
      lastUpdated: new Date().toISOString(),
    }
  }
}

export async function updateUserPreferences(
  userId: string,
  preferences: UserPreferences
): Promise<UserPreferences> {
  const response = await fetch(`/api/users/${userId}/preferences`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...preferences,
      lastUpdated: new Date().toISOString(),
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to update user preferences')
  }

  return await response.json()
}

export function getWritingStylePrompt(style: WritingStyle): string {
  const toneMap = {
    formal: 'Use formal language and maintain a professional tone',
    casual: 'Write in a relaxed, conversational style',
    academic: 'Employ scholarly language and academic conventions',
    professional: 'Maintain a business-appropriate tone',
    friendly: 'Write in a warm and approachable manner',
    technical: 'Use precise technical language and terminology',
  }

  const levelMap = {
    high_school: 'at a high school level',
    undergraduate: 'at an undergraduate college level',
    graduate: 'at a graduate school level',
    phd: 'at a doctoral level',
  }

  return `Please write in ${toneMap[style.tone]}, ${levelMap[style.academicLevel]}. 
${style.languagePreferences.useAmericanEnglish ? 'Use American English' : 'Use British English'}.
${style.languagePreferences.simplifyLanguage ? 'Use simple, clear language' : 'Use natural language complexity'}.
${style.languagePreferences.technicalTerminology ? 'Include technical terminology when appropriate' : 'Avoid technical jargon'}.
Use ${style.preferredCitationStyle} citation style when citing sources.`
}
