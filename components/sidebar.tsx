"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Snowflake,
  Warehouse,
  Users,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Create a context for sidebar state
type SidebarContextType = {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  isMobileOpen: boolean
  setIsMobileOpen: (value: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Toggle sidebar function
  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobileOpen(!isMobileOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  // Provide sidebar context
  const contextValue = {
    isCollapsed,
    setIsCollapsed,
    isMobileOpen,
    setIsMobileOpen,
    toggleSidebar,
  }

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>
}

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  count?: number
  isActive: boolean
  isCollapsed: boolean
}

const SidebarItem = ({ icon, label, href, count, isActive, isCollapsed }: SidebarItemProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Link
        href={href}
        className={cn(
          "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          "hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive ? "bg-primary/10 text-primary" : "text-muted-foreground",
          isCollapsed ? "justify-center" : "",
        )}
        aria-current={isActive ? "page" : undefined}
      >
        <div className="mr-2 h-5 w-5" aria-hidden="true">
          {icon}
        </div>
        {!isCollapsed && (
          <>
            <span className="flex-1">{label}</span>
            {count !== undefined && (
              <span className="ml-auto bg-muted text-muted-foreground text-xs font-medium rounded-full px-2 py-0.5">
                {count}
              </span>
            )}
          </>
        )}
      </Link>
    </TooltipTrigger>
    {isCollapsed && (
      <TooltipContent side="right">
        {label}
        {count !== undefined && ` (${count})`}
      </TooltipContent>
    )}
  </Tooltip>
)

interface SidebarGroupProps {
  title: string
  children: React.ReactNode
  isCollapsed: boolean
}

const SidebarGroup = ({ title, children, isCollapsed }: SidebarGroupProps) => (
  <div className="space-y-1">
    {!isCollapsed && (
      <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
    )}
    <div className="space-y-1">{children}</div>
  </div>
)

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen, toggleSidebar } = useSidebar()

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname, setIsMobileOpen])

  // Handle escape key to close mobile sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [setIsMobileOpen])

  return (
    <TooltipProvider>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          aria-hidden="true"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
        aria-label={isMobileOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isMobileOpen}
        aria-controls="sidebar"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-background transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className,
        )}
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!isCollapsed && <h1 className="text-lg font-semibold">Harvest Hub</h1>}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-4 px-2 space-y-6">
          <SidebarGroup title="Main" isCollapsed={isCollapsed}>
            <SidebarItem
              icon={<LayoutDashboard />}
              label="Dashboard"
              href="/dashboard"
              isActive={pathname === "/dashboard"}
              isCollapsed={isCollapsed}
            />
          </SidebarGroup>

          <SidebarGroup title="Inventory" isCollapsed={isCollapsed}>
            <SidebarItem
              icon={<Package />}
              label="Storage"
              href="/storage"
              isActive={pathname === "/storage"}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              icon={<Snowflake />}
              label="Cold Storage"
              href="/cold-storage"
              count={12}
              isActive={pathname === "/cold-storage"}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              icon={<Warehouse />}
              label="General Storage"
              href="/general-storage"
              count={18}
              isActive={pathname === "/general-storage"}
              isCollapsed={isCollapsed}
            />
          </SidebarGroup>

          <SidebarGroup title="Partners" isCollapsed={isCollapsed}>
            <SidebarItem
              icon={<Users />}
              label="Clients"
              href="/clients"
              count={6}
              isActive={pathname === "/clients"}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              icon={<User />}
              label="Farmers"
              href="/farmers"
              count={8}
              isActive={pathname === "/farmers"}
              isCollapsed={isCollapsed}
            />
          </SidebarGroup>

          <SidebarGroup title="System" isCollapsed={isCollapsed}>
            <SidebarItem
              icon={<Settings />}
              label="Settings"
              href="/settings"
              isActive={pathname === "/settings"}
              isCollapsed={isCollapsed}
            />
          </SidebarGroup>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            {!isCollapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">Admin</p>
              </div>
            )}

            {!isCollapsed && (
              <Button variant="ghost" size="icon" className="ml-auto" aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

