import { translations, Translations } from './translations'

type ValidationResult = {
  isValid: boolean
  missingKeys: string[]
  invalidTypes: string[]
}

function validateTranslationStructure(
  obj: any,
  reference: any,
  path: string[] = [],
  results: ValidationResult = { isValid: true, missingKeys: [], invalidTypes: [] }
): ValidationResult {
  for (const key in reference) {
    const currentPath = [...path, key]
    const pathString = currentPath.join('.')

    // Check if key exists
    if (!(key in obj)) {
      results.isValid = false
      results.missingKeys.push(pathString)
      continue
    }

    // Check type
    if (typeof reference[key] === 'object' && reference[key] !== null) {
      validateTranslationStructure(obj[key], reference[key], currentPath, results)
    } else if (typeof obj[key] !== typeof reference[key]) {
      results.isValid = false
      results.invalidTypes.push(
        `${pathString} (expected ${typeof reference[key]}, got ${typeof obj[key]})`
      )
    }
  }

  return results
}

export function validateTranslations(): Record<string, ValidationResult> {
  const results: Record<string, ValidationResult> = {}
  const referenceLocale = translations['en-GB']

  for (const locale in translations) {
    if (locale === 'en-GB') continue // Skip reference locale

    results[locale] = validateTranslationStructure(
      translations[locale],
      referenceLocale
    )
  }

  return results
}

export function logValidationResults(results: Record<string, ValidationResult>): void {
  for (const locale in results) {
    const result = results[locale]
    
    if (!result.isValid) {
      console.group(`Translation validation failed for locale: ${locale}`)
      
      if (result.missingKeys.length > 0) {
        console.warn('Missing keys:', result.missingKeys)
      }
      
      if (result.invalidTypes.length > 0) {
        console.error('Invalid types:', result.invalidTypes)
      }
      
      console.groupEnd()
    } else {
      console.info(`✓ Translations for ${locale} are valid`)
    }
  }
}
