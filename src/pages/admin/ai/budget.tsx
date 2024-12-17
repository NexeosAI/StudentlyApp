import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function BudgetAlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Budget Alerts</h2>
        <p className="text-muted-foreground">Configure budget thresholds and alerts</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>Current budget thresholds and notification settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert Name</TableHead>
                  <TableHead>Threshold</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Daily Limit</TableCell>
                  <TableCell>$500</TableCell>
                  <TableCell>24 hours</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </TableCell>
                  <TableCell>
                    <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Weekly Warning</TableCell>
                  <TableCell>$2,000</TableCell>
                  <TableCell>7 days</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                      Warning
                    </span>
                  </TableCell>
                  <TableCell>
                    <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
            <CardDescription>Current month's budget status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Budget Used</div>
                <div className="text-2xl font-bold">$3,450</div>
                <div className="text-xs text-muted-foreground">of $5,000 monthly limit</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Days Remaining</div>
                <div className="text-2xl font-bold">14</div>
                <div className="text-xs text-muted-foreground">in current period</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Projected Usage</div>
                <div className="text-2xl font-bold">$4,830</div>
                <div className="text-xs text-muted-foreground">by end of month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
