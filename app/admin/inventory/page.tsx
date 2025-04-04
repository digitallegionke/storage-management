import { Layout } from "@/components/layout"
import { DashboardHeader } from "@/components/dashboard-header"
import { InventoryDashboard } from "@/components/inventory-dashboard"

export default function AdminInventoryPage() {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-10">
          <h1 className="text-3xl font-bold mb-6">Admin Inventory</h1>
          <InventoryDashboard />
        </main>
      </div>
    </Layout>
  )
}

