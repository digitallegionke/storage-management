"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Phone, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const [userRole, setUserRole] = useState<"farmer" | "client">("farmer")

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real application, you would send OTP to the phone number
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setOtpSent(true)
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

      toast({
        title: "Login successful",
        description: "Welcome back to ORDLOGIC",
      })

      // Redirect based on user role
      if (userRole === "farmer") {
        router.push("/farmer/dashboard")
      } else {
        router.push("/client/dashboard")
      }
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

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ORDLOGIC</h1>
        </div>

        <div className="max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Enter your phone number to receive a one-time password</CardDescription>
            </CardHeader>
            <CardContent>
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+254 123 456 789"
                        className="pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label>Select your role</Label>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="farmer-role"
                          name="role"
                          checked={userRole === "farmer"}
                          onChange={() => setUserRole("farmer")}
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <Label htmlFor="farmer-role" className="font-normal">
                          Farmer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="client-role"
                          name="role"
                          checked={userRole === "client"}
                          onChange={() => setUserRole("client")}
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <Label htmlFor="client-role" className="font-normal">
                          Client
                        </Label>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-green-800 hover:bg-green-900" disabled={isLoading}>
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">One-Time Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter OTP"
                        className="pl-10"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-green-800 hover:bg-green-900" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </Button>
                  <Button type="button" variant="link" className="w-full" onClick={() => setOtpSent(false)}>
                    Change phone number
                  </Button>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/" className="text-primary font-medium">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-8">
            <Link href="/admin/login">
              <Button variant="outline" className="w-full">
                Admin sign in
              </Button>
            </Link>
          </div>
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
      ></div>
    </div>
  )
}

