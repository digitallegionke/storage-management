"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

// Mock data for demonstration
const mockResponses = [
  { id: 1, produce: "Organic Carrots", quantity: 80, unit: "kg", farmer: "Farm A", price: 2.5, status: "Pending" },
  { id: 2, produce: "Fresh Tomatoes", quantity: 50, unit: "kg", farmer: "Farm B", price: 3.0, status: "Accepted" },
]

const mockOrders = [
  { id: 1, produce: "Organic Carrots", quantity: 100, unit: "kg", deliveryDate: "2023-12-15", status: "Processing" },
  { id: 2, produce: "Fresh Tomatoes", quantity: 50, unit: "kg", deliveryDate: "2023-12-10", status: "Matched" },
]

export function ClientDashboard() {
  const [produceType, setProduceType] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState("kg")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [qualityStandards, setQualityStandards] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Submitted:", { produceType, quantity, unit, deliveryDate, qualityStandards })
    // Reset form
    setProduceType("")
    setQuantity("")
    setUnit("kg")
    setDeliveryDate("")
    setQualityStandards("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Client Dashboard</CardTitle>
          <CardDescription>Post produce requirements and track orders</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="produceType">Type of Produce</Label>
              <Input
                id="produceType"
                value={produceType}
                onChange={(e) => setProduceType(e.target.value)}
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
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Required Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualityStandards">Preferred Quality Standards</Label>
              <Textarea
                id="qualityStandards"
                value={qualityStandards}
                onChange={(e) => setQualityStandards(e.target.value)}
                placeholder="Describe any specific quality requirements"
              />
            </div>
            <Button type="submit">Post Requirement</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Farmer Responses</CardTitle>
          <CardDescription>View and accept offers from farmers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produce</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Price per Unit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockResponses.map((response) => (
                <TableRow key={response.id}>
                  <TableCell>{response.produce}</TableCell>
                  <TableCell>{`${response.quantity} ${response.unit}`}</TableCell>
                  <TableCell>{response.farmer}</TableCell>
                  <TableCell>${response.price.toFixed(2)}</TableCell>
                  <TableCell>{response.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" disabled={response.status === "Accepted"}>
                      {response.status === "Accepted" ? "Accepted" : "Accept"}
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
          <CardDescription>Track the status of your orders</CardDescription>
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
    </div>
  )
}

