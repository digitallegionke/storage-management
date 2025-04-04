"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

const steps = [
  { id: "account", title: "Account Setup" },
  { id: "organization", title: "Organization Details" },
  { id: "storage", title: "Initial Storage Setup" },
  { id: "invite", title: "Invite Team Members" },
  { id: "complete", title: "Setup Complete" },
]

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    organizationName: "",
    industry: "",
    address: "",
    storageType: "",
    storageUnits: "",
    teamMembers: "",
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the formData to your backend
    console.log("Form submitted:", formData)
    toast({
      title: "Onboarding Complete",
      description: "Your account has been set up successfully!",
    })
    // Move to the completion step
    setCurrentStep(steps.length - 1)
  }

  const goToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg dark:bg-gray-800">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
        <CardDescription>
          Step {currentStep + 1} of {steps.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
        </div>
        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
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
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="food-processing">Food Processing</SelectItem>
                    <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                    <SelectItem value="logistics">Logistics</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storageType">Primary Storage Type</Label>
                <Select
                  value={formData.storageType}
                  onValueChange={(value) => handleSelectChange("storageType", value)}
                >
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                    <SelectValue placeholder="Select storage type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold">Cold Storage</SelectItem>
                    <SelectItem value="dry">Dry Storage</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="storageUnits">Number of Storage Units</Label>
                <Input
                  id="storageUnits"
                  name="storageUnits"
                  type="number"
                  value={formData.storageUnits}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamMembers">Invite Team Members (comma-separated emails)</Label>
                <Textarea
                  id="teamMembers"
                  name="teamMembers"
                  value={formData.teamMembers}
                  onChange={handleInputChange}
                  placeholder="e.g., john@example.com, jane@example.com"
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-2xl font-bold">Setup Complete!</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                Your storage management system is ready to use.
              </p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
        )}
        {currentStep === 0 && <div />}
        {currentStep < steps.length - 2 && (
          <Button onClick={handleNext} className="dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        {currentStep === steps.length - 2 && (
          <Button onClick={handleSubmit} className="dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700">
            Complete Setup <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button onClick={goToDashboard} className="w-full dark:bg-green-600 dark:text-white dark:hover:bg-green-700">
            Go to Dashboard <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

