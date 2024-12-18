import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { useAIProvider } from '../../../lib/store/ai-provider-store'
import { Download, Search, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'

export default function AuditPage() {
  const { auditLog } = useAIProvider()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredLogs = auditLog
    .filter((log) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        return (
          log.action.toLowerCase().includes(searchLower) ||
          log.entityType.toLowerCase().includes(searchLower) ||
          log.details?.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
    .filter((log) => {
      if (filterType === 'all') return true
      return log.action === filterType
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  const getStatusIcon = (action: string) => {
    switch (action) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <XCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />
    }
  }

  const handleExport = () => {
    const csvContent = [
      ['Timestamp', 'Action', 'Entity Type', 'Entity ID', 'Details'].join(','),
      ...filteredLogs.map((log) =>
        [
          log.timestamp.toISOString(),
          log.action,
          log.entityType,
          log.entityId,
          log.details || '',
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `audit-log-${new Date().toISOString()}.csv`
    link.click()
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Audit Log</h1>
        <Button onClick={handleExport} className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search audit logs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="error">Errors</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            A detailed log of all AI provider-related activities and system events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 rounded-lg border p-4"
              >
                <div className="mt-1">{getStatusIcon(log.action)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {log.action.charAt(0).toUpperCase() + log.action.slice(1)}{' '}
                      {log.entityType}
                    </p>
                    <time className="text-sm text-muted-foreground">
                      {log.timestamp.toLocaleString()}
                    </time>
                  </div>
                  {log.details && (
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                  )}
                </div>
              </div>
            ))}
            {filteredLogs.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No audit logs found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
