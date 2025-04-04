"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock inventory data
const inventoryData = [
  {
    id: "TM001",
    name: "Tomatoes",
    totalQuantity: 500,
    unit: "kg",
    locations: [
      { storage: "Nakuru Cold Storage 1", quantity: 300, entryDate: "2023-06-01", expiryDate: "2023-06-15" },
      { storage: "Eldoret Cold Storage 1", quantity: 200, entryDate: "2023-06-02", expiryDate: "2023-06-16" },
    ],
    clientPickup: "2023-06-20",
  },
  {
    id: "ON001",
    name: "Onions",
    totalQuantity: 1000,
    unit: "kg",
    locations: [
      { storage: "Nakuru General Storage 1", quantity: 600, entryDate: "2023-06-01", expiryDate: "2023-07-01" },
      { storage: "Eldoret General Storage 1", quantity: 400, entryDate: "2023-06-03", expiryDate: "2023-07-03" },
    ],
    clientPickup: "2023-07-10",
  },
  // ... (more inventory items)
]

export function InventoryTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<(typeof inventoryData)[0] | null>(null)

  const filteredInventory = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleItemClick = (item: (typeof inventoryData)[0]) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>Add Item</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Total Quantity</TableHead>
            <TableHead>Client Pickup</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInventory.map((item) => (
            <>
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{`${item.totalQuantity} ${item.unit}`}</TableCell>
                <TableCell>{item.clientPickup}</TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => handleItemClick(item)}>
                    View Details
                  </Button>
                  <Button variant="ghost" onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}>
                    {expandedItem === item.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </TableCell>
              </TableRow>
              {expandedItem === item.id && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Storage Location</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Entry Date</TableHead>
                          <TableHead>Expiry Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {item.locations.map((location, index) => (
                          <TableRow key={index}>
                            <TableCell>{location.storage}</TableCell>
                            <TableCell>{`${location.quantity} ${item.unit}`}</TableCell>
                            <TableCell>{location.entryDate}</TableCell>
                            <TableCell>{location.expiryDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedItem?.name} Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div>
              <p>
                <strong>ID:</strong> {selectedItem.id}
              </p>
              <p>
                <strong>Total Quantity:</strong> {selectedItem.totalQuantity} {selectedItem.unit}
              </p>
              <p>
                <strong>Client Pickup:</strong> {selectedItem.clientPickup}
              </p>
              <h4 className="font-semibold mt-4 mb-2">Storage Locations:</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Storage Location</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Entry Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Time in Storage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedItem.locations.map((location, index) => {
                    const entryDate = new Date(location.entryDate)
                    const now = new Date()
                    const daysInStorage = Math.floor((now.getTime() - entryDate.getTime()) / (1000 * 3600 * 24))

                    return (
                      <TableRow key={index}>
                        <TableCell>{location.storage}</TableCell>
                        <TableCell>{`${location.quantity} ${selectedItem.unit}`}</TableCell>
                        <TableCell>{location.entryDate}</TableCell>
                        <TableCell>{location.expiryDate}</TableCell>
                        <TableCell>{daysInStorage} days</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

