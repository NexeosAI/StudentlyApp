import { useState } from 'react'
import { useAIProviderStore } from '@/lib/store/ai-provider-store'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Download, Search } from 'lucide-react'

export default function AuditLogPage() {
  const { auditLog } = useAIProviderStore()
  const [filterType, setFilterType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLogs = auditLog
    .filter((log) => {
      if (filterType === 'all') return true
      return log.entityType === filterType
    })
    .filter((log) => {
      if (!searchQuery) return true
      return (
        log.entityId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.entityType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'Action', 'Entity Type', 'Entity ID', 'User ID', 'Changes'],
      ...filteredLogs.map((log) => [
        log.timestamp.toISOString(),
        log.action,
        log.entityType,
        log.entityId,
        log.userId,
        JSON.stringify(log.changes),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-log-${new Date().toISOString()}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Audit Log</h2>
          <p className="text-muted-foreground">
            Track all changes to AI provider configurations
          </p>
        </div>
        <Button onClick={exportLogs}>
          <Download className="mr-2 h-4 w-4" />
          Export Log
        </Button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="provider">Providers</SelectItem>
            <SelectItem value="model">Models</SelectItem>
            <SelectItem value="mapping">Mappings</SelectItem>
            <SelectItem value="budget">Budget Alerts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity Type</TableHead>
              <TableHead>Entity ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Changes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  {log.timestamp.toLocaleString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      log.action === 'create'
                        ? 'bg-green-100 text-green-700'
                        : log.action === 'update'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {log.action}
                  </span>
                </TableCell>
                <TableCell className="capitalize">{log.entityType}</TableCell>
                <TableCell className="font-mono text-sm">
                  {log.entityId}
                </TableCell>
                <TableCell>{log.userId}</TableCell>
                <TableCell>
                  <pre className="text-xs overflow-auto max-w-xs">
                    {JSON.stringify(log.changes, null, 2)}
                  </pre>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
