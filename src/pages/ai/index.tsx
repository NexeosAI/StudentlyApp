import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Chat } from '@/components/ai/chat'
import { ContentGenerator } from '@/components/ai/content-generator'

export default function AITools() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">AI Learning Assistant</h1>

      <Tabs defaultValue="chat" className="h-[calc(100vh-200px)]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="generate">Content Generator</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="h-full">
          <Chat />
        </TabsContent>
        <TabsContent value="generate">
          <ContentGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
