import { DashboardHeader } from "@/components/dashboard-header"
import { ColdStorageDashboard } from "@/components/cold-storage-dashboard"

export default function ColdStoragePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-6 md:p-10">
        <ColdStorageDashboard />
      </main>
    </div>
  )
}

