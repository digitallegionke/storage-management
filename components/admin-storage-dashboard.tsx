"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StorageUnitCard } from "@/components/storage-unit-card"
import { AddStorageDialog } from "@/components/add-storage-dialog"

// Mock data for Kenyan Agricultural Towns and their storages
const towns = [
  {
    name: "Nakuru",
    storages: [
      {
        id: "cold-1",
        name: "Nakuru Cold Storage 1",
        type: "cold",
        temperature: "-5°C",
        capacity: "75%",
        status: "normal",
        lastUpdated: "10 minutes ago",
      },
      {
        id: "general-1",
        name: "Nakuru General Storage 1",
        type: "general",
        capacity: "60%",
        status: "normal",
        lastUpdated: "15 minutes ago",
      },
    ],
  },
  {
    name: "Kitale",
    storages: [
      {
        id: "cold-2",
        name: "Kitale Cold Storage 1",
        type: "cold",
        temperature: "-3°C",
        capacity: "80%",
        status: "warning",
        lastUpdated: "5 minutes ago",
      },
      {
        id: "general-2",
        name: "Kitale General Storage 1",
        type: "general",
        capacity: "45%",
        status: "normal",
        lastUpdated: "20 minutes ago",
      },
    ],
  },
  {
    name: "Eldoret",
    storages: [
      {
        id: "cold-3",
        name: "Eldoret Cold Storage 1",
        type: "cold",
        temperature: "-4°C",
        capacity: "70%",
        status: "normal",
        lastUpdated: "12 minutes ago",
      },
      {
        id: "general-3",
        name: "Eldoret General Storage 1",
        type: "general",
        capacity: "55%",
        status: "normal",
        lastUpdated: "18 minutes ago",
      },
    ],
  },
]

export function AdminStorageDashboard() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTowns = towns
    .map((town) => ({
      ...town,
      storages: town.storages.filter(
        (storage) =>
          storage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          town.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((town) => town.storages.length > 0)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Storage Dashboard</h2>
          <p className="text-muted-foreground">Manage storage units across Kenyan Agricultural Towns.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search towns or storages..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Storage
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Storages</TabsTrigger>
          <TabsTrigger value="cold">Cold Storages</TabsTrigger>
          <TabsTrigger value="general">General Storages</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredTowns.map((town) => (
            <Card key={town.name}>
              <CardHeader>
                <CardTitle>{town.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {town.storages.map((storage) => (
                    <StorageUnitCard
                      key={storage.id}
                      id={storage.id}
                      name={storage.name}
                      type={storage.type}
                      temperature={storage.temperature}
                      capacity={storage.capacity}
                      status={storage.status}
                      lastUpdated={storage.lastUpdated}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="cold" className="space-y-4">
          {filteredTowns.map((town) => (
            <Card key={town.name}>
              <CardHeader>
                <CardTitle>{town.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {town.storages
                    .filter((storage) => storage.type === "cold")
                    .map((storage) => (
                      <StorageUnitCard
                        key={storage.id}
                        id={storage.id}
                        name={storage.name}
                        type={storage.type}
                        temperature={storage.temperature}
                        capacity={storage.capacity}
                        status={storage.status}
                        lastUpdated={storage.lastUpdated}
                      />
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
          {filteredTowns.map((town) => (
            <Card key={town.name}>
              <CardHeader>
                <CardTitle>{town.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {town.storages
                    .filter((storage) => storage.type === "general")
                    .map((storage) => (
                      <StorageUnitCard
                        key={storage.id}
                        id={storage.id}
                        name={storage.name}
                        type={storage.type}
                        capacity={storage.capacity}
                        status={storage.status}
                        lastUpdated={storage.lastUpdated}
                      />
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <AddStorageDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  )
}

