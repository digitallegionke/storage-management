"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function FarmerOnboarding() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    produceTypes: [],
    averageQuantity: "",
    quantityUnit: "kg",
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Farmer onboarding data:", formData)
    // Here you would typically send this data to your backend
    router.push("/farmer/dashboard")
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Farmer Onboarding</CardTitle>
        <CardDescription>Set up your farmer profile</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="produceTypes">Produce Types</Label>
                <Input
                  id="produceTypes"
                  name="produceTypes"
                  value={formData.produceTypes.join(", ")}
                  onChange={(e) => handleSelectChange("produceTypes", e.target.value.split(", "))}
                  placeholder="e.g., Carrots, Tomatoes, Apples"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="averageQuantity">Average Quantity</Label>
                <Input
                  id="averageQuantity"
                  name="averageQuantity"
                  type="number"
                  value={formData.averageQuantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantityUnit">Quantity Unit</Label>
                <Select
                  value={formData.quantityUnit}
                  onValueChange={(value) => handleSelectChange("quantityUnit", value)}
                >
                  <SelectTrigger id="quantityUnit">
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
          )}
        </form>
      </CardContent>
      <CardFooter>
        {step === 1 ? (
          <Button onClick={handleNext} className="w-full">
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="w-full">
            Complete Setup
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

