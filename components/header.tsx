"use client"

import { Bell, Search, Sun, Moon, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useSidebar } from "@/components/sidebar"

interface HeaderProps {
  title: string
  description?: string
  className?: string
  showSearch?: boolean
}

export function Header({ title, description, className, showSearch = true }: HeaderProps) {
  const { setTheme, theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  // Safely access the sidebar context
  const sidebarContext = useSidebar()
  const sidebarToggle = sidebarContext?.toggleSidebar

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex flex-col space-y-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 py-3 md:px-6 md:py-4",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {sidebarToggle && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={sidebarToggle}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h1>
            {description && <p className="text-sm text-muted-foreground hidden md:block">{description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-[200px] lg:w-[280px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" aria-hidden="true"></span>
            <span className="sr-only">You have unread notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Change theme">
                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showSearch && (
        <div className="md:hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}
    </header>
  )
}

