"use client"

import { useState } from "react"
import { Plus, Search, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { AddInventoryDialog } from "@/components/add-inventory-dialog"

// Sample inventory data
const inventoryItems = [
  {
    id: "TM00457",
    name: "Tomatoes",
    quantity: 250,
    unit: "kg",
    location: "Nakuru Cold Storage 1",
    status: "In Stock",
    expiryDate: "2023-12-15",
    client: "FreshMart Supermarket",
    farmer: "John Kamau",
  },
  {
    id: "ON00123",
    name: "Onions",
    quantity: 500,
    unit: "kg",
    location: "Kitale General Storage 1",
    status: "In Stock",
    expiryDate: "2024-01-20",
    client: "GreenGrocer Ltd",
    farmer: "Alice Wanjiru",
  },
  {
    id: "CP00789",
    name: "Capsicum",
    quantity: 100,
    unit: "kg",
    location: "Eldoret Cold Storage 1",
    status: "Low Stock",
    expiryDate: "2023-12-10",
    client: "Fresh Bites Restaurant",
    farmer: "David Ochieng",
  },
]

export function InventoryDashboard() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
          <p className="text-muted-foreground">Track and manage fresh produce inventory across all storage units.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search inventory..." className="w-full pl-8" />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Inventory
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Farmer</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item.quantity} {item.unit}
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "Low Stock" ? "outline" : "default"}>{item.status}</Badge>
                </TableCell>
                <TableCell>{item.expiryDate}</TableCell>
                <TableCell>{item.client}</TableCell>
                <TableCell>{item.farmer}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Item</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Move Location</DropdownMenuItem>
                      <DropdownMenuItem>Adjust Quantity</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddInventoryDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  )
}

