import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Audit Log</h2>
        <p className="text-muted-foreground">Track AI usage and system events</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>System events and AI interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2023-12-17 19:15:23</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                      API Call
                    </span>
                  </TableCell>
                  <TableCell>john.doe@example.com</TableCell>
                  <TableCell>GPT-4</TableCell>
                  <TableCell>Essay generation request</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-12-17 19:14:45</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                      Rate Limit
                    </span>
                  </TableCell>
                  <TableCell>jane.smith@example.com</TableCell>
                  <TableCell>Claude 2</TableCell>
                  <TableCell>Rate limit warning</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-12-17 19:13:12</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      Success
                    </span>
                  </TableCell>
                  <TableCell>admin@example.com</TableCell>
                  <TableCell>GPT-3.5</TableCell>
                  <TableCell>Model configuration updated</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Summary</CardTitle>
            <CardDescription>Past 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Total Events</div>
                <div className="text-2xl font-bold">1,234</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">API Calls</div>
                <div className="text-2xl font-bold">956</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Warnings</div>
                <div className="text-2xl font-bold">45</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Errors</div>
                <div className="text-2xl font-bold">12</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
