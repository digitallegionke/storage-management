import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppLayout } from "@/components/app-layout"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "StorageHub - Manage Cold & General Storage",
  description: "A comprehensive solution for managing both cold and general storage facilities",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <AppLayout showSidebar={false} showHeader={false}>
          {children}
        </AppLayout>
      </body>
    </html>
  )
}



import './globals.css'