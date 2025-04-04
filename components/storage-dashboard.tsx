"use client"

import { useState } from "react"
import { BarChart3, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { StorageUnitCard } from "@/components/storage-unit-card"
import { StorageStats } from "@/components/storage-stats"
import { AddStorageDialog } from "@/components/add-storage-dialog"

export function StorageDashboard() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Storage Dashboard</h2>
          <p className="text-muted-foreground">Manage all storage units and inventory from one place.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search storage units..." className="w-full pl-8" />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Storage
          </Button>
        </div>
      </div>

      <StorageStats />

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Storage</TabsTrigger>
            <TabsTrigger value="cold">Cold Storage</TabsTrigger>
            <TabsTrigger value="general">General Storage</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
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
              id="cold-3"
              name="Cold Room C"
              type="cold"
              temperature="-22°C"
              capacity="60%"
              status="normal"
              lastUpdated="12 minutes ago"
            />
            <StorageUnitCard
              id="general-3"
              name="Warehouse Section 3"
              type="general"
              capacity="88%"
              status="warning"
              lastUpdated="8 minutes ago"
            />
          </div>
        </TabsContent>

        <TabsContent value="cold" className="space-y-4">
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
          </div>
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
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
          </div>
        </TabsContent>
      </Tabs>

      <AddStorageDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  )
}

