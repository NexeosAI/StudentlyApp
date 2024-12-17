import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAI } from '@/hooks/use-ai'
import { Card } from '@/components/ui/card'
import { Loader2, Plus, Download } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'

interface MindMapNode {
  id: string
  text: string
  children: MindMapNode[]
}

const layoutNodes = (node: MindMapNode, x = 0, y = 0, level = 0): Node[] => {
  const nodes: Node[] = [
    {
      id: node.id,
      position: { x, y },
      data: { label: node.text },
      type: 'default',
    },
  ]

  const childSpacing = 200
  const levelSpacing = 100
  const childrenCount = node.children.length
  const totalWidth = (childrenCount - 1) * childSpacing
  let startX = x - totalWidth / 2

  node.children.forEach((child, index) => {
    const childX = startX + index * childSpacing
    const childY = y + levelSpacing
    nodes.push(...layoutNodes(child, childX, childY, level + 1))
  })

  return nodes
}

const createEdges = (node: MindMapNode): Edge[] => {
  const edges: Edge[] = []
  node.children.forEach(child => {
    edges.push({
      id: `${node.id}-${child.id}`,
      source: node.id,
      target: child.id,
      type: 'smoothstep',
    })
    edges.push(...createEdges(child))
  })
  return edges
}

export default function MindMapCreatorPage() {
  const [topic, setTopic] = useState('')
  const [content, setContent] = useState('')
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      const mindMap = JSON.parse(response) as MindMapNode
      const newNodes = layoutNodes(mindMap)
      const newEdges = createEdges(mindMap)
      setNodes(newNodes)
      setEdges(newEdges)
    },
  })

  const handleGenerate = async () => {
    if (!content.trim() || isLoading) return

    const prompt = `
      Create a mind map about ${topic}. Use this content:
      "${content}"
      
      Generate the mind map in this JSON format:
      {
        "id": "root",
        "text": "main topic",
        "children": [
          {
            "id": "unique-id",
            "text": "subtopic",
            "children": []
          }
        ]
      }
      
      Create a comprehensive mind map with multiple levels of subtopics.
      Each node should have a unique ID and meaningful text.
      Keep the text concise but informative.
    `

    await generateResponse(prompt, 'You are an expert in creating educational mind maps.')
  }

  const exportMindMap = () => {
    const data = {
      nodes,
      edges,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${topic.replace(/\s+/g, '-')}-mindmap.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Mind Map Creator"
        description="Generate visual mind maps from your study material"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter the main topic"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Study Material</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your study material or notes here..."
              className="min-h-[200px]"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Generate Mind Map
            </Button>

            {nodes.length > 0 && (
              <Button
                variant="outline"
                onClick={exportMindMap}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>

          {nodes.length > 0 && (
            <Card className="w-full h-[600px] mt-6">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
              >
                <Background />
                <Controls />
              </ReactFlow>
            </Card>
          )}
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
