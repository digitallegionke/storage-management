"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Sidebar, SidebarProvider } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  showHeader?: boolean
  className?: string
  headerTitle?: string
  headerDescription?: string
}

export function AppLayout({
  children,
  showSidebar = true,
  showHeader = true,
  className,
  headerTitle = "Dashboard",
  headerDescription,
}: AppLayoutProps) {
  const pathname = usePathname()

  // Determine if we're on a login/signup page
  const isAuthPage =
    pathname.includes("/login") ||
    pathname.includes("/signup") ||
    pathname === "/" ||
    pathname.includes("/forgot-password")

  // Don't show sidebar or header on auth pages
  const shouldShowSidebar = showSidebar && !isAuthPage
  const shouldShowHeader = showHeader && !isAuthPage

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="min-h-screen bg-background flex">
          {shouldShowSidebar && <Sidebar />}

          <div className={cn("flex-1 flex flex-col min-h-screen", shouldShowSidebar && "md:ml-64")}>
            {shouldShowHeader && <Header title={headerTitle} description={headerDescription} />}

            <main className={cn("flex-1 p-4 md:p-6 animate-fade-in", className)}>{children}</main>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  )
}

