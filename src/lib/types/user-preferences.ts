export type WritingTone =
  | 'formal'
  | 'casual'
  | 'academic'
  | 'professional'
  | 'friendly'
  | 'technical'

export type WritingStyle = {
  tone: WritingTone
  academicLevel: 'high_school' | 'undergraduate' | 'graduate' | 'phd'
  preferredCitationStyle: 'APA' | 'MLA' | 'Chicago' | 'Harvard'
  languagePreferences: {
    useAmericanEnglish: boolean
    simplifyLanguage: boolean
    technicalTerminology: boolean
  }
  customPreferences: {
    wordCount: {
      preferredMinimum: number
      preferredMaximum: number
    }
    avoidWords: string[]
    preferredWords: string[]
  }
}

export type UserPreferences = {
  writingStyle: WritingStyle
  lastUpdated: string
}
