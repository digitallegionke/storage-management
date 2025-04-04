"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample alerts data
const alertsData = [
  {
    id: "ALT001",
    timestamp: "2023-11-10 08:15:23",
    type: "Temperature",
    message: "Cold Room B temperature above threshold",
    status: "Active",
    location: "Cold Room B",
  },
  {
    id: "ALT002",
    timestamp: "2023-11-09 14:30:45",
    type: "Capacity",
    message: "Warehouse Section 3 approaching capacity limit",
    status: "Active",
    location: "Warehouse Section 3",
  },
  {
    id: "ALT003",
    timestamp: "2023-11-08 10:22:18",
    type: "Inventory",
    message: "Dairy Products inventory low",
    status: "Resolved",
    location: "Cold Room C",
  },
  {
    id: "ALT004",
    timestamp: "2023-11-07 16:45:32",
    type: "Temperature",
    message: "Cold Room A temperature fluctuation",
    status: "Resolved",
    location: "Cold Room A",
  },
  {
    id: "ALT005",
    timestamp: "2023-11-06 09:12:55",
    type: "System",
    message: "Scheduled maintenance completed",
    status: "Resolved",
    location: "All Units",
  },
  {
    id: "ALT006",
    timestamp: "2023-11-05 11:30:20",
    type: "Capacity",
    message: "Bulk Storage Area capacity warning",
    status: "Resolved",
    location: "Bulk Storage Area",
  },
  {
    id: "ALT007",
    timestamp: "2023-11-04 13:25:10",
    type: "Inventory",
    message: "Cleaning Supplies inventory low",
    status: "Resolved",
    location: "Warehouse Section 3",
  },
]

interface AlertsHistoryTableProps {
  limit?: number
}

export function AlertsHistoryTable({ limit }: AlertsHistoryTableProps) {
  const displayAlerts = limit ? alertsData.slice(0, limit) : alertsData

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayAlerts.map((alert) => (
          <TableRow key={alert.id}>
            <TableCell className="font-medium">{alert.id}</TableCell>
            <TableCell>{alert.timestamp}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  alert.type === "Temperature"
                    ? "border-blue-500 text-blue-500"
                    : alert.type === "Capacity"
                      ? "border-amber-500 text-amber-500"
                      : alert.type === "Inventory"
                        ? "border-purple-500 text-purple-500"
                        : "border-gray-500 text-gray-500"
                }
              >
                {alert.type}
              </Badge>
            </TableCell>
            <TableCell>{alert.message}</TableCell>
            <TableCell>{alert.location}</TableCell>
            <TableCell>
              <Badge variant={alert.status === "Active" ? "destructive" : "secondary"}>{alert.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

