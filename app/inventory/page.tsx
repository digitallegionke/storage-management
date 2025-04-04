import { DashboardHeader } from "@/components/dashboard-header"
import { InventoryDashboard } from "@/components/inventory-dashboard"

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-6 md:p-10">
        <InventoryDashboard />
      </main>
    </div>
  )
}

