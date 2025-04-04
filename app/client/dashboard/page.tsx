import { ClientDashboard } from "@/components/client-dashboard"
import { Layout } from "@/components/layout"

export default function ClientDashboardPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>
      <ClientDashboard />
    </Layout>
  )
}

