"use client"

import { useState } from "react"
import { Plus, Search, Filter, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StorageUnitCard } from "@/components/storage-unit-card"
import { GeneralStorageStats } from "@/components/general-storage-stats"
import { AddStorageDialog } from "@/components/add-storage-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CapacityChart } from "@/components/capacity-chart"

export function GeneralStorageDashboard() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">General Storage</h2>
          <p className="text-muted-foreground">Manage your general storage units and warehouse sections.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search general storage..." className="w-full pl-8" />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add General Storage
          </Button>
        </div>
      </div>

      <GeneralStorageStats />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-4 text-lg font-medium">Storage Type Distribution</h3>
          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
            Storage type distribution chart will be displayed here
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-4 text-lg font-medium">Capacity Utilization</h3>
          <div className="flex items-center justify-between mb-4">
            <Select defaultValue="week">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Last 24 hours</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <CapacityChart />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">General Storage Units</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Select defaultValue="name">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="capacity">Capacity</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StorageUnitCard
          id="general-1"
          name="Warehouse Section 1"
          type="general"
          capacity="45%"
          status="normal"
          lastUpdated="15 minutes ago"
        />
        <StorageUnitCard
          id="general-2"
          name="Warehouse Section 2"
          type="general"
          capacity="30%"
          status="normal"
          lastUpdated="20 minutes ago"
        />
        <StorageUnitCard
          id="general-3"
          name="Warehouse Section 3"
          type="general"
          capacity="88%"
          status="warning"
          lastUpdated="8 minutes ago"
        />
        <StorageUnitCard
          id="general-4"
          name="Bulk Storage Area"
          type="general"
          capacity="65%"
          status="normal"
          lastUpdated="25 minutes ago"
        />
        <StorageUnitCard
          id="general-5"
          name="Container Storage"
          type="general"
          capacity="50%"
          status="normal"
          lastUpdated="30 minutes ago"
        />
      </div>

      <AddStorageDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} initialTab="general" />
    </div>
  )
}

