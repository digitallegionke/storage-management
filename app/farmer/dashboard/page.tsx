import { FarmerDashboard } from "@/components/farmer-dashboard"
import { Layout } from "@/components/layout"

export default function FarmerDashboardPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Farmer Dashboard</h1>
      <FarmerDashboard />
    </Layout>
  )
}

