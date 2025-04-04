"use client"

import { useState } from "react"
import { Plus, Search, Download, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StorageUnitCard } from "@/components/storage-unit-card"
import { ColdStorageStats } from "@/components/cold-storage-stats"
import { AddStorageDialog } from "@/components/add-storage-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TemperatureChart } from "@/components/temperature-chart"

export function ColdStorageDashboard() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Cold Storage</h2>
          <p className="text-muted-foreground">Manage and monitor your cold storage units.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search cold storage..." className="w-full pl-8" />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Cold Storage
          </Button>
        </div>
      </div>

      <ColdStorageStats />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-4 text-lg font-medium">Temperature Trends</h3>
          <TemperatureChart />
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
          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
            Capacity chart will be displayed here
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Cold Storage Units</h3>
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
              <SelectItem value="temperature">Temperature</SelectItem>
              <SelectItem value="capacity">Capacity</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StorageUnitCard
          id="cold-1"
          name="Cold Room A"
          type="cold"
          temperature="-18°C"
          capacity="75%"
          status="normal"
          lastUpdated="10 minutes ago"
        />
        <StorageUnitCard
          id="cold-2"
          name="Cold Room B"
          type="cold"
          temperature="-5°C"
          capacity="92%"
          status="warning"
          lastUpdated="5 minutes ago"
        />
        <StorageUnitCard
          id="cold-3"
          name="Cold Room C"
          type="cold"
          temperature="-22°C"
          capacity="60%"
          status="normal"
          lastUpdated="12 minutes ago"
        />
        <StorageUnitCard
          id="cold-4"
          name="Freezer Unit 1"
          type="cold"
          temperature="-25°C"
          capacity="45%"
          status="normal"
          lastUpdated="15 minutes ago"
        />
        <StorageUnitCard
          id="cold-5"
          name="Freezer Unit 2"
          type="cold"
          temperature="-28°C"
          capacity="30%"
          status="normal"
          lastUpdated="20 minutes ago"
        />
      </div>

      <AddStorageDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} initialTab="cold" />
    </div>
  )
}

