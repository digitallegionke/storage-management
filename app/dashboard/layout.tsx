import type React from "react"
import { AppLayout } from "@/components/app-layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayout headerTitle="Dashboard" headerDescription="Manage your storage facilities and inventory">
      {children}
    </AppLayout>
  )
}

