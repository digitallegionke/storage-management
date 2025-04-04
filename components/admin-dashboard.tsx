"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { StorageUnitCard } from "@/components/storage-unit-card"
import { AddStorageDialog } from "@/components/add-storage-dialog"
import { InventoryTable } from "@/components/inventory-table"

// Mock data for Kenyan towns and their storage units
const towns = [
  {
    name: "Nakuru",
    coldStorages: [
      {
        id: "nk-cold-1",
        name: "Nakuru Cold Storage 1",
        temperature: "-5°C",
        capacity: "75%",
        status: "Normal",
        contents: [
          {
            id: "TM001",
            name: "Tomatoes",
            quantity: 500,
            unit: "kg",
            entryDate: "2023-06-01",
            expiryDate: "2023-06-15",
          },
          {
            id: "CP001",
            name: "Capsicum",
            quantity: 200,
            unit: "kg",
            entryDate: "2023-06-02",
            expiryDate: "2023-06-16",
          },
          {
            id: "CB001",
            name: "Cabbages",
            quantity: 300,
            unit: "kg",
            entryDate: "2023-06-03",
            expiryDate: "2023-06-17",
          },
        ],
      },
      {
        id: "nk-cold-2",
        name: "Nakuru Cold Storage 2",
        temperature: "-3°C",
        capacity: "60%",
        status: "Normal",
        contents: [
          {
            id: "CR001",
            name: "Carrots",
            quantity: 400,
            unit: "kg",
            entryDate: "2023-06-01",
            expiryDate: "2023-06-20",
          },
          {
            id: "BR001",
            name: "Broccoli",
            quantity: 150,
            unit: "kg",
            entryDate: "2023-06-02",
            expiryDate: "2023-06-12",
          },
        ],
      },
    ],
    generalStorages: [
      {
        id: "nk-gen-1",
        name: "Nakuru General Storage 1",
        capacity: "80%",
        status: "Normal",
        contents: [
          {
            id: "ON001",
            name: "Onions",
            quantity: 1000,
            unit: "kg",
            entryDate: "2023-06-01",
            expiryDate: "2023-07-01",
          },
          {
            id: "PT001",
            name: "Potatoes",
            quantity: 1500,
            unit: "kg",
            entryDate: "2023-06-02",
            expiryDate: "2023-07-02",
          },
        ],
      },
      {
        id: "nk-gen-2",
        name: "Nakuru General Storage 2",
        capacity: "55%",
        status: "Normal",
        contents: [
          { id: "GR001", name: "Garlic", quantity: 200, unit: "kg", entryDate: "2023-06-01", expiryDate: "2023-07-15" },
          { id: "GN001", name: "Ginger", quantity: 100, unit: "kg", entryDate: "2023-06-02", expiryDate: "2023-07-16" },
        ],
      },
    ],
  },
  {
    name: "Eldoret",
    coldStorages: [
      {
        id: "el-cold-1",
        name: "Eldoret Cold Storage 1",
        temperature: "-4°C",
        capacity: "70%",
        status: "Normal",
        contents: [],
      },
    ],
    generalStorages: [
      { id: "el-gen-1", name: "Eldoret General Storage 1", capacity: "65%", status: "Normal", contents: [] },
    ],
  },
  // Add more towns as needed
]

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("storage")

  const filteredTowns = towns.filter(
    (town) =>
      town.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      town.coldStorages.some((storage) => storage.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      town.generalStorages.some((storage) => storage.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Agricultural Produce Storage Management</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search towns or storages..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Storage
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="storage">Storage Units</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="storage">
          {filteredTowns.map((town) => (
            <Card key={town.name} className="mt-6">
              <CardHeader>
                <CardTitle>{town.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Cold Storage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {town.coldStorages.map((storage) => (
                    <StorageUnitCard
                      key={storage.id}
                      id={storage.id}
                      name={storage.name}
                      type="cold"
                      temperature={storage.temperature}
                      capacity={storage.capacity}
                      status={storage.status}
                      contents={storage.contents}
                    />
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-2">General Storage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {town.generalStorages.map((storage) => (
                    <StorageUnitCard
                      key={storage.id}
                      id={storage.id}
                      name={storage.name}
                      type="general"
                      capacity={storage.capacity}
                      status={storage.status}
                      contents={storage.contents}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="inventory">
          <InventoryTable />
        </TabsContent>
      </Tabs>

      <AddStorageDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  )
}

