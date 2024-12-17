import { useState } from 'react'
import { ToolContainer } from '@/components/ui/tool-container'
import { ToolErrorBoundary } from '@/components/ui/tool-error-boundary'
import { useAI } from '@/hooks/use-ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, Copy, Plus, Trash2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'

interface Citation {
  id: string
  title: string
  authors: string[]
  year: string
  source: string
  url?: string
  doi?: string
  type: string
  formattedCitations: {
    apa: string
    mla: string
    chicago: string
    harvard: string
  }
}

export default function CitationManagerPage() {
  const [citations, setCitations] = useState<Citation[]>([])
  const [newCitation, setNewCitation] = useState({
    title: '',
    authors: '',
    year: '',
    source: '',
    url: '',
    doi: '',
    type: 'article',
  })

  const { generateResponse, isLoading } = useAI({
    onSuccess: (response) => {
      const formattedCitations = JSON.parse(response)
      const citation: Citation = {
        id: Date.now().toString(),
        title: newCitation.title,
        authors: newCitation.authors.split(',').map(a => a.trim()),
        year: newCitation.year,
        source: newCitation.source,
        url: newCitation.url,
        doi: newCitation.doi,
        type: newCitation.type,
        formattedCitations,
      }
      setCitations([...citations, citation])
      setNewCitation({
        title: '',
        authors: '',
        year: '',
        source: '',
        url: '',
        doi: '',
        type: 'article',
      })
    },
  })

  const handleAddCitation = async () => {
    if (!newCitation.title || !newCitation.authors || !newCitation.year || isLoading) return

    const prompt = `
      Format the following citation in different styles:
      Title: ${newCitation.title}
      Authors: ${newCitation.authors}
      Year: ${newCitation.year}
      Source: ${newCitation.source}
      URL: ${newCitation.url}
      DOI: ${newCitation.doi}
      Type: ${newCitation.type}

      Return the formatted citations in this JSON format:
      {
        "apa": "APA style citation",
        "mla": "MLA style citation",
        "chicago": "Chicago style citation",
        "harvard": "Harvard style citation"
      }

      Ensure each citation follows the latest guidelines for each style.
    `

    await generateResponse(prompt, 'You are an expert in academic citation styles and formatting.')
  }

  const handleCopyCitation = (citation: string) => {
    navigator.clipboard.writeText(citation)
    toast.success('Citation copied to clipboard')
  }

  const handleDeleteCitation = (id: string) => {
    setCitations(citations.filter(c => c.id !== id))
    toast.success('Citation deleted')
  }

  return (
    <ToolErrorBoundary>
      <ToolContainer
        title="Citation Manager"
        description="Generate and manage citations in different styles"
      >
        <div className="space-y-6">
          <Card className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newCitation.title}
                  onChange={(e) => setNewCitation({ ...newCitation, title: e.target.value })}
                  placeholder="Enter source title"
                />
              </div>

              <div>
                <Label htmlFor="authors">Authors</Label>
                <Input
                  id="authors"
                  value={newCitation.authors}
                  onChange={(e) => setNewCitation({ ...newCitation, authors: e.target.value })}
                  placeholder="Enter authors (comma-separated)"
                />
              </div>

              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={newCitation.year}
                  onChange={(e) => setNewCitation({ ...newCitation, year: e.target.value })}
                  placeholder="Publication year"
                />
              </div>

              <div>
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  value={newCitation.source}
                  onChange={(e) => setNewCitation({ ...newCitation, source: e.target.value })}
                  placeholder="Journal/Book/Website name"
                />
              </div>

              <div>
                <Label htmlFor="url">URL (optional)</Label>
                <Input
                  id="url"
                  value={newCitation.url}
                  onChange={(e) => setNewCitation({ ...newCitation, url: e.target.value })}
                  placeholder="Source URL"
                />
              </div>

              <div>
                <Label htmlFor="doi">DOI (optional)</Label>
                <Input
                  id="doi"
                  value={newCitation.doi}
                  onChange={(e) => setNewCitation({ ...newCitation, doi: e.target.value })}
                  placeholder="Digital Object Identifier"
                />
              </div>

              <div>
                <Label>Source Type</Label>
                <Select
                  value={newCitation.type}
                  onValueChange={(value) => setNewCitation({ ...newCitation, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Journal Article</SelectItem>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="chapter">Book Chapter</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="conference">Conference Paper</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Button
                  onClick={handleAddCitation}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Add Citation
                </Button>
              </div>
            </div>
          </Card>

          {citations.length > 0 && (
            <Card className="p-4">
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead>Citation Styles</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {citations.map((citation) => (
                      <TableRow key={citation.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{citation.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {citation.authors.join(', ')} ({citation.year})
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            {Object.entries(citation.formattedCitations).map(([style, text]) => (
                              <div key={style} className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium uppercase">
                                  {style}:
                                </span>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm">{text}</p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCopyCitation(text)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCitation(citation.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </Card>
          )}
        </div>
      </ToolContainer>
    </ToolErrorBoundary>
  )
}
