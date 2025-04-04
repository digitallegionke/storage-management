"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

// Mock data for demonstration
const mockRequirements = [
  { id: 1, produce: "Organic Carrots", quantity: 100, unit: "kg", deliveryDate: "2023-12-15", status: "Open" },
  { id: 2, produce: "Fresh Tomatoes", quantity: 50, unit: "kg", deliveryDate: "2023-12-10", status: "Open" },
  { id: 3, produce: "Green Apples", quantity: 200, unit: "kg", deliveryDate: "2023-12-20", status: "Open" },
]

const mockOrders = [
  { id: 1, produce: "Organic Carrots", quantity: 80, unit: "kg", deliveryDate: "2023-12-15", status: "Approved" },
  { id: 2, produce: "Fresh Tomatoes", quantity: 50, unit: "kg", deliveryDate: "2023-12-10", status: "Pending" },
]

export function FarmerDashboard() {
  const [availableProduce, setAvailableProduce] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState("kg")
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false)
  const [selectedRequirement, setSelectedRequirement] = useState<any>(null)
  const [offerPrice, setOfferPrice] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Submitted:", { availableProduce, quantity, unit })
    // Reset form
    setAvailableProduce("")
    setQuantity("")
    setUnit("kg")
  }

  const handleSubmitOffer = () => {
    if (!offerPrice || Number.parseFloat(offerPrice) <= 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price",
        variant: "destructive",
      })
      return
    }

    // Here you would send the offer to your backend
    console.log("Offer submitted:", {
      requirementId: selectedRequirement?.id,
      produce: selectedRequirement?.produce,
      quantity: selectedRequirement?.quantity,
      unit: selectedRequirement?.unit,
      pricePerUnit: Number.parseFloat(offerPrice),
      totalPrice: Number.parseFloat(offerPrice) * selectedRequirement?.quantity,
    })

    toast({
      title: "Offer submitted",
      description: `Your offer for ${selectedRequirement?.produce} has been sent to the client for approval.`,
    })

    setIsPriceDialogOpen(false)
    setOfferPrice("")
    setSelectedRequirement(null)
  }

  // Price offer dialog
  const PriceOfferDialog = () => (
    <Dialog open={isPriceDialogOpen} onOpenChange={setIsPriceDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make an Offer</DialogTitle>
          <DialogDescription>
            Enter your price for {selectedRequirement?.produce} ({selectedRequirement?.quantity}{" "}
            {selectedRequirement?.unit})
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price per {selectedRequirement?.unit}
            </Label>
            <div className="col-span-3 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                className="pl-7"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsPriceDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmitOffer}>Submit Offer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Farmer Dashboard</CardTitle>
          <CardDescription>Manage your produce and respond to client requests</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="availableProduce">Available Produce</Label>
              <Input
                id="availableProduce"
                value={availableProduce}
                onChange={(e) => setAvailableProduce(e.target.value)}
                placeholder="e.g., Organic Carrots"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="lb">Pounds (lb)</SelectItem>
                    <SelectItem value="units">Units</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit">Update Available Produce</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Open Requirements</CardTitle>
          <CardDescription>Browse and respond to client requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produce</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRequirements.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.produce}</TableCell>
                  <TableCell>{`${req.quantity} ${req.unit}`}</TableCell>
                  <TableCell>{req.deliveryDate}</TableCell>
                  <TableCell>{req.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRequirement(req)
                        setIsPriceDialogOpen(true)
                      }}
                    >
                      Offer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>Track your accepted orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produce</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.produce}</TableCell>
                  <TableCell>{`${order.quantity} ${order.unit}`}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Price offer dialog */}
      <PriceOfferDialog />
    </div>
  )
}

