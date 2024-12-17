import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AIModel {
  id: string
  name: string
  provider: string
  capabilities: string[]
  maxTokens: number
  costPerToken: number
  recommendedUses: string[]
}

export type AIToolType = 'essay' | 'research' | 'notes' | 'report' | 'summary'

interface AIModelsState {
  models: AIModel[]
  toolAssignments: Record<AIToolType, string[]>
  addModel: (model: AIModel) => void
  removeModel: (modelId: string) => void
  assignModelToTool: (modelId: string, toolType: AIToolType) => void
  unassignModelFromTool: (modelId: string, toolType: AIToolType) => void
  getModelsForTool: (toolType: AIToolType) => AIModel[]
}

const initialToolAssignments: Record<AIToolType, string[]> = {
  essay: [],
  research: [],
  notes: [],
  report: [],
  summary: []
}

export const useAIModels = create<AIModelsState>()(
  persist(
    (set, get) => ({
      models: [],
      toolAssignments: initialToolAssignments,
      addModel: (model) => {
        set((state) => ({
          models: [...state.models, model]
        }))
      },
      removeModel: (modelId) => {
        set((state) => ({
          models: state.models.filter((m) => m.id !== modelId),
          toolAssignments: Object.fromEntries(
            Object.entries(state.toolAssignments).map(([tool, models]) => [
              tool,
              models.filter((id) => id !== modelId)
            ])
          ) as Record<AIToolType, string[]>
        }))
      },
      assignModelToTool: (modelId, toolType) => {
        set((state) => ({
          toolAssignments: {
            ...state.toolAssignments,
            [toolType]: [...new Set([...state.toolAssignments[toolType], modelId])]
          }
        }))
      },
      unassignModelFromTool: (modelId, toolType) => {
        set((state) => ({
          toolAssignments: {
            ...state.toolAssignments,
            [toolType]: state.toolAssignments[toolType].filter((id) => id !== modelId)
          }
        }))
      },
      getModelsForTool: (toolType) => {
        const state = get()
        const assignedIds = state.toolAssignments[toolType]
        return state.models.filter((model) => assignedIds.includes(model.id))
      }
    }),
    {
      name: 'ai-models-storage'
    }
  )
)
