import { Layout } from "@/components/layout"
import { DashboardHeader } from "@/components/dashboard-header"
import { GeneralStorageDashboard } from "@/components/general-storage-dashboard"

export default function AdminGeneralStoragePage() {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-10">
          <h1 className="text-3xl font-bold mb-6">Admin General Storage</h1>
          <GeneralStorageDashboard />
        </main>
      </div>
    </Layout>
  )
}

