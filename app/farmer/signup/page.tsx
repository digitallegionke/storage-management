"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Phone, Lock, User, MapPin, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function FarmerSignupPage() {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    produceTypes: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real application, you would send OTP to the phone number
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStep(2)
      toast({
        title: "OTP sent",
        description: "A one-time password has been sent to your phone",
      })
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: "Please check your phone number and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real application, you would verify the OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStep(3)
      toast({
        title: "Phone verified",
        description: "Your phone number has been verified",
      })
    } catch (error) {
      toast({
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real application, you would send this data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Account created",
        description: "Your farmer account has been created successfully",
      })
      router.push("/farmer/dashboard")
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "An error occurred during signup",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate progress percentage
  const progressPercentage = ((step - 1) / 2) * 100

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ORDLOGIC</h1>
        </div>

        <div className="max-w-md mx-auto w-full">
          <Card className="border-0 shadow-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Farmer Sign Up</CardTitle>
              <CardDescription>
                {step === 1 && "Enter your phone number to get started"}
                {step === 2 && "Enter the OTP sent to your phone"}
                {step === 3 && "Complete your farmer profile"}
              </CardDescription>
              <Progress value={progressPercentage} className="h-1 mt-2" />
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="form-group">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="input-with-icon">
                      <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+254 123 456 789"
                        className="focus:ring-2 focus:ring-primary"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="form-group">
                    <Label htmlFor="otp">One-Time Password</Label>
                    <div className="input-with-icon">
                      <Lock className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter OTP"
                        className="focus:ring-2 focus:ring-primary"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </Button>
                  <Button type="button" variant="link" className="w-full" onClick={() => setStep(1)}>
                    Change phone number
                  </Button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-group">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="input-with-icon">
                      <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        className="focus:ring-2 focus:ring-primary"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <Label htmlFor="location">Farm Location</Label>
                    <div className="input-with-icon">
                      <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <Select
                        value={formData.location}
                        onValueChange={(value) => handleSelectChange("location", value)}
                      >
                        <SelectTrigger id="location" className="pl-10 focus:ring-2 focus:ring-primary select-trigger">
                          <SelectValue placeholder="Select your location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nakuru">Nakuru, Kenya</SelectItem>
                          <SelectItem value="nairobi">Nairobi, Kenya</SelectItem>
                          <SelectItem value="mombasa">Mombasa, Kenya</SelectItem>
                          <SelectItem value="kisumu">Kisumu, Kenya</SelectItem>
                          <SelectItem value="eldoret">Eldoret, Kenya</SelectItem>
                          <SelectItem value="kitale">Kitale, Kenya</SelectItem>
                          <SelectItem value="thika">Thika, Kenya</SelectItem>
                          <SelectItem value="machakos">Machakos, Kenya</SelectItem>
                          <SelectItem value="kakamega">Kakamega, Kenya</SelectItem>
                          <SelectItem value="nyeri">Nyeri, Kenya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="form-group">
                    <Label htmlFor="produceTypes">Types of Produce</Label>
                    <div className="input-with-icon">
                      <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <Textarea
                        id="produceTypes"
                        name="produceTypes"
                        placeholder="e.g., Tomatoes, Onions, Potatoes"
                        className="min-h-[80px] focus:ring-2 focus:ring-primary"
                        value={formData.produceTypes}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      List the types of produce you grow, separated by commas
                    </p>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Complete Setup"}
                  </Button>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Right side - Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ordlogic.png-mD7eabeIS2DdP6P9NsKxkJ4RWHT5KV.jpeg')",
          backgroundPosition: "center right",
        }}
        aria-hidden="true"
      ></div>
    </div>
  )
}

