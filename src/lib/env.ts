export const env = {
  API_URL: import.meta.env.VITE_API_URL,
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  ANTHROPIC_API_KEY: import.meta.env.VITE_ANTHROPIC_API_KEY,
  OPENROUTER_API_KEY: import.meta.env.VITE_OPENROUTER_API_KEY,
  GROQ_API_KEY: import.meta.env.VITE_GROQ_API_KEY,
} as const

// Validate required environment variables
const requiredEnvVars = ['API_URL', 'OPENAI_API_KEY'] as const
for (const key of requiredEnvVars) {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}
