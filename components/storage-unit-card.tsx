"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Thermometer, Package, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface StorageUnitCardProps {
  id: string
  name: string
  type: "cold" | "general"
  temperature?: string
  capacity: string
  status: string
  contents?: Array<{
    id: string
    name: string
    quantity: number
    unit: string
    entryDate: string
    expiryDate: string
  }>
  lastUpdated?: string
  className?: string
}

export function StorageUnitCard({
  id,
  name,
  type,
  temperature,
  capacity,
  status,
  contents,
  lastUpdated,
  className,
}: StorageUnitCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Parse capacity percentage
  const capacityValue = Number.parseInt(capacity.replace("%", ""), 10)

  // Determine status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "bg-success/20 text-success"
      case "warning":
        return "bg-warning/20 text-warning-foreground"
      case "danger":
      case "error":
        return "bg-destructive/20 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  // Determine progress bar color
  const getProgressColor = (value: number, type: "cold" | "general") => {
    if (value >= 90) return "bg-destructive"
    if (value >= 75) return "bg-warning"
    return type === "cold" ? "bg-cold-storage" : "bg-general-storage"
  }

  return (
    <>
      <Card className={cn("relative overflow-hidden transition-all duration-200 hover:shadow-md group", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{name}</CardTitle>
          <Badge className={cn(getStatusColor(status))}>{status}</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {type === "cold" ? (
                  <Thermometer className="mr-2 h-4 w-4 text-cold-storage" aria-hidden="true" />
                ) : (
                  <Package className="mr-2 h-4 w-4 text-general-storage" aria-hidden="true" />
                )}
                <span className="text-sm font-medium">{type === "cold" ? "Cold Storage" : "General Storage"}</span>
              </div>
              <span className="text-sm text-muted-foreground">{capacity} full</span>
            </div>

            {type === "cold" && temperature && (
              <div className="text-sm text-muted-foreground flex items-center">
                <Thermometer className="mr-1 h-3 w-3" aria-hidden="true" />
                <span>Temperature: {temperature}</span>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Capacity</span>
                <span>{capacity}</span>
              </div>
              <Progress
                value={capacityValue}
                className="h-2"
                indicatorClassName={getProgressColor(capacityValue, type)}
                aria-label={`Storage capacity: ${capacity}`}
              />
            </div>

            {lastUpdated && <div className="text-xs text-muted-foreground">Last updated: {lastUpdated}</div>}

            <div className="flex justify-between items-center pt-2">
              <Button variant="outline" size="sm" className="text-xs" onClick={() => setIsDialogOpen(true)}>
                View Details
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-6 w-6 rounded-full"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-controls={`contents-${id}`}
                aria-label={isExpanded ? "Hide contents" : "Show contents"}
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {isExpanded && (
            <div id={`contents-${id}`} className="mt-4 pt-4 border-t animate-slide-in">
              <h4 className="text-sm font-semibold mb-2">Contents:</h4>
              {contents && contents.length > 0 ? (
                <ul className="text-sm space-y-1">
                  {contents.slice(0, 3).map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">
                        {item.quantity} {item.unit}
                      </span>
                    </li>
                  ))}
                  {contents.length > 3 && (
                    <li className="text-muted-foreground text-xs italic">... and {contents.length - 3} more items</li>
                  )}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No items in storage</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>
              {type === "cold" ? "Cold Storage" : "General Storage"} • {capacity} capacity
              {temperature && ` • Temperature: ${temperature}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Storage Details</h3>
                <dl className="grid grid-cols-2 gap-1 text-sm">
                  <dt className="text-muted-foreground">ID:</dt>
                  <dd>{id}</dd>
                  <dt className="text-muted-foreground">Type:</dt>
                  <dd>{type === "cold" ? "Cold Storage" : "General Storage"}</dd>
                  <dt className="text-muted-foreground">Status:</dt>
                  <dd>
                    <Badge className={cn("mt-0.5", getStatusColor(status))}>{status}</Badge>
                  </dd>
                  <dt className="text-muted-foreground">Capacity:</dt>
                  <dd>{capacity}</dd>
                  {temperature && (
                    <>
                      <dt className="text-muted-foreground">Temperature:</dt>
                      <dd>{temperature}</dd>
                    </>
                  )}
                  {lastUpdated && (
                    <>
                      <dt className="text-muted-foreground">Last Updated:</dt>
                      <dd>{lastUpdated}</dd>
                    </>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Capacity Usage</h3>
                <div className="space-y-2">
                  <Progress
                    value={capacityValue}
                    className="h-3"
                    indicatorClassName={getProgressColor(capacityValue, type)}
                  />
                  <p className="text-sm text-center">{capacity} of storage space used</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Contents</h3>
              {contents && contents.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Entry Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contents.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell>{item.entryDate}</TableCell>
                        <TableCell>{item.expiryDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No items in storage</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

