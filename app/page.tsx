"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

export default function LandingPage() {
  const [selectedRole, setSelectedRole] = useState<"farmer" | "client" | null>(null)

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ORDLOGIC</h1>
        </div>

        <div className="max-w-md">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Get Started</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Enter your account phone number to get an OTP as your password
          </p>

          <div className="space-y-4">
            <Card
              className={`p-4 border-2 cursor-pointer transition-colors ${
                selectedRole === "farmer"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
              }`}
              onClick={() => setSelectedRole("farmer")}
            >
              <div className="font-medium text-lg">Farmer</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                I grow produce and I am setting up for myself
              </div>
            </Card>

            <Card
              className={`p-4 border-2 cursor-pointer transition-colors ${
                selectedRole === "client"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
              }`}
              onClick={() => setSelectedRole("client")}
            >
              <div className="font-medium text-lg">Client</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">I am looking for farmers to work with</div>
            </Card>

            <Button
              className="w-full bg-green-800 hover:bg-green-900 text-white py-6"
              onClick={() => {
                if (selectedRole === "farmer") {
                  window.location.href = "/farmer/signup"
                } else if (selectedRole === "client") {
                  window.location.href = "/client/signup"
                }
              }}
            >
              Continue
            </Button>

            <div className="text-center mt-4">
              Have an account?{" "}
              <Link href="/login" className="text-primary font-medium">
                Sign in
              </Link>
            </div>

            <div className="mt-8">
              <Link href="/admin/login">
                <Button variant="outline" className="w-full">
                  Admin sign in
                </Button>
              </Link>
            </div>
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

